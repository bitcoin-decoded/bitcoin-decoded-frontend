import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { BRAND, usePageTheme } from "../Theme";

type Tone = "success" | "error" | "info" | "neutral" | "world";
type Size = "xs" | "sm";

type Props = {
  children: ReactNode;
  /**
   * Color recipe.
   * - `success` / `error` / `info`: semantic palette
   * - `neutral`: base text/border (quiet, default state)
   * - `world`: module accent (Banking blue, Bitcoin amber, etc.)
   * @default "neutral"
   */
  tone?: Tone;
  /** Compact (`xs`) or default (`sm`). @default "sm" */
  size?: Size;
  /** Optional icon rendered before the label. */
  icon?: ReactNode;
  /**
   * Override the accent color directly. Useful when an explicit semantic
   * color is needed (e.g. a `colors.semantic.error.border` instead of `text`).
   */
  color?: string;
  /** Optional inline style escape hatch (merged last). */
  style?: CSSProperties;
};

/**
 * Compact mono small-caps tag for status / verdicts / consumed flags.
 *
 * Replaces ~15+ hand-rolled status-pill styles across the Interactive
 * domain. Theme- and module-aware via `usePageTheme()` so the `world`
 * tone adapts to Banking blue, Bitcoin amber, etc. Ledger register: sharp
 * corners, small-caps (not uppercase), weight 500 (Cutive Mono is single-weight).
 */
export const Badge: FC<Props> = ({
  children,
  tone = "neutral",
  size = "sm",
  icon,
  color,
  style,
}) => {
  const { colors, moduleTheme } = usePageTheme();

  // Resolve accent color from tone (or override).
  const accent =
    color ??
    (tone === "success"
      ? colors.semantic.success.text
      : tone === "error"
        ? colors.semantic.error.text
        : tone === "info"
          ? colors.semantic.info.text
          : tone === "world"
            ? colors[moduleTheme].text.secondary
            : colors.base.text.secondary);

  // Neutral tone uses base.border for the chip stroke (less saturated
  // than the text color), every other tone uses the accent itself.
  const borderAccent = tone === "neutral" ? colors.base.border.secondary : accent;

  const padding = size === "xs" ? "0.2rem 0.5rem" : "0.3rem 0.55rem";
  const fontSize = size === "xs" ? "0.55rem" : "0.6rem";

  const finalStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding,
    borderRadius: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: accent,
    background: withOpacity(accent, tone === "neutral" ? 0.06 : 0.1),
    border: `1px solid ${withOpacity(borderAccent, tone === "neutral" ? 0.18 : 0.3)}`,
    maxWidth: "100%",
    whiteSpace: "nowrap",
    lineHeight: 1.2,
    ...style,
  };

  return (
    <span style={finalStyle}>
      {icon}
      {children}
    </span>
  );
};
