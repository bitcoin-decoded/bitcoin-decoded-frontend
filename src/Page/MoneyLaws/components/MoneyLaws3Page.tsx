import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataRobinson, Quiz } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const MoneyLaws3Page: FC = () => {
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.economicCycles")}
      prelude={
        fr ? (
          <>
            Pourquoi les crises économiques reviennent-elles toujours, malgré toutes les leçons du
            passé ? La réponse n'est pas dans la psychologie des marchés. Elle est dans la monnaie
            qu'on utilise.
          </>
        ) : (
          <>
            Why do economic crises keep coming back, no matter how many lessons we draw from the
            past? The answer isn't market psychology. It's the money we use.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Au chapitre précédent, dans un monde honnête, le taux d'intérêt reflétait l'épargne réelle : la boussole disait vrai."
          : "In the previous chapter, in an honest world, the interest rate reflected real savings: the compass told the truth."}
      </p>
      <p>{fr ? "Maintenant, le même film, mais truqué." : "Now, the same movie - rigged."}</p>
      <Callout title={fr ? "La boussole truquée" : "The rigged compass"}>
        <ol>
          <li>
            {fr ? (
              <span>
                Cette fois, personne n'a épargné. Mais les banques (commerciales via la création
                monétaire, centrales via leurs politiques) maintiennent quand même les taux au
                plancher. L'acier, les briques, le temps : rien de tout ça n'attend en réserve.
              </span>
            ) : (
              <span>
                This time, nobody saved. But the banks (commercial ones through money creation,
                central ones through their policies) pin rates to the floor anyway. Steel, bricks,
                time - none of it is sitting in reserve.
              </span>
            )}
          </li>
          <li style={{ marginTop: "1rem" }}>
            {fr ? (
              <span>
                Le taux bas envoie pourtant le même message qu'avant : <i>« Lancez vos projets »</i>
                . Sauf qu'il ment. La boussole dit « plein de ressources », la réalité dit « les
                caisses sont vides ».
              </span>
            ) : (
              <span>
                Yet the low rate sends the very same message as before:{" "}
                <i>"Go launch your projects."</i> Except it's lying. The compass says "plenty of
                resources," reality says "the vaults are empty."
              </span>
            )}
          </li>
          <li style={{ marginTop: "1rem" }}>
            {fr ? (
              <span>
                Trompés, les entrepreneurs se ruent sur des chantiers que rien ne soutient :
                aéroports déserts, tours vides, startups qui brûlent du cash sans rien produire.
                C'est le{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Malinvestissement">
                  malinvestissement
                </Reference>
                . Et l'écart se creuse entre ce qu'on fabrique vraiment et les chiffres qui
                s'envolent sur les écrans.
              </span>
            ) : (
              <span>
                Fooled, entrepreneurs pile into projects that nothing supports: deserted airports,
                empty towers, startups burning cash without producing a thing. This is{" "}
                <Reference href="https://en.wikipedia.org/wiki/Malinvestment">
                  malinvestment
                </Reference>
                . And the gap widens between what we actually make and the numbers shooting up on
                screens.
              </span>
            )}
          </li>
        </ol>
      </Callout>
      <p>
        {fr ? (
          <>
            La réalité physique finit toujours par rattraper le mensonge monétaire. À un moment, on
            s'aperçoit que les ressources manquent pour terminer tous les chantiers. La bulle
            explose : les prix des matériaux s'envolent, les banques paniquent et arrêtent de
            prêter.{" "}
          </>
        ) : (
          <>
            Physical reality always catches up with the monetary lie. At some point, we realize that
            resources are missing to finish all the projects. The bubble bursts: material prices
            skyrocket, banks panic and stop lending.{" "}
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Et vient ensuite la purge : ce qu'on appelle « crise » est en réalité un processus de{" "}
            <i>liquidation des erreurs</i>. C'est le moment où l'économie liquide les mauvais
            projets pour essayer de sauver ce qui peut l'être. La récession est une période de «
            ceinture serrée » obligatoire pour reconstituer l'épargne qu'on a fait semblant d'avoir
            pendant le boom.
          </>
        ) : (
          <>
            Then comes the purge: what we call a "crisis" is really a process of{" "}
            <i>liquidating past errors</i>. It's the moment when the economy clears out the bad
            projects to try to salvage what can be saved. The recession is a mandatory
            belt-tightening period to rebuild the savings we pretended to have during the boom.
          </>
        )}
      </p>
      <Callout
        title={fr ? "Le test final de Robinson Crusoé 🏝️" : "Robinson Crusoe's final test 🏝️"}
      >
        <p>
          {fr
            ? "Pour vérifier si t'as bien saisi toutes les notions précédentes, qui sont un peu chargées je le reconnais volontiers, faisons un petit test avec notre ami Robinson Crusoé, seul sur son île."
            : "To check whether you've really grasped the previous concepts (which are a bit dense, I'll admit), let's run a little test with our friend Robinson Crusoe, alone on his island."}
        </p>
        <p>
          {fr ? (
            <>
              Robinson pêche à la main huit heures par jour. Cela lui permet de ramener quatre
              poissons : c'est exactement ce qu'il consomme chaque jour pour être rassasié. Sa
              situation est stable, mais sa vie est un peu limitée. Il a alors une idée brillante :
              construire un filet de pêche pour n'avoir plus qu'à travailler quatre heures par jour.
            </>
          ) : (
            <>
              Robinson fishes by hand eight hours a day. That gets him four fish - exactly what he
              eats every day to feel full. His situation is stable, but his life is a bit limited.
              Then he gets a brilliant idea: build a fishing net so he only has to work four hours a
              day.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Cependant, fabriquer ce filet prendra des jours entiers. Robinson sait que s'il arrête
              de pêcher pour tresser son filet, il n'aura rien à manger.
            </>
          ) : (
            <>
              However, making this net will take whole days. Robinson knows that if he stops fishing
              to weave his net, he'll have nothing to eat.
            </>
          )}
        </p>
        <Quiz {...getQuizDataRobinson(language)} onCorrectAnswer={onQuizSolved} />
        {isQuizSolved && (
          <>
            <p>
              {fr
                ? "Robinson nous apprend ici deux choses fondamentales."
                : "Robinson teaches us two fundamental things here."}
            </p>
            <ol>
              <li>
                {fr ? (
                  <>
                    L'épargne précède toujours l'investissement réel. On ne peut pas construire un
                    filet (le bien de capital) sans avoir mis de côté les poissons (l'épargne)
                    nécessaires pour nourrir le travailleur pendant la construction. Les keynésiens
                    contestent ce principe, mais Robinson n'a pas de banque centrale !
                  </>
                ) : (
                  <>
                    Savings always precede real investment. You can't build a net (the capital good)
                    without first setting aside the fish (the savings) needed to feed the worker
                    during construction. Keynesians dispute this principle - but Robinson doesn't
                    have a central bank!
                  </>
                )}
              </li>
              <li style={{ marginTop: "1rem" }}>
                {fr ? (
                  <>
                    La réalité est implacable. On ne peut pas créer du temps ou de la nourriture à
                    partir de rien.
                  </>
                ) : (
                  <>Reality is unforgiving. You can't create time or food out of thin air.</>
                )}
              </li>
            </ol>
          </>
        )}
      </Callout>
      <p>
        {fr ? (
          <>
            La cause des cycles économiques n'est pas extérieure. Ce ne sont pas des problèmes de «
            psychologie » des investisseurs. Au contraire, c'est un phénomène endogène, causé par la
            structure du système lui-même.{" "}
          </>
        ) : (
          <>
            The cause of economic cycles isn't external. They aren't problems of investor
            "psychology." On the contrary - they're an endogenous phenomenon, caused by the
            structure of the system itself.{" "}
          </>
        )}
      </p>
      <p>
        {fr
          ? "Parce que notre monnaie n'est pas « dure », on laisse les banques saboter notre boussole (le taux d'intérêt). On force l'économie à vivre dans un mensonge permanent qui se termine inévitablement par un krach."
          : 'Because our money isn\'t "hard," we let banks sabotage our compass (the interest rate). We force the economy to live in a permanent lie that inevitably ends in a crash.'}
      </p>
      <p>
        {fr
          ? "Mais si le problème était encore plus profond ? Si le simple fait de vouloir « piloter » l'économie depuis un bureau central se heurtait à un mur informationnel infranchissable ? Avant de découvrir notre nouvel instrument de navigation, regardons pourquoi même le plus brillant des cartographes ne pourra jamais remplacer la vérité du marché."
          : 'But what if the problem runs even deeper? What if the very act of trying to "steer" the economy from a central office hit an insurmountable wall of information? Before discovering our new navigation instrument, let\'s look at why even the most brilliant cartographer can never replace the truth of the market.'}
      </p>
      <p>
        {fr ? (
          <>
            Alors, prêt à comprendre pourquoi les{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_4}>systèmes planifiés</Reference> sont condamnés à
            l'aveuglement ?
          </>
        ) : (
          <>
            Ready to understand why{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_4}>planned systems</Reference> are doomed to
            blindness?
          </>
        )}
      </p>
    </PageTemplate>
  );
};
