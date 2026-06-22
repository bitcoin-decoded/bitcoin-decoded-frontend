import {
  type CSSProperties,
  type FC,
  type MouseEventHandler,
  type ReactNode,
  useState,
} from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Variant = "primary" | "secondary" | "ghost" | "stamped";
type Size = "sm" | "md";

type Props = {
  children: ReactNode;
  /**
   * Visual weight.
   * - `primary`: bracketed mono small-caps (`[ label ]`) — the workhorse CTA.
   *   Gold brackets, no fill, no gradient. Brackets brighten on hover.
   * - `secondary`: mono small-caps with a dashed underline. Quiet sibling.
   * - `ghost`: plain mono text, no decoration. Tertiary actions.
   * - `stamped`: gold carré-bloc + label on a hairline rule baseline —
   *   the "official stamp" CTA, reserved for critical actions (validate
   *   a quiz, execute a simulation, seal a block). Use sparingly.
   * @default "primary"
   */
  variant?: Variant;
  /** @default "md" */
  size?: Size;
  /**
   * Override the bracket / stamp color. Defaults to brand gold. Keep `undefined`
   * unless the surrounding context demands a different signal color.
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
  /** Inline style escape hatch (merged last). */
  style?: CSSProperties;
};

/**
 * Ledger-system button primitive. Replaces the previous gradient + accent
 * border recipe with four variants derived from print and editorial
 * convention: bracketed (primary), dashed underline (secondary), plain mono
 * (ghost), and gold-carré stamp (stamped CTA). No gradients, no halos,
 * sharp corners (radius 0), mono small-caps everywhere.
 *
 * The `color` prop overrides the gold accent for surfaces that need to
 * carry a specific semantic signal — kept opt-in so the default behavior
 * stays uniform (most callers should pass nothing).
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
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const accent = color ?? getBrandGold(theme);
  const neutralText = colors.base.text.secondary;
  const neutralTextStrong = colors.base.text.primary;
  const hoverable = !disabled;
  const isLifted = isHovered && hoverable;

  // Sizing — mono labels need a touch more horizontal padding than the
  // previous Inter labels because mono is wider per glyph.
  const padX = size === "sm" ? "0.9rem" : "1.25rem";
  const padY = size === "sm" ? "0.45rem" : "0.6rem";
  const padXMd = size === "sm" ? "1rem" : "1.5rem";
  const padYMd = size === "sm" ? "0.5rem" : "0.65rem";

  const baseStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize:
      size === "sm" ? (isMobile ? "0.6875rem" : "0.7125rem") : isMobile ? "0.72rem" : "0.75rem",
    fontWeight: 500,
    letterSpacing: variant === "ghost" ? "0.08em" : "0.14em",
    fontVariant: "small-caps",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "all 0.25s var(--ease-smooth)",
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    borderRadius: 0,
    background: "transparent",
    color: neutralTextStrong,
  };

  let variantStyle: CSSProperties = {};
  let labelDecoration: { before?: ReactNode; after?: ReactNode } = {};

  if (variant === "primary") {
    const bracketColor = isLifted ? accent : withOpacity(accent, 0.7);
    variantStyle = {
      padding: isMobile ? `${padY} ${padX}` : `${padYMd} ${padXMd}`,
      color: isLifted ? colors.base.text.primary : colors.base.text.secondary,
    };
    labelDecoration = {
      before: (
        <span aria-hidden="true" style={{ color: bracketColor, transition: "color 0.25s" }}>
          [
        </span>
      ),
      after: (
        <span aria-hidden="true" style={{ color: bracketColor, transition: "color 0.25s" }}>
          ]
        </span>
      ),
    };
  } else if (variant === "secondary") {
    variantStyle = {
      padding: isMobile ? `${padY} 0` : `${padYMd} 0`,
      color: isLifted ? neutralTextStrong : neutralText,
      borderBottom: `1px dashed ${withOpacity(neutralText, isLifted ? 0.55 : 0.35)}`,
      paddingBottom: 2,
    };
  } else if (variant === "ghost") {
    variantStyle = {
      padding: isMobile ? `${padY} 0.4rem` : `${padYMd} 0.5rem`,
      color: isLifted ? neutralTextStrong : neutralText,
    };
  } else if (variant === "stamped") {
    // Stamp: a gold carré on the left, the label boxed to its right with a
    // hairline rule on top/right/bottom. The whole thing reads as a stamped
    // entry on a ledger. Pressing nudges it down 1px like a cachet.
    const stampHeight = size === "sm" ? 24 : 28;
    variantStyle = {
      padding: 0,
      height: stampHeight,
      gap: 0,
      background: "transparent",
      transform: isPressed && hoverable ? "translateY(1px)" : "translateY(0)",
    };
    labelDecoration = {
      before: (
        <span
          aria-hidden="true"
          style={{
            width: stampHeight,
            height: stampHeight,
            background: accent,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: BRAND.cream,
            fontFamily: BRAND.fonts.display,
            fontSize: size === "sm" ? 16 : 18,
            lineHeight: 1,
            fontWeight: 500,
          }}
        >
          ⌗
        </span>
      ),
      after: null,
    };
    variantStyle = {
      ...variantStyle,
      color: colors.base.text.primary,
    };
  }

  // Wrap label for stamped to box it with hairline borders next to the carré.
  const renderedLabel =
    variant === "stamped" ? (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: size === "sm" ? 24 : 28,
          padding: `0 ${isMobile ? "0.85rem" : "1rem"}`,
          border: `1px solid ${accent}`,
          borderLeft: "none",
          fontFamily: BRAND.fonts.mono,
          letterSpacing: "0.14em",
          fontVariant: "small-caps",
        }}
      >
        {children}
      </span>
    ) : (
      children
    );

  return (
    <button
      type={type}
      style={{ ...baseStyle, ...variantStyle, ...style }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {labelDecoration.before}
      {icon && iconPosition === "left" && icon}
      {renderedLabel}
      {icon && iconPosition === "right" && icon}
      {labelDecoration.after}
    </button>
  );
};
