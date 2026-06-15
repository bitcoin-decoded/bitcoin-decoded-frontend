import { type CSSProperties, type FC, type ReactNode } from "react";

import { Caption, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  /** Block index — exposed as `data-block` for scroll/anchor targeting. */
  index: number;
  isCurrent: boolean;
  /** Play the seal/confirm reveal (only the freshly surfaced block). */
  revealing: boolean;
  /** Optional short label shown after the block index in the header. */
  title?: string;
  children: ReactNode;
};

/**
 * The enclosure that turns a reading block into a visible "block": a rounded,
 * bordered card with a `Bloc #N` header (a blockchain-explorer nod) that the
 * chain link plugs into. The active block lifts (accent border + soft glow);
 * past blocks recede (neutral border, dimmed) and are made non-interactive —
 * you can only act inside the block you're on. Navigating back (prev /
 * milestone) refocuses a block and re-enables it.
 */
export const BlockShell: FC<Props> = ({ index, isCurrent, revealing, title, children }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const isMobile = useBreakpoint() === "mobile";
  const accent = colors[moduleTheme].background.secondary;

  const sectionStyle: CSSProperties = {
    opacity: isCurrent ? 1 : 0.45,
    pointerEvents: isCurrent ? "auto" : "none",
    transition: "opacity 0.5s var(--ease-smooth)",
    // Anchor offset: clears the sticky header (3.5rem) + the jalon sub-bar so a
    // jumped-to block lands with its header at the top, not under the chrome.
    scrollMarginTop: "6.5rem",
  };

  const cardStyle: CSSProperties = {
    borderRadius: "1rem",
    border: `1px solid ${isCurrent ? withOpacity(accent, 0.5) : colors.base.border.secondary}`,
    background: isCurrent
      ? `linear-gradient(190deg, ${withOpacity(accent, 0.06)}, ${colors.base.background.primary})`
      : colors.base.background.primary,
    boxShadow: isCurrent ? `0 8px 30px ${withOpacity(accent, 0.12)}` : "none",
    padding: isMobile ? "1.15rem 1.2rem" : "1.5rem 1.65rem",
    transition:
      "border-color 0.5s var(--ease-smooth), background 0.5s var(--ease-smooth), box-shadow 0.5s var(--ease-smooth)",
    // Consumed by the blockConfirm "mined" pulse keyframe (theme-aware).
    ["--reading-ring" as string]: withOpacity(accent, 0.55),
    ["--reading-glow" as string]: withOpacity(accent, 0.22),
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: isMobile ? "0.85rem" : "1rem",
  };

  const glyphStyle: CSSProperties = {
    width: 10,
    height: 10,
    flex: "0 0 auto",
    borderRadius: 3,
    background: isCurrent ? accent : "transparent",
    border: `1.5px solid ${isCurrent ? accent : withOpacity(colors.base.text.primary, 0.25)}`,
  };

  const label = `${t("reading.blockLabel")} #${index + 1}${title ? ` · ${title}` : ""}`;

  return (
    <section data-block={index} style={sectionStyle}>
      <div
        className={revealing ? "reading-block-inner revealing" : "reading-block-inner"}
        style={cardStyle}
      >
        <div style={headerStyle}>
          <span style={glyphStyle} />
          <Caption size="xs" tone={isCurrent ? "world" : "muted"}>
            {label}
          </Caption>
        </div>
        {children}
      </div>
    </section>
  );
};
