import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getBrandGold, THEME_COLORS, useBreakpoint, useThemeContext, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

import { LedgerCorners } from "./LedgerCorners";

import { DoodleBitcoinCode, DoodleBookPages, DoodleShield } from "@doodle";

type Props = {
  onLearnMore: () => void;
};

export const HomeDifference: FC<Props> = ({ onLearnMore }) => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const sectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const listStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "1rem" : "1.15rem",
    width: "100%",
    maxWidth: "40rem",
  };

  const proofRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.9rem",
    textAlign: "left",
  };

  const proofIconStyle: CSSProperties = { color: gold, flexShrink: 0, display: "flex" };

  const proofTextStyle: CSSProperties = {
    fontSize: isMobile ? "0.98rem" : "1.05rem",
    lineHeight: 1.5,
    color: colors.base.text.primary,
    margin: 0,
  };

  const privacyPanelStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    padding: isMobile ? "1.4rem 1.35rem" : "1.6rem 1.75rem",
    background: withOpacity(gold, 0.05),
    textAlign: "left",
    marginTop: "0.35rem",
  };

  const privacyHeadStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
  };

  const privacyTitleStyle: CSSProperties = {
    fontSize: isMobile ? "1.1rem" : "1.2rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    margin: 0,
    color: colors.base.text.primary,
  };

  const privacyBodyStyle: CSSProperties = {
    fontSize: isMobile ? "0.95rem" : "1rem",
    lineHeight: 1.6,
    color: colors.base.text.secondary,
    margin: 0,
  };

  const linkStyle: CSSProperties = {
    alignSelf: "flex-start",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8rem",
    letterSpacing: "0.04em",
    color: gold,
    textDecoration: "underline",
    textUnderlineOffset: "0.2em",
  };

  const proof = (icon: ReactNode, text: string): ReactNode => (
    <div style={proofRowStyle}>
      <span style={proofIconStyle}>{icon}</span>
      <p style={proofTextStyle}>{text}</p>
    </div>
  );

  const iconSize = isMobile ? 26 : 30;

  return (
    <section style={sectionStyle}>
      <div style={listStyle}>
        {proof(<DoodleBitcoinCode size={iconSize} />, t("home.difference.openSource"))}
        {proof(<DoodleBookPages size={iconSize} />, t("home.difference.sources"))}

        <div style={privacyPanelStyle}>
          <LedgerCorners color={withOpacity(gold, 0.5)} />
          <div style={privacyHeadStyle}>
            <span style={{ color: gold, flexShrink: 0, display: "flex" }}>
              <DoodleShield size={isMobile ? 28 : 32} />
            </span>
            <h3 style={privacyTitleStyle}>{t("home.difference.privacyTitle")}</h3>
          </div>
          <p style={privacyBodyStyle}>{t("home.difference.privacyBody")}</p>
          <button type="button" style={linkStyle} onClick={onLearnMore}>
            {t("home.difference.privacyLink")}
          </button>
        </div>
      </div>
    </section>
  );
};
