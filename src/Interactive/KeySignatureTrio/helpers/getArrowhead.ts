type Point = { x: number; y: number };

/**
 * Build a small open-chevron arrowhead at the `b` end of segment a→b, pulled
 * back by `clear` units so its tip sits exactly where the trimmed line ends
 * (see trimSegment). Returns the three chevron points: left barb → tip →
 * right barb. The chevron points toward `b`, showing the direction of the
 * action (who acts on whom).
 */
export const getArrowhead = (
  a: Point,
  b: Point,
  clear: number,
  barb: number,
  spreadDeg: number,
) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const tip = { x: b.x - ux * clear, y: b.y - uy * clear };
  const back = { x: -ux, y: -uy };
  const rad = (spreadDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const left = {
    x: tip.x + barb * (back.x * cos - back.y * sin),
    y: tip.y + barb * (back.x * sin + back.y * cos),
  };
  const right = {
    x: tip.x + barb * (back.x * cos + back.y * sin),
    y: tip.y + barb * (-back.x * sin + back.y * cos),
  };
  return { tip, left, right };
};
