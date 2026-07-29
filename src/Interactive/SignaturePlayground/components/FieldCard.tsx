import { type CSSProperties, type FC, type ReactNode } from "react";

import { getTypography } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { truncateHash } from "../../helpers";
import type { FieldTone, SigPlaygroundColors, ValueKind } from "../types";

type Props = {
  elementLabel: string;
  number: number;
  icon: ReactNode;
  label: string;
  value: string;
  valuePrefix?: string;
  tone: FieldTone;
  valueKind: ValueKind;
  truncate?: boolean;
  valueColor?: string;
  pending?: boolean;
  action?: ReactNode;
  badge?: ReactNode;
  footerIcon?: ReactNode;
  footerLabel?: string;
  bottomSlot?: ReactNode;
  readOnlyLabel: string;
  colors: SigPlaygroundColors;
};

export const FieldCard: FC<Props> = ({
  elementLabel,
  number,
  icon,
  label,
  value,
  valuePrefix,
  tone,
  valueKind,
  truncate,
  valueColor,
  pending = false,
  action,
  badge,
  footerIcon,
  footerLabel,
  bottomSlot,
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

  const containerStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.95rem 1rem",
    background: withOpacity(accent, pending ? 0.03 : 0.06),
    minWidth: 0,
    boxSizing: "border-box",
    flex: 1,
    textAlign: "center",
    opacity: pending ? 0.75 : 1,
    transition: "opacity 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth)",
  };

  // ledger corner brackets in the element's accent (no continuous border)
  const cornerBase: CSSProperties = {
    position: "absolute",
    width: "0.7rem",
    height: "0.7rem",
    pointerEvents: "none",
  };
  const cornerStroke = `1.5px solid ${withOpacity(accent, pending ? 0.4 : 0.6)}`;
  const corners = (
    <>
      <span style={{ ...cornerBase, top: 0, left: 0, borderTop: cornerStroke, borderLeft: cornerStroke }} />
      <span style={{ ...cornerBase, top: 0, right: 0, borderTop: cornerStroke, borderRight: cornerStroke }} />
      <span style={{ ...cornerBase, bottom: 0, left: 0, borderBottom: cornerStroke, borderLeft: cornerStroke }} />
      <span style={{ ...cornerBase, bottom: 0, right: 0, borderBottom: cornerStroke, borderRight: cornerStroke }} />
    </>
  );

  const elementHeader: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(colors.baseTextSecondary, 0.7),
  };

  const labelRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    color: accent,
    minWidth: 0,
  };

  const labelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.04em",
    overflowWrap: "break-word",
    minWidth: 0,
  };

  const valuePrefixStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: withOpacity(colors.baseTextSecondary, 0.7),
  };

  const valueStyle: CSSProperties = {
    ...typo.micro,
    width: "100%",
    padding: "0.5rem 0.65rem",
    color: pending ? withOpacity(colors.baseTextSecondary, 0.6) : (valueColor ?? colors.basePrimaryText),
    wordBreak: valueKind === "hex" ? "break-all" : "normal",
    overflowWrap: valueKind === "hex" ? "anywhere" : "break-word",
    border: `1px ${pending ? "dashed" : "solid"} ${withOpacity(colors.baseBorderSecondary, 0.16)}`,
    background: pending ? "transparent" : withOpacity(colors.baseBackgroundSecondary, 0.04),
    boxSizing: "border-box",
    transition: "color 0.3s var(--ease-smooth)",
  };

  const footerStyle: CSSProperties = {
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    color: withOpacity(colors.baseTextSecondary, 0.85),
  };

  return (
    <div style={containerStyle}>
      {corners}
      <span style={elementHeader}>
        {elementLabel} {number}
      </span>

      <span style={labelRow}>
        {icon}
        <span style={labelStyle}>{label}</span>
      </span>

      {!pending && valuePrefix && <span style={valuePrefixStyle}>{valuePrefix}</span>}

      <div style={valueStyle} aria-label={readOnlyLabel} title={truncate && !pending ? value : undefined}>
        {pending ? "· · ·" : truncate ? truncateHash(value) : value}
      </div>

      {action}

      {badge}

      {footerLabel && (
        <span style={footerStyle}>
          {footerIcon}
          <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{footerLabel}</span>
        </span>
      )}

      {bottomSlot}
    </div>
  );
};
