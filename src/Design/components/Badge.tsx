import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { BRAND, getTypography, usePageTheme } from "../Theme";

type Tone = "success" | "error" | "info" | "neutral" | "world";
type Size = "xs" | "sm";

type Props = {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  icon?: ReactNode;
  color?: string;
  style?: CSSProperties;
};

export const Badge: FC<Props> = ({
  children,
  tone = "neutral",
  size = "sm",
  icon,
  color,
  style,
}) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();

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

  const borderAccent = tone === "neutral" ? colors.base.border.secondary : accent;

  const padding = size === "xs" ? "0.2rem 0.5rem" : "0.3rem 0.55rem";
  const fontSize = typo.micro.fontSize;

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
      {icon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{icon}</span>}
      {children}
    </span>
  );
};
