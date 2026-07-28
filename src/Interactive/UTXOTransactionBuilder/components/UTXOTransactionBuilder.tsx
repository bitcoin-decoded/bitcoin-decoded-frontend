import { type CSSProperties, type FC } from "react";

import { Badge, Button, Caption, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { fmtBTC, sanitizeAmount } from "../helpers";
import { useUTXOTransactionBuilder } from "../hooks";
import type { CardTone } from "../types";

import { TxCard } from "./TxCard";

import { DoodleBulb, DoodleCoin, DoodleFlowDown, DoodleKey, DoodleMining, DoodlePaperPlane, DoodleWallet } from "@doodle";
import { CheckCircle, XCircle } from "@icons";

type Props = {
  lockedAmount?: string;
  onComplete?: () => void;
};

export const UTXOTransactionBuilder: FC<Props> = ({ lockedAmount, onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  // same accent as TransactionModelComparison (mode="bitcoin") and UtxoGraph
  const accentColor = world.text.secondary;
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error.text;

  const {
    utxos,
    selectedIds,
    toggle,
    totalInput,
    rawAmount,
    setRawAmount,
    parsedAmount,
    fees,
    change,
    hasAmount,
    hasSelection,
    isInsufficient,
    isValid,
    reset,
  } = useUTXOTransactionBuilder(lockedAmount, onComplete);

  const toneColors: Record<CardTone, { color: string; border: string; bg: string }> = {
    accent: {
      color: accentColor,
      border: withOpacity(accentColor, 0.3),
      bg: withOpacity(accentColor, 0.05),
    },
    success: {
      color: successColor,
      border: withOpacity(successColor, 0.3),
      bg: withOpacity(successColor, 0.05),
    },
    muted: {
      color: colors.base.text.secondary,
      border: colors.base.border.tertiary,
      bg: withOpacity(colors.base.text.secondary, 0.04),
    },
  };

  const iconSize = isMobile ? 20 : 22;

  const chipButton = (selected: boolean): CSSProperties => ({
    ...typo.figure,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.45rem 0.7rem",
    border: `1px solid ${withOpacity(accentColor, selected ? 0.6 : 0.25)}`,
    background: withOpacity(accentColor, selected ? 0.1 : 0.03),
    color: selected ? accentColor : colors.base.text.primary,
    transition: "border-color 0.25s var(--ease-smooth), background 0.25s var(--ease-smooth), color 0.25s var(--ease-smooth)",
    whiteSpace: "nowrap",
    maxWidth: "100%",
  });

  const hintRow: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.45rem",
    marginTop: "0.55rem",
    minWidth: 0,
  };

  const totalRow: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0 0.1rem",
    minWidth: 0,
  };

  const input: CSSProperties = {
    ...typo.figure,
    // 16px keeps iOS from zooming the field on focus
    fontSize: "1rem",
    width: "100%",
    maxWidth: "100%",
    padding: "0.55rem 0.85rem",
    border: `1px solid ${withOpacity(isInsufficient ? errorColor : accentColor, isInsufficient ? 0.6 : 0.3)}`,
    background: withOpacity(accentColor, 0.04),
    color: colors.base.text.primary,
    transition: "border-color 0.25s var(--ease-smooth)",
    boxSizing: "border-box",
    touchAction: "manipulation",
  };

  return (
    <SurfaceCard gap="1.5rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={{ overflow: "hidden" }}>
      <Caption
        size="md"
        color={accentColor}
        icon={<DoodleCoin size={iconSize} style={{ color: accentColor }} />}
        style={{ minWidth: 0, overflowWrap: "anywhere" }}
      >
        {t("utxoBuilder.title")}
      </Caption>

      <div style={{ minWidth: 0 }}>
        <Caption size="xs" tone="world" icon={<DoodleWallet size={20} />} as="div" style={{ marginBottom: "0.5rem" }}>
          {t("utxoBuilder.step1")}
        </Caption>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {utxos.map((u) => {
            const selected = selectedIds.includes(u.id);
            return (
              <button key={u.id} onClick={() => toggle(u.id)} style={chipButton(selected)}>
                <DoodleCoin
                  size={18}
                  style={{ color: selected ? accentColor : colors.base.text.secondary, opacity: selected ? 1 : 0.6 }}
                />
                {fmtBTC(u.amount)}
              </button>
            );
          })}
        </div>
        <div style={hintRow}>
          <DoodleBulb size={18} style={{ flexShrink: 0, color: accentColor }} />
          <span style={{ ...typo.micro, color: colors.base.text.secondary, minWidth: 0, overflowWrap: "anywhere" }}>
            {t("utxoBuilder.utxoHint")}
          </span>
        </div>
      </div>

      <div style={{ minWidth: 0 }}>
        <Caption size="xs" tone="world" icon={<DoodlePaperPlane size={20} />} as="div" style={{ marginBottom: "0.5rem" }}>
          {t("utxoBuilder.step2")}
        </Caption>
        <input
          type="text"
          inputMode="decimal"
          placeholder={t("utxoBuilder.placeholder")}
          value={rawAmount}
          readOnly={lockedAmount != null}
          onChange={(e) => setRawAmount(sanitizeAmount(e.target.value))}
          style={input}
        />
      </div>

      {(hasSelection || hasAmount) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: 0 }}>
          {hasSelection && (
            <>
              <Caption size="xs" tone="muted" as="div">
                {t("utxoBuilder.inputs")}
              </Caption>
              {selectedIds.map((id) => {
                const u = utxos.find((x) => x.id === id)!;
                return (
                  <TxCard
                    key={id}
                    icon={<DoodleCoin size={20} />}
                    title={`${t("utxoBuilder.coinLabel")} #${id + 1}`}
                    amount={`+${fmtBTC(u.amount)}`}
                    tone="accent"
                    toneColors={toneColors}
                  />
                );
              })}
              <div style={totalRow}>
                <span style={{ ...typo.micro, color: colors.base.text.secondary, minWidth: 0, overflowWrap: "anywhere" }}>
                  {t("utxoBuilder.totalRow")}
                </span>
                <span style={{ ...typo.figure, color: colors.base.text.primary, flexShrink: 0, whiteSpace: "nowrap" }}>
                  {fmtBTC(totalInput)}
                </span>
              </div>
            </>
          )}

          {hasSelection && hasAmount && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: withOpacity(accentColor, isValid ? 0.7 : 0.35),
                transition: "color 0.35s var(--ease-smooth)",
              }}
            >
              <DoodleFlowDown size={isMobile ? 24 : 28} />
            </div>
          )}

          {hasAmount && (
            <>
              <Caption size="xs" tone="muted" as="div">
                {t("utxoBuilder.outputs")}
              </Caption>

              {isValid && (
                <TxCard
                  icon={<DoodleKey size={20} />}
                  title={t("utxoBuilder.newUtxoRecipient")}
                  desc={t("utxoBuilder.recipientDesc")}
                  amount={fmtBTC(parsedAmount)}
                  tone="success"
                  toneColors={toneColors}
                />
              )}

              {isValid && change > 0 && (
                <TxCard
                  icon={<DoodleWallet size={20} />}
                  title={t("utxoBuilder.newUtxoNicolas")}
                  desc={t("utxoBuilder.changeDesc")}
                  amount={fmtBTC(change)}
                  tone="accent"
                  toneColors={toneColors}
                />
              )}

              {fees > 0 && isValid && (
                <TxCard
                  icon={<DoodleMining size={20} />}
                  title={t("utxoBuilder.feesImplicit")}
                  desc={t("utxoBuilder.feesDesc")}
                  amount={fmtBTC(fees)}
                  tone="muted"
                  toneColors={toneColors}
                  amountMuted
                />
              )}
            </>
          )}

          <Badge
            tone={isValid ? "success" : isInsufficient ? "error" : "neutral"}
            icon={
              isValid ? (
                <CheckCircle size={12} strokeWidth={2} style={{ flexShrink: 0 }} />
              ) : isInsufficient ? (
                <XCircle size={12} strokeWidth={2} style={{ flexShrink: 0 }} />
              ) : undefined
            }
            style={{ alignSelf: "flex-start", padding: "0.45rem 0.7rem", overflowWrap: "anywhere", whiteSpace: "normal" }}
          >
            {isValid
              ? t("utxoBuilder.valid")
              : isInsufficient
                ? t("utxoBuilder.insufficient")
                : t("utxoBuilder.selectHint")}
          </Badge>
        </div>
      )}

      <Button variant="secondary" size="sm" onClick={reset} style={{ alignSelf: "flex-end" }}>
        {t("utxoBuilder.reset")}
      </Button>
    </SurfaceCard>
  );
};
