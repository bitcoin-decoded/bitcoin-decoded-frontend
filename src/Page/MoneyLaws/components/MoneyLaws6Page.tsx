import { type FC } from "react";

import { HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  BitcoinDonationFooter,
  getQuizDataModule2Synthesis,
  SynthesisQuiz,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const MoneyLaws6Page: FC = () => {
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
              {quiz.questions.length} questions across the whole module. You need at least{" "}
              {quiz.passThreshold} right answers to unlock the wrap-up.
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
            {fr ? (
              <>
                La monnaie n'est pas un simple objet.{" "}
                <HighlightText>
                  C'est une technologie de mémoire collective, faite pour collaborer au-delà de nos
                  limites biologiques
                </HighlightText>
                . Et pour faire son boulot de batterie, il lui faut une qualité centrale : la
                dureté.
              </>
            ) : (
              <>
                Money isn't just an object.{" "}
                <HighlightText>
                  It's a technology of collective memory, built to let humans cooperate beyond their
                  biological limits
                </HighlightText>
                . And to do its job as a battery, it needs one central property: hardness.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Or la monnaie fiat qu'on utilise aujourd'hui a une dureté qui tend vers zéro : aucun
                stock physique pour freiner son émission, juste des règles politiques qui peuvent
                céder sous la pression. Cette flexibilité permet aux banques centrales et au système
                bancaire d'injecter des liquidités à grande échelle. Et de saboter le signal le plus
                important de l'économie : le taux d'intérêt. En manipulant ce « prix du temps », on
                envoie aux entrepreneurs un signal trompeur : épargne abondante, feu vert, en avant
                Guingamp ! Sauf que les ressources réelles ne suivent pas toujours.{" "}
                <HighlightText>C'est le mensonge monétaire</HighlightText>. Résultat : des
                malinvestissements massifs et des cycles de crises où la réalité finit, tôt ou tard,
                par corriger les excès du boom.
              </>
            ) : (
              <>
                Yet the fiat money we use today has a hardness that tends toward zero: no physical
                stock holding it back, just political rules that can fold under pressure. That
                flexibility lets central banks and the banking system pump in liquidity on a massive
                scale. And sabotage the most important signal in the economy: the interest rate.
                Manipulate this "price of time" and entrepreneurs get a misleading signal: plenty of
                savings, green light. Except the real resources don't always follow.{" "}
                <HighlightText>That's the monetary lie</HighlightText>. The result: massive
                malinvestments, and boom-bust cycles where reality, sooner or later, settles the
                bill.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Et si la manipulation des taux fausse la boussole, la planification centrale (le
                socialisme) éteint carrément le tableau de bord. C'est l'argument de Mises :{" "}
                <HighlightText>
                  sans propriété privée et sans prix de marché libres, calculer la valeur relative
                  des choses devient mathématiquement impossible
                </HighlightText>
                . On avance dans le noir. Impossible de savoir si on crée de la richesse, ou si on
                gaspille tout dans des projets absurdes.
              </>
            ) : (
              <>
                And if rate manipulation skews the compass, central planning (socialism) just turns
                off the whole dashboard. This is Mises' argument:{" "}
                <HighlightText>
                  without private property and free market prices, calculating the relative value of
                  things becomes mathematically impossible
                </HighlightText>
                . You're flying blind. No way to tell if you're building wealth or burning through
                resources on absurd projects.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Dernier morceau : la méthodologie autrichienne. Plutôt que de traiter les humains
                comme des atomes prévisibles dans des statistiques mouvantes, elle part de la
                logique de l'action humaine. Une méthode qui rappelle une chose simple :{" "}
                <HighlightText>on ne triche pas avec la rareté et le temps</HighlightText>.
              </>
            ) : (
              <>
                Last piece: the Austrian methodology. Rather than treating humans like predictable
                atoms in shifting statistics, it starts from the logic of human action. A method
                that drives home one simple thing:{" "}
                <HighlightText>you don't cheat scarcity, and you don't cheat time</HighlightText>.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Tu vois maintenant pourquoi ce système est défaillant.{" "}
                <HighlightText>
                  La batterie fuit. La boussole ment. Le pilote est aveugle
                </HighlightText>
                . D'où la question : existe-t-il une alternative ? Une monnaie qui redonnerait la
                main aux individus sur leur épargne, à la fois dure et impossible à manipuler par
                les banques centrales ?
              </>
            ) : (
              <>
                You see now why this system is broken at its core.{" "}
                <HighlightText>
                  The battery leaks. The compass lies. The pilot is blind
                </HighlightText>
                . Hence the question: is there an alternative? A currency that would put savers back
                in control of their own money, one that's both hard and out of reach of central
                banks?
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
      <BitcoinDonationFooter display="inline" />
    </PageTemplate>
  );
};
