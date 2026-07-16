import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  Caption,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { DUNBAR_TIERS, getDunbarPalette, getDunbarTierText } from "../data";
import { useDunbarSlider } from "../hooks";

import { DunbarStatePanel } from "./DunbarStatePanel";
import { DunbarStepSlider } from "./DunbarStepSlider";
import { DunbarVisual } from "./DunbarVisual";

/**
 * Dunbar's-number playground: slide through five group sizes and watch the
 * web of relationships (n(n-1)/2) explode. Past ~150 the dominant color turns
 * red and an overload alert appears, motivating the need for an external
 * memory system (money).
 */
export const DunbarSlider: FC = () => {
  const { t, language } = useTranslation();
  const { theme, colors } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { tierIndex, setTierIndex, tier, size, relations, isOverload } = useDunbarSlider();

  const palette = getDunbarPalette(theme === "light");
  const texts = getDunbarTierText(language);
  const color = palette[tier.key];
  const activeText = texts[tier.key];
  const localeTag = language === "fr" ? "fr-FR" : "en-US";

  // One line: caption, size, then the tier that size qualifies as — the reading
  // is "size: 150, a village". Every item sits on a shared baseline; centring
  // instead left the caption floating against the much larger numeral.
  const headerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    gap: isMobile ? "0.4rem 0.65rem" : "0.5rem 0.85rem",
    textAlign: "center",
  };

  const populationStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    // Was 1.7/2.1rem — the readout dominated a card that is already tall.
    fontSize: isMobile ? "1.3rem" : "1.55rem",
    fontWeight: 400,
    color,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.1,
    transition: "color 0.5s var(--ease-smooth)",
  };

  // Plain inline, not inline-flex: a flex box takes its baseline from its first
  // item — the icon — which would drag the whole tier off the shared baseline.
  // As inline content the baseline stays the text's, and the glyph rides it.
  const tierStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.label.fontSize,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
    color,
    transition: "color 0.5s var(--ease-smooth)",
  };

  const tierIconStyle: CSSProperties = {
    verticalAlign: "middle",
    marginRight: "0.45rem",
  };

  // Mono like its neighbours: inheriting the body serif gave the dot different
  // metrics from everything else on the line.
  const separatorStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.label.fontSize,
    color: withOpacity(colors.base.text.secondary, 0.45),
  };

  const TierIcon = tier.icon;

  const bodyStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "1.25rem" : "2rem",
    alignItems: isMobile ? "stretch" : "center",
    width: "100%",
  };

  const visualWrapStyle: CSSProperties = {
    flex: isMobile ? "0 0 auto" : "1 1 0",
    display: "flex",
    justifyContent: "center",
    minWidth: 0,
    width: "100%",
  };

  return (
    <SurfaceCard glowColor={color} size="lg" gap="1.5rem" margin="2rem 0">
      <div style={headerStyle}>
        <Caption tone="muted" size="sm">
          {t("dunbar.sizeLabel")}
        </Caption>
        <span style={populationStyle}>{size.toLocaleString(localeTag)}</span>
        <span style={separatorStyle} aria-hidden>
          ·
        </span>
        <span style={tierStyle}>
          <TierIcon size={isMobile ? 26 : 30} style={tierIconStyle} />
          {activeText.label}
        </span>
      </div>

      <div style={bodyStyle}>
        <div style={visualWrapStyle}>
          <DunbarVisual size={size} relations={relations} color={color} />
        </div>
        <DunbarStatePanel
          label={activeText.label}
          statePhrase={activeText.statePhrase}
          relations={relations}
          counterLabel={t("dunbar.counterLabel")}
          color={color}
          isOverload={isOverload}
          overloadTitle={t("dunbar.overloadTitle")}
          overloadBody={t("dunbar.overloadBody")}
          localeTag={localeTag}
        />
      </div>

      <DunbarStepSlider
        sizes={DUNBAR_TIERS.map((tierItem) => tierItem.size)}
        activeIndex={tierIndex}
        onChange={setTierIndex}
        color={color}
        ariaLabel={t("dunbar.sliderAria")}
        localeTag={localeTag}
      />
    </SurfaceCard>
  );
};
