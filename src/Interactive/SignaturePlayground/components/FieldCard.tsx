import { type CSSProperties, type FC, type ReactNode } from "react";

import { PenLine } from "lucide-react";

import { useBreakpoint } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { truncateHash } from "../../helpers";
import type { FieldTone, SigPlaygroundColors, ValueKind } from "../types";

type Props = {
  icon: ReactNode;
  label: string;
  /** Optional step number rendered as a small badge before the icon (1, 2, 3). */
  number?: number;
  value: string;
  hint: string;
  tone: FieldTone;
  valueKind: ValueKind;
  /** Truncate the read-only value (long hex) to first8…last6 so it stays on one line. */
  truncate?: boolean;
  editable?: boolean;
  onChange?: (next: string) => void;
  badge?: ReactNode;
  /** Optional footer line (e.g. "Connue uniquement de Nicolas"). */
  footerIcon?: ReactNode;
  footerLabel?: string;
  /**
   * When true, drops the outer border/background so the card can be
   * embedded inside another container (e.g. the unified pair card).
   */
  embedded?: boolean;
  /** Accessibility label for the editable / read-only state. */
  editableLabel: string;
  readOnlyLabel: string;
  colors: SigPlaygroundColors;
};

/**
 * One labelled field - used for the private key, public key and message.
 * Renders an editable input or a read-only display depending on `editable`.
 */
export const FieldCard: FC<Props> = ({
  icon,
  label,
  number,
  value,
  hint,
  tone,
  valueKind,
  truncate,
  editable,
  onChange,
  badge,
  footerIcon,
  footerLabel,
  embedded,
  editableLabel,
  readOnlyLabel,
  colors,
}) => {
  const isMobile = useBreakpoint() === "mobile";
  const accent =
    tone === "secret"
      ? colors.errorColor
      : tone === "public"
        ? colors.worldBorderSecondary
        : colors.neutralColor;
  const accentOpacityBorder = tone === "secret" ? 0.3 : tone === "public" ? 0.22 : 0.18;
  const accentOpacityBg = tone === "secret" ? 0.05 : tone === "public" ? 0.04 : 0.03;

  const containerStyle: CSSProperties = embedded
    ? {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: 0,
        minWidth: 0,
        boxSizing: "border-box",
        flex: 1,
      }
    : {
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
        padding: "0.85rem 0.9rem",
        borderRadius: "0.7rem",
        border: `1px solid ${withOpacity(accent, accentOpacityBorder)}`,
        background: withOpacity(accent, accentOpacityBg),
        minWidth: 0,
        boxSizing: "border-box",
        flex: 1,
      };

  const labelStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: accent,
    minWidth: 0,
  };

  const numberBadgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "1.05rem",
    height: "1.05rem",
    borderRadius: "50%",
    fontSize: "0.6rem",
    fontWeight: 700,
    color: accent,
    background: withOpacity(accent, 0.14),
    border: `1px solid ${withOpacity(accent, 0.4)}`,
  };

  const inputBase: CSSProperties = {
    width: "100%",
    padding: "0.5rem 0.65rem",
    borderRadius: "0.5rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.7rem",
    fontWeight: 600,
    color: colors.basePrimaryText,
    outline: "none",
    boxSizing: "border-box",
    wordBreak: valueKind === "hex" ? "break-all" : "normal",
    overflowWrap: valueKind === "hex" ? "anywhere" : "break-word",
    transition: "border-color 0.25s var(--ease-smooth), box-shadow 0.25s var(--ease-smooth)",
  };

  const editableInputStyle: CSSProperties = {
    ...inputBase,
    paddingRight: "1.85rem",
    border: `1.5px solid ${withOpacity(colors.successColor, 0.4)}`,
    background: withOpacity(colors.baseBackgroundSecondary, 0.06),
    // 16px on mobile prevents iOS Safari auto-zoom; tighter on desktop.
    fontSize: isMobile ? "16px" : "0.78rem",
  };

  const readOnlyValueStyle: CSSProperties = {
    ...inputBase,
    border: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.16)}`,
    background: withOpacity(colors.baseBackgroundSecondary, 0.04),
    cursor: "default",
  };

  const hintStyle: CSSProperties = {
    fontSize: "0.62rem",
    lineHeight: 1.5,
    color: withOpacity(colors.baseTextSecondary, 0.8),
    margin: 0,
    fontStyle: "italic",
  };

  const footerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.58rem",
    color: withOpacity(colors.baseTextSecondary, 0.85),
    fontWeight: 600,
    marginTop: "0.1rem",
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>
        {number !== undefined && <span style={numberBadgeStyle}>{number}</span>}
        {icon}
        <span style={{ minWidth: 0, overflowWrap: "break-word" }}>{label}</span>
      </div>

      <p style={hintStyle}>{hint}</p>

      {editable ? (
        <div style={{ position: "relative", minWidth: 0 }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            aria-label={editableLabel}
            style={editableInputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 0 3px ${withOpacity(colors.successColor, 0.18)}`)
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
          <PenLine
            size={12}
            strokeWidth={2}
            style={{
              position: "absolute",
              right: "0.65rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: withOpacity(colors.successColor, 0.55),
              pointerEvents: "none",
            }}
            aria-hidden
          />
        </div>
      ) : (
        <div
          style={readOnlyValueStyle}
          aria-label={readOnlyLabel}
          title={truncate ? value : undefined}
        >
          {truncate ? truncateHash(value) : value}
        </div>
      )}

      {badge}

      {footerLabel && (
        <span style={footerStyle}>
          {footerIcon}
          <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{footerLabel}</span>
        </span>
      )}
    </div>
  );
};
