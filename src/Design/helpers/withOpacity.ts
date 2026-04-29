/**
 * Applies an opacity to any CSS color string (hex or rgba).
 * Returns a valid rgba() string regardless of input format.
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Handle rgba(r, g, b, a)
  const rgbaMatch = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\s*\)/
  );
  if (rgbaMatch) {
    return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
  }

  // Handle hex (#rrggbb or #rgb)
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16);
    const g = parseInt(hexMatch[2], 16);
    const b = parseInt(hexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Fallback: return as-is
  return color;
};
