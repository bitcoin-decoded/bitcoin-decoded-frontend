import { useEffect } from "react";

// While the escalier is mounted, flag <html> so the scoped scroll-padding rule
// in index.css applies here and on no other route (it offsets in-page jumps for
// the sticky header). No scroll-snap: the page scrolls naturally.
export const useLandingMode = (): void => {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-landing", "");
    return () => root.removeAttribute("data-landing");
  }, []);
};
