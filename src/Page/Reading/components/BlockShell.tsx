import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { BRAND, getBrandGold, THEME_COLORS, useBreakpoint, useThemeContext } from "../../../Design";
import type { RevealPhase } from "../types";

type Props = {
  /** Block index - exposed as `data-block` for scroll/anchor targeting. */
  index: number;
  isCurrent: boolean;
  /**
   * The freshly surfaced block's entrance phase: "arriving" holds it hidden
   * during the scroll, "playing" composes its content in; null = no animation
   * (already seen). Drives the `.arriving` / `.revealing` classes (index.css).
   */
  revealPhase: RevealPhase | null;
  /** Optional short label appended to the block header (e.g. "Le piège"). */
  title?: string;
  /** Return to this block (clicking a read block refocuses it). */
  onActivate?: () => void;
  /**
   * The reader has not reached this block yet.
   *
   * It is still rendered, and hidden with `display: none` rather than left out
   * of the tree: the build renders every chapter to HTML for search engines,
   * and a block that is not mounted has no prose to index. Hidden content is
   * indexed; absent content is not there to be.
   *
   * `display: none` also keeps it out of the accessibility tree, so a screen
   * reader is not read chapters ahead of where its user has got to. The anchor
   * is unaffected: it only ever scrolls to a block already reached.
   */
  isUnreached?: boolean;
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
  revealPhase,
  title,
  onActivate,
  isUnreached = false,
  children,
}) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const gold = getBrandGold(theme);
  const readable = !isCurrent;

  const sectionStyle: CSSProperties = {
    // In the document, out of the page. Not a quieter block, an absent one: the
    // reader has not got here yet and must not see it, hear it or tab into it.
    display: isUnreached ? "none" : undefined,
    // A read block should all but disappear: the eye belongs on the current
    // one. Hover brings it back enough to read before clicking into it.
    opacity: isCurrent ? 1 : isHovered ? 0.7 : 0.25,
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

  // Editorial chapter-heading layout: mono label on the left, gold hairline
  // extending to the right margin. No centered carré on the rule — the carré
  // signature stays reserved to the wordmark (rare = meaningful). The label
  // and rule are siblings in a flex row, baseline-aligned.
  const headerRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    marginBottom: title ? "0.4rem" : "1rem",
  };

  const blockLabelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: colors.base.text.primary,
    flex: "0 0 auto",
    whiteSpace: "nowrap",
  };

  // Top and bottom rules are harmonized — same weight + opacity, driven by
  // whether the block is active. The active block frames itself with two thick,
  // full-strength gold rules; past blocks recede to thin, faint ones.
  const ruleHeight = isCurrent ? 1.5 : 1;
  const ruleOpacity = isCurrent ? 1 : 0.4;

  const headerRuleStyle: CSSProperties = {
    flex: "1 1 auto",
    height: ruleHeight,
    background: gold,
    opacity: ruleOpacity,
  };

  const titleKickerStyle: CSSProperties = {
    display: "block",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
    color: colors.base.text.secondary,
    fontVariant: "small-caps",
    marginBottom: "0.85rem",
  };

  // Vertical-only padding: the block body spans the full column width (the Tx
  // gutter now lives on the prose paragraphs themselves, not here — see
  // index.css), so non-prose children break out to full width.
  const bodyStyle: CSSProperties = {
    paddingTop: isMobile ? "0.1rem" : "0.25rem",
    paddingBottom: isMobile ? "0.1rem" : "0.25rem",
  };

  const footerRuleStyle: CSSProperties = {
    height: ruleHeight,
    background: gold,
    opacity: ruleOpacity,
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
        className={`reading-block-inner${
          revealPhase === "arriving" ? " arriving" : revealPhase === "playing" ? " revealing" : ""
        }`}
        style={innerStyle}
      >
        <div style={headerRowStyle}>
          <span style={blockLabelStyle}>{blockIdLabel}</span>
          <span style={headerRuleStyle} aria-hidden="true" />
        </div>
        {title && <span style={titleKickerStyle}>· {title.toLowerCase()}</span>}
        <div className="reading-block-body" style={bodyStyle}>
          {children}
        </div>
        <div style={footerRuleStyle} aria-hidden="true" />
      </div>
    </section>
  );
};
