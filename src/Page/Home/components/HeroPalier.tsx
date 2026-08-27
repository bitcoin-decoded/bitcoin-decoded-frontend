import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { RevealOnScroll } from "../../Shared";
import { getLandingColors } from "../helpers";

import { TrustSignature } from "./TrustSignature";

type Props = {
  onLook: () => void;
};

// Palier 0. One faille-phrase understood in two seconds, a lede that promises the
// apéritif, an invitation to descend, and the sobriety signature pinned at the
// foot of the viewport (visible on every breakpoint). No course length, no
// structure here.
export const HeroPalier: FC<Props> = ({ onLook }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { ink, ink2, gold, lineStrong } = getLandingColors(theme);

  const sectionStyle: CSSProperties = {
    position: "relative",
    // The sticky header takes 3.5rem of flow at the very top, so a full 100svh
    // hero would push its foot-anchored trust signature below the fold. Subtract
    // the header height so the whole hero, signature included, fits the first view.
    minHeight: "calc(100svh - 3.5rem)",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "clamp(3rem, 8vh, 5rem) clamp(1.25rem, 6vw, 3rem) clamp(1.5rem, 4vh, 2.2rem)",
    scrollSnapAlign: "start",
  };

  const contentStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const wrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: "56rem",
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

  const cueStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.8rem",
    marginTop: "2.4rem",
    padding: 0,
    border: "none",
    background: "none",
    cursor: "pointer",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: ink2,
  };

  const cueRingStyle: CSSProperties = {
    display: "grid",
    placeItems: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    border: `1px solid ${lineStrong}`,
    color: gold,
    flexShrink: 0,
  };

  const trustWrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: "56rem",
    margin: "0 auto",
  };

  return (
    <section id="top" style={sectionStyle}>
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

          <RevealOnScroll delay={380} duration={700}>
            <button type="button" style={cueStyle} onClick={onLook}>
              <span style={cueRingStyle}>
                <svg
                  className="landing-cue-bob"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </span>
              {t("home.hero.cue")}
            </button>
          </RevealOnScroll>
        </div>
      </div>

      <RevealOnScroll delay={220} duration={700} style={trustWrapStyle}>
        <TrustSignature />
      </RevealOnScroll>
    </section>
  );
};
