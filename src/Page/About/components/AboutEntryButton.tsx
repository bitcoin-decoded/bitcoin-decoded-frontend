import { type CSSProperties, type FC, useState } from "react";

import { THEME_COLORS, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useAbout } from "../hooks";

import { HelpCircle } from "@icons";

// The header entry point: an icon-only bordered pill matching the other header
// controls (badges, account) — text would crowd the right cluster on mobile, so it
// stays a single restrained question mark.
export const AboutEntryButton: FC = () => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const { open } = useAbout();
  const [hovered, setHovered] = useState(false);
  const colors = THEME_COLORS[theme];

  const buttonStyle: CSSProperties = {
    height: "2rem",
    display: "inline-flex",
    alignItems: "center",
    padding: "0 0.55rem",
    background: hovered ? colors.base.background.hover : "transparent",
    border: `1px solid ${colors.base.border.primary}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: hovered ? colors.base.text.primary : colors.base.text.secondary,
    transition: "background-color 0.2s, color 0.2s",
  };

  return (
    <button
      style={buttonStyle}
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={t("about.nav")}
    >
      <HelpCircle size={16} strokeWidth={2} />
    </button>
  );
};
