import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  Button,
  getBrandGold,
  THEME_COLORS,
  useBreakpoint,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { interpolate, useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import type { CurriculumResume } from "../types";

type Props = {
  resume: CurriculumResume;
  onResume: (route: RouteName) => void;
  onRestart: () => void;
};

export const HomeResume: FC<Props> = ({ resume, onResume, onRestart }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const pct = resume.totalCount > 0 ? Math.round((resume.doneCount / resume.totalCount) * 100) : 0;

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
    padding: isMobile ? "1.2rem 1.25rem" : "1.5rem 1.75rem",
    border: `1px solid ${withOpacity(gold, 0.4)}`,
    background: withOpacity(gold, 0.05),
    width: "100%",
    boxSizing: "border-box",
  };

  const kickerStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: gold,
    margin: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "1.15rem" : "1.3rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: 0,
    color: colors.base.text.primary,
  };

  const positionStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.06em",
    color: colors.base.text.secondary,
    margin: 0,
  };

  const trackStyle: CSSProperties = {
    position: "relative",
    height: BRAND.figures.ruleThickness * 2,
    background: withOpacity(colors.base.text.secondary, 0.2),
    width: "100%",
  };

  const fillStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: `${pct}%`,
    background: gold,
    transition: "width 0.4s var(--ease-smooth)",
  };

  const metaRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.75rem",
    flexWrap: "wrap",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
    color: colors.base.text.secondary,
  };

  const actionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "stretch" : "center",
    gap: "0.6rem",
    marginTop: "0.15rem",
  };

  return (
    <div style={cardStyle}>
      <p style={kickerStyle}>{t("home.resume.title")}</p>

      {resume.allDone ? (
        <p style={titleStyle}>{interpolate(t("home.resume.allDone"), { total: resume.totalCount })}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <p style={positionStyle}>
            {interpolate(t("home.resume.position"), {
              m: resume.moduleIndex,
              c: resume.chapterNumberInModule,
            })}
          </p>
          <p style={titleStyle}>{resume.chapterLabel}</p>
        </div>
      )}

      <div style={trackStyle} aria-hidden>
        <div style={fillStyle} />
      </div>

      <div style={metaRowStyle}>
        <span>{interpolate(t("home.resume.progress"), { done: resume.doneCount, total: resume.totalCount })}</span>
        {!resume.allDone && (
          <span>
            {interpolate(t("home.resume.remaining"), {
              n: resume.remainingCount,
              m: resume.remainingMinutes,
            })}
          </span>
        )}
      </div>

      <div style={actionsStyle}>
        {resume.allDone ? (
          <Button variant="primary" onClick={onRestart}>
            {t("home.resume.restart")}
          </Button>
        ) : (
          <>
            <Button variant="primary" onClick={() => onResume(resume.route)}>
              {t("home.resume.button")}
            </Button>
            <Button variant="ghost" onClick={onRestart}>
              {t("home.resume.restart")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
