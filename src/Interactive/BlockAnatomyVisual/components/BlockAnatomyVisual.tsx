import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { BODY_FIELDS, HEADER_FIELDS } from "../data";
import type { BlockField } from "../types";

export const BlockAnatomyVisual: FC = () => {
  const typo = getTypography();
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const world = colors[moduleTheme];

  // Sizing kept in lockstep with BlockchainChainVisual's BlockCard so this
  // "anatomy" reads as the very same block (#100826), just annotated.
  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: world.text.secondary,
    textAlign: "center",
    paddingBottom: "0.35rem",
    borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
  };

  const sectionLabel: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: world.text.primary,
    padding: "0.2rem 0.45rem",
    borderRadius: 0,
    background: withOpacity(world.background.secondary, 0.1),
    border: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
    alignSelf: "flex-start",
    marginTop: "0.1rem",
  };

  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.5rem" : "0.6rem",
    padding: isMobile ? "0.35rem 0.45rem" : "0.4rem 0.55rem",
    borderRadius: 0,
    transition: "background 0.2s ease",
  };

  // Structural icon badge — a square (radius 0), per the block-vs-coin rule:
  // squares mark structure, circles are reserved for value being manipulated.
  const iconBadge: CSSProperties = {
    width: isMobile ? "1.5rem" : "1.65rem",
    height: isMobile ? "1.5rem" : "1.65rem",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(world.background.secondary, 0.12),
    border: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
    color: world.text.secondary,
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: colors.base.text.primary,
    letterSpacing: "0.02em",
  };

  const valueStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    color: colors.base.text.secondary,
    wordBreak: "break-all",
  };

  const renderFields = (fields: BlockField[]) =>
    fields.map((field, i) => (
      <div
        key={i}
        style={{
          ...row,
          background: i % 2 === 0 ? withOpacity(world.background.secondary, 0.04) : "transparent",
        }}
      >
        <div style={iconBadge}>
          <field.icon size={isMobile ? 12 : 14} strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", minWidth: 0 }}>
          <span style={labelStyle}>{fr ? field.labelFr : field.labelEn}</span>
          <span style={valueStyle}>{fr ? field.valueFr : field.valueEn}</span>
        </div>
      </div>
    ));

  return (
    <SurfaceCard
      gap="0.25rem"
      margin={isMobile ? "1.5rem auto" : "2.5rem auto"}
      style={{
        padding: isMobile ? "0.8rem" : "0.95rem",
        width: "100%",
        maxWidth: "26rem",
      }}
    >
      <div style={titleStyle}>
        {fr ? "Exemple fictif : Bloc #100826" : "Fictional example: Block #100826"}
      </div>

      <span style={sectionLabel}>{fr ? "En-tête" : "Header"}</span>
      {renderFields(HEADER_FIELDS)}

      <div
        style={{
          borderTop: `1px dashed ${withOpacity(world.border.secondary, 0.3)}`,
          margin: "0.3rem 0 0.15rem",
        }}
      />

      <span style={sectionLabel}>{fr ? "Corps" : "Body"}</span>
      {renderFields(BODY_FIELDS)}
    </SurfaceCard>
  );
};
