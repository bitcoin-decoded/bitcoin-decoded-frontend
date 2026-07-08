import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, usePageTheme } from "../../../Design";

import { ArrowDown } from "@icons";

type Props = {
  isBroken?: boolean;
  caption?: string;
};

export const ChainArrow: FC<Props> = ({ isBroken = false, caption }) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const color = isBroken ? colors.semantic.error.text : colors[moduleTheme].text.secondary;

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.1rem 0",
    color,
    transition: "color 0.3s var(--ease-smooth)",
  };

  const captionStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color,
  };

  return (
    <div style={wrapper}>
      {caption && <span style={captionStyle}>{caption}</span>}
      <ArrowDown size={20} strokeWidth={2} strokeDasharray={isBroken ? "4 3" : undefined} />
    </div>
  );
};
