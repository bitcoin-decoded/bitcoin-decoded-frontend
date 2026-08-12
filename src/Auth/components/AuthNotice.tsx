import { type CSSProperties, type FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { BRAND, Button, getBrandGold, THEME_COLORS, useBreakpoint, useThemeContext } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow, useAuthNotice } from "../hooks";

import { X } from "@icons";

// The non-modal notices (CDC §7.6 backup reminder, §9 storage unavailable): a
// quiet card anchored to the bottom, dismissible, never trapping the reader. Lives
// outside the overlay and hides whenever the overlay is open, so the two never
// stack. Dumb: the decision of what (if anything) to show is the hook's.
export const AuthNotice: FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const isMobile = useBreakpoint() === "mobile";
  const { notice, download, dismiss } = useAuthNotice();
  const { isOpen } = useAuthFlow();

  const visible = notice !== null && !isOpen;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) {
      setShow(false);
      return;
    }
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  if (typeof document === "undefined" || !visible) return null;

  const accent = notice === "storageUnavailable" ? colors.semantic.warning.text : getBrandGold(theme);

  const wrapStyle: CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 70,
    display: "flex",
    justifyContent: "center",
    padding: isMobile ? "0.75rem" : "1.5rem",
    pointerEvents: "none",
  };

  const cardStyle: CSSProperties = {
    pointerEvents: "auto",
    position: "relative",
    width: "100%",
    maxWidth: "27rem",
    boxSizing: "border-box",
    padding: isMobile ? "1rem 1.1rem" : "1.15rem 1.35rem",
    background: colors.base.background.secondary,
    border: `1px solid ${colors.base.border.secondary}`,
    borderTop: `2px solid ${accent}`,
    boxShadow: colors.boxShadow.strong,
    transform: show ? "translateY(0)" : "translateY(12px)",
    opacity: show ? 1 : 0,
    transition: "transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.35s var(--ease-smooth)",
  };

  const textStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "0.9rem" : "0.95rem",
    lineHeight: 1.55,
    color: colors.base.text.primary,
    margin: 0,
  };

  const closeButtonStyle: CSSProperties = {
    position: "absolute",
    top: "0.6rem",
    right: "0.6rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.75rem",
    height: "1.75rem",
    border: "none",
    background: "transparent",
    color: colors.base.text.secondary,
    cursor: "pointer",
  };

  return createPortal(
    <div style={wrapStyle}>
      <div style={cardStyle} role="status" aria-live="polite">
        {notice === "backupReminder" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <p style={textStyle}>{t("auth.backup.reminder.text")}</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
              <Button variant="primary" size="sm" onClick={() => void download()}>
                {t("auth.backup.reminder.button")}
              </Button>
              <Button variant="ghost" size="sm" onClick={dismiss}>
                {t("auth.backup.reminder.link")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <button type="button" onClick={dismiss} aria-label={t("auth.a11y.close")} style={closeButtonStyle}>
              <X size={16} />
            </button>
            <p style={{ ...textStyle, paddingRight: "1.5rem" }}>{t("auth.errors.storageUnavailable")}</p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};
