import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  getBrandGold,
  HighlightText,
  THEME_COLORS,
  useBreakpoint,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { interpolate, useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { useHover } from "../hooks";
import type { CurriculumCard as CurriculumCardData } from "../types";

import { LedgerCorners } from "./LedgerCorners";

import { DoodleBank, DoodleBitcoinGlobe, DoodleClock, DoodleCursorClick, DoodleMoneyBag } from "@doodle";
import { Check } from "@icons";

type Props = {
  card: CurriculumCardData;
  onOpen: (route: RouteName) => void;
};

const ICONS = [DoodleBank, DoodleMoneyBag, DoodleBitcoinGlobe];

const CTA_KEY = {
  "not-started": "home.curriculum.cta.start",
  "in-progress": "home.curriculum.cta.resume",
  completed: "home.curriculum.cta.review",
} as const;

export const CurriculumCard: FC<Props> = ({ card, onOpen }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const { isHovered, hoverProps } = useHover();

  const colors = THEME_COLORS[theme];
  const accent = colors[card.theme].text.secondary;
  const gold = getBrandGold(theme);
  const Icon = ICONS[card.index - 1] ?? DoodleBank;

  const cardStyle: CSSProperties = {
    position: "relative",
    flex: isMobile ? "1 1 100%" : "1 1 0",
    minWidth: isMobile ? "100%" : "15rem",
    padding: isMobile ? "1.6rem 1.35rem" : "1.8rem 1.5rem",
    background: withOpacity(accent, isHovered ? 0.08 : 0.035),
    border: "none",
    cursor: "pointer",
    transition: "background 0.35s var(--ease-smooth)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    textAlign: "center",
    color: colors.base.text.primary,
    fontFamily: "inherit",
  };

  const cornerColor = withOpacity(accent, isHovered ? 0.85 : 0.4);

  const topClusterStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
  };

  const iconWrapStyle: CSSProperties = {
    color: accent,
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.35s var(--ease-smooth)",
  };

  const stateStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: card.state === "completed" ? gold : accent,
    whiteSpace: "nowrap",
  };

  const dotStyle: CSSProperties = { width: 6, height: 6, background: accent };

  const kickerStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.16em",
    color: gold,
    fontVariant: "small-caps",
    margin: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "1.2rem" : "1.3rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
    margin: "0.15rem 0 0",
    color: colors.base.text.primary,
  };

  const punchlineStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontStyle: "italic",
    fontSize: isMobile ? "1.02rem" : "1.08rem",
    lineHeight: 1.4,
    color: accent,
    margin: 0,
    maxWidth: "22rem",
  };

  const notionsStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.55rem 0.7rem",
    lineHeight: 1.9,
    fontSize: "0.85rem",
    maxWidth: "24rem",
  };

  const readingBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    marginTop: "0.1rem",
  };

  const readingTimeRowStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    color: colors.base.text.primary,
  };

  const readingTimeTextStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1rem" : "1.05rem",
    letterSpacing: "0.02em",
  };

  const chaptersStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.04em",
    color: accent,
  };

  const ctaRowStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "auto",
    paddingTop: "0.5rem",
    color: accent,
    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
    transition: "transform 0.35s var(--ease-smooth)",
  };

  const ctaLabelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.95rem" : "1rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    fontVariant: "small-caps",
  };

  return (
    <button type="button" style={cardStyle} onClick={() => onOpen(card.startRoute)} {...hoverProps}>
      <LedgerCorners color={cornerColor} />

      <div style={topClusterStyle}>
        <span style={iconWrapStyle}>
          <Icon size={isMobile ? 48 : 52} />
        </span>
        {card.state === "completed" ? (
          <span style={stateStyle}>
            <Check size={15} aria-hidden />
            {t("home.curriculum.state.completed")}
          </span>
        ) : card.state === "in-progress" ? (
          <span style={stateStyle}>
            <span style={dotStyle} aria-hidden />
            {t("home.curriculum.state.inProgress")}
          </span>
        ) : null}
      </div>

      <div>
        <p style={kickerStyle}>{`Module 0${card.index}`}</p>
        <h3 style={titleStyle}>{t(card.nameKey)}</h3>
      </div>

      <p style={punchlineStyle}>{t(card.punchlineKey)}</p>

      <div style={notionsStyle}>
        {card.notions.map((notion) => (
          <HighlightText key={notion} hue={card.theme}>
            {notion}
          </HighlightText>
        ))}
      </div>

      <div style={readingBlockStyle}>
        <span style={readingTimeRowStyle}>
          <DoodleClock size={isMobile ? 24 : 26} style={{ color: accent }} aria-hidden />
          <span style={readingTimeTextStyle}>
            {interpolate(t("home.curriculum.minutes"), { m: card.minutes })}
          </span>
        </span>
        <span style={chaptersStyle}>
          {interpolate(t("home.curriculum.chapters"), { n: card.chapterCount })}
        </span>
      </div>

      <div style={ctaRowStyle}>
        <span style={ctaLabelStyle}>{t(CTA_KEY[card.state])}</span>
        <DoodleCursorClick size={isMobile ? 20 : 22} aria-hidden />
      </div>
    </button>
  );
};
