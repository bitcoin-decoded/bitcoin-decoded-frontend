import type { CSSProperties } from "react";

import type { Breakpoint } from "../../Responsive";

import { BRAND } from "./BRAND";

export const getTypography = (breakpoint: Breakpoint = "desktop") => {
  const compact = breakpoint === "mobile";

  return {
    prose: {
      fontFamily: BRAND.fonts.body,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.005em",
    },
    heading: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 500,
      lineHeight: 1.35,
      letterSpacing: "0.01em",
    },
    // Mono kicker / table-header / small-caps label. Elevated from the old 12px
    // BRAND.fontSize.label — Cutive Mono needs the extra size to stay legible.
    label: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.8125rem" : "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.06em",
    },
    // Mono numeric figure (ledger amounts). Tabular for column alignment.
    figure: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 500,
      lineHeight: 1.3,
      fontVariantNumeric: "tabular-nums",
    },
    button: {
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 500,
    },
    buttonSmall: {
      fontSize: compact ? "0.8rem" : "0.85rem",
      fontWeight: 500,
    },
  } satisfies Record<string, CSSProperties>;
};
