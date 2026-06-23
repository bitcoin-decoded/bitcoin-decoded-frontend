import { type CSSProperties, type FC } from "react";

import { Shuffle } from "lucide-react";

import { BRAND, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  onClick: () => void;
  blockNumber: number;
  disabled?: boolean;
};

export const ModifyTxButton: FC<Props> = ({ onClick, blockNumber, disabled = false }) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const buttonStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.55rem" : "0.6rem",
    fontWeight: 700,
    color: colors.semantic.error.text,
    padding: "0.3rem 0.5rem",
    borderRadius: "0.35rem",
    background: withOpacity(colors.semantic.error.text, 0.1),
    border: `1px solid ${withOpacity(colors.semantic.error.border, 0.4)}`,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    cursor: disabled ? "not-allowed" : "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    flexShrink: 0,
    opacity: disabled ? 0.4 : 1,
    transition: "opacity 0.25s var(--ease-smooth), background 0.2s var(--ease-smooth)",
  };

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={`${t("chain.editTx")} #${blockNumber}`}
      style={buttonStyle}
    >
      <Shuffle size={10} strokeWidth={2.5} />
      {t("chain.modifyTx")}
    </button>
  );
};
