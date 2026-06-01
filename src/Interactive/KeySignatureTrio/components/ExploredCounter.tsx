import { type CSSProperties, type FC } from "react";

import { CircleCheck, Compass } from "lucide-react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  /** How many elements have been opened at least once. */
  explored: number;
  /** Total number of elements (3). */
  total: number;
  /** Translated word, e.g. "explorés". */
  label: string;
};

/**
 * Discreet "n/3 explored" progress chip shown next to the section title.
 * Pure mini-motivation — it never gates anything. The compass turns into a
 * check once every element has been opened.
 */
export const ExploredCounter: FC<Props> = ({ explored, total, label }) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const world = colors[moduleTheme];
  const accent = world.text.secondary;
  const accentBorder = world.border.secondary;
  const complete = explored >= total;

  const container: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    flexShrink: 0,
    padding: "0.2rem 0.55rem",
    borderRadius: "0.5rem",
    fontFamily: "'JetBrains Mono', monospace",
    border: `1px solid ${withOpacity(accentBorder, complete ? 0.45 : 0.2)}`,
    background: withOpacity(accent, complete ? 0.1 : 0.04),
    transition: "all 0.35s var(--ease-smooth)",
  };

  const textStyle: CSSProperties = {
    fontSize: isMobile ? "0.58rem" : "0.62rem",
    fontWeight: 700,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    color: withOpacity(colors.base.text.secondary, complete ? 0.95 : 0.7),
  };

  const countStyle: CSSProperties = { color: accent, fontWeight: 700 };

  return (
    <span style={container}>
      {complete ? (
        <CircleCheck size={12} strokeWidth={2.5} style={{ color: accent, flexShrink: 0 }} />
      ) : (
        <Compass size={12} strokeWidth={2} style={{ color: accent, flexShrink: 0 }} />
      )}
      <span style={textStyle}>
        <span style={countStyle}>
          {explored}/{total}
        </span>{" "}
        {label}
      </span>
    </span>
  );
};
