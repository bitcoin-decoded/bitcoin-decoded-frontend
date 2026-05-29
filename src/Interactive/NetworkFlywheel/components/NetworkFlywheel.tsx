import { type CSSProperties, type FC, Fragment } from "react";

import { PlusCircle, RefreshCw, RotateCcw } from "lucide-react";

import { Button, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { MAX_LEVEL, STEP_ICONS } from "../data";
import { getStepTones } from "../helpers";
import { useNetworkFlywheel } from "../hooks";

import { FlywheelStep } from "./FlywheelStep";

export const NetworkFlywheel: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { steps, level, stepLevels, activeStep, canIncrease, increase, reset } =
    useNetworkFlywheel();
  const tones = getStepTones(colors);

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const trackStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
    gap: isMobile ? "0.3rem" : "0",
  };

  const connectorStyle = (active: boolean, accent: string): CSSProperties => ({
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "0.05rem 0" : "0 0.15rem",
    fontSize: "0.95rem",
    color: active ? accent : withOpacity(world.text.secondary, 0.3),
    transform: active ? "scale(1.3)" : "scale(1)",
    transition: "all 0.3s var(--ease-smooth)",
  });

  const cycleBadgeStyle: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    fontSize: "0.62rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: withOpacity(world.text.secondary, 0.85),
  };

  const controlsStyle: CSSProperties = {
    display: "flex",
    gap: "0.65rem",
    flexDirection: isMobile ? "column" : "row",
  };

  const dotsStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.35rem",
  };

  const dotStyle = (filled: boolean): CSSProperties => ({
    width: "0.45rem",
    height: "0.45rem",
    borderRadius: "50%",
    background: filled ? world.border.secondary : withOpacity(world.border.secondary, 0.2),
    transition: "background 0.3s var(--ease-smooth)",
  });

  const active = level > 0;
  const taglineStyle: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.7rem" : "0.72rem",
    lineHeight: 1.5,
    padding: "0.6rem 0.85rem",
    borderRadius: "0.6rem",
    textAlign: "center",
    color: active ? world.text.primary : colors.base.text.secondary,
    background: withOpacity(active ? world.border.secondary : colors.base.border.secondary, 0.06),
    border: `1px solid ${withOpacity(
      active ? world.border.secondary : colors.base.border.secondary,
      active ? 0.2 : 0.1,
    )}`,
    transition: "all 0.4s var(--ease-smooth)",
  };

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={mono}>
      <div style={trackStyle}>
        {steps.map((step, i) => (
          <Fragment key={step.id}>
            <FlywheelStep
              icon={STEP_ICONS[i]}
              label={t(step.labelKey as Parameters<typeof t>[0])}
              metric={step.metricByLevel[stepLevels[i]]}
              accent={tones[i]}
              isActive={activeStep === i}
              isMobile={isMobile}
            />
            {i < steps.length - 1 && (
              <div style={connectorStyle(activeStep === i + 1, tones[i + 1])}>
                {isMobile ? "↓" : "→"}
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <div style={cycleBadgeStyle}>
        <RefreshCw
          size={11}
          strokeWidth={2}
          className={activeStep !== -1 ? "flywheel-spin" : undefined}
        />
        {t("flywheel.cycleLabel")}
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

      <div style={dotsStyle}>
        {Array.from({ length: MAX_LEVEL }, (_, i) => (
          <div key={i} style={dotStyle(i < level)} />
        ))}
      </div>

      <div style={taglineStyle}>{active ? t("flywheel.tagline") : t("flywheel.taglineIdle")}</div>
    </SurfaceCard>
  );
};
