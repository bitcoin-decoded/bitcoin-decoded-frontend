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
import { FrText, useTranslation } from "../../../I18n";
import { DUNBAR_TIERS, getDunbarPalette, getDunbarTierText } from "../data";
import { useDunbarSlider } from "../hooks";

import { DunbarStatePanel } from "./DunbarStatePanel";
import { DunbarStepSlider } from "./DunbarStepSlider";
import { DunbarVisual } from "./DunbarVisual";

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
    fontSize: isMobile ? "1.3rem" : "1.55rem",
    fontWeight: 400,
    color,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.1,
    transition: "color 0.5s var(--ease-smooth)",
  };

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
    <FrText>
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
    </FrText>
  );
};
