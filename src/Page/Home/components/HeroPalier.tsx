import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { RevealOnScroll } from "../../Shared";
import { getLandingColors } from "../helpers";
import type { CurriculumResume } from "../types";

import { HomeResume } from "./HomeResume";
import { ScrollCue } from "./ScrollCue";
import { TrustSignature } from "./TrustSignature";

const MAX_WIDTH = "64rem";

type Props = {
  onLook: () => void;
  resume: CurriculumResume | null;
  onOpenResume: (route: RouteName) => void;
  onBadges: () => void;
};

// Palier 0. For a returning visitor the progress panel comes first (the one thing
// they came back for); then one faille-phrase, a lede that promises the apéritif,
// the invitation to descend, and the sobriety signature pinned at the foot. No
// course length, no structure here.
export const HeroPalier: FC<Props> = ({ onLook, resume, onOpenResume, onBadges }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { ink, ink2, gold } = getLandingColors(theme);

  const sectionStyle: CSSProperties = {
    position: "relative",
    // The sticky header takes 3.5rem of flow at the very top, so a full 100svh
    // hero would push its foot-anchored trust signature below the fold. Subtract
    // the header height so the whole hero, signature included, fits the first view.
    minHeight: "calc(100svh - 3.5rem)",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "clamp(2rem, 5vh, 3rem) clamp(1.25rem, 5vw, 3rem) clamp(1.5rem, 4vh, 2.2rem)",
    scrollSnapAlign: "start",
  };

  const bandStyle: CSSProperties = {
    width: "100%",
    maxWidth: MAX_WIDTH,
    margin: "0 auto",
    display: "flex",
    justifyContent: "flex-start",
  };

  const contentStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const wrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: MAX_WIDTH,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const kickerStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "clamp(0.85rem, 1.9vw, 1.02rem)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: gold,
    margin: "0 0 1.7rem",
  };

  const headlineStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontWeight: 500,
    fontSize: "clamp(2.3rem, 7vw, 4.4rem)",
    lineHeight: 1.06,
    letterSpacing: "-0.01em",
    color: ink,
    margin: 0,
    textWrap: "balance",
    maxWidth: "18ch",
  };

  const ledeStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: "clamp(1.05rem, 2.4vw, 1.25rem)",
    lineHeight: 1.5,
    color: ink2,
    margin: "1.4rem 0 0",
    maxWidth: "42ch",
  };

  const cueWrapStyle: CSSProperties = { marginTop: "2.4rem" };

  const trustWrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: MAX_WIDTH,
    margin: "0 auto",
  };

  return (
    <section id="top" style={sectionStyle}>
      {resume && (
        <RevealOnScroll duration={700} style={bandStyle}>
          <HomeResume resume={resume} onOpen={onOpenResume} onBadges={onBadges} />
        </RevealOnScroll>
      )}

      <div style={contentStyle}>
        <div style={wrapStyle}>
          <RevealOnScroll delay={60} duration={700}>
            <p style={kickerStyle}>{t("home.hero.kicker")}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={160} duration={700}>
            <h1 style={headlineStyle}>{t("home.hero.headline")}</h1>
          </RevealOnScroll>

          <RevealOnScroll delay={260} duration={700}>
            <p style={ledeStyle}>{t("home.hero.lede")}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={380} duration={700} style={cueWrapStyle}>
            <ScrollCue label={t("home.hero.cue")} onClick={onLook} />
          </RevealOnScroll>
        </div>
      </div>

      <RevealOnScroll delay={220} duration={700} style={trustWrapStyle}>
        <TrustSignature />
      </RevealOnScroll>
    </section>
  );
};
