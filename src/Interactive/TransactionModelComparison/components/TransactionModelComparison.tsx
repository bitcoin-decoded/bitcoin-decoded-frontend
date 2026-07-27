import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  Badge,
  Button,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { UtxoChip } from "../../components";
import { fmtBTC } from "../../helpers";
import { BANK, BTC } from "../data";
import { useTransactionComparison } from "../hooks";
import type { ComparisonMode } from "../types";

import { LedgerEntry } from "./LedgerEntry";
import { ModelCard } from "./ModelCard";

import {
  DoodleBank,
  DoodleBitcoin,
  DoodleKey,
  DoodleLock,
  DoodleMining,
  DoodleNotes,
  DoodlePaperPlane,
  DoodleWallet,
} from "@doodle";
import { ArrowDown } from "@icons";

type Props = {
  mode?: ComparisonMode;
  onComplete?: () => void;
};

export const TransactionModelComparison: FC<Props> = ({ mode = "compare", onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { phase, trigger, reset } = useTransactionComparison(onComplete);

  const world = colors[moduleTheme];
  // Blue is the banking module's own colour: reused here so the reader reads the
  // ledger card as "the bank world", against Bitcoin's amber.
  const bankAccent = colors.blue.text.secondary;
  const btcAccent = world.text.secondary;
  const success = colors.semantic.success.text;
  const error = colors.semantic.error.text;
  const isAfter = phase === "after";
  const iconSize = isMobile ? 20 : 22;

  const sectionLabel: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  };

  const scenarioBox = (accent: string, text: string): ReactNode => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.45rem 0.65rem",
        background: withOpacity(accent, 0.06),
        border: `1px solid ${withOpacity(accent, 0.14)}`,
      }}
    >
      <DoodlePaperPlane size={iconSize} style={{ flexShrink: 0, color: accent }} />
      <span style={{ ...typo.note, color: colors.base.text.secondary }}>{text}</span>
    </div>
  );

  const revealStyle = (delay: number): CSSProperties => ({
    opacity: isAfter ? 1 : 0.12,
    transform: isAfter ? "translateY(0)" : "translateY(6px)",
    transition: `opacity 0.4s var(--ease-smooth) ${delay}s, transform 0.4s var(--ease-smooth) ${delay}s`,
  });

  const consumedBadge = (
    <Badge tone="error" size="xs" style={{ opacity: isAfter ? 1 : 0, transition: "opacity 0.35s var(--ease-smooth)" }}>
      {t("txComparison.btcConsumedBadge")}
    </Badge>
  );

  const input = (amount: number): ReactNode => (
    <UtxoChip
      icon={<DoodleLock size={iconSize} />}
      amount={fmtBTC(amount)}
      sublabel={`${t("txComparison.btcLockedBy")} ${t("txComparison.nicolas")}`}
      accent={isAfter ? error : btcAccent}
      struck={isAfter}
      badge={consumedBadge}
    />
  );

  const output = (
    icon: ReactNode,
    amount: number,
    sublabel: ReactNode,
    accent: string,
    delay: number,
  ): ReactNode => (
    <div style={revealStyle(delay)}>
      <UtxoChip icon={icon} amount={fmtBTC(amount)} sublabel={sublabel} accent={accent} />
    </div>
  );

  const bankCard = (
    <ModelCard
      accent={bankAccent}
      icon={<DoodleBank size={iconSize} style={{ color: bankAccent }} />}
      title={t("txComparison.bankTitle")}
      subtitle={t("txComparison.bankSubtitle")}
      description={t("txComparison.bankDesc")}
      summary={t("txComparison.bankSummary")}
      keyText={t("txComparison.bankKeyText")}
    >
      {scenarioBox(bankAccent, t("txComparison.bankScenario"))}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ ...sectionLabel, color: bankAccent }}>
          <DoodleNotes size={iconSize} />
          {t("txComparison.bankLedger")}
        </span>
        {isAfter && (
          <Badge tone="success" size="xs">
            {t("txComparison.bankUpdated")}
          </Badge>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <LedgerEntry
          name={t("txComparison.nicolas")}
          before={BANK.nicolasBefore}
          after={BANK.nicolasAfter}
          sent={BANK.sent}
          positive={false}
          isAfter={isAfter}
          accent={bankAccent}
          language={language}
        />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.4rem", color: withOpacity(bankAccent, isAfter ? 0.7 : 0.3) }}>
          <ArrowDown size={14} strokeWidth={2} />
          {isAfter && (
            <span style={{ ...typo.micro, fontVariant: "small-caps", color: bankAccent }}>
              {t("txComparison.bankTransferLabel")}
            </span>
          )}
        </div>
        <LedgerEntry
          name={t("txComparison.michu")}
          before={BANK.michuBefore}
          after={BANK.michuAfter}
          sent={BANK.sent}
          positive
          isAfter={isAfter}
          accent={bankAccent}
          language={language}
        />
      </div>
    </ModelCard>
  );

  const bitcoinCard = (
    <ModelCard
      accent={btcAccent}
      icon={<DoodleBitcoin size={iconSize} style={{ color: btcAccent }} />}
      title={t("txComparison.btcTitle")}
      subtitle={t("txComparison.btcSubtitle")}
      description={t("txComparison.btcDesc")}
      summary={t("txComparison.btcSummary")}
      keyText={t("txComparison.btcKeyText")}
    >
      {scenarioBox(btcAccent, t("txComparison.btcScenario"))}

      <span style={{ ...sectionLabel, color: btcAccent }}>
        <DoodleLock size={iconSize} />
        {t("txComparison.btcInputsLabel")}
      </span>
      {input(BTC.utxo1)}
      {input(BTC.utxo2)}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", color: withOpacity(btcAccent, 0.4) }}>
        <ArrowDown size={14} strokeWidth={2} />
        <span style={{ ...typo.micro, fontVariant: "small-caps", color: withOpacity(btcAccent, 0.85) }}>
          {t("txComparison.btcTxBox")}
        </span>
        <ArrowDown size={14} strokeWidth={2} />
      </div>

      <span style={{ ...sectionLabel, color: withOpacity(btcAccent, isAfter ? 1 : 0.4), transition: "color 0.35s var(--ease-smooth)" }}>
        <DoodleKey size={iconSize} />
        {t("txComparison.btcOutputsLabel")}
      </span>
      {output(
        <DoodleKey size={iconSize} />,
        BTC.sentToMichu,
        `${t("txComparison.michu")} ${t("txComparison.btcCanSpend")}`,
        success,
        0.25,
      )}
      {output(
        <DoodleWallet size={iconSize} />,
        BTC.changeToNicolas,
        <>
          {t("txComparison.nicolas")} {t("txComparison.btcCanSpend")}{" "}
          <span style={{ color: colors.base.text.secondary }}>({t("txComparison.btcChangeNote")})</span>
        </>,
        btcAccent,
        0.38,
      )}
      {output(
        <DoodleMining size={iconSize} />,
        BTC.fees,
        t("txComparison.fees"),
        colors.base.text.secondary,
        0.5,
      )}

      <div
        style={{
          ...revealStyle(0.55),
          ...typo.note,
          color: btcAccent,
          textAlign: "center",
          padding: "0.5rem 0.7rem",
          border: `1px solid ${withOpacity(btcAccent, isAfter ? 0.22 : 0.05)}`,
          background: withOpacity(btcAccent, isAfter ? 0.06 : 0),
        }}
      >
        {t("txComparison.btcRightsDestroyed")}
      </div>
    </ModelCard>
  );

  return (
    <SurfaceCard gap="1rem" margin={isMobile ? "1.5rem 0" : "2rem 0"}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "0.85rem" : "1rem",
          alignItems: "stretch",
        }}
      >
        {(mode === "bank" || mode === "compare") && bankCard}
        {(mode === "bitcoin" || mode === "compare") && bitcoinCard}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant={isAfter ? "secondary" : "primary"} onClick={isAfter ? reset : trigger}>
          {isAfter ? t("txComparison.reset") : t("txComparison.simulate")}
        </Button>
      </div>
    </SurfaceCard>
  );
};
