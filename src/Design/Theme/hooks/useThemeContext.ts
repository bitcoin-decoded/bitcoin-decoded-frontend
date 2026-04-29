import { ThemeContext } from "../components";
import type { ThemeContextState } from "../types";
import { useContext } from "react";

export const useThemeContext = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
