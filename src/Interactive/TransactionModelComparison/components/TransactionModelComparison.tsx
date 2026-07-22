import { type CSSProperties, type FC } from "react";

import { Badge, BRAND, Button, Caption, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { fmtBTC, fmtEur } from "../../helpers";
import { BANK, BTC } from "../data";
import { useTransactionComparison } from "../hooks";
import type { ComparisonMode } from "../types";

import {
  ArrowDown,
  ArrowRightLeft,
  BookText,
  Building2,
  CircleCheck,
  CircleDollarSign,
  KeyRound,
  Lightbulb,
  Lock,
  Pickaxe,
  RefreshCw,
  User,
  Wallet,
  Zap,
} from "@icons";


type Props = {
  mode?: ComparisonMode;
  onComplete?: () => void;
};

export const TransactionModelComparison: FC<Props> = ({ mode = "compare", onComplete }) => {
  const typo = getTypography();
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { phase, trigger, reset } = useTransactionComparison(onComplete);

  const world = colors[moduleTheme];
  const bankAccent = colors.blue.border.secondary;
  const btcAccent = world.border.secondary;
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error.text;
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };
  const isAfter = phase === "after";
  const iconSm = isMobile ? 11 : 12;


  const card = (accent: string): CSSProperties => ({
    ...mono,
    flex: isMobile ? "0 0 auto" : "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    overflow: "hidden",
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    background: withOpacity(accent, 0.04),
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
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: world.text.primary,
  };

  const cardDescStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    lineHeight: 1.5,
    color: colors.base.text.secondary,
    fontStyle: "italic",
  };

  const cardDescRow = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "flex-start",
    gap: "0.4rem",
    padding: "0.3rem 0.45rem",
    borderRadius: 0,
    background: withOpacity(accent, 0.05),
  });

  const scenarioBox = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    padding: "0.45rem 0.65rem",
    borderRadius: 0,
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.12)}`,
    fontSize: typo.micro.fontSize,
    fontStyle: "italic",
    color: colors.base.text.secondary,
  });

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
    fontSize: typo.micro.fontSize,
    lineHeight: 1.55,
    color: colors.base.text.secondary,
    fontStyle: "italic",
  });

  const keyText = (accent: string): CSSProperties => ({
    marginTop: "0.3rem",
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    fontStyle: "normal",
    color: accent,
    lineHeight: 1.4,
  });

  const sectionLabel = (accent: string, dimmed = false): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.09em",
    color: withOpacity(accent, dimmed ? 0.35 : 0.65),
    transition: "color 0.35s var(--ease-smooth)",
  });


  const ledgerLabelRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  };

  const ledgerBadge: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: successColor,
    padding: "0.12rem 0.4rem",
    borderRadius: 0,
    background: withOpacity(successColor, 0.12),
  };

  const ledgerEntry: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "0.5rem 0.75rem",
    flexWrap: "wrap",
    padding: isMobile ? "0.5rem 0.7rem" : "0.6rem 0.85rem",
    borderRadius: 0,
    background: withOpacity(bankAccent, 0.05),
    border: `1px solid ${withOpacity(bankAccent, 0.12)}`,
  };

  const ledgerName: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: colors.base.text.primary,
    flexShrink: 0,
  };

  const transferConnector: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.15rem",
    padding: "0.05rem 0",
  };

  const transferStem: CSSProperties = {
    width: "1.5px",
    height: "0.5rem",
    background: withOpacity(bankAccent, isAfter ? 0.5 : 0.18),
    transition: "background 0.4s var(--ease-smooth)",
  };

  const transferPill: CSSProperties = {
    ...mono,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    padding: "0.16rem 0.6rem",
    borderRadius: 0,
    color: bankAccent,
    background: withOpacity(bankAccent, 0.14),
    border: `1px solid ${withOpacity(bankAccent, 0.35)}`,
  };

  const ledgerEquation: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "0.3rem",
    fontSize: typo.note.fontSize,
    textAlign: "right",
  };

  const eqBefore: CSSProperties = { color: withOpacity(colors.base.text.secondary, 0.75) };
  const eqDelta = (positive: boolean): CSSProperties => ({
    fontWeight: 500,
    color: positive ? successColor : errorColor,
  });
  const eqSign: CSSProperties = { color: withOpacity(colors.base.text.secondary, 0.45) };
  const eqResult: CSSProperties = { fontWeight: 500, color: colors.base.text.primary };

  const renderLedgerEntry = (name: string, before: number, after: number, positive: boolean) => (
    <div style={ledgerEntry}>
      <span style={ledgerName}>
        <User size={iconSm} strokeWidth={2} style={{ color: bankAccent, flexShrink: 0 }} />
        {name}
      </span>
      <span style={ledgerEquation}>
        {isAfter ? (
          <>
            <span style={eqBefore}>{fmtEur(before, language)}</span>
            <span style={eqDelta(positive)}>
              {positive ? "+" : "−"} {fmtEur(BANK.sent, language)}
            </span>
            <span style={eqSign}>=</span>
            <span style={eqResult}>{fmtEur(after, language)}</span>
          </>
        ) : (
          <span style={eqResult}>{fmtEur(before, language)}</span>
        )}
      </span>
    </div>
  );


  const inputCard = (): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.35rem 0.5rem" : "0.5rem 0.65rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(isAfter ? errorColor : btcAccent, isAfter ? 0.3 : 0.4)}`,
    background: withOpacity(isAfter ? errorColor : btcAccent, isAfter ? 0.05 : 0.08),
    transition: "all 0.45s var(--ease-smooth)",
  });

  const inputIconBox = (): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "1.25rem" : "1.5rem",
    height: isMobile ? "1.25rem" : "1.5rem",
    borderRadius: 0,
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
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: isAfter ? withOpacity(errorColor, 0.5) : btcAccent,
    textDecoration: isAfter ? "line-through" : "none",
    transition: "all 0.45s var(--ease-smooth)",
  });

  const inputOwnerStyle = (): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: isAfter ? withOpacity(errorColor, 0.35) : withOpacity(colors.base.text.secondary, 0.65),
    transition: "color 0.45s var(--ease-smooth)",
  });

  const consumedBadgeStyle: CSSProperties = {
    flexShrink: 0,
    opacity: isAfter ? 1 : 0,
    transition: "opacity 0.35s var(--ease-smooth) 0.1s",
  };

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
    borderRadius: 0,
    border: `1px solid ${withOpacity(btcAccent, 0.2)}`,
    background: withOpacity(btcAccent, 0.06),
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.07em",
    color: withOpacity(btcAccent, 0.8),
  };

  const outputCard = (delay: number, accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: isMobile ? "0.3rem 0.5rem" : "0.45rem 0.65rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accent, isAfter ? 0.35 : 0.08)}`,
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
    borderRadius: 0,
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
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: isAfter ? accent : withOpacity(accent, 0.3),
    transition: "color 0.4s var(--ease-smooth)",
  });

  const outputOwnerStyle = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: isAfter ? withOpacity(accent, 0.7) : withOpacity(accent, 0.2),
    transition: "color 0.4s var(--ease-smooth)",
  });

  const pedagogyPhrase: CSSProperties = {
    padding: isMobile ? "0.45rem 0.6rem" : "0.6rem 0.8rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(btcAccent, isAfter ? 0.22 : 0.05)}`,
    background: withOpacity(btcAccent, isAfter ? 0.06 : 0),
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    fontStyle: "italic",
    color: isAfter ? btcAccent : withOpacity(btcAccent, 0.15),
    lineHeight: 1.5,
    textAlign: "center",
    opacity: isAfter ? 1 : 0,
    transform: isAfter ? "translateY(0)" : "translateY(8px)",
    transition: "all 0.45s var(--ease-smooth) 0.55s",
  };


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
        <div style={cardDescRow(bankAccent)}>
          <Lightbulb
            size={12}
            strokeWidth={2}
            style={{ color: bankAccent, flexShrink: 0, marginTop: "0.1rem" }}
          />
          <span style={cardDescStyle}>{t("txComparison.bankDesc")}</span>
        </div>
      </div>

      <div style={cardBody}>
        <div style={scenarioBox(bankAccent)}>
          <ArrowRightLeft size={13} strokeWidth={2} style={{ color: bankAccent, flexShrink: 0 }} />
          {t("txComparison.bankScenario")}
        </div>

        <div style={ledgerLabelRow}>
          <div style={sectionLabel(bankAccent)}>
            <BookText size={10} strokeWidth={2} />
            {t("txComparison.bankLedger")}
          </div>
          {isAfter && (
            <span style={ledgerBadge}>
              <CircleCheck size={9} strokeWidth={2.5} />
              {t("txComparison.bankUpdated")}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {renderLedgerEntry(
            t("txComparison.nicolas"),
            BANK.nicolasBefore,
            BANK.nicolasAfter,
            false,
          )}
          <div style={transferConnector}>
            <div style={transferStem} />
            {isAfter ? (
              <span style={transferPill}>
                <ArrowDown size={11} strokeWidth={2.5} />
                {t("txComparison.bankTransferLabel")} {fmtEur(BANK.sent, language)}
              </span>
            ) : (
              <ArrowDown
                size={14}
                strokeWidth={2}
                style={{ color: withOpacity(bankAccent, 0.3) }}
              />
            )}
            <div style={transferStem} />
          </div>
          {renderLedgerEntry(t("txComparison.michu"), BANK.michuBefore, BANK.michuAfter, true)}
        </div>
      </div>

      <div style={cardFooter(bankAccent)}>
        {t("txComparison.bankSummary")}
        <div style={keyText(bankAccent)}>{t("txComparison.bankKeyText")}</div>
      </div>
    </div>
  );


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
        <div style={cardDescRow(btcAccent)}>
          <Lightbulb
            size={12}
            strokeWidth={2}
            style={{ color: btcAccent, flexShrink: 0, marginTop: "0.1rem" }}
          />
          <span style={cardDescStyle}>{t("txComparison.btcDesc")}</span>
        </div>
      </div>

      <div style={cardBody}>
        <div style={scenarioBox(btcAccent)}>
          <ArrowRightLeft size={13} strokeWidth={2} style={{ color: btcAccent, flexShrink: 0 }} />
          {t("txComparison.btcScenario")}
        </div>

        <div style={sectionLabel(btcAccent)}>
          <Lock size={9} strokeWidth={2} />
          {t("txComparison.btcInputsLabel")}
        </div>

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

        <div style={txConnector}>
          <ArrowDown size={10} strokeWidth={2} style={{ color: withOpacity(btcAccent, 0.35) }} />
          <div style={txBox}>
            <Zap size={10} strokeWidth={2} />
            {t("txComparison.btcTxBox")}
          </div>
          <ArrowDown size={10} strokeWidth={2} style={{ color: withOpacity(btcAccent, 0.35) }} />
        </div>

        <div style={sectionLabel(btcAccent, !isAfter)}>
          <KeyRound size={9} strokeWidth={2} />
          {t("txComparison.btcOutputsLabel")}
        </div>

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

        <div style={pedagogyPhrase}>{t("txComparison.btcRightsDestroyed")}</div>
      </div>

      <div style={cardFooter(btcAccent)}>
        {t("txComparison.btcSummary")}
        <div style={keyText(btcAccent)}>{t("txComparison.btcKeyText")}</div>
      </div>
    </div>
  );


  return (
    <div style={outerContainer}>
      <div style={cardsRow}>
        {(mode === "bank" || mode === "compare") && bankCard}
        {(mode === "bitcoin" || mode === "compare") && bitcoinCard}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant={isAfter ? "secondary" : "primary"}
          icon={
            isAfter ? <RefreshCw size={12} strokeWidth={2} /> : <Zap size={12} strokeWidth={2} />
          }
          onClick={isAfter ? reset : trigger}
          style={{ letterSpacing: "0.05em" }}
        >
          {isAfter ? t("txComparison.reset") : t("txComparison.simulate")}
        </Button>
      </div>
    </div>
  );
};
