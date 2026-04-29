import { type FC, type CSSProperties } from "react";
import { usePageTheme, useBreakpoint } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useByzantineGenerals } from "../hooks";
import { Swords, ShieldOff, RotateCcw, Castle } from "lucide-react";

const SUFFIXES = ["A", "B", "C", "D"];

export const ByzantineGenerals: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { generals, revealed, chooseDecision, reset } = useByzantineGenerals();

  const labels = SUFFIXES.map((s) => `${t("byzantine.general")} ${s}`);
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const container: CSSProperties = {
    ...mono, display: "flex", flexDirection: "column", gap: "1rem",
    padding: isMobile ? "1.25rem" : "1.5rem", borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${colors.base.background.primary})`,
    margin: isMobile ? "1.5rem 0" : "2rem 0",
  };

  const header: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.72rem" : "0.8rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.05em", color: world.text.secondary,
    display: "flex", alignItems: "center", gap: "0.5rem",
  };

  const cityStyle: CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "0.35rem", padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
    background: withOpacity(world.background.secondary, 0.06),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
    fontSize: isMobile ? "0.7rem" : "0.75rem", color: colors.base.text.secondary,
  };

  const grid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
    gap: "0.75rem",
  };

  const generalCard = (corrupted: boolean): CSSProperties => {
    const borderColor = !revealed ? world.border.secondary
      : corrupted ? colors.semantic.error.text : colors.semantic.success.text;
    return {
      display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
      padding: "0.75rem 0.5rem", borderRadius: "0.75rem",
      background: withOpacity(borderColor, 0.06),
      border: `1px solid ${withOpacity(borderColor, revealed ? 0.3 : 0.12)}`,
      transition: "all 0.4s var(--ease-smooth)",
    };
  };

  const decisionBadge = (decision: string | null, corrupted: boolean): CSSProperties => ({
    ...mono, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.03em",
    padding: "0.2rem 0.5rem", borderRadius: "1rem",
    background: !revealed ? "transparent" : withOpacity(
      corrupted ? colors.semantic.error.text : colors.semantic.success.text, 0.12,
    ),
    color: !decision ? colors.base.text.secondary
      : corrupted && revealed ? colors.semantic.error.text
      : revealed ? colors.semantic.success.text : colors.base.text.primary,
    opacity: decision ? 1 : 0.4,
  });

  const corruptedTag: CSSProperties = {
    ...mono, fontSize: "0.5rem", fontStyle: "italic",
    color: colors.semantic.error.text, opacity: 0.8,
  };

  const btnBase: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.72rem" : "0.78rem", fontWeight: 600,
    padding: isMobile ? "0.6rem 1.25rem" : "0.7rem 1.5rem", borderRadius: "0.75rem",
    letterSpacing: "0.04em", cursor: "pointer", display: "flex",
    alignItems: "center", gap: "0.5rem", justifyContent: "center",
    transition: "all 0.3s var(--ease-smooth)", border: "none",
  };

  const actionBtn = (variant: "attack" | "retreat"): CSSProperties => ({
    ...btnBase,
    border: `1.5px solid ${variant === "attack" ? colors.semantic.error.border : world.border.secondary}`,
    background: `linear-gradient(135deg, ${withOpacity(variant === "attack" ? colors.semantic.error.text : world.background.secondary, 0.12)}, transparent)`,
    color: variant === "attack" ? colors.semantic.error.text : world.text.primary,
  });

  const feedbackBox: CSSProperties = {
    ...mono, fontSize: isMobile ? "0.7rem" : "0.75rem", lineHeight: 1.6,
    display: "flex", flexDirection: "column", gap: "0.35rem",
    padding: "0.75rem 1rem", borderRadius: "0.75rem",
    color: colors.base.text.primary,
    background: withOpacity(colors.semantic.error.text, 0.06),
    border: `1px solid ${withOpacity(colors.semantic.error.text, 0.15)}`,
  };

  const decisionLabel = (decision: string | null) =>
    !decision ? "?" : decision === "attack" ? t("byzantine.attackLabel") : t("byzantine.retreatLabel");

  return (
    <div className="gradient-border" style={{ ...container, "--border-glow-color": revealed ? colors.semantic.error.border : world.border.secondary } as CSSProperties}>
      <div style={header}>
        <Castle size={isMobile ? 16 : 18} strokeWidth={2} />
        {t("byzantine.title")}
      </div>

      <div style={cityStyle}>
        <Castle size={14} strokeWidth={2} />
        {t("byzantine.city")}
      </div>

      <div style={grid}>
        {generals.map((g, i) => (
          <div key={g.id} style={generalCard(g.corrupted)}>
            <span style={{ fontSize: isMobile ? "1.5rem" : "1.75rem" }}>⚔️</span>
            <span style={{ ...mono, fontSize: "0.65rem", fontWeight: 600, color: colors.base.text.primary }}>
              {labels[i]}
            </span>
            <span style={decisionBadge(g.decision, g.corrupted)}>
              {decisionLabel(g.decision)}
            </span>
            {revealed && g.corrupted && (
              <span style={corruptedTag}>{t("byzantine.alteredMessage")}</span>
            )}
          </div>
        ))}
      </div>

      {!revealed && (
        <>
          <div style={{ ...mono, fontSize: "0.7rem", color: colors.base.text.secondary, textAlign: "center" }}>
            {t("byzantine.prompt")}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={actionBtn("attack")} onClick={() => chooseDecision("attack")}>
              <Swords size={14} strokeWidth={2} /> {t("byzantine.attack")}
            </button>
            <button style={actionBtn("retreat")} onClick={() => chooseDecision("retreat")}>
              <ShieldOff size={14} strokeWidth={2} /> {t("byzantine.retreat")}
            </button>
          </div>
        </>
      )}

      {revealed && (
        <>
          <div style={feedbackBox}>
            <span style={{ fontWeight: 700 }}>{t("byzantine.failureTitle")}</span>
            <span>{t("byzantine.failureDetail")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button style={{ ...btnBase, border: `1.5px solid ${colors.base.border.secondary}`, background: "transparent", color: colors.base.text.secondary }} onClick={reset}>
              <RotateCcw size={14} strokeWidth={2} /> {t("byzantine.retry")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
