import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { BRAND, getBrandGold, THEME_COLORS, useBreakpoint, useThemeContext } from "../../../Design";

type Props = {
  /** Block index - exposed as `data-block` for scroll/anchor targeting. */
  index: number;
  isCurrent: boolean;
  /** Play the seal/confirm reveal (only the freshly surfaced block). */
  revealing: boolean;
  /** Optional short label appended to the block header (e.g. "Le piège"). */
  title?: string;
  /**
   * When `true`, the body's first paragraph receives the drop-block lettrine
   * (gold carré + Cormorant Garamond first-letter). Set by `BlockReader`
   * on Block 0 only, when the chapter opts in via `PAGE_METADATA.dropBlock`.
   * @default false
   */
  dropBlock?: boolean;
  /** Return to this block (clicking a read block refocuses it). */
  onActivate?: () => void;
  children: ReactNode;
};

/**
 * The ledger block-shell — a single block in the chapter's chain, rendered as a
 * ledger row rather than a card. A mono block-header strip (`# block 0001`,
 * optional title kicker) sits above a gold hairline broken by the centered
 * carré-bloc signature (same vocabulary as SurfaceCard tops and the
 * Header/Footer chrome). Open sides — content bleeds into the page margin
 * like a book block, not a floating card. The bottom rule closes the block
 * without ever announcing the next one (preserves discovery; see
 * feedback-design-refonte-rules rule 2).
 *
 * Past blocks recede via opacity dimming and lock pointer events, but the
 * shell stays clickable as a whole to return to them.
 */
export const BlockShell: FC<Props> = ({
  index,
  isCurrent,
  revealing,
  title,
  dropBlock = false,
  onActivate,
  children,
}) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const gold = getBrandGold(theme);
  const readable = !isCurrent;

  const sectionStyle: CSSProperties = {
    opacity: isCurrent ? 1 : isHovered ? 0.7 : 0.5,
    cursor: readable ? "pointer" : "default",
    transition: "opacity 0.4s var(--ease-smooth)",
    // Anchor offset: clears the sticky header (3.5rem + signature rule)
    // and the chain-ribbon sub-bar so a jumped-to block lands cleanly.
    scrollMarginTop: "6.5rem",
    margin: isMobile ? "2rem 0" : "2.5rem 0",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    padding: isMobile ? "0 0.25rem" : "0",
    transition: "opacity 0.5s var(--ease-smooth)",
    ["--reading-glow" as string]: "transparent",
    // Lock interactions inside read blocks; the click falls through to
    // the section, which refocuses the block via onActivate.
    pointerEvents: isCurrent ? "auto" : "none",
  };

  // Background color of the page behind the rules — used to mask the gold
  // rule under the mono `# block NNNN` label so the label "interrupts" the
  // rule cleanly, same trick as SurfaceCard's txLabel.
  const maskBg = colors.base.background.primary;

  const headerRowHeight = BRAND.figures.blockSize + 2;

  const headerWrapperStyle: CSSProperties = {
    position: "relative",
    height: headerRowHeight,
    marginBottom: title ? "0.4rem" : "1rem",
  };

  const ruleLineStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: BRAND.figures.ruleThickness,
    background: gold,
    transform: "translateY(-50%)",
  };

  const ruleBlockStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: BRAND.figures.blockSize,
    height: BRAND.figures.blockSize,
    background: gold,
  };

  // Block label: lowercase mono, no font-variant (JetBrains Mono synthesizes
  // small-caps badly — synthetic caps make the label look "pattes de mouche"
  // at small sizes). Lowercase ledger-style is already the correct register.
  // Sized at 0.8125rem with more letter-spacing for readability on dark bg.
  const blockLabelStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: colors.base.text.primary,
    lineHeight: `${headerRowHeight}px`,
    background: maskBg,
    paddingRight: "0.6rem",
  };

  const titleKickerStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.12em",
    color: colors.base.text.secondary,
    fontVariant: "small-caps",
    marginBottom: "0.85rem",
  };

  // Use vertical-only padding (not shorthand) so the CSS class's
  // padding-left for marginalia isn't overridden by this inline style.
  const bodyStyle: CSSProperties = {
    paddingTop: isMobile ? "0.1rem" : "0.25rem",
    paddingBottom: isMobile ? "0.1rem" : "0.25rem",
  };

  // Two CSS hooks consumed by index.css:
  // - `reading-block-body` enables paragraph marginalia (numbered prose
  //   lines via CSS counter) for every direct <p> child
  // - `reading-block-drop-block` enables the lettrine on first paragraph
  const bodyClassName = dropBlock
    ? "reading-block-body reading-block-drop-block"
    : "reading-block-body";

  const footerRuleStyle: CSSProperties = {
    height: BRAND.figures.ruleThickness,
    background: gold,
    opacity: 0.4,
    marginTop: "1.25rem",
  };

  // Pad the block id with leading zeros to four digits — visual rhythm with
  // a real block height. `# block 0001` reads as "this is the first block".
  const blockIdLabel = `# block ${String(index + 1).padStart(4, "0")}`;

  return (
    <section
      data-block={index}
      style={sectionStyle}
      onClick={readable ? onActivate : undefined}
      onMouseEnter={readable ? () => setIsHovered(true) : undefined}
      onMouseLeave={readable ? () => setIsHovered(false) : undefined}
    >
      <div
        className={revealing ? "reading-block-inner revealing" : "reading-block-inner"}
        style={innerStyle}
      >
        <div style={headerWrapperStyle} aria-hidden="true">
          <div style={ruleLineStyle} />
          <div style={ruleBlockStyle} className="reading-block-stamp" />
          <span style={blockLabelStyle}>{blockIdLabel}</span>
        </div>
        {title && <span style={titleKickerStyle}>· {title.toLowerCase()}</span>}
        <div className={bodyClassName} style={bodyStyle}>
          {children}
        </div>
        <div style={footerRuleStyle} aria-hidden="true" />
      </div>
    </section>
  );
};
