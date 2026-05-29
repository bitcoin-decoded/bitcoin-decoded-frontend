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
    flex: "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.7rem 0.5rem" : "0.85rem 0.5rem",
    borderRadius: "0.85rem",
    textAlign: "center",
    background: withOpacity(accent, isActive ? 0.16 : 0.05),
    border: `1px solid ${withOpacity(accent, isActive ? 0.6 : 0.18)}`,
    boxShadow: isActive ? `0 0 22px ${withOpacity(accent, 0.4)}` : "none",
    transform: isActive ? "translateY(-3px) scale(1.03)" : "none",
    transition: "all 0.35s var(--ease-smooth)",
  };

  const iconWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "1.9rem" : "2.1rem",
    height: isMobile ? "1.9rem" : "2.1rem",
    borderRadius: "50%",
    flexShrink: 0,
    background: withOpacity(accent, isActive ? 0.22 : 0.1),
    color: accent,
    transition: "background 0.35s var(--ease-smooth)",
  };

  const labelStyle: CSSProperties = {
    fontSize: isMobile ? "0.64rem" : "0.62rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    lineHeight: 1.3,
    color: colors.base.text.secondary,
  };

  const metricStyle: CSSProperties = {
    fontSize: isMobile ? "0.82rem" : "0.78rem",
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
