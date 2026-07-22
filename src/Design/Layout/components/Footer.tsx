import { type CSSProperties, type FC, type ReactNode } from "react";

import { useTranslation } from "../../../I18n";
import { withOpacity } from "../../helpers";
import type { Breakpoint } from "../../Responsive";
import { BRAND, getBrandGold, THEME_COLORS, useThemeContext } from "../../Theme";

type Props = {
  breakpoint?: Breakpoint;
  aside?: ReactNode;
};

export const Footer: FC<Props> = ({ breakpoint = "desktop", aside }) => {
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const isMobile = breakpoint === "mobile";

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
    padding: isMobile ? "1.5rem 1rem 1.25rem" : "1.5rem 2.5rem 1.35rem",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: isMobile ? "center" : "space-between",
    gap: isMobile ? "0.85rem" : "1.5rem",
    maxWidth: isMobile ? "44rem" : "56rem",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
    textAlign: isMobile ? "center" : "left",
  };

  const legalBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: isMobile ? "center" : "flex-end",
    gap: "0.2rem",
    flexShrink: 0,
  };

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
    fontSize: "0.7rem",
    color: withOpacity(colors.base.text.primary, 0.78),
  };

  return (
    <footer style={footerStyle}>
      <div style={ruleLineStyle} aria-hidden="true" />
      <div style={innerStyle}>
        {aside}
        <div style={legalBlockStyle}>
          <p style={copyrightStyle}>{t("footer.copyright")}</p>
          <p style={creditStyle}>{t("footer.iconCredit")}</p>
        </div>
      </div>
    </footer>
  );
};
