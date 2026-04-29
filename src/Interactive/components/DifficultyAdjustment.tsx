import { type FC, type CSSProperties } from "react";
import { usePageTheme, useBreakpoint } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useDifficultyAdjustment } from "../hooks";
import { Minus, Plus, Users, Target, Timer } from "lucide-react";

export const DifficultyAdjustment: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { miners, target, canDecrease, canIncrease, decrease, increase, step } = useDifficultyAdjustment();

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const container: CSSProperties = {
    ...mono, display: "flex", flexDirection: "column", gap: "0.85rem",
    padding: isMobile ? "1.25rem" : "1.5rem", borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    margin: isMobile ? "1.5rem 0" : "2rem 0",
  };

  const title: CSSProperties = {
    ...mono, display: "flex", alignItems: "center", gap: "0.5rem",
    fontSize: isMobile ? "0.72rem" : "0.8rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.05em", color: world.text.secondary,
  };

  const controlRow: CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: isMobile ? "0.5rem" : "0.75rem",
    padding: "0.85rem 1rem", borderRadius: "0.75rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
  };

  const stepBtn = (disabled: boolean): CSSProperties => ({
    ...mono, fontSize: isMobile ? "0.68rem" : "0.74rem", fontWeight: 700,
    padding: isMobile ? "0.45rem 0.75rem" : "0.55rem 0.9rem", borderRadius: "0.55rem",
    letterSpacing: "0.03em", cursor: disabled ? "not-allowed" : "pointer",
    display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "center",
    transition: "all 0.3s var(--ease-smooth)",
    border: `1.5px solid ${world.border.secondary}`,
    background: `linear-gradient(135deg, ${withOpacity(world.background.secondary, 0.15)}, transparent)`,
    color: world.text.primary,
    opacity: disabled ? 0.35 : 1,
  });

  const minerCount: CSSProperties = {
    ...mono, display: "flex", flexDirection: "column", alignItems: "center",
    gap: "0.1rem", flex: 1, textAlign: "center", minWidth: 0,
  };

  const minerNumber: CSSProperties = {
    ...mono, fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 700,
    color: world.text.primary, letterSpacing: "0.03em",
  };

  const minerLabel: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.55rem" : "0.6rem",
    color: colors.base.text.secondary, textTransform: "uppercase", letterSpacing: "0.05em",
  };

  const metricsRow: CSSProperties = {
    display: "flex", gap: isMobile ? "0.6rem" : "0.85rem",
    flexDirection: isMobile ? "column" : "row",
  };

  const metric: CSSProperties = {
    ...mono, flex: 1, display: "flex", flexDirection: "column", gap: "0.35rem",
    padding: "0.75rem 0.9rem", borderRadius: "0.65rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
    minWidth: 0,
  };

  const metricLabel: CSSProperties = {
    ...mono, display: "flex", alignItems: "center", gap: "0.4rem",
    fontSize: isMobile ? "0.58rem" : "0.62rem", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.04em", color: colors.base.text.secondary,
  };

  const metricValue: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.95rem" : "1.05rem", fontWeight: 700,
    color: world.text.primary, letterSpacing: "0.05em",
    transition: "all 0.3s var(--ease-smooth)",
  };

  const fixedMetricValue: CSSProperties = {
    ...metricValue, color: colors.semantic.success.text,
  };

  const hint: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.6rem" : "0.65rem", lineHeight: 1.55,
    padding: "0.6rem 0.85rem", borderRadius: "0.6rem",
    color: colors.base.text.primary,
    background: withOpacity(colors.semantic.info.text, 0.06),
    border: `1px solid ${withOpacity(colors.semantic.info.text, 0.15)}`,
  };

  return (
    <div className="gradient-border" style={{ ...container, "--border-glow-color": world.border.secondary } as CSSProperties}>
      <div style={title}>
        <Users size={isMobile ? 16 : 18} strokeWidth={2} />
        {t("difficulty.title")}
      </div>

      <div style={controlRow}>
        <button style={stepBtn(!canDecrease)} onClick={decrease} disabled={!canDecrease}>
          <Minus size={isMobile ? 12 : 14} strokeWidth={2.5} />
          {step}
        </button>

        <div style={minerCount}>
          <span style={minerNumber}>{miners}</span>
          <span style={minerLabel}>{t("difficulty.miners")}</span>
        </div>

        <button style={stepBtn(!canIncrease)} onClick={increase} disabled={!canIncrease}>
          <Plus size={isMobile ? 12 : 14} strokeWidth={2.5} />
          {step}
        </button>
      </div>

      <div style={metricsRow}>
        <div style={metric}>
          <span style={metricLabel}>
            <Target size={isMobile ? 11 : 13} strokeWidth={2} />
            {t("difficulty.hashTarget")}
          </span>
          <span style={metricValue}>{target}…</span>
        </div>

        <div style={metric}>
          <span style={metricLabel}>
            <Timer size={isMobile ? 11 : 13} strokeWidth={2} />
            {t("difficulty.avgTime")}
          </span>
          <span style={fixedMetricValue}>10 min</span>
        </div>
      </div>

      <div style={hint}>
        {t("difficulty.hint.prefix")} <b>{t("difficulty.hint.emphasis")}</b>{t("difficulty.hint.suffix")}
      </div>
    </div>
  );
};
