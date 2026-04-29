import type { FC, ReactNode } from "react";
import { useState, useMemo, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "../types";
import { THEME_COLORS } from "../data";

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
  }, [theme]); // Cet effet se déclenche à chaque changement de thème


  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
