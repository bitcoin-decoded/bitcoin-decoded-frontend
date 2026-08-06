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

## Le backend, tel que branché (Phase 3)

La bascule promise a eu lieu, **sans toucher une ligne au-dessus de `UserRepository`**. Le défaut du provider n'est plus `createLocalRepository` mais **`createDefaultRepository`** : un **repository composite** (invité → `localStorage`, connecté → API du compte). `App.tsx` n'a pas bougé.

### Les pièces

| Fichier | Rôle |
| --- | --- |
| `helpers/createApiRepository.ts` | `load` = `GET /api/progress` (un **401** devient `SessionExpiredError`), `save` **débouncé** (`PROGRESS_SAVE_DEBOUNCE_MS`) avec **flush `keepalive` sur `pagehide`/`visibilitychange`** |
| `helpers/toProgressItems.ts` / `fromProgressItems.ts` | L'**adaptateur** : le back stocke des lignes normalisées `progress(item_id, item_type, status, score, data)` (CDC §5.3), pas un blob `{badges, readingProgress}`. Un badge → `earned` (date dans `data.at`) ; un chapitre → statut dérivé + `StoredChapterProgress` dans `data` |
| `helpers/createCompositeRepository.ts` | Sélection invité/connecté par **flags injectés** (`hasAccount` / `migrated`, donc testable sans navigateur), avec la migration au 1er login |
| `helpers/createDefaultRepository.ts` | Câble `hasAccount` sur le **vault de l'appareil** (`createVault().exists()`, IndexedDB) et `migrated` sur `localStorage` (`PROGRESS_MIGRATED_KEY`), puis assemble le composite. Seul endroit qui touche au stockage |
| `helpers/mergeUserData.ts` | Fusion **non-régressive** côté client (finished gagne, sinon `maxRevealed` max ; badge = date la plus ancienne), miroir de la règle serveur |

### La logique du composite

- **Pas de compte sur l'appareil** (`hasAccount` faux, càd pas de vault) → `local` seul, **aucun appel réseau**. C'est le cas de tout invité.
- **Compte présent** → `api.load()`. Au **premier** chargement authentifié, la progression locale (invité) est **fondue dans le compte** : l'union (`mergeUserData`) est renvoyée immédiatement (rien ne paraît perdu) puis poussée au serveur, dont la fusion non-régressive rend le push idempotent (CDC §8). Ensuite, le serveur fait foi.
- **Session expirée** (`SessionExpiredError`) → repli sur `local`. Au retour dans l'app, un appareil « verrouillé » (vault présent, pas de session) affiche donc la copie locale tant que l'utilisateur n'a pas déverrouillé ; l'écran de déverrouillage (Phase 4d) s'appuie sur ce repli. Une **vraie erreur réseau** remonte, elle, à l'écran d'erreur d'init (timeout + « Réessayer »).
- **`save`** écrit toujours dans `local` (cache chaud) et, si authentifié, dans l'`api`.

### Ce que la Phase 4c a branché

- **Le signal, c'est le vault.** `createDefaultRepository` câble `hasAccount` sur `createVault().exists()` ; création/restauration écrivent le vault, effacement le supprime, donc aucun flag séparé à poser (le placeholder `HAS_ACCOUNT_KEY` a disparu).
- **Recharge au changement de compte pendant la visite.** `useReloadOnAccountChange` (monté par `UserDataProvider`, sous `AuthProvider`) observe le statut d'`useAuth` : une création/déverrouillage en cours de session bascule vers `authenticated` → le repository **recharge**, ce qui déclenche la **migration au 1er login** (la progression invité locale est fondue dans le compte) ; un logout recharge vers le repli local. La résolution initiale hors de `checking` n'est **pas** un changement, donc pas de recharge parasite au montage.

### Ce que la Phase 4d (UI) branchera dessus

- L'écran de déverrouillage (le repli local sur session verrouillée devient un prompt mot de passe).
- Rien d'autre côté `UserData` : l'adaptateur, le composite, la migration et la recharge sont déjà là et testés (`progressAdapter.test.ts`, `mergeUserData.test.ts`, `createCompositeRepository.test.ts`).

### Ce qui n'a pas bougé

- Le lifecycle `loading/ready/error`, le **timeout** (`AbortSignal` passé à `load`), le **retry**, le **gate**, le **loader**, l'écran d'erreur.
- Tous les consommateurs : `useBadges`, `useBlockReader`, `useChapterProgression`, la page Badges. Aucune signature ne change.

---

## Ce qui reste / à savoir

- Les tests SSR (`src/Platform/nodeSafety.test.tsx`) rendent `<App/>` sans navigateur : le gate rend le contenu côté serveur, et les widgets utilisateur s'auto-suppriment. Si un futur composant lit du user-data, penser à le garder muet quand `status !== "ready"` pour ne pas le faire réapparaître dans le prérendu.
- Le fond thémé inline dans `index.html` doit rester synchrone avec les couleurs `body` de `src/index.css` (gardé par `THEME_COLORS.test.ts` côté tokens).
- Le thème reste **hors** de ce cycle : c'est une préférence, déjà sans flash via le script bloquant de `index.html`. Ne pas le faire passer par le gate.
