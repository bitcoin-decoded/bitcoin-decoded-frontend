import { type CSSProperties, type FC } from "react";

import {
  Badge,
  getTypography,
  HighlightText,
  useBreakpoint,
  usePageTheme,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BlockPlate, BlockPlateRow, BlockPlateSection } from "../../components";
import { truncateHash } from "../../helpers";
import { randomizeTx } from "../helpers";
import type { BlockData } from "../types";

import { BlockHashFormula } from "./BlockHashFormula";
import { HashComparison } from "./HashComparison";
import { ModifyTxButton } from "./ModifyTxButton";
import { TransactionInput } from "./TransactionInput";

import { DoodleBookPages, DoodleClock, DoodleHash, DoodleHierarchy, DoodleNumber } from "@doodle";

type Props = {
  block: BlockData;
  isOrphaned: boolean;
  expectedPrevHash?: string;
  onEditTx: (next: string) => void;
  revealStage?: "skeleton" | "revealing" | "full";
  canEdit?: boolean;
  isFirstBlock?: boolean;
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
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors } = usePageTheme();
  const isBrokenLink = expectedPrevHash !== undefined;
  const isBroken = isOrphaned || block.isEdited;

  const merkleAccent = block.isEdited ? colors.semantic.error.text : colors.semantic.info.text;
  const prevHashAccent = isBrokenLink ? colors.semantic.error.text : colors.violet.text.secondary;

  const iconSize = isMobile ? 20 : 22;

  const valueStyle: CSSProperties = {
    ...typo.figure,
    color: colors.base.text.primary,
    wordBreak: "break-word",
  };

  const accentValueStyle = (accent: string): CSSProperties => ({ ...valueStyle, color: accent });

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
      <span className="chain-hash-focus">
        {/* Neutral, not violet: the marker behind it is violet, and the pair
            sank into each other. */}
        <HighlightText hue="violet">
          <span style={valueStyle}>{truncateHash(block.prevHash)}</span>
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
    <BlockPlate
      frameColor={isBroken ? colors.semantic.error.text : undefined}
      title={
        <>
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
        </>
      }
    >
      <BlockPlateSection>{t("chain.header")}</BlockPlateSection>

      <BlockPlateRow
        icon={<DoodleHash size={iconSize} />}
        label={t("chain.prevHash")}
        zebra
        stacked={isBrokenLink}
      >
        {prevHashContent}
      </BlockPlateRow>

      {revealStage !== "skeleton" && (
        <>
          <div className={revealClass} style={stagger(0)}>
            <BlockPlateRow
              icon={<DoodleHierarchy size={iconSize} />}
              label={t("chain.merkleRoot")}
              zebra={false}
              stacked={block.isEdited}
            >
              {merkleContent}
            </BlockPlateRow>
          </div>

          <div className={revealClass} style={stagger(1)}>
            <BlockPlateRow icon={<DoodleClock size={iconSize} />} label={t("chain.timestamp")} zebra>
              <span style={valueStyle}>{block.timestamp}</span>
            </BlockPlateRow>
          </div>

          <div className={revealClass} style={stagger(2)}>
            <BlockPlateRow
              icon={<DoodleNumber size={iconSize} />}
              label="Nonce"
              zebra={false}
            >
              <span style={valueStyle}>{block.nonce.toLocaleString(fr ? "fr-FR" : "en-US")}</span>
            </BlockPlateRow>
          </div>

          <div className={revealClass} style={stagger(3)}>
            <BlockPlateSection>{t("chain.body")}</BlockPlateSection>
          </div>

          <div className={revealClass} style={stagger(4)}>
            <BlockPlateRow
              icon={<DoodleBookPages size={iconSize} />}
              label={t("chain.transaction")}
              zebra
              stacked
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
            </BlockPlateRow>
          </div>

          <div className={revealClass} style={{ ...stagger(5), marginTop: "0.5rem" }}>
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
    </BlockPlate>
  );
};
