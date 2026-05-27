import { type CSSProperties, type FC } from "react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  value: string;
};

export const TransactionInput: FC<Props> = ({ value }) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const style: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.6rem" : "0.65rem",
    color: colors.base.text.primary,
    padding: "0.4rem 0.55rem",
    borderRadius: "0.4rem",
    background: withOpacity(world.background.secondary, 0.08),
    border: `1px solid ${withOpacity(world.border.secondary, 0.25)}`,
    width: "100%",
    boxSizing: "border-box",
    wordBreak: "break-word",
  };

  return <div style={style}>{value}</div>;
};
