import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  getBrandGold,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";

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
 * The chapter prelude — a soft module-color wash (the only backdrop in the
 * reading flow; asides dropped theirs) with a module-color Cabin Sketch
 * lettrine on the intro's first letter. The written word "Prélude" is gone:
 * the lettrine, the wash, and the italic voice signal "the opening" on their
 * own. The lettrine is the chalk initial the teacher draws to start the lesson.
 */
export const ChapterPrelude: FC<ChapterPreludeProps> = ({ children, marginBottom }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
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
    border: `1px solid ${withOpacity(moduleAccent, 0.28)}`,
    padding: isMobile ? "1rem 1.1rem" : "1.25rem 1.5rem",
    marginBottom,
  };

  // The intro voice. The big module-color drop-cap is rendered by CSS
  // (.chapter-prelude-text::first-letter in index.css), fed the module color
  // through the --prelude-lettrine-color variable.
  const textStyle: CSSProperties = {
    margin: 0,
    color: colors.base.text.primary,
    fontFamily: "var(--font-body)",
    fontStyle: "italic",
    lineHeight: 1.62,
    fontSize: isMobile ? "1rem" : "1.0625rem",
    textAlign: "left",
    ["--prelude-lettrine-color" as string]: moduleAccent,
  };

  return (
    <div style={containerStyle}>
      <p className="chapter-prelude-text" style={textStyle}>
        {children}
      </p>
    </div>
  );
};
