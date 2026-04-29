import { type CSSProperties, type FC } from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { withOpacity } from "../../../Design/helpers";
import { truncateHash } from "../../helpers";
import type { SigPlaygroundColors } from "../../types";

type Props = {
  publicKey: string;
  signature: string;
  matches: boolean;
  publicKeyLabel: string;
  signatureLabel: string;
  verifyFnLabel: string;
  verifyMoreInfoLabel: string;
  verifyMoreInfoUrl: string;
  matchLabel: string;
  noMatchLabel: string;
  isMobile: boolean;
  colors: SigPlaygroundColors;
};

/**
 * Visual representation of the verify(message, signature, pubkey) function:
 * shows the public key and the signature side-by-side (or stacked on mobile),
 * with a connector that displays a check or cross icon plus a match label.
 */
export const MatchVisualizer: FC<Props> = ({
  publicKey,
  signature,
  matches,
  publicKeyLabel,
  signatureLabel,
  verifyFnLabel,
  verifyMoreInfoLabel,
  verifyMoreInfoUrl,
  matchLabel,
  noMatchLabel,
  isMobile,
  colors,
}) => {
  const verdictColor = matches ? colors.successColor : colors.errorColor;

  const sideStyle = (accent: string): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    padding: "0.45rem 0.55rem",
    borderRadius: "0.5rem",
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    background: withOpacity(colors.baseBackgroundSecondary, 0.05),
    minWidth: 0,
    flex: isMobile ? "0 0 auto" : 1,
    width: isMobile ? "100%" : "auto",
    boxSizing: "border-box",
  });

  const sideLabelStyle = (accent: string): CSSProperties => ({
    fontSize: "0.5rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: accent,
  });

  const sideValueStyle: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.62rem" : "0.66rem",
    fontWeight: 600,
    color: colors.basePrimaryText,
    wordBreak: "break-all",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        padding: "0.6rem 0.65rem",
        borderRadius: "0.6rem",
        border: `1px dashed ${withOpacity(verdictColor, 0.25)}`,
        background: withOpacity(verdictColor, 0.025),
      }}
    >
      {/* verify() function notation + hyperlink for the curious */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          color: withOpacity(colors.baseTextSecondary, 0.7),
          letterSpacing: "0.02em",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        ƒ {verifyFnLabel}
        {" — "}
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

      {/* Two halves (public key | connector | signature) */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
          gap: "0.5rem",
          minWidth: 0,
        }}
      >
        <div style={sideStyle(colors.worldBorderSecondary)}>
          <span style={sideLabelStyle(colors.worldBorderSecondary)}>{publicKeyLabel}</span>
          <span style={sideValueStyle}>{truncateHash(publicKey)}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            flexShrink: 0,
            color: verdictColor,
            width: isMobile ? "100%" : "auto",
          }}
        >
          {isMobile ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", width: "100%" }}>
                <hr
                  style={{
                    flex: 1,
                    height: "1.5px",
                    background: withOpacity(verdictColor, 0.4),
                    border: "none",
                    margin: 0,
                  }}
                />
                {matches ? (
                  <CheckCircle size={16} strokeWidth={2.5} />
                ) : (
                  <XCircle size={16} strokeWidth={2.5} />
                )}
                <hr
                  style={{
                    flex: 1,
                    height: "1.5px",
                    background: withOpacity(verdictColor, 0.4),
                    border: "none",
                    margin: 0,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: verdictColor,
                }}
              >
                {matches ? matchLabel : noMatchLabel}
              </span>
            </>
          ) : (
            <>
              <hr
                style={{
                  width: "1.5px",
                  height: "0.6rem",
                  background: withOpacity(verdictColor, 0.4),
                  border: "none",
                  margin: 0,
                }}
              />
              {matches ? (
                <CheckCircle size={16} strokeWidth={2.5} />
              ) : (
                <XCircle size={16} strokeWidth={2.5} />
              )}
              <span
                style={{
                  fontSize: "0.5rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {matches ? matchLabel : noMatchLabel}
              </span>
              <hr
                style={{
                  width: "1.5px",
                  height: "0.6rem",
                  background: withOpacity(verdictColor, 0.4),
                  border: "none",
                  margin: 0,
                }}
              />
            </>
          )}
        </div>

        <div style={sideStyle(verdictColor)}>
          <span style={sideLabelStyle(verdictColor)}>{signatureLabel}</span>
          <span style={sideValueStyle}>{truncateHash(signature)}</span>
        </div>
      </div>
    </div>
  );
};
