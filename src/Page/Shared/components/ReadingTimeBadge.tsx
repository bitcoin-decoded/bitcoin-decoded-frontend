import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import { useReadingTime } from "../hooks";

import { DoodleClock } from "@doodle";

export const ReadingTimeBadge: FC = () => {
  const { colors } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const estimate = useReadingTime();

  if (!estimate) return null;

  const labelStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.label.fontSize,
    letterSpacing: "0.08em",
    color: colors.base.text.primary,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={labelStyle}>
        <DoodleClock size={isMobile ? 21 : 24} />
        {estimate.minutes} min
      </span>
    </div>
  );
};
