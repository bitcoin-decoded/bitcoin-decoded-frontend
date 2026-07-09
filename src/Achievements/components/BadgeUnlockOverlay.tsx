import { type CSSProperties, type FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { BRAND, usePageTheme, withOpacity } from "../../Design";
import { useTranslation } from "../../I18n";
import { getModuleRamp } from "../helpers";
import type { Badge } from "../types";

import { BadgeMedal } from "./BadgeMedal";

type Props = {
  badge: Badge | null;
  onDismiss: () => void;
};

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const BadgeUnlockOverlay: FC<Props> = ({ badge, onDismiss }) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!badge) {
      setShow(false);
      return;
    }
    const reduce = reduced();
    const hold = reduce ? 1100 : 2100;
    const exit = reduce ? 0 : 520;
    setShow(false);
    const raf = requestAnimationFrame(() => setShow(true));
    const tOut = window.setTimeout(() => setShow(false), hold);
    const tDone = window.setTimeout(onDismiss, hold + exit);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(tOut);
      window.clearTimeout(tDone);
    };
  }, [badge, onDismiss]);

  if (typeof document === "undefined" || !badge) return null;

  const accent = colors[getModuleRamp(badge.module)].background.secondary;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    display: "grid",
    placeItems: "center",
    background: withOpacity(colors.base.background.primary, 0.82),
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    opacity: show ? 1 : 0,
    pointerEvents: "none",
    transition: "opacity 0.5s var(--ease-smooth)",
  };

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.1rem",
    textAlign: "center",
    padding: "0 1.5rem",
    opacity: show ? 1 : 0,
    transform: show ? "scale(1)" : "scale(0.86)",
    transition: "transform 0.6s cubic-bezier(0.2, 1.15, 0.3, 1), opacity 0.5s var(--ease-smooth)",
  };

  const leadStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: accent,
    margin: 0,
  };

  const nameStyle: CSSProperties = {
    fontSize: "1.35rem",
    fontWeight: 600,
    lineHeight: 1.2,
    color: colors.base.text.primary,
    margin: 0,
    maxWidth: "20rem",
  };

  return createPortal(
    <div style={overlayStyle} aria-hidden={!show}>
      <div style={cardStyle}>
        <BadgeMedal badge={badge} earned size="lg" />
        <p style={leadStyle}>{t("badges.unlockedToast")}</p>
        <p style={nameStyle}>{t(badge.nameKey)}</p>
      </div>
    </div>,
    document.body,
  );
};
