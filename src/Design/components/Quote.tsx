import { type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint } from "../Responsive";
import { usePageTheme } from "../Theme";

type Props = {
  children: ReactNode;
  author?: string;
  source?: string;
};

export const Quote: FC<Props> = ({ children, author, source }) => {
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  const accentColor = colors[moduleTheme].text.primary;

  const blockquoteStyle: CSSProperties = {
    position: "relative",
    margin: isMobile ? "2rem 0" : "3rem 0",
    padding: isMobile ? "1.5rem 1.25rem 1.25rem 2.5rem" : "2rem 2.5rem 2rem 3.5rem",
    background: `linear-gradient(190deg, ${colors[moduleTheme].background.primary}, ${colors.base.background.primary})`,
    borderRadius: "1rem",
    lineHeight: 1.7,
    letterSpacing: "0.02em",
    textAlign: "left",
  };

  const openingQuoteMarkStyle: CSSProperties = {
    color: accentColor,
    fontSize: isMobile ? "3.5rem" : "4rem",
    fontFamily: "Georgia, serif",
    position: "absolute",
    left: isMobile ? "0.5rem" : "0.75rem",
    top: isMobile ? "0.25rem" : "0.5rem",
    lineHeight: 1,
    opacity: 0.8,
  };

  const closingQuoteMarkStyle: CSSProperties = {
    color: accentColor,
    fontSize: isMobile ? "3.5rem" : "4rem",
    fontFamily: "Georgia, serif",
    position: "absolute",
    right: isMobile ? "0.75rem" : "1rem",
    bottom: isMobile ? "0.25rem" : "0.5rem",
    lineHeight: 1,
    opacity: 0.6,
  };

  const contentStyle: CSSProperties = {
    color: colors[moduleTheme].text.secondary,
    fontStyle: "italic",
    fontSize: isMobile ? "0.9375rem" : "1rem",
  };

  const hasAttribution = author || source;

  const attributionStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    flexWrap: "wrap",
    marginTop: "1rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.875rem",
    letterSpacing: "0.03em",
    opacity: 0.85,
  };

  const authorStyle: CSSProperties = {
    color: accentColor,
    fontStyle: "normal",
    fontWeight: 600,
  };

  const sourceStyle: CSSProperties = {
    color: colors[moduleTheme].text.secondary,
    fontStyle: "italic",
    fontWeight: 400,
  };

  return (
    <blockquote
      className="gradient-border"
      style={{ ...blockquoteStyle, "--border-glow-color": accentColor } as CSSProperties}
    >
      <span style={openingQuoteMarkStyle}>&ldquo;</span>
      <span style={closingQuoteMarkStyle}>&rdquo;</span>
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
