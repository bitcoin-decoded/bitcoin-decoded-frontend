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
      fontSize: compact ? "1.125rem" : "1.25rem",
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: "0.02em",
      textAlign: "left",
    },
    label: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "1rem" : "1.0625rem",
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0.06em",
    },
    figure: {
      fontFamily: BRAND.fonts.mono,
      fontSize: compact ? "0.9375rem" : "1rem",
      fontWeight: 400,
      lineHeight: 1.3,
      fontVariantNumeric: "tabular-nums",
    },
    note: {
      fontFamily: BRAND.fonts.body,
      fontSize: compact ? "0.8125rem" : "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.005em",
    },
    micro: {
      fontFamily: BRAND.fonts.mono,
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: "0.04em",
    },
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
