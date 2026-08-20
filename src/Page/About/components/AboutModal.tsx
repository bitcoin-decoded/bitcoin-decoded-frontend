import { type CSSProperties, type FC, Fragment } from "react";

import {
  BRAND,
  getBrandGold,
  ModalShell,
  Separator,
  THEME_COLORS,
  useBreakpoint,
  useThemeContext,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ABOUT_BLOCKS } from "../data";
import { useAbout } from "../hooks";

import { AboutRichText } from "./AboutRichText";

import { DoodleCompositionMan } from "@doodle";

// Reuses the account modal shell and mirrors its typography (mono title, serif body)
// so the two read as the same object. Four blocks separated by the homepage three-dot
// rule; rendered plainly (no scroll reveal, which only flashed "poof" in a short modal).
export const AboutModal: FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const { isOpen, close } = useAbout();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const titleRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
  };

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.35rem" : "1.5rem",
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: 1.2,
    color: colors.base.text.primary,
    margin: 0,
  };

  const paragraphStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "0.95rem" : "1rem",
    lineHeight: 1.6,
    margin: 0,
    color: colors.base.text.primary,
  };

  const blockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  };

  return (
    <ModalShell
      open={isOpen}
      onClose={close}
      closeLabel={t("about.close")}
      ariaLabel={t("about.title")}
      closeOnEscape
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>
        <div style={titleRowStyle}>
          <span style={{ color: gold, lineHeight: 0, flexShrink: 0 }}>
            <DoodleCompositionMan size={isMobile ? 30 : 34} />
          </span>
          <h2 style={titleStyle}>{t("about.title")}</h2>
        </div>

        {ABOUT_BLOCKS.map((block, index) => (
          <Fragment key={index}>
            {index > 0 && <Separator margin="0" />}
            <div style={blockStyle}>
              {block.map((key) => (
                <p key={key} style={paragraphStyle}>
                  <AboutRichText text={t(key)} />
                </p>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </ModalShell>
  );
};
