import { type FC } from "react";

import { Button } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { DoodleFaceMale } from "@doodle";

// CDC §7.1 écran 1 / §14.1: the reassuring entry point. No jargon, no pressure —
// create an access, or say you already have one.
export const AuthLanding: FC = () => {
  const { t } = useTranslation();
  const { startCreate, startRestore } = useAuthFlow();

  return (
    <AuthScreen icon={<DoodleFaceMale size={32} />} title={t("auth.landing.title")} lead={t("auth.landing.body")}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "0.35rem" }}>
        <Button variant="primary" fullWidth onClick={startCreate}>
          {t("auth.landing.primary")}
        </Button>
        <Button variant="secondary" onClick={startRestore}>
          {t("auth.landing.secondary")}
        </Button>
      </div>
    </AuthScreen>
  );
};
