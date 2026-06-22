import { type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  /**
   * Optional icon. **Ignored** in the ledger design system — the mono kicker
   * label ("note · {title}") already signals an aside. Kept in the API so the
   * existing 21 callers compile without modification.
   */
  icon?: ReactNode;
  /** Aside title; becomes the kicker text rendered above the frame. */
  title: string;
  children: ReactNode;
};

/**
 * The bracketed frame — silhouette reserved for asides (the former Callout).
 * Four corner brackets in hairline gold define a focus area without forming
 * a closed rectangle, giving asides a distinct silhouette from the
 * SurfaceCard transaction frame (top-rule + carré + bottom-rule). The user
 * never confuses "thing I read" with "thing I manipulate".
 *
 * The icon prop is preserved for API compatibility but no longer rendered;
 * the mono small-caps kicker `note · {title}` already carries the aside
 * signal in the editorial register.
 */
export const Callout: FC<Props> = ({ title, children }) => {
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);

  const wrapperStyle: CSSProperties = {
    margin: isMobile ? "1.5rem 0" : "2.5rem 0",
  };

  const kickerStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    color: colors.base.text.secondary,
    fontVariant: "small-caps",
    marginBottom: "0.5rem",
  };

  const frameStyle: CSSProperties = {
    position: "relative",
    padding: isMobile ? "1rem 1rem" : "1.25rem 1.5rem",
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
    lineHeight: 1.7,
    fontSize: isMobile ? "0.875rem" : "0.9375rem",
    textAlign: "left",
  };

  return (
    <aside style={wrapperStyle}>
      <span style={kickerStyle}>note · {title.toLowerCase()}</span>
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
