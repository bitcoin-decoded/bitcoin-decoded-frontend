import { type CSSProperties, type FC, type ReactNode } from "react";

import { getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type HighlightTextProps = {
  children: ReactNode;
  /** Override the gold underline when the highlight needs a specific signal color. */
  highLightColorHex?: string;
};

const handUnderline = (color: string): string => {
  const encoded = encodeURIComponent(color);
  const svg =
    `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8' preserveAspectRatio='none'%3E` +
    `%3Cpath d='M1,5 C18,3 34,6.5 50,4.5 C66,2.5 83,6.5 99,4' ` +
    `stroke='${encoded}' stroke-width='2.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E`;
  return `url("data:image/svg+xml,${svg}")`;
};

export const HighlightText: FC<HighlightTextProps> = ({ children, highLightColorHex }) => {
  const { theme } = useThemeContext();
  const { colors, moduleTheme } = usePageTheme();

  const moduleAccent = moduleTheme === "base" ? getBrandGold(theme) : colors[moduleTheme].text.secondary;
  const color = highLightColorHex ?? moduleAccent;

  const highlightStyle: CSSProperties = {
    fontWeight: 500,
    backgroundImage: handUnderline(color),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "100% 0.42em",
    paddingBottom: "0.1em",
  };

  return <span style={highlightStyle}>{children}</span>;
};
