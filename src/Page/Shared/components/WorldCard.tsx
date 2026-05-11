import { type FC, type CSSProperties, useState } from "react";
import { ArrowRight } from "lucide-react";

import { useBreakpoint } from "../../../Design/Responsive";

type Props = {
  title: string;
  subtitle: string;
  /** Multi-line description supported via `\n` (rendered with pre-line). */
  description: string;
  color: string;
  icon: string;
  onClick: () => void;
  /** Optional CTA label rendered inline next to the arrow. */
  cta?: string;
};

export const WorldCard: FC<Props> = ({
  title,
  subtitle,
  description,
  color,
  icon,
  onClick,
  cta,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  const cardStyle: CSSProperties = {
    position: "relative",
    flex: isMobile ? "1 1 100%" : "1 1 0",
    minWidth: isMobile ? "100%" : "14rem",
    // Tighter padding on mobile keeps the card compact in the stack
    padding: isMobile ? "1rem 1.1rem" : "1.85rem 1.5rem",
    borderRadius: "1rem",
    background: `linear-gradient(160deg, ${color}18, ${color}08)`,
    border: `1px solid ${isHovered ? `${color}80` : `${color}30`}`,
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered ? `0 12px 32px ${color}20` : "none",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.45rem" : "0.65rem",
    overflow: "hidden",
    textAlign: "left",
  };

  const iconStyle: CSSProperties = {
    fontSize: isMobile ? "1.5rem" : "1.85rem",
    lineHeight: 1,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: isMobile ? "0.65rem" : "0.7rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    color: color,
    opacity: 0.7,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    margin: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "0.95rem" : "1.1rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    color: color,
    letterSpacing: "0.02em",
    margin: 0,
    // Reserve 2 lines so all sibling titles take the same vertical space -
    // ensures the description (and arrow) align across cards regardless of
    // whether a title wraps to one or two lines.
    lineHeight: 1.25,
    minHeight: "2.5em",
  };

  const descStyle: CSSProperties = {
    fontSize: isMobile ? "0.8rem" : "0.875rem",
    lineHeight: 1.55,
    opacity: 0.78,
    margin: 0,
    // Multi-line descriptions split via "\n" render naturally.
    whiteSpace: "pre-line",
  };

  // Inline CTA label rendered just before the arrow pill ("Voir cette partie").
  const ctaLabelStyle: CSSProperties = {
    fontSize: isMobile ? "0.7rem" : "0.75rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    color: color,
    letterSpacing: "0.04em",
    opacity: isHovered ? 1 : 0.85,
    transition: "opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  const ctaRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "0.55rem",
    marginTop: "auto",
  };

  // Arrow pill - sits at the bottom-right of the card. The shared
  // ctaRowStyle (with marginTop: auto) keeps arrows aligned across cards
  // regardless of description length (cards stretch to equal heights via
  // the parent's flex layout).
  const arrowWrapperStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "2rem" : "2.25rem",
    height: isMobile ? "2rem" : "2.25rem",
    borderRadius: "999px",
    color: color,
    background: `${color}${isHovered ? "20" : "10"}`,
    border: `1px solid ${color}${isHovered ? "55" : "25"}`,
    transition: "all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
    transform: isHovered ? "translateX(4px)" : "translateX(0)",
    flexShrink: 0,
  };

  return (
    <button
      type="button"
      style={{ ...cardStyle, fontFamily: "inherit", color: "inherit" }}
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
        <span style={arrowWrapperStyle} aria-hidden>
          <ArrowRight size={isMobile ? 18 : 20} strokeWidth={2.2} />
        </span>
      </div>
    </button>
  );
};
