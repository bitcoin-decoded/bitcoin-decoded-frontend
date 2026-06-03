import type { DunbarPalette } from "../types";

/**
 * Dominant accent per tier: a calm green that warms to gold at the Dunbar
 * threshold (150), then turns red once the group outgrows individual memory.
 * Decorative colors (not semantic THEME_COLORS tokens), but kept in the same
 * emerald / amber / rose families as the design system and theme-aware so
 * they stay readable in both modes.
 */
export const getDunbarPalette = (isLight: boolean): DunbarPalette => ({
  family: isLight ? "#10b981" : "#6ee7b7", // calm green
  clan: isLight ? "#059669" : "#34d399", // green
  village: isLight ? "#d97706" : "#fbbf24", // gold (Dunbar threshold)
  town: isLight ? "#e11d48" : "#fb7185", // light red
  society: isLight ? "#be123c" : "#f43f5e", // deep red
});
