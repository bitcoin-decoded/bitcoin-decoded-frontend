import { BRAND } from "../data";
import type { Theme } from "../types";

export const getBrandGold = (theme: Theme): string =>
  theme === "dark" ? BRAND.goldDark : BRAND.goldLight;
