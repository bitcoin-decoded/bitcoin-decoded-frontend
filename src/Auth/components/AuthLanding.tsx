import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { DoodleFaceMale } from "@doodle";

// CDC §7.1 écran 1 / §14.1: the reassuring entry point. No jargon, no pressure —
// create an access, or say you already have one. In private browsing (CDC v1.4 §9)
// no device access can persist, so the actions give way to a message pointing the
// reader to a normal window; reading the app as a guest is untouched.
export const AuthLanding: FC = () => {
  const { t } = useTranslation();
  const { startCreate, startRestore, storageAvailable } = useAuthFlow();

  return (
    <AuthScreen
      icon={<DoodleFaceMale size={28} />}
      inlineIcon
      title={t("auth.landing.title")}
      lead={t("auth.landing.body")}
    >
      {storageAvailable ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "0.35rem" }}>
          <Button variant="primary" onClick={startCreate}>
            {t("auth.landing.primary")}
          </Button>
          <Button variant="secondary" onClick={startRestore}>
            {t("auth.landing.secondary")}
          </Button>
        </div>
      ) : (
        <FeedbackPanel tone="warning">{t("auth.errors.storageUnavailable")}</FeedbackPanel>
      )}
    </AuthScreen>
  );
};
