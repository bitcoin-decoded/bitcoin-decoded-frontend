import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { Illustration } from "../../../Interactive";
import { RevealOnScroll } from "../../Shared";
import { getLandingColors } from "../helpers";
import type { InsightStep } from "../types";

import { Eyebrow } from "./Eyebrow";
import { PalierSection } from "./PalierSection";

type Props = {
  step: InsightStep;
};

// Paliers 1 to 3: a quotidian question, the final illustration that makes the
// mechanism intuitive (framed like the chapter plates — soft ground, gold ledger
// corners, in both themes), then the one-line switch whose emphasis word is the
// aha. Symptom → mechanism → property.
export const InsightPalier: FC<Props> = ({ step }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { ink, accent } = getLandingColors(theme);

  const headingStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontWeight: 500,
    fontSize: "clamp(1.8rem, 4.4vw, 3rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.01em",
    color: ink,
    margin: 0,
    textWrap: "balance",
    maxWidth: "22ch",
  };

  const basculeStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: "clamp(1.45rem, 3.4vw, 2.3rem)",
    lineHeight: 1.22,
    fontWeight: 400,
    color: ink,
    textWrap: "balance",
    margin: "2rem 0 0",
    maxWidth: "26ch",
  };

  const emphasisStyle: CSSProperties = {
    color: accent,
    fontWeight: 500,
    fontStyle: "italic",
  };

  return (
    <PalierSection id={step.id} align="left">
      <RevealOnScroll>
        <Eyebrow label={t(step.eyebrowKey)} />
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <h2 style={headingStyle}>{t(step.headingKey)}</h2>
      </RevealOnScroll>

      <RevealOnScroll delay={160} style={{ width: "100%" }}>
        <Illustration
          src={step.image}
          alt={t(step.altKey)}
          caption={t(step.captionKey)}
          width="46rem"
          margin="1.7rem 0 0"
        />
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <p style={basculeStyle}>
          {t(step.basculeLeadKey)}
          <b style={emphasisStyle}>{t(step.basculeEmphasisKey)}</b>
          {t(step.basculeTailKey)}
        </p>
      </RevealOnScroll>
    </PalierSection>
  );
};
