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

/**
 * WCAG 2.1 contrast ratio between two opaque hex colours, from 1 (identical)
 * to 21 (black on white). AA body text needs 4.5, AA large text needs 3.
 * Returns null if either colour is not a 6-digit hex.
 */
export const getContrastRatio = (foreground: string, background: string): number | null => {
  const lumA = relativeLuminance(foreground);
  const lumB = relativeLuminance(background);
  if (lumA === null || lumB === null) return null;

  const [lighter, darker] = lumA > lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
};
