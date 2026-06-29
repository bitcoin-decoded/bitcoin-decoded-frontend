import { type CSSProperties, type FC, useState } from "react";

import { ArrowRight } from "lucide-react";

import { BRAND, THEME_COLORS, useBreakpoint, useThemeContext, withOpacity } from "../../../Design";

type Props = {
  title: string;
  subtitle: string;
  /** Multi-line description supported via `\n` (rendered with pre-line). */
  description: string;
  /** Module identity — resolves to its themed accent in THEME_COLORS. */
  module: "blue" | "violet" | "amber";
  icon: string;
  onClick: () => void;
  /** Optional CTA label rendered inline next to the arrow. */
  cta?: string;
};

/**
 * A journey navigation tile, in the ledger register: a sharp hairline frame in
 * the module color (radius 0, no gradient, no shadow), a mono small-caps kicker,
 * a mono title, serif description, and a module-colored arrow that nudges on
 * hover. Replaces the previous rounded gradient card + lift/glow recipe.
 */
export const WorldCard: FC<Props> = ({ title, subtitle, description, module, icon, onClick, cta }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const accent = THEME_COLORS[theme][module].text.secondary;

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
    gap: isMobile ? "0.45rem" : "0.6rem",
    textAlign: "left",
  };

  const iconStyle: CSSProperties = {
    fontSize: isMobile ? "1.5rem" : "1.85rem",
    lineHeight: 1,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: BRAND.fontSize.label,
    fontFamily: BRAND.fonts.mono,
    fontWeight: 500,
    color: accent,
    opacity: 0.85,
    letterSpacing: "0.08em",
    fontVariant: "small-caps",
    margin: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "0.95rem" : "1rem",
    fontFamily: BRAND.fonts.mono,
    fontWeight: 500,
    color: accent,
    letterSpacing: "0.01em",
    margin: 0,
    // Reserve 2 lines so sibling titles take the same vertical space — keeps
    // descriptions and arrows aligned across cards whether or not a title wraps.
    lineHeight: 1.3,
    minHeight: "2.6em",
  };

  const descStyle: CSSProperties = {
    fontSize: BRAND.fontSize.body,
    fontFamily: BRAND.fonts.body,
    lineHeight: 1.55,
    opacity: 0.8,
    margin: 0,
    // Multi-line descriptions split via "\n" render naturally.
    whiteSpace: "pre-line",
  };

  const ctaLabelStyle: CSSProperties = {
    fontSize: BRAND.fontSize.label,
    fontFamily: BRAND.fonts.mono,
    fontWeight: 500,
    color: accent,
    letterSpacing: "0.04em",
    fontVariant: "small-caps",
    opacity: isHovered ? 1 : 0.85,
    transition: "opacity 0.3s var(--ease-smooth)",
  };

  const ctaRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
      <span style={iconStyle}>{icon}</span>
      <p style={subtitleStyle}>{subtitle}</p>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descStyle}>{description}</p>
      <div style={ctaRowStyle}>
        {cta && <span style={ctaLabelStyle}>{cta}</span>}
        <ArrowRight size={isMobile ? 16 : 18} strokeWidth={2} aria-hidden />
      </div>
    </button>
  );
};
