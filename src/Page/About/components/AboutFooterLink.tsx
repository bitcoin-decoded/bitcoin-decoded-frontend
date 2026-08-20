import { type CSSProperties, type FC, useState } from "react";

import { BRAND, THEME_COLORS, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useAbout } from "../hooks";

// The footer entry point: a quiet text link that opens the same About modal.
export const AboutFooterLink: FC = () => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const { open } = useAbout();
  const [hovered, setHovered] = useState(false);
  const colors = THEME_COLORS[theme];

  const linkStyle: CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.02em",
    color: hovered ? colors.base.text.primary : colors.base.text.secondary,
    textDecoration: "underline",
    textUnderlineOffset: "0.2em",
    transition: "color 0.2s",
  };

  return (
    <button
      style={linkStyle}
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {t("about.nav")}
    </button>
  );
};
