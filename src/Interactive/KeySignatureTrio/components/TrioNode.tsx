import { type CSSProperties, type FC, useState } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import type { KeyElement } from "../types";

type Props = {
  element: KeyElement;
  isSelected: boolean;
  isDimmed: boolean;
  onClick: () => void;
};

export const TrioNode: FC<Props> = ({ element, isSelected, isDimmed, onClick }) => {
  const typo = getTypography();
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
    background: withOpacity(accent, active ? 0.18 : 0.1),
    border: `1px solid ${withOpacity(accentBorder, active ? 0.85 : 0.4)}`,
    transform: active ? "scale(1.06)" : "scale(1)",
    transition: "all 0.3s var(--ease-smooth)",
  };

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    lineHeight: 1.25,
    color: isSelected ? accent : world.text.primary,
    transition: "color 0.3s var(--ease-smooth)",
  };

  const roleStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
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
