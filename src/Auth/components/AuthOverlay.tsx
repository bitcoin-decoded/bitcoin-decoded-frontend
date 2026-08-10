import { type CSSProperties, type FC, type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getBrandGold, THEME_COLORS, useBreakpoint, useThemeContext, withOpacity } from "../../Design";
import { useTranslation } from "../../I18n";

import { ChevronLeft, X } from "@icons";

type Props = {
  open: boolean;
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
  children: ReactNode;
};

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The onboarding modal shell (CDC §7): a dimmed, blurred backdrop over a single
// centred card. Escape and a backdrop click close it — for a locked device that
// means "keep reading as a guest", never a trap. Ported to document.body so it
// sits above the app (and above the data gate, which is why the flow lives higher
// in the tree). Presentational state only.
export const AuthOverlay: FC<Props> = ({ open, canGoBack, onBack, onClose, children }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);
  const isMobile = useBreakpoint() === "mobile";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!open) {
      setShow(false);
      return;
    }
    if (prefersReducedMotion()) {
      setShow(true);
      return;
    }
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined" || !open) return null;

  const backdropStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 80,
    display: "grid",
    placeItems: isMobile ? "end center" : "center",
    padding: isMobile ? 0 : "1.5rem",
    background: withOpacity(colors.base.background.primary, 0.6),
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    opacity: show ? 1 : 0,
    transition: "opacity 0.35s var(--ease-smooth)",
  };

  const cardStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: isMobile ? "100%" : "31rem",
    maxHeight: isMobile ? "92vh" : "88vh",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: isMobile ? "3rem 1.35rem 1.6rem" : "3rem 2.25rem 2.25rem",
    background: colors.base.background.secondary,
    border: `1px solid ${colors.base.border.secondary}`,
    borderTop: `2px solid ${gold}`,
    boxShadow: colors.boxShadow.strong,
    transform: show ? "translateY(0) scale(1)" : `translateY(${isMobile ? "16px" : "8px"}) scale(0.99)`,
    opacity: show ? 1 : 0,
    transition: "transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.35s var(--ease-smooth)",
  };

  const cornerButton = (side: "left" | "right"): CSSProperties => ({
    position: "absolute",
    top: "0.85rem",
    [side]: "0.85rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    border: "none",
    background: "transparent",
    color: colors.base.text.secondary,
    cursor: "pointer",
    transition: "color 0.2s",
  });

  return createPortal(
    <div style={backdropStyle} onClick={onClose} role="presentation">
      <div style={cardStyle} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        {canGoBack && (
          <button type="button" onClick={onBack} aria-label={t("auth.a11y.back")} style={cornerButton("left")}>
            <ChevronLeft size={18} />
          </button>
        )}
        <button type="button" onClick={onClose} aria-label={t("auth.a11y.close")} style={cornerButton("right")}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
