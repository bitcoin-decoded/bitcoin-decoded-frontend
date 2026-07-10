import { type CSSProperties, type FC } from "react";

import { THEME_COLORS, useThemeContext } from "../../Theme";

import { NavBar } from "./NavBar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isChapterComplete?: (id: string) => boolean;
};

export const NavDrawer: FC<Props> = ({ isOpen, onClose, isChapterComplete }) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];

  const backdropStyle: CSSProperties = {
    position: "fixed",
    top: "3.5rem",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 99,
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
    transition: "opacity 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  // Full-width overlay below the desktop breakpoint (the desktop sidebar takes
  // over at ≥1280) — consistent, fluid behaviour on tablet and mobile alike.
  const drawerStyle: CSSProperties = {
    position: "fixed",
    top: "3.5rem",
    left: 0,
    width: "100vw",
    height: "calc(100vh - 3.5rem)",
    backgroundColor: colors.base.background.primary,
    zIndex: 100,
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
    color: colors.base.text.secondary,
  };

  return (
    <>
      <div style={backdropStyle} onClick={onClose} aria-hidden="true" />
      <nav style={drawerStyle} role="dialog" aria-modal={isOpen} aria-hidden={!isOpen}>
        <NavBar isChapterComplete={isChapterComplete} />
      </nav>
    </>
  );
};
