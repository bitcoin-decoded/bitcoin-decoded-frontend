import { type FC } from "react";

import { MODULE_QUIZ_BADGE_ID, useBadges } from "../../../Achievements";
import { HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataModule1Synthesis, SynthesisQuiz } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const Banking7Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { award } = useBadges();
  const {
    isActive: isQuizPassed,
    activate: onQuizPassed,
    reset: onQuizReset,
  } = useToggleSimulator();
  const quiz = getQuizDataModule1Synthesis(language);

  return (
    <PageTemplate title={t("nav.tree.synthesis")} showReadingTime={false}>
      <p>
        {fr
          ? "Tu viens de traverser la partie la plus dense. Avant de prendre du recul, mets tes acquis à l'épreuve."
          : "You've just made it through the densest part. Before stepping back, put what you've learned to the test."}
      </p>
      <p>
        <HighlightText>
          {fr ? (
            <>
              {quiz.questions.length} questions sur l'ensemble du module. Il te faut au moins{" "}
              {quiz.passThreshold} bonnes réponses pour débloquer la synthèse.
            </>
          ) : (
            <>
              {quiz.questions.length} questions across the whole module. You need at least{" "}
              {quiz.passThreshold} right answers to unlock the wrap-up.
            </>
          )}
        </HighlightText>
      </p>

      <SynthesisQuiz
        {...quiz}
        storageKey="synthesisQuiz.module1"
        onPass={() => {
          onQuizPassed();
          award(MODULE_QUIZ_BADGE_ID.banking);
        }}
        onReset={onQuizReset}
      />

      {isQuizPassed && (
        <>
          <p>{fr ? "Bravo à toi !" : "Well done."}</p>
          <p>
            {fr ? "Direction la prochaine étape :" : "Onward to the next step:"}{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_1}>{t("nav.tree.moneyOrigin")}</Reference>.
          </p>
        </>
      )}
    </PageTemplate>
  );
};
