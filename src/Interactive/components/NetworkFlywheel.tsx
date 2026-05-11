import { type CSSProperties, type FC } from "react";

import {
  Activity,
  Coins,
  Pickaxe,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { Button, SurfaceCard, useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useNetworkFlywheel } from "../hooks";
import { MAX_LEVEL } from "../hooks/useNetworkFlywheel";

const STEP_ICONS = [Activity, Coins, Pickaxe, ShieldCheck, TrendingUp] as const;

export const NetworkFlywheel: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { level, highlightedStep, steps, canIncrease, increase, reset } = useNetworkFlywheel();

  const accentColor = world.border.secondary;
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const stepsRow: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "0",
    alignItems: "center",
    position: "relative",
  };

  const mobileGrid: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  };

  const mobileRow: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "0",
    alignItems: "center",
  };

  const stepNode = (isHighlighted: boolean): CSSProperties => ({
    ...mono,
    flex: "1 1 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.35rem",
    padding: isMobile ? "0.6rem 0.3rem" : "0.8rem 0.5rem",
    borderRadius: "0.75rem",
    background: isHighlighted
      ? withOpacity(accentColor, 0.12)
      : withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(
      isHighlighted ? accentColor : world.border.secondary,
      isHighlighted ? 0.5 : 0.15,
    )}`,
    boxShadow: isHighlighted ? `0 0 16px ${withOpacity(accentColor, 0.28)}` : "none",
    transition: "all 0.35s var(--ease-smooth)",
    minWidth: 0,
    textAlign: "center",
  });

  const stepIcon = (isHighlighted: boolean): CSSProperties => ({
    color: isHighlighted ? accentColor : withOpacity(world.text.secondary, 0.7),
    transition: "color 0.35s var(--ease-smooth)",
  });

  const stepLabel: CSSProperties = {
    fontSize: isMobile ? "0.65rem" : "0.62rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    color: colors.base.text.secondary,
  };

  const stepMetric = (isHighlighted: boolean): CSSProperties => ({
    fontSize: isMobile ? "0.8rem" : "0.75rem",
    fontWeight: 700,
    color: isHighlighted ? accentColor : world.text.primary,
    transition: "color 0.35s var(--ease-smooth)",
  });

  const arrow: CSSProperties = {
    flexShrink: 0,
    opacity: 0.3,
    fontSize: "0.9rem",
    padding: isMobile ? "0.2rem 0" : "0 0.1rem",
    textAlign: "center",
    color: world.text.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Loop-back arc (desktop only)
  const arcWrapper: CSSProperties = {
    display: isMobile ? "none" : "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    marginTop: "-0.25rem",
    padding: "0 1rem",
  };

  const arcLine: CSSProperties = {
    flex: 1,
    height: "1.25rem",
    borderLeft: `1.5px dashed ${withOpacity(accentColor, 0.35)}`,
    borderBottom: `1.5px dashed ${withOpacity(accentColor, 0.35)}`,
    borderRight: `1.5px dashed ${withOpacity(accentColor, 0.35)}`,
    borderRadius: "0 0 0.75rem 0.75rem",
  };

  const arcLabel: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.6rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: withOpacity(accentColor, 0.7),
    whiteSpace: "nowrap",
    padding: "0 0.5rem",
  };

  // Mobile loop-back hint
  const mobileLoop: CSSProperties = {
    display: isMobile ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.25rem 0",
    fontSize: "0.6rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: withOpacity(accentColor, 0.7),
  };

  const controls: CSSProperties = {
    display: "flex",
    gap: "0.65rem",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
  };

  const tagline: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.7rem" : "0.72rem",
    lineHeight: 1.5,
    padding: "0.6rem 0.85rem",
    borderRadius: "0.6rem",
    color: level > 0 ? world.text.primary : colors.base.text.secondary,
    background: withOpacity(level > 0 ? accentColor : colors.base.border.secondary, 0.06),
    border: `1px solid ${withOpacity(level > 0 ? accentColor : colors.base.border.secondary, level > 0 ? 0.2 : 0.1)}`,
    transition: "all 0.4s var(--ease-smooth)",
    textAlign: "center",
  };

  const levelIndicator: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    justifyContent: "center",
  };

  const dot = (filled: boolean): CSSProperties => ({
    width: "0.45rem",
    height: "0.45rem",
    borderRadius: "50%",
    background: filled ? accentColor : withOpacity(accentColor, 0.2),
    transition: "background 0.3s var(--ease-smooth)",
  });

  const renderStep = (step: (typeof steps)[0], i: number) => {
    const Icon = STEP_ICONS[i];
    const isHighlighted = highlightedStep === i;
    return (
      <div key={step.id} style={stepNode(isHighlighted)}>
        <Icon size={isMobile ? 16 : 16} strokeWidth={2} style={stepIcon(isHighlighted)} />
        <span style={stepLabel}>{t(step.labelKey as Parameters<typeof t>[0])}</span>
        <span key={level} className="metric-pop" style={stepMetric(isHighlighted)}>
          {step.metricByLevel[level]}
        </span>
      </div>
    );
  };

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={mono}>
      {isMobile ? (
        <div style={mobileGrid}>
          {/* Row 1: steps 0, 1, 2 */}
          <div style={mobileRow}>
            {steps.slice(0, 3).map((step, i) => (
              <div key={step.id} style={{ display: "contents" }}>
                {renderStep(step, i)}
                {i < 2 && <div style={arrow}>→</div>}
              </div>
            ))}
          </div>
          {/* Row 2: steps 3, 4 - centered */}
          <div style={{ ...mobileRow, justifyContent: "center" }}>
            {steps.slice(3).map((step, i) => (
              <div key={step.id} style={{ display: "contents" }}>
                {renderStep(step, i + 3)}
                {i < steps.slice(3).length - 1 && <div style={arrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={stepsRow}>
          {steps.map((step, i) => (
            <div key={step.id} style={{ display: "contents" }}>
              {renderStep(step, i)}
              {i < steps.length - 1 && <div style={arrow}>→</div>}
            </div>
          ))}
        </div>
      )}

      {/* Loop-back arc - desktop */}
      <div style={arcWrapper}>
        <div style={arcLine} />
        <div style={arcLabel}>
          <RefreshCw size={10} strokeWidth={2} />
          {t("flywheel.cycleLabel")}
        </div>
        <div style={arcLine} />
      </div>

      {/* Loop-back hint - mobile */}
      <div style={mobileLoop}>
        <RefreshCw size={10} strokeWidth={2} />
        {t("flywheel.cycleLabel")}
      </div>

      {/* Controls */}
      <div style={controls}>
        <Button
          icon={<PlusCircle size={isMobile ? 13 : 14} strokeWidth={2} />}
          onClick={increase}
          disabled={!canIncrease}
          fullWidth
          style={{ flex: 1 }}
        >
          {canIncrease ? t("flywheel.increase") : t("flywheel.maxReached")}
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

      {/* Level dots */}
      <div style={levelIndicator}>
        {Array.from({ length: MAX_LEVEL }, (_, i) => (
          <div key={i} style={dot(i < level)} />
        ))}
      </div>

      {/* Tagline */}
      <div style={tagline}>{level === 0 ? t("flywheel.taglineIdle") : t("flywheel.tagline")}</div>
    </SurfaceCard>
  );
};
