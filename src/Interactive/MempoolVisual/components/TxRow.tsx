import type { CSSProperties, FC } from "react";

import { BRAND, type usePageTheme, withOpacity } from "../../../Design";
import type { MempoolTransaction, TxState } from "../types";

import { AlertTriangle, ArrowRight } from "@icons";

export const TxRow: FC<{
  tx: MempoolTransaction;
  state: TxState;
  colors: ReturnType<typeof usePageTheme>["colors"];
  moduleTheme: ReturnType<typeof usePageTheme>["moduleTheme"];
  isMobile: boolean;
}> = ({ tx, state, colors, moduleTheme, isMobile }) => {
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };
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
    borderRadius: 0,
    fontSize: BRAND.fontSize.note,
    background: withOpacity(borderColor, flagged ? 0.08 : 0.03),
    border: `1px solid ${withOpacity(borderColor, flagged ? 0.3 : 0.1)}`,
    transition: "all 0.4s var(--ease-smooth)",
    textDecoration: isRejected ? "line-through" : "none",
    opacity: isRejected ? 0.6 : 1,
  };

  const nameStyle: CSSProperties = { fontWeight: 500, color: colors.base.text.primary };
  const amountStyle: CSSProperties = {
    fontWeight: 500,
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
      <ArrowRight size={12} strokeWidth={2} style={{ opacity: 0.4, flexShrink: 0 }} />
      <span style={nameStyle}>{tx.to}</span>
      <span style={amountStyle}>{tx.amount}</span>
    </div>
  );
};
