import { type CSSProperties, type FC, type ReactNode } from "react";

import { Caption, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  title: string;
  icon: ReactNode;
  accent: string;
  closingLine: string;
  children: ReactNode;
};

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
