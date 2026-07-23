import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  value: string;
};

export const TransactionInput: FC<Props> = ({ value }) => {
  const breakpoint = useBreakpoint();
  const typo = getTypography(breakpoint);
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const style: CSSProperties = {
    ...typo.figure,
    color: colors.base.text.primary,
    padding: "0.45rem 0.6rem",
    background: withOpacity(world.background.secondary, 0.08),
    border: `${BRAND.figures.ruleThickness}px solid ${withOpacity(world.border.secondary, 0.3)}`,
    width: "100%",
    boxSizing: "border-box",
    wordBreak: "break-word",
  };

  return <div style={style}>{value}</div>;
};
