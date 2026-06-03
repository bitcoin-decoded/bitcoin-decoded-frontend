import type { DunbarTierKey } from "./DunbarTierKey";

/** One dominant accent color per tier (green → gold → red), theme-aware. */
export type DunbarPalette = Record<DunbarTierKey, string>;
