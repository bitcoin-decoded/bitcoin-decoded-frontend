import { type CSSProperties, type FC } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { getTypography, usePageTheme } from "../Theme";

type Props = {
  explored: number;
  total: number;
  label: string;
};

export const ExploredCounter: FC<Props> = ({ explored, total, label }) => {
  const { colors, moduleTheme } = usePageTheme();
  const typo = getTypography(useBreakpoint());

  const world = colors[moduleTheme];
  const accent = world.text.secondary;
  const accentBorder = world.border.secondary;
  const complete = explored >= total;

  const container: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    padding: "0.25rem 0.6rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accentBorder, complete ? 0.45 : 0.2)}`,
    background: withOpacity(accent, complete ? 0.1 : 0.04),
    transition: "all 0.35s var(--ease-smooth)",
  };

  const textStyle: CSSProperties = {
    ...typo.micro,
    whiteSpace: "nowrap",
    color: withOpacity(colors.base.text.secondary, complete ? 0.95 : 0.7),
  };

  const countStyle: CSSProperties = { color: accent };

  return (
    <span style={container}>
      <span style={textStyle}>
        <span style={countStyle}>
          {explored}/{total}
        </span>{" "}
        {label}
      </span>
    </span>
  );
};
