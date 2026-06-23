import { type CSSProperties,type FC, type ReactNode } from "react";

import { hexToRgb } from "../helpers";
import { BRAND, usePageTheme } from "../Theme";

type KeywordHighlightProps = {
  children: ReactNode;
};

export const KeywordHighlight: FC<KeywordHighlightProps> = ({ children }) => {
  const { colors, moduleTheme } = usePageTheme();

  const highlightColor =
    moduleTheme === "base"
      ? colors.base.border.tertiary
      : colors[moduleTheme].background.secondary;
  const rgbColor = hexToRgb(highlightColor);

  const containerStyle: CSSProperties = {
    position: "relative",
    display: "inline-block",
    zIndex: 0,
    whiteSpace: "nowrap",
    margin: "0 0.15rem",
  };

  const highlightBackgroundStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "108%",
    height: "100%",
    transform: "translate(-50%, -50%) rotate(-1.5deg)",
    borderRadius: "0.25em",
    border: `1px solid rgba(${rgbColor?.r ?? 0}, ${rgbColor?.g ?? 0}, ${rgbColor?.b ?? 0}, 0.3)`,
    backgroundImage: rgbColor
      ? `linear-gradient(
          120deg,
          rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.12) 0%,
          rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.18) 100%
        )`
      : undefined,
    zIndex: -1,
    pointerEvents: "none",
  };

  const textStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    fontWeight: 600,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.875em",
    letterSpacing: "0.03em",
  };

  return (
    <span style={containerStyle}>
      <span style={highlightBackgroundStyle} />
      <span style={textStyle}>{children}</span>
    </span>
  );
};
