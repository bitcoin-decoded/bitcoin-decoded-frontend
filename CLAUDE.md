# CLAUDE.md — Bitcoin.Decoded

## Projet

Application éducative ReactJS qui enseigne l'économie et Bitcoin en jouant.
Trois mondes thématiques progressifs :

1. **MondeBleu** — Le fonctionnement du système bancaire (création monétaire, QE, Cantillon, inflation)
2. **MondeOrange** — Les lois de la monnaie (définition, cycles économiques, limites du socialisme, école autrichienne)
3. **MondeVert** — La révolution Bitcoin (3.1.1 : Qu'est-ce que Bitcoin ?)

Chaque chapitre suit le schéma : **idées clés → explications interactives → ouverture vers la suite**.

---

## Stack technique

- **React 19** + **TypeScript 5.8** + **Vite 7** (plugin SWC)
- **Recharts** pour les graphiques interactifs
- **Pas de librairie CSS** — inline CSS-in-JS via `CSSProperties` + classes utilitaires globales dans `index.css`
- **Pas de state manager externe** — Context API uniquement
- **Pas de router externe** — routage interne via Context (`RouterProvider`)

---

## Architecture DDD

Chaque domaine suit la convention :

```
Domain/
├── components/    # Composants FC (logique minimale, "bêtes")
├── hooks/         # Logique métier (rend les composants bêtes)
├── helpers/       # Fonctions utilitaires (non-hooks)
├── data/          # Datasets statiques
├── types/         # Déclarations de types
└── index.ts       # Barrel exports pour des imports propres
```

### Domaines

| Dossier | Rôle |
|---------|------|
| `src/Design/` | Système de design : composants UI partagés, icônes, layout, thème |
| `src/Design/Layout/` | MainLayout, Header (sticky + blur), Footer, NavBar |
| `src/Design/Theme/` | ThemeProvider/Context, ThemeToggle, THEME_COLORS |
| `src/Design/icons/` | Icônes SVG en FC, barrel `index.ts` |
| `src/Design/IdentityCard/` | Composant carte d'identité interactive |
| `src/Routing/` | RouterProvider/Context, NAVIGATION_TREE, ROUTE_NAME |
| `src/Page/` | Pages de contenu + composants partagés (HomePage, ChapterPrelude, PageNavigation) |
| `src/Page/MondeBleu/` | 7 pages (111→117) sur le système bancaire |
| `src/Page/MondeOrange/` | 5 pages (211→215) sur les lois de la monnaie |
| `src/Page/MondeVert/` | 1 page (311) : Qu'est-ce que Bitcoin ? |
| `src/Interactive/` | Domaine unifié : Illustrations, Simulateurs interactifs, Quiz, FlipCardGrid, DebateArena, BitcoinNodeDemo, BitcoinNetworkMap |

---

## Contextes React

### ThemeContext
- **Provider** : `ThemeProvider` (thème initial : `"dark"`)
- **State** : `{ theme: "light" | "dark"; toggleTheme: () => void }`
- **Hook** : `useThemeContext()`
- Met à jour `document.body.style.backgroundColor` au changement

### RouterContext
- **Provider** : `RouterProvider` (page initiale : `"HomePage"`)
- **State** : `{ currentPage: RouteName; setCurrentPage: (page: RouteName) => void }`
- **Hook** : `useRouterContext()`
- Pas de router URL — tout est géré par état interne

### LanguageContext
- **Provider** : `LanguageProvider` (langue initiale : `"fr"`)
- **State** : `{ language: "fr" | "en"; toggleLanguage: () => void }`
- **Hook** : `useLanguageContext()`

### Code couleur par section
`getWorldThemeColorName(currentPage)` mappe la page courante vers une palette :
- MondeBleu → `"blue"` (#3b82f6)
- MondeOrange → `"violet"` (#8b5cf6)
- MondeVert / Bitcoin → `"amber"` (#f7931a)
- HomePage / défaut → `"base"`

---

## Système de design

### THEME_COLORS

Fichier centralisé : `src/Design/Theme/data/THEME_COLORS.ts`

Structure : `THEME_COLORS[theme][palette]` où :
- `theme` = `"dark"` | `"light"`
- `palette` = `"base"` | `"blue"` | `"amber"` | `"violet"` | `"boxShadow"` | `"semantic"`

Chaque palette contient : `background`, `text`, `border` avec sous-niveaux (`primary`, `secondary`, etc.).

**Les composants portent le design des couleurs, pas les pages.**

### Typographie
- Police principale : `Inter`
- Police cypherpunk (nav, footer, header, keywords, boutons) : `JetBrains Mono`

### Surfaces et bordures (inspiré Perry Wang)
- **Gradient thématique** sur les cards/callouts : `linear-gradient(190deg, colors[world].background.primary, colors.base.background.primary)`
- **Bordure gradient directionnel** via la classe CSS globale `.gradient-border` (définie dans `index.css`) : pseudo-element `::before` avec mask, piloté par la CSS variable `--border-glow-color`
- **Hover** : `--border-glow-color` passe de `border.secondary` à `text.secondary` pour l'effet glow
- **Border-radius harmonisé** : `1rem` (cards, callouts, quotes), `1.25rem` (IdentityCard), `1.5rem` (Illustration)
- **Easing unifié** : `cubic-bezier(0.165, 0.84, 0.44, 1)` via `var(--ease-smooth)` pour toutes les transitions

### Icônes
- Composants SVG dans `src/Design/icons/`, exportés via barrel, utilisent `currentColor`
- **Lucide React** comme librairie d'icônes externe (Monitor, Cpu, Pickaxe, Info, etc.)

---

## Navigation

### NAVIGATION_TREE
Arbre hiérarchique à 3 niveaux dans `src/Routing/data/NAVIGATION_TREE.tsx`.

```typescript
type NavigationItem = {
  id?: RouteName;
  label: string;
  isPage: boolean;
  icon?: JSX.Element;
  children?: NavigationItem[];
}
```

### Helpers de navigation
- `flattenPages(items)` → séquence linéaire pour la logique précédent/suivant
- `findPathToId(nodes, id)` → chemin de labels vers une page (pour déterminer la section)
- `findAllDescendantLabels(item)` → tous les labels enfants (pour le collapse du menu)

---

## Règles de développement

1. **1 FC = 1 fichier** — jamais plusieurs composants dans un même fichier
2. **Pas de duplication de code** — factoriser, réutiliser
3. **Pas d'`enum`** — utiliser des `type` union littéraux ou `as const` (config TS `erasableSyntaxOnly`)
4. **Préférer les `type`** aux `interface`
5. **Code concis, simple, élégant** — toujours privilégier la maintenabilité
6. **Hooks = logique métier** — les composants restent "bêtes"
7. **Barrel exports** (`index.ts`) — imports propres du type `../../Domain`

---

## Workflow Git

### Convention de branches
- Feature : `lba/feat/nom-de-la-branche`
- Bug fix : `lba/fix/nom-de-la-branche`
- Refactoring : `lba/refacto/nom-de-la-branche`

### Process
1. Créer une branche depuis `main` avec la convention ci-dessus
2. Commit, push, ouvrir une PR avec description + test plan
3. L'utilisateur review et merge

**Ne jamais push directement sur `main`.**

---

## Commandes

```bash
npm run dev                        # Serveur de développement (port 5174)
npm run build                      # Build production (tsc + vite build)
npm run build 2>&1 | tail -3       # Build tronqué (économie de tokens)
npm run lint                       # ESLint
npm run preview                    # Preview du build (port 4173)
```

---

## i18n

Système **hybride strict** — le périmètre de chaque type de chaîne est non-négociable :

| Type de chaîne | Où ça vit | Exemple |
|---|---|---|
| **Prose des pages** (paragraphes, listes, titres de Callout dans `Page/<World>/components/<X>Page.tsx`) | **Inline** dans le composant via `fr ? "..." : "..."` | `{fr ? "Bitcoin ne fonctionne pas..." : "Bitcoin doesn't work..."}` |
| **Labels UI réutilisables** (boutons, badges, tooltips de composants Interactive/Design) | `src/I18n/data/fr.ts` et `en.ts` via `t()` | `t("walletGame.revealAction")` |
| **Titres de pages** (partagés avec le sommaire) | `src/I18n/data/fr.ts` sous `nav.tree.*` via `t()` | `t("nav.tree.utxoAndTransactions")` |
| **Datasets** (data files) | Getters language-aware `getFoo(language: Language)` | `getQuizDataUtxo(language)` |

### Pourquoi cette séparation ?

- **La prose des pages est éditoriale** : elle change souvent, intègre des balises JSX riches (`<Emphasis>`, `<HighlightText>`, `<i>`), et son écriture nécessite de voir le contexte structurel autour. La centraliser dans `fr.ts/en.ts` la fragmente artificiellement (besoin d'inventer 30 clés `bitcoin7.outroP3Italic2` pour un seul paragraphe) et casse la lisibilité du composant page.
- **Les labels de composants sont réutilisables** : un bouton "Réinitialiser" ou un badge "Signature valide" apparaît dans plusieurs composants ou états. Centraliser garantit la cohérence et facilite l'audit traduction.

### ❌ Anti-pattern à éviter

**Ne jamais migrer la prose d'une page vers `fr.ts/en.ts`.** Si tu vois un fichier `<X>Page.tsx` qui utilise `t("xPage.prelude")`, `t("xPage.outroP3Italic2")`, etc., c'est une erreur — **rétablir le pattern inline ternaire**.

Exemple correct (cf. `Bitcoin6Page.tsx`, `Bitcoin7Page.tsx`, `Bitcoin8Page.tsx`) :

```tsx
const { t, language } = useTranslation();
const fr = language === "fr";

return (
  <PageTemplate
    title={t("nav.tree.utxoAndTransactions")}     // ← clé i18n (titre partagé sommaire)
    prelude={fr ? "Prose FR..." : "Prose EN..."}  // ← inline ternaire
  >
    <p>{fr ? "Paragraphe FR" : "Paragraph EN"}</p>
    <UTXOTransactionBuilder />                    {/* ← composant réutilisable, ses labels via t() */}
  </PageTemplate>
);
```

Les **fichiers de traduction** : `src/I18n/data/fr.ts` et `src/I18n/data/en.ts`.

---

## Structure d'une page type

```tsx
<PageTemplate
  title={t("nav.tree.xxx")}    {/* Titre partagé avec le sommaire */}
  prelude={<>Prélude</>}
>
  <p>Contenu avec <Emphasis /> et <KeywordHighlight /></p>
  <Callout ... />               {/* Encart concept clé */}
  <Quote ... />                 {/* Citation (author et source optionnels) */}
  {/* Composants interactifs (simulateurs, quiz, illustrations) */}
</PageTemplate>
```

### Prelude (Prélude)

**Définition** : Le Prelude est une **couche de compression conceptuelle**. C'est un résumé ultra-condensé, dense, technique, lisible par un expert, qui compresse les concepts structurants du chapitre sous forme très concise.

Le Prelude n'est PAS :
- ❌ une accroche narrative ou marketing
- ❌ une introduction simplifiée ou vulgarisée
- ❌ un résumé classique ou un abstract
- ❌ du storytelling ou du teasing

Le Prelude EST :
- ✅ un condensé structurel des idées-forces du chapitre
- ✅ techniquement fidèle au sujet
- ✅ immédiatement reconnaissable par un expert du domaine
- ✅ une préparation mentale au body du chapitre

#### Règles de génération

1. **Densité maximale** — chaque phrase porte au moins un concept structurant ; aucun mot superflu
2. **Fidélité technique** — terminologie exacte, pas de simplification abusive
3. **Complétude structurelle** — tous les axes conceptuels du chapitre doivent être présents, même si l'explicitation reste volontairement minimale
4. **Pas de fluff** — zéro phrase marketing, zéro ton d'accroche, zéro storytelling
5. **Court** — 2 à 4 phrases maximum
6. **Le body du chapitre suit la trame conceptuelle du Prelude** — le Prelude pose la structure, le body la développe

#### Critères de qualité

Un bon Prelude satisfait ces tests :
- [ ] Un expert du domaine peut reconstruire mentalement le plan du chapitre à partir du Prelude seul
- [ ] Aucune phrase ne peut être retirée sans perte d'information structurelle
- [ ] Le vocabulaire technique est exact (pas d'approximations)
- [ ] Le ton est neutre, factuel, dense — pas de séduction
- [ ] Le body du chapitre développe chaque concept mentionné dans le Prelude, dans l'ordre

---

## Agent Execution Rules (IMPORTANT)

### General behavior

- Work in a single pass whenever possible.
- Avoid re-planning or multiple iterations unless strictly necessary.
- Prefer simple and direct modifications over complex reasoning.
- Keep responses concise and avoid unnecessary explanations.

---

### Tool usage

- Do NOT use browser, navigation, or screenshot tools unless explicitly requested.
- Avoid exploratory actions (no "let's inspect", "let's explore").
- Limit tool usage to the strict minimum required to complete the task.

---

### File access

- Read only the files that are strictly necessary.
- Do not scan the entire repository.
- Avoid re-reading the same files multiple times.

---

### Build policy

- Use truncated build output: `npm run build 2>&1 | tail -3`
- Only check the exit status of the build.
- Do NOT analyze build logs if the build succeeds.
- If the build fails:
  - Read only error lines
  - Attempt a single fix
  - Retry only once

---

### Git workflow

- Create a branch, commit, push, and open a PR.
- Do not perform additional git operations beyond what is required.

---

### Design workflow

- Use the existing design system and rules defined in this file.
- Do NOT perform new external design exploration.
- Base all decisions on the existing design direction.
- If a detail is missing, make a reasonable assumption instead of exploring.
- If design feels constrained or suboptimal:
  → allow controlled creative deviation
  → but explicitly justify the deviation before applying it

---

### Performance & token optimization

- Minimize reasoning steps.
- Avoid large outputs and verbose explanations.
- Do not analyze large tool outputs (JSON, logs, etc.).
- Prioritize efficiency over completeness when possible.

---

## Adaptive Execution Modes (IMPORTANT)

The agent operates in two modes:

### 1. NORMAL MODE (default)

Goal: fast, efficient execution with minimal token usage.

Behavior:
- Single-pass execution
- Minimal file reading
- No unnecessary exploration
- Truncated build output only
- No deep analysis unless required

---

### 2. DEEP DEBUG MODE (temporary)

Goal: identify root causes for complex or unclear issues.

#### Automatic activation triggers:

Enter DEEP DEBUG MODE if:
- A bug persists after 2 iterations
- The error is unclear or not directly actionable
- Multiple parts of the system may be involved
- The issue cannot be solved with a simple fix

#### Behavior in DEEP MODE:

- Analyze full logs if needed
- Consider multiple hypotheses
- Explore system interactions (within reason)
- Prioritize understanding over speed
- Accept higher token usage temporarily

---

### Exit rule (MANDATORY)

DEEP DEBUG MODE is temporary and MUST end with:

1. Root cause summary
2. Clear recommended fix
3. Minimal implementation plan

Then:

- Explicitly exit DEEP MODE
- Resume NORMAL MODE for execution

Example:
"Root cause identified: X. Recommended fix: Y. Returning to NORMAL MODE."

---

### Safeguards

- Do NOT remain in DEEP MODE after providing a solution
- Do NOT perform multiple deep iterations
- Limit DEEP MODE to a single investigation cycle per issue

---

### Guiding principle

- NORMAL MODE handles 90% of tasks efficiently
- DEEP DEBUG MODE is reserved for the 10% complex cases
- Always return to NORMAL MODE after resolving complexity
