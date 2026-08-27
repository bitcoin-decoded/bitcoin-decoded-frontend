import { useEffect } from "react";

// While the escalier is mounted, flag <html> so the scoped scroll-snap and
// scroll-padding rules in index.css apply here and on no other route.
export const useLandingMode = (): void => {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-landing", "");
    return () => root.removeAttribute("data-landing");
  }, []);
};
