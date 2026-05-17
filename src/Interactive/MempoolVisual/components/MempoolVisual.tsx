import { type CSSProperties, type FC } from "react";

import { AlertTriangle, Box, CircleCheck, Inbox, PlusCircle, RotateCcw } from "lucide-react";

import {
  Badge,
  Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { TxRow } from "../../components";
import { getTxState } from "../helpers/";
import { useMempoolVisual } from "../hooks";
import type { MempoolVariant } from "../types";

export const MempoolVisual: FC<{ variant?: MempoolVariant }> = ({ variant = "intro" }) => {
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { transactions, blockHeader, blockTxIds, rejectedTxId, blockAdded, addBlock, reset } =
    useMempoolVisual(language);

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
                  state={getTxState(tx, isResolution, blockAdded, rejectedTxId)}
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
