import { type FC, type CSSProperties } from "react";

import { SurfaceCard, useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useLanguageContext } from "../../I18n";
import type { BlockField } from "../types";
import { HEADER_FIELDS, BODY_FIELDS } from "../data";

export const BlockAnatomyVisual: FC = () => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const world = colors[moduleTheme];

  const titleStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.7rem" : "0.8rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: world.text.secondary,
    textAlign: "center",
    paddingBottom: "0.5rem",
    borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
  };

  const sectionLabel: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.58rem" : "0.65rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: world.text.primary,
    padding: "0.35rem 0.6rem",
    borderRadius: "0.35rem",
    background: withOpacity(world.background.secondary, 0.1),
    border: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
    alignSelf: "flex-start",
    marginTop: "0.25rem",
  };

  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.6rem" : "0.75rem",
    padding: isMobile ? "0.6rem 0.5rem" : "0.65rem 0.75rem",
    borderRadius: "0.5rem",
    transition: "background 0.2s ease",
  };

  const iconCircle: CSSProperties = {
    width: isMobile ? "2rem" : "2.25rem",
    height: isMobile ? "2rem" : "2.25rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(world.background.secondary, 0.1),
    border: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
    color: world.text.secondary,
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.65rem" : "0.72rem",
    fontWeight: 600,
    color: colors.base.text.primary,
    letterSpacing: "0.02em",
  };

  const valueStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.6rem" : "0.65rem",
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
      gap="0.5rem"
      margin={isMobile ? "1.5rem 0" : "2.5rem 0"}
      style={{ padding: isMobile ? "1rem" : "1.25rem" }}
    >
      <div style={titleStyle}>
        {fr ? "Exemple : Bloc #828 614" : "Example: Block #828,614"}
      </div>

      <span style={sectionLabel}>{fr ? "En-tête" : "Header"}</span>
      {renderFields(HEADER_FIELDS)}

      <div style={{ borderTop: `1px dashed ${withOpacity(world.border.secondary, 0.3)}`, margin: "0.25rem 0" }} />

      <span style={sectionLabel}>{fr ? "Corps" : "Body"}</span>
      {renderFields(BODY_FIELDS)}
    </SurfaceCard>
  );
};
