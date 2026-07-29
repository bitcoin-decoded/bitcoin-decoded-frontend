import { type CSSProperties, type FC, useState } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import type { KeyElement } from "../types";

type Props = {
  element: KeyElement;
  accent: string;
  isSelected: boolean;
  isDimmed: boolean;
  onClick: () => void;
};

export const TrioNode: FC<Props> = ({ element, accent, isSelected, isDimmed, onClick }) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const world = colors[moduleTheme];
  const active = isSelected || isHovered;
  const box = isMobile ? "2.6rem" : "3rem";

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

  const iconBox: CSSProperties = {
    width: box,
    height: box,
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: accent,
    background: withOpacity(accent, active ? 0.18 : 0.1),
    border: `1px solid ${withOpacity(accent, active ? 0.85 : 0.4)}`,
    transform: active ? "scale(1.06)" : "scale(1)",
    transition: "all 0.3s var(--ease-smooth)",
  };

  const titleStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    lineHeight: 1.25,
    color: isSelected ? accent : world.text.primary,
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
      <span style={iconBox}>
        <Icon size={isMobile ? 22 : 26} />
      </span>
      <span style={titleStyle}>{element.title}</span>
    </button>
  );
};
