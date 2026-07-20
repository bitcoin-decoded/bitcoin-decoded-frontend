import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../Theme";

type Props = {
  /** Rendered side length in px (the avatar is 1:1). Default 28. */
  size?: number;
  style?: CSSProperties;
};

// Brand color recipe (lifted verbatim from the Avatar Kit)
const NAVY = "#16213E";
const CREAM = "#F8F5EE";
const GOLD = "#C4A45A";

/**
 * 1:1 square avatar mark - large serif "B" + gold accent bar.
 *
 * Renders the Avatar Kit's "Carré YouTube/LinkedIn" variant on dark theme
 * and "Carré variante claire" on light theme (per the user-defined
 * mapping for the navbar).
 *
 * Background: **transparent** - the avatar drops its colored square
 * fill so it blends with whatever surface it lands on (works equally
 * well on the navbar's solid color, on the header's tonal gradient, or
 * on any future surface). The "B" letter color is per the kit recipe
 * (cream on dark, navy on light) and the gold accent bar is identical
 * across themes - the contrast comes from the page chrome, not from a
 * carried background.
 */
export const BitcoinDecodedAvatar: FC<Props> = ({ size = 28, style }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const letterFill = isDark ? CREAM : NAVY;

  return (
    <svg
      viewBox="0 0 180 180"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: "inline-block", ...style }}
      role="img"
      aria-label="Bitcoin.Decoded"
    >
      <text
        x="90"
        y="138"
        fontFamily={BRAND.fonts.wordmark}
        fontSize="172"
        fontWeight="500"
        fill={letterFill}
        textAnchor="middle"
      >
        B
      </text>

      {/* Gold accent bar sitting just below the B baseline (kit signature). */}
      <rect x="64" y="149" width="52" height="26" fill={GOLD} rx="2" />
    </svg>
  );
};
