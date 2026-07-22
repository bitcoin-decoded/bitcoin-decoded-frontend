import { type CSSProperties, type FC, useState } from "react";

import { getBrandGold, useBreakpoint, usePageTheme, useThemeContext } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useScrollToTop } from "../hooks";

import { ArrowUp } from "@icons";

export const ScrollToTopButton: FC = () => {
  const { visible, scrollToTop } = useScrollToTop();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const [hovered, setHovered] = useState(false);

  const gold = getBrandGold(theme);
  const accent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;

  const buttonStyle: CSSProperties = {
    position: "fixed",
    bottom: isMobile ? "1.5rem" : "2rem",
    right: isMobile ? "1.5rem" : "2rem",
    zIndex: 90,
    width: isMobile ? "2.5rem" : "2.75rem",
    height: isMobile ? "2.5rem" : "2.75rem",
    borderRadius: 0,
    background: colors.base.background.secondary,
    border: `1px solid ${withOpacity(gold, hovered ? 0.75 : 0.4)}`,
    color: hovered ? accent : colors.base.text.secondary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition:
      "opacity 0.3s var(--ease-smooth), transform 0.3s var(--ease-smooth), border-color 0.25s var(--ease-smooth), color 0.25s var(--ease-smooth)",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform: visible ? (hovered ? "translateY(-2px)" : "translateY(0)") : "translateY(8px)",
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll to top"
    >
      <ArrowUp size={isMobile ? 17 : 19} strokeWidth={2} />
    </button>
  );
};
