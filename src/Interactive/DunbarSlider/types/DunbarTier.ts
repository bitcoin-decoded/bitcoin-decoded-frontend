import type { LucideIcon } from "lucide-react";

import type { DunbarTierKey } from "./DunbarTierKey";

/**
 * Structural, language-neutral definition of a group-size step. Localized
 * text lives in `getDunbarTierText`, decorative colors in `getDunbarPalette`.
 */
export type DunbarTier = {
  key: DunbarTierKey;
  /** Number of people in the group at this step. */
  size: number;
  /** Habitat-scale icon (Lucide), rendered with the tier accent. */
  icon: LucideIcon;
  /** The ~150 cognitive ceiling (Dunbar's number). */
  isDunbar?: boolean;
  /** Beyond the ceiling: individual memory no longer suffices. */
  isOverload?: boolean;
};
