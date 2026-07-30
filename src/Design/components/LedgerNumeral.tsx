import { type CSSProperties, type FC } from "react";

import { withOpacity } from "../helpers";
import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  value: number;
  size?: number;
  accent?: string;
  muted?: boolean;
};

// A numeral set in a square rule rather than a rounded chip: the ledger reads in
// right angles, so a counted item is boxed, not bubbled. Draws the module accent
// by default; a caller past a module (accent "base") gets gold.
export const LedgerNumeral: FC<Props> = ({ value, size = 28, accent, muted = false }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();

  const resolved =
    accent ?? (moduleTheme === "base" ? getBrandGold(theme) : colors[moduleTheme].text.secondary);

  const boxStyle: CSSProperties = {
    width: size,
    height: size,
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${withOpacity(resolved, muted ? 0.28 : 0.45)}`,
    borderRadius: 0,
    background: withOpacity(resolved, muted ? 0.05 : 0.1),
    color: withOpacity(resolved, muted ? 0.65 : 1),
    transition: "border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth), color 0.35s var(--ease-smooth)",
  };

  const digitStyle: CSSProperties = {
    fontFamily: BRAND.fonts.display,
    fontSize: size * 0.55,
    fontWeight: 500,
    lineHeight: 1,
    fontVariantNumeric: "lining-nums",
  };

  return (
    <span style={boxStyle} aria-hidden="true">
      <span style={digitStyle}>{value}</span>
    </span>
  );
};
