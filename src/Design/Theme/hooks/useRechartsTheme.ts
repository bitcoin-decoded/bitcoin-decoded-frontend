import { type CSSProperties } from "react";

import { BRAND } from "../data";
import { getBrandGold } from "../helpers";

import { usePageTheme } from "./usePageTheme";
import { useThemeContext } from "./useThemeContext";

export type RechartsTheme = {
  /** Stroke color for grid lines (faint). */
  gridColor: string;
  /** Stroke color for axis lines (same hairline gold as section rules). */
  axisLineColor: string;
  /** Color for axis tick labels. */
  axisTickColor: string;
  /** Stroke pattern for grid lines. `"3 3"` matches the Recharts default but
   *  softer when the gridColor is faint. */
  gridStrokeDasharray: string;
  /** Primary data-line color — defaults to navy on light, cream on dark. */
  primary: string;
  /** Accent color for highlights and selected states (brand gold). */
  accent: string;
  /** Reserved Bitcoin signal — only use when chart is specifically about BTC. */
  bitcoinOrange: string;
  /** Ready-to-use style object for <Tooltip contentStyle>. */
  tooltipContentStyle: CSSProperties;
  /** Ready-to-use style object for <Tooltip labelStyle> (the row above values). */
  tooltipLabelStyle: CSSProperties;
  /** Ready-to-use style object for <Tooltip itemStyle> (each value row). */
  tooltipItemStyle: CSSProperties;
  /** Tick prop value for <XAxis tick={...}> and <YAxis tick={...}>. */
  tickProp: {
    fontSize: number;
    fontFamily: string;
    fill: string;
  };
  /**
   * Area fill gradient stops — for callers that still want an area gradient.
   * Per the refonte rules (Recharts is light-touch), we keep the chart's
   * visual type unchanged; this just retints the gradient with brand colors.
   */
  gradientStops: { start: string; end: string };
};

/**
 * Ledger-system Recharts theme — palette + label font + tooltip styling.
 * Per the validated feedback rule, this is a LIGHT TOUCH on charts:
 *
 * - We do NOT force straight lines on smooth curves
 * - We do NOT replace area fills with hatching
 * - We do NOT change chart types
 *
 * We only change:
 * - Color palette (navy/gold/Bitcoin orange instead of Tailwind blue/violet/amber)
 * - Axis tick font (JetBrains Mono)
 * - Tooltip styling (block-header register: dark navy bg, mono content)
 * - Grid + axis line colors (hairline gold for axis, faint navy for grid)
 *
 * Consumers thread these tokens into the chart components as-is.
 */
export const useRechartsTheme = (): RechartsTheme => {
  const { theme } = useThemeContext();
  const { colors } = usePageTheme();

  const gold = getBrandGold(theme);
  const isDark = theme === "dark";

  const primary = isDark ? colors.base.text.primary : BRAND.navy;
  const axisTickColor = colors.base.text.secondary;
  const gridColor = isDark
    ? "rgba(242, 242, 242, 0.07)"
    : "rgba(22, 33, 62, 0.08)";
  const axisLineColor = `${gold}66`; // ~40% opacity hairline gold

  const tooltipBg = isDark ? "#1a2236" : "#fbfaf3";
  const tooltipBorder = `${gold}99`; // ~60% opacity

  return {
    gridColor,
    axisLineColor,
    axisTickColor,
    gridStrokeDasharray: "2 4",
    primary,
    accent: gold,
    bitcoinOrange: BRAND.orange,
    tooltipContentStyle: {
      background: tooltipBg,
      border: `1px solid ${tooltipBorder}`,
      borderRadius: 0,
      padding: "0.55rem 0.75rem",
      fontFamily: BRAND.fonts.mono,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      boxShadow: "none",
    },
    tooltipLabelStyle: {
      color: colors.base.text.secondary,
      fontFamily: BRAND.fonts.mono,
      fontSize: "0.6875rem",
      fontVariant: "small-caps",
      letterSpacing: "0.08em",
      marginBottom: "0.25rem",
    },
    tooltipItemStyle: {
      color: colors.base.text.primary,
      fontFamily: BRAND.fonts.mono,
      fontSize: "0.75rem",
      padding: 0,
    },
    tickProp: {
      fontSize: 11,
      fontFamily: BRAND.fonts.mono,
      fill: axisTickColor,
    },
    gradientStops: {
      start: `${gold}40`,
      end: `${gold}05`,
    },
  };
};
