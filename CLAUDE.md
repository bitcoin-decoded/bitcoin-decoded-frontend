# CLAUDE.md - Bitcoin.Decoded

App éducative interactive : comprendre Bitcoin via l'angle de l'économie autrichienne. Ton familier, pédagogique, rigoureux mais accessible, **sans marqueur IA** (éviter les cadratins). Public : francophones 25-50 ans, curieux non-bitcoiners, allergiques au jargon crypto.

Trois modules progressifs, chacun = plusieurs chapitres + un quiz final de validation :

1. Système bancaire · 2. Lois de la monnaie · 3. Bitcoin

## Stack

React 19 + TS 5.8 + Vite 7 (SWC). Recharts (data-viz). CSS = `CSSProperties` inline + utilitaires/keyframes globaux dans `src/index.css`. État = Context API uniquement. Routing = Context interne (`RouterProvider`), pas de router externe ; navigation par hash (`#route`).

## Architecture (DDD)

Tout dossier de code (domaine top-level **ou** feature) suit la même structure, sous-dossiers présents seulement s'ils sont peuplés :

```
components/  hooks/  helpers/  data/  types/  index.ts (barrel public)
```

Invariants (audités par le skill `ddd-pr-check`, cf. Git) :

- Composants = UI **dumb/stateless** ; **toute** la logique et l'état (`useState`/`useEffect`/handlers) vivent dans un hook qui retourne un objet.
- **1 symbole = 1 fichier** : `PascalCase.tsx` (FC), `useXxx.ts` (hook), `camelCaseVerb.ts` (helper pur), `PascalCase.ts` (type), `SCREAMING_SNAKE.ts` ou `getXxx.ts` (dataset / getter language-aware).
- Rien d'inline dans un composant : dataset, helper, type, ternaire i18n de label → fichiers dédiés. (Seules exceptions : son type `Props`, ses `CSSProperties`, ses render-helpers locaux.)
- `barrel index.ts` à chaque niveau peuplé ; le barrel racine d'un domaine n'expose que l'API publique.
- `type` plutôt qu'`interface` ; pas d'enum (types union) ; éviter `as const` (sauf datasets figés) ; pas de duplication ; **simplicité > abstraction**.
- Donnée/helper/type consommé par 2+ features → promu en domaine top-level (ex. `References/`), jamais re-exporté en douce depuis une feature.

Domaines : `Design/` (primitives, theme, layout, icons), `Interactive/<Feature>/` (simulateurs, quiz, viz ; `Interactive/index.ts` n'expose que le composant principal de chaque feature), `Page/` (contenu pédagogique ; `Page/Shared/` = transverse), `Achievements/` (badges), `References/` (constantes éco), `Routing/`, `I18n/`.

## Design system

« Les composants portent le design, pas les pages. »

- Primitives réutilisées **telles quelles**, jamais réimplémentées inline : `Button`, `Badge`, `Caption`, `FeedbackPanel`, `SurfaceCard`, `Reference`. `Reference` = unique système de navigation interne/externe.
- Theming : `usePageTheme()` applique la couleur du module - Banking `blue`, MoneyLaws `violet`, Bitcoin `amber` (route hors module → `base`). Dark/light via `ThemeProvider`.
- Style : radius unique **1rem** ; transitions `--ease-smooth` ; gradients/glow/hover pilotés par variables CSS, pas d'ad hoc inline. Viser une finition UI haut de gamme (Apple/Notion : sobriété, mouvement discret).

## Routing & navigation

Context-only (`RouterProvider`, `useRouterContext().setCurrentPage`). `ROUTE_NAME` = source des routes ; `AppRouter` mappe route → page ; `NAVIGATION_TREE` = arbre 3 niveaux de la sidebar (`kind: "challenge"` = quiz final, rendu en pill « Quiz »).

## Lecture par blocs - `src/Page/Reading/`

Certains chapitres se lisent **bloc par bloc** (révélation progressive). Expose `BlockReader`, `Block`, `BLOCK_READING_CHAPTERS`.

- **Câblage** : envelopper la prose **existante** (jamais déplacée vers `data`/`fr.ts`, rien retiré) dans `<BlockReader chapterId={ROUTE_NAME.X}>` + `<Block>` ordonnés ; ajouter la route à `BLOCK_READING_CHAPTERS` ; `npm run audit:reading-time` → recopier dans `PAGE_METADATA`. Le **découpage** (frontières des blocs, lesquels sont `tool`) est fourni par l'utilisateur, on ne le réinvente pas.
- **Bloc-outil** (`kind="tool"`) : verrouille « Bloc suivant » tant que la manipulation - qui **est** l'action pédagogique - n'est pas faite. Bloc en render-prop `({ markComplete }) => …` ; on câble `markComplete` au signal `onComplete` du composant à son état terminal (simulateur lancé, `Quiz` via `onCorrectAnswer`, etc.). Exploration obligatoire « x/N » via primitives partagées `useExplorationGate` + `ExploredCounter` (`Design`). Ne pas verrouiller si la manipulation n'est pas l'action (alors pas de `kind="tool"`).
- **Persistance** : `localStorage` `bd:reading:<chapterId>` = `{maxRevealed, current, done[], finished, blockCount}` (garde sur `blockCount`, discipline try/catch). La fin de chapitre est célébrée par le **badge** du chapitre (cf. Achievements), pas d'overlay générique.
- Détails (jalons `BlockMilestones`, `BlockShell`, animations `index.css`) : lire le code.

## Badges - `src/Achievements/`

Gamification inter-chapitres : un badge se débloque **une seule fois**, à la 1re complétion d'un chapitre et à la 1re validation d'un quiz de module. Entrée header → page `Badges` (collection groupée par module, médailles obtenues vs verrouillées).

- `useBadgesStore` : état + persistance `localStorage` `bd:badges` ; `award(id)` **idempotent** + file de célébration. `useBadges` = consommateur du contexte ; `BadgeProvider` monté autour du shell (`App`).
- Octroi : `BlockReader` appelle `award(chapterId)` sur `finished` ; les pages de synthèse appellent `award(MODULE_QUIZ_BADGE_ID.<module>)` dans `onPass`. Overlay `BadgeUnlockOverlay` (apparition→disparition, porté dans `document.body`).
- Catalogue `BADGES` (~22) : id d'un badge chapitre = son `ROUTE_NAME`, nom = clé `nav.tree.*` du chapitre.

## Quiz de synthèse - `src/Interactive/SynthesisQuiz/`

Quiz final par module, **paginé** (une question à la fois, nav prev/next + jalons, bouton terminer). Seuils : Banking 10/15, MoneyLaws 10/15, Bitcoin 15/20. UX : pas de feedback immédiat, validation unique, persistance localStorage ; après validation, score + réussite/échec **sans dévoiler les bonnes réponses**.

## i18n (hybride strict)

- Prose des pages → ternaire inline `fr ? … : …`, **jamais** déplacée vers `fr.ts`.
- Labels UI / composants réutilisables → `t()` ; titres de pages → `t("nav.tree.*")` ; data → getters language-aware. Parité FR/EN stricte (`src/I18n/data/{fr,en}.ts`).

## Référentiel économique - `src/References/`

Source unique des chiffres : `BITCOIN_REFS` / `MACRO_REFS` / `MARKET_REFS` + helpers dérivés (`getCurrentBlockSubsidyBTC`…). Aucune valeur inventée, source en commentaire, valeurs dérivées prioritaires, recalibrage annuel.

## Temps de lecture

`minutes = ceil(wordCount / 200 + interactiveCount × 0.75)`. Source : `Page/Shared/data/PAGE_METADATA.ts`. **`npm run audit:reading-time` obligatoire après toute modif de contenu**, puis recopier le résultat.

## Git

Branches `lba/feat/*` · `lba/fix/*` · `lba/refacto/*` (le préfixe suit le type de commit). Process : brancher depuis `main` → commit → push → **PR obligatoire**. Jamais de push direct sur `main`, **sauf** modification de `CLAUDE.md`. **Avant tout `git push` touchant `src/`** : invoquer le skill `ddd-pr-check` (`.claude/skills/ddd-pr-check/`).

## SEO et prérendu

Le site est **prérendu au build** : 52 fichiers HTML (26 routes × 2 langues), chacun avec sa prose et ses métadonnées, sans exécution JS. La langue est dans l'URL (FR à la racine, EN sous `/en`), jamais en stockage.

`docs/seo.md` décrit ce qui existe, où, et pourquoi. **Le lire avant de toucher** à `src/Seo/`, `src/Routing/data/ROUTE_SLUG.ts` ou `scripts/prerender.mjs` : plusieurs choix y sont contre-intuitifs et documentés comme tels.

## Commands

`npm run dev` · `npm run build` · `npm run lint` · `npm run preview` · `npm run audit:reading-time`

## Exécution (agent)

Mode normal par défaut : single-pass, lectures de fichiers minimales, pas de sur-ingénierie, logs de build tronqués (`| tail`). Mode debug (exceptionnel, ~10 % du temps) seulement si bug persistant ou erreur non triviale : analyse large + hypothèses multiples, puis sortie « root cause → fix → retour mode normal ».
