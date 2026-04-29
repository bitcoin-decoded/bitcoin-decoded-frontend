import { type FC } from "react";

import { Callout, Emphasis, Quote } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { M2MoneySupplyChart, Quiz, TrustComparisonDemo } from "../../../Interactive";
import { getQuizDataM2Explosion } from "../../../Interactive/data/QUIZ_DATA_M2_EXPLOSION";
import { PageTemplate } from "../../Shared/components";
import { useToggleSimulator } from "../../Shared/hooks";

export const Bitcoin2Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();

  return (
    <PageTemplate
      title={t("nav.tree.whyBitcoin")}
      prelude={
        fr ? (
          <>
            Bitcoin est né d'un constat : notre monnaie est facile à créer, et sa gestion est
            concentrée entre les mains de quelques décideurs. Face à ces failles, Bitcoin propose
            une monnaie à offre fixe, vérifiable par tous et qui ne dépend d'aucune autorité
            centrale.
          </>
        ) : (
          <>
            Bitcoin was born from an observation: our money is easy to create, and its management is
            concentrated in the hands of a few decision-makers. Facing these flaws, Bitcoin offers a
            fixed-supply currency, verifiable by all, that depends on no central authority.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Nous venons de voir dans les grandes lignes ce qu'est Bitcoin, à savoir un logiciel, un réseau et une monnaie. Cela étant dit, une question plus profonde reste en suspens :"
          : "We've just seen what Bitcoin is in broad strokes — a software, a network, and a currency. That said, a deeper question remains:"}
      </p>
      <p>
        {fr ? (
          <>
            <Emphasis>Pourquoi Bitcoin existe-t-il ?</Emphasis> <br />
            Quel problème résout-il ? Pourquoi est-il si important ?
          </>
        ) : (
          <>
            <Emphasis>Why does Bitcoin exist?</Emphasis> <br />
            What problem does it solve? Why does it matter so much?
          </>
        )}
      </p>

      <p>
        {fr
          ? "Un graphique vaut parfois mille mots."
          : "A chart is sometimes worth a thousand words."}
      </p>

      <M2MoneySupplyChart showTitle={isQuizSolved} />

      <Quiz {...getQuizDataM2Explosion(language)} onCorrectAnswer={onQuizSolved} />

      {isQuizSolved && (
        <>
          <p>
            {fr ? "Observez l'accélération." : "Notice the acceleration."}
            <ol>
              <li>
                {fr
                  ? "Pendant des décennies, la courbe monte progressivement."
                  : "For decades, the curve climbs gradually."}
              </li>
              <li>
                {fr ? (
                  <>
                    Puis, à partir de 2008 (<i>crise des subprimes</i>), la pente s'accentue.
                  </>
                ) : (
                  <>
                    Then, starting in 2008 (<i>subprime crisis</i>), the slope steepens.
                  </>
                )}
              </li>
              <li>
                {fr ? (
                  <>
                    Et en 2020 (<i>crise du Covid</i>),{" "}
                    <Emphasis>c'est un véritable mur vertical</Emphasis>.
                  </>
                ) : (
                  <>
                    And in 2020 (<i>Covid crisis</i>),{" "}
                    <Emphasis>it becomes a vertical wall</Emphasis>.
                  </>
                )}
              </li>
            </ol>
            {fr
              ? "En moins de deux ans, environ 6 000 milliards de dollars ont été créés à partir de rien. Plus de 40 % de tous les dollars en circulation ont été créés entre 2020 et 2021."
              : "In less than two years, roughly $6 trillion was created from nothing. Over 40% of all dollars in circulation were created between 2020 and 2021."}
          </p>
          <p>
            {fr ? (
              <>
                Cette création ne vient pas de la production de richesse réelle.{" "}
                <Emphasis>
                  C'est de la dilution pure : plus de billets pour la même quantité de biens et de
                  services
                </Emphasis>
                .
              </>
            ) : (
              <>
                This creation didn't come from real wealth production.{" "}
                <Emphasis>
                  It's pure dilution: more bills for the same amount of goods and services
                </Emphasis>
                .
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Le résultat est l'inflation que chacun a constatée dans sa vie quotidienne.{" "}
                <Emphasis>
                  C'est le fonctionnement normal d'un système où une poignée de décideurs peut créer
                  de la monnaie sans limite et sans consentement afin de renflouer les banques et
                  ainsi sauver le système bancaire
                </Emphasis>
                .
              </>
            ) : (
              <>
                The result is the inflation that everyone has experienced in their daily life.{" "}
                <Emphasis>
                  It's the normal functioning of a system where a handful of decision-makers can
                  create money without limit or consent in order to bail out banks and save the
                  banking system
                </Emphasis>
                .
              </>
            )}
          </p>
          <Quote
            author="Satoshi Nakamoto"
            source={fr ? "Livre blanc de Bitcoin, 2008" : "Bitcoin White Paper, 2008"}
          >
            {fr
              ? "Le problème fondamental de la monnaie conventionnelle réside dans toute la confiance nécessaire à son fonctionnement. On doit faire confiance à la banque centrale pour ne pas dévaluer la monnaie, mais l'histoire des monnaies fiat est pleine de violations de cette confiance."
              : "The root problem with conventional currency is all the trust that's required to make it work. The central bank must be trusted not to debase the currency, but the history of fiat currencies is full of breaches of that trust."}
          </Quote>
          <p>
            {fr
              ? "C'est précisément dans ce contexte que Bitcoin a vu le jour. Le 3 janvier 2009, un développeur anonyme utilisant le pseudonyme Satoshi Nakamoto a lancé le réseau Bitcoin. Et dans le tout premier bloc de la blockchain, il a inscrit un message :"
              : "It is precisely in this context that Bitcoin was born. On January 3, 2009, an anonymous developer using the pseudonym Satoshi Nakamoto launched the Bitcoin network. And in the very first block of the blockchain, he inscribed a message:"}
          </p>
          <Quote>The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.</Quote>
          <p>
            {fr ? (
              <>
                Un titre du journal <i>The Times</i>. Le chancelier britannique était sur le point
                de renflouer les banques pour la deuxième fois. Ce message n'est pas anodin.{" "}
                <Emphasis>
                  C'est une déclaration d'intention gravée à jamais dans la blockchain
                </Emphasis>
                .
              </>
            ) : (
              <>
                A headline from <i>The Times</i>. The British chancellor was about to bail out the
                banks for the second time. This message is no coincidence.{" "}
                <Emphasis>It's a statement of intent forever etched in the blockchain</Emphasis>.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Bitcoin a été conçu pour résoudre simultanément les problèmes de dureté et de
                centralisation abordés dans les modules{" "}
                <Emphasis>
                  <i>Le fonctionnement du système bancaire</i>
                </Emphasis>{" "}
                et{" "}
                <Emphasis>
                  <i>Les lois de la monnaies</i>
                </Emphasis>
                . Plus encore, il répare la boussole de la société.
              </>
            ) : (
              <>
                Bitcoin was designed to simultaneously solve the problems of hardness and
                centralization studied in the modules{" "}
                <Emphasis>
                  <i>How the banking system works</i>
                </Emphasis>{" "}
                and{" "}
                <Emphasis>
                  <i>The laws of money</i>
                </Emphasis>
                . More than that, it repairs society's compass.
              </>
            )}
          </p>

          <Callout
            title={
              fr
                ? "Bitcoin, la monnaie la plus dure jamais créée"
                : "Bitcoin, the hardest money ever created"
            }
          >
            <p>
              {fr ? (
                <>
                  Face au problème de dureté, Bitcoin impose une offre maximale absolue de{" "}
                  <Emphasis>21 millions de bitcoins, pas un de plus</Emphasis>.
                </>
              ) : (
                <>
                  Facing the hardness problem, Bitcoin imposes an absolute maximum supply of{" "}
                  <Emphasis>21 million bitcoins, not one more</Emphasis>.
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Ce plafond est inscrit dans le code et vérifié par chaque nœud du réseau. Il ne
                  s'agit pas d'une promesse politique :{" "}
                  <Emphasis>c'est une règle mathématique</Emphasis>.
                </>
              ) : (
                <>
                  This cap is written in the code and verified by every node in the network. It's
                  not a political promise: <Emphasis>it's a mathematical rule</Emphasis>.
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Puisque personne ne peut imprimer de bitcoins à volonté, le{" "}
                  <Emphasis>
                    prix du temps (le taux d'intérêt) redevient une vérité mathématique pure, non
                    manipulable par une autorité centrale
                  </Emphasis>
                  . C'est la fin des mirages monétaires et des malinvestissements.
                </>
              ) : (
                <>
                  Since no one can print bitcoins at will, the{" "}
                  <Emphasis>
                    price of time (the interest rate) once again becomes a pure mathematical truth,
                    not manipulable by a central authority
                  </Emphasis>
                  . It is the end of monetary illusions and malinvestments.
                </>
              )}
            </p>
          </Callout>
          <Callout
            title={
              fr
                ? "Bitcoin, un protocole sans comité de direction"
                : "Bitcoin, a protocol with no board of directors"
            }
          >
            <p>
              {fr ? (
                <>
                  Face au problème de centralisation, Bitcoin fonctionne{" "}
                  <Emphasis>sans autorité centrale</Emphasis>. Le réseau peut être vu comme un
                  essaim d'abeilles où l'information est distribuée collectivement et où personne ne
                  décide pour les autres.
                </>
              ) : (
                <>
                  Facing the centralization problem, Bitcoin operates{" "}
                  <Emphasis>without a central authority</Emphasis>. The network can be seen as a
                  swarm of bees, where information is collectively distributed and no one decides
                  for others.
                </>
              )}
            </p>
          </Callout>
          <TrustComparisonDemo />
          <p>
            {fr ? (
              <>
                Bitcoin n'est pas une simple innovation technologique.{" "}
                <Emphasis>
                  C'est l'implémentation concrète de la logique autrichienne dans le silicium
                </Emphasis>
                . C'est la première monnaie de l'histoire qui combine dureté absolue et
                décentralisation totale.
              </>
            ) : (
              <>
                Bitcoin is not just a technological innovation.{" "}
                <Emphasis>
                  It is the concrete implementation of Austrian economic logic in silicon
                </Emphasis>
                . It is the first currency in history that combine absolute hardness with total
                decentralization.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Nous savons maintenant pourquoi Bitcoin existe et quels problèmes fondamentaux il
                résout.
              </>
            ) : (
              <>We now know why Bitcoin exists and what fundamental problems it solves.</>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Mais comprendre l'intention ne suffit pas. Il reste à voir <i>comment</i> cette
                promesse se traduit concrètement. Quels sont les mécanismes précis qui garantissent
                ces propriétés ? Comment la rareté est-elle véritablement protégée ? Comment le
                réseau fonctionne-t-il sans chef d'orchestre ?
              </>
            ) : (
              <>
                But understanding the intent isn't enough. We still need to see <i>how</i> this
                promise translates concretely. What are the precise mechanisms that guarantee these
                properties? How is scarcity truly protected? How does the network function without a
                conductor?
              </>
            )}
          </p>
          <p>
            {fr
              ? "Ce sont tant de questions que nous allons explorer par la suite !"
              : "These are the questions we'll explore next!"}
          </p>
        </>
      )}
    </PageTemplate>
  );
};
