import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../Design";

type Props = {
  children: ReactNode;
};

export const BlockPlateSection: FC<Props> = ({ children }) => {
  const breakpoint = useBreakpoint();
  const typo = getTypography(breakpoint);
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const style: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    color: world.text.secondary,
    padding: "0.55rem 0 0.3rem",
    borderBottom: `${BRAND.figures.ruleThickness}px solid ${withOpacity(world.border.secondary, 0.35)}`,
    marginBottom: "0.2rem",
  };

  return <div style={style}>{children}</div>;
};
