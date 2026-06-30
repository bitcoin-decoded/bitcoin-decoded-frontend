import type { DunbarTier } from "../types";

import { Building2, Globe, Home, Landmark, Tent } from "@icons";

/**
 * The five discrete group sizes, smallest to largest. The icons follow a
 * habitat-scale metaphor (tent → houses → village → city → planet). The
 * `town` step is where direct trust breaks down (red zone).
 */
export const DUNBAR_TIERS: DunbarTier[] = [
  { key: "family", size: 5, icon: Tent },
  { key: "clan", size: 30, icon: Home },
  { key: "village", size: 150, icon: Landmark, isDunbar: true },
  { key: "town", size: 500, icon: Building2, isOverload: true },
  { key: "society", size: 10000, icon: Globe, isOverload: true },
];
