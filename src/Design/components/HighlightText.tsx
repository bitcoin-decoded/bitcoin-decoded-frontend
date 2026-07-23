import { type CSSProperties, type FC, type ReactNode } from "react";

import { getMarkerStroke, getStableSeed } from "../helpers";
import { BRAND, type ModuleThemeName, usePageTheme, useThemeContext } from "../Theme";

const INK_OPACITY = 0.38;

type HighlightTextProps = {
  children: ReactNode;
  hue?: ModuleThemeName;
};

export const HighlightText: FC<HighlightTextProps> = ({ children, hue }) => {
  const { theme } = useThemeContext();
  const { colors, moduleTheme } = usePageTheme();
  const isDark = theme === "dark";

  // A highlighter lays down a light pigment. On the dark surface that is the
  // world's pale tint; on paper it is the saturated hue, since the world's text
  // colour there is a near-brown that dries muddy rather than pastel.
  const world = hue ?? moduleTheme;
  const ink =
    world === "base"
      ? BRAND.goldDark
      : isDark
        ? colors[world].text.secondary
        : colors[world].background.secondary;

  // The phrase seeds its own stroke, so the same words always get the same
  // wobble and two highlights in a paragraph never come out identical.
  const seed = getStableSeed(typeof children === "string" ? children : "marker");

  // Geometry, wrapping and the sweep live in `.marker-highlight`; only the ink
  // is theme-dependent and therefore computed here.
  const highlightStyle: CSSProperties = {
    fontWeight: 500,
    backgroundImage: getMarkerStroke(ink, seed, INK_OPACITY),
  };

  return (
    <span className="marker-highlight" style={highlightStyle}>
      {children}
    </span>
  );
};
