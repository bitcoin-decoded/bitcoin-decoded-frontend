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
    // The main content column is justified (MainLayout), and everything inside
    // inherits it — including titles, where a wrapped line gets stretched into
    // rivers of space. Titles opt out here, centrally; a consumer that wants
    // another alignment just sets it after the spread.
    heading: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "1.125rem" : "1.25rem",
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: "0.02em",
      textAlign: "left",
    },
    // Mono kicker / table-header / small-caps label — the register just above
    // the micro floor, for text the eye reads rather than glances at.
    label: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "1rem" : "1.0625rem",
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0.06em",
    },
    // Mono numeric figure (ledger amounts). Tabular for column alignment.
    figure: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 400,
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
    // Smallest mono type — chip/badge text, chart ticks, tags. Cutive Mono has a
    // small x-height and one weight, so it needs more room than a UI sans at the
    // same nominal size: the floor has walked 12 -> 13 -> 14px as each pass
    // proved the previous one still too faint. Nothing in the app goes below it.
    micro: {
      fontFamily: BRAND.fonts.mono,
      fontSize: "0.875rem",
      fontWeight: 400,
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
      fontWeight: 400,
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
