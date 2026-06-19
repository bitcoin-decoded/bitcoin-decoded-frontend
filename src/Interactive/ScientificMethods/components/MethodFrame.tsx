import { type CSSProperties, type FC, type ReactNode } from "react";

import { Caption, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  title: string;
  /** Lucide eyebrow icon identifying the method. */
  icon: ReactNode;
  /** Calm, non-alert accent color for this method (blue / violet). */
  accent: string;
  /** One-line takeaway shown at the bottom of the frame. */
  closingLine: string;
  children: ReactNode;
};

/**
 * Shared shell for the two scientific-method visuals: a SurfaceCard with an
 * eyebrow title, the diagram body, and a closing takeaway line. Keeping the
 * frame in one place guarantees the physicist / logician pair reads as a
 * matched set (same paddings, same title-and-closing rhythm) while each body
 * carries its own opposed geometry - horizontal vs vertical.
 */
export const MethodFrame: FC<Props> = ({ title, icon, accent, closingLine, children }) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const closingStyle: CSSProperties = {
    margin: 0,
    paddingTop: "1rem",
    borderTop: `1px solid ${withOpacity(accent, 0.18)}`,
    fontSize: isMobile ? "0.82rem" : "0.88rem",
    fontStyle: "italic",
    lineHeight: 1.55,
    textAlign: "center",
    color: colors.base.text.secondary,
  };

  return (
    <SurfaceCard glowColor={accent} size="lg" gap="1.25rem">
      <Caption size="md" color={accent} icon={icon} style={{ letterSpacing: "0.08em" }}>
        {title}
      </Caption>
      {children}
      <p style={closingStyle}>{closingLine}</p>
    </SurfaceCard>
  );
};
