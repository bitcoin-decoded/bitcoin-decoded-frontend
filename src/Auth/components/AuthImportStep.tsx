import { type FC, useRef } from "react";

import { Button, FeedbackPanel, usePageTheme } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

import { Check } from "@icons";

// CDC §7.4 / §14.8: import a .bdw backup, on a single screen. Before a file is
// chosen the reader gets the instruction and the picker; once chosen, the picker
// gives way to a confirmation of the selected file and the password. A wrong file
// version or format gets a clear line, never a raw trace. A discreet link switches
// to entering the 12 words instead (§7.3).
export const AuthImportStep: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    importContainer,
    importFileName,
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
    <AuthScreen
      title={t("auth.restore.file.title")}
      lead={importContainer ? undefined : t("auth.restore.file.body")}
    >
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              color: colors.semantic.success.text,
              fontFamily: "inherit",
              fontSize: "0.9rem",
              wordBreak: "break-all",
            }}
          >
            <Check size={18} strokeWidth={2.5} style={{ flexShrink: 0 }} />
            <span>{importFileName}</span>
          </div>
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
            style={{ alignSelf: "center" }}
            disabled={password.length === 0 || busy}
            onClick={submitImport}
          >
            {t("auth.unlock.button")}
          </Button>
        </>
      ) : (
        <Button variant="primary" style={{ alignSelf: "center" }} onClick={() => inputRef.current?.click()}>
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
