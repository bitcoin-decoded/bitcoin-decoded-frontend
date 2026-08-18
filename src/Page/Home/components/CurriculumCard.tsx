import { type CSSProperties, type FC } from "react";

import {
  BRAND,
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
import { NotionCloud } from "./NotionCloud";

import { DoodleBank, DoodleBitcoinGlobe, DoodleClock, DoodleCursorClick, DoodleMoneyBag } from "@doodle";

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

  const iconWrapStyle: CSSProperties = {
    color: accent,
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "transform 0.35s var(--ease-smooth)",
  };

  const kickerStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.88rem" : "0.95rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    color: accent,
    fontVariant: "small-caps",
    margin: 0,
  };

  // Reserve two lines for the title so a one-line module name still occupies the same
  // height as the wrapping ones — the punchlines below then start on the same row
  // across the three cards.
  const titleStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "2.4em",
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

  // The notion cloud sits in a flexible region that grows to fill the space between
  // the punchline and the footer and centres the keywords in it, so a card with
  // fewer notions has them vertically centred rather than stuck under the punchline.
  const cloudRegionStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "0.6rem 0",
  };

  // The footer then lands at the bottom of every (equal-height) card, so the three
  // reading times line up across the row.
  const cardFooterStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.7rem",
    paddingTop: "0.7rem",
  };

  const readingBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
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

      <span style={iconWrapStyle}>
        <Icon size={isMobile ? 48 : 52} />
      </span>

      <div>
        <p style={kickerStyle}>{`Module 0${card.index}`}</p>
        <h3 style={titleStyle}>{t(card.nameKey)}</h3>
      </div>

      <p style={punchlineStyle}>{t(card.punchlineKey)}</p>

      <div style={cloudRegionStyle}>
        <NotionCloud words={card.notions} color={accent} />
      </div>

      <div style={cardFooterStyle}>
        <div style={readingBlockStyle}>
          <span style={readingTimeRowStyle}>
            <DoodleClock size={isMobile ? 24 : 26} style={{ color: accent }} aria-hidden />
            <span style={readingTimeTextStyle}>
              {interpolate(t("home.curriculum.minutes"), { duration: formatDuration(card.minutes) })}
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
      </div>
    </button>
  );
};
