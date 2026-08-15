import { type FC } from "react";

import { FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthConfirmStep } from "./AuthConfirmStep";
import { AuthImportStep } from "./AuthImportStep";
import { AuthLanding } from "./AuthLanding";
import { AuthOverlay } from "./AuthOverlay";
import { AuthOverwriteWarning } from "./AuthOverwriteWarning";
import { AuthPasswordStep } from "./AuthPasswordStep";
import { AuthRestoreSeed } from "./AuthRestoreSeed";
import { AuthRevealPassword } from "./AuthRevealPassword";
import { AuthRevealSeed } from "./AuthRevealSeed";
import { AuthSeedStep } from "./AuthSeedStep";
import { AuthSetDevicePasswordStep } from "./AuthSetDevicePasswordStep";
import { AuthSettings } from "./AuthSettings";
import { AuthSuccessStep } from "./AuthSuccessStep";
import { AuthUnlock } from "./AuthUnlock";
import { AuthUsernameStep } from "./AuthUsernameStep";

// The overlay host: picks the current screen and renders it in the modal, with the
// shared error banner (§14.12) above it. Mounted by AuthFlowProvider, above the
// data gate, so it survives the post-login reload.
export const AuthScreens: FC = () => {
  const { t } = useTranslation();
  const { screen, isOpen, canGoBack, back, close, genericErrorKey } = useAuthFlow();

  const current = () => {
    switch (screen) {
      case "landing":
        return <AuthLanding />;
      case "create.username":
        return <AuthUsernameStep />;
      case "create.seed":
        return <AuthSeedStep />;
      case "create.confirm":
        return <AuthConfirmStep />;
      case "create.password":
        return <AuthPasswordStep />;
      case "create.overwrite":
        return <AuthOverwriteWarning />;
      case "create.success":
        return <AuthSuccessStep />;
      case "unlock":
        return <AuthUnlock />;
      case "restore.seed":
        return <AuthRestoreSeed />;
      case "restore.setDevicePassword":
        return <AuthSetDevicePasswordStep />;
      case "import":
        return <AuthImportStep />;
      case "settings":
        return <AuthSettings />;
      case "reveal.password":
        return <AuthRevealPassword />;
      case "reveal.seed":
        return <AuthRevealSeed />;
      default:
        return null;
    }
  };

  return (
    <AuthOverlay open={isOpen} canGoBack={canGoBack} onBack={back} onClose={close}>
      {genericErrorKey && (
        <div style={{ marginBottom: "1.15rem" }}>
          <FeedbackPanel tone="error">{t(genericErrorKey)}</FeedbackPanel>
        </div>
      )}
      {current()}
    </AuthOverlay>
  );
};
