import { type CSSProperties, type FC } from "react";

import { usePageTheme, withOpacity } from "../../Design";
import { getModuleRamp } from "../helpers";
import type { Badge } from "../types";

import { Lock } from "@icons";

type Size = "sm" | "md" | "lg";

type Props = {
  badge: Badge;
  earned: boolean;
  size?: Size;
};

const DIMS: Record<Size, { box: number; icon: number; ring: number }> = {
  sm: { box: 30, icon: 15, ring: 2 },
  md: { box: 76, icon: 32, ring: 3 },
  lg: { box: 104, icon: 44, ring: 4 },
};

export const BadgeMedal: FC<Props> = ({ badge, earned, size = "md" }) => {
  const { colors } = usePageTheme();
  const { box, icon, ring } = DIMS[size];
  const accent = colors[getModuleRamp(badge.module)].background.secondary;
  const Icon = earned ? badge.icon : Lock;

  const earnedStyle: CSSProperties = {
    background: `radial-gradient(circle at 35% 28%, ${withOpacity(accent, 0.92)}, ${accent})`,
    color: colors.base.text.onAccent,
    boxShadow: `inset 0 0 0 ${ring}px ${withOpacity("#ffffff", 0.38)}, 0 10px 28px ${withOpacity(accent, 0.34)}`,
  };

  const lockedStyle: CSSProperties = {
    background: withOpacity(colors.base.text.secondary, 0.05),
    color: withOpacity(colors.base.text.secondary, 0.5),
    border: `1px dashed ${withOpacity(colors.base.border.secondary, 0.6)}`,
  };

  const medalStyle: CSSProperties = {
    width: box,
    height: box,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    transition: "transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth)",
    ...(earned ? earnedStyle : lockedStyle),
  };

  return (
    <div style={medalStyle} aria-hidden="true">
      <Icon size={icon} strokeWidth={earned ? 2 : 1.8} />
    </div>
  );
};
