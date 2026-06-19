import { type CSSProperties, type FC, type ReactNode } from "react";

import { usePageTheme } from "../Theme";

type HighlightTextProps = {
  children: ReactNode;
  /** Override the module's accent color when the highlight needs to live outside the theme. */
  highLightColorHex?: string;
};

/**
 * Marks a word or phrase as worth noticing without the marketing-marker
 * background pavé. Thin accent underline (Apple / Linear / Notion register),
 * themed via the current module's secondary border color.
 */
export const HighlightText: FC<HighlightTextProps> = ({ children, highLightColorHex }) => {
  const { colors, moduleTheme } = usePageTheme();

  const accentColor =
    highLightColorHex ||
    (moduleTheme === "base"
      ? colors.base.text.primary
      : colors[moduleTheme].border.secondary);

  const highlightStyle: CSSProperties = {
    fontWeight: 500,
    textDecorationLine: "underline",
    textDecorationColor: accentColor,
    textDecorationThickness: "1.5px",
    textUnderlineOffset: "3px",
  };

  return <span style={highlightStyle}>{children}</span>;
};
