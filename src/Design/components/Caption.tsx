import { createElement, type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint } from "../Responsive";
import { BRAND, usePageTheme } from "../Theme";

type Tone = "world" | "muted" | "accent";
type Size = "xs" | "sm" | "md";

type Props = {
  children: ReactNode;
  /**
   * Color recipe.
   * - `world` (default): module accent - uses the current page's world color (Banking blue, etc.)
   * - `muted`: base text.secondary - quiet/neutral context
   * - `accent`: module text.primary - slightly brighter, used as a soft emphasis
   * @default "world"
   */
  tone?: Tone;
  /** Visual scale. @default "sm" */
  size?: Size;
  /** Optional icon rendered before the text. */
  icon?: ReactNode;
  /** HTML tag the caption renders as. @default "span" */
  as?: "span" | "div" | "h2" | "h3" | "h4" | "p";
  /** Optional inline style escape hatch (merged last). */
  style?: CSSProperties;
  /**
   * Override the accent color directly (bypasses tone resolution). Useful
   * when you need an explicit semantic color (e.g. success green).
   */
  color?: string;
};

/**
 * Uppercase mono "eyebrow" / section-label primitive.
 *
 * The recipe `JetBrains Mono` + `font-weight 700` + `text-transform
 * uppercase` + tracked-out letter-spacing appears 60+ times across the
 * Interactive domain. This primitive collapses every variant to a
 * single, theme-aware component.
 */
export const Caption: FC<Props> = ({
  children,
  tone = "world",
  size = "sm",
  icon,
  as = "span",
  style,
  color,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const fontSize =
    size === "xs"
      ? isMobile
        ? "0.55rem"
        : "0.6rem"
      : size === "md"
        ? isMobile
          ? "0.78rem"
          : "0.85rem"
        : isMobile
          ? "0.7rem"
          : "0.75rem";

  const resolvedColor =
    color ??
    (tone === "world"
      ? colors[moduleTheme].text.secondary
      : tone === "accent"
        ? colors[moduleTheme].text.primary
        : colors.base.text.secondary);

  const finalStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: resolvedColor,
    display: icon ? "inline-flex" : "inline",
    alignItems: icon ? "center" : undefined,
    gap: icon ? "0.45rem" : undefined,
    lineHeight: 1.2,
    margin: 0,
    ...style,
  };

  return createElement(as, { style: finalStyle }, icon, icon ? <span>{children}</span> : children);
};
