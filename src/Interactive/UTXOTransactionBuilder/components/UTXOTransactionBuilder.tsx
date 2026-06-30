import { type CSSProperties, type FC } from "react";

import { Badge,
BRAND,   Button,
  Caption,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { fmtBTC, sanitizeAmount } from "../helpers";
import { useUTXOTransactionBuilder } from "../hooks";
import type { CardTone } from "../types";

import { TxCard } from "./TxCard";

import {
  ArrowDown,
  CheckCircle,
  Coins,
  Info,
  Pickaxe,
  RefreshCw,
  Send,
  User,
  Wallet,
  XCircle,
} from "@icons";

// ── Card (unified, used for inputs, outputs, fees) ──────────────────────────

// ── Main component ──────────────────────────────────────────────────────────

type Props = {
  lockedAmount?: string;
  /** Fired once the reader builds a valid transaction (gates the tool block). */
  onComplete?: () => void;
};

export const UTXOTransactionBuilder: FC<Props> = ({ lockedAmount, onComplete }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  const accentColor = world.border.secondary;
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error.text;
  const mutedColor = withOpacity(colors.base.text.secondary, 0.7);

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
      border: withOpacity(accentColor, 0.22),
      bg: withOpacity(accentColor, 0.04),
    },
    success: {
      color: isValid ? successColor : mutedColor,
      border: withOpacity(successColor, isValid ? 0.32 : 0.1),
      bg: withOpacity(successColor, isValid ? 0.05 : 0.02),
    },
    muted: {
      color: mutedColor,
      border: withOpacity(colors.base.border.secondary, 0.18),
      bg: withOpacity(colors.base.background.secondary, 0.03),
    },
  };

  const amountFont = BRAND.fontSize.body;
  const iconSize = isMobile ? 12 : 13;

  return (
    <SurfaceCard
      gap="1.1rem"
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={{ ...mono, overflow: "hidden" }}
    >
      {/* Header */}
      <Caption
        tone="accent"
        size="md"
        icon={<Coins size={isMobile ? 15 : 16} strokeWidth={2} style={{ color: accentColor }} />}
        style={{ minWidth: 0, overflowWrap: "anywhere" }}
      >
        {t("utxoBuilder.title")}
      </Caption>

      {/* Step 1 - UTXO selection */}
      <div style={{ minWidth: 0 }}>
        <Caption
          tone="world"
          size="xs"
          icon={<Wallet size={iconSize} strokeWidth={2} />}
          as="div"
          style={{ marginBottom: "0.5rem" }}
        >
          {t("utxoBuilder.step1")}
        </Caption>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {utxos.map((u) => {
            const selected = selectedIds.includes(u.id);
            return (
              <button
                key={u.id}
                onClick={() => toggle(u.id)}
                style={{
                  ...mono,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.4rem 0.7rem",
                  borderRadius: 0,
                  fontSize: BRAND.fontSize.note,
                  fontWeight: 500,
                  border: `1px solid ${withOpacity(selected ? accentColor : world.border.secondary, selected ? 0.7 : 0.25)}`,
                  background: selected
                    ? withOpacity(accentColor, 0.12)
                    : withOpacity(world.background.secondary, 0.04),
                  color: selected ? accentColor : world.text.primary,
                  transition: "all 0.25s var(--ease-smooth)",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                <Coins size={11} strokeWidth={2} style={{ opacity: selected ? 1 : 0.5 }} />
                {fmtBTC(u.amount)}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.4rem",
            marginTop: "0.55rem",
            fontSize: BRAND.fontSize.note,
            lineHeight: 1.5,
            color: withOpacity(colors.base.text.secondary, 0.65),
            minWidth: 0,
            overflowWrap: "anywhere",
          }}
        >
          <Info size={11} strokeWidth={2} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
          <span style={{ minWidth: 0 }}>{t("utxoBuilder.utxoHint")}</span>
        </div>
      </div>

      {/* Step 2 - Amount */}
      <div style={{ minWidth: 0 }}>
        <Caption
          tone="world"
          size="xs"
          icon={<Send size={iconSize} strokeWidth={2} />}
          as="div"
          style={{ marginBottom: "0.5rem" }}
        >
          {t("utxoBuilder.step2")}
        </Caption>
        <input
          type="text"
          inputMode="decimal"
          placeholder={t("utxoBuilder.placeholder")}
          value={rawAmount}
          readOnly={lockedAmount != null}
          onChange={(e) => setRawAmount(sanitizeAmount(e.target.value))}
          style={{
            ...mono,
            width: "100%",
            maxWidth: "100%",
            padding: "0.55rem 0.85rem",
            borderRadius: 0,
            fontSize: isMobile ? "1rem" : BRAND.fontSize.body,
            fontWeight: 500,
            border: `1px solid ${withOpacity(isInsufficient ? errorColor : accentColor, isInsufficient ? 0.6 : 0.3)}`,
            background: withOpacity(world.background.secondary, 0.05),
            color: world.text.primary,
            outline: "none",
            transition: "border-color 0.25s var(--ease-smooth)",
            boxSizing: "border-box",
            touchAction: "manipulation",
          }}
        />
      </div>

      {/* Transaction panel */}
      {(hasSelection || hasAmount) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: 0 }}>
          {/* Inputs */}
          {hasSelection && (
            <>
              <Caption
                tone="muted"
                size="xs"
                color={withOpacity(colors.base.text.secondary, 0.5)}
                as="div"
              >
                {t("utxoBuilder.inputs")}
              </Caption>
              {selectedIds.map((id) => {
                const u = utxos.find((x) => x.id === id)!;
                return (
                  <TxCard
                    key={id}
                    icon={<Coins size={12} strokeWidth={2} />}
                    title={`${t("utxoBuilder.coinLabel")} #${id + 1}`}
                    desc="Nicolas"
                    amount={`+${fmtBTC(u.amount)}`}
                    tone="accent"
                    toneColors={toneColors}
                    amountFontSize={amountFont}
                    baseTextSecondary={colors.base.text.secondary}
                  />
                );
              })}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: BRAND.fontSize.note,
                  color: colors.base.text.secondary,
                  padding: "0 0.1rem",
                  minWidth: 0,
                }}
              >
                <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>
                  {t("utxoBuilder.totalRow")}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    color: accentColor,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {fmtBTC(totalInput)}
                </span>
              </div>
            </>
          )}

          {/* Divider */}
          {hasSelection && hasAmount && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: withOpacity(colors.base.text.secondary, 0.3),
                padding: "0.1rem 0",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: withOpacity(world.border.secondary, 0.12),
                }}
              />
              <ArrowDown size={11} strokeWidth={2} style={{ flexShrink: 0 }} />
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: withOpacity(world.border.secondary, 0.12),
                }}
              />
            </div>
          )}

          {/* Outputs */}
          {hasAmount && (
            <>
              <Caption
                tone="muted"
                size="xs"
                color={withOpacity(colors.base.text.secondary, 0.5)}
                as="div"
              >
                {t("utxoBuilder.outputs")}
              </Caption>

              {isValid && (
                <TxCard
                  icon={<User size={12} strokeWidth={2} />}
                  title={t("utxoBuilder.newUtxoRecipient")}
                  desc={isValid ? t("utxoBuilder.recipientDesc") : "test"}
                  amount={fmtBTC(parsedAmount)}
                  tone="success"
                  toneColors={toneColors}
                  amountFontSize={amountFont}
                  baseTextSecondary={colors.base.text.secondary}
                />
              )}

              {isValid && change > 0 && (
                <TxCard
                  icon={<Wallet size={12} strokeWidth={2} />}
                  title={t("utxoBuilder.newUtxoNicolas")}
                  desc={t("utxoBuilder.changeDesc")}
                  amount={fmtBTC(change)}
                  tone="accent"
                  toneColors={toneColors}
                  amountFontSize={amountFont}
                  baseTextSecondary={colors.base.text.secondary}
                />
              )}

              {fees > 0 && isValid && (
                <TxCard
                  icon={<Pickaxe size={12} strokeWidth={2} />}
                  title={t("utxoBuilder.feesImplicit")}
                  desc={t("utxoBuilder.feesDesc")}
                  amount={fmtBTC(fees)}
                  tone="muted"
                  toneColors={toneColors}
                  amountFontSize={BRAND.fontSize.note}
                  amountOpacity={0.75}
                  baseTextSecondary={colors.base.text.secondary}
                />
              )}
            </>
          )}

          {/* Status badge */}
          <Badge
            tone={isValid ? "success" : isInsufficient ? "error" : "neutral"}
            icon={
              isValid ? (
                <CheckCircle size={11} strokeWidth={2} style={{ flexShrink: 0 }} />
              ) : isInsufficient ? (
                <XCircle size={11} strokeWidth={2} style={{ flexShrink: 0 }} />
              ) : undefined
            }
            style={{
              alignSelf: "flex-start",
              padding: "0.45rem 0.7rem",
              overflowWrap: "anywhere",
              whiteSpace: "normal",
            }}
          >
            {isValid
              ? t("utxoBuilder.valid")
              : isInsufficient
                ? t("utxoBuilder.insufficient")
                : t("utxoBuilder.selectHint")}
          </Badge>
        </div>
      )}

      {/* Reset */}
      <Button
        variant="secondary"
        size="sm"
        icon={<RefreshCw size={11} strokeWidth={2} />}
        onClick={reset}
        style={{ alignSelf: "flex-end" }}
      >
        {t("utxoBuilder.reset")}
      </Button>
    </SurfaceCard>
  );
};
