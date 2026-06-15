import { type CSSProperties, type FC } from "react";
import { createPortal } from "react-dom";

import { Check } from "lucide-react";

import { usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  show: boolean;
};

/**
 * Full-screen, centered celebration shown on chapter completion: a fade-in then
 * fade-out medal + label (not a discreet bottom-of-page insert). The persistent
 * badge collection is a later phase — this is the moment of reward only.
 */
export const ChapterCompleteOverlay: FC<Props> = ({ show }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const accent = colors[moduleTheme].background.secondary;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "grid",
    placeItems: "center",
    background: withOpacity(colors.base.background.primary, 0.82),
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    opacity: show ? 1 : 0,
    pointerEvents: "none",
    transition: "opacity 0.55s var(--ease-smooth)",
  };

  const cardStyle: CSSProperties = {
    textAlign: "center",
    padding: "0 1.5rem",
    opacity: show ? 1 : 0,
    transform: show ? "scale(1)" : "scale(0.86)",
    transition:
      "transform 0.6s cubic-bezier(0.2, 1.15, 0.3, 1), opacity 0.5s var(--ease-smooth)",
  };

  const medalStyle: CSSProperties = {
    width: 96,
    height: 96,
    borderRadius: "50%",
    margin: "0 auto 1.25rem",
    display: "grid",
    placeItems: "center",
    color: colors.base.text.onAccent,
    background: `radial-gradient(circle at 35% 30%, ${withOpacity(accent, 0.85)}, ${accent})`,
    boxShadow: `inset 0 0 0 4px ${withOpacity("#ffffff", 0.4)}, 0 16px 44px ${withOpacity(accent, 0.32)}`,
  };

  const labelStyle: CSSProperties = {
    fontSize: "1.4rem",
    fontWeight: 600,
    margin: 0,
    color: colors.base.text.primary,
  };

  // Portaled to <body> so `position: fixed` resolves against the viewport (the
  // .page-enter wrapper's transform would otherwise become its containing block).
  if (typeof document === "undefined") return null;

  return createPortal(
    <div style={overlayStyle} aria-hidden={!show}>
      <div style={cardStyle}>
        <div style={medalStyle}>
          <Check size={42} strokeWidth={2.5} />
        </div>
        <p style={labelStyle}>{t("reading.completed")}</p>
      </div>
    </div>,
    document.body,
  );
};
