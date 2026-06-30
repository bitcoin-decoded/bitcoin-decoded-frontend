import { type CSSProperties, type FC } from "react";

import { BRAND } from "../../../Design";
import { withOpacity } from "../../../Design/";
import { truncateHash } from "../../helpers";
import type { SigPlaygroundColors } from "../types";

import { CheckCircle, XCircle } from "@icons";

type Props = {
  message: string;
  messageLabel: string;
  publicKey: string;
  publicKeyLabel: string;
  signature: string;
  signatureLabel: string;
  matches: boolean;
  verifyFnLabel: string;
  verifyMoreInfoLabel: string;
  verifyMoreInfoUrl: string;
  matchLabel: string;
  noMatchLabel: string;
  colors: SigPlaygroundColors;
};

/**
 * The three inputs the network feeds to verify(message, signature, public key),
 * shown side by side on a single line (each in its element color), followed by
 * the verdict. Truncated hashes keep the public key / signature on one line; the
 * message arrives already quoted by the caller (locale-aware).
 */
export const MatchVisualizer: FC<Props> = ({
  message,
  messageLabel,
  publicKey,
  publicKeyLabel,
  signature,
  signatureLabel,
  matches,
  verifyFnLabel,
  verifyMoreInfoLabel,
  verifyMoreInfoUrl,
  matchLabel,
  noMatchLabel,
  colors,
}) => {
  const verdictColor = matches ? colors.successColor : colors.errorColor;

  const boxStyle = (accent: string): CSSProperties => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    padding: "0.5rem 0.55rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    background: withOpacity(accent, 0.05),
    boxSizing: "border-box",
  });

  const boxLabel = (accent: string): CSSProperties => ({
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: accent,
  });

  const monoValue: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    color: colors.basePrimaryText,
    wordBreak: "break-all",
  };

  const messageValue: CSSProperties = {
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontStyle: "italic",
    lineHeight: 1.4,
    color: colors.basePrimaryText,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
        padding: "0.7rem",
        borderRadius: 0,
        border: `1px dashed ${withOpacity(verdictColor, 0.3)}`,
        background: withOpacity(verdictColor, 0.03),
      }}
    >
      {/* verify() notation + hyperlink for the curious */}
      <div
        style={{
          fontFamily: BRAND.fonts.mono,
          fontSize: BRAND.fontSize.note,
          color: withOpacity(colors.baseTextSecondary, 0.7),
          letterSpacing: "0.02em",
          textAlign: "center",
        }}
      >
        ƒ {verifyFnLabel}
        {" - "}
        <a
          href={verifyMoreInfoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: withOpacity(colors.basePrimaryText, 0.85),
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            fontStyle: "italic",
          }}
        >
          {verifyMoreInfoLabel}
        </a>
      </div>

      {/* The three inputs, side by side on one line */}
      <div style={{ display: "flex", flexDirection: "row", gap: "0.4rem", alignItems: "stretch" }}>
        <div style={boxStyle(colors.neutralColor)}>
          <span style={boxLabel(withOpacity(colors.baseTextSecondary, 0.85))}>{messageLabel}</span>
          <span style={messageValue}>{message}</span>
        </div>
        <div style={boxStyle(colors.publicColor)}>
          <span style={boxLabel(colors.publicColor)}>{publicKeyLabel}</span>
          <span style={monoValue}>{truncateHash(publicKey)}</span>
        </div>
        <div style={boxStyle(colors.signatureColor)}>
          <span style={boxLabel(colors.signatureColor)}>{signatureLabel}</span>
          <span style={monoValue}>{truncateHash(signature)}</span>
        </div>
      </div>

      {/* Verdict */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          color: verdictColor,
          fontWeight: 500,
          fontSize: BRAND.fontSize.note,
          fontVariant: "small-caps",
          letterSpacing: "0.06em",
        }}
      >
        {matches ? (
          <CheckCircle size={14} strokeWidth={2.5} />
        ) : (
          <XCircle size={14} strokeWidth={2.5} />
        )}
        {matches ? matchLabel : noMatchLabel}
      </div>
    </div>
  );
};
