import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { SeedWordsInput } from "./SeedWordsInput";

import { AlertTriangle } from "@icons";

// CDC §7.3 / §14.7: recover from the 12 words, one numbered field each. The warning
// comes before the fields. An unknown account is an offer to create with this
// phrase, not a dead end; a discreet link switches to importing a backup file (§7.4).
export const AuthRestoreSeed: FC = () => {
  const { t } = useTranslation();
  const {
    restoreWords,
    setRestoreWord,
    restoreComplete,
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

      <SeedWordsInput words={restoreWords} onWordChange={setRestoreWord} onComplete={submitRestoreSeed} />

      {checksumError && <FeedbackPanel tone="error">{t("auth.restore.seed.checksumError")}</FeedbackPanel>}

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
        style={{ alignSelf: "center" }}
        disabled={!restoreComplete || busy}
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
