import type { KeyElementId } from "../types";

type Point = { x: number; y: number };

/**
 * Triangle geometry in a fixed view box. The diagram container is given the
 * same aspect ratio (viewWidth / viewHeight) so SVG edges drawn in these
 * coordinates render without distortion. The private key sits at the apex
 * (the root that everything else derives from); the public key and the
 * signature anchor the base.
 */
export const TRIO_LAYOUT: {
  viewWidth: number;
  viewHeight: number;
  nodes: Record<KeyElementId, Point>;
} = {
  viewWidth: 140,
  viewHeight: 104,
  nodes: {
    privateKey: { x: 70, y: 18 },
    publicKey: { x: 24, y: 88 },
    signature: { x: 116, y: 88 },
  },
};
