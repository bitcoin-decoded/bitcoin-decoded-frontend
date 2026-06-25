import { type CSSProperties, type FC, useEffect, useRef } from "react";

import { Info, Plus, RotateCcw, Sparkles } from "lucide-react";

import {
  Button,
  Caption,
  Disclosure,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useBlockchainChainVisual } from "../hooks";

import { BlockCard } from "./BlockCard";
import { ChainArrow } from "./ChainArrow";

type Props = {
  resetScrollTargetId?: string;
  /** Fired once the reader has added a block (gates the surrounding tool block). */
  onComplete?: () => void;
};

export const BlockchainChainVisual: FC<Props> = ({ resetScrollTargetId, onComplete }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { blocks, addPhase, canAddBlock, canEdit, editTx, addBlock, reset } =
    useBlockchainChainVisual(onComplete);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addPhase !== "scrolling") return;
    const node = document.querySelector<HTMLElement>("[data-first-block-hash]");
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [addPhase]);

  if (blocks.length === 0) return null;

  const firstBrokenIndex = blocks.findIndex(
    (b, i) => i > 0 && b.prevHash !== blocks[i - 1].headerHash,
  );
  const isOrphaned = (i: number) => firstBrokenIndex !== -1 && i >= firstBrokenIndex;
  const isBrokenLink = (i: number) => i === firstBrokenIndex;

  const hasEdited = blocks.some((b) => b.isEdited);
  const showInvitation = canEdit && !hasEdited;
  const chainIsLinked = blocks.length >= 2 && !hasEdited;

  const handleAdd = () => {
    void addBlock();
  };

  const handleReset = async () => {
    await reset();
    const target = resetScrollTargetId
      ? document.getElementById(resetScrollTargetId)
      : containerRef.current;
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const stageFor = (i: number): "skeleton" | "revealing" | "full" => {
    const isLast = i === blocks.length - 1;
    if (!isLast || blocks.length === 1) return "full";
    if (addPhase === "skeleton") return "skeleton";
    if (addPhase === "revealing") return "revealing";
    return "full";
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.25rem",
    width: "100%",
    maxWidth: "26rem",
    margin: isMobile ? "1.5rem auto 2rem" : "2rem auto 2.5rem",
  };

  const chainStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "0.6rem",
    width: "100%",
  };

  const controlsStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.6rem",
  };

  const invitationStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    padding: "0.65rem 0.9rem",
    borderRadius: 0,
    background: withOpacity(colors[moduleTheme].background.secondary, 0.08),
    border: `1px dashed ${withOpacity(colors[moduleTheme].border.secondary, 0.4)}`,
    color: colors[moduleTheme].text.primary,
    letterSpacing: "0.01em",
    lineHeight: 1.4,
    textAlign: "left",
    whiteSpace: "pre-line",
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={chainStyle}>
        {blocks.map((block, i) => (
          <div
            key={block.number}
            className="page-enter"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "0.5rem",
            }}
          >
            <BlockCard
              block={block}
              isOrphaned={isOrphaned(i)}
              expectedPrevHash={isBrokenLink(i) ? blocks[i - 1].headerHash : undefined}
              onEditTx={(tx) => editTx(i, tx)}
              revealStage={stageFor(i)}
              canEdit={canEdit && i === 0}
              isFirstBlock={i === 0}
              highlightChainLink={chainIsLinked}
            />
            {i < blocks.length - 1 && <ChainArrow isBroken={isOrphaned(i + 1)} />}
          </div>
        ))}
      </div>

      <Disclosure title={t("chain.disclosureTitle")} icon={<Info size={14} strokeWidth={2} />}>
        {t("chain.disclosureBody")}
      </Disclosure>

      <div style={controlsStyle}>
        <Button
          onClick={handleAdd}
          disabled={!canAddBlock}
          icon={<Plus size={14} strokeWidth={2.5} />}
          size="sm"
        >
          {t("chain.addBlock")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleReset}
          icon={<RotateCcw size={14} strokeWidth={2} />}
          size="sm"
        >
          {t("chain.reset")}
        </Button>
      </div>

      {showInvitation && (
        <Caption tone="world" variant="note" size="sm" as="p" style={invitationStyle}>
          <Sparkles size={14} strokeWidth={2} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
          <span>{t("chain.invitation")}</span>
        </Caption>
      )}
    </div>
  );
};
