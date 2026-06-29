import { type CSSProperties,type FC } from "react";

import { BRAND, useThemeContext } from "../../Theme";

type Props = {
  /** Rendered SVG width (CSS value or px number). Aspect ratio is preserved. */
  width?: number | string;
  style?: CSSProperties;
};

// Brand color recipe (lifted verbatim from the official Logo Kit)
const NAVY = "#16213E";
const CREAM = "#F8F5EE";
const GOLD = "#C4A45A";

const FONT_FAMILY = BRAND.fonts.wordmark;

/**
 * Bitcoin.Decoded logo lockup ("Bitcoin" + gold rule + small gold square +
 * italic "Decoded"). Renders the **Logo Kit Version 04** (full color, dark
 * surface - signature variant) on dark theme and **Version 01** (full
 * color, white surface) on light theme.
 *
 * Background: intentionally transparent so the logo sits on whatever
 * page background it lands on (matches the app rather than carrying its
 * own colored block). Per-variant text/accent colors come from the kit.
 */
export const BitcoinDecodedLogo: FC<Props> = ({ width = 320, style }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  // V04 (dark): cream "Bitcoin", gold rule + square, gold italic "Decoded".
  // V01 (light): navy "Bitcoin", gold rule + square, navy italic "Decoded".
  const bitcoinFill = isDark ? CREAM : NAVY;
  const decodedFill = isDark ? GOLD : NAVY;
  // The horizontal rule has slightly different opacity in V01 vs V04 of the
  // kit - keep both at full strength here for crispness.

  return (
    <svg
      viewBox="0 0 300 100"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
      role="img"
      aria-label="Bitcoin.Decoded"
    >
      <text
        x="150"
        y="40"
        fontFamily={FONT_FAMILY}
        fontSize="42"
        fontWeight="400"
        letterSpacing="4"
        fill={bitcoinFill}
        textAnchor="middle"
      >
        Bitcoin
      </text>

      {/* Horizontal gold rule running edge-to-edge, broken by the square */}
      <line x1="0" y1="56" x2="300" y2="56" stroke={GOLD} strokeWidth="0.85" />

      {/* Small gold square breaking the rule (kit signature element) */}
      <rect x="143" y="49" width="14" height="14" fill={GOLD} rx="1" />

      <text
        x="150"
        y="86"
        fontFamily={FONT_FAMILY}
        fontSize="16"
        fontWeight="300"
        fontStyle="italic"
        letterSpacing="8"
        fill={decodedFill}
        textAnchor="middle"
      >
        Decoded
      </text>
    </svg>
  );
};
