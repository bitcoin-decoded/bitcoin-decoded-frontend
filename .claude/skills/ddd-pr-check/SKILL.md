---
name: ddd-pr-check
description: Audit DDD/separation-of-responsibilities checklist. **MUST be invoked before any `git push` of a branch that adds or modifies files under `src/Interactive/`, `src/References/`, or any other domain that follows the 5-subfolder layout.** Reviews folder layout, one-symbol-per-file discipline, naming conventions, barrel discipline, and inline-vs-extracted code. Prevents the kind of architectural drift that triggers a 3-day refacto.
---

# DDD PR check

You're about to push a PR that touched the Interactive domain (or another DDD-style domain). Before pushing, walk this checklist. Report concrete failures inline with file paths, then fix them.

## When to invoke

- Just before `git push` on a feature/refactor branch that adds or modifies files in any domain that uses the 5-subfolder DDD layout (`Interactive/`, `References/`, future siblings).
- Just before `gh pr create` if you skipped the pre-push gate.
- When asked to "review", "lint architecture", or "verify DDD" on a branch.

Skip this skill for: doc-only changes, single-file fixes outside a DDD domain (e.g. `Page/`, `I18n/`), CI/config changes.

## The 7 invariants

For every Interactive feature touched on this branch, verify each rule. Stop and fix immediately if a rule fails — don't push and "clean up later".

### 1. One folder per Interactive feature
- Folder: `src/Interactive/<PascalCaseFeatureName>/` matching the main component name.
- ❌ No new file directly under `src/Interactive/` (except `index.ts` and the legacy shared `helpers/`, `types/`).

### 2. Five-subfolder layout, only what's needed
```
<FeatureName>/
  components/   ← UI dumb components (1 per file)
  hooks/        ← business logic, state machines (1 per file)
  data/         ← static datasets, constants (1 per file)
  helpers/      ← pure functions (1 per file)
  types/        ← type declarations (1 per file)
  index.ts      ← public-surface barrel
```
- Omit a subfolder if empty; never create a subfolder you don't populate.
- ❌ No other subfolder names (no `utils/`, `lib/`, `services/`, `styles/`).

### 3. One symbol per file
| Layer       | Per file                                  | Naming                                |
|-------------|-------------------------------------------|---------------------------------------|
| components/ | 1 React `FC`                              | `PascalCase.tsx` (= folder name for the main one) |
| hooks/      | 1 hook                                    | `useXxx.ts` (matches feature name)    |
| helpers/    | 1 pure function                           | `camelCaseVerb.ts` (`shuffleFirstSeen`, `fmtBtc`) |
| types/      | 1 type / interface                        | `PascalCase.ts` matching the type name |
| data/       | 1 const or 1 getter                       | `SCREAMING_SNAKE_CASE.ts` for constants, `getXxx.ts` for language-aware factories |

- ❌ Do not bundle two types in one file. Do not stash a tiny helper at the bottom of a hook file. Do not declare a dataset above a component.

### 4. `index.ts` barrels at every level — and nowhere else
- Each populated subfolder has an `index.ts` that re-exports its public members.
- The feature root `<FeatureName>/index.ts` re-exports **only the public API** — typically just the main component. Internal hooks/types/helpers stay private to the feature unless explicitly shared.
- `index.ts` files contain `export` statements only — no logic, no types.

### 5. Nothing inline in the component
The component file is allowed only:
- Its `Props` type (if not shared)
- Style `CSSProperties` definitions
- Small render-helper functions that close over component state
- JSX

It must NOT contain:
- ❌ Dataset constants (move to `data/`)
- ❌ Pure utility functions (move to `helpers/`)
- ❌ Reusable type definitions (move to `types/`)
- ❌ Inline `fr ? "…" : "…"` ternaries (use `t()`; prose stays in `Page/`)

### 6. Hooks own state and logic
- All `useState` / `useEffect` / event handlers live in the hook.
- The hook returns a single object with values + callbacks.
- The component destructures and renders. If the component file has more than one `useState` call, the hook is missing.

### 7. Cross-domain data gets promoted to a top-level domain
- If a constant or helper needs to be consumed by 2+ features (or by `Page/`, `Design/`, etc.), it does NOT live inside any single feature folder.
- Promote it to its own top-level domain at `src/<DomainName>/` with the same 5-subfolder layout (`References/` is the reference example).
- ❌ Do not re-export it through a feature barrel as a workaround.

## Reference compliant layout

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
└── index.ts                      # only: export { DoubleSpendDemo } from "./components";
```

## How to run the audit

1. List the files touched on this branch: `git diff --name-only main...HEAD` (or against the merge-base).
2. Group by feature folder under `src/Interactive/` (or other DDD domain).
3. For each touched feature, walk the 7 invariants above against its actual file tree (`Glob "<FeaturePath>/**"`).
4. Report findings in this format:

```
## DDD audit — <branch name>

Features touched: DoubleSpendDemo, NetworkFlywheel

### DoubleSpendDemo — ✅ pass

### NetworkFlywheel — ❌ 2 violations
- Invariant 5 (nothing inline in component): `NetworkFlywheel.tsx:42-58` declares `STEP_ICONS` inline → move to `data/STEP_ICONS.ts`.
- Invariant 3 (one symbol per file): `helpers/fmtBtc.ts` also exports `fmtTxMin` → split into `helpers/fmtTxMin.ts`.

Fix before push.
```

5. Apply the fixes. Re-run `npm run build`. Then push.

## Anti-patterns frequently regressed

- "It's just one helper, I'll inline it in the component" → no. Move it.
- "These two types are related, one file" → no. Two files. They can share by import.
- "I'll export it from the feature barrel so anything can use it" → no. If it's shared, promote to a top-level domain.
- "The hook is so small, I'll write the state in the component" → no. The hook can be 5 lines, that's fine.
- "The component is dumb anyway, the dataset can live at the top of the file" → no. `data/<NAME>.ts`.

## Definition of done

The skill output is OK to skip only when:
- Every touched feature passes all 7 invariants, OR
- The user has been shown the violation report and explicitly chose to merge as-is.

Otherwise: fix, re-build, then push.
