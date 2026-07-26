import { type CSSProperties, type FC } from "react";

import {
  Badge,
  Button,
  Caption,
  FeedbackPanel,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BlockPlate, BlockPlateRow } from "../../components";
import { getTxState } from "../helpers/";
import { useMempoolVisual } from "../hooks";
import type { MempoolVariant } from "../types";

import { TxRow } from "./TxRow";

import { DoodleHash, DoodleHierarchy, DoodleNotes, DoodleNumber, DoodleWarningTriangle } from "@doodle";

type Props = {
  variant?: MempoolVariant;
  onComplete?: () => void;
};

export const MempoolVisual: FC<Props> = ({ variant = "intro", onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];
  const { transactions, blockHeader, blockTxIds, rejectedTxId, blockAdded, addBlock, reset } =
    useMempoolVisual(language, onComplete);

  const isResolution = variant === "resolution";
  const iconSize = isMobile ? 20 : 22;

  const panelsRow: CSSProperties = {
    display: "flex",
    gap: isMobile ? "0.9rem" : "1rem",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
  };

  const panel: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: "0.85rem",
    background: withOpacity(world.background.secondary, 0.05),
    border: `1px solid ${withOpacity(world.border.secondary, 0.18)}`,
    minWidth: 0,
  };

  const subtitle: CSSProperties = { ...typo.note, color: colors.base.text.secondary };
  const emptyStyle: CSSProperties = { ...typo.note, color: colors.base.text.secondary, opacity: 0.7 };
  const headerValue: CSSProperties = { ...typo.figure, color: colors.base.text.secondary, wordBreak: "break-word" };

  const visibleMempool = transactions.filter((tx) => {
    if (!isResolution || !blockAdded) return true;
    return !blockTxIds.includes(tx.id);
  });

  const blockTxs = transactions.filter((tx) => blockTxIds.includes(tx.id));

  const txList = (list: typeof transactions, resolve: boolean) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      {list.map((tx) => (
        <TxRow
          key={tx.id}
          tx={tx}
          state={resolve ? getTxState(tx, isResolution, blockAdded, rejectedTxId) : "normal"}
          colors={colors}
          moduleTheme={moduleTheme}
          isMobile={isMobile}
        />
      ))}
    </div>
  );

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"}>
      <div style={panelsRow}>
        <div style={panel}>
          <Caption tone="world" size="sm" icon={<DoodleNotes size={iconSize} />}>
            Mempool
          </Caption>
          <div style={subtitle}>{t("mempool.subtitle")}</div>

          {visibleMempool.length === 0 ? (
            <span style={emptyStyle}>{t("mempool.empty")}</span>
          ) : (
            txList(visibleMempool, true)
          )}

          {!blockAdded && (
            <FeedbackPanel
              tone="info"
              icon={<DoodleWarningTriangle size={18} />}
              style={{ marginTop: "0.25rem" }}
            >
              {t("mempool.doubleSpend.prefix")} <b>{t("mempool.doubleSpend.emphasis")}</b>{" "}
              {t("mempool.doubleSpend.suffix")}
            </FeedbackPanel>
          )}

          {isResolution && blockAdded && (
            <FeedbackPanel
              tone="error"
              icon={<DoodleWarningTriangle size={18} />}
              style={{ marginTop: "0.25rem" }}
            >
              {t("mempool.invalidated.prefix")} <b>{t("mempool.invalidated.emphasis")}</b>{" "}
              {t("mempool.invalidated.suffix")}
            </FeedbackPanel>
          )}
        </div>

        {isResolution && (
          <BlockPlate
            title={
              <>
                <span>
                  {t("mempool.blockLabel")} #{blockHeader.height}
                </span>
                {blockAdded && (
                  <Badge tone="success" size="xs">
                    {t("mempool.added")}
                  </Badge>
                )}
              </>
            }
            style={{ flex: 1, minWidth: 0 }}
          >
            <BlockPlateRow icon={<DoodleHash size={iconSize} />} label={t("chain.prevHash")} zebra>
              <span style={headerValue}>{blockHeader.prevHash}</span>
            </BlockPlateRow>
            <BlockPlateRow icon={<DoodleHierarchy size={iconSize} />} label={t("chain.merkleRoot")} zebra={false}>
              <span style={headerValue}>{blockHeader.merkleRoot}</span>
            </BlockPlateRow>
            <BlockPlateRow icon={<DoodleNumber size={iconSize} />} label={t("mining.nonce")} zebra>
              <span style={headerValue}>{blockHeader.nonce}</span>
            </BlockPlateRow>

            <div style={{ marginTop: "0.5rem" }}>{txList(blockTxs, false)}</div>

            <Button
              variant={blockAdded ? "secondary" : "primary"}
              onClick={blockAdded ? reset : addBlock}
              fullWidth
              style={{ marginTop: "0.6rem" }}
            >
              {blockAdded ? t("mempool.reset") : t("mempool.addBlock")}
            </Button>
          </BlockPlate>
        )}
      </div>
    </SurfaceCard>
  );
};
