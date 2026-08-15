import { type FC } from "react";

import { Button, FeedbackPanel, usePageTheme } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { AlertTriangle } from "@icons";

// Overwrite guard (§5.1): finalising a new access while a vault already exists would
// silently replace it. The warning names the existing access and offers the safe
// exit first; overwriting anyway is the quieter, deliberate second choice.
export const AuthOverwriteWarning: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const { overwriteUsername, cancelOverwrite, confirmOverwriteCreate, busy } = useAuthFlow();

  const tokens = { pseudo: overwriteUsername ?? "", username: overwriteUsername ?? "" };

  return (
    <AuthScreen icon={<AlertTriangle size={26} />} inlineIcon title={t("auth.overwrite.title")}>
      <FeedbackPanel tone="warning">{interpolate(t("auth.overwrite.body"), tokens)}</FeedbackPanel>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "0.35rem" }}>
        <Button variant="primary" onClick={cancelOverwrite}>
          {interpolate(t("auth.overwrite.safe"), tokens)}
        </Button>
        <Button
          variant="ghost"
          disabled={busy}
          onClick={confirmOverwriteCreate}
          style={{ color: colors.semantic.error.text }}
        >
          {t("auth.overwrite.destructive")}
        </Button>
      </div>
    </AuthScreen>
  );
};
