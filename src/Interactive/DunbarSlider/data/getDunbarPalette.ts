import type { DunbarPalette } from "../types";

export const getDunbarPalette = (isLight: boolean): DunbarPalette => ({
  family: isLight ? "#10b981" : "#6ee7b7", // calm green
  clan: isLight ? "#059669" : "#34d399", // green
  village: isLight ? "#d97706" : "#fbbf24", // gold (Dunbar threshold)
  town: isLight ? "#e11d48" : "#fb7185", // light red
  society: isLight ? "#be123c" : "#f43f5e", // deep red
});
