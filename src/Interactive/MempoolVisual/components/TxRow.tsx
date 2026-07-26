import type { CSSProperties, FC } from "react";

import { getTypography, useBreakpoint, type usePageTheme, withOpacity } from "../../../Design";
import type { MempoolTransaction, TxState } from "../types";

import { DoodleWarningTriangle } from "@doodle";
import { ArrowRight } from "@icons";

export const TxRow: FC<{
  tx: MempoolTransaction;
  state: TxState;
  colors: ReturnType<typeof usePageTheme>["colors"];
  moduleTheme: ReturnType<typeof usePageTheme>["moduleTheme"];
  isMobile: boolean;
}> = ({ tx, state, colors, moduleTheme, isMobile }) => {
  const typo = getTypography(useBreakpoint());
  const world = colors[moduleTheme];
  const isConflict = state === "conflict";
  const isRejected = state === "rejected";
  const flagged = isConflict || isRejected;
  const borderColor = flagged ? colors.semantic.error.text : world.border.secondary;

  const row: CSSProperties = {
    ...typo.micro,
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.35rem" : "0.5rem",
    padding: isMobile ? "0.4rem 0.55rem" : "0.45rem 0.65rem",
    background: withOpacity(borderColor, flagged ? 0.09 : 0.04),
    border: `1px solid ${withOpacity(borderColor, flagged ? 0.35 : 0.14)}`,
    transition: "background 0.4s var(--ease-smooth), border-color 0.4s var(--ease-smooth)",
    textDecoration: isRejected ? "line-through" : "none",
    opacity: isRejected ? 0.6 : 1,
  };

  const nameStyle: CSSProperties = { color: colors.base.text.primary };
  const amountStyle: CSSProperties = { color: colors.base.text.primary, marginLeft: "auto" };

  return (
    <div style={row}>
      {flagged && (
        <DoodleWarningTriangle
          size={16}
          style={{ color: colors.semantic.error.text, flexShrink: 0 }}
        />
      )}
      <span style={nameStyle}>{tx.from}</span>
      <ArrowRight size={13} strokeWidth={1.75} style={{ opacity: 0.35, flexShrink: 0 }} />
      <span style={nameStyle}>{tx.to}</span>
      <span style={amountStyle}>{tx.amount}</span>
    </div>
  );
};
