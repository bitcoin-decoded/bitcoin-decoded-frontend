import { type FC, type CSSProperties } from "react";
import { usePageTheme } from "../../../Design/Theme";
import { withOpacity } from "../../../Design/helpers";
import { useReadingProgress } from "../hooks";

export const ReadingProgressBar: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const progress = useReadingProgress();

  const accent = colors[moduleTheme].text.secondary;

  // Pinned to the bottom of the viewport so it stays visible regardless
  // of the header's hide-on-scroll-down behavior. A previous "below the
  // header" placement would orphan the bar (showing a 3.5rem gap above
  // it whenever the header transformed off-screen). The bottom edge is
  // also a known reading-progress UX pattern (Medium, Substack).
  const track: CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: "3px",
    background: withOpacity(accent, 0.08),
    pointerEvents: "none",
  };

  const fill: CSSProperties = {
    height: "100%",
    width: `${progress * 100}%`,
    background: `linear-gradient(90deg, ${accent}, ${colors[moduleTheme].text.primary})`,
    borderRadius: "0 2px 2px 0",
    transition: "width 0.15s linear",
    boxShadow: progress > 0 ? `0 0 8px ${withOpacity(accent, 0.4)}` : "none",
  };

  return (
    <div style={track}>
      <div style={fill} />
    </div>
  );
};
