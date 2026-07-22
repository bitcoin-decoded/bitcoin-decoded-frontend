import { useCallback, useEffect, useState } from "react";

import { BLOCK_READING_CHAPTERS } from "../../../Page";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";
import { useBreakpoint } from "../../Responsive";

export const useMainLayout = () => {
  const { currentPage } = useRouterContext();
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === "desktop";

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

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
