import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthField } from "./AuthField";
import { AuthScreen } from "./AuthScreen";

import { AlertTriangle } from "@icons";

// CDC §7.3 / §14.7: recover from the 12 words. The warning comes before the field.
// An unknown account is an offer to create with this phrase, not a dead end; a
// discreet link switches to importing a backup file instead (§7.4).
export const AuthRestoreSeed: FC = () => {
  const { t } = useTranslation();
  const {
    restoreInput,
    setRestoreInput,
    checksumError,
    submitRestoreSeed,
    unknownAccount,
    createFromRestore,
    goToImport,
    busy,
  } = useAuthFlow();

  return (
    <AuthScreen title={t("auth.restore.seed.title")}>
      <FeedbackPanel tone="warning" icon={<AlertTriangle size={16} />}>
        {t("auth.restore.seed.warning")}
      </FeedbackPanel>

      <AuthField
        label={t("auth.restore.seed.field")}
        value={restoreInput}
        onChange={setRestoreInput}
        multiline
        rows={3}
        autoComplete="off"
        error={checksumError ? t("auth.restore.seed.checksumError") : undefined}
      />

      {unknownAccount && (
        <FeedbackPanel tone="info">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span>{t("auth.restore.seed.unknownAccount")}</span>
            <Button variant="primary" onClick={createFromRestore}>
              {t("auth.landing.primary")}
            </Button>
          </div>
        </FeedbackPanel>
      )}

      <Button
        variant="primary"
        fullWidth
        disabled={restoreInput.trim().length === 0 || busy}
        onClick={submitRestoreSeed}
      >
        {t("auth.restore.seed.button")}
      </Button>

      <div style={{ textAlign: "center" }}>
        <Button variant="secondary" onClick={goToImport}>
          {t("auth.restore.file.title")}
        </Button>
      </div>
    </AuthScreen>
  );
};
