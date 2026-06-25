---
name: component-ledger-check
description: Quality checklist for the ledger-design refactor of interactive components (sims). **MUST be invoked before any `git push` of a branch that redesigns or restyles components under `src/Interactive/` or the page-local sims under `src/Page/*/components/` (simulators, visuals, cards).** Verifies the 14/12 type scale + no hardcoding, the three brand fonts, the top/bottom three-square separators (one pair per component, even with two déclinaisons), use of the shared primitives (no duplication), and the absence of SaaS tells. Pairs with `ddd-pr-check` (structure) — this one covers visual/ledger quality.
---

# Component ledger check

You're about to push a PR that restyled interactive components onto the ledger design system.
Before pushing, walk this checklist for EVERY component you touched. Report concrete failures
inline with file paths, then fix them. Don't push and "clean up later".

This is the visual/ledger counterpart to `ddd-pr-check` (which covers folder/symbol structure).
Run both before a component-refactor push.

## When to invoke

**Invoke before:**

- Any `git push` / `gh pr create` on a branch that redesigns or restyles components under
  `src/Interactive/**` or the page-local sims under `src/Page/*/components/**` (simulators,
  visuals, cards, panels).
- When asked to "check the component refactor", "verify the ledger pass", or similar.

**Skip for:**

- Doc/config/content-only changes (same skip list as `ddd-pr-check`).
- Changes that don't touch a component's styling (pure logic/hook/data edits).

## The 8 checks

For every touched component, verify each. The fastest path is a grep for the anti-pattern, then
read the hits in context.

### 1. Type scale — 14/12, centralized, nothing below 12px

The user re-specified this repeatedly; it is the most-missed rule. Inside components there are
exactly **two** sizes: **14px = primary** (content, table cells, panel bodies, component/item
TITLES) and **12px = secondary** (labels, captions, units, chips, hints). **NOTHING below 12px.**

- Every `fontSize` routes through `BRAND.fontSize`: `body` (14px) or `label`/`note`/`micro`
  (all 12px). NO hardcoded rem values.
- Grep the touched files for `fontSize:\s*["']` and `fontSize:\s*isMobile` — every hit that
  isn't a `BRAND.fontSize.*` token is a violation. Pay special attention to `0.5`–`0.74rem`
  values (these render below 12px) — they are the recurring illegibility (e.g. the old `Caption`
  `xs` at 10px, the Dunbar chips at 11px).
- Item/panel TITLES use `body` (14px) so they read ABOVE their 12px sub-labels.
- Mono labels: `font-variant: small-caps` (never `text-transform: uppercase`), `font-weight: 500`
  (never 600/700 — Cutive Mono is single-weight, heavier values synthesize a crude faux-bold).
- Sane `line-height` / `letter-spacing` (not the old tight values).

### 2. Fonts — only the three brand faces

- Every `fontFamily` is `BRAND.fonts.display`, `BRAND.fonts.body`, or `BRAND.fonts.mono`
  (or `"inherit"`, which inherits the body face — fine).
- Grep for `fontFamily:\s*["']` and for `JetBrains|Inter|monospace|serif|Arial` — any hardcoded
  face string is a violation. (FlipCard shipped a hardcoded `'JetBrains Mono'` that survived a
  whole review — this is exactly what this check catches.)

### 3. Separators — the three-square pattern, ONE pair per component

- An interactive surface is bracketed top + bottom by the three-square `Separator` (this comes
  for free from `SurfaceCard`).
- **A component shown in two (or more) déclinaisons — e.g. two side-by-side cards (Fiat vs
  Bitcoin) — must NOT have a separator pair per sub-card** (that yields 4+ separator rows). One
  pair brackets the whole component. Fix by wrapping the déclinaisons in a SINGLE `SurfaceCard`,
  or by giving the sub-cards a plain frame and only the outer surface the separators.
- Check: count the three-square separator rows the component renders — there should be exactly
  two (one top, one bottom) for the whole component.

### 4. Shared primitives — no duplication

Controls use the shared primitives, never hand-rolled equivalents:

- `SurfaceCard` (the interactive frame), `Button` (CTAs), `RangeLedger` (sliders), `OptionButton`
  (single-choice), `FeedbackPanel` (results/hints), `Caption` (labels), `Badge` (status tags),
  `Disclosure` (collapsibles).
- Red flags: a hand-rolled `<button style={{ borderRadius… }}>`, a raw `<input type="range">`,
  an ad-hoc tinted feedback `<div>`, a bespoke rounded card. Replace with the primitive.

### 5. No SaaS tells

- `border-radius: 0` everywhere (no rounded cards/pills/badges). Grep `borderRadius:\s*["']`
  (anything other than `0` / `"50%"` for a legitimate coin is suspect).
- No gradient fills: grep `linear-gradient|radial-gradient`.
- No glows/shadows: grep `boxShadow|gradient-border` (the `.gradient-border` className).

### 6. Color — theme-routed, no ad-hoc hex

- No hardcoded hex: grep `#[0-9a-fA-F]{6}`. Colors come from `usePageTheme()` (`colors.*`),
  `getBrandGold(theme)`, or the `BRAND` pigments. Gold = structure, module accent = identity,
  semantic = feedback.
- Charts stay light-touch (palette + mono labels only — never a data-ink rewrite).
- A meaningful data-viz scale (e.g. the Dunbar green→red overload gradient) may keep its meaning,
  but route through theme tokens (`colors.semantic.*`) rather than ad-hoc hex where it can.

### 7. Block/coin dichotomy

- **Square** (`borderRadius: 0`) = structural: frames, icon badges, separators, kicker markers.
- **Circle** (`borderRadius: 50%`) = coin/value: slider thumbs, count indicators, progress dots,
  selection radios.
- Never a square slider thumb; never a circle as a static structural frame.

### 8. Verify in-browser before pushing

- Dark **and** light mode.
- 375px **and** desktop — no horizontal overflow (the Illustration full-bleed bug was a
  mobile-only miss; always check both).
- Behaviour unchanged, FR/EN parity preserved, no content/prose change.

## How to run the audit

1. List touched component files: `git diff --name-only main...HEAD` filtered to `Interactive/`
   and `Page/*/components/`.
2. For each, grep the anti-patterns above and read the hits in context.
3. Report findings in this format:

```
## Component ledger audit - <branch>

Components touched: DunbarSlider, MonetaryPillars, …

### DunbarSlider - ❌ 2 issues
- Check 1 (type scale): `DunbarStepSlider.tsx:69` chips at `0.62rem` (<12px) → BRAND.fontSize.note.
- Check 5 (SaaS tells): `getDunbarPalette` uses `linear-gradient` track → flat.

### MonetaryPillars - ✅ pass
```

4. Apply the fixes. Re-run `npm run build` + targeted `eslint`. Verify in-browser (check 8).
   Then push.

## Definition of done

OK to push only when every touched component passes all 8 checks, OR the user has seen the
violation report and explicitly chose to push as-is. Otherwise: fix, rebuild, verify, then push.
