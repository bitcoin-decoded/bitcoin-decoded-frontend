import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../Theme";

type Props = {
  size?: number;
  style?: CSSProperties;
};

const NAVY = "#16213E";
const CREAM = "#F8F5EE";
const GOLD = "#C4A45A";

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

      <rect x="64" y="149" width="52" height="26" fill={GOLD} rx="2" />
    </svg>
  );
};
