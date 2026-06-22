import { BRAND } from "../data";
import type { Theme } from "../types";

/**
 * Theme-aware gold picker — returns the dark-mode variant when needed so the
 * carré-bloc, top rule, and corner brackets stay visible against deep
 * backgrounds without going neon. Single source of truth for the
 * "which gold should I use right now" question.
 */
export const getBrandGold = (theme: Theme): string =>
  theme === "dark" ? BRAND.goldDark : BRAND.gold;
