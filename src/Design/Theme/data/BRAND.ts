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
  /**
   * Slightly lightened/warmed gold for dark-mode surfaces — the base gold
   * `#C4A45A` reads too dim against deep navy/black at hairline thicknesses.
   * Use via `getBrandGold(theme)` so consumers don't branch inline.
   */
  goldDark: "#D4B469",
  navy: "#16213E",
  cream: "#F8F5EE",
  orange: "#F7931A", // reserved signal — Bitcoin module + on-chain validations only
  figures: {
    blockSize: 14,
    coinSize: 14,
    ruleThickness: 1,
  },
  /**
   * Component type scale — the SINGLE source for font sizes INSIDE interactive
   * components (sims, panels, tables). Just TWO sizes, one step below the 17px
   * chapter prose: components read as a distinct, denser "instrument" register.
   * Route EVERY component font-size through these tokens — never hardcode a rem
   * value, and never go below 12px (the legibility floor the user set).
   *   body = 14px — PRIMARY: content, table cells, panel bodies, component titles
   *   label / note / micro = 12px — SECONDARY: labels, captions, units, chips,
   *     hints. (Three names kept for code clarity; all resolve to the 12px floor.)
   */
  fontSize: {
    body: "0.875rem",
    label: "0.75rem",
    note: "0.75rem",
    micro: "0.75rem",
  },
  /**
   * Readable pedagogical type stack, chosen for sustained reading. Literata
   * (display) is a screen-first reading serif designed for Google Play Books;
   * Source Serif 4 (body) is a highly legible text serif; Cutive Mono (mono)
   * is a typewriter face for technical metadata. None of these is the
   * AI-default ("Inter / Satoshi / Fraunces / JetBrains Mono") that you see on
   * every editorial or fintech site since 2022. The stack is the typography of
   * the site's voice, not its template.
   */
  fonts: {
    display: "'Literata', 'Cormorant Garamond', Georgia, serif",
    body: "'Source Serif 4', Georgia, serif",
    mono: "'Cutive Mono', 'JetBrains Mono', ui-monospace, monospace",
    /** Logotype wordmark only (the "Bitcoin Decoded" lockup + avatar "B"). A
     * deliberate high-contrast Garamond kept distinct from the UI display face,
     * so the brand mark never shifts when the reading stack changes. */
    wordmark: "'Cormorant Garamond', Georgia, serif",
  },
};
