import { type FC, type CSSProperties, useState } from "react";
import { useLanguageContext } from "../hooks";
import { useTranslation } from "../hooks";
import { useThemeContext, THEME_COLORS } from "../../Design/Theme";

export const LanguageToggle: FC = () => {
  const { language, toggleLanguage } = useLanguageContext();
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const [isHovered, setIsHovered] = useState(false);

  // Aligned with ThemeToggle and HamburgerButton — same height (2rem),
  // same border, same hover behavior (subtle bg lift + text brighten).
  const buttonStyle: CSSProperties = {
    height: "2rem",
    minWidth: "2rem",
    padding: "0 0.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: isHovered ? colors.base.background.hover : "transparent",
    border: `1px solid ${colors.base.border.primary}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: isHovered ? colors.base.text.primary : colors.base.text.secondary,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    fontSize: "0.6875rem",
    letterSpacing: "0.06em",
    lineHeight: 1,
    transition:
      "background-color 0.2s, color 0.2s, border-color 0.2s",
  };

  return (
    <button
      style={buttonStyle}
      onClick={toggleLanguage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={t("language.toggleAriaLabel")}
    >
      {language.toUpperCase()}
    </button>
  );
};
