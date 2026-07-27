import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  Badge,
  Button,
  Caption,
  getBrandGold,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BlockPlate, BlockPlateRow } from "../../components";
import { fmtBTC } from "../../helpers";
import { useMiningRewardBlock } from "../hooks";

import { DoodleCube, DoodleHash, DoodleHierarchy, DoodleNumber, DoodleShoppingBags, DoodleWallet } from "@doodle";
import { ArrowRight } from "@icons";

type Props = {
  onComplete?: () => void;
};

export const MiningRewardBlock: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const world = colors[moduleTheme];
  const gold = getBrandGold(theme);
  const {
    blockHeader,
    transactions,
    subsidy,
    totalFees,
    totalReward,
    minerBalance,
    rewarded,
    reward,
    reset,
  } = useMiningRewardBlock(onComplete);

  const iconSize = isMobile ? 20 : 22;
  // The reward is newly minted bitcoin, so it reads in the module's own gold
  // rather than a generic success green. Fees keep a distinct cool tone so the
  // two halves of the reward act as a small legend.
  const subsidyTone = gold;
  const feesTone = colors.semantic.info.text;

  const headerValue: CSSProperties = { ...typo.figure, color: colors.base.text.secondary, wordBreak: "break-word" };

  const rewardPanel: CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: isMobile ? "0.9rem 0.75rem" : "1.1rem 1rem",
    background: withOpacity(gold, rewarded ? 0.07 : 0.03),
    border: `1px solid ${withOpacity(gold, rewarded ? 0.4 : 0.2)}`,
    transition: "background 0.5s var(--ease-smooth), border-color 0.5s var(--ease-smooth)",
  };

  const subtitle: CSSProperties = { ...typo.note, color: colors.base.text.secondary };

  const txRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: isMobile ? "0.4rem" : "0.6rem",
    padding: isMobile ? "0.4rem 0.55rem" : "0.45rem 0.7rem",
    background: withOpacity(world.background.secondary, 0.05),
    border: `1px solid ${withOpacity(world.border.secondary, 0.14)}`,
  };
  const txParties: CSSProperties = { display: "flex", alignItems: "center", gap: "0.35rem", minWidth: 0 };
  const nameStyle: CSSProperties = { ...typo.micro, color: colors.base.text.primary };
  const txAmounts: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.05rem", flexShrink: 0 };
  const amountStyle: CSSProperties = { ...typo.figure, color: colors.base.text.primary };
  const feeStyle: CSSProperties = { ...typo.micro, color: feesTone };

  const legendLine: CSSProperties = { display: "flex", alignItems: "baseline", gap: "0.5rem" };
  const legendLabel = (tone: string): CSSProperties => ({ ...typo.micro, fontVariant: "small-caps", color: tone });
  const legendValue = (tone: string): CSSProperties => ({ ...typo.figure, color: tone, marginLeft: "auto" });

  const rule: CSSProperties = { height: 1, background: withOpacity(world.border.secondary, 0.18), margin: "0.2rem 0" };

  const totalLabel: CSSProperties = { ...typo.label, fontVariant: "small-caps", color: colors.base.text.primary };
  const totalValue: CSSProperties = { ...typo.figure, color: colors.base.text.primary, marginLeft: "auto" };

  const walletBox: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.65rem 0.8rem",
    background: withOpacity(rewarded ? gold : world.border.secondary, rewarded ? 0.08 : 0.05),
    border: `1px solid ${withOpacity(rewarded ? gold : world.border.secondary, rewarded ? 0.32 : 0.15)}`,
    transition: "background 0.5s var(--ease-smooth), border-color 0.5s var(--ease-smooth)",
  };
  const walletLabel: CSSProperties = { ...typo.micro, fontVariant: "small-caps", color: colors.base.text.secondary };
  const walletAmount: CSSProperties = {
    ...typo.figure,
    color: rewarded ? gold : colors.base.text.secondary,
    marginLeft: "auto",
    transition: "color 0.5s var(--ease-smooth)",
  };

  const rewardNote: CSSProperties = {
    ...typo.note,
    padding: "0.55rem 0.7rem",
    background: withOpacity(gold, 0.07),
    border: `1px solid ${withOpacity(gold, 0.2)}`,
    color: colors.base.text.primary,
    textAlign: "center",
    animation: "rewardNoteFade 0.5s var(--ease-smooth) 0.2s both",
  };

  const legend = (label: string, value: number, tone: string): ReactNode => (
    <div style={legendLine}>
      <span style={legendLabel(tone)}>{label}</span>
      <span style={legendValue(tone)}>{fmtBTC(value)}</span>
    </div>
  );

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"}>
      <div style={{ display: "flex", gap: isMobile ? "0.75rem" : "1rem", flexDirection: isMobile ? "column" : "row", alignItems: "stretch" }}>
        <BlockPlate
          style={{ flex: 1.25, minWidth: 0 }}
          title={
            <>
              <DoodleCube size={iconSize} />
              <span>Bloc #{blockHeader.height.toLocaleString("fr-FR")}</span>
              {rewarded && (
                <Badge tone="world" size="xs">
                  {t("miningReward.validated")}
                </Badge>
              )}
            </>
          }
        >
          <BlockPlateRow icon={<DoodleHash size={iconSize} />} label="prevHash" zebra>
            <span style={headerValue}>{blockHeader.prevHash}</span>
          </BlockPlateRow>
          <BlockPlateRow icon={<DoodleHierarchy size={iconSize} />} label="merkleRoot" zebra={false}>
            <span style={headerValue}>{blockHeader.merkleRoot}</span>
          </BlockPlateRow>
          <BlockPlateRow icon={<DoodleNumber size={iconSize} />} label="nonce" zebra>
            <span style={headerValue}>{blockHeader.nonce}</span>
          </BlockPlateRow>

          <div style={{ ...rule, margin: "0.5rem 0 0.35rem" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {transactions.map((tx) => (
              <div key={tx.id} style={txRow}>
                <div style={txParties}>
                  <span style={nameStyle}>{tx.from}</span>
                  <ArrowRight size={13} strokeWidth={1.75} style={{ opacity: 0.35, flexShrink: 0 }} />
                  <span style={nameStyle}>{tx.to}</span>
                </div>
                <div style={txAmounts}>
                  <span style={amountStyle}>{fmtBTC(tx.amount)}</span>
                  <span style={feeStyle} title={t("miningReward.fees")}>
                    +{fmtBTC(tx.fee).replace(" BTC", "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BlockPlate>

        <div style={rewardPanel}>
          <Caption
            tone="world"
            size="sm"
            color={rewarded ? gold : withOpacity(gold, 0.7)}
            icon={<DoodleShoppingBags size={iconSize} style={{ color: rewarded ? gold : undefined }} />}
            style={{ transition: "color 0.5s var(--ease-smooth)" }}
          >
            {t("miningReward.rewardTitle")}
          </Caption>
          <div style={subtitle}>{t("miningReward.rewardSubtitle")}</div>

          {legend(t("miningReward.subsidy"), subsidy, subsidyTone)}
          {legend(t("miningReward.fees"), totalFees, feesTone)}

          <div style={rule} />

          <div style={legendLine}>
            <span style={totalLabel}>{t("miningReward.total")}</span>
            <span style={totalValue}>{fmtBTC(totalReward)}</span>
          </div>

          <div style={rule} />

          <div style={walletBox}>
            <DoodleWallet
              size={iconSize}
              style={{ color: rewarded ? gold : world.text.secondary, transition: "color 0.5s var(--ease-smooth)", flexShrink: 0 }}
            />
            <span style={walletLabel}>{t("miningReward.wallet")}</span>
            <span style={walletAmount}>{fmtBTC(minerBalance)}</span>
          </div>

          <Badge tone={rewarded ? "world" : "neutral"} style={{ alignSelf: "flex-start" }}>
            {rewarded ? t("miningReward.rewarded") : t("miningReward.unassigned")}
          </Badge>

          <Button
            variant={rewarded ? "secondary" : "primary"}
            onClick={rewarded ? reset : reward}
            fullWidth
            style={{ marginTop: "0.35rem" }}
          >
            {rewarded ? t("miningReward.resetBtn") : t("miningReward.rewardBtn")}
          </Button>

          {rewarded && (
            <div style={rewardNote}>
              {t("miningReward.rewardNoteTitle")}
              <br />
              {fmtBTC(totalFees)} {t("miningReward.rewardNoteFees")} + {fmtBTC(subsidy)}{" "}
              {t("miningReward.rewardNoteSubsidy")}
              <br />
              <span style={{ ...typo.micro, color: colors.base.text.secondary }}>
                ({t("miningReward.rewardNoteNewBitcoin")})
              </span>
            </div>
          )}
        </div>
      </div>
    </SurfaceCard>
  );
};
