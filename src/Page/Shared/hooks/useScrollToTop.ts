import { useCallback, useEffect, useState } from "react";

type Options = {
  /**
   * Pixel threshold past which the button becomes visible. Picked so the
   * affordance only appears once the user has clearly committed to reading
   * — sub-viewport scrolls don't trigger it.
   * @default 600
   */
  threshold?: number;
};

/**
 * Tracks whether the user has scrolled past `threshold` and exposes a
 * smooth scroll-to-top action.
 *
 * Uses requestAnimationFrame to coalesce scroll events — scroll handlers
 * fire dozens of times per second, and re-rendering on each one is
 * wasteful when we only care about a binary visibility flag.
 */
export const useScrollToTop = ({ threshold = 600 }: Options = {}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      setVisible(window.scrollY > threshold);
      frame = null;
    };

    const handleScroll = () => {
      // Coalesce: at most one update per animation frame.
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update(); // initial state — handles cases where the page lands already scrolled

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { visible, scrollToTop };
};
