import { type CSSProperties, type FC } from "react";

import { SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { BODY_FIELDS, HEADER_FIELDS } from "../data";
import type { BlockField } from "../types";

export const BlockAnatomyVisual: FC = () => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const world = colors[moduleTheme];

  // Sizing kept in lockstep with BlockchainChainVisual's BlockCard so this
  // "anatomy" reads as the very same block (#100826), just annotated.
  const titleStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.65rem" : "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: world.text.secondary,
    textAlign: "center",
    paddingBottom: "0.35rem",
    borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
  };

  const sectionLabel: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.55rem" : "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: world.text.primary,
    padding: "0.2rem 0.45rem",
    borderRadius: "0.3rem",
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
    borderRadius: "0.45rem",
    transition: "background 0.2s ease",
  };

  const iconCircle: CSSProperties = {
    width: isMobile ? "1.5rem" : "1.65rem",
    height: isMobile ? "1.5rem" : "1.65rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(world.background.secondary, 0.12),
    border: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
    color: world.text.secondary,
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.6rem" : "0.66rem",
    fontWeight: 600,
    color: colors.base.text.primary,
    letterSpacing: "0.02em",
  };

  const valueStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.55rem" : "0.6rem",
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
        <div style={iconCircle}>
          <field.icon size={isMobile ? 10 : 12} strokeWidth={1.8} />
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
