import { type FC } from "react";

import { Button } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthField } from "./AuthField";
import { AuthScreen } from "./AuthScreen";

// CDC §7.1 écran 4 / §14.4: retype three of the words. The only pedagogical lock —
// no skip. A wrong answer sends the reader back to the list without saying which.
export const AuthConfirmStep: FC = () => {
  const { t } = useTranslation();
  const { confirmIndices, confirmAnswers, setConfirmAnswer, submitConfirm, back } = useAuthFlow();

  return (
    <AuthScreen title={t("auth.seed.confirm.title")} lead={t("auth.seed.confirm.body")}>
      {confirmIndices.map((wordIndex, position) => (
        <AuthField
          key={wordIndex}
          label={interpolate(t("auth.seed.confirm.field"), { n: wordIndex + 1 })}
          value={confirmAnswers[position] ?? ""}
          onChange={(value) => setConfirmAnswer(position, value)}
          autoFocus={position === 0}
          autoComplete="off"
          onEnter={submitConfirm}
        />
      ))}
      <Button variant="primary" fullWidth onClick={submitConfirm}>
        {t("auth.seed.confirm.button")}
      </Button>
      <div style={{ textAlign: "center" }}>
        <Button variant="secondary" onClick={back}>
          {t("auth.seed.confirm.back")}
        </Button>
      </div>
    </AuthScreen>
  );
};
