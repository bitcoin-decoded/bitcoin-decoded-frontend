type Point = { x: number; y: number };

/**
 * Shorten a segment a→b by `clear` units at BOTH ends, along its own
 * direction. Used to keep the triangle edges from touching the node icons
 * and labels: the visible line floats in the gap between the two nodes.
 */
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
