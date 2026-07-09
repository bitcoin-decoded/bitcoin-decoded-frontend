import { type CSSProperties, type FC, useState } from "react";

import { THEME_COLORS, useThemeContext } from "../../Theme";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export const HamburgerButton: FC<Props> = ({ isOpen, onToggle }) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const [isHovered, setIsHovered] = useState(false);

  const lineColor = isHovered ? colors.base.text.primary : colors.base.text.secondary;

  const buttonStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    background: isHovered ? colors.base.background.hover : "transparent",
    border: `1px solid ${colors.base.border.primary}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    padding: 0,
    transition: "background-color 0.2s, border-color 0.2s",
    zIndex: 110,
  };

  const lineBase: CSSProperties = {
    display: "block",
    width: "1rem",
    height: "1.5px",
    backgroundColor: lineColor,
    borderRadius: "1px",
    transition:
      "transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.2s",
    transformOrigin: "center",
  };

  const line1: CSSProperties = {
    ...lineBase,
    transform: isOpen ? "translateY(5.5px) rotate(45deg)" : "none",
  };
  const line2: CSSProperties = {
    ...lineBase,
    opacity: isOpen ? 0 : 1,
  };
  const line3: CSSProperties = {
    ...lineBase,
    transform: isOpen ? "translateY(-5.5px) rotate(-45deg)" : "none",
  };

  return (
    <button
      style={buttonStyle}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
    >
      <span style={line1} />
      <span style={line2} />
      <span style={line3} />
    </button>
  );
};
