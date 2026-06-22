import { type CSSProperties, type FC, type ReactNode } from "react";

import { getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type HighlightTextProps = {
  children: ReactNode;
  /** Override the gold underline when the highlight needs a specific signal color. */
  highLightColorHex?: string;
};

/**
 * Builds a hand-drawn underline stroke as an inline SVG data URI. The path is
 * a confident, slightly irregular marker line (not a ruler-straight rule), so
 * it reads as something the teacher underlined by hand — coherent with the
 * Patrick Hand / Cabin Sketch chalkboard register. `preserveAspectRatio=none`
 * lets it stretch to the full width of the highlighted phrase.
 */
const handUnderline = (color: string): string => {
  const encoded = encodeURIComponent(color);
  const svg =
    `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8' preserveAspectRatio='none'%3E` +
    `%3Cpath d='M1,5 C18,3 34,6.5 50,4.5 C66,2.5 83,6.5 99,4' ` +
    `stroke='${encoded}' stroke-width='2.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E`;
  return `url("data:image/svg+xml,${svg}")`;
};

/**
 * Marks a word or phrase as worth noticing. A hand-drawn gold marker stroke
 * sits under the text — punchier and warmer than the previous thin module
 * accent underline, and on-register with the handwriting type stack.
 */
export const HighlightText: FC<HighlightTextProps> = ({ children, highLightColorHex }) => {
  const { theme } = useThemeContext();
  const { colors, moduleTheme } = usePageTheme();

  // Module identity color (violet on MoneyLaws, …), gold on neutral pages.
  const moduleAccent = moduleTheme === "base" ? getBrandGold(theme) : colors[moduleTheme].text.secondary;
  const color = highLightColorHex ?? moduleAccent;

  const highlightStyle: CSSProperties = {
    fontWeight: 600,
    backgroundImage: handUnderline(color),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "100% 0.42em",
    paddingBottom: "0.1em",
  };

  return <span style={highlightStyle}>{children}</span>;
};
