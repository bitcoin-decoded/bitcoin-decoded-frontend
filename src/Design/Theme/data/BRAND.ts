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
  gold: "#C4A45A",
  navy: "#16213E",
  cream: "#F8F5EE",
  orange: "#F7931A", // reserved signal — Bitcoin module + on-chain validations only
  figures: {
    blockSize: 12,
    coinSize: 12,
    ruleThickness: 0.75,
  },
  fonts: {
    display: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
};
