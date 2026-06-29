import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  getBrandGold,
  getTypography,
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
 * The chapter prelude — a soft module-color wash with a module-color display
 * lettrine on the intro's first letter, and the whole intro voice set
 * in the module color (no italic). The written word "Prélude" is gone: the
 * upright lettrine + the colored overture signal "the opening" on their own,
 * and the monochrome-module treatment sets it cleanly apart from the ink prose
 * that follows. The lettrine is the chalk initial the teacher draws to start
 * the lesson — and it is the ONLY lettrine in the reading flow.
 */
export const ChapterPrelude: FC<ChapterPreludeProps> = ({ children, marginBottom }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typography = getTypography(breakpoint);

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

  // The intro voice shares the chapter `prose` role (16px body serif), set in
  // the module color (no italic) so the prelude reads as a colored overture
  // distinct from the ink prose. The big drop-cap is rendered by CSS
  // (.chapter-prelude-text::first-letter in index.css), fed the same module
  // color through --prelude-lettrine-color — size + weight (display 700) keep
  // it distinct from the body it shares a hue with.
  const textStyle: CSSProperties = {
    ...typography.prose,
    margin: 0,
    color: moduleAccent,
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
