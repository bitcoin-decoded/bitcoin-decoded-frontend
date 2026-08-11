import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../Theme";

type Props = {
  width?: number | string;
  style?: CSSProperties;
};

const NAVY = "#16213E";
const CREAM = "#F8F5EE";
const GOLD = "#C4A45A";

// The brand wordmark turned into the loader: the gold block slides back and forth
// along its rule while "Bitcoin" and "Decoded" hold still. Pure SMIL, no JS, no
// layout cost. Mirrors BitcoinDecodedLogo so the two stay visually identical.
export const BitcoinDecodedLoader: FC<Props> = ({ width = 190, style }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const bitcoinFill = isDark ? CREAM : NAVY;
  const decodedFill = isDark ? GOLD : NAVY;

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
        fontFamily={BRAND.fonts.wordmark}
        fontSize="42"
        fontWeight="400"
        letterSpacing="4"
        fill={bitcoinFill}
        textAnchor="middle"
      >
        Bitcoin
      </text>

      <line x1="0" y1="56" x2="300" y2="56" stroke={GOLD} strokeWidth="0.85" />

      <rect y="49" width="14" height="14" fill={GOLD} rx="1">
        <animate
          attributeName="x"
          values="4;282;4"
          keyTimes="0;0.5;1"
          dur="1.6s"
          calcMode="spline"
          keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          repeatCount="indefinite"
        />
      </rect>

      <text
        x="150"
        y="86"
        fontFamily={BRAND.fonts.wordmark}
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
