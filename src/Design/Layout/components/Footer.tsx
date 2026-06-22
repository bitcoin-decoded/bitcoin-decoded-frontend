import { type CSSProperties, type FC } from "react";

import { useTranslation } from "../../../I18n";
import { BitcoinDonationFooter } from "../../../Interactive";
import type { Breakpoint } from "../../Responsive";
import { BRAND, getBrandGold, THEME_COLORS, useThemeContext } from "../../Theme";

type Props = {
  breakpoint?: Breakpoint;
};

/**
 * The ledger footer — mirrors the header's bottom edge. A gold hairline
 * broken by a centered carré-bloc seals the bottom of every page, the
 * "block footer" of the document considered as a chained registry. The
 * previous orange sunrise halo is gone (orange is now a reserved
 * Bitcoin-only signal). Content is intentionally minimal: the discreet
 * donation flow and the copyright line, both in mono.
 *
 * Future Phase 2c (or Phase 3) will optionally surface a live Bitcoin
 * block height here as a "the site beats with the chain" beacon.
 */
export const Footer: FC<Props> = ({ breakpoint = "desktop" }) => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const isMobile = breakpoint === "mobile";
  const isDesktop = breakpoint === "desktop";

  const footerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: colors.base.background.primary,
    color: colors.base.text.secondary,
    fontFamily: BRAND.fonts.mono,
  };

  // Top edge signature — the same rule + carré vocabulary as Header's
  // bottom edge, mirroring the document's two extremities.
  const ruleWrapperStyle: CSSProperties = {
    position: "relative",
    height: BRAND.figures.blockSize + 2,
  };
  const ruleLineStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: BRAND.figures.ruleThickness,
    background: gold,
    transform: "translateY(-50%)",
  };
  const ruleBlockStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: BRAND.figures.blockSize,
    height: BRAND.figures.blockSize,
    background: gold,
  };

  const innerStyle: CSSProperties = {
    padding: isDesktop
      ? "1.75rem 2.5rem 1.5rem calc(17rem + 2.5rem)"
      : isMobile
        ? "1.5rem 1rem 1.25rem"
        : "1.75rem 2.5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "0.85rem" : "0.9rem",
    maxWidth: "44rem",
    margin: "0 auto",
    textAlign: "center",
  };

  const copyrightStyle: CSSProperties = {
    fontSize: isMobile ? "0.62rem" : "0.68rem",
    color: colors.base.text.secondary,
    opacity: 0.65,
    letterSpacing: "0.05em",
    margin: 0,
    whiteSpace: "nowrap",
  };

  return (
    <footer style={footerStyle}>
      <div style={ruleWrapperStyle} aria-hidden="true">
        <div style={ruleLineStyle} />
        <div style={ruleBlockStyle} />
      </div>
      <div style={innerStyle}>
        <BitcoinDonationFooter display="footer" />
        <p style={copyrightStyle}>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};
