import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getBrandGold, useBreakpoint, usePageTheme } from "../../Design";

type Props = {
  title: string;
  lead?: string | string[];
  icon?: ReactNode;
  children?: ReactNode;
};

// The shared layout for every onboarding screen: an optional gold mark, the mono
// title, one or more body paragraphs, then the screen's own controls. Keeps the
// rhythm identical across the flow so nothing feels bolted on. Dumb.
export const AuthScreen: FC<Props> = ({ title, lead, icon, children }) => {
  const { colors, theme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const leads = lead === undefined ? [] : Array.isArray(lead) ? lead : [lead];

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.35rem" : "1.5rem",
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: 1.2,
    color: colors.base.text.primary,
    margin: 0,
  };

  const leadStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "0.95rem" : "1rem",
    lineHeight: 1.6,
    color: colors.base.text.primary,
    margin: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
      {icon && <div style={{ color: getBrandGold(theme), lineHeight: 0 }}>{icon}</div>}
      <h2 style={titleStyle}>{title}</h2>
      {leads.map((paragraph, index) => (
        <p key={index} style={leadStyle}>
          {paragraph}
        </p>
      ))}
      {children}
    </div>
  );
};
