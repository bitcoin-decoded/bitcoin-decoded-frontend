import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useDisclosure } from "../hooks";
import { useBreakpoint } from "../Responsive";
import { getTypography, usePageTheme } from "../Theme";

import { DoodleNotes } from "@doodle";
import { ChevronDown } from "@icons";

type Props = {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
};

export const Disclosure: FC<Props> = ({ title, icon, defaultOpen = false, children }) => {
  const breakpoint = useBreakpoint();
  const typo = getTypography(breakpoint);
  const { isOpen, toggle } = useDisclosure(defaultOpen);
  const { colors, moduleTheme } = usePageTheme();
  const world = colors[moduleTheme];
  const headerText = world.text.secondary;
  const borderColor = world.border.secondary;
  const basePrimaryText = world.text.primary;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
    border: `1px solid ${withOpacity(borderColor, 0.3)}`,
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
    background: withOpacity(headerText, 0.08),
    border: "none",
    cursor: "pointer",
    color: headerText,
    ...typo.label,
    fontVariant: "small-caps",
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
    borderTop: `1px solid ${withOpacity(borderColor, 0.22)}`,
    padding: "0.85rem 1.05rem 0.95rem 1.05rem",
    color: basePrimaryText,
    fontSize: typo.prose.fontSize,
    lineHeight: 1.6,
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
          {icon ?? <DoodleNotes size={breakpoint === "mobile" ? 22 : 26} />}
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
