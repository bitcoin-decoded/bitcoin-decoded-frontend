import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  getTypography,
  HighlightText,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";

import { HashComparison } from "./HashComparison";

type Props = {
  hash: string;
  originalHash: string;
  isEdited: boolean;
  isAnchor?: boolean;
  highlightHash?: boolean;
};

export const BlockHashFormula: FC<Props> = ({
  hash,
  originalHash,
  isEdited,
  isAnchor = false,
  highlightHash = false,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  const accent = isEdited ? colors.semantic.error.text : colors.violet.text.secondary;
  const accentBorder = isEdited ? colors.semantic.error.border : colors.violet.border.secondary;

  const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    padding: isMobile ? "0.55rem 0.7rem" : "0.7rem 0.85rem",
    background: withOpacity(accent, 0.08),
    border: `${BRAND.figures.ruleThickness}px solid ${withOpacity(accentBorder, 0.35)}`,
    transition: "border-color 0.3s var(--ease-smooth)",
    scrollMarginTop: "16px",
    overflow: "hidden",
  };

  const formulaLine: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.violet.text.secondary,
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "0.4rem",
  };

  const hashValueStyle: CSSProperties = { ...typo.figure, color: accent };

  return (
    <div style={container} {...(isAnchor ? { "data-first-block-hash": "true" } : {})}>
      {isEdited ? (
        <>
          <span style={formulaLine}>{t("chain.hashFormula")}</span>
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
