import { type CSSProperties, type FC } from "react";

import { useTranslation } from "../../../I18n";
import { BitcoinDonationFooter } from "../../../Interactive";
import type { Breakpoint } from "../../Responsive";
import { THEME_COLORS, useThemeContext } from "../../Theme";

type Props = {
  breakpoint?: Breakpoint;
};

/**
 * Footer chrome: a discreet "Support with bitcoin" button (which opens the
 * full donation flow in a modal - see `BitcoinDonationFooter`) above the
 * copyright line. The warm gradient + Bitcoin-orange halo give the footer a
 * "sunset horizon" feel rather than a flat slab.
 */
export const Footer: FC<Props> = ({ breakpoint = "desktop" }) => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];

  const isMobile = breakpoint === "mobile";
  const isDesktop = breakpoint === "desktop";

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

  const innerStyle: CSSProperties = {
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
      <div style={innerStyle}>
        <BitcoinDonationFooter display="footer" />
        <p style={copyrightStyle}>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};
