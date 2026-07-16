import { type CSSProperties } from "react";

import { BRAND } from "../data";
import { getBrandGold } from "../helpers";

import { usePageTheme } from "./usePageTheme";
import { useThemeContext } from "./useThemeContext";

export type RechartsTheme = {
  gridColor: string;
  axisLineColor: string;
  axisTickColor: string;
  gridStrokeDasharray: string;
  primary: string;
  accent: string;
  /** Reserved Bitcoin signal — only use when chart is specifically about BTC. */
  bitcoinOrange: string;
  tooltipContentStyle: CSSProperties;
  tooltipLabelStyle: CSSProperties;
  tooltipItemStyle: CSSProperties;
  tickProp: {
    fontSize: number;
    fontFamily: string;
    fill: string;
  };
  gradientStops: { start: string; end: string };
};

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
      fontSize: "0.75rem",
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
      // 13px: Cutive Mono axis graduations read too faint below this, worst in
      // light mode (matches the `micro` typography floor).
      fontSize: 13,
      fontFamily: BRAND.fonts.mono,
      fill: axisTickColor,
    },
    gradientStops: {
      start: `${gold}40`,
      end: `${gold}05`,
    },
  };
};
