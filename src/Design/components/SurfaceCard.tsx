import { type CSSProperties, type FC, type ReactNode, createElement } from "react";

import { useBreakpoint } from "../Responsive";
import { usePageTheme } from "../Theme";

type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  /** Inner padding (md = simulator default, lg = roomier). @default "md" */
  size?: Size;
  /**
   * Override the gradient-border glow color (the CSS variable
   * `--border-glow-color` consumed by the global `.gradient-border`
   * class). Defaults to the current page's module accent.
   */
  glowColor?: string;
  /**
   * Override the world-tinted top of the surface gradient. Defaults to
   * the module's primary background. Pass another color to retint.
   */
  fillColor?: string;
  /** Vertical gap between direct children. @default "1rem" */
  gap?: string | number;
  /** Vertical margin around the card (matches the simulator pattern). */
  margin?: string;
  /** HTML tag the card renders as. @default "div" */
  as?: "div" | "section" | "article" | "aside";
  /** Optional inline style escape hatch (merged last). */
  style?: CSSProperties;
  /** Add a custom class (kept in addition to `gradient-border`). */
  className?: string;
};

/**
 * The canonical "interactive surface" card — the gradient-bordered shell
 * used by every simulator, demo, and game in the Interactive domain.
 *
 * Bakes the recurring recipe in one place:
 *   • 1rem rounded corners
 *   • Linear gradient bg from the module's primary tint to the base bg
 *   • Animated `gradient-border` glow (CSS variable controlled)
 *   • Mobile-aware padding
 *   • Reads `usePageTheme()` so the world tint adapts automatically to
 *     Banking blue, MoneyLaws violet, Bitcoin amber, etc.
 *
 * Replaces the ~22 hand-rolled container styles across the Interactive
 * components with a single primitive.
 */
export const SurfaceCard: FC<Props> = ({
  children,
  size = "md",
  glowColor,
  fillColor,
  gap = "1rem",
  margin,
  as = "div",
  style,
  className,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const padding =
    size === "lg" ? (isMobile ? "1.5rem" : "2rem") : isMobile ? "1.25rem" : "1.5rem";

  const fill = fillColor ?? colors[moduleTheme].background.primary;
  const glow = glowColor ?? colors[moduleTheme].border.secondary;

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap,
    padding,
    borderRadius: "1rem",
    background: `linear-gradient(190deg, ${fill}, ${colors.base.background.primary})`,
    width: "100%",
    boxSizing: "border-box",
    margin,
    // Custom CSS variable consumed by the global `.gradient-border` rule
    // in `index.css`. TypeScript needs the cast because CSS vars aren't
    // part of the standard `CSSProperties` type.
    ["--border-glow-color" as string]: glow,
    ...style,
  };

  const finalClassName = className
    ? `gradient-border ${className}`
    : "gradient-border";

  return createElement(as, { className: finalClassName, style: cardStyle }, children);
};
