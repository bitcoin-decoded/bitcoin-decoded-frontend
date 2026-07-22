import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { BRAND, getBrandGold, getTypography, THEME_COLORS, useBreakpoint, useThemeContext, withOpacity } from "../../../Design";

import { DoodleCursorClick } from "@doodle";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  module: "blue" | "violet" | "amber";
  icon: ReactNode;
  onClick: () => void;
  cta?: string;
};

export const WorldCard: FC<Props> = ({ title, subtitle, description, module, icon, onClick, cta }) => {
  const typo = getTypography();
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const colors = THEME_COLORS[theme];
  const accent = colors[module].text.secondary;
  const gold = getBrandGold(theme);

  const cardStyle: CSSProperties = {
    position: "relative",
    flex: isMobile ? "1 1 100%" : "1 1 0",
    minWidth: isMobile ? "100%" : "14rem",
    padding: isMobile ? "1.1rem 1.2rem" : "1.6rem 1.5rem",
    borderRadius: 0,
    background: withOpacity(accent, isHovered ? 0.08 : 0.04),
    border: `1px solid ${withOpacity(accent, isHovered ? 0.6 : 0.28)}`,
    cursor: "pointer",
    transition: "background 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "0.45rem" : "0.6rem",
    textAlign: "center",
    color: colors.base.text.primary,
  };

  const iconWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: accent,
    marginBottom: isMobile ? "0.2rem" : "0.4rem",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.3s var(--ease-smooth)",
  };

  const kickerStyle: CSSProperties = {
    ...typo.kicker,
    margin: 0,
    lineHeight: 1.5,
    minHeight: "4.5em",
  };
  const markerStyle: CSSProperties = { color: gold };
  const titlePartStyle: CSSProperties = { color: accent };

  const descStyle: CSSProperties = {
    fontSize: typo.note.fontSize,
    fontFamily: BRAND.fonts.body,
    lineHeight: 1.55,
    color: colors.base.text.primary,
    opacity: 0.8,
    margin: 0,
    whiteSpace: "pre-line",
  };

  const ctaLabelStyle: CSSProperties = {
    fontSize: typo.label.fontSize,
    fontFamily: BRAND.fonts.mono,
    fontWeight: 500,
    color: accent,
    letterSpacing: "0.14em",
    fontVariant: "small-caps",
    opacity: isHovered ? 1 : 0.85,
    transition: "opacity 0.3s var(--ease-smooth)",
  };

  const ctaRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "auto",
    paddingTop: "0.4rem",
    color: accent,
    transform: isHovered ? "translateX(3px)" : "translateX(0)",
    transition: "transform 0.3s var(--ease-smooth)",
  };

  return (
    <button
      type="button"
      style={{ ...cardStyle, fontFamily: "inherit" }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={iconWrapStyle}>{icon}</span>
      <h3 style={kickerStyle}>
        <span style={markerStyle}>{subtitle}</span>
        <span style={titlePartStyle}>{` · ${title}`}</span>
      </h3>
      <p style={descStyle}>{description}</p>
      <div style={ctaRowStyle}>
        {cta && <span style={ctaLabelStyle}>{cta}</span>}
        <DoodleCursorClick size={isMobile ? 18 : 20} aria-hidden />
      </div>
    </button>
  );
};
