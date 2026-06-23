import { type CSSProperties, type FC } from "react";

import { Clock } from "lucide-react";

import { BRAND, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useReadingTime } from "../hooks";

export const ReadingTimeBadge: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const estimate = useReadingTime();

  if (!estimate) return null;

  const accent = colors[moduleTheme].border.secondary;

  const badge: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.3rem 0.65rem" : "0.35rem 0.75rem",
    borderRadius: "2rem",
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.12)}`,
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.68rem" : "0.72rem",
    color: colors[moduleTheme].text.primary,
    letterSpacing: "0.02em",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={badge}>
        <Clock size={isMobile ? 12 : 13} strokeWidth={2} style={{ opacity: 0.7 }} />
        <span style={{ fontWeight: 600 }}>{estimate.minutes} min</span>
      </div>
    </div>
  );
};
