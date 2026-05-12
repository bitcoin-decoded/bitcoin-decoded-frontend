import { type FC, type ReactNode, type CSSProperties, useEffect, useState, useCallback } from "react";
import { NavBar } from "./NavBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavDrawer } from "./NavDrawer";
import { ReadingProgressBar, ScrollToTopButton } from "../../../Page";
import { useThemeContext, THEME_COLORS } from "../../Theme";
import { useBreakpoint } from "../../Responsive";
import { useRouterContext, ROUTE_NAME } from "../../../Routing";

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
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
    return () => { document.body.style.overflow = ""; };
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
  // content scrolls. Three things are needed for this to work inside a
  // flex row:
  //   1. position: sticky + a `top` offset matching the sticky Header
  //      height (3.5rem), so the nav lands just under it
  //   2. an explicit height that fills the remaining viewport
  //      (100vh - header), otherwise the column has no defined size
  //   3. align-self: flex-start so the flex row doesn't stretch the
  //      column to match the main content's height (which would
  //      neutralise both the height and the sticky behaviour)
  // Internal scroll is handled by NavBar itself (its list container
  // already has overflow-y: auto), so we don't need a second scroll
  // context here.
  const navContainerStyle: CSSProperties = {
    backgroundColor: colors.base.background.primary,
    color: colors.base.text.secondary,
    width: "17rem",
    flexShrink: 0,
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
    position: "sticky",
    top: "3.5rem",
    height: "calc(100vh - 3.5rem)",
    alignSelf: "flex-start",
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

  return (
    <div style={rootStyle}>
      <Header
        showHamburger={!isDesktop}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={toggleDrawer}
        breakpoint={breakpoint}
      />
      {isChapterPage && <ReadingProgressBar />}
      {!isDesktop && (
        <NavDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          breakpoint={breakpoint}
        />
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
