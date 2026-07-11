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
    // Mono kicker / table-header / small-caps label. Elevated to 14px — Cutive
    // Mono needs the extra size to stay legible.
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
    // Small serif secondary text — captions, helper lines, fine prose.
    note: {
      fontFamily: BRAND.fonts.body,
      fontSize: compact ? "0.8125rem" : "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.005em",
    },
    // Smallest mono type — chip/badge text, chart ticks, tags. Deliberately
    // stays at 12px; this is the one role that does NOT scale up (the "fine
    // print" of the ledger), so it lives here rather than as a stray literal.
    micro: {
      fontFamily: BRAND.fonts.mono,
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: "0.04em",
    },
    // Numbered section eyebrow (e.g. "CHAPITRE 03 · …"). Mono UPPERCASE, tracked
    // — the editorial "part label" register. Tracking stays moderate: at 0.2em
    // the thin single-weight mono floats apart and word-shape is lost, which
    // read as "hard" in light mode; 0.13em keeps the eyebrow feel and legibility.
    kicker: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.8125rem" : "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.13em",
      textTransform: "uppercase",
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
