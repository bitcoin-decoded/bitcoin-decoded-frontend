import { type FC, type ReactNode, type CSSProperties, useEffect, useState, useCallback } from "react";
import { NavBar } from "./NavBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavDrawer } from "./NavDrawer";
import { ReadingProgressBar, ScrollToTopButton } from "../../../Page";
import { useThemeContext, THEME_COLORS } from "../../Theme";
import { useBreakpoint } from "../../Responsive";
import { useRouterContext, ROUTE_NAME } from "../../../Routing";
import { useHeaderHidden } from "../hooks";

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useThemeContext();
  const { currentPage } = useRouterContext();
  const breakpoint = useBreakpoint();
  const colors = THEME_COLORS[theme];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = breakpoint === "desktop";
  // Shared with Header (single rAF-throttled scroll listener under the
  // hood). Drives the sidebar's translateY when the Header auto-hides.
  const isHeaderHidden = useHeaderHidden();

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
  // content scrolls.
  //
  // The wrapper spans the FULL viewport (top: 0, height: 100vh) — it
  // runs UNDERNEATH the Header (z-index 101). When the Header auto-
  // hides on scroll, the sidebar slides up by 3.5rem in lockstep so
  // its content rises with the Header instead of leaving a vacant
  // strip at the top. Coupling driven by `useHeaderHidden` (same
  // boolean both elements consume).
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
    transform: isHeaderHidden ? "translateY(-3.5rem)" : "translateY(0)",
    transition: "transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
    willChange: "transform",
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
