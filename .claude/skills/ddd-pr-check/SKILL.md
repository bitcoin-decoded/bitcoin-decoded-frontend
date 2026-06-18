---
name: ddd-pr-check
description: Audit DDD / separation-of-responsibilities checklist. **MUST be invoked before any `git push` of a branch that adds or modifies source files anywhere under `src/`.** This is a project-wide development practice - it applies to every domain (Interactive, Design, Page, Routing, I18n, References, Shared…), not a domain-specific check. Reviews folder layout, one-symbol-per-file discipline, naming conventions, barrel discipline, and inline-vs-extracted code. Prevents the architectural drift that triggers multi-day refactors.
---

# DDD PR check

You're about to push a PR that touched source code. Before pushing, walk this checklist for every domain you touched. Report concrete failures inline with file paths, then fix them.

## When to invoke

**Invoke before:**

- Any `git push` on a feature/refactor branch that adds or modifies source files anywhere under `src/`.
- Any `gh pr create` if you skipped the pre-push gate.
- When asked to "review", "lint architecture", or "verify DDD" on a branch.

**Skip for:**

- Doc-only changes (`CLAUDE.md`, `README.md`, any `*.md`).
- Config / CI changes (`.github/`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`).
- `.gitignore`, `package.json` version bumps without code, `*.local.json`.
- Pure content-prose edits to `Page/<Module>/components/<chapter>.tsx` that only change `fr ? "…" : "…"` strings without changing structure.

## The 7 invariants

For every domain folder touched on this branch, verify each rule. Stop and fix immediately if a rule fails - don't push and "clean up later".

### 1. DDD layout - domains and features

Every cohesive unit of code (a top-level domain, or a feature folder inside a domain) follows the same 5-subfolder layout. The folder name is PascalCase and matches the main exported symbol (component, hook, or concept).

| Granularity            | Example path                             |
| ---------------------- | ---------------------------------------- |
| Top-level domain       | `src/References/`                        |
| Feature inside domain  | `src/Interactive/DoubleSpendDemo/`       |
| Sub-module of a domain | `src/Design/Theme/`, `src/Page/Bitcoin/` |

### 2. Five-subfolder layout, only what's needed

```
<FolderName>/
  components/   ← UI dumb components (1 per file)
  hooks/        ← business logic, state machines (1 per file)
  data/         ← static datasets, constants (1 per file)
  helpers/      ← pure functions (1 per file)
  types/        ← type declarations (1 per file)
  index.ts      ← public-surface barrel
```

- Omit a subfolder if it would be empty.
- Never create a subfolder you don't populate.
- ❌ No other subfolder names (no `utils/`, `lib/`, `services/`, `styles/`, `models/`).

### 3. One symbol per file

| Layer       | Per file                           | Naming                                                                            |
| ----------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| components/ | 1 React `FC`                       | `PascalCase.tsx` (= folder name for the main one)                                 |
| hooks/      | 1 hook                             | `useXxx.ts` (matches feature/domain name when applicable)                         |
| helpers/    | 1 pure function                    | `camelCaseVerb.ts` (`shuffleFirstSeen`, `fmtBtc`)                                 |
| types/      | 1 type / interface                 | `PascalCase.ts` matching the type name                                            |
| data/       | 1 const or 1 language-aware getter | `SCREAMING_SNAKE_CASE.ts` for constants, `getXxx.ts` for language-aware factories |

- ❌ Do not bundle two types in one file.
- ❌ Do not stash a tiny helper at the bottom of a hook file.
- ❌ Do not declare a dataset above a component.

### 4. `index.ts` barrels at every level - and nowhere else

- Each populated subfolder has an `index.ts` that re-exports its public members.
- The folder-root `index.ts` re-exports **only the public API** - typically just the main component or the named entry points. Internal hooks/types/helpers stay private to the folder unless explicitly shared.
- `index.ts` files contain `export` statements only - no logic, no types.

### 5. Nothing inline in the component

A component file is allowed only:

- Its `Props` type (if not shared elsewhere)
- Style `CSSProperties` definitions
- Small render-helper functions that close over component state
- JSX

It must NOT contain:

- ❌ Dataset constants (move to `data/`)
- ❌ Pure utility functions (move to `helpers/`)
- ❌ Reusable type definitions (move to `types/`)
- ❌ Inline `fr ? "…" : "…"` ternaries for UI labels (use `t()`; prose stays in `Page/`)

### 6. Hooks own state and logic

- All `useState` / `useEffect` / event handlers live in the hook.
- The hook returns a single object with values + callbacks.
- The component destructures and renders.
- If the component file has more than one `useState` call, the hook is missing or under-extracted.

### 7. Cross-domain data is promoted

- If a constant, helper, or type is consumed by 2+ features (or by other domains entirely), it does NOT live inside any single feature folder.
- Promote it to its own top-level domain at `src/<DomainName>/` with the same 5-subfolder layout. `src/References/` is the canonical example (single source of truth for economic figures, consumed by multiple Interactives).
- ❌ Do not re-export a private helper through a feature barrel as a workaround.

## Reference compliant layout

A complete feature folder under any domain that uses feature-folders:

```
src/Interactive/DoubleSpendDemo/
├── components/
│   ├── DoubleSpendDemo.tsx       # 1 FC, dumb UI
│   └── index.ts                  # re-export
├── data/
│   ├── BRANCHES.ts               # 1 dataset
│   ├── CITIES.ts                 # 1 dataset
│   └── index.ts
├── helpers/
│   ├── shuffleFirstSeen.ts       # 1 pure fn
│   └── index.ts
├── hooks/
│   ├── useDoubleSpendDemo.ts     # 1 hook, owns state
│   └── index.ts
├── types/
│   ├── Branch.ts
│   ├── DoubleSpendPhase.ts
│   ├── TxId.ts
│   └── index.ts
└── index.ts                      # export { DoubleSpendDemo } from "./components";
```

The same pattern applies project-wide - at the level of a top-level domain (`References/`), a domain sub-module (`Design/Theme/`), or a page module (`Page/Banking/`).

## How to run the audit

1. List touched files: `git diff --name-only main...HEAD` (or against the merge-base).
2. Group them by domain / feature folder.
3. For each touched folder, walk the 7 invariants against its actual file tree (`Glob "<FolderPath>/**"`).
4. Report findings in this format:

```
## DDD audit - <branch name>

Folders touched: Interactive/DoubleSpendDemo, References/

### Interactive/DoubleSpendDemo - ✅ pass

### References - ❌ 2 violations
- Invariant 3 (one symbol per file): `data/MARKET_REFS.ts` exports two unrelated consts → split into two files.
- Invariant 5 (nothing inline): `helpers/getCurrentBlockSubsidyBTC.ts` declares a local `HALVING_SCHEDULE` const → move to `data/HALVING_SCHEDULE.ts` and import.

Fix before push.
```

5. Apply the fixes. Re-run `npm run build`. Then push.

## Anti-patterns frequently regressed

- "It's just one helper, I'll inline it in the component" → no. Move it to `helpers/`.
- "These two types are related, one file" → no. Two files. They can share by import.
- "I'll export it from the feature barrel so anything can use it" → no. If it's shared, promote to a top-level domain.
- "The hook is so small, I'll write the state in the component" → no. The hook can be 5 lines, that's fine.
- "The component is dumb anyway, the dataset can live at the top of the file" → no. `data/<NAME>.ts`.
- "It's a one-off, I'll skip the index.ts barrel" → no. Every populated subfolder gets one.

## Definition of done

The skill output is OK to skip only when:

- Every touched folder passes all 7 invariants, OR
- The user has been shown the violation report and explicitly chose to merge as-is.

Otherwise: fix, re-build, then push.
