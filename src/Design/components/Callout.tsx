import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
};

export const Callout: FC<Props> = ({ title, children }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typography = getTypography(breakpoint);

  const gold = getBrandGold(theme);
  
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;
  
  const washSource = moduleTheme === "base" ? gold : colors[moduleTheme].background.secondary;

  const wrapperStyle: CSSProperties = {
    margin: isMobile ? "1.5rem 0" : "2.5rem 0",
  };

  const titleStyle: CSSProperties = {
    ...typography.heading,
    display: "block",
    color: moduleAccent,
    marginBottom: "0.55rem",
  };

  const frameStyle: CSSProperties = {
    position: "relative",
    padding: isMobile ? "1rem 1rem" : "1.25rem 1.5rem",
    background: withOpacity(washSource, theme === "dark" ? 0.1 : 0.07),
  };

  const cornerSize = 14;
  const stroke = `${BRAND.figures.ruleThickness}px solid ${gold}`;

  const topLeftStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: cornerSize,
    height: cornerSize,
    borderTop: stroke,
    borderLeft: stroke,
  };
  const topRightStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    width: cornerSize,
    height: cornerSize,
    borderTop: stroke,
    borderRight: stroke,
  };
  const bottomLeftStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: cornerSize,
    height: cornerSize,
    borderBottom: stroke,
    borderLeft: stroke,
  };
  const bottomRightStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: cornerSize,
    height: cornerSize,
    borderBottom: stroke,
    borderRight: stroke,
  };

  const bodyStyle: CSSProperties = {
    color: colors.base.text.primary,
    lineHeight: 1.62,
    fontSize: isMobile ? "1rem" : "1.0625rem",
    textAlign: "left",
  };

  return (
    <aside style={wrapperStyle}>
      <span style={titleStyle}>{title}</span>
      <div style={frameStyle}>
        <div style={topLeftStyle} />
        <div style={topRightStyle} />
        <div style={bottomLeftStyle} />
        <div style={bottomRightStyle} />
        <div style={bodyStyle}>{children}</div>
      </div>
    </aside>
  );
};
