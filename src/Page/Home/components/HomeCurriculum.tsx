import { type CSSProperties, type FC } from "react";

import { BRAND, useBreakpoint, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { RevealOnScroll } from "../../Shared";
import { getLandingColors } from "../helpers";
import type { CurriculumCard as CurriculumCardData } from "../types";

import { CurriculumCard } from "./CurriculumCard";
import { Eyebrow } from "./Eyebrow";

type Props = {
  sectionId: string;
  cards: CurriculumCardData[];
  onOpen: (route: RouteName) => void;
};

// The programme, after the course door and outside the staircase: the three
// module cards for the methodical visitor who wants the syllabus before walking.
// Structure only ever appears this late, never before the desire.
export const HomeCurriculum: FC<Props> = ({ sectionId, cards, onOpen }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const { ink, ink2 } = getLandingColors(theme);

  // No scroll-snap here: the programme sits outside the escalier, and snapping it
  // was pulling the reader back off the footer. Only the paliers above snap.
  const sectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "clamp(3.5rem, 9vh, 5.5rem) clamp(1.25rem, 6vw, 3rem) clamp(4rem, 10vh, 6rem)",
  };

  const headStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "44rem",
    marginBottom: "2.4rem",
  };

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: isMobile ? "1.7rem" : "2.4rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.1,
    margin: 0,
    color: ink,
  };

  const leadStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "1rem" : "1.1rem",
    lineHeight: 1.5,
    color: ink2,
    margin: "1rem 0 0",
    maxWidth: "40ch",
  };

  const cardsWrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
    gap: isMobile ? "0.85rem" : "1.15rem",
    width: "100%",
    maxWidth: "56rem",
  };

  return (
    <section id={sectionId} style={sectionStyle}>
      <div style={headStyle}>
        <RevealOnScroll>
          <Eyebrow label={t("home.curriculum.eyebrow")} align="center" />
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <h2 style={titleStyle}>{t("home.curriculum.title")}</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={140}>
          <p style={leadStyle}>{t("home.curriculum.lead")}</p>
        </RevealOnScroll>
      </div>

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
