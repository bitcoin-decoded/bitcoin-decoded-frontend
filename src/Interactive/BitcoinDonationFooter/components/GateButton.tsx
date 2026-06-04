import { type CSSProperties, type FC, useState } from "react";

import { type LucideIcon } from "lucide-react";

import { useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import type { DonationGate } from "../types";

type Props = {
  gateKey: DonationGate;
  icon: LucideIcon;
  label: string;
  sub: string;
  onSelect: (gate: DonationGate) => void;
};

/** A single door in the gate selector: icon circle + label + sub-label. */
export const GateButton: FC<Props> = ({ gateKey, icon: Icon, label, sub, onSelect }) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const [hovered, setHovered] = useState(false);
  const accent = colors.amber.text.secondary;

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
    width: "100%",
    padding: isMobile ? "0.85rem 1rem" : "1rem 1.15rem",
    background: hovered
      ? `linear-gradient(135deg, ${withOpacity(accent, 0.12)}, ${withOpacity(accent, 0.03)})`
      : withOpacity(colors.base.text.secondary, 0.03),
    border: `1px solid ${withOpacity(accent, hovered ? 0.6 : 0.22)}`,
    borderRadius: "0.85rem",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s var(--ease-smooth)",
  };

  const iconCircle: CSSProperties = {
    width: "2.4rem",
    height: "2.4rem",
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: withOpacity(accent, 0.12),
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    color: accent,
  };

  return (
    <button
      type="button"
      style={style}
      onClick={() => onSelect(gateKey)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={iconCircle}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: "0.1rem", minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: colors.base.text.primary,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: "0.78rem", color: colors.base.text.secondary }}>{sub}</span>
      </span>
    </button>
  );
};
