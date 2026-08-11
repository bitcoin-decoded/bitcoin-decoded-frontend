import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { ShieldCheck } from "@icons";

// CDC §7.1 écran 6 / §14.6: the account is live. Downloading the backup is the
// primary action, not a discreet link. The migration notice shows only when guest
// progress was actually linked.
export const AuthSuccessStep: FC = () => {
  const { t } = useTranslation();
  const { migrated, download, close } = useAuthFlow();

  return (
    <AuthScreen
      icon={<ShieldCheck size={26} />}
      inlineIcon
      title={t("auth.success.title")}
      lead={[t("auth.success.body1"), t("auth.success.body2")]}
    >
      {migrated && <FeedbackPanel tone="success">{t("auth.success.migration")}</FeedbackPanel>}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "0.35rem" }}>
        <Button variant="primary" fullWidth onClick={download}>
          {t("auth.success.primary")}
        </Button>
        <Button variant="secondary" onClick={close}>
          {t("auth.success.secondary")}
        </Button>
      </div>
    </AuthScreen>
  );
};
