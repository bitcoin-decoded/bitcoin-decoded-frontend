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
  isChapterComplete?: (id: string) => boolean;
  footerAside?: ReactNode;
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
    isHomePage,
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

  const navContainerStyle: CSSProperties = {
    backgroundColor:
      theme === "dark" ? colors.base.background.primary : colors.base.background.tertiary,
    color: colors.base.text.secondary,
    width: "18rem",
    flexShrink: 0,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    position: "sticky",
    top: 0,
    height: "100vh",
    alignSelf: "flex-start",
    borderRight: `1px solid ${colors.base.border.primary}`,
  };

  // The landing page hosts its own centered container and a three-up card row, so
  // it wants the full column width; the heavy chapter gutters would squeeze it.
  const mainContentPadding = {
    desktop: isHomePage ? "2.5rem 3rem" : "3rem 10rem",
    tablet: isHomePage ? "2rem 1.75rem" : "2rem 4rem",
    mobile: "1.5rem 0",
  };

  const mainContentStyle: CSSProperties = {
    flex: "1 1 auto",
    // let the flex child shrink below its content's min-content width, so a wide
    // element (e.g. the module chapter nav) scrolls internally instead of pushing
    // the whole page past the mobile viewport
    minWidth: 0,
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
