import { useEffect, useState } from "react";

// Buffer near the top of the page so the header never flickers on tiny
// scroll-bounces (inertial scroll, trackpad jitter).
const TOP_BUFFER_PX = 60;

// Minimum scroll delta required to flip the hidden state. Filters
// trackpad micro-jitter; large enough to feel intentional, small enough
// to feel responsive.
const SCROLL_DELTA_THRESHOLD_PX = 8;

/**
 * Tracks the hide-on-scroll-down / reveal-on-scroll-up state of the
 * sticky Header. Returns a single boolean — `true` when the header
 * should be visually hidden, `false` otherwise.
 *
 * Single source of truth shared by:
 *   - `Header`           → drives its transform: translateY(-100%)
 *   - `MainLayout` nav   → slides the sticky sidebar up by 3.5rem so
 *                          its top doesn't sit in a vacant strip
 *
 * The hook does NOT factor in drawer / overlay states (those are
 * composition concerns left to the caller — e.g. Header forces itself
 * visible when its own NavDrawer is open).
 */
export const useHeaderHidden = (): boolean => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY < TOP_BUFFER_PX) {
        setIsHidden(false);
      } else if (Math.abs(delta) > SCROLL_DELTA_THRESHOLD_PX) {
        setIsHidden(delta > 0);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isHidden;
};
