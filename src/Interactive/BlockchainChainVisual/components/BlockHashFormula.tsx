import { type CSSProperties, type FC } from "react";

import { BRAND, HighlightText, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";

import { HashComparison } from "./HashComparison";

type Props = {
  hash: string;
  originalHash: string;
  isEdited: boolean;
  isAnchor?: boolean;
  /** Pedagogical highlight on the output hash when the chain is still intact. */
  highlightHash?: boolean;
};

export const BlockHashFormula: FC<Props> = ({
  hash,
  originalHash,
  isEdited,
  isAnchor = false,
  highlightHash = false,
}) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const accent = isEdited ? colors.semantic.error.text : colors.violet.text.secondary;
  const accentBorder = isEdited ? colors.semantic.error.border : colors.violet.border.secondary;
  const labelColor = colors.violet.text.secondary;

  const mono = { fontFamily: BRAND.fonts.mono } as const;

  const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    padding: isMobile ? "0.55rem 0.7rem" : "0.7rem 0.85rem",
    borderRadius: 0,
    background: withOpacity(accent, 0.08),
    border: `1px solid ${withOpacity(accentBorder, 0.3)}`,
    transition: "all 0.3s var(--ease-smooth)",
    scrollMarginTop: "16px",
    overflow: "hidden",
  };

  const formulaLine: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    color: labelColor,
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "baseline",
    gap: "0.35rem",
  };

  const hashValueStyle: CSSProperties = {
    ...mono,
    fontWeight: 500,
    color: accent,
  };

  return (
    <div style={container} {...(isAnchor ? { "data-first-block-hash": "true" } : {})}>
      {isEdited ? (
        <>
          <span style={{ ...formulaLine, whiteSpace: "normal" }}>{t("chain.hashFormula")}</span>
          <HashComparison originalHash={originalHash} newHash={hash} accent={accent} />
        </>
      ) : (
        <div style={formulaLine}>
          <span>{t("chain.hashFormula")}</span>
          <span style={{ opacity: 0.7 }}>=</span>
          {highlightHash ? (
            <span className="chain-hash-focus">
              <HighlightText highLightColorHex={colors.violet.text.secondary}>
                <span style={hashValueStyle}>{truncateHash(hash)}</span>
              </HighlightText>
            </span>
          ) : (
            <span style={hashValueStyle}>{truncateHash(hash)}</span>
          )}
        </div>
      )}
    </div>
  );
};
