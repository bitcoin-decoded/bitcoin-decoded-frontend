/**
 * Places `count` nodes evenly around a circle (first node at the top, going
 * clockwise) inside a 0–100 viewBox, and returns both the vertices and the
 * edges that close the loop — so the wheel can be drawn with plain SVG lines
 * and the cards positioned with percentages. `radius` is in viewBox units.
 */
export const getPentagonLayout = (
  count: number,
  radius: number,
): {
  vertices: { x: number; y: number }[];
  edges: { x1: number; y1: number; x2: number; y2: number; mx: number; my: number; angle: number }[];
} => {
  const center = 50;

  const vertices = Array.from({ length: count }, (_, i) => {
    const angle = ((-90 + (i * 360) / count) * Math.PI) / 180;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  const edges = vertices.map((v, i) => {
    const next = vertices[(i + 1) % count];
    return {
      x1: v.x,
      y1: v.y,
      x2: next.x,
      y2: next.y,
      mx: (v.x + next.x) / 2,
      my: (v.y + next.y) / 2,
      angle: (Math.atan2(next.y - v.y, next.x - v.x) * 180) / Math.PI,
    };
  });

  return { vertices, edges };
};
