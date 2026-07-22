import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getTypography } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import type { SigPlaygroundColors } from "../types";

type Props = {
  label: string;
  icon: ReactNode;
  active: boolean;
  colors: SigPlaygroundColors;
};

export const PyramidConnector: FC<Props> = ({ label, icon, active, colors }) => {
  const typo = getTypography();
  const tone = active ? colors.accentColor : withOpacity(colors.baseTextSecondary, 0.6);

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    alignSelf: "center",
    flexShrink: 0,
    padding: "0.16rem 0.5rem",
    borderRadius: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    color: tone,
    background: withOpacity(active ? colors.accentColor : colors.baseBorderSecondary, 0.06),
    border: `1px solid ${withOpacity(active ? colors.accentColor : colors.baseBorderSecondary, active ? 0.45 : 0.2)}`,
    transition: "all 0.35s var(--ease-smooth)",
  };

  return (
    <span style={style}>
      {icon}
      {label}
    </span>
  );
};
