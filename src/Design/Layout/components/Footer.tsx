import { type CSSProperties, type FC, type ReactNode } from "react";

import { useTranslation } from "../../../I18n";
import { withOpacity } from "../../helpers";
import type { Breakpoint } from "../../Responsive";
import { BRAND, getBrandGold, THEME_COLORS, useThemeContext } from "../../Theme";

type Props = {
  breakpoint?: Breakpoint;
  /**
   * Whatever sits at the footer's leading edge, injected by the shell.
   *
   * Design used to import it from `Interactive` directly, which made the
   * primitives layer depend on the feature layer while the feature layer
   * depends on the primitives. That cycle left `BRAND` undefined under any
   * loader that does not bundle.
   */
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

  // Desolidarise the donation from the legal text: on a wide screen they sit on
  // opposite ends of one row (donation left, copyright/credit right) instead of
  // three stacked lines; on mobile they stack and centre. Symmetric padding (no
  // sidebar offset) so the row centres on the WHOLE page — the footer spans the
  // full width below the nav, so it should read centred against it, not against
  // the content column alone.
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
