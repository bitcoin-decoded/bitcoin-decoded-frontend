import { type CSSProperties, type FC, useState } from "react";

import { BRAND, useBreakpoint, useDisclosure, usePageTheme, withOpacity } from "../../../Design";
import type { MonetaryPillar } from "../types";

import { ChevronDown } from "@icons";

type Props = {
  pillar: MonetaryPillar;
  /** 1-based pillar number, used for the leading badge ("01" → "05"). */
  index: number;
  /** When true, no border-bottom is drawn (this is the last row of the unified block). */
  isLast: boolean;
};

/**
 * One pillar row inside the unified `MonetaryPillars` envelope. Flat by
 * design (no per-row border or shadow) - the visual unity comes from the
 * outer container and the shared internal dividers between rows.
 *
 * When `pillar.isKeystone` is true, the row is rendered with an amber
 * accent + a "Structurel" badge to single out the keystone property
 * (hardness, in the current dataset).
 */
export const PillarRow: FC<Props> = ({ pillar, index, isLast }) => {
  const { isOpen, toggle } = useDisclosure(false);
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const [isHovered, setIsHovered] = useState(false);

  const world = colors[moduleTheme];
  const accentText = pillar.isKeystone ? colors.amber.text.secondary : world.text.secondary;
  const accentBorder = pillar.isKeystone ? colors.amber.border.secondary : world.border.secondary;

  const mono = { fontFamily: BRAND.fonts.mono } as const;
  const numberLabel = String(index + 1).padStart(2, "0");

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    borderBottom: isLast ? "none" : `1px dashed ${withOpacity(world.border.secondary, 0.28)}`,
    background:
      isHovered || isOpen
        ? withOpacity(
            pillar.isKeystone ? colors.amber.text.secondary : world.background.secondary,
            0.05,
          )
        : "transparent",
    transition: "background 0.25s var(--ease-smooth)",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "0.7rem" : "0.85rem",
    padding: isMobile ? "0.85rem 0.95rem" : "0.95rem 1.1rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    color: colors.base.text.primary,
  };

  const numberStyle: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    color: accentText,
    letterSpacing: "0.08em",
    flexShrink: 0,
    minWidth: isMobile ? "1.4rem" : "1.6rem",
    opacity: pillar.isKeystone ? 1 : 0.7,
  };

  const iconCircleStyle: CSSProperties = {
    width: isMobile ? "2.1rem" : "2.4rem",
    height: isMobile ? "2.1rem" : "2.4rem",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: withOpacity(accentText, isOpen ? 0.18 : 0.1),
    border: `1px solid ${withOpacity(accentBorder, 0.4)}`,
    color: accentText,
    transition: "all 0.3s var(--ease-smooth)",
  };

  const titleColumnStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    flex: 1,
    minWidth: 0,
  };

  const titleRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  };

  const titleStyle: CSSProperties = {
    ...mono,
    fontSize: BRAND.fontSize.body,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: pillar.isKeystone ? accentText : world.text.primary,
  };

  const chevronStyle: CSSProperties = {
    flexShrink: 0,
    color: withOpacity(accentText, 0.75),
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.35s var(--ease-smooth)",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isOpen ? "1fr" : "0fr",
    transition: "grid-template-rows 0.45s var(--ease-smooth)",
  };

  const bodyWrapperStyle: CSSProperties = {
    overflow: "hidden",
    minHeight: 0,
  };

  // Indent body to align with the title column (icon + number + gaps).
  const bodyLeftPad = isMobile
    ? `calc(0.95rem + ${numberStyle.minWidth} + 0.7rem + 2.1rem + 0.7rem)`
    : `calc(1.1rem + ${numberStyle.minWidth} + 0.85rem + 2.4rem + 0.85rem)`;

  const bodyStyle: CSSProperties = {
    padding: isMobile ? `0 0.95rem 1rem ${bodyLeftPad}` : `0 1.1rem 1.15rem ${bodyLeftPad}`,
    color: colors.base.text.primary,
    fontSize: BRAND.fontSize.body,
    lineHeight: 1.65,
    fontStyle: "italic",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-0.5rem)",
    transition: isOpen
      ? "opacity 0.45s var(--ease-smooth) 0.12s, transform 0.45s var(--ease-smooth) 0.12s"
      : "opacity 0.2s var(--ease-smooth), transform 0.2s var(--ease-smooth)",
  };

  const Icon = pillar.icon;

  return (
    <div
      style={rowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button type="button" onClick={toggle} aria-expanded={isOpen} style={headerStyle}>
        <span style={numberStyle}>{numberLabel}</span>
        <div style={iconCircleStyle}>
          <Icon size={isMobile ? "1.05rem" : "1.2rem"} />
        </div>
        <div style={titleColumnStyle}>
          <div style={titleRowStyle}>
            <span style={titleStyle}>{pillar.title}</span>
          </div>
        </div>
        <ChevronDown size={isMobile ? 16 : 18} strokeWidth={2.2} style={chevronStyle} />
      </button>

      <div style={gridStyle}>
        <div style={bodyWrapperStyle}>
          <div style={bodyStyle}>{pillar.description}</div>
        </div>
      </div>
    </div>
  );
};
