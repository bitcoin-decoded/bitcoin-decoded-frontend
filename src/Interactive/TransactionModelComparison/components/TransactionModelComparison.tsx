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
import michuPortrait from "../../../Design/img/michu_portrait.webp";
import nicolasTransfer from "../../../Design/img/nicolas_transfer.webp";
import { useTranslation } from "../../../I18n";
import { UtxoChip } from "../../components";
import { fmtBTC } from "../../helpers";
import { BANK, BTC } from "../data";
import { useTransactionComparison } from "../hooks";
import type { ComparisonMode } from "../types";

import { AccountCard } from "./AccountCard";
import { ModelCard } from "./ModelCard";

import {
  DoodleBank,
  DoodleBitcoinGive,
  DoodleBitcoinGlobe,
  DoodleCashGive,
  DoodleKey,
  DoodleLock,
  DoodleMining,
  DoodleNotes,
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
  const giveSize = isMobile ? 26 : 34;

  const sectionLabel: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  };

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
      summary={t("txComparison.bankSummary")}
      keyText={t("txComparison.bankKeyText")}
    >
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

      <div style={{ display: "flex", alignItems: "stretch", gap: isMobile ? "0.4rem" : "0.6rem" }}>
        <AccountCard
          name={t("txComparison.nicolas")}
          imgSrc={nicolasTransfer}
          balanceLabel={t("txComparison.balance")}
          balance={isAfter ? BANK.nicolasAfter : BANK.nicolasBefore}
          language={language}
          accent={bankAccent}
          isAfter={isAfter}
          direction="down"
          objectPosition="58% 22%"
        />
        <DoodleCashGive
          size={giveSize}
          style={{
            color: bankAccent,
            transform: "scaleX(-1)",
            flexShrink: 0,
            alignSelf: "center",
            opacity: isAfter ? 1 : 0,
            transition: "opacity 0.45s var(--ease-smooth)",
          }}
        />
        <AccountCard
          name={t("txComparison.michu")}
          imgSrc={michuPortrait}
          balanceLabel={t("txComparison.balance")}
          balance={isAfter ? BANK.michuAfter : BANK.michuBefore}
          language={language}
          accent={bankAccent}
          isAfter={isAfter}
          direction="up"
          flipImage
          objectPosition="50% 24%"
        />
      </div>
    </ModelCard>
  );

  const bitcoinCard = (
    <ModelCard
      accent={btcAccent}
      icon={<DoodleBitcoinGlobe size={iconSize} style={{ color: btcAccent }} />}
      title={t("txComparison.btcTitle")}
      summary={t("txComparison.btcSummary")}
      keyText={t("txComparison.btcKeyText")}
    >
      <span style={{ ...sectionLabel, color: btcAccent }}>
        <DoodleLock size={iconSize} />
        {t("txComparison.btcInputsLabel")}
      </span>
      {input(BTC.utxo1)}
      {input(BTC.utxo2)}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem", color: withOpacity(btcAccent, 0.4) }}>
        <ArrowDown size={14} strokeWidth={2} />
        <DoodleBitcoinGive size={giveSize} style={{ color: btcAccent }} />
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
