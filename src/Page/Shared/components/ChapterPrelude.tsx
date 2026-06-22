import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getBrandGold, useBreakpoint, usePageTheme, useThemeContext } from "../../../Design";
import { useTranslation } from "../../../I18n";

type ChapterPreludeProps = {
  children: ReactNode;
  /**
   * Bottom margin between the prelude and whatever follows. Driven by
   * `PageTemplate`'s vertical rhythm system - passing `undefined` leaves
   * spacing to the parent flow.
   */
  marginBottom?: string;
};

/**
 * The ledger-system chapter prelude — a kicker `prélude` in mono small-caps
 * over italic serif body, separated from the rest of the block by a thin
 * gold filet at the left. Same vocabulary as Callout's bracketed-frame
 * kicker and BlockShell's title kicker. The previous module-tinted card
 * with halo glow and AudioLines icon belonged to the AI-template era;
 * this version reads as a typographic intro, not a UI widget.
 */
export const ChapterPrelude: FC<ChapterPreludeProps> = ({ children, marginBottom }) => {
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    paddingLeft: isMobile ? "0.85rem" : "1.1rem",
    borderLeft: `${BRAND.figures.ruleThickness}px solid ${gold}`,
    marginBottom,
  };

  // The prelude opens the chapter — it deserves a real heading, not a banal
  // mono metadata label. Cabin Sketch, gold, sizeable: the teacher writing
  // "Prélude" at the top of the board before the lesson begins.
  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.display,
    fontWeight: 700,
    fontSize: isMobile ? "1.5rem" : "1.75rem",
    letterSpacing: "0.01em",
    color: gold,
    lineHeight: 1.1,
    marginBottom: "0.6rem",
  };

  // Readable body — the previous `text.secondary` was ton-sur-ton and hard
  // to read in both modes. Use full primary ink at a slightly larger size.
  const textStyle: CSSProperties = {
    margin: 0,
    color: colors.base.text.primary,
    fontFamily: BRAND.fonts.body,
    fontStyle: "italic",
    lineHeight: 1.7,
    fontSize: isMobile ? "1.0625rem" : "1.15rem",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{t("chapterPrelude.label")}</span>
      <p style={textStyle}>{children}</p>
    </div>
  );
};
