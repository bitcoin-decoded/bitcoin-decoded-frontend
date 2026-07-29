import { type CSSProperties, type FC } from "react";

import { getBrandGold, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import type { ParcoursStep, SigPlaygroundColors } from "../types";

type Props = {
  steps: ParcoursStep[];
  colors: SigPlaygroundColors;
};

export const SignatureParcours: FC<Props> = ({ steps, colors }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors: theme, theme: mode } = usePageTheme();
  const gold = getBrandGold(mode);

  const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
    padding: isMobile ? "0.7rem 0.8rem" : "0.8rem 1rem",
    background: withOpacity(theme.base.text.primary, 0.035),
    border: `1px solid ${theme.base.border.tertiary}`,
  };

  const badge = (status: ParcoursStep["status"]): CSSProperties => ({
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "1.4rem",
    height: "1.4rem",
    color: gold,
    background: withOpacity(gold, status === "current" ? 0.16 : 0.06),
    border: `1px solid ${withOpacity(gold, status === "current" ? 0.85 : status === "done" ? 0.45 : 0.25)}`,
  });

  return (
    <div style={container}>
      {steps.map((step, i) => {
        const reached = step.status !== "upcoming";
        return (
          <div
            key={step.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              flexWrap: "wrap",
              opacity: step.status === "upcoming" ? 0.5 : 1,
              transition: "opacity 0.35s var(--ease-smooth)",
            }}
          >
            <span style={badge(step.status)}>{i + 1}</span>
            <span
              style={{
                ...typo.note,
                color: reached ? gold : colors.baseTextSecondary,
                fontStyle: step.status === "upcoming" ? "italic" : "normal",
              }}
            >
              {step.label}
            </span>
            {step.note && (
              <span
                style={{
                  ...typo.micro,
                  fontVariant: "small-caps",
                  letterSpacing: "0.05em",
                  color: withOpacity(gold, 0.85),
                }}
              >
                · {step.note}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
