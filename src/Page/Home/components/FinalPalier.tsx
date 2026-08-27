import { type CSSProperties, type FC } from "react";

import { BRAND, Button, useThemeContext } from "../../../Design";
import { interpolate, useTranslation } from "../../../I18n";
import { RevealOnScroll } from "../../Shared";
import { formatDuration, getLandingColors } from "../helpers";

import { Eyebrow } from "./Eyebrow";
import { PalierSection } from "./PalierSection";

type Props = {
  moduleCount: number;
  totalChapters: number;
  totalMinutes: number;
  onStart: () => void;
  onSeeProgram: () => void;
};

// The course door. Structure appears here for the first time (3 · 19 · 2h10),
// derived from the curriculum so it never drifts. Primary CTA enters at chapter
// one; secondary scrolls to the programme.
export const FinalPalier: FC<Props> = ({
  moduleCount,
  totalChapters,
  totalMinutes,
  onStart,
  onSeeProgram,
}) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { ink, ink2, lineStrong } = getLandingColors(theme);

  const headingStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontWeight: 500,
    fontSize: "clamp(1.8rem, 4.4vw, 3rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.01em",
    color: ink,
    margin: 0,
    textWrap: "balance",
    maxWidth: "20ch",
  };

  const ledeStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: "clamp(1.02rem, 2.2vw, 1.18rem)",
    lineHeight: 1.5,
    color: ink2,
    margin: "1.3rem 0 0",
    maxWidth: "40ch",
  };

  const structStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: ink2,
    border: `1px solid ${lineStrong}`,
    padding: "0.55rem 1.15rem",
    margin: "1.7rem 0 0",
  };

  const ctaRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    margin: "2rem 0 0",
  };

  const struct = interpolate(t("home.final.struct"), {
    modules: moduleCount,
    chapters: totalChapters,
    duration: formatDuration(totalMinutes),
  });

  return (
    <PalierSection id="final" align="center">
      <RevealOnScroll>
        <Eyebrow label={t("home.final.eyebrow")} align="center" />
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <h2 style={headingStyle}>{t("home.final.heading")}</h2>
      </RevealOnScroll>

      <RevealOnScroll delay={140}>
        <p style={ledeStyle}>{t("home.final.lede")}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <p style={structStyle}>{struct}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={260}>
        <div style={ctaRowStyle}>
          <Button variant="primary" onClick={onStart}>
            {t("home.final.ctaEnter")}
          </Button>
          <Button variant="secondary" onClick={onSeeProgram}>
            {t("home.final.ctaProgram")}
          </Button>
        </div>
      </RevealOnScroll>
    </PalierSection>
  );
};
