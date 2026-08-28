import { BRAND, getBrandGold, THEME_COLORS, withOpacity } from "../../../Design";

// Single source of truth for the escalier's surface, so dark and light stay
// consistent across every palier. One readability call lives here: the reserved
// Bitcoin orange fails AA on the cream ground, so the bascule emphasis falls back
// to the amber module accent in light mode; the ledger trame lines are keyed off
// the ink so they read on both grounds without ever going pure black or white.
export const getLandingColors = (theme: "dark" | "light") => {
  const isDark = theme === "dark";
  const colors = THEME_COLORS[theme];
  const ink = colors.base.text.primary;

  return {
    ground: colors.base.background.primary,
    ink,
    ink2: colors.base.text.secondary,
    ink3: withOpacity(ink, isDark ? 0.42 : 0.55),
    gold: getBrandGold(theme),
    accent: isDark ? BRAND.orange : colors.amber.text.secondary,
    line: withOpacity(ink, 0.06),
    lineStrong: withOpacity(ink, isDark ? 0.14 : 0.16),
  };
};
