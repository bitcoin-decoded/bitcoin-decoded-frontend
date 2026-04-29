import { type CSSProperties, type FC, type ReactNode } from "react";
import { Check } from "lucide-react";

import { withOpacity } from "../../../Design/helpers";
import type { ActionButtonVariant, SigPlaygroundColors } from "../../types";

type Props = {
  onClick: () => void;
  consumed: boolean;
  variant: ActionButtonVariant;
  label: string;
  consumedLabel: string;
  icon: ReactNode;
  isMobile: boolean;
  colors: SigPlaygroundColors;
};

/**
 * Action button with two crystal-clear states:
 *   - Active: bold accent gradient + glow → "click me" is obvious.
 *   - Consumed: dashed border + ✓ icon + muted → "done" is obvious.
 */
export const ActionButton: FC<Props> = ({
  onClick,
  consumed,
  variant,
  label,
  consumedLabel,
  icon,
  isMobile,
  colors,
}) => {
  const palette = variant === "primary" ? colors.accentColor : colors.successColor;

  // Style aligned with the rest of the Bitcoin section (cf. ByzantineGenerals,
  // chapter 4): subtle gradient + accent border + accent text. Less "loud"
  // than a saturated white-on-color button.
  const activeStyle: CSSProperties = {
    cursor: "pointer",
    color: variant === "primary" ? colors.basePrimaryText : palette,
    background: `linear-gradient(135deg, ${withOpacity(palette, 0.12)}, transparent)`,
    border: `1.5px solid ${withOpacity(palette, 0.55)}`,
    boxShadow: "none",
  };

  const consumedStyle: CSSProperties = {
    cursor: "default",
    color: withOpacity(colors.baseTextSecondary, 0.55),
    background: withOpacity(colors.baseBorderSecondary, 0.04),
    border: `1px dashed ${withOpacity(colors.baseBorderSecondary, 0.25)}`,
    boxShadow: "none",
  };

  return (
    <button
      onClick={consumed ? undefined : onClick}
      disabled={consumed}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        alignSelf: "flex-start",
        padding: isMobile ? "0.5rem 0.85rem" : "0.55rem 1rem",
        borderRadius: "0.55rem",
        fontSize: isMobile ? "0.7rem" : "0.74rem",
        fontWeight: 600,
        letterSpacing: "0.01em",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        transition: "all 0.3s var(--ease-smooth)",
        maxWidth: "100%",
        whiteSpace: isMobile ? "normal" : "nowrap",
        textAlign: "left",
        ...(consumed ? consumedStyle : activeStyle),
      }}
    >
      {consumed ? <Check size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} /> : icon}
      <span style={{ minWidth: 0 }}>{consumed ? consumedLabel : label}</span>
    </button>
  );
};
