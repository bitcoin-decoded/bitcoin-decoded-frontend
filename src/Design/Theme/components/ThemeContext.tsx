import { createContext } from "react";
import type { ThemeContextState } from "../types";

export const ThemeContext = createContext<ThemeContextState | undefined>(
  undefined
);
