import { useState, useEffect } from "react";

/**
 * Reading progress (0 → 1) of the page.
 *
 * Robust against scroll-container changes: depending on CSS (e.g. `overflow-x: hidden`
 * on html/body/#root), the scrolling element can be the window OR `#root`.
 * We sample both and use whichever has measurable progress, so the bar keeps
 * working even if a future CSS change moves the scroll container.
 */
export const useReadingProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.getElementById("root");
    const docEl = document.documentElement;

    const compute = () => {
      const samples: { top: number; max: number }[] = [
        {
          top: window.scrollY,
          max: docEl.scrollHeight - window.innerHeight,
        },
      ];
      if (root) {
        samples.push({
          top: root.scrollTop,
          max: root.scrollHeight - root.clientHeight,
        });
      }

      let best = 0;
      for (const s of samples) {
        if (s.max > 0) best = Math.max(best, Math.min(s.top / s.max, 1));
      }
      setProgress(best);
    };

    window.addEventListener("scroll", compute, { passive: true });
    root?.addEventListener("scroll", compute, { passive: true });
    compute();

    return () => {
      window.removeEventListener("scroll", compute);
      root?.removeEventListener("scroll", compute);
    };
  }, []);

  return progress;
};
