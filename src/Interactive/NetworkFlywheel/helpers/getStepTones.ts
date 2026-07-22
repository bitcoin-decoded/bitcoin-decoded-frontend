import type { usePageTheme } from "../../../Design";

type ThemeColors = ReturnType<typeof usePageTheme>["colors"];

export const getStepTones = (colors: ThemeColors): readonly string[] => [
  colors.blue.background.secondary, // usage
  colors.amber.background.secondary, // fees
  colors.semantic.success.text, // miner revenue
  colors.violet.background.secondary, // network security
  colors.semantic.info.text, // secured value
];
