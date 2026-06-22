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
  // Hyper-subtle module wash so the aside reads as "set apart" like the prose
  // marginalia would mark it — fainter than the prelude wash so they stay
  // distinct. Inner interactive components (e.g. a slider) sit on transparent
  // ledger surfaces, so this uniform tint shows cleanly behind them.
  const washSource = moduleTheme === "base" ? gold : colors[moduleTheme].background.secondary;
  const wash = withOpacity(washSource, theme === "dark" ? 0.06 : 0.04);

  const wrapperStyle: CSSProperties = {
    margin: isMobile ? "1.5rem 0" : "2.5rem 0",
  };

  // Shared heading register with ChapterPrelude: Patrick Hand, sizeable,
  // module-colored. Patrick Hand has a single weight, so emphasis comes from
  // size + color rather than font-weight.
  const titleStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "1.3rem" : "1.45rem",
    lineHeight: 1.2,
    letterSpacing: "0.01em",
    color: moduleAccent,
    marginBottom: "0.55rem",
  };

  const frameStyle: CSSProperties = {
    position: "relative",
    background: wash,
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

  // Body matches the surrounding prose size — the previous 0.9375rem was the
  // pre-typo-swap value and read cramped next to the bumped Patrick Hand prose.
  const bodyStyle: CSSProperties = {
    color: colors.base.text.primary,
    lineHeight: 1.75,
    fontSize: isMobile ? "1.0625rem" : "1.1875rem",
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
