import { type CSSProperties, type FC, type ReactNode } from "react";

import { Caption, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  accent: string;
  icon: ReactNode;
  title: string;
  summary: string;
  keyText: string;
  children: ReactNode;
};

export const ModelCard: FC<Props> = ({ accent, icon, title, summary, keyText, children }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();

  const card: CSSProperties = {
    flex: isMobile ? "0 0 auto" : "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    background: withOpacity(accent, 0.04),
  };

  const header: CSSProperties = {
    padding: isMobile ? "0.75rem 0.85rem" : "0.95rem 1.1rem",
    borderBottom: `1px solid ${withOpacity(accent, 0.18)}`,
  };

  const body: CSSProperties = {
    padding: isMobile ? "0.75rem 0.85rem" : "0.95rem 1.1rem",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.55rem" : "0.7rem",
    flex: 1,
  };

  const footer: CSSProperties = {
    padding: isMobile ? "0.7rem 0.85rem" : "0.8rem 1.1rem",
    borderTop: `1px solid ${withOpacity(accent, 0.15)}`,
    background: withOpacity(accent, 0.04),
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  };

  return (
    <div style={card}>
      <div style={header}>
        <Caption size="md" color={accent} icon={icon}>
          {title}
        </Caption>
      </div>

      <div style={body}>{children}</div>

      <div style={footer}>
        <span style={{ ...typo.note, color: colors.base.text.secondary }}>{summary}</span>
        <span style={{ ...typo.note, color: accent }}>{keyText}</span>
      </div>
    </div>
  );
};
