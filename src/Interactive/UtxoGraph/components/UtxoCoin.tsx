import { type CSSProperties, type FC } from "react";

import { getBrandGold, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { UtxoGraphMode } from "../types";

import { DoodleArrowReturn, DoodleAsterisk, DoodleCoin, DoodleLock, DoodleTagNew, DoodleUnlock } from "@doodle";

type Props = {
  amount: string;
  sublabel?: string;
  openedLabel?: string;
  openedBy?: string;
  isChange?: boolean;
  mode: UtxoGraphMode;
  state: "idle" | "consumed" | "created";
  accent: string;
  successColor: string;
};

export const UtxoCoin: FC<Props> = ({
  amount,
  sublabel,
  openedLabel,
  openedBy,
  isChange = false,
  mode,
  state,
  accent,
  successColor,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors, theme } = usePageTheme();
  const { t } = useTranslation();

  const consumed = state === "consumed";
  const created = state === "created";
  // no red: a consumed coin is de-emphasised (neutral ink), not an error
  const muted = colors.base.text.secondary;
  const gold = getBrandGold(theme);
  const color = consumed ? muted : created ? successColor : accent;
  const lockColor = consumed ? muted : gold;
  const showLock = mode === "keys";
  const boxWidth = isMobile ? "6.75rem" : "7rem";
  const glyphSize = isMobile ? 20 : 22;
  const badgeSize = isMobile ? 20 : 22;
  const openedRow = consumed && !!openedBy;

  // the coin box keeps a fixed footprint so it never grows when a badge appears
  const box: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
    width: boxWidth,
    height: isMobile ? "6rem" : "6.4rem",
    padding: "0.4rem",
    border: `1px solid ${withOpacity(color, consumed ? 0.3 : 0.45)}`,
    background: withOpacity(color, consumed ? 0.04 : 0.09),
    transition: "border-color 0.45s var(--ease-smooth), background 0.45s var(--ease-smooth)",
  };

  const lockBox: CSSProperties = {
    position: "absolute",
    top: "-0.4rem",
    right: "-0.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.3rem",
    height: "1.3rem",
    border: `1px solid ${withOpacity(lockColor, 0.5)}`,
    background: colors.base.background.secondary,
    color: lockColor,
  };

  const statusBadge: CSSProperties = {
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    fontVariant: "small-caps",
    color: created ? successColor : muted,
  };

  const amountStyle: CSSProperties = {
    ...typo.figure,
    whiteSpace: "nowrap",
    color: consumed ? colors.base.text.secondary : colors.base.text.primary,
    textDecoration: consumed ? "line-through" : "none",
    transition: "color 0.45s var(--ease-smooth)",
  };

  const sublabelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.secondary,
    textAlign: "center",
    maxWidth: boxWidth,
    lineHeight: 1.3,
  };

  const openedChip: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: gold,
    borderBottom: `1px solid ${withOpacity(gold, 0.5)}`,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", width: boxWidth }}>
      <div style={box}>
        {showLock && (
          <span style={lockBox}>
            {consumed ? <DoodleUnlock size={14} /> : <DoodleLock size={14} />}
          </span>
        )}

        <span style={statusBadge}>
          {consumed ? (
            <>
              <DoodleAsterisk size={badgeSize} />
              {t("utxoGraph.statusSpent")}
            </>
          ) : created ? (
            <>
              <DoodleTagNew size={badgeSize} />
              {t("utxoGraph.statusCreated")}
            </>
          ) : (
            t("utxoGraph.statusLocked")
          )}
        </span>

        {isChange ? (
          <DoodleArrowReturn size={glyphSize} style={{ color }} />
        ) : (
          <DoodleCoin size={glyphSize} style={{ color, opacity: consumed ? 0.55 : 1 }} />
        )}

        <span style={amountStyle}>{amount}</span>
      </div>

      {openedRow ? (
        <span style={sublabelStyle}>
          {openedLabel && <span style={openedChip}>{openedLabel}</span>} {openedBy}
        </span>
      ) : (
        sublabel && <span style={sublabelStyle}>{sublabel}</span>
      )}
    </div>
  );
};
