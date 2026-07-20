import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { UtxoGraphMode } from "../types";

import { CheckCircle, Coins, KeyRound, Lock, XCircle } from "@icons";

type Props = {
  amount: string;
  sublabel?: string;
  mode: UtxoGraphMode;
  /** idle = pending, consumed = spent input, created = new output. */
  state: "idle" | "consumed" | "created";
  accent: string;
  successColor: string;
  errorColor: string;
  baseTextSecondary: string;
};

// Read on call, not on import: a module-level dereference of an imported
// binding is what turns an import cycle from harmless into fatal.
const mono = (): CSSProperties => ({ fontFamily: BRAND.fonts.mono });

export const UtxoCoin: FC<Props> = ({
  amount,
  sublabel,
  mode,
  state,
  accent,
  successColor,
  errorColor,
  baseTextSecondary,
}) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const consumed = state === "consumed";
  const created = state === "created";
  const color = consumed ? errorColor : created ? successColor : accent;

  const chip: CSSProperties = {
    ...mono(),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.1rem",
    minWidth: "4.6rem",
    padding: "0.55rem 0.7rem 0.45rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(color, consumed ? 0.28 : 0.45)}`,
    background: withOpacity(color, consumed ? 0.03 : 0.09),
    transition: "all 0.45s var(--ease-smooth)",
  };

  const lockBox: CSSProperties = {
    position: "absolute",
    top: "-0.45rem",
    right: "-0.45rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.15rem",
    height: "1.15rem",
    borderRadius: "999px",
    border: `1px solid ${withOpacity(color, 0.4)}`,
    background: withOpacity(consumed ? successColor : accent, 0.14),
    color: consumed ? successColor : accent,
  };

  const amountStyle: CSSProperties = {
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: consumed ? withOpacity(errorColor, 0.55) : color,
    textDecoration: consumed ? "line-through" : "none",
    transition: "all 0.45s var(--ease-smooth)",
  };

  const sublabelStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.04em",
    color: withOpacity(baseTextSecondary, 0.7),
  };

  const badge = (badgeColor: string): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.2rem",
    marginTop: "0.2rem",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: badgeColor,
  });

  return (
    <div style={chip}>
      {mode === "keys" && (
        <span style={lockBox}>
          {consumed ? (
            <KeyRound size={11} strokeWidth={2.2} />
          ) : (
            <Lock size={11} strokeWidth={2.2} />
          )}
        </span>
      )}
      <Coins size={15} strokeWidth={2} style={{ color, opacity: consumed ? 0.5 : 1 }} />
      <span style={amountStyle}>{amount}</span>
      {sublabel && <span style={sublabelStyle}>{sublabel}</span>}
      {consumed && (
        <span style={badge(withOpacity(errorColor, 0.85))}>
          <XCircle size={9} strokeWidth={2.4} />
          {t("utxoGraph.consumed")}
        </span>
      )}
      {created && (
        <span style={badge(successColor)}>
          <CheckCircle size={9} strokeWidth={2.4} />
          {t("utxoGraph.created")}
        </span>
      )}
    </div>
  );
};
