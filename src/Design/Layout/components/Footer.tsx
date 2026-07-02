import { type CSSProperties, type FC } from "react";

import { useTranslation } from "../../../I18n";
import { BitcoinDonationFooter } from "../../../Interactive";
import type { Breakpoint } from "../../Responsive";
import { BRAND, getBrandGold, THEME_COLORS, useThemeContext } from "../../Theme";

type Props = {
  breakpoint?: Breakpoint;
};

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

  const ruleLineStyle: CSSProperties = {
    height: BRAND.figures.ruleThickness,
    background: gold,
    width: "100%",
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
      <div style={ruleLineStyle} aria-hidden="true" />
      <div style={innerStyle}>
        <BitcoinDonationFooter display="footer" />
        <p style={copyrightStyle}>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};
