import { type CSSProperties, type FC, type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  rootMargin?: string;
  style?: CSSProperties;
  className?: string;
};

export const RevealOnScroll: FC<Props> = ({
  children,
  delay = 0,
  distance = 24,
  duration = 700,
  rootMargin = "0px 0px -10% 0px",
  style,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setRevealed(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReduced, rootMargin]);

  const wrapperStyle: CSSProperties = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : `translateY(${distance}px)`,
    transition: prefersReduced
      ? "none"
      : `opacity ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1) ${delay}ms`,
    willChange: revealed ? "auto" : "opacity, transform",
    ...style,
  };

  return (
    <div ref={ref} className={className} style={wrapperStyle}>
      {children}
    </div>
  );
};
