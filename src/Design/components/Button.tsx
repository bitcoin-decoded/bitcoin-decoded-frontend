import {
  type CSSProperties,
  type FC,
  type MouseEventHandler,
  type ReactNode,
  useState,
} from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

type Variant = "primary" | "secondary" | "ghost" | "stamped";
type Size = "sm" | "md";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  color?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  fullWidth?: boolean;
  /** Drop the primary variant's `[ … ]` bracket framing (e.g. when the icon
   *  already carries a bracket motif). No effect on other variants. */
  hideBrackets?: boolean;
  style?: CSSProperties;
};

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
  hideBrackets = false,
  style,
}) => {
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const accent = color ?? getBrandGold(theme);
  const neutralText = colors.base.text.secondary;
  const neutralTextStrong = colors.base.text.primary;
  const hoverable = !disabled;
  const isLifted = isHovered && hoverable;
  const padX = size === "sm" ? "0.9rem" : "1.25rem";
  const padY = size === "sm" ? "0.45rem" : "0.6rem";
  const padXMd = size === "sm" ? "1rem" : "1.5rem";
  const padYMd = size === "sm" ? "0.5rem" : "0.65rem";

  const baseStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: size === "sm" ? typo.buttonSmall.fontSize : typo.button.fontSize,
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
    border: "none",
    borderRadius: 0,
    background: "transparent",
    color: neutralTextStrong,
    // Hover lifts the button a hair; a press settles it back down for a
    // tactile click. Stamped overrides this with its own press transform.
    transform: isPressed && hoverable ? "translateY(0)" : isLifted ? "translateY(-1px)" : "none",
  };

  let variantStyle: CSSProperties = {};
  let labelDecoration: { before?: ReactNode; after?: ReactNode } = {};

  if (variant === "primary") {
    const bracketColor = isLifted ? accent : withOpacity(accent, 0.9);
    variantStyle = {
      padding: isMobile ? `${padY} ${padX}` : `${padYMd} ${padXMd}`,
      color: colors.base.text.primary,
      // A persistent accent ledger-cell gives the button body at rest — the
      // bracketed mono label alone read too airy, especially on white — and it
      // deepens on hover. Border + wash share the accent so the whole control
      // reads as one weighted cell.
      background: withOpacity(accent, isLifted ? 0.12 : 0.06),
      border: `1px solid ${withOpacity(accent, isLifted ? 0.55 : 0.32)}`,
    };
    if (!hideBrackets) {
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
    }
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
      background: withOpacity(neutralText, isLifted ? 0.06 : 0),
    };
  } else if (variant === "stamped") {
    const stampHeight = size === "sm" ? 24 : 28;
    variantStyle = {
      padding: 0,
      height: stampHeight,
      gap: 0,
      background: "transparent",
      // Hover lifts the seal a hair (press settles it back) — it had no hover
      // feedback at all before.
      transform: isPressed && hoverable ? "translateY(1px)" : isLifted ? "translateY(-1px)" : "translateY(0)",
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
            filter: isLifted ? "brightness(1.1)" : "none",
            transition: "filter 0.2s var(--ease-smooth)",
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
          background: isLifted ? withOpacity(accent, 0.12) : "transparent",
          transition: "background-color 0.2s var(--ease-smooth)",
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
