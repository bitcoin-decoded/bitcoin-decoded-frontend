import type { DotPosition } from "../types";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Even, organic dot layout inside a disc (sunflower / phyllotaxis spiral).
 * Deterministic, so the cloud stays stable across re-renders.
 */
export const computeDotPositions = (
  count: number,
  radius: number,
  cx: number,
  cy: number,
): DotPosition[] => {
  const positions: DotPosition[] = [];
  for (let i = 0; i < count; i++) {
    const r = radius * Math.sqrt((i + 0.5) / count);
    const theta = i * GOLDEN_ANGLE;
    positions.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) });
  }
  return positions;
};
