import { type FC } from "react";

import { Button } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

// CDC §7.3: after a valid phrase, set a new device password and rewrite the vault.
// The CDC has no dedicated copy for this step, so it composes the create-password
// text (§14.5) with the restore action label (§14.7) — flagged for review. One
// field only, matching "un nouveau mot de passe" (singular) in §7.3.
export const AuthRestorePassword: FC = () => {
  const { t } = useTranslation();
  const { password, setPassword, revealPassword, toggleReveal, submitRestorePassword, busy } =
    useAuthFlow();

  return (
    <AuthScreen
      title={t("auth.password.create.title")}
      lead={[t("auth.password.create.body1"), t("auth.password.create.body2")]}
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
        onEnter={submitRestorePassword}
      />
      <Button
        variant="primary"
        fullWidth
        disabled={password.length < 8 || busy}
        onClick={submitRestorePassword}
      >
        {t("auth.restore.seed.button")}
      </Button>
    </AuthScreen>
  );
};
