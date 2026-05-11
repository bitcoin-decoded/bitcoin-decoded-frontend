import { type CSSProperties, type FC } from "react";

import { ArrowUp } from "lucide-react";

import { useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useScrollToTop } from "../hooks";

/**
 * Floating chevron at the bottom-right of the viewport that fades in once
 * the user has scrolled past the threshold and smoothly returns them to
 * the top of the page on click.
 *
 * Presentational only - all state and behaviour live in `useScrollToTop`.
 * Theme- and module-aware so the accent matches the current world
 * (Banking blue, MoneyLaws violet, Bitcoin amber).
 */
export const ScrollToTopButton: FC = () => {
  const { visible, scrollToTop } = useScrollToTop();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const accent = colors[moduleTheme].border.secondary;

  const buttonStyle: CSSProperties = {
    position: "fixed",
    bottom: isMobile ? "1.5rem" : "2rem",
    right: isMobile ? "1.5rem" : "2rem",
    // Below the nav drawer (which goes full-screen on mobile) and above
    // ordinary page content. ReadingProgressBar sits at z-index 100; we
    // intentionally stay below it so the bar always wins at the very edge.
    zIndex: 90,
    width: isMobile ? "2.5rem" : "2.75rem",
    height: isMobile ? "2.5rem" : "2.75rem",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${withOpacity(accent, 0.18)}, ${withOpacity(accent, 0.06)})`,
    border: `1.5px solid ${withOpacity(accent, 0.5)}`,
    color: colors[moduleTheme].text.primary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 4px 16px ${withOpacity(accent, 0.2)}`,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transition:
      "opacity 0.3s var(--ease-smooth), transform 0.3s var(--ease-smooth), background 0.2s, border-color 0.2s",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform: visible ? "translateY(0)" : "translateY(8px)",
  };

  return (
    <button type="button" style={buttonStyle} onClick={scrollToTop} aria-label="Scroll to top">
      <ArrowUp size={isMobile ? 16 : 18} strokeWidth={2.2} />
    </button>
  );
};
