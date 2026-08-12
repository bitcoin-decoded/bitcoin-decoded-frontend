import { type FC } from "react";

import { Button } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

// CDC §7.2 / §14.9: a locked device is greeted by name and asked only for the
// device password. A wrong one says so plainly — no counter, no lockout.
export const AuthUnlock: FC = () => {
  const { t } = useTranslation();
  const {
    unlockUsername,
    password,
    setPassword,
    revealPassword,
    toggleReveal,
    wrongPassword,
    submitUnlock,
    forgotPassword,
    busy,
  } = useAuthFlow();

  return (
    <AuthScreen
      title={interpolate(t("auth.unlock.title"), {
        pseudo: unlockUsername ?? "",
        username: unlockUsername ?? "",
      })}
      lead={t("auth.unlock.body")}
    >
      <PasswordField
        label={t("auth.password.create.field1")}
        value={password}
        onChange={setPassword}
        reveal={revealPassword}
        onToggleReveal={toggleReveal}
        error={wrongPassword ? t("auth.unlock.error") : undefined}
        autoFocus
        autoComplete="current-password"
        onEnter={submitUnlock}
      />
      <Button variant="primary" fullWidth disabled={password.length === 0 || busy} onClick={submitUnlock}>
        {t("auth.unlock.button")}
      </Button>
      <div style={{ textAlign: "center" }}>
        <Button variant="secondary" onClick={forgotPassword}>
          {t("auth.unlock.link")}
        </Button>
      </div>
    </AuthScreen>
  );
};
