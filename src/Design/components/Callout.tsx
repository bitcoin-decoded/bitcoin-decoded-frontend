import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  /**
   * Optional icon. **Ignored** in the ledger design system — the title heading
   * already signals an aside. Kept in the API so the existing callers compile.
   */
  icon?: ReactNode;
  /** Aside title; rendered as a Patrick Hand heading in the module color. */
  title: string;
  children: ReactNode;
};

/**
 * The bracketed frame — silhouette reserved for asides (the former Callout).
 * Four corner brackets in hairline gold define a focus area without forming a
 * closed rectangle, giving asides a distinct silhouette from the SurfaceCard
 * transaction frame. The title is a Patrick Hand heading in the module color
 * (the same heading treatment as ChapterPrelude — see point 3), so asides and
 * preludes read as one consistent title system. The gold corners stay
 * structural; the module color carries identity.
 */
export const Callout: FC<Props> = ({ title, children }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  // Module identity color (violet on MoneyLaws, blue on Banking, …), falling
  // back to gold on neutral/base pages where no module accent exists.
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;
  // Saturated module hue for the wash (gold on neutral pages), kept very faint
  // so the prose still reads cleanly on top.
  const washSource = moduleTheme === "base" ? gold : colors[moduleTheme].background.secondary;

  const wrapperStyle: CSSProperties = {
    margin: isMobile ? "1.5rem 0" : "2.5rem 0",
  };

  // Shared heading register with ChapterPrelude: Patrick Hand, module-colored.
  // Patrick Hand has a single weight, so emphasis comes from size + color.
  const titleStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "1.15rem" : "1.25rem",
    lineHeight: 1.2,
    letterSpacing: "0.01em",
    color: moduleAccent,
    marginBottom: "0.55rem",
  };

  // A faint module wash gives the aside a readable surface in both themes
  // (light mode in particular felt unanchored without one). The bracketed gold
  // corners + module-color title still carry its identity; the wash just sets
  // it apart from the surrounding prose.
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

  // Body matches the surrounding prose size (17px desktop / 16px mobile).
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
