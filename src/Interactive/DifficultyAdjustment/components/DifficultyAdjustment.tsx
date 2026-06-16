import { type CSSProperties, type FC } from "react";

import { Minus, Plus, Target, Timer, Users } from "lucide-react";

import {
  Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useDifficultyAdjustment } from "../hooks";

type Props = {
  /** Fired once the reader shifts the difficulty off baseline (gates the tool block). */
  onComplete?: () => void;
};

export const DifficultyAdjustment: FC<Props> = ({ onComplete }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { miners, target, canDecrease, canIncrease, decrease, increase, step } =
    useDifficultyAdjustment(onComplete);

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const controlRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: isMobile ? "0.5rem" : "0.75rem",
    padding: "0.85rem 1rem",
    borderRadius: "0.75rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
  };

  const minerCount: CSSProperties = {
    ...mono,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.1rem",
    flex: 1,
    textAlign: "center",
    minWidth: 0,
  };

  const minerNumber: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    fontWeight: 700,
    color: world.text.primary,
    letterSpacing: "0.03em",
  };

  const minerLabel: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.55rem" : "0.6rem",
    color: colors.base.text.secondary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const metricsRow: CSSProperties = {
    display: "flex",
    gap: isMobile ? "0.6rem" : "0.85rem",
    flexDirection: isMobile ? "column" : "row",
  };

  const metric: CSSProperties = {
    ...mono,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    padding: "0.75rem 0.9rem",
    borderRadius: "0.65rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
    minWidth: 0,
  };

  const metricValue: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.95rem" : "1.05rem",
    fontWeight: 700,
    color: world.text.primary,
    letterSpacing: "0.05em",
    transition: "all 0.3s var(--ease-smooth)",
  };

  const fixedMetricValue: CSSProperties = {
    ...metricValue,
    color: colors.semantic.success.text,
  };

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"}>
      <Caption tone="world" size="md" icon={<Users size={isMobile ? 16 : 18} strokeWidth={2} />}>
        {t("difficulty.title")}
      </Caption>

      <div style={controlRow}>
        <Button
          variant="primary"
          size="sm"
          icon={<Minus size={isMobile ? 12 : 14} strokeWidth={2.5} />}
          onClick={decrease}
          disabled={!canDecrease}
        >
          {step}
        </Button>

        <div style={minerCount}>
          <span style={minerNumber}>{miners}</span>
          <span style={minerLabel}>{t("difficulty.miners")}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={isMobile ? 12 : 14} strokeWidth={2.5} />}
          onClick={increase}
          disabled={!canIncrease}
        >
          {step}
        </Button>
      </div>

      <div style={metricsRow}>
        <div style={metric}>
          <Caption
            tone="muted"
            size="xs"
            icon={<Target size={isMobile ? 11 : 13} strokeWidth={2} />}
          >
            {t("difficulty.hashTarget")}
          </Caption>
          <span style={metricValue}>{target}…</span>
        </div>

        <div style={metric}>
          <Caption
            tone="muted"
            size="xs"
            icon={<Timer size={isMobile ? 11 : 13} strokeWidth={2} />}
          >
            {t("difficulty.avgTime")}
          </Caption>
          <span style={fixedMetricValue}>10 min</span>
        </div>
      </div>

      <FeedbackPanel tone="info">
        {t("difficulty.hint.prefix")} <b>{t("difficulty.hint.emphasis")}</b>
        {t("difficulty.hint.suffix")}
      </FeedbackPanel>
    </SurfaceCard>
  );
};
