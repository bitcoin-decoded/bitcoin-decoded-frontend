import { useEffect, useState } from "react";

const TOP_BUFFER_PX = 60;
const SCROLL_DELTA_THRESHOLD_PX = 8;

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
