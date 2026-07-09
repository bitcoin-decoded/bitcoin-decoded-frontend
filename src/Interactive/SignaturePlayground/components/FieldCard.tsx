import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getTypography } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { truncateHash } from "../../helpers";
import type { FieldTone, SigPlaygroundColors, ValueKind } from "../types";

type Props = {
  icon: ReactNode;
  label: string;
  /** Optional step number rendered as a small badge before the icon (1, 2, 3). */
  number?: number;
  /** Optional block rendered at the very top of the card, above the label (e.g. the message to sign). */
  header?: ReactNode;
  value: string;
  hint?: string;
  /** Small caption rendered just above the value (e.g. "Clé publique générée :"). */
  valuePrefix?: string;
  tone: FieldTone;
  valueKind: ValueKind;
  /** Truncate the read-only value (long hex) to first8…last6 so it stays on one line. */
  truncate?: boolean;
  /** Overrides the value text color (e.g. green when keys match, red when they don't). */
  valueColor?: string;
  badge?: ReactNode;
  /** Optional action rendered just below the value (e.g. the "modify key" button). */
  action?: ReactNode;
  /** Optional footer line (e.g. "Connue uniquement de Nicolas"). */
  footerIcon?: ReactNode;
  footerLabel?: string;
  /** Accessibility label for the read-only value. */
  readOnlyLabel: string;
  colors: SigPlaygroundColors;
};

/**
 * One labelled, read-only field - used for the private key, public key and
 * signature. Long hex values are truncated to first8…last6 so they stay on a
 * single line; the value text can be tinted (green/red) to signal a match.
 */
export const FieldCard: FC<Props> = ({
  icon,
  label,
  number,
  header,
  value,
  hint,
  valuePrefix,
  tone,
  valueKind,
  truncate,
  valueColor,
  badge,
  action,
  footerIcon,
  footerLabel,
  readOnlyLabel,
  colors,
}) => {
  const typo = getTypography();
  const accent =
    tone === "secret"
      ? colors.secretColor
      : tone === "public"
        ? colors.publicColor
        : tone === "signature"
          ? colors.signatureColor
          : colors.neutralColor;
  const accentOpacityBorder = tone === "neutral" ? 0.18 : tone === "secret" ? 0.3 : 0.28;
  const accentOpacityBg = tone === "neutral" ? 0.03 : tone === "secret" ? 0.06 : 0.05;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.55rem",
    padding: "0.85rem 0.9rem",
    borderRadius: 0,
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
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.04em",
    color: accent,
    minWidth: 0,
  };

  // Step-number badge stays a circle — it is a count marker (block-vs-coin rule).
  const numberBadgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "1.05rem",
    height: "1.05rem",
    borderRadius: "50%",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: accent,
    background: withOpacity(accent, 0.14),
    border: `1px solid ${withOpacity(accent, 0.4)}`,
  };

  const readOnlyValueStyle: CSSProperties = {
    width: "100%",
    padding: "0.5rem 0.65rem",
    borderRadius: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    color: valueColor ?? colors.basePrimaryText,
    textAlign: "center",
    wordBreak: valueKind === "hex" ? "break-all" : "normal",
    overflowWrap: valueKind === "hex" ? "anywhere" : "break-word",
    border: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.16)}`,
    background: withOpacity(colors.baseBackgroundSecondary, 0.04),
    boxSizing: "border-box",
    cursor: "default",
    transition: "color 0.3s var(--ease-smooth)",
  };

  const hintStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    lineHeight: 1.5,
    color: withOpacity(colors.baseTextSecondary, 0.8),
    margin: 0,
    fontStyle: "italic",
  };

  const valuePrefixStyle: CSSProperties = {
    display: "block",
    textAlign: "center",
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: withOpacity(colors.baseTextSecondary, 0.7),
  };

  const footerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: typo.micro.fontSize,
    color: withOpacity(colors.baseTextSecondary, 0.85),
    fontWeight: 500,
    marginTop: "0.1rem",
  };

  return (
    <div style={containerStyle}>
      {header}

      <div style={labelStyle}>
        {number !== undefined && <span style={numberBadgeStyle}>{number}</span>}
        {icon}
        <span style={{ minWidth: 0, overflowWrap: "break-word" }}>{label}</span>
      </div>

      {hint && <p style={hintStyle}>{hint}</p>}

      {valuePrefix && <span style={valuePrefixStyle}>{valuePrefix}</span>}

      <div
        style={readOnlyValueStyle}
        aria-label={readOnlyLabel}
        title={truncate ? value : undefined}
      >
        {truncate ? truncateHash(value) : value}
      </div>

      {action}

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
