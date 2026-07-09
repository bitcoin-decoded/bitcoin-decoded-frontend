import { type CSSProperties, type FC } from "react";

import { useTranslation } from "../../../I18n";
import { THEME_COLORS } from "../data";
import { useThemeContext, useThemeToggle } from "../hooks";

import { Moon, Sun } from "@icons";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { isHovered, setIsHovered } = useThemeToggle();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];

  const buttonStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: isHovered ? colors.base.background.hover : "transparent",
    border: `1px solid ${colors.base.border.primary}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: isHovered ? colors.base.text.primary : colors.base.text.secondary,
    padding: 0,
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
  };

  return (
    <button
      style={buttonStyle}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={
        theme === "light" ? t("theme.toggleAriaLabel.light") : t("theme.toggleAriaLabel.dark")
      }
    >
      {theme === "light" ? (
        <Moon size={16} strokeWidth={2} />
      ) : (
        <Sun size={16} strokeWidth={2} />
      )}
    </button>
  );
};
