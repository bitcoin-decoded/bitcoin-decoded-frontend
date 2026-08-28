import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext } from "../../../Design";
import { getLandingColors } from "../helpers";

import { DoodleArrowDown } from "@doodle";

type Props = {
  label: string;
  onClick: () => void;
};

// The invitation to descend one marche, reused by the hero ("Regarde") and every
// palier ("Continue"). It borrows the chapter "next block" icon (DoodleArrowDown)
// so the escalier and the reading flow share one affordance; the gold arrow bobs
// (landing-cue-bob) and degrades to still under prefers-reduced-motion.
export const ScrollCue: FC<Props> = ({ label, onClick }) => {
  const { theme } = useThemeContext();
  const { gold, ink2 } = getLandingColors(theme);

  const buttonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.7rem",
    padding: 0,
    border: "none",
    background: "none",
    cursor: "pointer",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: ink2,
  };

  return (
    <button type="button" style={buttonStyle} onClick={onClick}>
      <span className="landing-cue-bob" style={{ color: gold, display: "inline-flex" }}>
        <DoodleArrowDown size={28} aria-hidden />
      </span>
      {label}
    </button>
  );
};
