import { useEffect, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";

import { THEME_COLORS } from "../data";
import type { Theme } from "../types";

import { ThemeContext } from "./ThemeContext";

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  useEffect(() => {
    const colors = THEME_COLORS[theme];
    document.body.style.backgroundColor = colors.base.background.primary;
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
