import { type CSSProperties, type FC } from "react";

import { useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  traveling: boolean;
  onPull: () => void;
};

/**
 * The travel trigger, drawn as a slot-machine lever: a knobbed handle that
 * swings down when pulled. Disabled (and held in the pulled position) while a
 * trip is in progress.
 */
export const TravelLever: FC<Props> = ({ traveling, onPull }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const accent = world.border.secondary;

  const buttonStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.55rem",
    background: "transparent",
    border: "none",
    cursor: traveling ? "wait" : "pointer",
    padding: 0,
  };

  const trackStyle: CSSProperties = {
    position: "relative",
    width: "2.8rem",
    height: isMobile ? "3rem" : "3.4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  };

  // Mounting plate at the base of the lever.
  const baseStyle: CSSProperties = {
    width: "1.6rem",
    height: "0.55rem",
    borderRadius: "0.4rem",
    background: withOpacity(colors.base.text.secondary, 0.25),
    border: `1px solid ${withOpacity(accent, 0.4)}`,
  };

  // The pivoting handle: swings from "up & ready" to "pulled down".
  const handleStyle: CSSProperties = {
    position: "absolute",
    bottom: "0.3rem",
    width: "0.42rem",
    height: isMobile ? "2.3rem" : "2.7rem",
    borderRadius: "0.3rem",
    background: `linear-gradient(180deg, ${withOpacity(accent, 0.9)}, ${withOpacity(accent, 0.45)})`,
    transformOrigin: "bottom center",
    transform: traveling ? "rotate(34deg)" : "rotate(-30deg)",
    transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  const knobStyle: CSSProperties = {
    position: "absolute",
    top: "-0.55rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "1.2rem",
    height: "1.2rem",
    borderRadius: "50%",
    background: `radial-gradient(circle at 35% 35%, ${accent}, ${withOpacity(accent, 0.55)})`,
    boxShadow: `0 0 12px ${withOpacity(accent, 0.6)}`,
    border: `1px solid ${withOpacity("#ffffff", 0.25)}`,
  };

  const labelStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.65rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: traveling ? withOpacity(colors.base.text.secondary, 0.7) : accent,
  };

  return (
    <button
      type="button"
      onClick={onPull}
      disabled={traveling}
      aria-label={t("halvingTimeMachine.lever")}
      style={buttonStyle}
    >
      <div style={trackStyle}>
        <div style={handleStyle}>
          <span style={knobStyle} />
        </div>
        <div style={baseStyle} />
      </div>
      <span style={labelStyle}>
        {traveling ? t("halvingTimeMachine.leverTraveling") : t("halvingTimeMachine.lever")}
      </span>
    </button>
  );
};
