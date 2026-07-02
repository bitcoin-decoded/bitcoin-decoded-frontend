import { createElement, type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, usePageTheme } from "../Theme";

type Tone = "world" | "muted" | "accent";
type Size = "xs" | "sm" | "md";
type Variant = "label" | "note";

type Props = {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  as?: "span" | "div" | "h2" | "h3" | "h4" | "p";
  style?: CSSProperties;
  color?: string;
};

export const Caption: FC<Props> = ({
  children,
  tone = "world",
  variant = "label",
  size = "sm",
  icon,
  as = "span",
  style,
  color,
}) => {
  const { colors, moduleTheme } = usePageTheme();

  const fontSize = size === "md" ? BRAND.fontSize.body : BRAND.fontSize.note;

  const resolvedColor =
    color ??
    (tone === "world"
      ? colors[moduleTheme].text.secondary
      : tone === "accent"
        ? colors[moduleTheme].text.primary
        : colors.base.text.secondary);

  const isNote = variant === "note";
  const finalStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize,
    fontWeight: 500,
    fontVariant: isNote ? "normal" : "small-caps",
    letterSpacing: isNote ? "0.02em" : "0.08em",
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
