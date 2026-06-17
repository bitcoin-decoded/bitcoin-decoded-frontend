/**
 * Intrinsic HTML element names whose text content must not be touched
 * by French punctuation normalization: URLs in <a>, inline/block code,
 * keyboard/sample blocks, and raw SVG (charts, icons).
 */
export const SKIPPED_INTRINSICS: ReadonlySet<string> = new Set([
  "a",
  "code",
  "pre",
  "kbd",
  "samp",
  "svg",
]);
