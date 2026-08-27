import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  Button,
  THEME_COLORS,
  useBreakpoint,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { interpolate, useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { formatDuration } from "../helpers";
import { useHover } from "../hooks";
import type { CurriculumCard as CurriculumCardData } from "../types";

import { LedgerCorners } from "./LedgerCorners";

import { DoodleClock } from "@doodle";

type Props = {
  card: CurriculumCardData;
  onOpen: (route: RouteName) => void;
};

const CTA_KEY = {
  "not-started": "home.curriculum.cta.start",
  "in-progress": "home.curriculum.cta.resume",
  completed: "home.curriculum.cta.review",
} as const;

// Sober syllabus card: the module label, its title and one-line punchline, the
// reading times kept, and a single prominent CTA button. No keyword cloud, no
// hero icon — the button carries the call to act.
export const CurriculumCard: FC<Props> = ({ card, onOpen }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const { isHovered, hoverProps } = useHover();

  const colors = THEME_COLORS[theme];
  const accent = colors[card.theme].text.secondary;

  const cardStyle: CSSProperties = {
    position: "relative",
    flex: isMobile ? "1 1 100%" : "1 1 0",
    minWidth: isMobile ? "100%" : "15rem",
    padding: isMobile ? "1.5rem 1.4rem" : "1.7rem 1.6rem",
    border: `1px solid ${withOpacity(accent, isHovered ? 0.5 : 0.22)}`,
    background: withOpacity(accent, isHovered ? 0.07 : 0.035),
    transition: "background 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.85rem",
    textAlign: "left",
    color: colors.base.text.primary,
  };

  const kickerStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    color: accent,
    fontVariant: "small-caps",
    margin: 0,
  };

  // Reserve two lines for the title so one-line and two-line module names align,
  // and the punchlines below start on the same row across the three cards.
  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: isMobile ? "1.3rem" : "1.4rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.15,
    margin: 0,
    minHeight: "2.3em",
    display: "flex",
    alignItems: "flex-start",
    color: colors.base.text.primary,
  };

  const punchlineStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontStyle: "italic",
    fontSize: isMobile ? "1rem" : "1.05rem",
    lineHeight: 1.4,
    color: accent,
    margin: 0,
  };

  // A flexible spacer so the times + button land at the foot of every equal-height
  // card, lined up across the row.
  const spacerStyle: CSSProperties = { flex: 1, minHeight: "0.6rem" };

  const metaStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.02em",
    color: colors.base.text.secondary,
    margin: 0,
  };

  return (
    <div style={cardStyle} {...hoverProps}>
      <LedgerCorners color={withOpacity(accent, isHovered ? 0.85 : 0.4)} />

      <p style={kickerStyle}>{`Module 0${card.index}`}</p>
      <h3 style={titleStyle}>{t(card.nameKey)}</h3>
      <p style={punchlineStyle}>{t(card.punchlineKey)}</p>

      <div style={spacerStyle} />

      <p style={metaStyle}>
        <DoodleClock size={isMobile ? 22 : 24} style={{ color: accent }} aria-hidden />
        <span>
          {interpolate(t("home.curriculum.minutes"), { duration: formatDuration(card.minutes) })}
          {" · "}
          {interpolate(t("home.curriculum.chapters"), { n: card.chapterCount })}
        </span>
      </p>

      <Button variant="primary" color={accent} fullWidth onClick={() => onOpen(card.startRoute)}>
        {t(CTA_KEY[card.state])}
      </Button>
    </div>
  );
};
