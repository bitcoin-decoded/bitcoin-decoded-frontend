import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../../Design";
import { getLandingColors } from "../helpers";

type Props = {
  label: string;
  align?: "left" | "center";
};

// The mono, gold section label with a leading ledger hairline. Rendered as a real
// span rather than a pseudo-element so the whole thing stays inline-styled.
export const Eyebrow: FC<Props> = ({ label, align = "left" }) => {
  const { theme } = useThemeContext();
  const { gold } = getLandingColors(theme);

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: align === "center" ? "center" : "flex-start",
    gap: "0.7rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: gold,
    margin: "0 0 1.35rem",
  };

  const dashStyle: CSSProperties = {
    width: "2rem",
    height: 1,
    background: gold,
    opacity: 0.6,
    flexShrink: 0,
  };

  return (
    <p style={style}>
      <span style={dashStyle} aria-hidden="true" />
      {label}
    </p>
  );
};
