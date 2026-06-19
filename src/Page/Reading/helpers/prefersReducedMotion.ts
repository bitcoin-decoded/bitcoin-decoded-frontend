// True when the user asked for reduced motion - callers fall back to instant
// scroll / no long animation. Guarded for non-browser contexts.
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
