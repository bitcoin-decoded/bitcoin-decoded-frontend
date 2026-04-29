import { type FC, type ReactNode, type CSSProperties } from "react";
import { usePageTheme } from "../Theme";
import { hexToRgb } from "../helpers";

type HighlightTextProps = {
  children: ReactNode;
  highLightColorHex?: string;
};

export const HighlightText: FC<HighlightTextProps> = ({
  children,
  highLightColorHex,
}) => {
  const { colors, moduleTheme } = usePageTheme();

  const highlightColor =
    highLightColorHex ||
    (moduleTheme === "base"
      ? colors.base.border.tertiary
      : colors[moduleTheme].background.secondary);
  const rgbColor = hexToRgb(highlightColor);

  const highlightStyle: CSSProperties = {
    borderRadius: "0.25em",
    padding: "0.1em 0.35em",
    boxDecorationBreak: "clone",
    WebkitBoxDecorationBreak: "clone",
    backgroundImage: rgbColor
      ? `linear-gradient(
          120deg,
          rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.15) 0%,
          rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2) 100%
        )`
      : undefined,
  };

  return <span style={highlightStyle}>{children}</span>;
};
