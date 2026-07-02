import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  children: ReactNode;
  author?: string;
  source?: string;
};

export const Quote: FC<Props> = ({ children, author, source }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  const isModule = moduleTheme !== "base";
  const moduleAccent = isModule ? colors[moduleTheme].text.secondary : gold;
  const washSource = isModule ? colors[moduleTheme].background.secondary : gold;
  const wash = withOpacity(washSource, theme === "dark" ? 0.1 : 0.07);

  const blockquoteStyle: CSSProperties = {
    position: "relative",
    margin: isMobile ? "2rem 0" : "3rem 0",
    padding: isMobile ? "1.5rem 1.25rem 1.25rem 2.75rem" : "1.75rem 2rem 1.75rem 3.75rem",
    background: wash,
    border: `1px solid ${withOpacity(moduleAccent, 0.25)}`,
    lineHeight: 1.62,
    textAlign: "left",
  };

  const openingMarkStyle: CSSProperties = {
    color: moduleAccent,
    fontSize: isMobile ? "3.25rem" : "3.75rem",
    fontFamily: BRAND.fonts.display,
    fontWeight: 700,
    position: "absolute",
    left: isMobile ? "0.65rem" : "1rem",
    top: isMobile ? "0.35rem" : "0.4rem",
    lineHeight: 1,
  };

  const contentStyle: CSSProperties = {
    color: colors.base.text.primary,
    fontStyle: "italic",
    fontSize: isMobile ? "1rem" : "1.0625rem",
  };

  const hasAttribution = author || source;

  const attributionStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    flexWrap: "wrap",
    marginTop: "0.85rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    letterSpacing: "0.03em",
    opacity: 0.85,
  };

  const authorStyle: CSSProperties = {
    color: moduleAccent,
    fontStyle: "normal",
    fontWeight: 500,
  };

  const sourceStyle: CSSProperties = {
    color: colors.base.text.secondary,
    fontStyle: "italic",
    fontWeight: 400,
  };

  return (
    <blockquote style={blockquoteStyle}>
      <span style={openingMarkStyle} aria-hidden="true">
        &ldquo;
      </span>
      <div style={contentStyle}>{children}</div>
      {hasAttribution && (
        <span style={attributionStyle}>
          <span>&mdash;</span>
          {author && <span style={authorStyle}>{author}</span>}
          {author && source && <span style={sourceStyle}>·</span>}
          {source && <span style={sourceStyle}>{source}</span>}
        </span>
      )}
    </blockquote>
  );
};
