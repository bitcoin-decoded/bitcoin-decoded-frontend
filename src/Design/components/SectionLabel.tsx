import { type CSSProperties, type FC } from "react";

import { useBreakpoint } from "../Responsive";
import { getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  marker: string;
  label: string;
  accent?: string;
};

export const SectionLabel: FC<Props> = ({ marker, label, accent }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const typo = getTypography(useBreakpoint());

  const labelColor =
    moduleTheme === "base" ? colors.base.text.secondary : colors[moduleTheme].text.secondary;

  const wrapperStyle: CSSProperties = {
    ...typo.kicker,
    display: "block",
    textAlign: "center",
  };

  return (
    <span style={wrapperStyle}>
      <span style={{ color: accent ?? getBrandGold(theme) }}>{marker}</span>
      <span style={{ color: labelColor }}>{` · ${label}`}</span>
    </span>
  );
};
