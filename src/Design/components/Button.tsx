import {
  type CSSProperties,
  type FC,
  type MouseEventHandler,
  type ReactNode,
  useState,
} from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { usePageTheme } from "../Theme";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type Props = {
  children: ReactNode;
  /**
   * Visual weight.
   * - `primary`: accent gradient + accent border + accent text. The unmistakable "do the thing" CTA.
   * - `secondary`: transparent fill + neutral border + muted text. Quiet sibling for "reset / cancel".
   * - `ghost`: no border, no fill, just text. For tertiary actions (e.g. micro-toggles).
   * @default "primary"
   */
  variant?: Variant;
  /** @default "md" */
  size?: Size;
  /**
   * Override the accent color used by the `primary` variant.
   * Defaults to the current page's module accent (Banking blue, MoneyLaws
   * violet, Bitcoin amber, etc., resolved via `usePageTheme()`).
   */
  color?: string;
  /** Optional icon rendered before or after the label. */
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  /** Stretch to fill the parent's main axis. */
  fullWidth?: boolean;
  /** Optional inline style escape hatch (merged after variant styles). */
  style?: CSSProperties;
};

/**
 * Theme- and module-aware button primitive. One source of truth for every
 * action button across simulators, games, and chrome — replaces ~30+
 * inline button-style blocks scattered across the Interactive domain
 * with a single, consistent recipe.
 *
 * Reads the current page's module accent from `usePageTheme()`, so a
 * `<Button>` rendered on a Banking page is blue, on a Bitcoin page it
 * is amber, etc. — without any caller awareness of the world theme.
 * Override with the `color` prop when needed.
 */
export const Button: FC<Props> = ({
  children,
  variant = "primary",
  size = "md",
  color,
  icon,
  iconPosition = "left",
  disabled = false,
  onClick,
  type = "button",
  ariaLabel,
  fullWidth = false,
  style,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  // Accent — module color by default, overridable via `color`.
  const accent = color ?? colors[moduleTheme].border.secondary;
  const accentText = color ?? colors[moduleTheme].text.primary;
  const neutralBorder = colors.base.border.secondary;
  const neutralText = colors.base.text.secondary;
  const neutralTextStrong = colors.base.text.primary;

  const padX = size === "sm" ? "0.85rem" : "1.25rem";
  const padY = size === "sm" ? "0.5rem" : "0.65rem";
  const padXMd = size === "sm" ? "1rem" : "1.5rem";
  const padYMd = size === "sm" ? "0.55rem" : "0.7rem";

  const baseStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: size === "sm" ? (isMobile ? "0.7rem" : "0.74rem") : isMobile ? "0.72rem" : "0.78rem",
    fontWeight: 600,
    padding: isMobile ? `${padY} ${padX}` : `${padYMd} ${padXMd}`,
    borderRadius: size === "sm" ? "0.55rem" : "0.65rem",
    letterSpacing: "0.04em",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "all 0.3s var(--ease-smooth)",
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  };

  // Hover-aware variant styles. Every variant gets a hover whisper —
  // brightness lift on bg/border, no transform on `secondary`/`ghost`
  // (only `primary` gets the 1px translateY for "click me" affordance).
  const hoverable = !disabled;
  const isLifted = isHovered && hoverable;

  const variantStyle: CSSProperties =
    variant === "primary"
      ? {
          color: accentText,
          background: isLifted
            ? `linear-gradient(135deg, ${withOpacity(accent, 0.22)}, ${withOpacity(accent, 0.06)})`
            : `linear-gradient(135deg, ${withOpacity(accent, 0.14)}, transparent)`,
          border: `1.5px solid ${withOpacity(accent, isLifted ? 0.75 : 0.55)}`,
          transform: isLifted ? "translateY(-1px)" : "translateY(0)",
        }
      : variant === "secondary"
        ? {
            color: isLifted ? neutralTextStrong : neutralText,
            background: isLifted ? withOpacity(neutralText, 0.06) : "transparent",
            border: `1px solid ${withOpacity(neutralBorder, isLifted ? 0.6 : 0.4)}`,
          }
        : {
            // ghost
            color: isLifted ? neutralTextStrong : neutralText,
            background: "transparent",
            border: "none",
          };

  return (
    <button
      type={type}
      style={{ ...baseStyle, ...variantStyle, ...style }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};
