import type { KeyElementId } from "../types";

type Point = { x: number; y: number };

export const TRIO_LAYOUT: {
  viewWidth: number;
  viewHeight: number;
  nodes: Record<KeyElementId, Point>;
  clearance: { mobile: number; desktop: number };
} = {
  // node rows are symmetric about the vertical centre (viewHeight / 2 = 56): the
  // apex sits as far above centre as the base sits below, so the triangle stays
  // centred in its box at any width, whatever the fixed-rem node height adds.
  viewWidth: 140,
  viewHeight: 112,
  nodes: {
    privateKey: { x: 70, y: 23 },
    publicKey: { x: 26, y: 89 },
    signature: { x: 114, y: 89 },
  },
  clearance: { mobile: 20, desktop: 15 },
};
