import { type CSSProperties, type FC, type ReactNode } from "react";

import { Info } from "lucide-react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { usePageTheme } from "../Theme";

type Props = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
};

export const Callout: FC<Props> = ({ icon, title, children }) => {
  const { colors, moduleTheme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  const accentColor = colors[moduleTheme].border.secondary;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: isMobile ? "1.5rem 0" : "2.5rem 0",
    padding: isMobile ? "1rem 0.85rem" : "1.5rem 2rem",
    background: `linear-gradient(190deg, ${colors[moduleTheme].background.primary}, ${colors.base.background.primary})`,
    borderRadius: "1rem",
  };

  // Title row: icon and title sit on a single line so the body underneath
  // takes the full container width on every breakpoint.
  const headerRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  };

  const iconContainerStyle: CSSProperties = {
    color: accentColor,
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
  };

  const titleStyle: CSSProperties = {
    color: moduleTheme === "base" ? colors.base.text.primary : colors[moduleTheme].text.primary,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.8125rem" : "0.875rem",
    letterSpacing: "0.02em",
  };

  const separatorStyle: CSSProperties = {
    width: "100%",
    height: "1px",
    background: `linear-gradient(to right, ${withOpacity(accentColor, 0.25)}, transparent)`,
    border: "none",
    margin: isMobile ? "0.625rem 0" : "0.75rem 0",
  };

  const textStyle: CSSProperties = {
    color: moduleTheme === "base" ? colors.base.text.secondary : colors[moduleTheme].text.secondary,
    lineHeight: 1.7,
    fontSize: isMobile ? "0.875rem" : "0.9375rem",
    textAlign: "left",
  };

  const defaultIcon = <Info size={isMobile ? 16 : 20} strokeWidth={2} />;

  return (
    <aside
      className="gradient-border"
      style={{ ...containerStyle, "--border-glow-color": accentColor } as CSSProperties}
    >
      <div style={headerRowStyle}>
        <span style={iconContainerStyle}>{icon || defaultIcon}</span>
        <span style={titleStyle}>{title}</span>
      </div>
      <hr style={separatorStyle} />
      <div style={textStyle}>{children}</div>
    </aside>
  );
};
