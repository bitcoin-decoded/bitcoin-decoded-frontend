import { type FC } from "react";

import { MODULE_QUIZ_BADGE_ID, useBadges } from "../../../Achievements";
import { HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataModule3Synthesis, SynthesisQuiz } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const Bitcoin9Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { award } = useBadges();
  const {
    isActive: isQuizPassed,
    activate: onQuizPassed,
    reset: onQuizReset,
  } = useToggleSimulator();
  const quiz = getQuizDataModule3Synthesis(language);

  return (
    <PageTemplate title={t("nav.tree.synthesis")} showReadingTime={false}>
      <p>
        {fr
          ? "Tu viens de plonger dans les entrailles de Bitcoin : du protocole jusqu'à la seed. Avant de tourner la page, vérifie que les concepts clés sont bien arrimés."
          : "You've just dived into the guts of Bitcoin, from the protocol down to the seed. Before turning the page, make sure the key concepts are locked in."}
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
        storageKey="synthesisQuiz.module3"
        onPass={() => {
          onQuizPassed();
          award(MODULE_QUIZ_BADGE_ID.bitcoin);
        }}
        onReset={onQuizReset}
      />

      {isQuizPassed && (
        <>
          <p>
            {fr
              ? "Tu viens de boucler la révolution Bitcoin, les fondations techniques sont à toi."
              : "You've just wrapped up the Bitcoin revolution, and the technical foundations are now yours."}
          </p>
          <p>
            {fr
              ? "Reste à le mettre en pratique. Direction la dernière étape :"
              : "Now to put it into practice. On to the final step:"}{" "}
            <Reference to={ROUTE_NAME.GetStarted}>{t("nav.tree.getStarted")}</Reference>.
          </p>
        </>
      )}
    </PageTemplate>
  );
};
