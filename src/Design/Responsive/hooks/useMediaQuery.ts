import { useEffect, useState } from "react";

import { isBrowser } from "../../../Platform";

export const useMediaQuery = (query: string): boolean => {
  // No browser means no viewport to measure. Answering "no match" makes the
  // build render the desktop branch, which is the fuller one: a crawler then
  // sees everything a phone would hide.
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
