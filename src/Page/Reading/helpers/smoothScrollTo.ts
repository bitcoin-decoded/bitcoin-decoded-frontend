export const smoothScrollTo = (el: Element, durationMs: number, offsetPx = 0): void => {
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offsetPx;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / durationMs);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
