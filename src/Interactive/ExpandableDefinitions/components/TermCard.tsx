import { type CSSProperties, type FC, useState } from "react";

import { ChevronDown } from "lucide-react";

import { useBreakpoint, useDisclosure, usePageTheme, withOpacity } from "../../../Design";
import type { ExpandableTerm } from "../types";

type Props = {
  term: ExpandableTerm;
  /** Fired when the card transitions from closed to open (each first expand). */
  onOpen?: () => void;
};

export const TermCard: FC<Props> = ({ term, onOpen }) => {
  const { isOpen, toggle } = useDisclosure(false);
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.85rem",
    border: `1px solid ${withOpacity(term.accentBorder, isHovered || isOpen ? 0.55 : 0.28)}`,
    background: `linear-gradient(180deg, ${withOpacity(term.accentText, 0.06)}, ${withOpacity(
      term.accentText,
      0.015,
    )})`,
    overflow: "hidden",
    minWidth: 0,
    boxSizing: "border-box",
    transition: "all 0.35s var(--ease-smooth)",
    transform: isHovered && !isOpen ? "translateY(-1.5px)" : "translateY(0)",
    boxShadow:
      isHovered && !isOpen
        ? `0 8px 22px ${withOpacity(term.accentBorder, 0.18)}`
        : isOpen
          ? `0 4px 14px ${withOpacity(term.accentBorder, 0.15)}`
          : "0 0 0 transparent",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.7rem" : "0.85rem",
    padding: isMobile ? "0.85rem 0.95rem" : "1rem 1.1rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    color: colors.base.text.primary,
    transition: "background 0.25s var(--ease-smooth)",
  };

  const iconCircleStyle: CSSProperties = {
    width: isMobile ? "2.1rem" : "2.4rem",
    height: isMobile ? "2.1rem" : "2.4rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(term.accentText, isOpen ? 0.18 : 0.1),
    border: `1px solid ${withOpacity(term.accentBorder, 0.4)}`,
    color: term.accentText,
    transition: "all 0.3s var(--ease-smooth)",
  };

  const labelColumnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    flex: 1,
    minWidth: 0,
  };

  const titleStyle: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.78rem" : "0.85rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: term.accentText,
  };

  const summaryStyle: CSSProperties = {
    fontSize: isMobile ? "0.78rem" : "0.85rem",
    lineHeight: 1.45,
    color: colors.base.text.secondary,
  };

  const chevronStyle: CSSProperties = {
    flexShrink: 0,
    color: withOpacity(term.accentText, 0.7),
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.35s var(--ease-smooth)",
  };

  const metaStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.45rem" : "0.5rem",
    padding: isMobile ? "0 0.95rem 0.9rem" : "0.1rem 1.1rem 1rem",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isOpen ? "1fr" : "0fr",
    transition: "grid-template-rows 0.4s var(--ease-smooth)",
  };

  const bodyWrapperStyle: CSSProperties = {
    overflow: "hidden",
    minHeight: 0,
  };

  const bodyStyle: CSSProperties = {
    paddingTop: "0.85rem",
    paddingRight: isMobile ? "0.95rem" : "1.1rem",
    paddingBottom: isMobile ? "1rem" : "1.15rem",
    paddingLeft: isMobile ? "0.95rem" : "1.1rem",
    color: colors.base.text.primary,
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    lineHeight: 1.65,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    borderTop: `1px dashed ${withOpacity(term.accentBorder, 0.25)}`,
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s var(--ease-smooth) 0.1s",
  };

  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={() => {
          if (!isOpen) onOpen?.();
          toggle();
        }}
        aria-expanded={isOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={headerStyle}
      >
        <div style={iconCircleStyle}>
          <term.icon size={isMobile ? 14 : 16} strokeWidth={1.8} />
        </div>
        <div style={labelColumnStyle}>
          <span style={titleStyle}>{term.title}</span>
          <span style={summaryStyle}>{term.summary}</span>
        </div>
        <ChevronDown size={isMobile ? 16 : 18} strokeWidth={2.2} style={chevronStyle} />
      </button>

      {term.meta && <div style={metaStyle}>{term.meta}</div>}

      <div style={gridStyle}>
        <div style={bodyWrapperStyle}>
          <div style={bodyStyle}>{term.body}</div>
        </div>
      </div>
    </div>
  );
};
