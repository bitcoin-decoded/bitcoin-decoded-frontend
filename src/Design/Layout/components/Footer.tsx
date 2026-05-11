import { type FC, type CSSProperties, type MouseEvent, useState } from "react";
import { Check, Copy, Zap } from "lucide-react";

import { useTranslation } from "../../../I18n";
import type { Breakpoint } from "../../Responsive";
import { useThemeContext, THEME_COLORS } from "../../Theme";

type Props = {
  breakpoint?: Breakpoint;
};

// Placeholder BTC address - a syntactically bech32-shaped string the user
// can copy. Replace later with the real donation address. Intentionally
// not a valid checksum so wallets reject sends to it during testing.
const DONATION_ADDRESS = "bc1qph7nrgrvksm4ja6cpdrt0w35e0scqms6r0xvjy";

/**
 * Footer with two visual rows:
 *   1. Donation message + small copyable BTC address card
 *      (laid out side-by-side on desktop; stacked on tablet/mobile)
 *   2. Copyright (subtle signature line)
 *
 * Visual treatment: the footer carries a more pronounced background than
 * just a flat panel. We layer:
 *   • a vertical tonal step (`background.primary` → `background.tertiary`)
 *   • a soft Bitcoin-orange halo glowing up from the bottom-center
 * so the footer feels like a warm continuation of the chrome, with a
 * faint "sunset" thematic undertone - not a flat slab.
 */
export const Footer: FC<Props> = ({ breakpoint = "desktop" }) => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];

  const isMobile = breakpoint === "mobile";
  const isDesktop = breakpoint === "desktop";

  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API blocked (rare) - silently no-op.
    }
  };

  // ── Container ──────────────────────────────────────────────────────────
  // Two-layer background:
  //   1. Linear vertical gradient - primary at top (matches navbar) →
  //      tertiary mid → amber base color at the bottom for warm depth.
  //   2. Soft radial halo of Bitcoin orange emerging from below-center,
  //      so the footer reads as a glowing horizon rather than flat.
  // Halo opacity is tuned a touch stronger in dark (more contrast room)
  // and softer in light to avoid a dirty look on a near-white surface.
  const haloOpacity = theme === "dark" ? 0.16 : 0.08;
  const footerStyle: CSSProperties = {
    padding: isDesktop
      ? "1.75rem 2.5rem 1.5rem calc(17rem + 2.5rem)"
      : isMobile
        ? "1.5rem 1rem 1.25rem"
        : "1.75rem 2.5rem 1.5rem",
    background: `
      radial-gradient(ellipse 70% 110% at 50% 115%, rgba(247, 147, 26, ${haloOpacity}) 0%, transparent 60%),
      linear-gradient(to bottom,
        ${colors.base.background.primary} 0%,
        ${colors.base.background.tertiary} 55%,
        ${colors.amber.background.primary} 100%)
    `,
    borderTop: `1px solid ${colors.base.border.primary}`,
    color: colors.base.text.secondary,
    fontFamily: "'JetBrains Mono', monospace",
  };

  // Outer wrapper centers the content; on desktop we let it grow wider so
  // the donation row fits comfortably on a single line.
  const innerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "0.85rem" : "0.75rem",
    maxWidth: isDesktop ? "60rem" : "44rem",
    margin: "0 auto",
    textAlign: "center",
  };

  // Donation row: holds the message + the address card. Side-by-side on
  // desktop (when there's room), stacked elsewhere. `flexWrap` keeps the
  // layout safe on narrow desktops too.
  const donationRowStyle: CSSProperties = {
    display: "flex",
    flexDirection: isDesktop ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    gap: isDesktop ? "1.4rem" : "0.85rem",
    flexWrap: "wrap",
    width: "100%",
  };

  // ── Donation message ───────────────────────────────────────────────────
  // On desktop the message MUST stay on a single line so the row layout
  // (message + address card side-by-side) is consistent across languages -
  // without `whiteSpace: nowrap`, a slightly longer FR translation would
  // wrap and force the address card onto a second row, breaking the
  // visual alignment we get for free in EN. Mobile/tablet allow wrapping.
  const messageStyle: CSSProperties = {
    fontSize: isMobile ? "0.78rem" : "0.85rem",
    lineHeight: 1.5,
    color: colors.base.text.primary,
    margin: 0,
    letterSpacing: "0.01em",
    fontFamily: "Inter, sans-serif",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.45rem",
    flexWrap: isDesktop ? "nowrap" : "wrap",
    whiteSpace: isDesktop ? "nowrap" : "normal",
    flexShrink: 0,
  };

  const lightningIconStyle: CSSProperties = {
    color: "#f7931a",
    flexShrink: 0,
  };

  // ── Address card ───────────────────────────────────────────────────────
  // Subtle accent-tinted gradient + accent border, in the same family as
  // the homepage primary CTAs. The card itself isn't clickable; the copy
  // button on the right handles the action.
  const addressCardStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: isMobile ? "0.4rem 0.45rem 0.4rem 0.7rem" : "0.45rem 0.5rem 0.45rem 0.85rem",
    borderRadius: "0.6rem",
    background: "linear-gradient(135deg, rgba(247, 147, 26, 0.1), rgba(247, 147, 26, 0.03))",
    border: "1px solid rgba(247, 147, 26, 0.3)",
    maxWidth: "100%",
  };

  const addressTextStyle: CSSProperties = {
    fontSize: isMobile ? "0.68rem" : "0.78rem",
    fontFamily: "'JetBrains Mono', monospace",
    color: colors.base.text.primary,
    letterSpacing: "0.01em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  };

  const copyButtonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.3rem",
    padding: isMobile ? "0.3rem 0.5rem" : "0.35rem 0.6rem",
    fontSize: isMobile ? "0.68rem" : "0.72rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: copied ? "#10b981" : "#f7931a",
    background: "transparent",
    border: `1px solid ${copied ? "rgba(16, 185, 129, 0.45)" : "rgba(247, 147, 26, 0.4)"}`,
    borderRadius: "0.45rem",
    cursor: "pointer",
    flexShrink: 0,
    transition:
      "color 0.25s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.25s, background 0.25s",
  };

  const onCopyEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (copied) return;
    e.currentTarget.style.background = "rgba(247, 147, 26, 0.08)";
    e.currentTarget.style.borderColor = "rgba(247, 147, 26, 0.65)";
  };
  const onCopyLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.borderColor = copied
      ? "rgba(16, 185, 129, 0.45)"
      : "rgba(247, 147, 26, 0.4)";
  };

  // ── Copyright row ──────────────────────────────────────────────────────
  const copyrightStyle: CSSProperties = {
    fontSize: isMobile ? "0.62rem" : "0.68rem",
    color: colors.base.text.secondary,
    opacity: 0.65,
    letterSpacing: "0.05em",
    margin: 0,
    marginTop: "0.15rem",
  };

  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <div style={donationRowStyle}>
          <p style={messageStyle}>
            <Zap size={isMobile ? 13 : 14} strokeWidth={2.2} style={lightningIconStyle} />
            {t("footer.donateMessage")}
          </p>

          <div style={addressCardStyle}>
            <span style={addressTextStyle} title={DONATION_ADDRESS}>
              {DONATION_ADDRESS}
            </span>
            <button
              type="button"
              style={copyButtonStyle}
              onClick={onCopy}
              onMouseEnter={onCopyEnter}
              onMouseLeave={onCopyLeave}
              aria-label={copied ? t("footer.copied") : t("footer.copy")}
            >
              {copied ? (
                <>
                  <Check size={isMobile ? 12 : 13} strokeWidth={2.5} />
                  {t("footer.copied")}
                </>
              ) : (
                <>
                  <Copy size={isMobile ? 12 : 13} strokeWidth={2.2} />
                  {t("footer.copy")}
                </>
              )}
            </button>
          </div>
        </div>

        <p style={copyrightStyle}>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};
