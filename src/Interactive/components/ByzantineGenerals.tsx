import { type FC, type CSSProperties } from "react";
import { Swords, ShieldOff, RotateCcw, Castle } from "lucide-react";

import { Button, Caption, SurfaceCard, usePageTheme, useBreakpoint } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useByzantineGenerals } from "../hooks";

const SUFFIXES = ["A", "B", "C", "D"];

export const ByzantineGenerals: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { generals, revealed, chooseDecision, reset } = useByzantineGenerals();

  const labels = SUFFIXES.map((s) => `${t("byzantine.general")} ${s}`);
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

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
    <SurfaceCard
      glowColor={revealed ? colors.semantic.error.border : world.border.secondary}
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={mono}
    >
      <Caption tone="world" size="md" icon={<Castle size={isMobile ? 16 : 18} strokeWidth={2} />}>
        {t("byzantine.title")}
      </Caption>

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
            <Button
              variant="primary"
              color={colors.semantic.error.text}
              icon={<Swords size={14} strokeWidth={2} />}
              onClick={() => chooseDecision("attack")}
            >
              {t("byzantine.attack")}
            </Button>
            <Button
              variant="primary"
              icon={<ShieldOff size={14} strokeWidth={2} />}
              onClick={() => chooseDecision("retreat")}
            >
              {t("byzantine.retreat")}
            </Button>
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
            <Button
              variant="secondary"
              icon={<RotateCcw size={14} strokeWidth={2} />}
              onClick={reset}
            >
              {t("byzantine.retry")}
            </Button>
          </div>
        </>
      )}
    </SurfaceCard>
  );
};
