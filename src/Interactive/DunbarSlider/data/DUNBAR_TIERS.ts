import type { DunbarTier } from "../types";

import {
  DoodleCastle,
  DoodleChest,
  DoodleFamily,
  DoodleNetwork,
  DoodleOfficeBuilding,
} from "@doodle";

export const DUNBAR_TIERS: DunbarTier[] = [
  { key: "family", size: 5, icon: DoodleFamily },
  { key: "clan", size: 30, icon: DoodleChest },
  { key: "village", size: 150, icon: DoodleCastle, isDunbar: true },
  { key: "town", size: 500, icon: DoodleOfficeBuilding, isOverload: true },
  { key: "society", size: 10000, icon: DoodleNetwork, isOverload: true },
];
