import { type CSSProperties, type FC } from "react";

import { BRAND, useThemeContext, withOpacity } from "../../../Design";
import { getLandingColors } from "../helpers";
import { useHover } from "../hooks";

import { DoodleArrowDown } from "@doodle";

type Props = {
  label: string;
  onClick: () => void;
};

// The invitation to descend. Users read it, not just scroll past it, so it is a
// visible affordance: a gold-bordered pill with the chapter "next block" icon
// (DoodleArrowDown), the arrow bobbing (landing-cue-bob) and settling still under
// prefers-reduced-motion.
export const ScrollCue: FC<Props> = ({ label, onClick }) => {
  const { theme } = useThemeContext();
  const { gold, ink } = getLandingColors(theme);
  const { isHovered, hoverProps } = useHover();

  const buttonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.7rem 1.2rem",
    border: `1px solid ${withOpacity(gold, isHovered ? 0.75 : 0.45)}`,
    background: withOpacity(gold, isHovered ? 0.14 : 0.07),
    cursor: "pointer",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: ink,
    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
    transition: "background 0.25s var(--ease-smooth), border-color 0.25s var(--ease-smooth), transform 0.25s var(--ease-smooth)",
  };

  return (
    <button type="button" style={buttonStyle} onClick={onClick} {...hoverProps}>
      <span className="landing-cue-bob" style={{ color: gold, display: "inline-flex" }}>
        <DoodleArrowDown size={26} aria-hidden />
      </span>
      {label}
    </button>
  );
};
