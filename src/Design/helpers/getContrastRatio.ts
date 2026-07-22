import { hexToRgb } from "./hexToRgb";

const toLinear = (channel: number): number => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (hex: string): number | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b);
};

export const getContrastRatio = (foreground: string, background: string): number | null => {
  const lumA = relativeLuminance(foreground);
  const lumB = relativeLuminance(background);
  if (lumA === null || lumB === null) return null;

  const [lighter, darker] = lumA > lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
};
