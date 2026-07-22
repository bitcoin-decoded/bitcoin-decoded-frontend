import { useEffect, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";

import { readStored, writeStored } from "../../../Platform";
import { THEME_COLORS } from "../data";
import type { Theme } from "../types";

import { ThemeContext } from "./ThemeContext";

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = readStored("theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      writeStored("theme", next);
      return next;
    });
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  useEffect(() => {
    const colors = THEME_COLORS[theme];
    document.body.style.backgroundColor = colors.base.background.primary;
    document.documentElement.dataset.theme = theme;
    // Reveals the prerendered markup index.html hid when the stored theme
    // disagreed with the file.
    delete document.documentElement.dataset.themePending;
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
