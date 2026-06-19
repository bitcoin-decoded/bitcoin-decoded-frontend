import { type CSSProperties, type FC } from "react";

import { Shuffle } from "lucide-react";

import { withOpacity } from "../../../Design/helpers";
import type { SigPlaygroundColors } from "../types";

type Props = {
  onClick: () => void;
  disabled: boolean;
  label: string;
  isMobile: boolean;
  colors: SigPlaygroundColors;
};

/**
 * Swaps the private key for a different one (cf. ModifyTxButton in
 * BlockchainChainVisual): always present, but disabled when the key can't be
 * changed - before derivation, and again after the single allowed edit.
 * Error-tinted, because changing the key is what breaks the match.
 */
export const ModifyKeyButton: FC<Props> = ({ onClick, disabled, label, isMobile, colors }) => {
  const buttonStyle: CSSProperties = {
    alignSelf: "center",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.55rem" : "0.6rem",
    fontWeight: 700,
    color: colors.errorColor,
    padding: "0.3rem 0.55rem",
    borderRadius: "0.35rem",
    background: withOpacity(colors.errorColor, 0.1),
    border: `1px solid ${withOpacity(colors.errorColor, 0.4)}`,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    cursor: disabled ? "not-allowed" : "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    textAlign: "center",
    opacity: disabled ? 0.4 : 1,
    transition: "opacity 0.25s var(--ease-smooth), background 0.2s var(--ease-smooth)",
  };

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={label}
      style={buttonStyle}
    >
      <Shuffle size={10} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      {label}
    </button>
  );
};
