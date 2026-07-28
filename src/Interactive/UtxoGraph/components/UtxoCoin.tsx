import { type CSSProperties, type FC } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { UtxoGraphMode } from "../types";

import { DoodleArrowReturn, DoodleCoin, DoodleTagNew } from "@doodle";
import { KeyRound, Lock, XCircle } from "@icons";

type Props = {
  amount: string;
  sublabel?: string;
  isChange?: boolean;
  mode: UtxoGraphMode;
  state: "idle" | "consumed" | "created";
  accent: string;
  successColor: string;
  errorColor: string;
};

export const UtxoCoin: FC<Props> = ({
  amount,
  sublabel,
  isChange = false,
  mode,
  state,
  accent,
  successColor,
  errorColor,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();
  const { t } = useTranslation();

  const consumed = state === "consumed";
  const created = state === "created";
  const color = consumed ? errorColor : created ? successColor : accent;
  const boxWidth = isMobile ? "6.75rem" : "7rem";
  const glyphSize = isMobile ? 20 : 22;

  // the coin box keeps a fixed footprint so it never grows when a badge appears
  const box: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.2rem",
    width: boxWidth,
    height: isMobile ? "5.5rem" : "5.9rem",
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
    width: "1.2rem",
    height: "1.2rem",
    border: `1px solid ${withOpacity(color, 0.5)}`,
    background: colors.base.background.secondary,
    color,
  };

  const amountStyle: CSSProperties = {
    ...typo.figure,
    whiteSpace: "nowrap",
    color: consumed ? colors.base.text.secondary : colors.base.text.primary,
    textDecoration: consumed ? "line-through" : "none",
    transition: "color 0.45s var(--ease-smooth)",
  };

  const badge = (badgeColor: string): CSSProperties => ({
    ...typo.label,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    fontVariant: "small-caps",
    color: badgeColor,
  });

  const sublabelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.secondary,
    textAlign: "center",
    maxWidth: boxWidth,
    lineHeight: 1.3,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
      <div style={box}>
        {mode === "keys" && (
          <span style={lockBox}>
            {consumed ? <KeyRound size={12} strokeWidth={2} /> : <Lock size={12} strokeWidth={2} />}
          </span>
        )}
        {isChange ? (
          <DoodleArrowReturn size={glyphSize} style={{ color }} />
        ) : (
          <DoodleCoin size={glyphSize} style={{ color, opacity: consumed ? 0.55 : 1 }} />
        )}
        <span style={amountStyle}>{amount}</span>
        {consumed && (
          <span style={badge(errorColor)}>
            <XCircle size={15} strokeWidth={2} />
            {t("utxoGraph.consumed")}
          </span>
        )}
        {created && (
          <span style={badge(successColor)}>
            <DoodleTagNew size={18} />
            {t("utxoGraph.created")}
          </span>
        )}
      </div>
      {sublabel && <span style={sublabelStyle}>{sublabel}</span>}
    </div>
  );
};
