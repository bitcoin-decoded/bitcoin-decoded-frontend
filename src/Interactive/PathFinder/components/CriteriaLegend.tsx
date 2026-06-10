import { type CSSProperties, type FC } from "react";

import { BookOpenText } from "lucide-react";

import { Caption, usePageTheme, withOpacity } from "../../../Design";
import type { PathFinderCopy } from "../data";
import { getCriteriaDescriptors } from "../helpers";

type Props = {
  copy: PathFinderCopy;
  accent: string;
};

export const CriteriaLegend: FC<Props> = ({ copy, accent }) => {
  const { colors } = usePageTheme();
  const red = colors.semantic.error.text;
  const descriptors = getCriteriaDescriptors(copy.criteria);

  const panelStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
    padding: "0.9rem 1rem",
    borderRadius: "0.85rem",
    border: `1px solid ${withOpacity(accent, 0.2)}`,
    background: withOpacity(accent, 0.04),
  };

  const itemsStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))",
    gap: "0.55rem 1rem",
  };

  const itemStyle: CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.5rem" };

  const chipStyle: CSSProperties = {
    width: "1.7rem",
    height: "1.7rem",
    borderRadius: "0.45rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: colors.base.text.primary,
    background: withOpacity(colors.base.text.secondary, 0.08),
    border: `1px solid ${withOpacity(colors.base.text.secondary, 0.22)}`,
  };

  const labelStyle: CSSProperties = {
    fontSize: "0.78rem",
    color: colors.base.text.primary,
  };

  const conventionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
    fontSize: "0.72rem",
    color: colors.base.text.secondary,
    paddingTop: "0.5rem",
    borderTop: `1px dashed ${withOpacity(accent, 0.18)}`,
  };

  const swatchStyle = (color: string): CSSProperties => ({
    display: "inline-block",
    width: "0.85rem",
    height: "0.85rem",
    borderRadius: "0.25rem",
    background: withOpacity(color, 0.5),
    border: `1px solid ${color}`,
  });

  return (
    <div style={panelStyle}>
      <Caption size="sm" color={accent} icon={<BookOpenText size={15} strokeWidth={2} />}>
        {copy.legend.title}
      </Caption>

      <div style={itemsStyle}>
        {descriptors.map(({ key, Icon, label }) => (
          <span key={key} style={itemStyle}>
            <span style={chipStyle}>
              <Icon size={13} strokeWidth={2} />
            </span>
            <span style={labelStyle}>{label}</span>
          </span>
        ))}
      </div>

      <div style={conventionStyle}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={swatchStyle(colors.base.text.secondary)} />
          {copy.legend.conventionYes}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ color: red, fontWeight: 700, fontSize: "0.9rem", lineHeight: 1 }}>×</span>
          {copy.legend.conventionNo}
        </span>
      </div>
    </div>
  );
};
