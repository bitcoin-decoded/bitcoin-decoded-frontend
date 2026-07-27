import { type CSSProperties, type FC } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

import type { IconType } from "@icons";

type FlywheelStepProps = {
  icon: IconType;
  label: string;
  metric: string;
  accent: string;
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
  const typo = getTypography(useBreakpoint());
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  // A fixed min-height so all five tiles are the same size regardless of how
  // many lines their label wraps to; the content centres within it.
  const nodeStyle: CSSProperties = {
    width: "100%",
    minWidth: 0,
    minHeight: isMobile ? "6rem" : "6.75rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
    padding: isMobile ? "0.5rem 0.35rem" : "0.6rem 0.45rem",
    textAlign: "center",
    background: withOpacity(accent, isActive ? 0.14 : 0.05),
    border: `1px solid ${withOpacity(accent, isActive ? 0.65 : 0.2)}`,
    transform: isActive ? "scale(1.06)" : "scale(1)",
    transition: "all 0.35s var(--ease-smooth)",
  };

  // No box behind the icon: just the mark, in the accent.
  const iconWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: accent,
  };

  const labelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    lineHeight: 1.2,
    color: colors.base.text.secondary,
  };

  const metricStyle: CSSProperties = {
    ...typo.figure,
    color: isActive ? accent : world.text.primary,
    transition: "color 0.35s var(--ease-smooth)",
  };

  return (
    <div style={nodeStyle}>
      <div style={iconWrapStyle}>
        <Icon size={isMobile ? 19 : 22} strokeWidth={1.9} />
      </div>
      <span style={labelStyle}>{label}</span>
      <span key={metric} className="metric-pop" style={metricStyle}>
        {metric}
      </span>
    </div>
  );
};
