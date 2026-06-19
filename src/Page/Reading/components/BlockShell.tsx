import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { Caption, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  /** Block index - exposed as `data-block` for scroll/anchor targeting. */
  index: number;
  isCurrent: boolean;
  /** Play the seal/confirm reveal (only the freshly surfaced block). */
  revealing: boolean;
  /** Optional short label shown after the block index in the header. */
  title?: string;
  /** Return to this block (clicking a read block refocuses it). */
  onActivate?: () => void;
  children: ReactNode;
};

/**
 * The enclosure that turns a reading block into a visible "block in a chain": a
 * framed card (accent ring + lit top edge + a header seal line) with a
 * `Bloc #N` header the chain link plugs into. The active block lifts (thicker
 * accent ring + glow); past blocks recede (thin neutral ring, dimmed) and lock
 * their content (`pointer-events: none`) while staying clickable as a whole to
 * return to them - the second way back, alongside the milestone jalons.
 */
export const BlockShell: FC<Props> = ({
  index,
  isCurrent,
  revealing,
  title,
  onActivate,
  children,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const accent = colors[moduleTheme].background.secondary;
  const readable = !isCurrent; // dimmed + clickable to return

  const sectionStyle: CSSProperties = {
    opacity: isCurrent ? 1 : isHovered ? 0.66 : 0.45,
    cursor: readable ? "pointer" : "default",
    transition: "opacity 0.4s var(--ease-smooth)",
    // Anchor offset: clears the sticky header (3.5rem) + the jalon sub-bar so a
    // jumped-to block lands with its header at the top, not under the chrome.
    scrollMarginTop: "6.5rem",
  };

  const cardStyle: CSSProperties = {
    position: "relative",
    borderRadius: "1rem",
    background: isCurrent
      ? `linear-gradient(180deg, ${withOpacity(accent, 0.08)}, ${colors.base.background.primary} 60%)`
      : colors.base.background.primary,
    // Frame is a layered ring (crisp, accent-aware, thicker when active) + a lit
    // top edge + depth glow on the active block. Reads as a sealed "block".
    boxShadow: isCurrent
      ? `0 0 0 1.5px ${withOpacity(accent, 0.55)}, inset 0 1px 0 ${withOpacity("#ffffff", 0.08)}, 0 18px 48px -16px ${withOpacity(accent, 0.28)}`
      : `0 0 0 1px ${withOpacity(colors.base.text.primary, 0.1)}, inset 0 1px 0 ${withOpacity("#ffffff", 0.035)}`,
    padding: isMobile ? "1.2rem 1.25rem" : "1.55rem 1.7rem",
    transition: "box-shadow 0.5s var(--ease-smooth), background 0.5s var(--ease-smooth)",
    // Glow color for the header-stamp confirm pulse (keyframe blockConfirm).
    ["--reading-glow" as string]: withOpacity(accent, 0.55),
    // Lock interactions inside read blocks; the click falls through to the
    // section, which refocuses the block.
    pointerEvents: isCurrent ? "auto" : "none",
  };

  const sealStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "1.1rem",
    right: "1.1rem",
    height: 2,
    borderRadius: "0 0 2px 2px",
    background: isCurrent
      ? `linear-gradient(90deg, transparent, ${withOpacity(accent, 0.85)}, transparent)`
      : `linear-gradient(90deg, transparent, ${withOpacity(colors.base.text.primary, 0.12)}, transparent)`,
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: isMobile ? "0.85rem" : "1rem",
  };

  const stampStyle: CSSProperties = {
    width: 10,
    height: 10,
    flex: "0 0 auto",
    borderRadius: 3,
    background: isCurrent ? accent : "transparent",
    border: `1.5px solid ${isCurrent ? accent : withOpacity(colors.base.text.primary, 0.25)}`,
  };

  const label = `${t("reading.blockLabel")} #${index + 1}${title ? ` · ${title}` : ""}`;

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
        style={cardStyle}
      >
        <span style={sealStyle} aria-hidden="true" />
        <div style={headerStyle}>
          <span className="reading-block-stamp" style={stampStyle} />
          <Caption size="xs" tone={isCurrent ? "world" : "muted"}>
            {label}
          </Caption>
        </div>
        {children}
      </div>
    </section>
  );
};
