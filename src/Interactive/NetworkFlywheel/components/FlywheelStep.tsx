import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, usePageTheme, withOpacity } from "../../../Design";

import type { IconType } from "@icons";

type FlywheelStepProps = {
  icon: IconType;
  label: string;
  metric: string;
  /** Category accent (see `getStepTones`). */
  accent: string;
  /** True while the propagation wave is on this step. */
  isActive: boolean;
  isMobile: boolean;
};

export const FlywheelStep: FC<FlywheelStepProps> = ({
  icon: Icon,
  label,
  metric,
  accent,
  isActive,
  isMobile,
}) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  // Flat ledger node — active state is signalled by a stronger flat tint +
  // border + a subtle scale, not a gradient fill, glow or backdrop blur.
  const nodeStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    width: "100%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    padding: isMobile ? "0.45rem 0.35rem" : "0.55rem 0.45rem",
    borderRadius: 0,
    textAlign: "center",
    background: withOpacity(accent, isActive ? 0.14 : 0.05),
    border: `1px solid ${withOpacity(accent, isActive ? 0.65 : 0.2)}`,
    transform: isActive ? "scale(1.06)" : "scale(1)",
    transition: "all 0.35s var(--ease-smooth)",
  };

  // Structural icon badge — a square (radius 0), per the block-vs-coin rule.
  const iconWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "1.6rem" : "1.85rem",
    height: isMobile ? "1.6rem" : "1.85rem",
    borderRadius: 0,
    flexShrink: 0,
    background: withOpacity(accent, isActive ? 0.25 : 0.12),
    color: accent,
    transition: "background 0.35s var(--ease-smooth)",
  };

  const labelStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    letterSpacing: "0.02em",
    fontVariant: "small-caps",
    lineHeight: 1.2,
    color: colors.base.text.secondary,
  };

  const metricStyle: CSSProperties = {
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: isActive ? accent : world.text.primary,
    transition: "color 0.35s var(--ease-smooth)",
  };

  return (
    <div style={nodeStyle}>
      <div style={iconWrapStyle}>
        <Icon size={isMobile ? 16 : 17} strokeWidth={2} />
      </div>
      <span style={labelStyle}>{label}</span>
      {/* keyed on the value so it re-pops only when this step's metric changes */}
      <span key={metric} className="metric-pop" style={metricStyle}>
        {metric}
      </span>
    </div>
  );
};
