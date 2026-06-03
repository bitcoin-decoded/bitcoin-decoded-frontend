import { type CSSProperties, type FC } from "react";

import { Zap } from "lucide-react";

import { Button, useBreakpoint, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getMachineColors } from "../data";

type Props = {
  traveling: boolean;
  onPull: () => void;
};

/**
 * The travel trigger: a realistic metal lever (opaque brushed-steel shaft +
 * amber knob) that swings down when pulled and lifts gently on hover, paired
 * with the standard app Button as the explicit call to action.
 */
export const TravelLever: FC<Props> = ({ traveling, onPull }) => {
  const { t } = useTranslation();
  const { theme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const isLight = theme === "light";
  const machine = getMachineColors(isLight);

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.85rem",
  };

  const trackStyle: CSSProperties = {
    position: "relative",
    width: "3rem",
    height: isMobile ? "3rem" : "3.4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  };

  // Brushed-steel mounting plate.
  const baseStyle: CSSProperties = {
    width: "1.9rem",
    height: "0.6rem",
    borderRadius: "0.4rem",
    background: machine.leverBase,
    border: `1px solid ${machine.leverBaseBorder}`,
    boxShadow: machine.leverBaseShadow,
  };

  // Metal shaft, pivoting from the base: up & ready, or pulled down.
  const shaftStyle: CSSProperties = {
    position: "absolute",
    bottom: "0.35rem",
    width: "0.5rem",
    height: isMobile ? "2.3rem" : "2.6rem",
    borderRadius: "0.3rem",
    background: machine.leverShaft,
    boxShadow: machine.leverShaftShadow,
    transformOrigin: "bottom center",
    transform: traveling ? "rotate(34deg)" : "rotate(-30deg)",
    transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  // Solid amber knob (no translucency), with a 3D sheen.
  const knobStyle: CSSProperties = {
    position: "absolute",
    top: "-0.55rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "1.3rem",
    height: "1.3rem",
    borderRadius: "50%",
    background: machine.leverKnob,
    border: `1px solid ${machine.leverKnobBorder}`,
    boxShadow: machine.leverKnobShadow,
  };

  return (
    <div style={wrapStyle}>
      <button
        type="button"
        className="htm-lever"
        onClick={onPull}
        disabled={traveling}
        aria-label={t("halvingTimeMachine.lever")}
      >
        <div style={trackStyle}>
          <div style={shaftStyle}>
            <span style={knobStyle} />
          </div>
          <div style={baseStyle} />
        </div>
      </button>

      <Button
        variant="primary"
        icon={<Zap size={14} strokeWidth={2.5} />}
        onClick={onPull}
        disabled={traveling}
      >
        {traveling ? t("halvingTimeMachine.leverTraveling") : t("halvingTimeMachine.lever")}
      </Button>
    </div>
  );
};
