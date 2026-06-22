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

  const bottomRuleColor =
    state === "success"
      ? colors.semantic.success.border
      : state === "error"
        ? colors.semantic.error.border
        : gold;
  const bottomRuleOpacity = state === "default" ? 0.4 : 0.7;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    margin,
    ...style,
  };

  // Editorial layout: optional mono label on the left, gold hairline rule
  // extending to the right margin. No carré-bloc on the rule — that
  // signature is now reserved to the wordmark and the drop-block lettrine.
  // When no txLabel is passed, the row collapses to just the hairline.
  const topRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
  };

  const topRuleLine: CSSProperties = {
    flex: "1 1 auto",
    height: BRAND.figures.ruleThickness,
    background: gold,
  };

  const txLabelStyle: CSSProperties = {
    flex: "0 0 auto",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: colors.base.text.primary,
    whiteSpace: "nowrap",
  };

  const txHashStyle: CSSProperties = {
    flex: "0 0 auto",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    letterSpacing: "0.04em",
    color: colors.base.text.secondary,
    whiteSpace: "nowrap",
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
    <div style={topRowStyle} key="top">
      {txLabel && <span style={txLabelStyle}>{txLabel}</span>}
      <span style={topRuleLine} aria-hidden="true" />
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
