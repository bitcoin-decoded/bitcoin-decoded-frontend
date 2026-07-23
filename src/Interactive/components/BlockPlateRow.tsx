import { type CSSProperties, type FC, type ReactNode } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../Design";

type Props = {
  icon: ReactNode;
  label: string;
  zebra: boolean;
  stacked?: boolean;
  headerAction?: ReactNode;
  children: ReactNode;
};

// The value sits on the label's line and is pushed right, the way an amount
// sits in a ledger column, and drops to its own line when the pair no longer
// fits. `stacked` forces that drop for values that are themselves blocks.
export const BlockPlateRow: FC<Props> = ({
  icon,
  label,
  zebra,
  stacked = false,
  headerAction,
  children,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  const rowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: isMobile ? "0.5rem" : "0.7rem",
    rowGap: isMobile ? "0.1rem" : "0.2rem",
    padding: isMobile ? "0.35rem 0.35rem" : "0.5rem 0.55rem",
    background: zebra ? withOpacity(world.background.secondary, 0.06) : "transparent",
  };

  const iconStyle: CSSProperties = {
    flexShrink: 0,
    display: "flex",
    color: world.text.secondary,
  };

  const labelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.primary,
  };

  const valueStyle: CSSProperties = {
    minWidth: 0,
    marginLeft: stacked ? 0 : "auto",
    width: stacked ? "100%" : undefined,
    textAlign: stacked ? "left" : "right",
  };

  return (
    <div style={rowStyle}>
      <span style={iconStyle}>{icon}</span>
      <span style={labelStyle}>{label}</span>
      {headerAction && <span style={{ marginLeft: "auto" }}>{headerAction}</span>}
      <div style={valueStyle}>{children}</div>
    </div>
  );
};
