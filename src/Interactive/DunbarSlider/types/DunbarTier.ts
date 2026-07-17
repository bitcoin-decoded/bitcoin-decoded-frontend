import type { DunbarTierKey } from "./DunbarTierKey";

import type { IconComponent } from "@icons";

/**
 * Structural, language-neutral definition of a group-size step. Localized
 * text lives in `getDunbarTierText`, decorative colors in `getDunbarPalette`.
 */
export type DunbarTier = {
  key: DunbarTierKey;
  /** Number of people in the group at this step. */
  size: number;
  /** Social-scale doodle glyph, rendered with the tier accent. */
  icon: IconComponent;
  /** The ~150 cognitive ceiling (Dunbar's number). */
  isDunbar?: boolean;
  /** Beyond the ceiling: individual memory no longer suffices. */
  isOverload?: boolean;
};
