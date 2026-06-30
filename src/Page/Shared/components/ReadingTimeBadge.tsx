import { type CSSProperties, type FC } from "react";

import { BRAND, useBreakpoint, usePageTheme } from "../../../Design";
import { useReadingTime } from "../hooks";

import { Clock } from "@icons";

/**
 * Reading-time estimate, ledger register: a quiet mono `~ N min` under the
 * title — no rounded accent pill (that read as AI-template chrome). The
 * bracket framing and Cutive Mono match the block-header strips.
 */
export const ReadingTimeBadge: FC = () => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const estimate = useReadingTime();

  if (!estimate) return null;

  const labelStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.72rem" : "0.78rem",
    letterSpacing: "0.08em",
    color: colors.base.text.secondary,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={labelStyle}>
        <Clock size={isMobile ? 12 : 13} strokeWidth={2} style={{ opacity: 0.65 }} />
        {estimate.minutes} min
      </span>
    </div>
  );
};
