import { type CSSProperties, type FC, type ReactNode } from "react";

import { getTypography } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { truncateHash } from "../../helpers";
import type { FieldTone, SigPlaygroundColors, ValueKind } from "../types";

type Props = {
  icon: ReactNode;
  label: string;
  number?: number;
  header?: ReactNode;
  value: string;
  hint?: string;
  valuePrefix?: string;
  tone: FieldTone;
  valueKind: ValueKind;
  truncate?: boolean;
  valueColor?: string;
  badge?: ReactNode;
  action?: ReactNode;
  footerIcon?: ReactNode;
  footerLabel?: string;
  readOnlyLabel: string;
  colors: SigPlaygroundColors;
};

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
    border: `1px solid ${withOpacity(accent, accentOpacityBorder)}`,
    background: withOpacity(accent, accentOpacityBg),
    minWidth: 0,
    boxSizing: "border-box",
    flex: 1,
  };

  const labelStyle: CSSProperties = {
    ...typo.micro,
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontVariant: "small-caps",
    letterSpacing: "0.04em",
    color: accent,
    minWidth: 0,
  };

  const numberBadgeStyle: CSSProperties = {
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "1.15rem",
    height: "1.15rem",
    color: accent,
    background: withOpacity(accent, 0.14),
    border: `1px solid ${withOpacity(accent, 0.4)}`,
  };

  const readOnlyValueStyle: CSSProperties = {
    ...typo.micro,
    width: "100%",
    padding: "0.5rem 0.65rem",
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
    ...typo.note,
    lineHeight: 1.5,
    color: withOpacity(colors.baseTextSecondary, 0.8),
    margin: 0,
    fontStyle: "italic",
  };

  const valuePrefixStyle: CSSProperties = {
    ...typo.micro,
    display: "block",
    textAlign: "center",
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: withOpacity(colors.baseTextSecondary, 0.7),
  };

  const footerStyle: CSSProperties = {
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    color: withOpacity(colors.baseTextSecondary, 0.85),
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
