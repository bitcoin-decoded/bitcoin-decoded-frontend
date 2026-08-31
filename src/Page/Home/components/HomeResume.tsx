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
import { RESUME_TIER_COPY } from "../data";
import { getResumeTier } from "../helpers";
import type { CurriculumResume } from "../types";

import { X } from "@icons";

type Props = {
  resume: CurriculumResume;
  onOpen: (route: RouteName) => void;
  onBadges: () => void;
  onDismiss?: () => void;
};

export const HomeResume: FC<Props> = ({ resume, onOpen, onBadges, onDismiss }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);
  const isDark = theme === "dark";

  const copy = RESUME_TIER_COPY[getResumeTier(resume.doneCount)];

  const onPrimary = () =>
    onOpen(copy.primaryKind === "restart" ? resume.startRoute : resume.resumeRoute);
  const onSecondary = copy.secondaryKind === "badges" ? onBadges : () => onOpen(resume.startRoute);
  const secondaryLabelKey =
    copy.secondaryKind === "badges" ? "home.resume.badges" : "home.resume.restart";

  const cardStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "1rem" : "1.15rem",
    padding: isMobile ? "1.4rem 1.3rem" : "1.75rem 2rem",
    borderTop: `3px solid ${gold}`,
    background: withOpacity(colors.base.text.primary, isDark ? 0.05 : 0.035),
    width: "100%",
    maxWidth: "42rem",
    boxSizing: "border-box",
  };

  const dismissStyle: CSSProperties = {
    position: "absolute",
    top: isMobile ? "0.7rem" : "0.85rem",
    right: isMobile ? "0.7rem" : "0.85rem",
    display: "inline-flex",
    padding: "0.35rem",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: colors.base.text.secondary,
    lineHeight: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
    margin: 0,
    color: colors.base.text.primary,
  };

  const messageStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "1rem" : "1.05rem",
    lineHeight: 1.6,
    margin: 0,
    color: colors.base.text.primary,
    maxWidth: "36rem",
  };

  const progressStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "0.15rem",
  };

  const blocksRowStyle: CSSProperties = {
    display: "flex",
    gap: isMobile ? "2px" : "3px",
    width: "100%",
  };

  const block = (filled: boolean): CSSProperties => ({
    flex: 1,
    height: isMobile ? 9 : 11,
    background: filled ? gold : withOpacity(colors.base.text.secondary, 0.2),
    transition: "background 0.3s var(--ease-smooth)",
  });

  const counterStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.82rem",
    letterSpacing: "0.04em",
    color: colors.base.text.primary,
    margin: 0,
  };

  const actionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "stretch" : "center",
    gap: "0.7rem",
    marginTop: "0.2rem",
  };

  return (
    <div style={cardStyle}>
      {onDismiss && (
        <button type="button" style={dismissStyle} onClick={onDismiss} aria-label={t("home.resume.dismiss")}>
          <X size={isMobile ? 18 : 20} />
        </button>
      )}
      <h3 style={titleStyle}>{t(copy.titleKey)}</h3>
      <p style={messageStyle}>{interpolate(t(copy.messageKey), { x: resume.doneCount })}</p>

      <div style={progressStyle}>
        <div style={blocksRowStyle} aria-hidden>
          {Array.from({ length: resume.totalCount }, (_, i) => (
            <span key={i} style={block(i < resume.doneCount)} />
          ))}
        </div>
        <p style={counterStyle}>
          {interpolate(t("home.resume.progress"), {
            done: resume.doneCount,
            total: resume.totalCount,
          })}
        </p>
      </div>

      <div style={actionsStyle}>
        <Button variant="primary" onClick={onPrimary}>
          {t(copy.primaryLabelKey)}
        </Button>
        {copy.secondaryKind && (
          <Button variant="secondary" onClick={onSecondary}>
            {t(secondaryLabelKey)}
          </Button>
        )}
      </div>
    </div>
  );
};
