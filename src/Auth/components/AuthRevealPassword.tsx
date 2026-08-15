import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

import { AlertTriangle } from "@icons";

// Reveal step 2 (spec): re-confirm the password even though the session is valid,
// with a shoulder-surfing warning before the words appear. Same field label as the
// import screen (§14.8), same generic error as unlock (§14.9), no attempt counter.
export const AuthRevealPassword: FC = () => {
  const { t } = useTranslation();
  const {
    password,
    setPassword,
    revealPassword,
    toggleReveal,
    revealError,
    submitRevealPassword,
    busy,
  } = useAuthFlow();

  return (
    <AuthScreen title={t("auth.reveal.password.title")} lead={t("auth.reveal.password.body")}>
      <FeedbackPanel tone="warning" icon={<AlertTriangle size={16} />}>
        {t("auth.reveal.password.warning")}
      </FeedbackPanel>

      <PasswordField
        label={t("auth.restore.file.passwordLabel")}
        hint={t("auth.restore.file.passwordHint")}
        value={password}
        onChange={setPassword}
        reveal={revealPassword}
        onToggleReveal={toggleReveal}
        error={revealError ? t("auth.unlock.error") : undefined}
        autoFocus
        autoComplete="current-password"
        onEnter={submitRevealPassword}
      />

      <Button
        variant="primary"
        style={{ alignSelf: "center" }}
        disabled={password.length === 0 || busy}
        onClick={submitRevealPassword}
      >
        {t("auth.reveal.password.button")}
      </Button>
    </AuthScreen>
  );
};
