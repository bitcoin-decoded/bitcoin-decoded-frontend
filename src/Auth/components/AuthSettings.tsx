import { type CSSProperties, type FC } from "react";

import { BRAND, Button, usePageTheme } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";
import { formatBackupDate, formatPublicKey } from "../helpers";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { User } from "@icons";

// CDC §7.11 / §14.11: the signed-in account panel. Identity at the top, then the
// three deliberate actions — export (§7.5), sign out and erase (§7.7) — each set
// off from the next so nothing destructive sits a stray click away. Dumb: every
// value and handler comes from useAuthFlow.
export const AuthSettings: FC = () => {
  const { t, language } = useTranslation();
  const { colors } = usePageTheme();
  const {
    accountUsername,
    publicKey,
    lastExportAt,
    neverExported,
    eraseConfirming,
    exportBackup,
    signOut,
    askErase,
    cancelErase,
    confirmErase,
  } = useAuthFlow();

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
    wordBreak: "break-all",
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

  const errorColor = colors.semantic.error.text;

  return (
    <AuthScreen icon={<User size={26} strokeWidth={2} />} inlineIcon title={t("auth.settings.sectionTitle")}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <p style={identityLineStyle}>
          {interpolate(t("auth.settings.username"), {
            pseudo: accountUsername ?? "",
            username: accountUsername ?? "",
          })}
        </p>
        {publicKey && (
          <p style={{ ...identityLineStyle, color: colors.base.text.secondary }}>
            {interpolate(t("auth.settings.publicKey"), { key: formatPublicKey(publicKey) })}
          </p>
        )}
      </div>

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

      <section style={sectionStyle}>
        <p style={bodyStyle}>{t("auth.settings.eraseBody")}</p>
        {eraseConfirming ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {neverExported && (
              <p style={{ ...bodyStyle, color: errorColor }}>{t("auth.settings.eraseConfirm")}</p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
              <Button variant="primary" color={errorColor} onClick={confirmErase}>
                {t("auth.settings.eraseButton")}
              </Button>
              <Button variant="ghost" onClick={cancelErase}>
                {t("auth.settings.eraseCancel")}
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={askErase} style={{ color: errorColor }}>
            {t("auth.settings.eraseButton")}
          </Button>
        )}
      </section>
    </AuthScreen>
  );
};
