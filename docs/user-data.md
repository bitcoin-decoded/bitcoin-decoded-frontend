# Données utilisateur, tel que construit

Comment l'état utilisateur (badges, progression de lecture) est chargé, exposé et persisté, et **ce qu'il faudra faire pour passer au backend**. Écrit pour qu'une session future n'ait pas à re-deviner l'architecture.

L'objectif tenu : les composants ne savent jamais **d'où** viennent les données, seulement **si** elles sont prêtes. Le jour du backend, on remplace une implémentation et on ne touche à rien d'autre.

---

## L'état en un coup d'œil

| | |
| --- | --- |
| Source aujourd'hui | `localStorage`, derrière une abstraction |
| Cycle de vie | `loading → ready → error`, un seul chargement au démarrage |
| Pendant `loading` | loader global thémé (révélation retardée en CSS, pas de flash sur chargement instantané) |
| `error` | après un timeout (8 s) ou un rejet : écran d'erreur + « Réessayer » + « Recharger » |
| Rendu des consommateurs | uniquement quand `ready` (côté client) |
| Prérendu (SEO) | le contenu part dans le HTML ; les widgets liés à l'utilisateur s'auto-suppriment tant que `status !== "ready"` |

Le point de bascule est un seul type, `UserRepository`. Tout le reste (lifecycle, timeout, retry, gate, loader, erreur, hooks consommateurs) est écrit une fois et ne dépend pas de la source.

---

## Où vit quoi

| Sujet | Emplacement |
| --- | --- |
| Le domaine complet | `src/UserData/` |
| La forme d'un snapshot utilisateur | `src/UserData/types/UserData.ts` |
| **Le point de bascule (le seul type à réimplémenter)** | `src/UserData/types/UserRepository.ts` |
| L'implémentation localStorage (+ migration des clés héritées) | `src/UserData/helpers/createLocalRepository.ts` |
| La machine à états `loading/ready/error` + mutations | `src/UserData/hooks/useUserDataStore.ts` |
| Le contexte + hook consommateur | `src/UserData/hooks/useUserData.ts` |
| Le provider (injecte le repository, monte le gate) | `src/UserData/components/UserDataProvider.tsx` |
| Le gate (SSR vs loading/error/ready) | `src/UserData/components/UserDataGate.tsx` |
| Loader / écran d'erreur | `src/UserData/components/UserData{Loader,Error}.tsx` |
| Le timeout d'init | `src/UserData/data/USER_DATA_TIMEOUT_MS.ts` |
| Adaptateur badges (garde la même API `useBadges`) | `src/Achievements/hooks/useBadges.ts` |
| Consommateur lecture (lit/écrit via le contexte) | `src/Page/Reading/hooks/useBlockReader.ts` |
| Fond thémé avant le JS | `index.html` (script bloquant) + `src/index.css` (`body` par thème) |

Le *pourquoi* de chaque choix est en commentaire à côté du code. Ce fichier est la carte.

---

## Les décisions qui pèsent

### Un seul chargement, tout le user-data dedans

`UserData = { badges, readingProgress }`. Même si aujourd'hui chaque morceau vient du `localStorage`, ils sont chargés ensemble par un unique `load()`. Le jour du backend, `GET /me` renvoie exactement cette forme, en un appel. On n'a pas commencé « juste par les badges » précisément pour ne pas avoir deux initialisations à réconcilier plus tard.

### Le gate s'appuie sur `createRoot`

Le client remonte à neuf (`createRoot`, cf. [`docs/seo.md`](seo.md)), il ne fait pas d'hydratation. C'est ce qui autorise une vraie phase d'init côté client : le gate peut afficher un loader à la place de l'app sans avoir à faire correspondre le premier rendu client au fichier prérendu. Au **serveur** (`isBrowser` faux), le gate rend directement le contenu, pour le SEO et le premier paint ; les effets ne tournant pas, `status` y reste `loading`.

### Le flash « pas les droits » est réglé à la racine, pas par pansement

Avant, le HTML prérendu contenait le `OutOfSequenceNotice` (build sans `localStorage` → tous les chapitres 2+ paraissent hors séquence). Désormais `isChapterProgression().isOutOfSequence()` renvoie `false` tant que `status !== "ready"` : au prérendu, ni cadenas de nav ni notice. Le contenu, lui, part normalement. Sur refresh, on voit un court loader (ou rien, si l'init est instantanée), jamais un état d'UI faux. Pas de `useHasMounted` disséminé dans les composants.

### La progression de lecture est dans un `ref`, pas dans le state réactif

Aucun composant hors `useBlockReader` ne lit la progression de lecture. La garder dans un `ref` (dans `useUserDataStore`) veut dire qu'écrire l'avancement d'une page ne re-rend pas le reste de l'app. Les badges, eux, sont du state réactif (un octroi doit rafraîchir la nav, la page Badges, etc.). Les deux vivent dans le même snapshot pour la persistance et le futur `GET /me`.

### Pas de latence simulée

`createLocalRepository().load()` est `async` par contrat mais se résout immédiatement : on ne bricole aucun `setTimeout` pour « faire vrai ». Le loader ne clignote pas grâce à sa révélation retardée en CSS (`userDataLoaderReveal`), pas grâce à un délai artificiel sur la donnée.

### Le timeout est là pour le futur, pas pour le localStorage

`localStorage` répond en une frame. Le timeout de 8 s (`USER_DATA_TIMEOUT_MS`) existe pour le jour où `load()` est un appel réseau qui pend : au-delà, on `abort()` et on bascule en `error` avec un « Réessayer ». On ne laisse jamais l'utilisateur bloqué sur un spinner.

### Une clé consolidée, migration transparente des anciennes

Le repository localStorage écrit tout sous une seule clé `bd:userdata`. À la lecture, si elle est absente, il migre depuis les clés historiques (`bd:badges` + un `bd:reading:<chapitre>` par chapitre) : un lecteur de retour ne perd pas sa progression. Sa prochaine sauvegarde consolide.

---

## Migrer vers le backend

C'est **toute** la migration : écrire un `UserRepository` et le passer au provider. Rien au-dessus de ce type ne bouge.

### 1. Implémenter le repository API

Dans `src/UserData/helpers/createApiRepository.ts` :

```ts
import type { UserData, UserRepository } from "../types";

export const createApiRepository = (): UserRepository => ({
  load: async (signal) => {
    const res = await fetch("/api/me", { signal, credentials: "include" });
    if (!res.ok) throw new Error(`GET /api/me → ${res.status}`);
    return (await res.json()) as UserData; // le back renvoie { badges, readingProgress }
  },
  save: (data) => {
    // fire-and-forget ; débounce + sendBeacon sur unload à ajouter ici
    void fetch("/api/me", {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  },
});
```

Puis l'exporter dans `src/UserData/helpers/index.ts`.

### 2. L'injecter (le seul changement de câblage)

Dans `src/App.tsx` :

```tsx
<UserDataProvider repository={createApiRepository()}>
```

Le provider accepte déjà `repository?` et retombe sur `createLocalRepository()` par défaut. **C'est la seule ligne applicative à changer.**

### Ce qui marche déjà sans y toucher

- Le lifecycle `loading/ready/error`, le **timeout** (l'`AbortSignal` est passé à `load`) et le **retry** : prévus pour un réseau lent ou en échec.
- Le **gate**, le **loader**, l'**écran d'erreur** : inchangés.
- Tous les consommateurs : `useBadges`, `useBlockReader`, `useChapterProgression`, la page Badges. Aucune signature ne bouge.
- La forme d'échange est déjà le contrat d'API : `GET /me` → `UserData`, `PUT /me` ← `UserData`.

### Les points à trancher côté backend

- **Auth.** Le repository porte le token / les cookies (`credentials: "include"` ci-dessus). Un 401 (non connecté) : soit renvoyer un snapshot vide (mode anonyme), soit déclencher un flux de login. À décider selon le produit.
- **Anonyme + connecté.** Option propre : un repository composite qui lit le `localStorage` pour un invité et bascule sur l'API après connexion (et pousse la progression locale au premier login). Le point d'injection reste unique.
- **Granularité des écritures.** Aujourd'hui `save(snapshotComplet)`. Si l'API préfère un `PATCH` ciblé (juste les badges, juste un chapitre), on **fait évoluer le type `UserRepository`** (ajouter des méthodes) et les mutateurs de `useUserDataStore` — c'est le seul endroit qui appelle `save`. Les composants ne bougent toujours pas.
- **Fiabilité de la sauvegarde.** Un `fetch` non attendu peut être coupé par un unload. Débouncer dans le repository et flusher via `navigator.sendBeacon` sur `visibilitychange`/`pagehide`.

---

## Ce qui reste / à savoir

- Les tests SSR (`src/Platform/nodeSafety.test.tsx`) rendent `<App/>` sans navigateur : le gate rend le contenu côté serveur, et les widgets utilisateur s'auto-suppriment. Si un futur composant lit du user-data, penser à le garder muet quand `status !== "ready"` pour ne pas le faire réapparaître dans le prérendu.
- Le fond thémé inline dans `index.html` doit rester synchrone avec les couleurs `body` de `src/index.css` (gardé par `THEME_COLORS.test.ts` côté tokens).
- Le thème reste **hors** de ce cycle : c'est une préférence, déjà sans flash via le script bloquant de `index.html`. Ne pas le faire passer par le gate.
