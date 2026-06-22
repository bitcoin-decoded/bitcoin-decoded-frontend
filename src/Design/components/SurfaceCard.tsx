import { createElement, type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Size = "md" | "lg";
type State = "default" | "success" | "error";

type Props = {
  children: ReactNode;
  /** Inner padding (md = simulator default, lg = roomier). @default "md" */
  size?: Size;
  /**
   * Semantic state — affects the bottom-rule color. `success` → green,
   * `error` → red, `default` → faint gold. Replaces the former `glowColor`
   * convention for signaling state. @default "default"
   */
  state?: State;
  /**
   * Optional ledger label rendered on the left of the top rule, in mono
   * small-caps (e.g. `"simulate · banking"`). Interrupts the rule cleanly.
   */
  txLabel?: string;
  /**
   * Optional short hash rendered on the right of the top rule, prefixed by
   * `⌗ ` (e.g. `"a7f3⋯e2b1"`). Interrupts the rule cleanly.
   */
  txHash?: string;
  /** Vertical gap between direct children. @default "1rem" */
  gap?: string | number;
  /** Vertical margin around the card. */
  margin?: string;
  /** HTML tag the card renders as. @default "div" */
  as?: "div" | "section" | "article" | "aside";
  /** Inline style escape hatch (merged last). */
  style?: CSSProperties;
  /** Custom class (no longer auto-decorated with `gradient-border`). */
  className?: string;
  /**
   * @deprecated No-op in the ledger design system. Use `state` for semantic
   * signaling (success/error). Kept temporarily so the 17 existing callers
   * still compile; will be removed in a follow-up caller-cleanup PR.
   */
  glowColor?: string;
  /**
   * @deprecated No-op in the ledger design system. The transaction frame is
   * intentionally transparent so its rules bleed into the page margin.
   */
  fillColor?: string;
};

/**
 * The transaction frame — the canonical "interactive surface" of the ledger
 * design system. Replaces the former rounded gradient-border card with an
 * editorial frame: hairline gold top rule broken by a centered carré-bloc
 * (the logo's signature element), open sides (no left/right borders so the
 * content bleeds into the page margin), and a thinner bottom rule whose
 * color carries the semantic state.
 *
 * Per the block-vs-coin dichotomy (feedback-design-refonte-rules rule 9),
 * the carré-bloc is a structural marker — never a slider thumb. Sliders
 * use the gold circle (coin) figure instead. See RangeLedger (phase 4).
 */
export const SurfaceCard: FC<Props> = ({
  children,
  size = "md",
  state = "default",
  txLabel,
  txHash,
  gap = "1rem",
  margin,
  as = "div",
  style,
  className,
}) => {
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  const padding = size === "lg" ? (isMobile ? "1.5rem" : "2rem") : isMobile ? "1.25rem" : "1.5rem";

  // The page background behind the rules — used to mask the rule under the
  // tx-label and tx-hash spans, so the labels "interrupt" the rule cleanly.
  const maskBg = colors.base.background.primary;

  const bottomRuleColor =
    state === "success"
      ? colors.semantic.success.border
      : state === "error"
        ? colors.semantic.error.border
        : gold;
  const bottomRuleOpacity = state === "default" ? 0.45 : 0.7;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    margin,
    ...style,
  };

  const topRuleWrapper: CSSProperties = {
    position: "relative",
    height: BRAND.figures.blockSize + 2,
  };

  const topRuleLine: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: BRAND.figures.ruleThickness,
    background: gold,
  };

  const topRuleBlock: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: BRAND.figures.blockSize,
    height: BRAND.figures.blockSize,
    background: gold,
  };

  const labelHeight = BRAND.figures.blockSize + 2;

  const txLabelStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.6875rem",
    letterSpacing: "0.05em",
    color: colors.base.text.primary,
    fontVariant: "small-caps",
    lineHeight: `${labelHeight}px`,
    background: maskBg,
    paddingRight: "0.5rem",
  };

  const txHashStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.6875rem",
    letterSpacing: "0.04em",
    color: colors.base.text.secondary,
    lineHeight: `${labelHeight}px`,
    background: maskBg,
    paddingLeft: "0.5rem",
  };

  const bodyStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap,
    padding,
  };

  const bottomRuleWrapper: CSSProperties = {
    position: "relative",
    height: 6,
  };

  const bottomRuleLine: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 0.5,
    background: bottomRuleColor,
    opacity: bottomRuleOpacity,
  };

  return createElement(
    as,
    { className, style: containerStyle },
    <div style={topRuleWrapper} key="top">
      <div style={topRuleLine} />
      <div style={topRuleBlock} />
      {txLabel && <span style={txLabelStyle}>{txLabel}</span>}
      {txHash && <span style={txHashStyle}>⌗ {txHash}</span>}
    </div>,
    <div style={bodyStyle} key="body">
      {children}
    </div>,
    <div style={bottomRuleWrapper} key="bottom">
      <div style={bottomRuleLine} />
    </div>,
  );
};
