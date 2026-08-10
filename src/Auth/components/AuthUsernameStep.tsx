import { type FC } from "react";

import { BRAND, Button, usePageTheme } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthField } from "./AuthField";
import { AuthScreen } from "./AuthScreen";

import { Check } from "@icons";

// CDC §7.1 écran 2 / §14.2: pick a pseudo, checked live against the server.
export const AuthUsernameStep: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const { username, setUsername, usernameStatus, submitUsername } = useAuthFlow();

  const isAvailable = usernameStatus === "available";
  const error =
    usernameStatus === "taken"
      ? t("auth.username.taken")
      : usernameStatus === "invalid"
        ? t("auth.username.invalid")
        : undefined;

  const status =
    usernameStatus === "checking" ? (
      <span style={{ fontFamily: BRAND.fonts.mono, color: colors.base.text.secondary }}>…</span>
    ) : isAvailable ? (
      <Check size={18} style={{ color: colors.semantic.success.text }} />
    ) : null;

  return (
    <AuthScreen title={t("auth.username.title")} lead={t("auth.username.body")}>
      <AuthField
        value={username}
        onChange={setUsername}
        autoFocus
        autoComplete="off"
        hint={isAvailable ? undefined : t("auth.username.hint")}
        error={error}
        status={status}
        onEnter={submitUsername}
      />
      {isAvailable && (
        <p style={{ margin: 0, fontSize: "0.8rem", color: colors.semantic.success.text }}>
          {t("auth.username.available")}
        </p>
      )}
      <Button variant="primary" fullWidth disabled={!isAvailable} onClick={submitUsername}>
        {t("auth.username.button")}
      </Button>
    </AuthScreen>
  );
};
