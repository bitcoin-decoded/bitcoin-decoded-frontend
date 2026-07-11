/**
 * Atemporal brand pigments — lifted verbatim from the official Bitcoin.Decoded
 * Logo Kit. Values are mode-agnostic (the gold is the gold in both light and
 * dark); only their *application* inverts (cream → bg in light, navy → bg in
 * dark). For mode-aware mappings see THEME_COLORS.
 *
 * The figures dictionary encodes the block-vs-coin dichotomy: gold square =
 * structural unit (block, separator, marginalia marker); gold circle = value
 * unit being manipulated (slider thumbs, validation badges, count markers).
 * The two figures share the same gold but their semantics is distinct — a
 * structural element never uses a circle, an interactive marker never uses a
 * square. See feedback-design-refonte-rules (rule 9).
 *
 * CSS-variable mirrors live in index.css (--brand-gold, --brand-navy,
 * --brand-cream, --block-size, --coin-size, --rule-thickness) for use in
 * keyframes and pseudo-elements.
 */
export const BRAND = {
  /** Canonical logo pigment. Never render it as text: it fails WCAG on both
   * cream and navy. Use the mode-aware pair below via `getBrandGold(theme)`. */
  gold: "#C4A45A",
  /**
   * Slightly lightened/warmed gold for dark-mode surfaces — the base gold
   * `#C4A45A` reads too dim against deep navy/black at hairline thicknesses.
   * Use via `getBrandGold(theme)` so consumers don't branch inline.
   */
  goldDark: "#D4B469",
  /**
   * Deepened bronze-gold for light-mode surfaces — the symmetric problem: the
   * base gold sits at 2.4:1 on white, so numerals, kickers and rules dissolve.
   * Same hue family, dropped in luminance until it clears AA (5.6:1).
   */
  goldLight: "#7D6428",
  navy: "#16213E",
  cream: "#F8F5EE",
  orange: "#F7931A", // reserved signal — Bitcoin module + on-chain validations only
  figures: {
    blockSize: 14,
    coinSize: 14,
    ruleThickness: 1,
  },
  fonts: {
    display: "'Literata', 'Cormorant Garamond', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    mono: "'Cutive Mono', 'JetBrains Mono', ui-monospace, monospace",
    wordmark: "'Cormorant Garamond', Georgia, serif",
  },
};
