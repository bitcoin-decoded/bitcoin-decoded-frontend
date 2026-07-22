import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";


type Props = {
  icon: ReactNode;
  iconAccent?: string;
  label: string;
  zebra: boolean;
  headerAction?: ReactNode;
  children: ReactNode;
};

export const BlockRow: FC<Props> = ({
  icon,
  iconAccent,
  label,
  zebra,
  headerAction,
  children,
}) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const mono = { fontFamily: BRAND.fonts.mono } as const;

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.5rem" : "0.6rem",
    padding: isMobile ? "0.35rem 0.45rem" : "0.4rem 0.55rem",
    borderRadius: 0,
    background: zebra ? withOpacity(world.background.secondary, 0.04) : "transparent",
    transition: "background 0.2s ease",
  };

  const iconBadgeStyle: CSSProperties = {
    width: isMobile ? "1.5rem" : "1.65rem",
    height: isMobile ? "1.5rem" : "1.65rem",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(iconAccent ?? world.background.secondary, 0.12),
    border: `1px solid ${withOpacity(iconAccent ?? world.border.secondary, 0.3)}`,
    color: iconAccent ?? world.text.secondary,
  };

  const labelStyle: CSSProperties = {
    ...mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: colors.base.text.primary,
    letterSpacing: "0.02em",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  };

  const columnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    flex: 1,
    minWidth: 0,
  };

  return (
    <div style={rowStyle}>
      <div style={iconBadgeStyle}>{icon}</div>
      <div style={columnStyle}>
        <div style={headerStyle}>
          <span style={labelStyle}>{label}</span>
          {headerAction}
        </div>
        {children}
      </div>
    </div>
  );
};
