import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { BRAND, getBrandGold, THEME_COLORS, useBreakpoint, useThemeContext } from "../../../Design";
import type { RevealPhase } from "../types";

type Props = {
  index: number;
  isCurrent: boolean;
  revealPhase: RevealPhase | null;
  title?: string;
  onActivate?: () => void;
  isUnreached?: boolean;
  children: ReactNode;
};

export const BlockShell: FC<Props> = ({
  index,
  isCurrent,
  revealPhase,
  title,
  onActivate,
  isUnreached = false,
  children,
}) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const gold = getBrandGold(theme);
  const readable = !isCurrent;

  const sectionStyle: CSSProperties = {
    display: isUnreached ? "none" : undefined,
    opacity: isCurrent ? 1 : isHovered ? 0.7 : 0.25,
    cursor: readable ? "pointer" : "default",
    transition: "opacity 0.4s var(--ease-smooth)",
    scrollMarginTop: "6.5rem",
    margin: isMobile ? "2rem 0" : "2.5rem 0",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    padding: isMobile ? "0 0.25rem" : "0",
    transition: "opacity 0.5s var(--ease-smooth)",
    ["--reading-glow" as string]: "transparent",
    pointerEvents: isCurrent ? "auto" : "none",
  };

  const headerRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    marginBottom: title ? "0.4rem" : "1rem",
  };

  const blockLabelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: colors.base.text.primary,
    flex: "0 0 auto",
    whiteSpace: "nowrap",
  };

  const ruleHeight = isCurrent ? 1.5 : 1;
  const ruleOpacity = isCurrent ? 1 : 0.4;

  const headerRuleStyle: CSSProperties = {
    flex: "1 1 auto",
    height: ruleHeight,
    background: gold,
    opacity: ruleOpacity,
  };

  const titleKickerStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    color: colors.base.text.secondary,
    fontVariant: "small-caps",
    marginBottom: "0.85rem",
  };

  const bodyStyle: CSSProperties = {
    paddingTop: isMobile ? "0.1rem" : "0.25rem",
    paddingBottom: isMobile ? "0.1rem" : "0.25rem",
  };

  const footerRuleStyle: CSSProperties = {
    height: ruleHeight,
    background: gold,
    opacity: ruleOpacity,
    marginTop: "1.25rem",
  };

  const blockIdLabel = `# block ${String(index + 1).padStart(4, "0")}`;

  return (
    <section
      data-block={index}
      style={sectionStyle}
      onClick={readable ? onActivate : undefined}
      onMouseEnter={readable ? () => setIsHovered(true) : undefined}
      onMouseLeave={readable ? () => setIsHovered(false) : undefined}
    >
      <div
        className={`reading-block-inner${
          revealPhase === "arriving" ? " arriving" : revealPhase === "playing" ? " revealing" : ""
        }`}
        style={innerStyle}
      >
        <div style={headerRowStyle}>
          <span style={blockLabelStyle}>{blockIdLabel}</span>
          <span style={headerRuleStyle} aria-hidden="true" />
        </div>
        {title && <span style={titleKickerStyle}>· {title.toLowerCase()}</span>}
        <div className="reading-block-body" style={bodyStyle}>
          {children}
        </div>
        <div style={footerRuleStyle} aria-hidden="true" />
      </div>
    </section>
  );
};
