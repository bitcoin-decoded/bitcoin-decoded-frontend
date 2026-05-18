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
