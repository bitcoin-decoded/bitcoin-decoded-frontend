import type { DunbarTier } from "../types";

import {
  DoodleCastle,
  DoodleChest,
  DoodleFamily,
  DoodleNetwork,
  DoodleOfficeBuilding,
} from "@doodle";

/**
 * The five discrete group sizes, smallest to largest. The icons follow the
 * social scale rather than a habitat one — a family, a clan's chest, a village
 * keep, a town block, then a network with no faces left in it. The `town` step
 * is where direct trust breaks down (red zone).
 */
export const DUNBAR_TIERS: DunbarTier[] = [
  { key: "family", size: 5, icon: DoodleFamily },
  { key: "clan", size: 30, icon: DoodleChest },
  { key: "village", size: 150, icon: DoodleCastle, isDunbar: true },
  { key: "town", size: 500, icon: DoodleOfficeBuilding, isOverload: true },
  { key: "society", size: 10000, icon: DoodleNetwork, isOverload: true },
];
