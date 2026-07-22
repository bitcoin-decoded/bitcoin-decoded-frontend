import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import { useReadingTime } from "../hooks";

import { DoodleClock } from "@doodle";

/**
 * Reading-time estimate, ledger register: a quiet mono `~ N min` under the
 * title — no rounded accent pill (that read as AI-template chrome). The
 * bracket framing and Cutive Mono match the block-header strips.
 */
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
    // The mono meta was ~11.5px and read too small for its register; the label
    // role (13/14px) matches the chapter kicker above it.
    fontSize: typo.label.fontSize,
    letterSpacing: "0.08em",
    // The prose colour, not the secondary grey. This sits alone under the
    // title, with nothing around it to be quiet against, and the grey read as
    // switched off rather than as understated.
    color: colors.base.text.primary,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={labelStyle}>
        {/* Freehand line art, so it reads lighter than a solid glyph at the
            same nominal size and needs the extra couple of pixels to sit level
            with the figure beside it. It inherits the label's colour, and is no
            longer dimmed on top of it: a thin hand-drawn stroke at 75% was the
            first thing to disappear. */}
        <DoodleClock size={isMobile ? 21 : 24} />
        {estimate.minutes} min
      </span>
    </div>
  );
};
