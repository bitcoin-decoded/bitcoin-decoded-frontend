import { useRouterContext } from "../../../Routing/hooks/useRouterContext";
import { THEME_COLORS } from "../data";
import { getModuleThemeColor } from "../helpers";

import { useThemeContext } from "./useThemeContext";

export const usePageTheme = () => {
  const { theme } = useThemeContext();
  const { currentPage } = useRouterContext();
  const colors = THEME_COLORS[theme];
  const moduleTheme = getModuleThemeColor(currentPage);

  return { theme, colors, moduleTheme, currentPage };
};
