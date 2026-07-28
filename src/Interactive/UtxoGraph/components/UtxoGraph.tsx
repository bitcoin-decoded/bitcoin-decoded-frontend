import { type CSSProperties, type FC } from "react";

import { Button, Caption, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { fmtBTC } from "../../helpers";
import { UTXO_GRAPH_SCENARIO } from "../data";
import { useUtxoGraph } from "../hooks";
import type { UtxoGraphMode } from "../types";

import { UtxoCoin } from "./UtxoCoin";

import { DoodleBulb, DoodleFlowDown, DoodleHierarchy } from "@doodle";

export const UtxoGraph: FC<{ mode?: UtxoGraphMode }> = ({ mode = "intro" }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];
  const { ran, run, reset } = useUtxoGraph();

  // same accent as TransactionModelComparison (mode="bitcoin")
  const accent = world.text.secondary;
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error.text;

  const { inputs, outputs } = UTXO_GRAPH_SCENARIO;
  const inputTotal = inputs.reduce((s, c) => s + c.amount, 0);
  const yourChange = outputs.filter((o) => o.kind === "change").reduce((s, c) => s + c.amount, 0);
  const walletBalance = ran ? yourChange : inputTotal;

  const caption =
    mode === "keys"
      ? t("utxoGraph.captionKeys")
      : mode === "wallet"
        ? t("utxoGraph.captionWallet")
        : t("utxoGraph.captionIntro");

  const iconSize = isMobile ? 20 : 22;

  const sectionPanel: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.55rem",
    alignItems: "center",
    padding: isMobile ? "0.7rem 0.6rem" : "0.85rem 0.9rem",
    background: withOpacity(accent, 0.04),
    border: `1px solid ${withOpacity(accent, 0.15)}`,
  };

  const sectionLabel: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: accent,
  };

  const row: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    justifyContent: "center",
  };

  const walletBar: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    flexWrap: "wrap",
    padding: "0.5rem 0.7rem",
    border: `1px solid ${withOpacity(accent, 0.16)}`,
    background: withOpacity(accent, 0.04),
  };

  const balancePill: CSSProperties = {
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.2rem 0.5rem",
    color: accent,
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    background: withOpacity(accent, 0.09),
  };

  // the takeaway only surfaces once the transaction has run, revealed gently
  const noteRow: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    padding: isMobile ? "0.6rem 0.7rem" : "0.7rem 0.85rem",
    background: withOpacity(accent, 0.05),
    border: `1px solid ${withOpacity(accent, 0.18)}`,
    opacity: ran ? 1 : 0,
    transform: ran ? "translateY(0)" : "translateY(6px)",
    transition: "opacity 0.5s var(--ease-smooth), transform 0.5s var(--ease-smooth)",
    pointerEvents: ran ? "auto" : "none",
  };

  return (
    <SurfaceCard gap="0.95rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={{ overflow: "hidden" }}>
      <Caption
        size="md"
        color={accent}
        icon={<DoodleHierarchy size={iconSize} style={{ color: accent }} />}
      >
        {t("utxoGraph.title")}
      </Caption>

      {mode === "wallet" && (
        <div style={walletBar}>
          <span style={{ ...typo.note, color: world.text.primary }}>{t("utxoGraph.walletTitle")}</span>
          <span style={balancePill}>
            {t("utxoGraph.balance")} {fmtBTC(walletBalance)}
          </span>
        </div>
      )}

      <div style={sectionPanel}>
        <span style={sectionLabel}>{t("utxoGraph.inputs")}</span>
        <div style={row}>
          {inputs.map((c) => (
            <UtxoCoin
              key={c.id}
              amount={fmtBTC(c.amount)}
              sublabel={mode === "keys" ? t("utxoGraph.lockedBy") : undefined}
              mode={mode}
              state={ran ? "consumed" : "idle"}
              accent={accent}
              successColor={successColor}
              errorColor={errorColor}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: withOpacity(accent, ran ? 0.85 : 0.4),
          transition: "color 0.4s var(--ease-smooth)",
        }}
      >
        <DoodleFlowDown size={isMobile ? 26 : 30} />
      </div>

      <div style={sectionPanel}>
        <span style={sectionLabel}>{t("utxoGraph.outputs")}</span>
        <div
          style={{
            ...row,
            opacity: ran ? 1 : 0,
            transform: ran ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.45s var(--ease-smooth) 0.2s, transform 0.45s var(--ease-smooth) 0.2s",
          }}
        >
          {outputs.map((c) => (
            <UtxoCoin
              key={c.id}
              amount={fmtBTC(c.amount)}
              sublabel={t(c.kind === "recipient" ? "utxoGraph.recipient" : "utxoGraph.change")}
              isChange={c.kind === "change"}
              mode={mode}
              state={ran ? "created" : "idle"}
              accent={accent}
              successColor={successColor}
              errorColor={errorColor}
            />
          ))}
        </div>
      </div>

      <div style={noteRow}>
        <DoodleBulb size={isMobile ? 18 : 20} style={{ flexShrink: 0, color: accent }} />
        <span style={{ ...typo.note, color: colors.base.text.secondary }}>{caption}</span>
      </div>

      <Button
        variant={ran ? "secondary" : "primary"}
        onClick={ran ? reset : run}
        style={{ alignSelf: "center" }}
      >
        {ran ? t("utxoGraph.replay") : t("utxoGraph.run")}
      </Button>
    </SurfaceCard>
  );
};
