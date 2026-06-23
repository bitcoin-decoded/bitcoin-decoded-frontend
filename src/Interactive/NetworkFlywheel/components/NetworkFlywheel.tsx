import { type CSSProperties, type FC } from "react";

import { PlusCircle, RefreshCw, RotateCcw } from "lucide-react";

import { BRAND, Button, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { MAX_LEVEL, STEP_ICONS, WHEEL_RADIUS } from "../data";
import { getPentagonLayout, getStepTones } from "../helpers";
import { useNetworkFlywheel } from "../hooks";

import { FlywheelStep } from "./FlywheelStep";

type Props = {
  /** Fired once the reader turns the wheel at least once (gates the tool block). */
  onComplete?: () => void;
};

export const NetworkFlywheel: FC<Props> = ({ onComplete }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { steps, level, stepLevels, activeStep, canIncrease, increase, reset } =
    useNetworkFlywheel(onComplete);

  const tones = getStepTones(colors);
  const { vertices, edges } = getPentagonLayout(steps.length, WHEEL_RADIUS);
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };
  const idleEdge = withOpacity(world.text.secondary, 0.28);

  const wheelStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: isMobile ? "21rem" : "26rem",
    margin: "0.25rem auto 0.5rem",
    aspectRatio: "1 / 1",
  };

  const svgStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  };

  const hubStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    color: withOpacity(world.text.secondary, 0.85),
  };

  const dotsStyle: CSSProperties = { display: "flex", gap: "0.3rem" };
  const dotStyle = (filled: boolean): CSSProperties => ({
    width: "0.4rem",
    height: "0.4rem",
    borderRadius: "50%",
    background: filled ? world.border.secondary : withOpacity(world.border.secondary, 0.2),
    transition: "background 0.3s var(--ease-smooth)",
  });

  const controlsStyle: CSSProperties = {
    display: "flex",
    gap: "0.65rem",
    flexDirection: isMobile ? "column" : "row",
  };

  const isOn = level > 0;
  const taglineStyle: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.7rem" : "0.72rem",
    lineHeight: 1.5,
    padding: "0.6rem 0.85rem",
    borderRadius: "0.6rem",
    textAlign: "center",
    color: isOn ? world.text.primary : colors.base.text.secondary,
    background: withOpacity(isOn ? world.border.secondary : colors.base.border.secondary, 0.06),
    border: `1px solid ${withOpacity(
      isOn ? world.border.secondary : colors.base.border.secondary,
      isOn ? 0.2 : 0.1,
    )}`,
    transition: "all 0.4s var(--ease-smooth)",
  };

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={mono}>
      <div style={wheelStyle} role="img" aria-label={t("flywheel.cycleLabel")}>
        <svg viewBox="0 0 100 100" style={svgStyle} aria-hidden>
          {edges.map((e, k) => {
            const on = activeStep > 0 && activeStep === k + 1;
            const color = on ? tones[k + 1] : idleEdge;
            return (
              <g key={k} style={{ transition: "all 0.3s var(--ease-smooth)" }}>
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke={color}
                  strokeWidth={on ? 0.9 : 0.5}
                  strokeDasharray={on ? undefined : "1.6 1.6"}
                  strokeLinecap="round"
                />
                <polygon
                  points="-1.5,-1.2 1.9,0 -1.5,1.2"
                  fill={color}
                  transform={`translate(${e.mx} ${e.my}) rotate(${e.angle})`}
                />
              </g>
            );
          })}
        </svg>

        {steps.map((step, i) => (
          <div
            key={step.id}
            style={{
              position: "absolute",
              top: `${vertices[i].y}%`,
              left: `${vertices[i].x}%`,
              width: isMobile ? "31%" : "30%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <FlywheelStep
              icon={STEP_ICONS[i]}
              label={t(step.labelKey as Parameters<typeof t>[0])}
              metric={step.metricByLevel[stepLevels[i]]}
              accent={tones[i]}
              isActive={activeStep === i}
              isMobile={isMobile}
            />
          </div>
        ))}

        <div style={hubStyle}>
          <RefreshCw
            size={isMobile ? 20 : 24}
            strokeWidth={1.8}
            className={activeStep !== -1 ? "flywheel-spin" : undefined}
          />
          <div style={dotsStyle}>
            {Array.from({ length: MAX_LEVEL }, (_, i) => (
              <div key={i} style={dotStyle(i < level)} />
            ))}
          </div>
        </div>
      </div>

      <div style={controlsStyle}>
        <Button
          icon={<PlusCircle size={isMobile ? 13 : 14} strokeWidth={2} />}
          onClick={increase}
          disabled={!canIncrease}
          fullWidth
          style={{ flex: 1 }}
        >
          {level >= MAX_LEVEL ? t("flywheel.maxReached") : t("flywheel.increase")}
        </Button>
        <Button
          variant="secondary"
          icon={<RotateCcw size={isMobile ? 12 : 13} strokeWidth={2} />}
          onClick={reset}
          disabled={level === 0}
          fullWidth
        >
          {t("flywheel.reset")}
        </Button>
      </div>

      <div style={taglineStyle}>{isOn ? t("flywheel.tagline") : t("flywheel.taglineIdle")}</div>
    </SurfaceCard>
  );
};
