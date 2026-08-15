import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { SeedWordsGrid } from "./SeedWordsGrid";

import { AlertTriangle, Copy } from "@icons";

// Reveal step 3 (spec): the 12 words in the same numbered grid + warning as creation
// (§14.3). Showing them is NOT an export (it never touches meta.backup). "Hide"
// wipes the phrase; the store also wipes it on tab-away, idle timeout and close.
export const AuthRevealSeed: FC = () => {
  const { t } = useTranslation();
  const { revealedMnemonic, copyRevealed, hideReveal } = useAuthFlow();

  const words = revealedMnemonic ? revealedMnemonic.split(" ") : [];

  return (
    <AuthScreen title={t("auth.reveal.display.title")}>
      <SeedWordsGrid words={words} />

      <div>
        <Button variant="ghost" size="sm" icon={<Copy size={15} />} onClick={copyRevealed}>
          {t("auth.seed.display.copy")}
        </Button>
      </div>

      <FeedbackPanel tone="warning" icon={<AlertTriangle size={16} />}>
        {t("auth.seed.display.warning")}
      </FeedbackPanel>

      <Button variant="primary" style={{ alignSelf: "center" }} onClick={hideReveal}>
        {t("auth.reveal.display.hide")}
      </Button>
    </AuthScreen>
  );
};
