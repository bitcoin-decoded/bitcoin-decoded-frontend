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

### Structure standard domaine

`Domain/`

components # UI dumb components
hooks # logique métier
helpers # utils
data # datasets statiques
types
index.ts # barrel export

### Domaines principaux

- Design/ → système UI global (primitives, theme, layout, icons)
- Page/ → contenu pédagogique
- Interactive/ → simulateurs, quiz, interactions
- Routing/ → navigation interne
- I18n/ → traductions
- Shared/ → composants transverses

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

### Domaine unique

Contient :

- simulateurs
- quiz
- visualisations
- interactions pédagogiques

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

`Interactive/SynthesisQuiz/`

- `useSynthesisQuiz` → logique métier + localStorage
- `SynthesisQuiz.tsx` → UI + feedback
- datasets i18n-aware

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

`Interactive/data/ECONOMIC_REFERENCE.ts`

Contient :

- Bitcoin (subsidy, fees, hashrate, supply)
- Fiat (M2 US / EU / global)

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

`Shared/data/PAGE_METADATA.ts`

---

### Audit

`npm run audit:reading-time` obligatoire après modification de contenu

---

## Règles de développement

- 1 FC = 1 fichier
- hooks = logique métier uniquement
- composants = stateless
- pas de duplication
- barrels `index.ts`
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
