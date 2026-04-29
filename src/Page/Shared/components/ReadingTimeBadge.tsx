import { type FC, type CSSProperties } from "react";
import { usePageTheme, useBreakpoint } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useReadingTime, useReadingTimeFlavor } from "../hooks";
import { Clock } from "lucide-react";

export const ReadingTimeBadge: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const estimate = useReadingTime();
  const flavor = useReadingTimeFlavor(estimate?.minutes ?? null);

  if (!estimate) return null;

  const accent = colors[moduleTheme].border.secondary;

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.35rem",
    maxWidth: "32rem",
    textAlign: "center",
  };

  const badge: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.3rem 0.65rem" : "0.35rem 0.75rem",
    borderRadius: "2rem",
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.12)}`,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.68rem" : "0.72rem",
    color: colors[moduleTheme].text.primary,
    letterSpacing: "0.02em",
  };

  const flavorStyle: CSSProperties = {
    fontStyle: "italic",
    fontSize: isMobile ? "0.72rem" : "0.78rem",
    color: withOpacity(colors[moduleTheme].text.secondary, 0.85),
    lineHeight: 1.35,
    letterSpacing: "0.01em",
  };

  return (
    <div style={wrapper}>
      <div style={badge}>
        <Clock size={isMobile ? 12 : 13} strokeWidth={2} style={{ opacity: 0.7 }} />
        <span style={{ fontWeight: 600 }}>{estimate.minutes} min</span>
      </div>
      {flavor && <span style={flavorStyle}>— {flavor}</span>}
    </div>
  );
};
