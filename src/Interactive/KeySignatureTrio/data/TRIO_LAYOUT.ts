import type { KeyElementId } from "../types";

type Point = { x: number; y: number };

export const TRIO_LAYOUT: {
  viewWidth: number;
  viewHeight: number;
  nodes: Record<KeyElementId, Point>;
  clearance: { mobile: number; desktop: number };
} = {
  viewWidth: 140,
  viewHeight: 104,
  nodes: {
    privateKey: { x: 70, y: 18 },
    publicKey: { x: 24, y: 88 },
    signature: { x: 116, y: 88 },
  },
  clearance: { mobile: 21, desktop: 15 },
};
