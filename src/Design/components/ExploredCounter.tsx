import { type CSSProperties, type FC } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, usePageTheme } from "../Theme";

import { CircleCheck, Compass } from "@icons";

type Props = {
  explored: number;
  total: number;
  label: string;
};

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
    borderRadius: 0,
    fontFamily: BRAND.fonts.mono,
    border: `1px solid ${withOpacity(accentBorder, complete ? 0.45 : 0.2)}`,
    background: withOpacity(accent, complete ? 0.1 : 0.04),
    transition: "all 0.35s var(--ease-smooth)",
  };

  const textStyle: CSSProperties = {
    fontSize: isMobile ? "0.58rem" : "0.62rem",
    fontWeight: 500,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    color: withOpacity(colors.base.text.secondary, complete ? 0.95 : 0.7),
  };

  const countStyle: CSSProperties = { color: accent, fontWeight: 500 };

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
