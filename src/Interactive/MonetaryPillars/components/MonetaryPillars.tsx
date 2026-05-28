import { type CSSProperties, type FC } from "react";

import { Columns3 } from "lucide-react";

import { Caption, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getMonetaryPillars } from "../data";

import { PillarRow } from "./PillarRow";

export const MonetaryPillars: FC = () => {
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const pillars = getMonetaryPillars(language);
  const world = colors[moduleTheme];

  /**
   * Unified envelope wrapping the 5 rows. The accent left-border is the
   * "thread" that visually ties the pillars together; the internal dashed
   * dividers reinforce that they belong to one coherent block.
   */
  const envelopeStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.85rem",
    border: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
    background: `linear-gradient(180deg, ${withOpacity(
      world.text.secondary,
      0.05,
    )}, ${withOpacity(world.text.secondary, 0.01)})`,
    overflow: "hidden",
    boxShadow: `0 4px 18px ${withOpacity(world.border.secondary, 0.12)}`,
  };

  const threadStyle: CSSProperties = {
    position: "absolute",
    top: "0.85rem",
    bottom: "0.85rem",
    left: 0,
    width: "3px",
    background: `linear-gradient(180deg, ${withOpacity(world.text.secondary, 0.05)}, ${withOpacity(
      world.text.secondary,
      0.55,
    )} 50%, ${withOpacity(world.text.secondary, 0.05)})`,
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    pointerEvents: "none",
  };

  const promptStyle: CSSProperties = {
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    color: colors.base.text.secondary,
    fontStyle: "italic",
    lineHeight: 1.5,
    margin: 0,
    textAlign: "left",
  };

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2.25rem 0"} gap={isMobile ? "0.85rem" : "1rem"}>
      <Caption tone="world" size="md" icon={<Columns3 size={isMobile ? 16 : 18} strokeWidth={2} />}>
        {t("monetaryPillars.sectionTitle")}
      </Caption>

      <p style={promptStyle}>{t("monetaryPillars.prompt")}</p>

      <div style={envelopeStyle}>
        <div style={threadStyle} aria-hidden />
        {pillars.map((pillar, i) => (
          <PillarRow
            key={pillar.key}
            pillar={pillar}
            index={i}
            isLast={i === pillars.length - 1}
          />
        ))}
      </div>
    </SurfaceCard>
  );
};
