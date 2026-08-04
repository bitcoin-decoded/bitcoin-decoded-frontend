import { type CSSProperties, type FC } from "react";

import {
  getTypography,
  LedgerNumeral,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import type { Superpower } from "../types";

import { DoodleSearchMagnifier } from "@doodle";

type Props = {
  index: number;
  superpower: Superpower;
  active: boolean;
  revealed: boolean;
  dimmed: boolean;
  accent: string;
  onSelect: () => void;
};

export const SuperpowerTile: FC<Props> = ({
  index,
  superpower,
  active,
  revealed,
  dimmed,
  accent,
  onSelect,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();

  const isMuted = superpower.muted && !active;
  const isHighlight = superpower.highlight && !active;

  // Aligned with BitcoinNodeDemo's tiles: same neutral border and soft wash at
  // rest, so nothing reads as a hard white frame.
  const softWash = withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.04);

  const borderColor = active
    ? withOpacity(accent, 0.55)
    : isMuted
      ? withOpacity(colors.base.border.secondary, 0.6)
      : colors.base.border.secondary;

  // The new power is set apart by a soft accent wash, never by a heavier border,
  // so it reads as an addition and not as the selected tile.
  const background = active
    ? withOpacity(accent, 0.12)
    : isHighlight
      ? withOpacity(accent, 0.06)
      : softWash;

  const tileStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.55rem" : "0.7rem",
    minHeight: isMobile ? "7rem" : "8rem",
    padding: isMobile ? "1.6rem 0.7rem 1rem" : "1.8rem 0.85rem 1.15rem",
    border: `1px solid ${borderColor}`,
    borderRadius: 0,
    background,
    cursor: "pointer",
    textAlign: "center",
    opacity: isMuted ? 0.6 : dimmed ? 0.9 : 1,
    transition:
      "border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth), opacity 0.35s var(--ease-smooth)",
    WebkitTapHighlightColor: "transparent",
  };

  const numeralStyle: CSSProperties = {
    position: "absolute",
    top: isMobile ? "0.45rem" : "0.55rem",
    left: isMobile ? "0.45rem" : "0.55rem",
  };

  // A hairline stroke in the icon colour thickens the freehand lines a touch, so
  // the card icons carry the same visual weight as the larger ones in
  // BitcoinNodeDemo. Fill-based doodles have no stroke otherwise.
  const iconRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
    color: active || isHighlight ? accent : withOpacity(accent, 0.82),
    stroke: "currentColor",
    strokeWidth: 0.5,
    transition: "color 0.35s var(--ease-smooth)",
  };

  const labelStyle: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    lineHeight: 1.2,
    color: active ? colors.base.text.primary : colors.base.text.secondary,
    transition: "color 0.35s var(--ease-smooth)",
  };

  return (
    <button type="button" style={tileStyle} onClick={onSelect} aria-pressed={active}>
      <span style={numeralStyle}>
        <LedgerNumeral value={index + 1} size={isMobile ? 22 : 24} accent={accent} muted={isMuted} />
      </span>
      <span style={iconRowStyle}>
        {revealed ? superpower.icon : <DoodleSearchMagnifier size={isMobile ? 30 : 34} />}
      </span>
      <span style={labelStyle}>{superpower.label}</span>
    </button>
  );
};
