import { type FC } from "react";

import { HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataModule2Synthesis, SynthesisQuiz } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const MoneyLaws5Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
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
              {quiz.questions.length} questions covering the whole module. Score at least{" "}
              {quiz.passThreshold} to unlock the synthesis.
            </>
          )}
        </HighlightText>
      </p>

      <SynthesisQuiz
        {...quiz}
        storageKey="synthesisQuiz.module2"
        onPass={onQuizPassed}
        onReset={onQuizReset}
      />

      {isQuizPassed && (
        <>
          <p>
            {fr
              ? "Bravo. Cette partie n'était pas la plus simple."
              : "Well done. This wasn't the easiest part."}
          </p>
          <p>
            {fr
              ? "Tu as maintenant une vision d'ensemble du diagnostic. Assemblons les pièces : l'image devient limpide."
              : "You now have an overall view of the diagnosis. Let's put the pieces together: the picture becomes clear."}
          </p>
          <p>
            {fr
              ? "Première découverte : la monnaie n'est pas un simple objet. C'est une technologie de mémoire collective, faite pour collaborer au-delà de nos limites biologiques. Pour faire son boulot de batterie, il lui faut une qualité essentielle : la dureté."
              : "First discovery: money is not just an object. It is a technology of collective memory, designed to enable cooperation beyond our biological limits. To function as a store of value, it requires one essential property: hardness."}
          </p>
          <p>
            {fr
              ? "On utilise aujourd'hui une monnaie fiat dont la dureté est de zéro. Cette facilité de création permet aux banques d'injecter des liquidités. Et de saboter le signal le plus important de l'économie : le taux d'intérêt. En manipulant ce « prix du temps », on fait croire aux entrepreneurs que l'épargne est abondante. Sauf qu'en réalité, les ressources ne sont pas là. C'est le mensonge monétaire. Résultat : des malinvestissements massifs, et des cycles de crises où la réalité finit toujours par corriger les excès du boom."
              : "Today, we use fiat money whose hardness is effectively zero. This ease of creation allows banks to inject liquidity and distort the economy's most important signal: the interest rate. By manipulating this “price of time,” it gives entrepreneurs the illusion that savings are abundant—when in reality, the resources are not there. This is the monetary illusion. The result: massive malinvestments, and boom-bust cycles where reality eventually corrects the excesses of the boom."}
          </p>
          <p>
            {fr
              ? "Et si la manipulation des taux fausse la boussole, la planification centrale (le socialisme) éteint carrément le tableau de bord. Sans propriété privée et sans prix de marché libres, calculer la valeur relative des choses devient mathématiquement impossible. On avance dans le noir. Impossible de savoir si on crée de la richesse, ou si on gaspille tout dans des projets absurdes."
              : "And if interest-rate manipulation distorts the compass, central planning (socialism) shuts down the dashboard entirely. Without private property and without free market prices, calculating the relative value of things becomes mathematically impossible. You are moving in the dark. There is no way to know whether you are creating wealth, or wasting everything on absurd projects."}
          </p>
          <p>
            {fr
              ? "Dernier morceau : la méthodologie autrichienne. Au lieu de traiter les humains comme des atomes prévisibles dans des statistiques mouvantes, elle part de la logique de l'action humaine. Une science de la vérité, qui rappelle qu'on ne triche pas avec la rareté et le temps."
              : "Last piece: the Austrian methodology. Instead of treating humans as predictable atoms in shifting statistics, it starts from the logic of human action. A science of truth that reminds us we cannot cheat scarcity and time."}
          </p>
          <p>
            {fr
              ? "Tu comprends maintenant pourquoi le système actuel est structurellement instable. La batterie fuit. La boussole ment. Le pilote est aveugle. D'où la question : existe-t-il une alternative ? Une monnaie qui rendrait le pouvoir aux individus, à la fois dure et impossible à manipuler par les banques centrales ?"
              : "You now understand why the current system is structurally unstable. The battery leaks. The compass lies. The pilot is blind. Which raises the question: is there an alternative? A currency that would return power to individuals, both hard and impossible for central banks to manipulate?"}
          </p>
          <p>
            {fr
              ? "Il est temps de lever le voile sur cette technologie. Place au grand final :"
              : "It's time to lift the veil on this technology. On to the grand finale:"}{" "}
            <Reference to={ROUTE_NAME.Bitcoin_1}>{t("nav.tree.bitcoinRevolution")}</Reference>.
          </p>
        </>
      )}
    </PageTemplate>
  );
};
