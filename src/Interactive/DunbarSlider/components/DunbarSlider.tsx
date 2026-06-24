import { type CSSProperties, type FC } from "react";

import { BRAND, Caption, SurfaceCard, useBreakpoint, usePageTheme } from "../../../Design";
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
  const isMobile = useBreakpoint() === "mobile";
  const { tierIndex, setTierIndex, tier, size, relations, isOverload } = useDunbarSlider();

  const palette = getDunbarPalette(theme === "light");
  const texts = getDunbarTierText(language);
  const color = palette[tier.key];
  const activeText = texts[tier.key];
  const localeTag = language === "fr" ? "fr-FR" : "en-US";

  const headerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.15rem",
    textAlign: "center",
  };

  const populationStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.7rem" : "2.1rem",
    fontWeight: 500,
    color,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.1,
    transition: "color 0.5s var(--ease-smooth)",
  };

  const peopleStyle: CSSProperties = {
    fontSize: isMobile ? "0.8rem" : "0.9rem",
    fontWeight: 500,
    color: colors.base.text.secondary,
  };

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
        <Caption tone="muted" size="xs">
          {t("dunbar.sliderAria")}
        </Caption>
        <div style={populationStyle}>
          {size.toLocaleString(localeTag)}{" "}
          <span style={peopleStyle}>{t("dunbar.peopleLabel")}</span>
        </div>
      </div>

      <div style={bodyStyle}>
        <div style={visualWrapStyle}>
          <DunbarVisual size={size} relations={relations} color={color} />
        </div>
        <DunbarStatePanel
          icon={tier.icon}
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
