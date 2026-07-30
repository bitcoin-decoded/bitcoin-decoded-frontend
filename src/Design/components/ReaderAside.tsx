import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

import { DoodleExclamation, DoodleQuestionMark, DoodleSmileyEyes } from "@doodle";

type Mode = "question" | "objection";

type Props = {
  children: ReactNode;
  mode?: Mode;
};

// The reader's own voice breaking into the prose. It reads as an aside, not as
// the narrator: an expressive eyes-only face with a comic-book mark floating
// above the head (a question when they genuinely ask, an exclamation when they
// push back), the line carried in the module's colour over a soft wash.
export const ReaderAside: FC<Props> = ({ children, mode = "question" }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);

  const gold = getBrandGold(theme);
  const isModule = moduleTheme !== "base";
  const accent = isModule ? colors[moduleTheme].text.secondary : gold;
  const washSource = isModule ? colors[moduleTheme].background.secondary : gold;
  const wash = withOpacity(washSource, theme === "dark" ? 0.1 : 0.07);

  const faceSize = isMobile ? 34 : 40;
  const markSize = isMobile ? 20 : 22;
  const Mark = mode === "objection" ? DoodleExclamation : DoodleQuestionMark;

  const wrapperStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.85rem" : "1.15rem",
    margin: isMobile ? "1.75rem 0" : "2.25rem 0",
    padding: isMobile ? "1rem 1rem 0.85rem" : "1.15rem 1.25rem 1rem",
    background: wash,
    borderLeft: `2px solid ${withOpacity(accent, 0.55)}`,
  };

  const faceWrapStyle: CSSProperties = {
    position: "relative",
    flexShrink: 0,
    color: accent,
    display: "flex",
  };

  // Popped above the head and tilted, the way a beat lands in a comic panel.
  const markStyle: CSSProperties = {
    position: "absolute",
    bottom: "calc(100% - 0.5rem)",
    left: "55%",
    transform: "rotate(8deg)",
    display: "flex",
    pointerEvents: "none",
  };

  const textStyle: CSSProperties = {
    ...typo.prose,
    fontStyle: "italic",
    color: accent,
    textAlign: "left",
    margin: 0,
  };

  return (
    <aside style={wrapperStyle}>
      <span style={faceWrapStyle} aria-hidden="true">
        <span style={markStyle}>
          <Mark size={markSize} />
        </span>
        <DoodleSmileyEyes size={faceSize} />
      </span>
      <p style={textStyle}>{children}</p>
    </aside>
  );
};
