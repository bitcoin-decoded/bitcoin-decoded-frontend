import { type CSSProperties, type FC } from "react";

import { useTranslation } from "../../../I18n";
import { BitcoinDonationFooter } from "../../../Interactive";
import { withOpacity } from "../../helpers";
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

  // Footer legibility was fixed on three axes, not just one:
  //   • Font — the body SERIF, not Cutive Mono. Thin single-weight mono at ~12px
  //     is the recurring illegibility (see the light-mode work); a reading serif
  //     is far clearer at this size.
  //   • Colour — the PRIMARY ink (not muted `text.secondary`, ~0.5α on dark).
  //     Copyright ≈ 11:1, credit ≈ 7:1 on the worse (light) ground. The earlier
  //     0.72/0.56 values sat at 5.8/3.6 — the credit failed AA outright.
  //   • Size — nudged up so the meta doesn't read as fine print.
  const copyrightStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: "0.85rem",
    color: withOpacity(colors.base.text.primary, 0.92),
    letterSpacing: "0.01em",
    margin: 0,
    whiteSpace: "nowrap",
  };

  const creditStyle: CSSProperties = {
    ...copyrightStyle,
    fontSize: "0.8rem",
    color: withOpacity(colors.base.text.primary, 0.78),
  };

  return (
    <footer style={footerStyle}>
      <div style={ruleLineStyle} aria-hidden="true" />
      <div style={innerStyle}>
        <BitcoinDonationFooter display="footer" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
          <p style={copyrightStyle}>{t("footer.copyright")}</p>
          <p style={creditStyle}>{t("footer.iconCredit")}</p>
        </div>
      </div>
    </footer>
  );
};
