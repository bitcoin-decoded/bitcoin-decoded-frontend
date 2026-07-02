import { type CSSProperties, type FC, useState } from "react";

import { BRAND } from "../../Design";
import { THEME_COLORS,useThemeContext } from "../../Design/Theme";
import { useLanguageContext } from "../hooks";
import { useTranslation } from "../hooks";

export const LanguageToggle: FC = () => {
  const { language, toggleLanguage } = useLanguageContext();
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const [isHovered, setIsHovered] = useState(false);

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
    fontFamily: BRAND.fonts.mono,
    fontWeight: 600,
    fontSize: "0.6875rem",
    letterSpacing: "0.06em",
    lineHeight: 1,
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
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
