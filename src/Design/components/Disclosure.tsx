import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useDisclosure } from "../hooks";
import { BRAND, usePageTheme } from "../Theme";

import { ChevronDown } from "@icons";

type Props = {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
};

/**
 * Generic collapsible panel. Header is a clickable button that toggles the
 * body open/closed with a smooth animation. Used for "show more" patterns
 * where extra detail should be available on demand.
 */
export const Disclosure: FC<Props> = ({ title, icon, defaultOpen = false, children }) => {
  const { isOpen, toggle } = useDisclosure(defaultOpen);
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];

  // The header text reads in the module's secondary TEXT color (legible), not
  // the much fainter border color the whole component used to share. The border
  // color stays for the frame + divider.
  const headerText = world.text.secondary;
  const borderColor = world.border.secondary;
  const basePrimaryText = world.text.primary;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    border: `1px solid ${withOpacity(borderColor, 0.3)}`,
    // No gradient (the directional glow was a SaaS tell) and no body wash —
    // hierarchy is carried by a tinted header BAR + a divider above the body.
    background: "transparent",
    overflow: "hidden",
    minWidth: 0,
    boxSizing: "border-box",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.8rem 1.05rem",
    // Faint module-tinted bar so the header reads as a distinct clickable strip.
    background: withOpacity(headerText, 0.08),
    border: "none",
    cursor: "pointer",
    color: headerText,
    fontFamily: BRAND.fonts.mono,
    // Interactive header at the body scale (14px) so the title reads clearly —
    // it was a near-invisible 11.8px. Distinguished from the body by small-caps
    // + module color + the tinted bar + its icon, not by size.
    fontSize: BRAND.fontSize.body,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    textAlign: "left",
    width: "100%",
    transition: "background 0.2s var(--ease-smooth)",
  };

  const headerLabelStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    minWidth: 0,
    overflowWrap: "anywhere",
  };

  // Modern grid-template-rows trick: animates from 0fr → 1fr smoothly
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: isOpen ? "1fr" : "0fr",
    transition: "grid-template-rows 0.3s var(--ease-smooth)",
  };

  const bodyWrapperStyle: CSSProperties = {
    overflow: "hidden",
    minHeight: 0,
  };

  const bodyStyle: CSSProperties = {
    // Hairline divider under the header bar restores the header/body hierarchy
    // the gradient used to imply.
    borderTop: `1px solid ${withOpacity(borderColor, 0.22)}`,
    padding: "0.85rem 1.05rem 0.95rem 1.05rem",
    color: basePrimaryText,
    // Component body scale (14px) — matches table cells / feedback bodies.
    fontSize: BRAND.fontSize.body,
    lineHeight: 1.6,
    // Reset MainLayout's desktop "text-align: justify"
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const chevronStyle: CSSProperties = {
    flexShrink: 0,
    color: withOpacity(headerText, 0.75),
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s var(--ease-smooth)",
  };

  return (
    <div style={containerStyle}>
      <button type="button" onClick={toggle} aria-expanded={isOpen} style={headerStyle}>
        <span style={headerLabelStyle}>
          {icon}
          <span style={{ minWidth: 0 }}>{title}</span>
        </span>
        <ChevronDown size={14} strokeWidth={2.2} style={chevronStyle} />
      </button>

      <div style={gridStyle}>
        <div style={bodyWrapperStyle}>
          <div style={bodyStyle}>{children}</div>
        </div>
      </div>
    </div>
  );
};
