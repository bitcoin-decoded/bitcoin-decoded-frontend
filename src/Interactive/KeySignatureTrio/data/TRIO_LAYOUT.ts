import type { KeyElementId } from "../types";

type Point = { x: number; y: number };

export const TRIO_LAYOUT: {
  viewWidth: number;
  viewHeight: number;
  nodes: Record<KeyElementId, Point>;
  clearance: { mobile: number; desktop: number };
} = {
  viewWidth: 140,
  viewHeight: 112,
  nodes: {
    privateKey: { x: 70, y: 16 },
    publicKey: { x: 26, y: 82 },
    signature: { x: 114, y: 82 },
  },
  clearance: { mobile: 20, desktop: 15 },
};
