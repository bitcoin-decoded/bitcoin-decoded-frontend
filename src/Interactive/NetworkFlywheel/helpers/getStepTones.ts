import type { usePageTheme } from "../../../Design";

type ThemeColors = ReturnType<typeof usePageTheme>["colors"];

/**
 * One accent per cycle step so the categories - usage, fees, miner revenue,
 * security, secured value - read as visually distinct at a glance. Pulled from
 * the shared palette so it adapts to light/dark automatically. Adjacent steps
 * never share a hue family.
 */
export const getStepTones = (colors: ThemeColors): readonly string[] => [
  colors.blue.background.secondary, // usage
  colors.amber.background.secondary, // fees
  colors.semantic.success.text, // miner revenue
  colors.violet.background.secondary, // network security
  colors.semantic.info.text, // secured value
];
