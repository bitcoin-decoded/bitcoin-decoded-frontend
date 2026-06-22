import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  getBrandGold,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
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
 * The chapter prelude — a soft module-color background wash (no left filet,
 * which was confusable with the block's top rule) holding a Patrick Hand
 * heading in the module color over an italic intro. The wash brings the
 * module identity back (violet on MoneyLaws, blue on Banking, …) and sets the
 * prelude apart from the surrounding prose as "the opening" without an
 * AI-card halo. Heading register is shared with Callout's title (point 3).
 */
export const ChapterPrelude: FC<ChapterPreludeProps> = ({ children, marginBottom }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  const isModule = moduleTheme !== "base";
  const moduleAccent = isModule ? colors[moduleTheme].text.secondary : gold;
  // Saturated module color for the wash (e.g. violet #8b5cf6), falling back to
  // gold on neutral pages. Kept very faint so the prose reads cleanly on top.
  const washSource = isModule ? colors[moduleTheme].background.secondary : gold;
  const wash = withOpacity(washSource, theme === "dark" ? 0.12 : 0.08);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: wash,
    padding: isMobile ? "1rem 1.1rem" : "1.25rem 1.5rem",
    marginBottom,
  };

  // The prelude opens the chapter — a real heading, in Patrick Hand (the
  // teacher's hand) emphasized by size + module color rather than a sketched
  // display face that read rough at this small size.
  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "1.5rem" : "1.7rem",
    letterSpacing: "0.01em",
    color: moduleAccent,
    lineHeight: 1.1,
    marginBottom: "0.5rem",
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
