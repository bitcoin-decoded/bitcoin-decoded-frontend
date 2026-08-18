import { type CSSProperties, type FC } from "react";

import { BRAND, THEME_COLORS, useBreakpoint, useThemeContext } from "../../../Design";
import { interpolate, useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { RevealOnScroll } from "../../Shared";
import { formatDuration } from "../helpers";
import type { CurriculumCard as CurriculumCardData } from "../types";

import { CurriculumCard } from "./CurriculumCard";

import { DoodleClock } from "@doodle";

type Props = {
  sectionId: string;
  cards: CurriculumCardData[];
  moduleCount: number;
  totalChapters: number;
  totalMinutes: number;
  onOpen: (route: RouteName) => void;
};

export const HomeCurriculum: FC<Props> = ({
  sectionId,
  cards,
  moduleCount,
  totalChapters,
  totalMinutes,
  onOpen,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const colors = THEME_COLORS[theme];

  const sectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    textAlign: "center",
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "1.4rem" : "1.85rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
    margin: 0,
    color: colors.base.text.primary,
  };

  const introStyle: CSSProperties = {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.85rem" : "0.95rem",
    letterSpacing: "0.04em",
    color: colors.base.text.secondary,
    margin: 0,
  };

  const cardsWrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
    gap: isMobile ? "0.85rem" : "1.15rem",
    width: "100%",
    marginTop: "0.5rem",
  };

  const intro = interpolate(t("home.curriculum.intro"), {
    modules: moduleCount,
    chapters: totalChapters,
  });

  return (
    <section id={sectionId} style={sectionStyle}>
      <RevealOnScroll>
        <h2 style={titleStyle}>{t("home.curriculum.title")}</h2>
      </RevealOnScroll>
      <RevealOnScroll delay={80}>
        <p style={introStyle}>
          <span>{intro}</span>
          <span aria-hidden style={{ opacity: 0.55 }}>
            ·
          </span>
          <DoodleClock size={20} aria-hidden />
          <span>{formatDuration(totalMinutes)}</span>
        </p>
      </RevealOnScroll>
      <div style={cardsWrapperStyle}>
        {cards.map((card, index) => (
          <RevealOnScroll
            key={card.nameKey}
            delay={index * 120}
            style={{ flex: isMobile ? "1 1 100%" : "1 1 0", display: "flex" }}
          >
            <CurriculumCard card={card} onOpen={onOpen} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};
