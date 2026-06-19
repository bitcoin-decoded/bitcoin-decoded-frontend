import { type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";

type Props = {
  icon: ReactNode;
  iconAccent?: string;
  label: string;
  zebra: boolean;
  headerAction?: ReactNode;
  children: ReactNode;
};

/**
 * Single field row inside a block card - icon circle on the left, label and
 * optional inline action on the right header, value below. Extracted to its
 * own module so the FC reference stays stable across `BlockCard` re-renders,
 * preventing every child (including the animated linked-hash span) from
 * unmounting and replaying its CSS animation on every parent render.
 */
export const BlockRow: FC<Props> = ({
  icon,
  iconAccent,
  label,
  zebra,
  headerAction,
  children,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.5rem" : "0.6rem",
    padding: isMobile ? "0.35rem 0.45rem" : "0.4rem 0.55rem",
    borderRadius: "0.45rem",
    background: zebra ? withOpacity(world.background.secondary, 0.04) : "transparent",
    transition: "background 0.2s ease",
  };

  const iconCircleStyle: CSSProperties = {
    width: isMobile ? "1.5rem" : "1.65rem",
    height: isMobile ? "1.5rem" : "1.65rem",
    borderRadius: "50%",
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
    fontSize: isMobile ? "0.6rem" : "0.66rem",
    fontWeight: 600,
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
      <div style={iconCircleStyle}>{icon}</div>
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
