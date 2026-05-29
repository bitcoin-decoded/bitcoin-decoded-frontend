import { type CSSProperties, type FC } from "react";

import type { LucideIcon } from "lucide-react";

import { usePageTheme, withOpacity } from "../../../Design";

type FlywheelStepProps = {
  icon: LucideIcon;
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
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const nodeStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    width: "100%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    padding: isMobile ? "0.45rem 0.35rem" : "0.55rem 0.45rem",
    borderRadius: "0.7rem",
    textAlign: "center",
    background: `linear-gradient(180deg, ${withOpacity(accent, isActive ? 0.18 : 0.06)}, ${withOpacity(accent, isActive ? 0.08 : 0.02)})`,
    backdropFilter: "blur(2px)",
    border: `1px solid ${withOpacity(accent, isActive ? 0.65 : 0.2)}`,
    boxShadow: isActive ? `0 0 22px ${withOpacity(accent, 0.45)}` : `0 2px 8px ${withOpacity("#000000", 0.25)}`,
    transform: isActive ? "scale(1.06)" : "scale(1)",
    transition: "all 0.35s var(--ease-smooth)",
  };

  const iconWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "1.6rem" : "1.85rem",
    height: isMobile ? "1.6rem" : "1.85rem",
    borderRadius: "50%",
    flexShrink: 0,
    background: withOpacity(accent, isActive ? 0.25 : 0.12),
    color: accent,
    transition: "background 0.35s var(--ease-smooth)",
  };

  const labelStyle: CSSProperties = {
    fontSize: isMobile ? "0.5rem" : "0.55rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    lineHeight: 1.2,
    color: colors.base.text.secondary,
  };

  const metricStyle: CSSProperties = {
    fontSize: isMobile ? "0.68rem" : "0.74rem",
    fontWeight: 700,
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
