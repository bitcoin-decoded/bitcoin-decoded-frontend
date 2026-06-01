import { type CSSProperties, type FC, useState } from "react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import type { KeyElement } from "../types";

type Props = {
  element: KeyElement;
  isSelected: boolean;
  /** Another node is selected — this one steps back. */
  isDimmed: boolean;
  onClick: () => void;
};

/**
 * One clickable element of the trio: an explicit icon in a circle, its title,
 * and its one-word role. Dumb component — selection state is owned by
 * `useKeySignatureTrio`; only ephemeral hover lives here (same pattern as
 * PillarRow).
 */
export const TrioNode: FC<Props> = ({ element, isSelected, isDimmed, onClick }) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const world = colors[moduleTheme];
  const accent = world.text.secondary;
  const accentBorder = world.border.secondary;
  const active = isSelected || isHovered;
  const circle = isMobile ? "2.5rem" : "3rem";

  const buttonStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.35rem",
    width: isMobile ? "5.5rem" : "7rem",
    padding: 0,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    color: colors.base.text.primary,
    opacity: isDimmed ? 0.45 : 1,
    transform: isSelected ? "translateY(-2px)" : "translateY(0)",
    transition: "opacity 0.35s var(--ease-smooth), transform 0.35s var(--ease-smooth)",
  };

  const iconCircleStyle: CSSProperties = {
    width: circle,
    height: circle,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: accent,
    background: active
      ? `radial-gradient(circle at 50% 35%, ${withOpacity(accent, 0.32)}, ${withOpacity(accent, 0.12)})`
      : withOpacity(accent, 0.1),
    border: `1.5px solid ${withOpacity(accentBorder, active ? 0.85 : 0.4)}`,
    boxShadow: isSelected
      ? `0 0 0 4px ${withOpacity(accent, 0.12)}, 0 8px 22px ${withOpacity(accent, 0.35)}`
      : "none",
    transform: active ? "scale(1.06)" : "scale(1)",
    transition: "all 0.3s var(--ease-smooth)",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.66rem" : "0.74rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    lineHeight: 1.25,
    color: isSelected ? accent : world.text.primary,
    transition: "color 0.3s var(--ease-smooth)",
  };

  const roleStyle: CSSProperties = {
    fontSize: isMobile ? "0.58rem" : "0.62rem",
    fontStyle: "italic",
    lineHeight: 1.2,
    color: withOpacity(colors.base.text.secondary, isSelected ? 0.95 : 0.6),
    transition: "color 0.3s var(--ease-smooth)",
  };

  const Icon = element.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-pressed={isSelected}
      style={buttonStyle}
    >
      <span style={iconCircleStyle}>
        <Icon size={isMobile ? 18 : 22} strokeWidth={2} />
      </span>
      <span style={titleStyle}>{element.title}</span>
      <span style={roleStyle}>{element.role}</span>
    </button>
  );
};
