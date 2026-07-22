import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import type { SigPlaygroundColors } from "../types";

import { Shuffle } from "@icons";

type Props = {
  onClick: () => void;
  disabled: boolean;
  label: string;
  colors: SigPlaygroundColors;
};

export const ModifyKeyButton: FC<Props> = ({ onClick, disabled, label, colors }) => {
  const typo = getTypography();
  const buttonStyle: CSSProperties = {
    alignSelf: "center",
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: colors.errorColor,
    padding: "0.3rem 0.55rem",
    borderRadius: 0,
    background: withOpacity(colors.errorColor, 0.1),
    border: `1px solid ${withOpacity(colors.errorColor, 0.4)}`,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    cursor: disabled ? "not-allowed" : "pointer",
    fontVariant: "small-caps",
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
      <Shuffle size={12} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      {label}
    </button>
  );
};
