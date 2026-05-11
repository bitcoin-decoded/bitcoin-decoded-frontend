import { type CSSProperties, type FC, type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  /**
   * Delay in ms before the reveal kicks in once the element is visible.
   * Useful for staggering siblings.
   */
  delay?: number;
  /**
   * Distance (in px) the element travels upward as it fades in.
   * Default: 24
   */
  distance?: number;
  /**
   * Duration of the reveal transition (in ms). Default: 700
   */
  duration?: number;
  /**
   * Margin used by the IntersectionObserver - negative values delay the
   * reveal until the element is more clearly inside the viewport.
   * Default: "0px 0px -10% 0px" (trigger when ~10% past the bottom edge)
   */
  rootMargin?: string;
  /**
   * Optional inline style passed to the wrapper.
   */
  style?: CSSProperties;
  /**
   * Optional className passed to the wrapper.
   */
  className?: string;
};

/**
 * Fade-in + gentle translate-up reveal triggered when the wrapper enters
 * the viewport. Uses IntersectionObserver (single-shot - once revealed,
 * the element stays visible). Respects `prefers-reduced-motion` by
 * skipping the animation entirely.
 *
 * Usage:
 *   <RevealOnScroll>
 *     <section>…</section>
 *   </RevealOnScroll>
 *
 * For staggered groups, pass an incremental `delay`:
 *   <RevealOnScroll delay={0}>…</RevealOnScroll>
 *   <RevealOnScroll delay={120}>…</RevealOnScroll>
 *   <RevealOnScroll delay={240}>…</RevealOnScroll>
 */
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

  // Respect users who prefer reduced motion: skip the animation entirely.
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

    // Fallback for environments without IntersectionObserver.
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
