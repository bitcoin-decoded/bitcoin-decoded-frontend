import { type CSSProperties, type FC } from "react";

import { ArrowDown, ArrowRight } from "lucide-react";

import {
  BitcoinDecodedLogo,
  BRAND,
  Button,
  getBrandGold,
  Quote,
  Separator,
  THEME_COLORS,
  useBreakpoint,
  useThemeContext,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";

import { RevealOnScroll } from "./RevealOnScroll";
import { WorldCard } from "./WorldCard";

const JOURNEY_SECTION_ID = "home-journey";

export const HomePage: FC = () => {
  const { theme } = useThemeContext();
  const { setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const isMobile = breakpoint === "mobile";
  const isTablet = breakpoint === "tablet";

  // ── Vertical rhythm - single source of truth for the whole homepage ──
  // Three tiers (mobile / tablet / desktop). Picking values that keep the
  // total between sections (sectionPadY × 2 + separator margin) around
  // ~4rem mobile / ~5rem tablet / ~6rem desktop - comfortable for a
  // landing page without feeling padded for the sake of padding.
  const pick = <T,>(m: T, ta: T, d: T): T => (isMobile ? m : isTablet ? ta : d);

  const space = {
    // Section padding (top = bottom)
    sectionPadY: pick("1.75rem", "2.25rem", "2.75rem"),
    // Gap between elements inside a section (title → body → punch line, etc.)
    sectionGap: pick("0.85rem", "1rem", "1.15rem"),

    // Hero - the entry surface. Generous top padding, slightly tighter bottom.
    heroPadTop: pick("2rem", "3.25rem", "4.5rem"),
    heroPadBottom: pick("1.25rem", "2rem", "2.75rem"),

    // Hero internal - semantic groupings (brand block / content block / CTA
    // block) get distinct breathing rhythms rather than a uniform gap.
    logoToSlogan: pick("0.35rem", "0.4rem", "0.5rem"), // tight: brand identity
    sloganToHeadline: pick("1.25rem", "1.5rem", "1.85rem"), // wide: brand → message
    headlineToSub: pick("0.5rem", "0.65rem", "0.75rem"), // tight: message body
    subToCta: pick("1rem", "1.25rem", "1.5rem"), // medium: anticipation

    // Section 3 - cards row spacing
    cardsGap: pick("0.75rem", "0.9rem", "1.25rem"),
    cardsMarginTop: pick("0.5rem", "0.75rem", "1rem"),

    // Three-line stacks (hook lines, differentiation negs)
    stackedLinesGap: pick("0.25rem", "0.3rem", "0.3rem"),
    // Bullet list rows
    listGap: pick("0.55rem", "0.6rem", "0.65rem"),

    // Page-level horizontal padding (container)
    containerPadX: pick("0.75rem", "1.25rem", "1.5rem"),

    // Section 7 (Quote) tightens its top padding to feel like a continuation
    // of section 6's punch line rather than a brand-new section.
    quoteTopOverride: pick("0.5rem", "1rem", "1.5rem"),
    // Final CTA expands its bottom padding for clean page exit
    finalCtaBottomOverride: pick("2.25rem", "3.5rem", "4.5rem"),
  };

  const startJourney = () => setCurrentPage(ROUTE_NAME.Banking_1);
  const scrollToJourney = () => {
    const el = document.getElementById(JOURNEY_SECTION_ID);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Shared style tokens ──────────────────────────────────────────────────

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "56rem",
    margin: "0 auto",
    padding: `0 ${space.containerPadX}`,
  };

  // Section vertical spacing - driven by the spacing tokens above.
  // Longhand padding (not the `padding` shorthand) so sections that override
  // only paddingTop / paddingBottom below don't mix shorthand + longhand,
  // which React flags on re-render.
  const sectionStyle: CSSProperties = {
    paddingTop: space.sectionPadY,
    paddingBottom: space.sectionPadY,
    display: "flex",
    flexDirection: "column",
    gap: space.sectionGap,
    alignItems: "center",
    textAlign: "center",
  };

  const sectionTitleStyle: CSSProperties = {
    fontSize: pick("1.4rem", "1.65rem", "1.85rem"),
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
    margin: 0,
    color: colors.base.text.primary,
    maxWidth: "44rem",
  };

  const proseStyle: CSSProperties = {
    fontSize: pick("0.95rem", "1rem", "1.05rem"),
    lineHeight: 1.65,
    color: colors.base.text.primary,
    margin: 0,
    maxWidth: "40rem",
  };

  const proseMutedStyle: CSSProperties = {
    ...proseStyle,
    color: colors.base.text.secondary,
  };

  // Single short accent line used at the end of a section to land the message.
  const punchLineStyle: CSSProperties = {
    fontSize: pick("1.05rem", "1.1rem", "1.2rem"),
    fontWeight: 600,
    // Orange is reserved for the Bitcoin module + on-chain validations; the
    // homepage accent is the structural gold.
    color: gold,
    margin: 0,
    letterSpacing: "-0.005em",
  };

  // ── Hero ─────────────────────────────────────────────────────────────────
  // We drop the uniform flex `gap` and instead drive every transition via
  // the spacing tokens above (`logoToSlogan`, `sloganToHeadline`,
  // `headlineToSub`, `subToCta`). Three semantic blocks emerge:
  //   • Brand (logo + slogan)   - tight inside, wide gap to next
  //   • Message (h1 + sub)      - tight inside, medium gap to next
  //   • Action (primary + sub)  - tight inside
  const heroStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: `${space.heroPadTop} 0 ${space.heroPadBottom}`,
    gap: 0,
  };

  const heroBadgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    color: colors.base.text.primary,
  };

  // English-only tagline rendered just under the logo. Serif italic pairs
  // with "Decoded" in the lockup; the "." separator borrows the kit's gold
  // accent for a discrete brand callback.
  const sloganStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontStyle: "italic",
    fontSize: pick("1rem", "1.1rem", "1.2rem"),
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: colors.base.text.primary,
    opacity: 0.9,
    margin: 0,
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
    fontSize: pick("1.85rem", "2.35rem", "2.85rem"),
    fontFamily: BRAND.fonts.mono,
    // Cutive Mono is single-weight — 500 (not 700) avoids a synthetic faux-bold;
    // the hero size carries the presence.
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    margin: 0,
    color: colors.base.text.primary,
    maxWidth: "44rem",
  };

  const subheadlineStyle: CSSProperties = {
    fontSize: pick("1rem", "1.075rem", "1.15rem"),
    color: colors.base.text.secondary,
    lineHeight: 1.55,
    margin: 0,
    maxWidth: "36rem",
  };

  const ctaGroupStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.6rem",
  };

  // ── Section 4: Audience list ─────────────────────────────────────────────
  const audienceListStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: space.listGap,
    maxWidth: "36rem",
    textAlign: "left",
    fontSize: pick("0.92rem", "0.96rem", "1rem"),
    lineHeight: 1.6,
    color: colors.base.text.primary,
  };

  const audienceItemStyle: CSSProperties = {
    position: "relative",
    paddingLeft: "1.6rem",
  };

  const bulletStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    color: gold,
    fontFamily: BRAND.fonts.mono,
    fontWeight: 500,
  };

  // ── Section 3: Cards row ─────────────────────────────────────────────────
  const cardsWrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: space.cardsGap,
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {/* ─────── HERO ─────── */}
      <section style={heroStyle}>
        <RevealOnScroll delay={0} duration={600} style={{ marginBottom: space.logoToSlogan }}>
          <div style={heroBadgeStyle}>
            <BitcoinDecodedLogo width={pick(220, 270, 320)} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={120} duration={700} style={{ marginBottom: space.sloganToHeadline }}>
          <p style={sloganStyle}>
            Fix money<span style={sloganDotStyle}>.</span>Decode Bitcoin
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={240} duration={700} style={{ marginBottom: space.headlineToSub }}>
          <h1 style={headlineStyle}>{t("home.hero.headline")}</h1>
        </RevealOnScroll>

        <RevealOnScroll delay={360} duration={700} style={{ marginBottom: space.subToCta }}>
          <p style={subheadlineStyle}>{t("home.hero.subheadline")}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={480} duration={700}>
          <div style={ctaGroupStyle}>
            <Button
              variant="primary"
              icon={<ArrowRight size={isMobile ? 16 : 18} strokeWidth={2} />}
              iconPosition="right"
              onClick={startJourney}
            >
              {t("home.hero.ctaPrimary")}
            </Button>
            <Button
              variant="ghost"
              icon={<ArrowDown size={isMobile ? 14 : 15} strokeWidth={2} />}
              iconPosition="right"
              onClick={scrollToJourney}
            >
              {t("home.hero.ctaSecondary")}
            </Button>
          </div>
        </RevealOnScroll>
      </section>

      <RevealOnScroll>
        <Separator margin="0" />
      </RevealOnScroll>

      {/* ─────── SECTION 1 - HOOK ─────── */}
      <RevealOnScroll>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>{t("home.hook.title")}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: space.stackedLinesGap,
              fontSize: pick("1rem", "1.075rem", "1.15rem"),
              color: colors.base.text.primary,
              lineHeight: 1.5,
            }}
          >
            <span>{t("home.hook.line1")}</span>
            <span>{t("home.hook.line2")}</span>
          </div>
          <p style={proseMutedStyle}>
            {t("home.hook.bridgeP1")}
            <br />
            {t("home.hook.bridgeP2")}
          </p>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Separator margin="0" />
      </RevealOnScroll>

      {/* ─────── SECTION 2 - POSITIONING ─────── */}
      <RevealOnScroll>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>{t("home.positioning.title")}</h2>
          <p style={proseMutedStyle}>
            {t("home.positioning.comparisonP1")}
            <br />
            {t("home.positioning.comparisonP2")}
          </p>
          <p style={punchLineStyle}>{t("home.positioning.flip")}</p>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Separator margin="0" />
      </RevealOnScroll>

      {/* ─────── SECTION 3 - JOURNEY (cards) ─────── */}
      <section id={JOURNEY_SECTION_ID} style={sectionStyle}>
        <RevealOnScroll>
          <h2 style={sectionTitleStyle}>{t("home.journey.title")}</h2>
        </RevealOnScroll>
        <div style={{ ...cardsWrapperStyle, marginTop: space.cardsMarginTop }}>
          <RevealOnScroll
            delay={0}
            style={{
              flex: isMobile ? "1 1 100%" : "1 1 0",
              minWidth: isMobile ? "100%" : "14rem",
              display: "flex",
            }}
          >
            <WorldCard
              icon="🏦"
              subtitle={t("home.journey.step1.label")}
              title={t("home.journey.step1.title")}
              description={t("home.journey.step1.desc")}
              cta={t("home.journey.cardCta")}
              module="blue"
              onClick={() => setCurrentPage(ROUTE_NAME.Banking_1)}
            />
          </RevealOnScroll>
          <RevealOnScroll
            delay={140}
            style={{
              flex: isMobile ? "1 1 100%" : "1 1 0",
              minWidth: isMobile ? "100%" : "14rem",
              display: "flex",
            }}
          >
            <WorldCard
              icon="⚖️"
              subtitle={t("home.journey.step2.label")}
              title={t("home.journey.step2.title")}
              description={t("home.journey.step2.desc")}
              cta={t("home.journey.cardCta")}
              module="violet"
              onClick={() => setCurrentPage(ROUTE_NAME.MoneyLaws_1)}
            />
          </RevealOnScroll>
          <RevealOnScroll
            delay={280}
            style={{
              flex: isMobile ? "1 1 100%" : "1 1 0",
              minWidth: isMobile ? "100%" : "14rem",
              display: "flex",
            }}
          >
            <WorldCard
              icon="₿"
              subtitle={t("home.journey.step3.label")}
              title={t("home.journey.step3.title")}
              description={t("home.journey.step3.desc")}
              cta={t("home.journey.cardCta")}
              module="amber"
              onClick={() => setCurrentPage(ROUTE_NAME.Bitcoin_1)}
            />
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll>
        <Separator margin="0" />
      </RevealOnScroll>

      {/* ─────── SECTION 4 - AUDIENCE ─────── */}
      <RevealOnScroll>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>{t("home.audience.title")}</h2>
          <ul style={audienceListStyle}>
            {[
              t("home.audience.item1"),
              t("home.audience.item2"),
              t("home.audience.item3"),
            ].map((item, i) => (
              <li key={i} style={audienceItemStyle}>
                <span style={bulletStyle}>-</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={punchLineStyle}>{t("home.audience.payoff")}</p>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Separator margin="0" />
      </RevealOnScroll>

      {/* ─────── SECTION 6 - DIFFERENTIATION ─────── */}
      <RevealOnScroll>
        <section style={sectionStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: space.stackedLinesGap,
              fontSize: pick("0.95rem", "1rem", "1.05rem"),
              color: colors.base.text.secondary,
              lineHeight: 1.55,
            }}
          >
            <span>{t("home.differentiation.neg1")}</span>
            <span>{t("home.differentiation.neg2")}</span>
            <span>{t("home.differentiation.neg3")}</span>
          </div>
          <p style={proseMutedStyle}>{t("home.differentiation.posIntro")}</p>
          <p style={punchLineStyle}>{t("home.differentiation.pos")}</p>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <Separator margin="0" />
      </RevealOnScroll>

      {/* ─────── SECTION 7 - PHILOSOPHY ─────── */}
      <RevealOnScroll>
        <section style={{ ...sectionStyle, paddingTop: space.quoteTopOverride }}>
          <Quote author="Satoshi Nakamoto" source="BitcoinTalk, 2010">
            {t("home.philosophy.quote")}
          </Quote>
        </section>
      </RevealOnScroll>

      {/* ─────── SECTION 8 - FINAL CTA ─────── */}
      <RevealOnScroll>
        <section style={{ ...sectionStyle, paddingBottom: space.finalCtaBottomOverride }}>
          <h2 style={sectionTitleStyle}>
            {t("home.finalCta.titleP1")}
            <br />
            <p style={proseMutedStyle}>{t("home.finalCta.titleP2")}</p>
          </h2>
          <Button variant="stamped" onClick={startJourney}>
            {t("home.finalCta.button")}
          </Button>
        </section>
      </RevealOnScroll>
    </div>
  );
};
