import { type FC } from "react";

import { MODULE_QUIZ_BADGE_ID, useBadges } from "../../../Achievements";
import { HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataModule2Synthesis, SynthesisQuiz, useToggleSimulator } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/";

export const MoneyLaws6Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { award } = useBadges();
  const {
    isActive: isQuizPassed,
    activate: onQuizPassed,
    reset: onQuizReset,
  } = useToggleSimulator();
  const quiz = getQuizDataModule2Synthesis(language);

  return (
    <PageTemplate title={t("nav.tree.synthesis")} showReadingTime={false}>
      <p>
        {fr
          ? "Tu viens de traverser un module dense. Avant de prendre du recul, mets tes acquis à l'épreuve."
          : "You've just made it through a dense module. Before stepping back, put what you've learned to the test."}
      </p>
      <p>
        <HighlightText>
          {fr ? (
            <>
              {quiz.questions.length} questions sur l'ensemble du module. Atteins au moins{" "}
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
        storageKey="synthesisQuiz.module2"
        onPass={() => {
          onQuizPassed();
          award(MODULE_QUIZ_BADGE_ID.moneyLaws);
        }}
        onReset={onQuizReset}
      />

      {isQuizPassed && (
        <>
          <p>
            {fr ? (
              <>
                (Bien joué, sincèrement. C'était pas la partie la plus simple. Combiné au{" "}
                <Reference to={ROUTE_NAME.Banking_1}>module 1</Reference>, tu as maintenant une
                vision d'ensemble du diagnostic. Et si l'on colle les pièces : l'image devient très
                claire.)
              </>
            ) : (
              <>
                (Well done, truly. That wasn't the easiest stretch. Combined with{" "}
                <Reference to={ROUTE_NAME.Banking_1}>module 1</Reference>, you now have the full
                diagnosis in hand. Put the pieces together: the picture sharpens.)
              </>
            )}
          </p>
          <p>
            {fr
              ? "Il est temps de lever le voile sur cette technologie. Place au grand final :"
              : "Time to lift the veil on that technology. On to the grand finale:"}{" "}
            <Reference to={ROUTE_NAME.Bitcoin_1}>{t("nav.tree.bitcoinRevolution")}</Reference>.
          </p>
        </>
      )}
    </PageTemplate>
  );
};
