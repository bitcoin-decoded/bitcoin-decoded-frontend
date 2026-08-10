import { type FC, useRef } from "react";

import { Button, FeedbackPanel, usePageTheme } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

// CDC §7.4 / §14.8: import a .bdw backup. The pseudo is shown before the password
// is asked; a wrong file version or format gets a clear line, never a raw trace. A
// discreet link switches to entering the 12 words instead (§7.3).
export const AuthImportStep: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    importContainer,
    importError,
    selectFile,
    password,
    setPassword,
    revealPassword,
    toggleReveal,
    wrongPassword,
    submitImport,
    goToRestoreSeed,
    busy,
  } = useAuthFlow();

  return (
    <AuthScreen title={t("auth.restore.file.title")} lead={t("auth.restore.file.body")}>
      <input
        ref={inputRef}
        type="file"
        accept=".bdw"
        style={{ display: "none" }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void selectFile(file);
        }}
      />

      {importError && <FeedbackPanel tone="error">{t(importError)}</FeedbackPanel>}

      {importContainer ? (
        <>
          <p style={{ margin: 0, color: colors.base.text.primary }}>
            {interpolate(t("auth.restore.file.recognised"), { pseudo: importContainer.username })}
          </p>
          <PasswordField
            label={t("auth.password.create.field1")}
            value={password}
            onChange={setPassword}
            reveal={revealPassword}
            onToggleReveal={toggleReveal}
            error={wrongPassword ? t("auth.unlock.error") : undefined}
            autoFocus
            autoComplete="current-password"
            onEnter={submitImport}
          />
          <Button
            variant="primary"
            fullWidth
            disabled={password.length === 0 || busy}
            onClick={submitImport}
          >
            {t("auth.unlock.button")}
          </Button>
        </>
      ) : (
        <Button variant="primary" fullWidth onClick={() => inputRef.current?.click()}>
          {t("auth.restore.file.button")}
        </Button>
      )}

      <div style={{ textAlign: "center" }}>
        <Button variant="secondary" onClick={goToRestoreSeed}>
          {t("auth.restore.seed.title")}
        </Button>
      </div>
    </AuthScreen>
  );
};
