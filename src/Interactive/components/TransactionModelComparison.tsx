import { type CSSProperties, type FC } from "react";

import {
  ArrowDown,
  Building2,
  CircleDollarSign,
  KeyRound,
  Lock,
  Pickaxe,
  RefreshCw,
  User,
  Wallet,
  Zap,
} from "lucide-react";

import { Badge, Button, Caption, useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { BANK, BTC } from "../data";
import { fmtBTC, fmtEur } from "../helpers";
import { useTransactionComparison } from "../hooks/useTransactionComparison";

export type ComparisonMode = "bank" | "bitcoin" | "compare";

// ── Component ─────────────────────────────────────────────────────────────────

export const TransactionModelComparison: FC<{ mode?: ComparisonMode }> = ({ mode = "compare" }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { phase, trigger, reset } = useTransactionComparison();

  const world = colors[moduleTheme];
  const bankAccent = colors.blue.border.secondary;
  const btcAccent = world.border.secondary;
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error?.text ?? "#ef4444";
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const isAfter = phase === "after";
  const iconSm = isMobile ? 11 : 12;

  // ── Shared card geometry ───────────────────────────────────────────────────

  const card = (accent: string): CSSProperties => ({
    ...mono,
    flex: isMobile ? "0 0 auto" : "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    overflow: "hidden",
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    background: `linear-gradient(170deg, ${withOpacity(accent, 0.06)}, ${colors.base.background.primary})`,
  });

  const cardHeader = (accent: string): CSSProperties => ({
    padding: isMobile ? "0.6rem 0.75rem 0.5rem" : "0.85rem 1rem 0.75rem",
    borderBottom: `1px solid ${withOpacity(accent, 0.12)}`,
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  });

  const cardHeaderRow: CSSProperties = { display: "flex", alignItems: "center", gap: "0.5rem" };

  const cardSubtitle: CSSProperties = {
    fontSize: isMobile ? "0.7rem" : "0.74rem",
    fontWeight: 600,
    color: world.text.primary,
  };

  const cardDescStyle: CSSProperties = {
    fontSize: "0.68rem",
    lineHeight: 1.5,
    color: colors.base.text.secondary,
    fontStyle: "italic",
  };

  const cardBody: CSSProperties = {
    padding: isMobile ? "0.55rem 0.75rem" : "0.85rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.35rem" : "0.55rem",
    flex: 1,
  };

  const cardFooter = (accent: string): CSSProperties => ({
    padding: isMobile ? "0.55rem 0.8rem" : "0.7rem 1rem",
    borderTop: `1px solid ${withOpacity(accent, 0.1)}`,
    background: withOpacity(accent, 0.04),
    fontSize: "0.68rem",
    lineHeight: 1.55,
    color: colors.base.text.secondary,
    fontStyle: "italic",
  });

  const keyText = (accent: string): CSSProperties => ({
    marginTop: "0.3rem",
    fontSize: isMobile ? "0.7rem" : "0.72rem",
    fontWeight: 700,
    fontStyle: "normal",
    color: accent,
    lineHeight: 1.4,
  });

  const sectionLabel = (accent: string, dimmed = false): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: "0.62rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    color: withOpacity(accent, dimmed ? 0.35 : 0.65),
    transition: "color 0.35s var(--ease-smooth)",
  });

  const divLine = (accent: string): CSSProperties => ({
    flex: 1,
    height: 1,
    background: withOpacity(accent, 0.18),
  });

  // ── Bank-card styles ───────────────────────────────────────────────────────

  const balanceRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.45rem 0.6rem",
    borderRadius: "0.55rem",
    background: withOpacity(bankAccent, 0.05),
    border: `1px solid ${withOpacity(bankAccent, 0.12)}`,
  };

  const balanceName: CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 600,
    color: world.text.primary,
    minWidth: "2.5rem",
  };

  const balanceBar = (_pct: number, accent: string): CSSProperties => ({
    flex: 1,
    height: "0.3rem",
    borderRadius: "0.2rem",
    background: withOpacity(accent, 0.12),
    overflow: "hidden",
    position: "relative",
  });

  const balanceFill = (pct: number, accent: string): CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: `${pct}%`,
    background: accent,
    borderRadius: "0.2rem",
    transition: "width 0.55s var(--ease-smooth)",
  });

  const balanceAmount = (color?: string): CSSProperties => ({
    fontSize: isMobile ? "0.74rem" : "0.78rem",
    fontWeight: 700,
    color: color ?? world.text.primary,
    minWidth: "2.8rem",
    textAlign: "right",
    transition: "color 0.4s var(--ease-smooth)",
  });

  const deltaBadge = (positive: boolean): CSSProperties => ({
    fontSize: "0.62rem",
    fontWeight: 700,
    padding: "0.12rem 0.4rem",
    borderRadius: "0.3rem",
    color: positive ? successColor : errorColor,
    background: withOpacity(positive ? successColor : errorColor, 0.1),
    opacity: isAfter ? 1 : 0,
    transform: isAfter ? "translateY(0)" : "translateY(4px)",
    transition: "opacity 0.4s var(--ease-smooth) 0.15s, transform 0.4s var(--ease-smooth) 0.15s",
  });

  const actionDivider = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.15rem 0",
    color: withOpacity(accent, 0.5),
    fontSize: "0.64rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  });

  // ── Bitcoin-card styles ────────────────────────────────────────────────────

  // Input UTXO card
  const inputCard = (): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.35rem 0.5rem" : "0.5rem 0.65rem",
    borderRadius: "0.6rem",
    border: `1.5px solid ${withOpacity(isAfter ? errorColor : btcAccent, isAfter ? 0.3 : 0.4)}`,
    background: withOpacity(isAfter ? errorColor : btcAccent, isAfter ? 0.05 : 0.08),
    transition: "all 0.45s var(--ease-smooth)",
  });

  const inputIconBox = (): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "1.25rem" : "1.5rem",
    height: isMobile ? "1.25rem" : "1.5rem",
    borderRadius: "0.35rem",
    background: withOpacity(isAfter ? errorColor : btcAccent, 0.12),
    color: isAfter ? withOpacity(errorColor, 0.55) : btcAccent,
    flexShrink: 0,
    transition: "all 0.45s var(--ease-smooth)",
  });

  const inputCardBody: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    minWidth: 0,
  };

  const inputAmountStyle = (): CSSProperties => ({
    fontSize: isMobile ? "0.76rem" : "0.8rem",
    fontWeight: 700,
    color: isAfter ? withOpacity(errorColor, 0.5) : btcAccent,
    textDecoration: isAfter ? "line-through" : "none",
    transition: "all 0.45s var(--ease-smooth)",
  });

  const inputOwnerStyle = (): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.64rem",
    fontWeight: 600,
    color: isAfter ? withOpacity(errorColor, 0.35) : withOpacity(colors.base.text.secondary, 0.65),
    transition: "color 0.45s var(--ease-smooth)",
  });

  const consumedBadgeStyle: CSSProperties = {
    flexShrink: 0,
    opacity: isAfter ? 1 : 0,
    transition: "opacity 0.35s var(--ease-smooth) 0.1s",
  };

  // Transaction connector
  const txConnector: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    padding: "0.05rem 0",
  };

  const txBox: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: isMobile ? "0.3rem 0.6rem" : "0.35rem 0.8rem",
    borderRadius: "0.45rem",
    border: `1px solid ${withOpacity(btcAccent, 0.2)}`,
    background: withOpacity(btcAccent, 0.06),
    fontSize: "0.66rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: withOpacity(btcAccent, 0.8),
  };

  // Output UTXO row
  const outputCard = (delay: number, accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.3rem 0.5rem" : "0.45rem 0.65rem",
    borderRadius: "0.55rem",
    border: `1.5px solid ${withOpacity(accent, isAfter ? 0.35 : 0.08)}`,
    background: withOpacity(accent, isAfter ? 0.06 : 0.015),
    opacity: isAfter ? 1 : 0.12,
    transform: isAfter ? "translateY(0)" : "translateY(6px)",
    transition: `all 0.4s var(--ease-smooth) ${delay}s`,
  });

  const outputIconBox = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "1.25rem" : "1.5rem",
    height: isMobile ? "1.25rem" : "1.5rem",
    borderRadius: "0.35rem",
    background: withOpacity(accent, 0.12),
    color: isAfter ? accent : withOpacity(accent, 0.3),
    flexShrink: 0,
    transition: "color 0.4s var(--ease-smooth)",
  });

  const outputCardBody: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    minWidth: 0,
  };

  const outputAmountStyle = (accent: string): CSSProperties => ({
    fontSize: isMobile ? "0.76rem" : "0.8rem",
    fontWeight: 700,
    color: isAfter ? accent : withOpacity(accent, 0.3),
    transition: "color 0.4s var(--ease-smooth)",
  });

  const outputOwnerStyle = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: "0.64rem",
    fontWeight: 600,
    color: isAfter ? withOpacity(accent, 0.7) : withOpacity(accent, 0.2),
    transition: "color 0.4s var(--ease-smooth)",
  });

  // Pedagogical phrase
  const pedagogyPhrase: CSSProperties = {
    padding: isMobile ? "0.45rem 0.6rem" : "0.6rem 0.8rem",
    borderRadius: "0.5rem",
    border: `1px solid ${withOpacity(btcAccent, isAfter ? 0.22 : 0.05)}`,
    background: withOpacity(btcAccent, isAfter ? 0.06 : 0),
    fontSize: "0.68rem",
    fontWeight: 700,
    fontStyle: "italic",
    color: isAfter ? btcAccent : withOpacity(btcAccent, 0.15),
    lineHeight: 1.5,
    textAlign: "center",
    opacity: isAfter ? 1 : 0,
    transform: isAfter ? "translateY(0)" : "translateY(8px)",
    transition: "all 0.45s var(--ease-smooth) 0.55s",
  };

  // ── Wrappers ───────────────────────────────────────────────────────────────

  const outerContainer: CSSProperties = {
    margin: isMobile ? "1.25rem 0" : "2rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  };

  const cardsRow: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "0.75rem" : "1rem",
    alignItems: "stretch",
  };

  // ── Bank card ──────────────────────────────────────────────────────────────

  const bankCard = (
    <div style={card(bankAccent)}>
      <div style={cardHeader(bankAccent)}>
        <div style={cardHeaderRow}>
          <Caption
            size="md"
            color={bankAccent}
            icon={
              <Building2
                size={isMobile ? 13 : 14}
                strokeWidth={2}
                style={{ color: bankAccent, flexShrink: 0 }}
              />
            }
            style={{ letterSpacing: "0.07em" }}
          >
            {t("txComparison.bankTitle")}
          </Caption>
        </div>
        <span style={cardSubtitle}>{t("txComparison.bankSubtitle")}</span>
        <span style={cardDescStyle}>{t("txComparison.bankDesc")}</span>
      </div>

      <div style={cardBody}>
        <div style={sectionLabel(bankAccent)}>{t("txComparison.bankBefore")}</div>

        {/* Scenario context */}
        <div
          style={{
            padding: "0.4rem 0.65rem",
            borderRadius: "0.45rem",
            background: withOpacity(bankAccent, 0.06),
            border: `1px solid ${withOpacity(bankAccent, 0.12)}`,
            fontSize: "0.68rem",
            fontStyle: "italic",
            color: colors.base.text.secondary,
          }}
        >
          {t("txComparison.bankScenario")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {/* Nicolas */}
          <div style={balanceRow}>
            <User size={iconSm} strokeWidth={2} style={{ color: bankAccent, flexShrink: 0 }} />
            <span style={balanceName}>{t("txComparison.nicolas")}</span>
            <div style={balanceBar(100, bankAccent)}>
              <div style={balanceFill(isAfter ? 60 : 100, bankAccent)} />
            </div>
            <span style={balanceAmount(isAfter ? errorColor : undefined)}>
              {fmtEur(isAfter ? BANK.nicolasAfter : BANK.nicolasBefore)}
            </span>
            <span style={deltaBadge(false)}>−{fmtEur(BANK.sent)}</span>
          </div>
          {/* Michu */}
          <div style={balanceRow}>
            <User size={iconSm} strokeWidth={2} style={{ color: bankAccent, flexShrink: 0 }} />
            <span style={balanceName}>{t("txComparison.michu")}</span>
            <div style={balanceBar(72, bankAccent)}>
              <div style={balanceFill(isAfter ? 72 : 32, bankAccent)} />
            </div>
            <span style={balanceAmount(isAfter ? successColor : undefined)}>
              {fmtEur(isAfter ? BANK.michuAfter : BANK.michuBefore)}
            </span>
            <span style={deltaBadge(true)}>+{fmtEur(BANK.sent)}</span>
          </div>
        </div>

        <div style={actionDivider(bankAccent)}>
          <div style={divLine(bankAccent)} />
          <ArrowDown size={10} strokeWidth={2} />
          <span>{t("txComparison.bankAction")}</span>
          <ArrowDown size={10} strokeWidth={2} />
          <div style={divLine(bankAccent)} />
        </div>

        <div
          style={{
            ...sectionLabel(bankAccent, !isAfter),
          }}
        >
          {t("txComparison.bankAfter")}
        </div>
        <div
          style={{
            fontSize: "0.68rem",
            color: colors.base.text.secondary,
            padding: "0.4rem 0.6rem",
            borderRadius: "0.45rem",
            background: withOpacity(bankAccent, 0.04),
            border: `1px solid ${withOpacity(bankAccent, 0.1)}`,
            lineHeight: 1.5,
            opacity: isAfter ? 1 : 0.2,
            transition: "opacity 0.4s var(--ease-smooth)",
          }}
        >
          {t("txComparison.bankSummary")}
          <span
            style={{
              display: "block",
              marginTop: "0.25rem",
              fontSize: "0.62rem",
              color: withOpacity(colors.base.text.secondary, 0.55),
            }}
          >
            {isAfter
              ? `${t("txComparison.nicolas")} : ${fmtEur(BANK.nicolasBefore)} → ${fmtEur(BANK.nicolasAfter)}   ${t("txComparison.michu")} : ${fmtEur(BANK.michuBefore)} → ${fmtEur(BANK.michuAfter)}`
              : `${t("txComparison.nicolas")} : ${fmtEur(BANK.nicolasBefore)}   ${t("txComparison.michu")} : ${fmtEur(BANK.michuBefore)}`}
          </span>
        </div>
      </div>

      <div style={cardFooter(bankAccent)}>
        {t("txComparison.bankSummary")}
        <div style={keyText(bankAccent)}>{t("txComparison.bankKeyText")}</div>
      </div>
    </div>
  );

  // ── Bitcoin card (redesigned) ──────────────────────────────────────────────

  const bitcoinCard = (
    <div style={card(btcAccent)}>
      <div style={cardHeader(btcAccent)}>
        <div style={cardHeaderRow}>
          <Caption
            size="md"
            color={btcAccent}
            icon={
              <CircleDollarSign
                size={isMobile ? 13 : 14}
                strokeWidth={2}
                style={{ color: btcAccent, flexShrink: 0 }}
              />
            }
            style={{ letterSpacing: "0.07em" }}
          >
            {t("txComparison.btcTitle")}
          </Caption>
        </div>
        <span style={cardSubtitle}>{t("txComparison.btcSubtitle")}</span>
        <span style={cardDescStyle}>{t("txComparison.btcDesc")}</span>
      </div>

      <div style={cardBody}>
        {/* Scenario context - same layout as bank card */}
        <div
          style={{
            padding: "0.4rem 0.65rem",
            borderRadius: "0.45rem",
            background: withOpacity(btcAccent, 0.06),
            border: `1px solid ${withOpacity(btcAccent, 0.12)}`,
            fontSize: "0.68rem",
            fontStyle: "italic",
            color: colors.base.text.secondary,
          }}
        >
          {t("txComparison.btcScenario")}
        </div>

        {/* ── INPUTS ── */}
        <div style={sectionLabel(btcAccent)}>
          <Lock size={9} strokeWidth={2} />
          {t("txComparison.btcInputsLabel")}
        </div>

        {/* UTXO 1 */}
        <div style={inputCard()}>
          <div style={inputIconBox()}>
            <Lock size={iconSm} strokeWidth={2} />
          </div>
          <div style={inputCardBody}>
            <span style={inputAmountStyle()}>{fmtBTC(BTC.utxo1)}</span>
            <span style={inputOwnerStyle()}>
              <KeyRound size={9} strokeWidth={2} />
              {t("txComparison.btcLockedBy")} {t("txComparison.nicolas")}
            </span>
          </div>
          <Badge tone="error" size="xs" style={consumedBadgeStyle}>
            {t("txComparison.btcConsumedBadge")}
          </Badge>
        </div>

        {/* UTXO 2 */}
        <div style={inputCard()}>
          <div style={inputIconBox()}>
            <Lock size={iconSm} strokeWidth={2} />
          </div>
          <div style={inputCardBody}>
            <span style={inputAmountStyle()}>{fmtBTC(BTC.utxo2)}</span>
            <span style={inputOwnerStyle()}>
              <KeyRound size={9} strokeWidth={2} />
              {t("txComparison.btcLockedBy")} {t("txComparison.nicolas")}
            </span>
          </div>
          <Badge tone="error" size="xs" style={consumedBadgeStyle}>
            {t("txComparison.btcConsumedBadge")}
          </Badge>
        </div>

        {/* ── TRANSACTION CONNECTOR ── */}
        <div style={txConnector}>
          <ArrowDown size={10} strokeWidth={2} style={{ color: withOpacity(btcAccent, 0.35) }} />
          <div style={txBox}>
            <Zap size={10} strokeWidth={2} />
            {t("txComparison.btcTxBox")}
          </div>
          <ArrowDown size={10} strokeWidth={2} style={{ color: withOpacity(btcAccent, 0.35) }} />
        </div>

        {/* ── OUTPUTS ── */}
        <div style={sectionLabel(btcAccent, !isAfter)}>
          <KeyRound size={9} strokeWidth={2} />
          {t("txComparison.btcOutputsLabel")}
        </div>

        {/* Michu */}
        <div style={outputCard(0.25, successColor)}>
          <div style={outputIconBox(successColor)}>
            <KeyRound size={iconSm} strokeWidth={2} />
          </div>
          <div style={outputCardBody}>
            <span style={outputAmountStyle(successColor)}>{fmtBTC(BTC.sentToMichu)}</span>
            <span style={outputOwnerStyle(successColor)}>
              <KeyRound size={9} strokeWidth={2} />
              {t("txComparison.michu")} {t("txComparison.btcCanSpend")}
            </span>
          </div>
        </div>

        {/* Nicolas (change) */}
        <div style={outputCard(0.38, btcAccent)}>
          <div style={outputIconBox(btcAccent)}>
            <Wallet size={iconSm} strokeWidth={2} />
          </div>
          <div style={outputCardBody}>
            <span style={outputAmountStyle(btcAccent)}>{fmtBTC(BTC.changeToNicolas)}</span>
            <span style={outputOwnerStyle(btcAccent)}>
              <KeyRound size={9} strokeWidth={2} />
              {t("txComparison.nicolas")} {t("txComparison.btcCanSpend")}{" "}
              <span style={{ opacity: 0.65 }}>({t("txComparison.btcChangeNote")})</span>
            </span>
          </div>
        </div>

        {/* Miner fee */}
        <div
          style={{
            ...outputCard(0.5, colors.base.text.secondary),
            border: `1px solid ${withOpacity(colors.base.border.secondary, isAfter ? 0.12 : 0.04)}`,
          }}
        >
          <div style={outputIconBox(withOpacity(colors.base.text.secondary, 0.55))}>
            <Pickaxe size={iconSm} strokeWidth={2} />
          </div>
          <div style={outputCardBody}>
            <span
              style={{
                ...outputAmountStyle(colors.base.text.secondary),
                opacity: isAfter ? 0.65 : 0.2,
              }}
            >
              {fmtBTC(BTC.fees)}
            </span>
            <span
              style={{
                ...outputOwnerStyle(colors.base.text.secondary),
                opacity: isAfter ? 0.55 : 0.15,
              }}
            >
              {t("txComparison.fees")}
            </span>
          </div>
        </div>

        {/* ── PEDAGOGICAL PHRASE ── */}
        <div style={pedagogyPhrase}>{t("txComparison.btcRightsDestroyed")}</div>
      </div>

      <div style={cardFooter(btcAccent)}>
        {t("txComparison.btcSummary")}
        <div style={keyText(btcAccent)}>{t("txComparison.btcKeyText")}</div>
      </div>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={outerContainer}>
      <div style={cardsRow}>
        {(mode === "bank" || mode === "compare") && bankCard}
        {(mode === "bitcoin" || mode === "compare") && bitcoinCard}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant={isAfter ? "secondary" : "primary"}
          color={btcAccent}
          icon={
            isAfter ? <RefreshCw size={12} strokeWidth={2} /> : <Zap size={12} strokeWidth={2} />
          }
          onClick={isAfter ? reset : trigger}
          style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          {isAfter ? t("txComparison.reset") : t("txComparison.simulate")}
        </Button>
      </div>
    </div>
  );
};
