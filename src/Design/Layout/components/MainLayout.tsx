import {
  type CSSProperties,
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { BLOCK_READING_CHAPTERS, ReadingProgressBar, ScrollToTopButton } from "../../../Page";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";
import { useBreakpoint } from "../../Responsive";
import { THEME_COLORS, useThemeContext } from "../../Theme";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { NavDrawer } from "./NavDrawer";

export const MainLayout: FC<{ children: ReactNode; headerAction?: ReactNode }> = ({
  children,
  headerAction,
}) => {
  const { theme } = useThemeContext();
  const { currentPage } = useRouterContext();
  const breakpoint = useBreakpoint();
  const colors = THEME_COLORS[theme];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = breakpoint === "desktop";

  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Scroll to top + close drawer on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsDrawerOpen(false);
  }, [currentPage]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Close drawer when resizing to desktop
  useEffect(() => {
    if (isDesktop) setIsDrawerOpen(false);
  }, [isDesktop]);

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

  // Persistent sticky sidebar (desktop only). Notion / Linear / Stripe
  // pattern: the nav stays anchored in the viewport while the main
  // content scrolls.
  //
  // The wrapper spans the FULL viewport (top: 0, height: 100vh) — it
  // runs UNDERNEATH the Header (z-index 101) and never moves. Its
  // background fills the entire left column, top to bottom, regardless
  // of scroll state — no exposed-body-bg gaps.
  //
  // When the Header auto-hides on scroll, only the NavBar's CONTENT
  // slides up (it consumes `useHeaderHidden` itself), so the wrapper
  // stays put and the bottom of the sidebar column never reveals a
  // mismatched colour strip. The previous version translated the
  // wrapper itself, which shifted the gap from top to bottom — fixed.
  //
  // align-self: flex-start is required because the parent is a flex
  // row with default `align-items: stretch` — without it the wrapper
  // would stretch to the main content's height and break sticky.
  //
  // Internal scroll is delegated to NavBar (its list container has
  // overflow-y: auto), so no second scroll context here.
  const navContainerStyle: CSSProperties = {
    backgroundColor: colors.base.background.primary,
    color: colors.base.text.secondary,
    width: "17rem",
    flexShrink: 0,
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
    position: "sticky",
    top: 0,
    height: "100vh",
    alignSelf: "flex-start",
    // Divider lives on the WRAPPER (not on NavBar) because NavBar
    // translates -3.5rem when the Header hides — a border drawn there
    // would slide with it, leaving the bottom 3.5rem of the column
    // without a separator. The wrapper stays full-height, so its right
    // edge always spans the entire viewport.
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

  const isChapterPage = currentPage !== ROUTE_NAME.HomePage;
  // Block-reading chapters carry their own always-visible jalon pill, so the
  // scroll-percentage bar (which regresses as blocks reveal) is suppressed.
  const isBlockChapter = BLOCK_READING_CHAPTERS.has(currentPage);

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
        <NavDrawer isOpen={isDrawerOpen} onClose={closeDrawer} breakpoint={breakpoint} />
      )}
      <div style={bodyContainerStyle}>
        {isDesktop && (
          <div style={navContainerStyle}>
            <NavBar />
          </div>
        )}
        <main style={mainContentStyle}>{children}</main>
      </div>
      <Footer breakpoint={breakpoint} />
      {isChapterPage && <ScrollToTopButton />}
    </div>
  );
};
