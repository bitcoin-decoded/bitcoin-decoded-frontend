import { type CSSProperties, type FC } from "react";

import {
  BitcoinDecodedLogo,
  BRAND,
  Button,
  getBrandGold,
  HighlightText,
  THEME_COLORS,
  useBreakpoint,
  useThemeContext,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { RevealOnScroll } from "../../Shared";

import { DoodleArrowDown, DoodleSmileyCheeky } from "@doodle";

type Props = {
  onStart: () => void;
  onSeeProgram: () => void;
};

export const HomeHero: FC<Props> = ({ onStart, onSeeProgram }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";
  const pick = <T,>(m: T, ta: T, d: T): T => (isMobile ? m : isTablet ? ta : d);

  const heroStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: `${pick("2rem", "3.25rem", "4.5rem")} 0 0`,
  };

  const sloganStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontStyle: "italic",
    fontSize: pick("1rem", "1.1rem", "1.2rem"),
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: colors.base.text.primary,
    opacity: 0.9,
    margin: `${pick("0.4rem", "0.45rem", "0.5rem")} 0 ${pick("1.5rem", "1.85rem", "2.25rem")}`,
    textTransform: "lowercase",
  };

  const sloganDotStyle: CSSProperties = {
    color: gold,
    fontStyle: "normal",
    fontWeight: 700,
    margin: "0 0.45em",
    fontSize: "1.1em",
  };

  const headlineStyle: CSSProperties = {
    fontSize: pick("1.7rem", "2.15rem", "2.6rem"),
    fontFamily: BRAND.fonts.mono,
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1.18,
    margin: 0,
    color: colors.base.text.primary,
    maxWidth: "44rem",
  };

  const subheadlineStyle: CSSProperties = {
    fontSize: pick("1rem", "1.075rem", "1.15rem"),
    color: gold,
    lineHeight: 1.5,
    margin: `${pick("0.85rem", "1rem", "1.15rem")} 0 0`,
    maxWidth: "34rem",
  };

  const smileyStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    marginLeft: "0.4em",
  };

  const pitchStyle: CSSProperties = {
    fontSize: pick("0.95rem", "1rem", "1.05rem"),
    color: colors.base.text.primary,
    lineHeight: 1.6,
    margin: `${pick("0.65rem", "0.8rem", "0.9rem")} 0 0`,
    maxWidth: "36rem",
  };

  const ctaGroupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.6rem",
    marginTop: pick("1.5rem", "1.75rem", "2rem"),
  };

  return (
    <section style={heroStyle}>
      <RevealOnScroll delay={0} duration={600}>
        <BitcoinDecodedLogo width={pick(210, 260, 300)} />
      </RevealOnScroll>

      <RevealOnScroll delay={120} duration={700}>
        <p style={sloganStyle}>
          Fix money<span style={sloganDotStyle}>.</span>Decode Bitcoin
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={240} duration={700}>
        <h1 style={headlineStyle}>
          {t("home.hero.headlineLead")}
          <HighlightText>{t("home.hero.headlineHighlight")}</HighlightText>
          {t("home.hero.headlineTail")}
        </h1>
      </RevealOnScroll>

      <RevealOnScroll delay={360} duration={700}>
        <p style={subheadlineStyle}>
          {t("home.hero.subheadline")}
          <DoodleSmileyCheeky size={22} style={smileyStyle} aria-hidden />
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={460} duration={700}>
        <p style={pitchStyle}>{t("home.hero.pitch")}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={560} duration={700}>
        <div style={ctaGroupStyle}>
          <Button variant="primary" onClick={onStart}>
            {t("home.hero.ctaPrimary")}
          </Button>
          <Button
            variant="secondary"
            icon={<DoodleArrowDown size={isMobile ? 20 : 22} />}
            iconPosition="right"
            onClick={onSeeProgram}
          >
            {t("home.hero.ctaSecondary")}
          </Button>
        </div>
      </RevealOnScroll>
    </section>
  );
};
