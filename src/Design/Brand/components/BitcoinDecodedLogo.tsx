import { type CSSProperties,type FC } from "react";

import { BRAND, useThemeContext } from "../../Theme";

type Props = {
  width?: number | string;
  style?: CSSProperties;
};

const NAVY = "#16213E";
const CREAM = "#F8F5EE";
const GOLD = "#C4A45A";

export const BitcoinDecodedLogo: FC<Props> = ({ width = 320, style }) => {
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

      <rect x="143" y="49" width="14" height="14" fill={GOLD} rx="1" />

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
