---
name: component-ledger-check
description: Quality checklist for the ledger-design refactor of interactive components (sims, visuals, cards) under src/Interactive/** and src/Page/*/components/**. **MUST be invoked before any `git push` of such a refactor branch.** Codifies what the ledger pass expects — the centralized getTypography scale at weight 400 (no faux bold), Streamline doodle icons, shared dedup atoms, the settled premium-colour rules, and the browser-verification gotchas — distilled from the module-3 chapter refactors (double-spend, consensus, halving, UTXO) and the user's repeated corrections. Pairs with `ddd-pr-check` (structure); this one covers visual/ledger quality.
---

# Component ledger check

Before pushing a component-refactor PR, walk this for EVERY component you touched. Grep the
anti-pattern, read the hits in context, fix them, then push. Never "clean up later".

Pairs with `ddd-pr-check` (folder/symbol structure). Run both.

## When to invoke

- Before any `git push` / `gh pr create` that redesigns or restyles components under
  `src/Interactive/**` or `src/Page/*/components/**`.
- When asked to "check the component refactor", "verify the ledger pass", audit a chapter's sims.

Skip for doc/config-only changes, or pure logic/hook/data edits that don't touch styling.

## 1. Typography — spread whole roles, weight 400, nothing below 14px

The scale is owned by `getTypography(breakpoint)` (`Design/Theme/data/getTypography.ts`). Roles
(desktop / mobile), all `fontWeight: 400`:

- `prose` 16px serif · `note` 14/13px serif (prose sublabels, descriptions, captions)
- `heading` 20/18px mono (titles) · `display` 40/32px mono (focal readouts — the year in the time
  machine) · `label` 17/16px mono small-caps · `figure` 16/15px mono tabular (amounts, hashes,
  data) · `micro` 14px mono (fine labels, chips, section labels) · `kicker` 14/13px mono uppercase-tracked (eyebrow)

Rules:

- **Weight is 400. `fontWeight: 500` (or higher) on a MONO element is a faux bold** — Cutive Mono
  ships one weight, heavier values synthesize a coarse fake. This is the user's most-repeated
  correction. Emphasis comes from role/size/colour/`fontVariant: small-caps`, never weight. (The
  body serif *can* take 500 for real emphasis; only mono is single-weight. Grep `fontWeight:\s*[5-9]`
  and check the element's family.)
- **Spread the whole role** (`...typo.micro`), never a partial pick (`fontSize: typo.micro.fontSize`)
  — partials drop line-height/letter-spacing/family. Grep `fontSize:\s*typo\.` and `fontSize:\s*["']`
  and `fontSize:\s*isMobile` — every hit not coming from a spread role is a violation.
- **No faux italic on mono.** `fontStyle: "italic"` on a Cutive element is synthesized. Prose that
  wants italic belongs in the serif `note` role. Grep `fontStyle:\s*["']italic`.
- Nothing below 14px (`micro` is the floor). Titles use `heading`/`label` so they read above their
  `micro`/`note` sub-labels.
- Never spread `mono` / `fontFamily: BRAND.fonts.mono` onto a whole card or container — it forces
  descriptions and prose into mono. Prose is serif (`prose`/`note`); only labels/amounts are mono.

## 2. Fonts, separators, SaaS tells

- Every `fontFamily` is `BRAND.fonts.{display,body,mono}` or `"inherit"`. Grep for hardcoded faces
  (`JetBrains|Inter|monospace|serif|Arial`).
- Zero `Separator` / `role="separator"` in a component (the three-square pair was removed).
- `borderRadius: 0` everywhere (only `"50%"` for a genuine coin/dot). No `linear-gradient`/`radial-gradient`
  fills, no `boxShadow`, no `.gradient-border`. Grep them.
- **`SurfaceCard` ignores `glowColor` and `fillColor`** — they are dead no-op props. Remove them;
  never rely on them for a border/glow.

## 3. The recurring defects (grep these every time)

| Defect | Grep / tell | Fix |
|---|---|---|
| Faux bold | `fontWeight:\s*[5-9]` on mono | spread the role (weight 400) |
| Partial fontSize | `fontSize:\s*typo\.` · `fontSize:\s*["']` | spread `...typo.role` |
| Faux italic on mono | `fontStyle:.*italic` on Cutive | drop it / use serif `note` |
| Invisibilised labels | `opacity: 0.[3-7]` on text · `withOpacity(...secondary, 0.5)` | readable `base.text.secondary`/`primary`; AA ≠ comfort, don't dim labels into the void |
| `mono` on a container | `style={mono}` · `...mono` on a card | mono only on labels/amounts |
| Icon boxes | a bg/border square or circle behind an icon | bare icon in the accent, no box |
| Microscopic icons | Phosphor at 9–13px | doodle ≥20px (see §4) |
| Dead code | `glowColor=` · `desc="test"` · duplicated `mono()` helper | delete |
| Stretched CTAs shifting | one button `flex:1`, its neighbour not | both `flex:1` (equal, stable) |
| `→` glyph in a label | literal arrow in text | drop it; a muted flow-arrow *icon* between two parties is tolerable |

## 4. Icons — Streamline doodles for entities

- **Entity/illustrative icons** (wallet, coin, bank, lock, key, miner, node, block, stamp, face…)
  use `@doodle` (Streamline Freehand), **≥20px** (the freehand stroke dies below ~20), tinted via
  `color`/`style.color` (they use `currentColor`), **no box**. Feedback/quiz outcomes use
  `DoodleSmileyHappy`/`Grumpy`/`ThumbsUp`.
- **Functional/connector icons** (arrows, chevrons, +/−, the flow arrow in a row) may stay Phosphor
  (`@icons`). CTAs generally drop decorative leading icons (a +/− stepper icon is fine).
- To add a doodle: fetch `https://api.iconify.design/streamline-freehand/<slug>.svg`, bake the inner
  `<path>` into `src/Design/icons/doodle/DoodleXxx.tsx` via `DoodleIcon` (assert no backtick / `${` /
  hardcoded `#hex`), register in the doodle barrel. The user picks the art — don't invent it.

## 5. Dedup — promote shared atoms

When 2+ features draw the same object, promote a shared component to `src/Interactive/components/`
(its own barrel there), don't re-hand-roll. Existing atoms:

- `BlockPlate` / `BlockPlateRow` / `BlockPlateSection` — a block header (gold corner brackets, wash,
  ledger rows). Used by the block-anatomy, chain, mining and mempool sims.
- `UtxoChip` — one UTXO: icon + amount + who holds the spending right, struck when consumed, tone
  set by the caller. The UTXO chapter sims share it.

Also grep for hand-rolled controls (a raw `<button style={{…}}>`, `<input type="range">`, an ad-hoc
feedback `<div>`) → replace with `Button`, `RangeLedger`, `FeedbackPanel`, `Caption`, `Badge`,
`Disclosure`, `SurfaceCard`.

## 6. Colour — premium, settled decisions

- **Gold** (`getBrandGold(theme)`) = structure AND the reward / emission / target. New bitcoin, a
  mined reward, a difficulty target read gold — never generic success-green.
- **Module accent** (`colors[moduleTheme].text.secondary`, amber for Bitcoin) = identity / the value
  you control.
- **Cross-module colour only as a deliberate semantic callback** — blue for the *banking model*
  (blue is module 1's colour, read as "the old world" against Bitcoin's amber). Never as decoration.
- **Semantic (success/error/warning/info) only when genuinely semantic** — a real success, a real
  conflict. NEVER where they'd contradict (creating money out of thin air "succeeds" = bad news; a
  Bitcoin attack "fails" = good news — colour there lies). No decorative colour; every hue earns its
  place. In doubt, one hue at varying strength (the flywheel's single amber; gold strength in
  TrustComparison). Removed by request: confetti, the 5-colour flywheel rainbow, the time-machine
  skeuomorphism.
- **AA on amounts/values: put the number in neutral ink** (`base.text.primary`); let the accent live
  in the icon, border and wash. Semantic tints (success green, warning orange, error rose) drop below
  AA (measured 4.2–4.4) on the light paper when the text itself is the tint. Two-tone A/B legends
  (info + a warm hue) must each clear 4.5 in light.
- No hardcoded `#hex`; route through `usePageTheme().colors.*`, `getBrandGold`, `BRAND` pigments.
  Charts stay light-touch (theme palette + mono labels); a data-viz line reads dark gold, not near-black.

## 7. Soft container, motion, layout

- A visible-but-soft container = the wash `background: withOpacity(colors.base.text.primary,
  theme==="dark"?0.05:0.035)` + `border: 1px solid colors.base.border.tertiary`. It lifts off
  whatever it sits on (even a tinted callout) without the cold opaque hole that `background.tertiary`
  or `background.secondary` punches. A "block" gets gold corner brackets (see `BlockPlate`).
- **Block/coin dichotomy:** square (`borderRadius: 0`) = structural (frames, plates); circle
  (`50%`) = coin/value (slider thumbs, progress dots, radios). Never a square thumb or a circular
  frame.
- Motion is understated: `transition: … 0.4s var(--ease-smooth)`; staggered `page-enter` /
  `chain-field-reveal` for progressive reveals. No gimmicks (blur/letter-spacing "materialize",
  shakes, flux gradients, confetti).

## 8. Verify in-browser before pushing

Dark AND light, 375px AND desktop; no internal OR page horizontal overflow. Behaviour unchanged,
FR/EN parity, no prose change. Pane gotchas:

- The Browser pane **freezes transition/animation clocks when hidden**: `getComputedStyle` returns
  the pre-transition (`from`) value forever. Read the **inline style** (`el.style.opacity`, React's
  target) or measure after the state settles.
- Block-reading sims render only the current block; others are `display:none`. Force visible to
  measure: `document.querySelectorAll('section').forEach(s=>{if(getComputedStyle(s).display==='none')s.style.display='block'})`.
- Recharts won't render in a force-shown section (0-width at mount) — verify chart colours at code level.
- CSS `::before` counters are unreadable from JS/selection/a11y tree.
- Contrast: flatten each element's colour alpha over the actually-stacked background, then ratio.
- `fmtBTC` appends " BTC" → wide; in tight rows keep the unit on the primary amount, bare number on the fee.

## Report format & done

```
## Component ledger audit — <branch>
Components touched: TransactionModelComparison, UtxoChip, …
### TransactionModelComparison — ❌ 3 issues
- §1 faux bold: `…tsx:74` `fontWeight: 500` on mono → spread `typo.figure`.
- §3 icon box: `…tsx:47` bg square behind the icon → bare doodle.
- §6 AA: recipient amount uses `success.text` (4.2 light) → neutral ink, accent on border.
### UtxoChip — ✅ pass
```

OK to push only when every touched component passes, OR the user has seen the report and chose to
push as-is. Otherwise: fix, `npm run build` + targeted `eslint`, verify in-browser, then push.

## Workflow reminders

- One PR per component (the user's cadence); the user merges — silence ≠ merged, check `origin/main`
  before branching. Branch from CURRENT `origin/main`; if a dependency PR merges mid-work,
  `git rebase origin/main` (stash the pre-existing `src/Design/img/*.webp` deletions first — they
  float in the tree, aren't yours, never stage them).
- Stage only your files; never `git add -A` (it sweeps the webp deletions and gitignored raw art).
