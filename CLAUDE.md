# CLAUDE.md - Bitcoin.Decoded

## Projet

Application éducative interactive pour apprendre Bitcoin via l’angle de l’économie autrichienne, dans un ton :

- familier (non académique)
- pédagogique
- rigoureux mais accessible
- percutant, sans marqueur IA

Trois modules thématiques progressifs :

1. Fonctionnement du système bancaire
2. Lois de la monnaie
3. Bitcoin

Chaque module se compose de plusieurs chapitres.
Chaque module comporte un quiz final de validation.

---

## Public cible

Francophones 25-50 ans

- curieux mais non-bitcoiners
- allergiques au jargon crypto
- comprennent inflation / Livret A
- ne comprennent pas création monétaire / Bitcoin

---

## Stack technique

- React 19 + TypeScript 5.8 + Vite 7 (SWC)
- Recharts pour data vis
- CSS : inline `CSSProperties` + utilitaires globaux `index.css`
- Context API uniquement
- Routing : Context interne `RouterProvider` (pas de router externe)

---

## Architecture (DDD simplifiée)

### Structure standard

Tout dossier de code (domaine top-level OU feature dans un domaine) suit la même structure :

components # UI dumb
hooks # logique métier
helpers # fonctions pures
data # datasets statiques
types # déclarations
index.ts # barrel public

Pattern appliqué à 2 niveaux :

- domaine top-level → `src/References/`, `src/Routing/`, `src/Design/Theme/`
- feature dans un domaine → `src/Interactive/<FeatureName>/`

### Domaines principaux

- Design/ → primitives, theme, layout, icons
- Interactive/ → simulateurs, quiz, viz (chacun dans son sous-dossier `<FeatureName>/`)
- Page/ → contenu pédagogique (sous-module `Page/Shared/` pour le transverse pages)
- References/ → constantes économiques (Bitcoin + fiat)
- Routing/ → navigation interne
- I18n/ → traductions

### 1 symbole = 1 fichier (strict)

| Type      | Convention                                     |
| --------- | ---------------------------------------------- |
| Composant | `PascalCase.tsx`                               |
| Hook      | `useXxx.ts`                                    |
| Helper    | `camelCaseVerb.ts`                             |
| Type      | `PascalCase.ts`                                |
| Dataset   | `SCREAMING_SNAKE_CASE.ts` ou `getXxx.ts`       |

---

## Règles d'architecture (CRITIQUES)

### Principes fondamentaux

- UI = dumb components uniquement
- logique métier = hooks
- 1 composant = 1 fichier (`ComponentName.tsx`)
- pas de duplication de logique
- pas d’enum → types union
- préférer `type` à `interface`
- éviter `as const` (sauf datasets figés explicitement)

---

## Design system

### Principe clé

Les composants portent le design, pas les pages.

---

### UI INVARIANTS (STRICT)

- `Button`, `Badge`, `Caption`, `FeedbackPanel`, `SurfaceCard`, `Reference` doivent être utilisés tels quels
- toute réimplémentation inline d’un pattern existant est interdite
- `Reference` est l’unique système de navigation interne/externe
- `Interactive` components utilisent uniquement hooks pour la logique

---

### Theming

- `RouterProvider` : dark/light
- `usePageTheme()` : applique couleur selon module

Modules :

- Banking → blue
- MoneyLaws → violet
- Bitcoin → amber

---

### Style system (CONTRAINT)

- radius unique : 1rem (pas de variation libre)
- transitions : cubic-bezier standard (smooth)
- gradients + glow via CSS variables uniquement
- hover effects pilotés par variables (pas inline ad hoc)

---

## Navigation

### Router

- Context-only routing
- pas d’URL routing

---

## NAVIGATION_TREE

- structure hiérarchique 3 niveaux
- `kind: "challenge"` → quiz final

Quiz = pill "Quiz" dans navbar

---

## Interactive system

Chaque interaction (simulateur, quiz, visualisation) dans son propre dossier feature :

`src/Interactive/<FeatureName>/` + structure DDD standard.

`Interactive/index.ts` n'expose que le composant principal de chaque feature.

---

## Lecture par blocs (Reading engine)

### Principe

Certains chapitres se lisent **bloc par bloc** (révélation progressive) au lieu d'un mur de texte. Pilote : Module 1 (Banking_1 à Banking_6). Hors périmètre : quiz de fin de module + « Entrer dans le terrier ».

Domaine : `src/Page/Reading/` (structure DDD standard). Exposé : `BlockReader`, `Block`, `BLOCK_READING_CHAPTERS`.

### Recette pour câbler un chapitre (à partir d'un découpage)

Le découpage (quels blocs, quel ordre, lesquels sont `tool`, titres) est **fourni en amont** ; on ne le réinvente pas, on le câble. La prose **reste inline dans la page** (jamais déplacée vers `data`/`fr.ts`) et rien n'est retiré : le découpage = uniquement où tombent les frontières de blocs.

1. `PageTemplate` : passer `showChapterNav={false}` (`BlockReader` rend lui-même la nav chapitre en fin). Si le découpage fond le prélude dans le bloc 1, retirer la prop `prelude` et rendre `<ChapterPrelude>` comme premier enfant du bloc 1.
2. Envelopper le contenu existant dans `<BlockReader chapterId={ROUTE_NAME.X}>` + balises `<Block>` ordonnées.
3. Chaque bloc : `title` (en-tête bilingue, ex. `title={fr ? "Le piège" : "The trap"}`). Bloc bâti autour d'un composant à manipuler : `kind="tool"`. Dernier bloc : `last`.
4. Ajouter `ROUTE_NAME.X` à `BLOCK_READING_CHAPTERS` (`src/Page/Reading/data/`) pour masquer la barre de scroll (la sous-barre de jalons la remplace).
5. `npm run audit:reading-time` puis recopier le compte dans `PAGE_METADATA` (les titres de blocs bilingues comptent).

```tsx
<PageTemplate title=... showChapterNav={false}>
  <BlockReader chapterId={ROUTE_NAME.Banking_1}>
    <Block title={fr ? "Le piège" : "The trap"}>{/* prose inline */}</Block>
    <Block kind="tool" title={fr ? "..." : "..."}>
      {({ markComplete }) => (
        <>
          <p>{/* légende */}</p>
          <Sim onComplete={markComplete} />
        </>
      )}
    </Block>
    <Block last title={fr ? "..." : "..."}>{/* clôture */}</Block>
  </BlockReader>
</PageTemplate>
```

### Bloc-outil : on verrouille quand la manipulation EST l'action (contrat)

Règle : **on ne verrouille un bloc que lorsque la manipulation EST l'action pédagogique** (lancer un simulateur à son climax ; répondre à un quiz ; parcourir une exploration que le découpage déclare obligatoire). C'est l'**auteur du découpage** qui tranche : un même type de composant peut être verrouillant dans un chapitre (exploration obligatoire) et « à explorer à son rythme » ailleurs (sans `kind="tool"`).

Un `Block kind="tool"` reste **verrouillé** (« Bloc suivant » grisé) tant que son composant n'a pas atteint son **état final** : bloc en render-prop `({ markComplete }) => ...`, on câble `markComplete` au signal de complétion. Le composant expose un `onComplete?: () => void` déclenché sur son état terminal :

- Simulateurs (`onComplete` sur l'état final) : `CreditCreationSimulator`, `CompensationSimulator`, `DefaultSimulator`, `QESimulator` → action lancée (`isActive`) ; `YieldCurveSimulator` → curseur manipulé.
- `Quiz` → bonne réponse obligatoire : on câble `markComplete` sur la prop `onCorrectAnswer` (rien à ajouter au composant).
- **Exploration obligatoire** (compteur « x/N exploré » façon `KeySignatureTrio`) : le composant déclenche `onComplete` au franchissement du seuil. Primitives partagées : `ExploredCounter` (`Design/components`) + `useExplorationGate` (`Design/hooks`, set de N items distincts ; ne déclenche jamais si seuil = 0). Pour les composants génériques (paramétrés par `items`), le seuil est une **prop** (`requiredExplored`, défaut 0 = pas de gate) ; pour les composants à usage unique, c'est une const de module. Cas pilotes : `MonetaryGallery` (3 monnaies dépliées, signal via `IdentityCard onExpand`) ; `CapitalStructureChain` (2 détours remontés, compteur dérivé de `count`) ; `FlipCardGrid` (3 cartes retournées, signal via `FlipCard onReveal`) ; `DebateArena` (2 débats ouverts, signal sur `selectSide`).
- Tout nouveau composant d'action ajoute ce signal (additif, non breaking) sur son état final.

Non verrouillants (exploration **facultative**, jamais `kind="tool"`) : `AccountingTerms`, `MonetaryAggregates`, `Disclosure`, `DunbarSlider`, `MonetaryProperties`, `MonetaryPillars`, etc. — sauf si le découpage les rend obligatoires (alors ils suivent le contrat ci-dessus).

### Chrome (jalons, ancres, animations)

- **Jalons** (`BlockMilestones`) : sous-barre sticky centrée sur la colonne de contenu, calée sous le header et qui suit son auto-masquage (`useHeaderHidden`). Cliquables (saut vers un bloc déjà révélé).
- **Ancres** : `scrollIntoView({ block: "start" })` + `scroll-margin-top` sur les blocs (dégage header + sous-barre). Pas de calcul JS de la hauteur du header.
- **Bloc** (`BlockShell`) : carte enrobée + en-tête `Bloc #N · Titre`, reliée à la suivante par un maillon de chaîne (`BlockChainLink`). Bloc courant interactif ; blocs lus atténués + `pointer-events: none`.
- **Animations** (`src/index.css`) : `blockSeal` + cascade `blockLineIn` + pulse `blockConfirm` à la révélation ; `chainLinkIn` pour le maillon. `prefers-reduced-motion` respecté.
- **Overlay de fin** : la complétion d'un chapitre est célébrée par le déblocage de son **badge** (`BadgeUnlockOverlay`, cf. domaine `Achievements`), porté dans `document.body`. `finish()` ne fait que figer l'état terminal ; `BlockReader` appelle `award(chapterId)` sur `finished`.

### Persistance de session (localStorage)

Clé `bd:reading:<chapterId>`, valeur `{ maxRevealed, current, done[], finished, blockCount }` (hook `useBlockReader`, même discipline try/catch que `useSynthesisQuiz`).

- Reprise au bon bloc à la réouverture du chapitre (le routing n'est pas persisté : la reprise s'applique dès qu'on rouvre le chapitre).
- `done[]` (blocs-outils complétés) persiste : revenir en arrière ne re-verrouille rien.
- Garde : si `blockCount` enregistré diffère de l'actuel (contenu édité), l'état se réinitialise proprement.
- `finished` rouvre le chapitre en état terminé sans rejouer l'overlay.

### Deux niveaux de progression

- Jalons en tête de chapitre (`BlockMilestones`, cliquables) = progression **dans le chapitre**.
- Collection de badges = progression **inter-chapitres** (domaine `Achievements`, cf. ci-dessous). Barre globale de progression : non implémentée.

---

## Badges / accomplissements

### Principe

Gamification inter-chapitres : un badge se débloque **une seule fois**, à la **première** complétion d'un chapitre (lecture par blocs terminée) et à la **première** validation d'un quiz de fin de module. Section dédiée (entrée header → page `Badges`) qui répertorie la collection (médailles obtenues vs à débloquer).

### Domaine : `src/Achievements/` (structure DDD standard)

- `data/` : `BADGES` (catalogue, ~22 : 1 par chapitre + 1 par quiz de module ; id d'un badge chapitre = son `ROUTE_NAME`, nom réutilise la clé `nav.tree.*` du chapitre, icône Lucide par thème) ; `MODULE_QUIZ_BADGE_ID`.
- `hooks/` : `useBadgesStore` (état + persistance `localStorage` `bd:badges` = `Record<id, epochMs>` ; `award(id)` idempotent ; file de célébration) ; `useBadges` (consommateur du `BadgeContext`).
- `components/` : `BadgeProvider` (monté autour du shell dans `App`, fournit le contexte + rend l'overlay global), `BadgeMedal` (médaille SVG/CSS thémée par module : bleu/violet/ambre ; verrouillée = grisée + cadenas), `BadgeGrid` (collection groupée par module), `BadgeUnlockOverlay` (célébration apparition→disparition, portée dans `document.body`), `BadgeNavButton` (entrée header avec compteur).
- Surface publique (`index.ts`) : `BadgeProvider`, `BadgeNavButton`, `BadgeGrid`, `useBadges`, `MODULE_QUIZ_BADGE_ID`.

### Intégration des récompenses

- **Chapitre** : `BlockReader` appelle `award(chapterId)` sur `finished` (effet). Idempotent : une revisite ou un replay ne redonne rien, et seul le **premier** octroi déclenche l'overlay.
- **Quiz de module** : les pages de synthèse (`Banking7`, `MoneyLaws6`, `Bitcoin9`) appellent `award(MODULE_QUIZ_BADGE_ID.<module>)` dans `onPass` du `SynthesisQuiz`.
- L'entrée header est passée en prop (`headerAction`) `App → MainLayout → Header` pour éviter un cycle `Design → Achievements`.

---

## Quiz de synthèse

### Principe

Chaque module se termine par un quiz validant l’accès à la synthèse.

### Seuils

- Banking → 10/15
- MoneyLaws → 10/15
- Bitcoin → 15/20

---

### Architecture

`Interactive/SynthesisQuiz/` (structure DDD standard) :

- `hooks/useSynthesisQuiz.ts` → logique + localStorage
- `components/SynthesisQuiz.tsx` → UI + feedback
- `data/` → datasets i18n-aware

---

### Règles UX (STRICT)

- pas de feedback immédiat
- validation unique
- correction affichée uniquement après submit
- persistance obligatoire (localStorage)

---

## i18n (HYBRIDE STRICT)

### Règles

| Type         | Où                     |
| ------------ | ---------------------- |
| Prose pages  | inline ternaire        |
| Labels UI    | `t()`                  |
| Titres pages | `t(nav.tree.*)`        |
| Data         | getters language-aware |

---

### Règle critique

❌ interdit :
déplacer la prose d’une page vers `fr.ts`

✔ autorisé :
traduire uniquement composants réutilisables via `t()`

---

## Référentiel économique

### Source unique

`src/References/` (domaine top-level, structure DDD standard).

Exports :

- `BITCOIN_REFS`, `MACRO_REFS`, `MARKET_REFS` → constantes (subsidy, fees, hashrate, supply, M2)
- `getCurrentBlockSubsidyBTC`, `getAverageTxFeeBTC`, `getAverageTxPerSecond` → helpers dérivés

---

### Règles

- aucune valeur inventée
- source obligatoire en commentaire
- valeurs dérivées prioritaires
- cohérence inter-composants obligatoire
- recalibrage annuel

---

## Temps de lecture

### Calcul

minutes = ceil(wordCount / 200 + interactiveCount × 0.75)

---

### Source

`Page/Shared/data/PAGE_METADATA.ts`

---

### Audit

`npm run audit:reading-time` obligatoire après modification de contenu

---

## Règles de développement

- 1 symbole = 1 fichier (composant, hook, helper, type, dataset)
- hooks = logique métier uniquement
- composants = stateless
- rien d'inline dans un composant (dataset, helper, type, ternaire i18n → fichiers dédiés)
- barrels `index.ts` à chaque niveau peuplé
- pas de duplication
- simplicité > abstraction

---

## Git workflow

Branches :

- `lba/feat/*`
- `lba/fix/*`
- `lba/refacto/*`

Process :

- branch depuis main
- commit + push
- PR obligatoire
- **avant tout `git push` qui modifie un fichier sous `src/`** : invoquer le skill `ddd-pr-check` (audit DDD / séparation des responsabilités). C'est une pratique projet-wide, pas un check propre à un domaine. Voir `.claude/skills/ddd-pr-check/SKILL.md`.

❌ jamais push direct sur main (sauf modification de `CLAUDE.md`)

---

## Commands

npm run dev
npm run build
npm run build 2>&1 | tail -3
npm run lint
npm run preview
npm run audit:reading-time

---

## Règles d’exécution (AGENT)

### Mode normal (par défaut)

- single pass
- minimal file reads
- pas d’exploration
- pas de sur-ingénierie
- build logs tronqués

---

### Mode debug (exceptionnel)

Activé si :

- bug persistant
- erreur non triviale
- système multi-sources

---

### Règles debug

- analyse large autorisée
- hypothèses multiples
- puis sortie obligatoire :

> root cause → fix → retour NORMAL MODE

---

### Principes

- 90% NORMAL MODE
- 10% DEBUG MODE max
- jamais rester en DEBUG
