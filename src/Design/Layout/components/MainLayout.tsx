import { type CSSProperties, type FC, type ReactNode } from "react";

import { ReadingProgressBar, ScrollToTopButton } from "../../../Page";
import { THEME_COLORS, useThemeContext } from "../../Theme";
import { useMainLayout } from "../hooks";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { NavDrawer } from "./NavDrawer";

export const MainLayout: FC<{
  children: ReactNode;
  headerAction?: ReactNode;
  /** Injected from App (badge access) so the nav can mark finished chapters. */
  isChapterComplete?: (id: string) => boolean;
  /** Rendered at the footer's leading edge. Keeps Design ignorant of Interactive. */
  footerAside?: ReactNode;
  /** Injected by the shell — Design never reads the progression rule itself. */
  isChapterOutOfSequence?: (id: string) => boolean;
}> = ({ children, headerAction, isChapterComplete, isChapterOutOfSequence, footerAside }) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const {
    breakpoint,
    isDesktop,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
    isChapterPage,
    isBlockChapter,
  } = useMainLayout();

  const rootStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const bodyContainerStyle: CSSProperties = {
    backgroundColor: colors.base.background.secondary,
    color: colors.base.text.primary,
    display: "flex",
    flexDirection: "row",
    flex: "1 1 auto",
  };

  // The nav is chrome: it must never be brighter than the column it frames.
  // `background.primary` is the darkest surface in dark mode but the lightest
  // in light mode, so the one token recedes in dark and glares in light. In
  // light it takes the deepest cream, a step below the reading column — the
  // two shared a tone before, which read flat against the lighter header.
  const navContainerStyle: CSSProperties = {
    backgroundColor:
      theme === "dark" ? colors.base.background.primary : colors.base.background.tertiary,
    color: colors.base.text.secondary,
    width: "18rem",
    flexShrink: 0,
    // Was 13px — the nav is a long list of chapter titles, read at a glance.
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    position: "sticky",
    top: 0,
    height: "100vh",
    alignSelf: "flex-start",
    borderRight: `1px solid ${colors.base.border.primary}`,
  };

  const mainContentPadding = {
    desktop: "3rem 10rem",
    tablet: "2rem 4rem",
    mobile: "1.5rem 0",
  };

  const mainContentStyle: CSSProperties = {
    flex: "1 1 auto",
    padding: mainContentPadding[breakpoint],
    lineHeight: 1.7,
    textAlign: breakpoint === "mobile" ? "left" : "justify",
  };

  return (
    <div style={rootStyle}>
      <Header
        showHamburger={!isDesktop}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={toggleDrawer}
        breakpoint={breakpoint}
        rightSlot={headerAction}
      />
      {isChapterPage && !isBlockChapter && <ReadingProgressBar />}
      {!isDesktop && (
        <NavDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          isChapterComplete={isChapterComplete}
          isChapterOutOfSequence={isChapterOutOfSequence}
        />
      )}
      <div style={bodyContainerStyle}>
        {isDesktop && (
          <div style={navContainerStyle}>
            <NavBar isChapterComplete={isChapterComplete} isChapterOutOfSequence={isChapterOutOfSequence} />
          </div>
        )}
        <main style={mainContentStyle}>{children}</main>
      </div>
      <Footer breakpoint={breakpoint} aside={footerAside} />
      {isChapterPage && <ScrollToTopButton />}
    </div>
  );
};
