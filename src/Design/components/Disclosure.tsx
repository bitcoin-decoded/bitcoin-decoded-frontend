import { type CSSProperties, type FC, type ReactNode } from "react";

import { ChevronDown } from "lucide-react";

import { withOpacity } from "../helpers";
import { useDisclosure } from "../hooks";
import { BRAND, usePageTheme } from "../Theme";

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

  const accentColor = world.border.secondary;
  const baseTextSecondary = colors.base.text.secondary;
  const basePrimaryText = world.text.primary;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accentColor, 0.22)}`,
    // Flat faint module wash — no gradient (the directional glow was a SaaS tell).
    background: withOpacity(accentColor, 0.05),
    overflow: "hidden",
    minWidth: 0,
    boxSizing: "border-box",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    padding: "0.85rem 1.05rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: accentColor,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.7rem",
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
    padding: "0 1.05rem 0.95rem 1.05rem",
    color: basePrimaryText,
    fontSize: "0.7rem",
    lineHeight: 1.6,
    // Reset MainLayout's desktop "text-align: justify"
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const chevronStyle: CSSProperties = {
    flexShrink: 0,
    color: withOpacity(baseTextSecondary, 0.7),
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
