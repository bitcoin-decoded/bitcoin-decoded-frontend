import { type CSSProperties, type FC } from "react";

import { BRAND, useBreakpoint, usePageTheme, withOpacity } from "../../Design";
import { useTranslation } from "../../I18n";
import { BADGES } from "../data";
import { getModuleLabelKey, getModuleRamp, groupBadgesByModule } from "../helpers";
import { useBadges } from "../hooks";

import { BadgeMedal } from "./BadgeMedal";

/**
 * The collection itself: badges grouped by module (each section titled + counted),
 * earned medals lit and locked ones quiet. Names stay visible when locked - they
 * read as goals, not spoilers (the chapter titles are already in the nav).
 */
export const BadgeGrid: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { isEarned } = useBadges();

  const groups = groupBadgesByModule(BADGES);

  const sectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "1rem" : "1.25rem",
  };

  const headerRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.6rem",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? "8rem" : "9rem"}, 1fr))`,
    gap: isMobile ? "1.25rem 0.75rem" : "1.75rem 1rem",
  };

  const cellStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.65rem",
    textAlign: "center",
  };

  const nameStyle = (earned: boolean): CSSProperties => ({
    fontSize: isMobile ? "0.78rem" : "0.82rem",
    fontWeight: 500,
    lineHeight: 1.35,
    color: earned ? colors.base.text.primary : withOpacity(colors.base.text.secondary, 0.65),
    transition: "color 0.3s var(--ease-smooth)",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2.5rem" : "3rem" }}>
      {groups.map((group) => {
        const accent = colors[getModuleRamp(group.module)].text.secondary;
        const earnedInModule = group.badges.filter((b) => isEarned(b.id)).length;

        return (
          <section key={group.module} style={sectionStyle}>
            <div style={headerRowStyle}>
              <h2
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  fontWeight: 600,
                  color: accent,
                  margin: 0,
                }}
              >
                {t(getModuleLabelKey(group.module))}
              </h2>
              <span
                style={{
                  fontFamily: BRAND.fonts.mono,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: colors.base.text.secondary,
                }}
              >
                {earnedInModule} / {group.badges.length}
              </span>
            </div>

            <div style={gridStyle}>
              {group.badges.map((badge) => {
                const earned = isEarned(badge.id);
                return (
                  <div key={badge.id} style={cellStyle}>
                    <BadgeMedal badge={badge} earned={earned} size="md" />
                    <span style={nameStyle(earned)}>{t(badge.nameKey)}</span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
