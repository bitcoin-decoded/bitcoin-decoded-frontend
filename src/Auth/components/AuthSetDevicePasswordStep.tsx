import { type FC } from "react";

import { Button } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

// CDC v1.2 §7.3 / §14.5b: after a valid phrase, the reader SETS a new local
// password (never the old one). Dedicated copy (auth.password.restore.*) says so
// frontally; the fields, hint and error reuse the create-password strings and the
// button reuses the restore action. Two fields, matching the create flow.
export const AuthSetDevicePasswordStep: FC = () => {
  const { t } = useTranslation();
  const {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    revealPassword,
    toggleReveal,
    passwordMismatch,
    canSubmitCreate,
    submitSetDevicePassword,
    busy,
  } = useAuthFlow();

  return (
    <AuthScreen
      title={t("auth.password.restore.title")}
      lead={[t("auth.password.restore.body1"), t("auth.password.restore.body2")]}
    >
      <PasswordField
        label={t("auth.password.create.field1")}
        value={password}
        onChange={setPassword}
        reveal={revealPassword}
        onToggleReveal={toggleReveal}
        hint={t("auth.password.create.hint")}
        autoFocus
        autoComplete="new-password"
      />
      <PasswordField
        label={t("auth.password.create.field2")}
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        reveal={revealPassword}
        onToggleReveal={toggleReveal}
        error={passwordMismatch ? t("auth.password.create.mismatch") : undefined}
        autoComplete="new-password"
        onEnter={submitSetDevicePassword}
      />
      <Button
        variant="primary"
        style={{ alignSelf: "center" }}
        disabled={!canSubmitCreate || busy}
        onClick={submitSetDevicePassword}
      >
        {t("auth.restore.seed.button")}
      </Button>
    </AuthScreen>
  );
};
