import { type CSSProperties, type FC } from "react";

import { BadgeGrid, useBadges } from "../../../Achievements";
import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared";

export const BadgesPage: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { earnedCount, totalCount } = useBadges();

  const gold = colors.amber.background.secondary;
  const pct = totalCount === 0 ? 0 : Math.round((earnedCount / totalCount) * 100);

  const introStyle: CSSProperties = {
    textAlign: "center",
    fontSize: isMobile ? "0.9rem" : "0.95rem",
    lineHeight: 1.6,
    color: colors.base.text.secondary,
    margin: "0 auto 2rem",
    maxWidth: "32rem",
  };

  const progressWrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    maxWidth: "22rem",
    margin: "0 auto 3rem",
  };

  const progressLabelStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    gap: "0.4rem",
    fontFamily: "'JetBrains Mono', monospace",
  };

  const trackStyle: CSSProperties = {
    height: "0.4rem",
    borderRadius: "999px",
    background: withOpacity(colors.base.text.secondary, 0.14),
    overflow: "hidden",
  };

  const fillStyle: CSSProperties = {
    width: `${pct}%`,
    height: "100%",
    borderRadius: "999px",
    background: gold,
    transition: "width 0.5s var(--ease-smooth)",
  };

  return (
    <PageTemplate title={t("badges.title")} showReadingTime={false} showChapterNav={false}>
      <p style={introStyle}>{t("badges.intro")}</p>

      <div style={progressWrapStyle}>
        <div style={progressLabelStyle}>
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: colors.base.text.primary }}>
            {earnedCount}
          </span>
          <span style={{ fontSize: "0.85rem", color: colors.base.text.secondary }}>
            / {totalCount} {t("badges.unlocked")}
          </span>
        </div>
        <div style={trackStyle}>
          <div style={fillStyle} />
        </div>
      </div>

      <BadgeGrid />
    </PageTemplate>
  );
};
