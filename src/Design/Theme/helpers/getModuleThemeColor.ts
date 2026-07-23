import type { RouteName } from "../../../Routing/types";
import type { ModuleThemeName } from "../types";

export const getModuleThemeColor = (
  currentPage: RouteName
): ModuleThemeName => {
  if (currentPage.startsWith("banking")) return "blue";
  if (currentPage.startsWith("money-laws")) return "violet";
  if (currentPage.startsWith("bitcoin")) return "amber";
  return "base";
};
