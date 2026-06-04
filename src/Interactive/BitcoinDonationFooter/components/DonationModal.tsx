import { type CSSProperties, type FC, type ReactNode } from "react";

import { X } from "lucide-react";

import { usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useModalDismiss } from "../hooks";

type Props = {
  onClose: () => void;
  ariaLabel: string;
  closeLabel: string;
  children: ReactNode;
};

/** Centered modal shell for the footer display mode (backdrop / Escape / X to close). */
export const DonationModal: FC<Props> = ({ onClose, ariaLabel, closeLabel, children }) => {
  const { colors } = usePageTheme();
  useModalDismiss(onClose);

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(2px)",
    animation: "donationFade 200ms var(--ease-smooth) both",
  };

  const panelStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "30rem",
    maxHeight: "90vh",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "3rem 1.5rem 1.5rem",
    borderRadius: "1rem",
    background: `linear-gradient(190deg, ${colors.amber.background.primary}, ${colors.base.background.primary})`,
    border: `1px solid ${withOpacity(colors.amber.border.secondary, 0.3)}`,
    boxShadow: colors.boxShadow.strong,
  };

  const closeBtnStyle: CSSProperties = {
    position: "absolute",
    top: "0.75rem",
    right: "0.75rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    color: colors.base.text.secondary,
    cursor: "pointer",
  };

  return (
    <div
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={ariaLabel} style={panelStyle}>
        <button type="button" style={closeBtnStyle} onClick={onClose} aria-label={closeLabel}>
          <X size={18} strokeWidth={2} />
        </button>
        {children}
      </div>
    </div>
  );
};
