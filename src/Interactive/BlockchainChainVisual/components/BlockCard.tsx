import { type CSSProperties, type FC } from "react";

import { Clock, GitMerge, Hash, Link2, Pickaxe } from "lucide-react";

import { Badge,
BRAND,   HighlightText,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";
import { randomizeTx } from "../helpers";
import type { BlockData } from "../types";

import { BlockHashFormula } from "./BlockHashFormula";
import { BlockRow } from "./BlockRow";
import { HashComparison } from "./HashComparison";
import { ModifyTxButton } from "./ModifyTxButton";
import { TransactionInput } from "./TransactionInput";

type Props = {
  block: BlockData;
  isOrphaned: boolean;
  expectedPrevHash?: string;
  onEditTx: (next: string) => void;
  /** "skeleton" = only title + prev hash visible. "revealing" = full with stagger anim. "full" = full, no anim. */
  revealStage?: "skeleton" | "revealing" | "full";
  canEdit?: boolean;
  /** Marks block #1's hash formula as the scroll anchor used when adding a new block. */
  isFirstBlock?: boolean;
  /** When true, the chain is intact and pedagogical highlights are applied to linked hashes. */
  highlightChainLink?: boolean;
};

export const BlockCard: FC<Props> = ({
  block,
  isOrphaned,
  expectedPrevHash,
  onEditTx,
  revealStage = "full",
  canEdit = false,
  isFirstBlock = false,
  highlightChainLink = false,
}) => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const isBrokenLink = expectedPrevHash !== undefined;

  const merkleAccent = block.isEdited ? colors.semantic.error.text : colors.semantic.info.text;
  const prevHashAccent = isBrokenLink ? colors.semantic.error.text : colors.violet.text.secondary;
  const highlightHex = colors.violet.text.secondary;

  const mono = { fontFamily: BRAND.fonts.mono } as const;

  const titleStyle: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.body,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: world.text.secondary,
    textAlign: "center",
    paddingBottom: "0.35rem",
    borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  };

  const sectionLabel: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: world.text.primary,
    padding: "0.2rem 0.45rem",
    borderRadius: 0,
    background: withOpacity(world.background.secondary, 0.1),
    border: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
    alignSelf: "flex-start",
    marginTop: "0.1rem",
  };

  const valueStyle: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.note,
    color: colors.base.text.secondary,
    wordBreak: "break-all",
  };

  // Cutive Mono ships a single weight — keep everything at 500 (heavier
  // synthesizes a crude faux-bold). Emphasis comes from color, not weight.
  const accentValueStyle = (accent: string): CSSProperties => ({
    ...valueStyle,
    color: accent,
    fontWeight: 500,
  });

  const iconSize = isMobile ? 12 : 14;

  const stagger = (i: number): CSSProperties =>
    revealStage === "revealing" ? { animationDelay: `${i * 0.16}s` } : {};

  const revealClass = revealStage === "revealing" ? "chain-field-reveal" : undefined;

  const prevHashContent =
    isBrokenLink && expectedPrevHash ? (
      <HashComparison
        originalHash={block.prevHash}
        newHash={expectedPrevHash}
        accent={prevHashAccent}
      />
    ) : highlightChainLink && !isFirstBlock ? (
      <span className="chain-hash-focus" style={{ alignSelf: "flex-start" }}>
        <HighlightText highLightColorHex={highlightHex}>
          <span style={accentValueStyle(prevHashAccent)}>
            {truncateHash(block.prevHash)}
          </span>
        </HighlightText>
      </span>
    ) : (
      <span style={accentValueStyle(prevHashAccent)}>{truncateHash(block.prevHash)}</span>
    );

  const merkleContent = block.isEdited ? (
    <HashComparison
      originalHash={block.originalMerkleRoot}
      newHash={block.merkleRoot}
      accent={merkleAccent}
    />
  ) : (
    <span style={accentValueStyle(merkleAccent)}>{truncateHash(block.merkleRoot)}</span>
  );

  return (
    <SurfaceCard
      gap="0.25rem"
      glowColor={isOrphaned || block.isEdited ? colors.semantic.error.border : undefined}
      style={{
        padding: isMobile ? "0.8rem" : "0.95rem",
        borderRadius: 0,
        width: "100%",
        transition: "all 0.3s var(--ease-smooth)",
      }}
    >
      <div style={titleStyle}>
        <span>
          {t("chain.block")} #{block.number}
        </span>
        {block.isEdited && (
          <Badge tone="error" size="xs">
            {t("chain.modified")}
          </Badge>
        )}
        {isOrphaned && !block.isEdited && (
          <Badge tone="error" size="xs">
            {t("chain.chainBroken")}
          </Badge>
        )}
      </div>

      <span style={sectionLabel}>{t("chain.header")}</span>

      <BlockRow
        icon={<Hash size={iconSize} strokeWidth={1.8} />}
        iconAccent={prevHashAccent}
        label={t("chain.prevHash")}
        zebra
      >
        {prevHashContent}
      </BlockRow>

      {revealStage !== "skeleton" && (
        <>
          <div className={revealClass} style={stagger(0)}>
            <BlockRow
              icon={<GitMerge size={iconSize} strokeWidth={1.8} />}
              iconAccent={merkleAccent}
              label={t("chain.merkleRoot")}
              zebra={false}
            >
              {merkleContent}
            </BlockRow>
          </div>

          <div className={revealClass} style={stagger(1)}>
            <BlockRow icon={<Clock size={iconSize} strokeWidth={1.8} />} label={t("chain.timestamp")} zebra>
              <span style={valueStyle}>{block.timestamp}</span>
            </BlockRow>
          </div>

          <div className={revealClass} style={stagger(2)}>
            <BlockRow icon={<Pickaxe size={iconSize} strokeWidth={1.8} />} label="Nonce" zebra={false}>
              <span style={valueStyle}>{block.nonce.toLocaleString(fr ? "fr-FR" : "en-US")}</span>
            </BlockRow>
          </div>

          <div
            className={revealClass}
            style={{
              ...stagger(3),
              borderTop: `1px dashed ${withOpacity(world.border.secondary, 0.3)}`,
              margin: "0.3rem 0 0.15rem",
            }}
          />

          <div className={revealClass} style={stagger(3)}>
            <span style={sectionLabel}>{t("chain.body")}</span>
          </div>

          <div className={revealClass} style={stagger(4)}>
            <BlockRow
              icon={<Link2 size={iconSize} strokeWidth={1.8} />}
              label={t("chain.transaction")}
              zebra
              headerAction={
                isFirstBlock ? (
                  <ModifyTxButton
                    blockNumber={block.number}
                    onClick={() => onEditTx(randomizeTx(block.tx))}
                    disabled={!canEdit || block.isEdited}
                  />
                ) : null
              }
            >
              <TransactionInput value={block.tx} />
            </BlockRow>
          </div>

          <div
            className={revealClass}
            style={{
              ...stagger(5),
              borderTop: `1px dashed ${withOpacity(world.border.secondary, 0.3)}`,
              margin: "0.3rem 0 0.15rem",
            }}
          />

          <div className={revealClass} style={stagger(5)}>
            <BlockHashFormula
              hash={block.headerHash}
              originalHash={block.originalHeaderHash}
              isEdited={block.isEdited}
              isAnchor={isFirstBlock}
              highlightHash={highlightChainLink && isFirstBlock}
            />
          </div>
        </>
      )}
    </SurfaceCard>
  );
};
