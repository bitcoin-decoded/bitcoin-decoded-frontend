import type { Theme } from "./";

export type ThemeContextState = {
  theme: Theme;
  toggleTheme: () => void;
};
