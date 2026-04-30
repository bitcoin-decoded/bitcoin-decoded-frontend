import { type CSSProperties, type FC } from "react";
import {
  ArrowRight,
  Box,
  CircleCheck,
  Coins,
  Gift,
  Lock,
  PlusCircle,
  Receipt,
  RotateCcw,
  Wallet,
} from "lucide-react";

import { Badge, Button, Caption, SurfaceCard, useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useMiningReward } from "../hooks";
import { CONFETTI_DATA } from "../data";
import { fmtBTC } from "../helpers";

export const MiningRewardBlock: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
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
  } = useMiningReward();

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const successColor = colors.semantic.success.text;

  const panelsRow: CSSProperties = {
    display: "flex",
    gap: isMobile ? "0.75rem" : "1rem",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
  };

  // ── Block panel (highlights on reward) ────────────────────────────────────

  const blockPanel: CSSProperties = {
    ...mono,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: "0.85rem",
    borderRadius: "0.75rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(rewarded ? successColor : world.border.secondary, rewarded ? 0.45 : 0.15)}`,
    boxShadow: rewarded ? `0 0 18px ${withOpacity(successColor, 0.22)}` : "none",
    transition: "all 0.5s var(--ease-smooth)",
    minWidth: 0,
  };

  // ── Reward panel (success green accent, always distinct) ───────────────────

  const rewardPanel: CSSProperties = {
    ...mono,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: "0.85rem",
    borderRadius: "0.75rem",
    background: rewarded
      ? `linear-gradient(170deg, ${withOpacity(successColor, 0.08)}, ${colors.base.background.primary})`
      : withOpacity(successColor, 0.025),
    border: `1px solid ${withOpacity(successColor, rewarded ? 0.42 : 0.2)}`,
    boxShadow: rewarded ? `0 0 22px ${withOpacity(successColor, 0.22)}` : "none",
    transition: "all 0.5s var(--ease-smooth)",
    minWidth: 0,
    position: "relative",
    overflow: "visible",
  };

  const subtitle: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.58rem" : "0.62rem",
    color: colors.base.text.secondary,
    fontStyle: "italic",
    marginBottom: "0.15rem",
  };

  const headerField: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.56rem" : "0.6rem",
    display: "flex",
    gap: "0.35rem",
  };
  const fieldName: CSSProperties = {
    color: colors.base.text.secondary,
    opacity: 0.6,
    minWidth: isMobile ? "4rem" : "4.5rem",
  };
  const fieldValue: CSSProperties = { color: colors.base.text.primary };

  const divider: CSSProperties = {
    height: 1,
    background: withOpacity(world.border.secondary, 0.15),
    margin: "0.3rem 0",
  };

  const txRow: CSSProperties = {
    ...mono,
    display: "grid",
    gridTemplateColumns: "auto auto auto 1fr auto",
    alignItems: "center",
    gap: isMobile ? "0.3rem" : "0.4rem",
    padding: isMobile ? "0.4rem 0.55rem" : "0.45rem 0.65rem",
    borderRadius: "0.5rem",
    fontSize: isMobile ? "0.58rem" : "0.63rem",
    background: withOpacity(world.border.secondary, 0.03),
    border: `1px solid ${withOpacity(world.border.secondary, 0.1)}`,
  };
  const nameStyle: CSSProperties = { fontWeight: 600, color: colors.base.text.primary };
  const amountStyle: CSSProperties = {
    fontWeight: 700,
    color: world.text.primary,
    textAlign: "right",
  };
  const feeStyle: CSSProperties = {
    fontSize: isMobile ? "0.52rem" : "0.56rem",
    color: colors.base.text.secondary,
    opacity: 0.75,
    justifySelf: "end",
  };

  const rewardLine = (emphasize = false): CSSProperties => ({
    ...mono,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: isMobile ? "0.62rem" : "0.68rem",
    padding: "0.3rem 0",
    color: emphasize ? world.text.primary : colors.base.text.primary,
    fontWeight: emphasize ? 700 : 500,
  });
  const rewardLabel: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    color: colors.base.text.secondary,
  };
  const rewardValue: CSSProperties = {
    marginLeft: "auto",
    fontFamily: "'JetBrains Mono', monospace",
  };

  const walletBox: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.65rem 0.8rem",
    borderRadius: "0.6rem",
    background: rewarded
      ? withOpacity(successColor, 0.08)
      : withOpacity(world.border.secondary, 0.05),
    border: `1px solid ${withOpacity(rewarded ? successColor : world.border.secondary, rewarded ? 0.3 : 0.15)}`,
    transition: "all 0.5s var(--ease-smooth)",
  };
  const walletLabel: CSSProperties = {
    fontSize: isMobile ? "0.56rem" : "0.6rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.base.text.secondary,
  };
  const walletAmount: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontWeight: 700,
    color: rewarded ? successColor : world.text.primary,
    marginLeft: "auto",
    transition: "color 0.5s var(--ease-smooth)",
  };

  const rewardNoteStyle: CSSProperties = {
    ...mono,
    fontSize: isMobile ? "0.59rem" : "0.62rem",
    fontWeight: 600,
    lineHeight: 1.65,
    padding: "0.55rem 0.7rem",
    borderRadius: "0.5rem",
    background: withOpacity(successColor, 0.06),
    border: `1px solid ${withOpacity(successColor, 0.18)}`,
    color: successColor,
    textAlign: "center",
    animation: "rewardNoteFade 0.5s var(--ease-smooth) 0.25s both",
  };

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={mono}>
      <div style={panelsRow}>
        {/* ── Block panel ── */}
        <div style={blockPanel}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Caption tone="world" size="sm" icon={<Box size={isMobile ? 14 : 16} strokeWidth={2} />}>
              Bloc #{blockHeader.height.toLocaleString("fr-FR")}
            </Caption>
            {rewarded && (
              <span
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  color: successColor,
                  fontSize: isMobile ? "0.55rem" : "0.6rem",
                }}
              >
                <Lock size={12} strokeWidth={2} />
                {t("miningReward.validated")}
              </span>
            )}
          </div>
          <div style={subtitle}>{t("miningReward.blockSubtitle")}</div>

          <div style={headerField}>
            <span style={fieldName}>prevHash</span>
            <span style={fieldValue}>{blockHeader.prevHash}</span>
          </div>
          <div style={headerField}>
            <span style={fieldName}>merkleRoot</span>
            <span style={fieldValue}>{blockHeader.merkleRoot}</span>
          </div>
          <div style={headerField}>
            <span style={fieldName}>timestamp</span>
            <span style={fieldValue}>{blockHeader.timestamp}</span>
          </div>
          <div style={headerField}>
            <span style={fieldName}>nonce</span>
            <span style={fieldValue}>{blockHeader.nonce}</span>
          </div>

          <div style={divider} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {transactions.map((tx) => (
              <div key={tx.id} style={txRow}>
                <span style={nameStyle}>{tx.from}</span>
                <ArrowRight size={9} strokeWidth={2} style={{ opacity: 0.4 }} />
                <span style={nameStyle}>{tx.to}</span>
                <span style={amountStyle}>{fmtBTC(tx.amount)}</span>
                <span style={feeStyle}>
                  {t("miningReward.fees").toLowerCase()} {fmtBTC(tx.fee)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Reward panel ── */}
        <div style={rewardPanel}>
          <Caption
            tone="world"
            size="sm"
            color={withOpacity(successColor, rewarded ? 0.9 : 0.6)}
            icon={<Gift size={isMobile ? 14 : 16} strokeWidth={2} />}
            style={{ transition: "color 0.5s var(--ease-smooth)" }}
          >
            {t("miningReward.rewardTitle")}
          </Caption>
          <div style={subtitle}>{t("miningReward.rewardSubtitle")}</div>

          <div style={rewardLine()}>
            <span style={rewardLabel}>
              <Coins size={11} strokeWidth={2} />
              {t("miningReward.subsidy")}
            </span>
            <span style={rewardValue}>{fmtBTC(subsidy)}</span>
          </div>

          <div style={rewardLine()}>
            <span style={rewardLabel}>
              <Receipt size={11} strokeWidth={2} />
              {t("miningReward.fees")}
            </span>
            <span style={rewardValue}>{fmtBTC(totalFees)}</span>
          </div>

          <div style={divider} />

          <div style={rewardLine(true)}>
            <span style={{ ...rewardLabel, color: world.text.primary, fontWeight: 700 }}>
              {t("miningReward.total")}
            </span>
            <span style={rewardValue}>{fmtBTC(totalReward)}</span>
          </div>

          <div style={divider} />

          <div style={walletBox}>
            <Wallet
              size={isMobile ? 14 : 16}
              strokeWidth={2}
              style={{
                color: rewarded ? successColor : world.text.secondary,
                transition: "color 0.5s var(--ease-smooth)",
              }}
            />
            <span style={walletLabel}>{t("miningReward.wallet")}</span>
            <span style={walletAmount}>{fmtBTC(minerBalance)}</span>
          </div>

          <Badge
            tone={rewarded ? "success" : "neutral"}
            icon={rewarded ? <CircleCheck size={12} strokeWidth={2} /> : undefined}
            style={{ alignSelf: "flex-start" }}
          >
            {rewarded ? t("miningReward.rewarded") : t("miningReward.unassigned")}
          </Badge>

          {/* Button + confetti wrapper */}
          <div style={{ position: "relative" }}>
            <Button
              variant={rewarded ? "secondary" : "primary"}
              icon={rewarded ? <RotateCcw size={13} strokeWidth={2} /> : <PlusCircle size={13} strokeWidth={2} />}
              onClick={rewarded ? reset : reward}
              fullWidth
              style={{ marginTop: "0.35rem" }}
            >
              {rewarded ? t("miningReward.resetBtn") : t("miningReward.rewardBtn")}
            </Button>

            {/* Confetti burst */}
            {rewarded && (
              <div
                style={{
                  position: "absolute",
                  bottom: "50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              >
                {CONFETTI_DATA.map((p, i) => (
                  <div
                    key={i}
                    className="confetti-piece"
                    style={
                      {
                        position: "absolute",
                        width: p.size,
                        height: p.size,
                        borderRadius: i % 3 === 0 ? "50%" : "2px",
                        background: p.color,
                        "--tx": `${p.x}px`,
                        "--ty": `${p.y}px`,
                        "--rot": `${p.rot}deg`,
                        "--dur": "1.3s",
                        "--delay": `${p.delay}s`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Reward summary note */}
          {rewarded && (
            <div style={rewardNoteStyle}>
              <strong>{t("miningReward.rewardNoteTitle")}</strong>
              <br />
              {fmtBTC(totalFees)} {t("miningReward.rewardNoteFees")} +{" "}
              {fmtBTC(subsidy)} {t("miningReward.rewardNoteSubsidy")}
              <br />
              <span style={{ opacity: 0.65, fontSize: "0.54rem" }}>
                ({t("miningReward.rewardNoteNewBitcoin")})
              </span>
            </div>
          )}
        </div>
      </div>
    </SurfaceCard>
  );
};
