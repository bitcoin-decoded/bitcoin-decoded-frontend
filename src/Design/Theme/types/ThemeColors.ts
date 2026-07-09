import { THEME_COLORS } from "../data";

import type { Theme } from "./Theme";

/** The resolved color palette for one theme, i.e. `THEME_COLORS[theme]`. */
export type ThemeColors = (typeof THEME_COLORS)[Theme];
