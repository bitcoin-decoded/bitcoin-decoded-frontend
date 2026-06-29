import type { CSSProperties } from "react";

import type { Breakpoint } from "../../Responsive";

import { BRAND } from "./BRAND";

/**
 * Single source for text LAYOUT — font family, size, weight, line-height and
 * tracking per text ROLE, resolved for the active breakpoint. It sits beside
 * the font stack (BRAND.fonts) so the whole typographic system lives in one
 * place. Consume it via `useTypography()`, which feeds in the breakpoint, so a
 * role is responsive without each caller re-deriving sizes from `isMobile`.
 *
 * Mono roles never exceed weight 500: Cutive Mono ships a single weight, so a
 * heavier value would synthesize a crude faux-bold (forbidden by the
 * component-ledger-check skill). Mono-title prominence comes from SIZE + color,
 * never weight.
 *
 * Only roles that have a real consumer live here — the component type scale for
 * sim-internal labels stays on BRAND.fontSize (14px / 12px).
 */
export const getTypography = (breakpoint: Breakpoint = "desktop") => {
  const compact = breakpoint === "mobile";

  return {
    /** Chapter reading prose — the body serif at the reading size (16px). The
     *  serif reads tighter than the old handwriting face, hence line-height 1.6. */
    prose: {
      fontFamily: BRAND.fonts.body,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.005em",
    },
    /** Title that introduces a component or aside (Callout, section heading):
     *  the mono ledger register, prominence carried by size + module color. */
    heading: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 500,
      lineHeight: 1.35,
      letterSpacing: "0.01em",
    },
    /** Workhorse button / control label (Button size="md"). */
    button: {
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 500,
    },
    /** Compact button / control label (Button size="sm"). */
    buttonSmall: {
      fontSize: compact ? "0.8rem" : "0.85rem",
      fontWeight: 500,
    },
  } satisfies Record<string, CSSProperties>;
};
