import { type CSSProperties, type FC } from "react";

import { getBrandGold, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  margin?: string;
};

export const Separator: FC<Props> = ({ margin = "1.5rem 0" }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();

  const accent = moduleTheme === "base" ? getBrandGold(theme) : colors[moduleTheme].text.secondary;

  const rowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    margin,
  };

  const squareStyle: CSSProperties = {
    width: 5,
    height: 5,
    background: accent,
    opacity: 0.65,
  };

  return (
    <div style={rowStyle} role="separator" aria-hidden="true">
      <span style={squareStyle} />
      <span style={squareStyle} />
      <span style={squareStyle} />
    </div>
  );
};
