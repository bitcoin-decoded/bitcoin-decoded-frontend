import { type FC } from "react";

import { BRAND, Button, FeedbackPanel, usePageTheme } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { SeedWordsGrid } from "./SeedWordsGrid";

import { AlertTriangle, Copy } from "@icons";

// CDC §7.1 écran 3 / §14.3: show the 12 words, warn how to keep them, and lock the
// next step behind an explicit acknowledgement. A failed confirmation (écran 4)
// comes back here with the notice, the checkbox reset.
export const AuthSeedStep: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const { mnemonic, copySeed, seedAcknowledged, setSeedAcknowledged, goToConfirm, confirmError } =
    useAuthFlow();

  const words = mnemonic ? mnemonic.split(" ") : [];

  return (
    <AuthScreen title={t("auth.seed.display.title")} lead={t("auth.seed.display.body")}>
      {confirmError && <FeedbackPanel tone="error">{t("auth.seed.confirm.error")}</FeedbackPanel>}

      <SeedWordsGrid words={words} />

      <div>
        <Button variant="ghost" size="sm" icon={<Copy size={15} />} onClick={copySeed}>
          {t("auth.seed.display.copy")}
        </Button>
      </div>

      <FeedbackPanel tone="warning" icon={<AlertTriangle size={16} />}>
        {t("auth.seed.display.warning")}
      </FeedbackPanel>

      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={seedAcknowledged}
          onChange={(event) => setSeedAcknowledged(event.target.checked)}
          style={{ marginTop: "0.15rem", accentColor: colors.semantic.success.text, width: "1rem", height: "1rem" }}
        />
        <span style={{ fontFamily: BRAND.fonts.body, fontSize: "0.9rem", color: colors.base.text.primary }}>
          {t("auth.seed.display.checkbox")}
        </span>
      </label>

      <Button
        variant="primary"
        style={{ alignSelf: "center" }}
        disabled={!seedAcknowledged}
        onClick={goToConfirm}
      >
        {t("auth.seed.display.button")}
      </Button>
    </AuthScreen>
  );
};
