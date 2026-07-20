import { type CSSProperties, type FC } from "react";

import { BRAND, Button, Caption, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { UTXO_GRAPH_SCENARIO } from "../data";
import { useUtxoGraph } from "../hooks";
import type { UtxoGraphMode } from "../types";

import { UtxoCoin } from "./UtxoCoin";

import { ArrowDown, RefreshCw, Wallet, Zap } from "@icons";

// Read on call, not on import: a module-level dereference of an imported
// binding is what turns an import cycle from harmless into fatal.
const mono = (): CSSProperties => ({ fontFamily: BRAND.fonts.mono });

/** Trim trailing zeros, suffix the bitcoin sign. 1 → "1 BTC", 0.4999 → "0.4999 BTC". */
const fmt = (n: number) => `${+n.toFixed(8)} BTC`;

export const UtxoGraph: FC<{ mode?: UtxoGraphMode }> = ({ mode = "intro" }) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { ran, run, reset } = useUtxoGraph();

  const accent = world.border.secondary;
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error.text;
  const baseTextSecondary = colors.base.text.secondary;

  const { inputs, outputs } = UTXO_GRAPH_SCENARIO;
  const inputTotal = inputs.reduce((s, c) => s + c.amount, 0);
  const yourChange = outputs.filter((o) => o.kind === "change").reduce((s, c) => s + c.amount, 0);
  // Wallet mode: the "balance" is recomputed from the UTXOs you still control -
  // your two coins before, just the change coin after the transaction.
  const walletBalance = ran ? yourChange : inputTotal;

  const caption =
    mode === "keys"
      ? t("utxoGraph.captionKeys")
      : mode === "wallet"
        ? t("utxoGraph.captionWallet")
        : t("utxoGraph.captionIntro");

  const sectionLabel: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(baseTextSecondary, 0.6),
  };

  const row: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
    justifyContent: "center",
  };

  const txBox: CSSProperties = {
    ...mono(),
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.3rem 0.8rem",
    borderRadius: 0,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.07em",
    color: ran ? accent : withOpacity(accent, 0.5),
    border: `1px solid ${withOpacity(accent, ran ? 0.4 : 0.18)}`,
    background: withOpacity(accent, ran ? 0.1 : 0.04),
    transition: "all 0.4s var(--ease-smooth)",
  };

  const connector: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    color: withOpacity(accent, ran ? 0.7 : 0.3),
    transition: "color 0.4s var(--ease-smooth)",
  };

  const balancePill: CSSProperties = {
    ...mono(),
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.25rem 0.6rem",
    borderRadius: 0,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: accent,
    border: `1px solid ${withOpacity(accent, 0.35)}`,
    background: withOpacity(accent, 0.1),
    transition: "all 0.4s var(--ease-smooth)",
  };

  const captionStyle: CSSProperties = {
    margin: 0,
    fontSize: typo.note.fontSize,
    lineHeight: 1.55,
    fontStyle: "italic",
    textAlign: "center",
    color: withOpacity(baseTextSecondary, 0.95),
  };

  return (
    <SurfaceCard
      glowColor={accent}
      gap="0.95rem"
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={{ overflow: "hidden" }}
    >
      <Caption
        tone="accent"
        size="md"
        icon={<Wallet size={isMobile ? 15 : 16} strokeWidth={2} style={{ color: accent }} />}
      >
        {t("utxoGraph.title")}
      </Caption>

      {mode === "wallet" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            flexWrap: "wrap",
            padding: "0.5rem 0.7rem",
            borderRadius: 0,
            border: `1px solid ${withOpacity(accent, 0.16)}`,
            background: withOpacity(accent, 0.03),
          }}
        >
          <span
            style={{ ...mono(), fontSize: typo.note.fontSize, fontWeight: 500, color: world.text.primary }}
          >
            {t("utxoGraph.walletTitle")}
          </span>
          <span style={balancePill}>
            {t("utxoGraph.balance")} {fmt(walletBalance)}
          </span>
        </div>
      )}

      {/* Inputs - existing UTXOs, consumed when the transaction runs */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "center" }}
      >
        <span style={sectionLabel}>{t("utxoGraph.inputs")}</span>
        <div style={row}>
          {inputs.map((c) => (
            <UtxoCoin
              key={c.id}
              amount={fmt(c.amount)}
              sublabel={mode === "keys" ? t("utxoGraph.lockedBy") : undefined}
              mode={mode}
              state={ran ? "consumed" : "idle"}
              accent={accent}
              successColor={successColor}
              errorColor={errorColor}
              baseTextSecondary={baseTextSecondary}
            />
          ))}
        </div>
      </div>

      {/* Transaction */}
      <div style={connector}>
        <ArrowDown size={14} strokeWidth={2} />
        <div style={txBox}>
          <Zap size={11} strokeWidth={2.2} />
          {t("utxoGraph.tx")}
        </div>
        <ArrowDown size={14} strokeWidth={2} />
      </div>

      {/* Outputs - new UTXOs, created by the transaction */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "center" }}
      >
        <span style={sectionLabel}>{t("utxoGraph.outputs")}</span>
        <div
          style={{
            ...row,
            opacity: ran ? 1 : 0.25,
            transform: ran ? "translateY(0)" : "translateY(6px)",
            transition: "all 0.45s var(--ease-smooth) 0.2s",
          }}
        >
          {outputs.map((c) => (
            <UtxoCoin
              key={c.id}
              amount={fmt(c.amount)}
              sublabel={t(c.kind === "recipient" ? "utxoGraph.recipient" : "utxoGraph.change")}
              mode={mode}
              state={ran ? "created" : "idle"}
              accent={accent}
              successColor={successColor}
              errorColor={errorColor}
              baseTextSecondary={baseTextSecondary}
            />
          ))}
        </div>
      </div>

      <p style={captionStyle}>{caption}</p>

      <Button
        variant={ran ? "secondary" : "primary"}
        color={accent}
        icon={ran ? <RefreshCw size={13} strokeWidth={2} /> : <Zap size={14} strokeWidth={2.2} />}
        onClick={ran ? reset : run}
        style={{ alignSelf: "center" }}
      >
        {ran ? t("utxoGraph.replay") : t("utxoGraph.run")}
      </Button>
    </SurfaceCard>
  );
};
