import { useCallback, useEffect, useState } from "react";

type Options = {
  threshold?: number;
};

export const useScrollToTop = ({ threshold = 600 }: Options = {}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      setVisible(window.scrollY > threshold);
      frame = null;
    };

    const handleScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

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
