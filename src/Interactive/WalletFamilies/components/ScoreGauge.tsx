import { type CSSProperties, type FC } from "react";

import type { LucideIcon } from "lucide-react";

import { BRAND, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  /** Attribute name (e.g. "Simplicité"). */
  label: string;
  /** Lucide glyph prefixing the label. */
  icon: LucideIcon;
  /** Filled segments, 0..max. */
  score: number;
  /** Filled-pip color (the wallet card's accent). */
  accent: string;
  /** Total segments. @default 5 */
  max?: number;
};

/**
 * A gamified stat row - an attribute label plus segmented pips, RPG-style.
 * Stacked across the three wallet cards (filled counts aligned), the gauges
 * read as a simplicité ↘ / souveraineté ↗ trade-off matrix at a glance.
 */
export const ScoreGauge: FC<Props> = ({ label, icon: Icon, score, accent, max = 5 }) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const empty = withOpacity(colors.base.text.secondary, 0.16);

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
  };

  const labelStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: colors.base.text.secondary,
    whiteSpace: "nowrap",
  };

  const pipsStyle: CSSProperties = { display: "flex", gap: "0.25rem", flexShrink: 0 };

  const pipStyle = (filled: boolean): CSSProperties => ({
    width: isMobile ? "0.8rem" : "0.95rem",
    height: "0.4rem",
    borderRadius: 0,
    background: filled ? accent : empty,
    transition: "background 0.3s var(--ease-smooth)",
  });

  return (
    <div style={rowStyle}>
      <span style={labelStyle}>
        <Icon size={12} strokeWidth={2} style={{ color: accent, flexShrink: 0 }} />
        {label}
      </span>
      <div style={pipsStyle}>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} style={pipStyle(i < score)} />
        ))}
      </div>
    </div>
  );
};
