import { useCallback, useEffect, useState } from "react";

import { BLOCK_READING_CHAPTERS } from "../../../Page";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";
import { useBreakpoint } from "../../Responsive";

/**
 * Owns the app shell's mobile-drawer state and the side effects tied to
 * navigation: close on page change, body scroll-lock while the drawer is open,
 * and auto-close when the viewport grows to desktop. Also
 * surfaces the nav-derived flags the layout renders on.
 */
export const useMainLayout = () => {
  const { currentPage } = useRouterContext();
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === "desktop";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  // Closes the drawer on navigation. Scroll position is deliberately not
  // touched here: the router puts a new page at the top as the navigation is
  // issued, and a chapter may then anchor itself elsewhere (see
  // `getArrivalAnchor`). This effect runs after the page's own — being a
  // parent — so scrolling here silently undid that anchor.
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [currentPage]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (isDesktop) setIsDrawerOpen(false);
  }, [isDesktop]);

  return {
    breakpoint,
    isDesktop,
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
    isChapterPage: currentPage !== ROUTE_NAME.HomePage,
    isBlockChapter: BLOCK_READING_CHAPTERS.has(currentPage),
  };
};
