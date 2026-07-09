import type { Breakpoint } from "../types/Breakpoint";

import { useMediaQuery } from "./useMediaQuery";

export const useBreakpoint = (): Breakpoint => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return "desktop";
  if (isTablet) return "tablet";
  return "mobile";
};
