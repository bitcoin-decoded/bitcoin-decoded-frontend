import { useEffect,useState } from "react";

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
