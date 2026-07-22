type Point = { x: number; y: number };

export const trimSegment = (a: Point, b: Point, clear: number) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: a.x + ux * clear,
    y1: a.y + uy * clear,
    x2: b.x - ux * clear,
    y2: b.y - uy * clear,
  };
};
