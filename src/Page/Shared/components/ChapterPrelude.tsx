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
  marginBottom?: string;
};

export const ChapterPrelude: FC<ChapterPreludeProps> = ({ children, marginBottom }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typography = getTypography(breakpoint);

  const gold = getBrandGold(theme);
  const isModule = moduleTheme !== "base";
  const moduleAccent = isModule ? colors[moduleTheme].text.secondary : gold;
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
