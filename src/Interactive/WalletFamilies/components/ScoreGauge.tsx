import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

import type { IconType } from "@icons";

type Props = {
  label: string;
  icon: IconType;
  score: number;
  accent: string;
  max?: number;
};

export const ScoreGauge: FC<Props> = ({ label, icon: Icon, score, accent, max = 5 }) => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const empty = withOpacity(colors.base.text.secondary, 0.16);

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
  };

  const labelStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: colors.base.text.secondary,
    whiteSpace: "nowrap",
  };

  const pipsStyle: CSSProperties = { display: "flex", gap: "0.25rem", flexShrink: 0 };

  const pipStyle = (filled: boolean): CSSProperties => ({
    width: isMobile ? "0.8rem" : "0.95rem",
    height: "0.4rem",
    borderRadius: 0,
    background: filled ? accent : empty,
    transition: "background 0.3s var(--ease-smooth)",
  });

  return (
    <div style={rowStyle}>
      <span style={labelStyle}>
        <Icon size={12} strokeWidth={2} style={{ color: accent, flexShrink: 0 }} />
        {label}
      </span>
      <div style={pipsStyle}>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} style={pipStyle(i < score)} />
        ))}
      </div>
    </div>
  );
};
