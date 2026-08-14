import { type CSSProperties, type FC } from "react";

import { BRAND, Button, getBrandGold, usePageTheme } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";
import { formatBackupDate } from "../helpers";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { User } from "@icons";

// CDC §7.11 / §14.11: the signed-in account panel. Identity at the top, then the
// two account actions — export the spare key (§7.5) and sign out (§7.7) — set off
// from each other. Dumb: every value and handler comes from useAuthFlow.
export const AuthSettings: FC = () => {
  const { t, language } = useTranslation();
  const { colors, theme } = usePageTheme();
  const { accountUsername, lastExportAt, neverExported, exportBackup, signOut } = useAuthFlow();

  // The pseudo is the reader's identity here, so it wears the brand gold. The label
  // around it is the CDC copy verbatim; only the value is styled (the token in
  // "Connecté en tant que {pseudo}" / "Signed in as {username}" splits it in two).
  const [usernameBefore, usernameAfter = ""] = t("auth.settings.username").split(/\{pseudo\}|\{username\}/);

  const bodyStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: "0.9rem",
    lineHeight: 1.55,
    color: colors.base.text.secondary,
    margin: 0,
  };

  const identityLineStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.85rem",
    letterSpacing: "0.01em",
    color: colors.base.text.primary,
    margin: 0,
  };

  const captionStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.02em",
    color: neverExported ? colors.semantic.warning.text : colors.base.text.secondary,
    margin: 0,
  };

  const sectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    paddingTop: "1.25rem",
    borderTop: `1px solid ${colors.base.border.primary}`,
  };

  return (
    <AuthScreen icon={<User size={26} strokeWidth={2} />} inlineIcon title={t("auth.settings.sectionTitle")}>
      <p style={identityLineStyle}>
        {usernameBefore}
        <span style={{ color: getBrandGold(theme), fontWeight: 500 }}>{accountUsername}</span>
        {usernameAfter}
      </p>

      <section style={sectionStyle}>
        <p style={bodyStyle}>{t("auth.settings.exportBody")}</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.55rem" }}>
          <Button variant="primary" onClick={exportBackup}>
            {t("auth.settings.exportButton")}
          </Button>
          <p style={captionStyle}>
            {lastExportAt
              ? interpolate(t("auth.settings.lastExport"), { date: formatBackupDate(lastExportAt, language) })
              : t("auth.settings.neverExported")}
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={bodyStyle}>{t("auth.settings.signOutBody")}</p>
        <Button variant="secondary" onClick={signOut}>
          {t("auth.settings.signOutButton")}
        </Button>
      </section>
    </AuthScreen>
  );
};
