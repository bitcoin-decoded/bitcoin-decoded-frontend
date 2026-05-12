# CLAUDE.md - Bitcoin.Decoded

## Projet

Application éducative qui enseigne Bitcoin sous l'angle de l'économie autrichienne, sous un ton familier (non académique), tout en étant rigoureux, et de façon interactive. L'utilisateur apprend en expérimentant.

Trois modules thématiques progressifs :

1. Le fonctionnement du système bancaire
2. Les lois de la monnaie
3. La révolution Bitcoin

Chaque chapitre suit le schéma : **prelude → explications interactives → ouverture vers la suite**.
Chaque module se conclut par un quiz de validation (chapitre spécial).

### Public cible

Francophones 25-50 ans, curieux mais NON-bitcoiners. Méfiants face aux
promesses, soucieux de comprendre avant d'agir, allergiques au jargon
crypto. Ils savent ce qu'est un Livret A et l'inflation, pas la création
monétaire ni le protocole Bitcoin.

---

## Stack technique

- **React 19** + **TypeScript 5.8** + **Vite 7** (plugin SWC)
- **Recharts** pour les graphiques interactifs
- **Pas de librairie CSS** - inline CSS-in-JS via `CSSProperties` + classes utilitaires globales dans `index.css`
- **Pas de state manager externe** - Context API uniquement
- **Pas de router externe** - routage interne via Context (`RouterProvider`)

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

| Dossier                    | Rôle                                                                                                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/Design/`              | Système de design : primitives UI (`Button`, `SurfaceCard`, `Caption`, `Badge`, `FeedbackPanel`, `Callout`, `Quote`, `Disclosure`, `Reference`, …), icônes, layout, thème, marque |
| `src/Design/Brand/`        | `BitcoinDecodedLogo`, `BitcoinDecodedAvatar`                                                                                                                                      |
| `src/Design/Layout/`       | MainLayout, Header (hide-on-scroll), Footer, NavBar, NavDrawer                                                                                                                    |
| `src/Design/Theme/`        | ThemeProvider/Context, ThemeToggle, THEME_COLORS, `usePageTheme()`                                                                                                                |
| `src/Design/icons/`        | Icônes SVG en FC, barrel `index.ts`                                                                                                                                               |
| `src/Design/IdentityCard/` | Composant carte d'identité interactive                                                                                                                                            |
| `src/Design/Responsive/`   | `useBreakpoint()`, `useMediaQuery()`                                                                                                                                              |
| `src/Routing/`             | RouterProvider/Context, NAVIGATION_TREE, ROUTE_NAME                                                                                                                               |
| `src/Page/`                | Pages de contenu et composants partagés                                                                                                                                           |
| `src/Page/Shared/`         | `HomePage`, `PageTemplate`, `ChapterPrelude`, `PageNavigation`, `ReadingTimeBadge`, `ReadingProgressBar`, `ScrollToTopButton`, `RevealOnScroll`                                   |
| `src/Page/Banking/`        | 7 pages sur le système bancaire (Banking1Page → Banking7Page)                                                                                                                     |
| `src/Page/MoneyLaws/`      | 5 pages sur les lois de la monnaie (MoneyLaws1Page → MoneyLaws5Page)                                                                                                              |
| `src/Page/Bitcoin/`        | 9 pages sur Bitcoin (Bitcoin1Page → Bitcoin9Page, dont Bitcoin9Page = quiz de synthèse)                                                                                           |
| `src/Interactive/`         | Domaine unifié : Illustrations, Simulateurs interactifs, Quiz, FlipCardGrid, DebateArena, BitcoinNodeDemo, BitcoinNetworkMap, …                                                   |

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
- Pas de router URL - tout est géré par état interne

### LanguageContext

- **Provider** : `LanguageProvider` (langue initiale : `"fr"`)
- **State** : `{ language: "fr" | "en"; toggleLanguage: () => void }`
- **Hook** : `useLanguageContext()`

### Code couleur par section

`usePageTheme()` (= `useThemeContext()` + `useRouterContext()`) renvoie `{ colors, moduleTheme }` où `moduleTheme` est dérivé de la page courante :

- Banking → `"blue"` (#3b82f6)
- MoneyLaws → `"violet"` (#8b5cf6)
- Bitcoin → `"amber"` (#f7931a)
- HomePage / défaut → `"base"`

Toutes les primitives (`Button`, `SurfaceCard`, `Caption`, `Badge`, `FeedbackPanel`, `Reference`) sont module-aware via ce hook : l'accent suit automatiquement le monde courant.

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

### Primitives UI partagées (`src/Design/components/`)

Centralisent le style des éléments récurrents. Toutes lisent `usePageTheme()` et s'adaptent au thème (dark/light) + au module (blue/violet/amber/base).

| Primitive       | Rôle                                                          | Variantes                                                                                        |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Button`        | Action - bouton avec icône optionnelle                        | `primary` / `secondary` / `ghost`, `sm` / `md` / `lg`, `fullWidth`, `disabled`, override `color` |
| `SurfaceCard`   | Coque standard des simulateurs (gradient + `gradient-border`) | `glowColor`, `fillColor`, `gap`, `margin`, `as`                                                  |
| `Caption`       | Petit titre uppercase mono (eyebrow)                          | `tone` = `world` / `accent` / `muted`, `size` = `xs` / `sm` / `md`, `icon`                       |
| `Badge`         | Pill compact pour statut / verdict                            | `tone` = `success` / `error` / `info` / `neutral` / `world`, `size` = `xs` / `sm`, `icon`        |
| `FeedbackPanel` | Bloc tinté (résultat, hint, avertissement)                    | `tone` (5 valeurs), `variant` = `full` / `border-left`, `icon`, `title`                          |

**Règle** : si un composant Interactive ré-implémente l'un de ces patterns en inline, c'est qu'il faut migrer vers la primitive.

### Mise en valeur du texte vs référence

Trois patterns inline pour éviter la confusion "cliquable / pas cliquable" :

| Composant              | Visuel                       | Cliquable | Pour                                                |
| ---------------------- | ---------------------------- | --------- | --------------------------------------------------- |
| `<strong>`             | gras neutre (HTML standard)  | ❌        | un mot / concept à faire ressortir                  |
| `HighlightText`        | fond stabilo (gradient doux) | ❌        | un passage entier qu'on veut surligner              |
| `Reference to={...}`   | underline pointillé + accent | ✅        | renvoi interne (autre chapitre / module)            |
| `Reference href={...}` | idem + icône `↗` traînante   | ✅        | renvoi externe (Wikipédia, source canonique, etc.)  |

`Reference` est polymorphique : `to: RouteName` pour l'interne, `href: string` pour l'externe — TypeScript force l'un ou l'autre. Voir le JSDoc de `Reference.tsx` pour les anti-patterns.

### Collapse : Disclosure vs Accordion

`Disclosure` + `useDisclosure` = **un seul** panneau (état `boolean`). `useAccordion<K>` = **groupe** mutuellement exclusif (état `K | null`). Convention Headless UI / Radix / MUI.

### Composants overlay (`src/Page/Shared/`)

Montés au niveau `MainLayout` ou `PageTemplate`, indépendants du contenu :

- **`ReadingProgressBar`** - barre de progression `position: fixed; bottom: 0` (chapitres uniquement)
- **`ScrollToTopButton`** - flèche flottante en bas-droite, fade-in après 600 px de scroll, smooth scroll au clic (chapitres uniquement, DDD : `useScrollToTop()` + composant FC)
- **`RevealOnScroll`** - wrapper IntersectionObserver pour les apparitions au scroll (utilisé sur HomePage)

### Rythme vertical des pages

`PageTemplate` et `HomePage` utilisent un système de tokens responsifs (`pick(mobile, tablet, desktop)`) qui pilote tous les espacements verticaux d'une page. La règle :

> **Couplage serré à l'intérieur d'un groupe sémantique**, **respiration généreuse entre groupes**.

Pour `PageTemplate` : `pageTop`, `titleToReadingTime`, `headerToPrelude`, `preludeToBody`, `pageBottom`. Pour `HomePage` : tokens dédiés (`logoToSlogan`, `sloganToHeadline`, `headlineToSub`, `subToCta`, `sectionPadY`, …).

Ne pas réintroduire de `marginTop` / `marginBottom` ad hoc sur les sous-éléments - passer par les tokens.

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
  /**
   * Discriminateur sémantique du type de chapitre. Pilote le rendu d'un marqueur
   * visuel dans la navbar (ex : pill `Quiz` pour les chapitres `kind: "challenge"`).
   * Champ extensible : ajouter ici les futurs types (`exercise`, `recap`, …).
   */
  kind?: "challenge";
  children?: NavigationItem[];
};
```

### Helpers de navigation

- `flattenPages(items)` → séquence linéaire pour la logique précédent/suivant
- `findPathToId(nodes, id)` → chemin de labels vers une page (pour déterminer la section)
- `findAllDescendantLabels(item)` → tous les labels enfants (pour le collapse du menu)

### Marqueur visuel `challenge` dans la navbar

Les chapitres `kind: "challenge"` (= quiz de synthèse de fin de module) sont distingués dans la navbar par un pill `Quiz` (icône Lucide `ClipboardCheck` + label uppercase mono), construit sur la primitive `Badge` (taille `xs`, couleur `#f7931a` figée pour cohérence avec l'accent navigation). Le pill est rendu inline juste après le libellé (pas flotté à droite) dans `NavItem.tsx`.

Pour ajouter un nouveau type de marqueur (`exercise`, `recap`, …) : étendre le discriminateur `kind` sur `NavigationItem`, ajouter une branche de rendu dans `NavItem.tsx` à côté de celle de `challenge`.

---

## Quiz de synthèse (chapitres `kind: "challenge"`)

Chaque module se conclut par un chapitre « Tu as compris ? Prouve-le. » (EN : « Got it? Prove it. ») qui contient un quiz à validation différée gatant un texte de synthèse.

### Pages concernées

| Module    | Route       | Seuil   | Clé de titre i18n          |
| --------- | ----------- | ------- | -------------------------- |
| Banking   | Banking_7   | ≥ 10/15 | `nav.tree.synthesis`       |
| MoneyLaws | MoneyLaws_5 | ≥ 10/15 | `nav.tree.orangeSynthesis` |
| Bitcoin   | Bitcoin_9   | ≥ 15/20 | `nav.tree.greenSynthesis`  |

### Briques (toutes dans `src/Interactive/`)

- `types/SynthesisQuizData.ts` — `SynthesisQuizData`, `SynthesisQuizQuestion`, `SynthesisQuizAnswer`, `ChapterReference` (`{ routeId: RouteName; labelKey: TranslationKey }`)
- `hooks/useSynthesisQuiz.ts` — état des sélections, score mémoïsé, soumission, reset, callback `onPass`, **persistance localStorage** sous une `storageKey` fournie par l'appelant
- `data/QUIZ_DATA_MODULE_<N>_SYNTHESIS.ts` — getters language-aware retournant un `SynthesisQuizData` avec les références de chapitres (route id + clé i18n)
- `components/SynthesisQuiz.tsx` — UI : une seule validation au clic du bouton « Valider », **pas de feedback au clic sur une réponse**. Au submit : score + FeedbackPanel par question (success / error) avec liens cliquables vers les chapitres référencés. Bouton « Recommencer » qui clear le localStorage et appelle `onReset` (pour permettre à la page parent de masquer à nouveau la synthèse)

### Pattern d'intégration dans une page

```tsx
const { isActive: isQuizPassed, activate: onQuizPassed, reset: onQuizReset } = useToggleSimulator();
const quiz = getQuizDataModule < N > Synthesis(language);

return (
  <PageTemplate title={t("nav.tree.<X>Synthesis")}>
    <p>{/* intro courte */}</p>
    <SynthesisQuiz
      {...quiz}
      storageKey="synthesisQuiz.module<N>" // ← clé unique par module
      onPass={onQuizPassed}
      onReset={onQuizReset}
    />
    {isQuizPassed && <>{/* texte de synthèse, gaté */}</>}
  </PageTemplate>
);
```

### Persistance

`localStorage` (pas Context) — l'état doit survivre au F5 ET au saut de page via Reference.

---

## Temps de lecture (centralisé)

### Source de vérité

`src/Page/Shared/data/PAGE_METADATA.ts` mappe chaque `RouteName` → `{ wordCount, interactiveCount }`. Une page non listée ⇒ pas de badge de temps de lecture (cas voulu : `HomePage`).

### Calcul

`src/Page/Shared/helpers/getReadingTime.ts` :

```
minutes = ceil( wordCount / 200  +  interactiveCount × 0.75 )
```

- **200 WPM** : pace adulte standard pour de la prose éducative
- **0.75 min / interactif** : engagement moyen attendu (lire le prompt, interagir, lire le résultat)

### Audit & recalibrage

`npm run audit:reading-time` (= `node scripts/count-prose.mjs`) re-mesure tous les chapitres en extrayant la prose FR des ternaires `fr ? … : …` et en comptant les composants Interactive. À relancer après tout ajout / réécriture significative de contenu et copier le résultat dans `PAGE_METADATA`.

**Règle** : ne jamais hand-typer un `wordCount` dans `PAGE_METADATA`. Toujours partir de la sortie du script.

---

## Règles de développement

1. **1 FC = 1 fichier** - jamais plusieurs composants dans un même fichier
2. **Pas de duplication de code** - factoriser, réutiliser
3. **Pas d'`enum`** - utiliser des `type` union littéraux ou `as const` (config TS `erasableSyntaxOnly`)
4. **Préférer les `type`** aux `interface`
5. **Code concis, simple, élégant** - toujours privilégier la maintenabilité
6. **Hooks = logique métier** - les composants restent "bêtes"
7. **Barrel exports** (`index.ts`) - imports propres du type `../../Domain`

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
npm run audit:reading-time         # Recompte les mots de chaque page → met à jour PAGE_METADATA
```

---

## i18n

Système **hybride strict** - le périmètre de chaque type de chaîne est non-négociable :

| Type de chaîne                                                                                          | Où ça vit                                             | Exemple                                                             |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| **Prose des pages** (paragraphes, listes, titres de Callout dans `Page/<World>/components/<X>Page.tsx`) | **Inline** dans le composant via `fr ? "..." : "..."` | `{fr ? "Bitcoin ne fonctionne pas..." : "Bitcoin doesn't work..."}` |
| **Labels UI réutilisables** (boutons, badges, tooltips de composants Interactive/Design)                | `src/I18n/data/fr.ts` et `en.ts` via `t()`            | `t("walletGame.revealAction")`                                      |
| **Titres de pages** (partagés avec le sommaire)                                                         | `src/I18n/data/fr.ts` sous `nav.tree.*` via `t()`     | `t("nav.tree.utxoAndTransactions")`                                 |
| **Datasets** (data files)                                                                               | Getters language-aware `getFoo(language: Language)`   | `getQuizDataUtxo(language)`                                         |

### Pourquoi cette séparation ?

- **La prose des pages est éditoriale** : elle change souvent, intègre des balises JSX riches (``, `<HighlightText>`, `<i>`), et son écriture nécessite de voir le contexte structurel autour. La centraliser dans `fr.ts/en.ts`la fragmente artificiellement (besoin d'inventer 30 clés`bitcoin7.outroP3Italic2` pour un seul paragraphe) et casse la lisibilité du composant page.
- **Les labels de composants sont réutilisables** : un bouton "Réinitialiser" ou un badge "Signature valide" apparaît dans plusieurs composants ou états. Centraliser garantit la cohérence et facilite l'audit traduction.

### ❌ Anti-pattern à éviter

**Ne jamais migrer la prose d'une page vers `fr.ts/en.ts`.** Si tu vois un fichier `<X>Page.tsx` qui utilise `t("xPage.prelude")`, `t("xPage.outroP3Italic2")`, etc., c'est une erreur - **rétablir le pattern inline ternaire**.

Exemple correct (cf. `Bitcoin6Page.tsx`, `Bitcoin7Page.tsx`, `Bitcoin8Page.tsx`) :

```tsx
const { t, language } = useTranslation();
const fr = language === "fr";

return (
  <PageTemplate
    title={t("nav.tree.utxoAndTransactions")} // ← clé i18n (titre partagé sommaire)
    prelude={fr ? "Prose FR..." : "Prose EN..."} // ← inline ternaire
  >
    <p>{fr ? "Paragraphe FR" : "Paragraph EN"}</p>
    <UTXOTransactionBuilder /> {/* ← composant réutilisable, ses labels via t() */}
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
  <p>Contenu avec <Reference /> et <KeywordHighlight /></p>
  <Callout ... />               {/* Encart concept clé */}
  <Quote ... />                 {/* Citation (author et source optionnels) */}
  {/* Composants interactifs (simulateurs, quiz, illustrations) */}
</PageTemplate>
```

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
