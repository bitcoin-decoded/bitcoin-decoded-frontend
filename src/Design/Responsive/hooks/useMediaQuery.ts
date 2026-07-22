import { useEffect, useState } from "react";

import { isBrowser } from "../../../Platform";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() =>
    isBrowser ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);
    setMatches(mediaQuery.matches);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
