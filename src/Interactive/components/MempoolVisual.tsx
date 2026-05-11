import { type FC, type CSSProperties } from "react";
import {
  Inbox,
  AlertTriangle,
  ArrowRight,
  Box,
  CircleCheck,
  PlusCircle,
  RotateCcw,
} from "lucide-react";

import {
  Badge,
  Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  usePageTheme,
  useBreakpoint,
} from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useMempool } from "../hooks";
import type { MempoolTransaction } from "../hooks/useMempool";

type MempoolVariant = "intro" | "resolution";
type TxState = "normal" | "conflict" | "rejected";

const TxRow: FC<{
  tx: MempoolTransaction;
  state: TxState;
  colors: ReturnType<typeof usePageTheme>["colors"];
  moduleTheme: ReturnType<typeof usePageTheme>["moduleTheme"];
  isMobile: boolean;
}> = ({ tx, state, colors, moduleTheme, isMobile }) => {
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const world = colors[moduleTheme];
  const isConflict = state === "conflict";
  const isRejected = state === "rejected";
  const flagged = isConflict || isRejected;
  const borderColor = flagged ? colors.semantic.error.text : world.border.secondary;

  const row: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.35rem" : "0.5rem",
    padding: isMobile ? "0.4rem 0.55rem" : "0.45rem 0.65rem",
    borderRadius: "0.5rem",
    fontSize: isMobile ? "0.58rem" : "0.63rem",
    background: withOpacity(borderColor, flagged ? 0.08 : 0.03),
    border: `1px solid ${withOpacity(borderColor, flagged ? 0.3 : 0.1)}`,
    transition: "all 0.4s var(--ease-smooth)",
    textDecoration: isRejected ? "line-through" : "none",
    opacity: isRejected ? 0.6 : 1,
  };

  const nameStyle: CSSProperties = { fontWeight: 600, color: colors.base.text.primary };
  const amountStyle: CSSProperties = {
    fontWeight: 700,
    color: world.text.primary,
    marginLeft: "auto",
  };

  return (
    <div style={row}>
      {flagged && (
        <AlertTriangle
          size={11}
          strokeWidth={2}
          color={colors.semantic.error.text}
          style={{ flexShrink: 0 }}
        />
      )}
      <span style={nameStyle}>{tx.from}</span>
      <ArrowRight size={9} strokeWidth={2} style={{ opacity: 0.4, flexShrink: 0 }} />
      <span style={nameStyle}>{tx.to}</span>
      <span style={amountStyle}>{tx.amount}</span>
    </div>
  );
};

export const MempoolVisual: FC<{ variant?: MempoolVariant }> = ({ variant = "intro" }) => {
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { transactions, blockHeader, blockTxIds, rejectedTxId, blockAdded, addBlock, reset } =
    useMempool(language);

  const isResolution = variant === "resolution";
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const panelsRow: CSSProperties = {
    display: "flex",
    gap: isMobile ? "0.75rem" : "1rem",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
  };

  const panel: CSSProperties = {
    ...mono,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: "0.85rem",
    borderRadius: "0.75rem",
    background: withOpacity(world.background.secondary, 0.04),
    border: `1px solid ${withOpacity(world.border.secondary, 0.15)}`,
    minWidth: 0,
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

  const getTxState = (tx: MempoolTransaction): TxState => {
    if (!isResolution || !blockAdded) return tx.conflictGroup ? "conflict" : "normal";
    if (tx.id === rejectedTxId) return "rejected";
    return "normal";
  };

  const visibleMempool = transactions.filter((tx) => {
    if (!isResolution || !blockAdded) return true;
    return !blockTxIds.includes(tx.id);
  });

  const blockTxs = transactions.filter((tx) => blockTxIds.includes(tx.id));

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={mono}>
      <div style={panelsRow}>
        {/* Mempool */}
        <div style={panel}>
          <Caption
            tone="world"
            size="sm"
            icon={<Inbox size={isMobile ? 14 : 16} strokeWidth={2} />}
          >
            Mempool
          </Caption>
          <div style={subtitle}>{t("mempool.subtitle")}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {visibleMempool.length === 0 ? (
              <span
                style={{
                  fontSize: isMobile ? "0.58rem" : "0.63rem",
                  opacity: 0.5,
                  fontStyle: "italic",
                }}
              >
                {t("mempool.empty")}
              </span>
            ) : (
              visibleMempool.map((tx) => (
                <TxRow
                  key={tx.id}
                  tx={tx}
                  state={getTxState(tx)}
                  colors={colors}
                  moduleTheme={moduleTheme}
                  isMobile={isMobile}
                />
              ))
            )}
          </div>

          {!blockAdded && (
            <FeedbackPanel
              tone="info"
              icon={<AlertTriangle size={11} strokeWidth={2} />}
              style={{ marginTop: "0.25rem" }}
            >
              {t("mempool.doubleSpend.prefix")} <b>{t("mempool.doubleSpend.emphasis")}</b>{" "}
              {t("mempool.doubleSpend.suffix")}
            </FeedbackPanel>
          )}

          {isResolution && blockAdded && (
            <FeedbackPanel
              tone="error"
              icon={<AlertTriangle size={11} strokeWidth={2} />}
              style={{ marginTop: "0.25rem" }}
            >
              {t("mempool.invalidated.prefix")} <b>{t("mempool.invalidated.emphasis")}</b>{" "}
              {t("mempool.invalidated.suffix")}
            </FeedbackPanel>
          )}
        </div>

        {/* Bloc proposé - mode resolution uniquement */}
        {isResolution && (
          <div style={panel}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Caption
                tone="world"
                size="sm"
                icon={<Box size={isMobile ? 14 : 16} strokeWidth={2} />}
              >
                {t("mempool.blockLabel")} #{blockHeader.height}
              </Caption>
              {blockAdded && (
                <Badge
                  tone="success"
                  size="xs"
                  icon={<CircleCheck size={12} strokeWidth={2} />}
                  style={{ marginLeft: "auto" }}
                >
                  {t("mempool.added")}
                </Badge>
              )}
            </div>
            <div style={subtitle}>{t("mempool.blockSubtitle")}</div>

            <div style={headerField}>
              <span style={fieldName}>prevHash</span>
              <span style={fieldValue}>{blockHeader.prevHash}</span>
            </div>
            <div style={headerField}>
              <span style={fieldName}>merkleRoot</span>
              <span style={fieldValue}>{blockHeader.merkleRoot}</span>
            </div>
            <div style={headerField}>
              <span style={fieldName}>nonce</span>
              <span style={fieldValue}>{blockHeader.nonce}</span>
            </div>

            <div style={divider} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {blockTxs.map((tx) => (
                <TxRow
                  key={tx.id}
                  tx={tx}
                  state="normal"
                  colors={colors}
                  moduleTheme={moduleTheme}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <Button
              variant={blockAdded ? "secondary" : "primary"}
              icon={
                blockAdded ? (
                  <RotateCcw size={13} strokeWidth={2} />
                ) : (
                  <PlusCircle size={13} strokeWidth={2} />
                )
              }
              onClick={blockAdded ? reset : addBlock}
              fullWidth
              style={{ marginTop: "0.35rem" }}
            >
              {blockAdded ? t("mempool.reset") : t("mempool.addBlock")}
            </Button>
          </div>
        )}
      </div>
    </SurfaceCard>
  );
};
