import { type FC, type CSSProperties } from "react";
import { useThemeContext, useThemeToggle } from "../hooks";
import { THEME_COLORS } from "../data";
import { SunIcon, MoonIcon } from "../../icons";
import { useTranslation } from "../../../I18n";

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { isHovered, setIsHovered } = useThemeToggle();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];

  // Aligned with LanguageToggle and HamburgerButton - same 2rem square
  // footprint, same border + hover treatment.
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
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
