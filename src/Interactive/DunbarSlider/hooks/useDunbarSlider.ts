import { useState } from "react";

import { DUNBAR_TIERS } from "../data";
import { countRelations } from "../helpers";
import type { DunbarTier } from "../types";

type DunbarSliderState = {
  tierIndex: number;
  setTierIndex: (index: number) => void;
  tier: DunbarTier;
  size: number;
  relations: number;
  isOverload: boolean;
  tierCount: number;
};

/**
 * Owns the single piece of state (the selected tier index) and derives the
 * current tier, its population, and the pairwise-relationship count from it.
 */
export const useDunbarSlider = (): DunbarSliderState => {
  const [tierIndex, setTierIndex] = useState(0);

  const safeIndex = Math.min(Math.max(tierIndex, 0), DUNBAR_TIERS.length - 1);
  const tier = DUNBAR_TIERS[safeIndex];

  return {
    tierIndex: safeIndex,
    setTierIndex,
    tier,
    size: tier.size,
    relations: countRelations(tier.size),
    isOverload: Boolean(tier.isOverload),
    tierCount: DUNBAR_TIERS.length,
  };
};
