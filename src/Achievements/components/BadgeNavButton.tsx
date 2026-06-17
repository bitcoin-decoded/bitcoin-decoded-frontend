import { type CSSProperties, type FC, useState } from "react";

import { Award } from "lucide-react";

import { THEME_COLORS, useThemeContext } from "../../Design";
import { useTranslation } from "../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../Routing";
import { useBadges } from "../hooks";

/**
 * Header entry to the badge collection: a quiet pill mirroring the theme/lang
 * toggles (2rem tall, same border + hover), with the earned count alongside an
 * award glyph. Active when the collection page is open.
 */
export const BadgeNavButton: FC = () => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const { currentPage, setCurrentPage } = useRouterContext();
  const { earnedCount } = useBadges();
  const [hovered, setHovered] = useState(false);
  const colors = THEME_COLORS[theme];

  const isActive = currentPage === ROUTE_NAME.Badges;
  const lit = isActive || hovered;

  const buttonStyle: CSSProperties = {
    height: "2rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0 0.6rem",
    background: lit ? colors.base.background.hover : "transparent",
    border: `1px solid ${isActive ? colors.amber.border.secondary : colors.base.border.primary}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    color: lit ? colors.base.text.primary : colors.base.text.secondary,
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
  };

  const countStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.75rem",
    fontWeight: 700,
    lineHeight: 1,
  };

  return (
    <button
      style={buttonStyle}
      onClick={() => setCurrentPage(ROUTE_NAME.Badges)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={t("badges.navLabel")}
    >
      <Award size={16} strokeWidth={2} />
      {earnedCount > 0 && <span style={countStyle}>{earnedCount}</span>}
    </button>
  );
};
