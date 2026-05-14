import { type FC } from "react";

import { Callout, Quote, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataM2Explosion,
  M2MoneySupplyChart,
  Quiz,
  TrustComparisonDemo,
} from "../../../Interactive";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

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
            En janvier 2009, un développeur anonyme lance un logiciel et grave un titre de presse
            dans son tout premier bloc. Une référence au sauvetage des banques britanniques, ce
            jour-là. Quinze ans plus tard, ce logiciel pèse plus de mille milliards de dollars et
            personne ne sait qui l'a écrit. Avant de comprendre comment Bitcoin fonctionne, il faut
            comprendre pourquoi quelqu'un a jugé nécessaire de l'écrire.
          </>
        ) : (
          <>
            In January 2009, an anonymous developer launched a software program and embedded a
            newspaper headline in its very first block-a reference to the UK bank bailouts on that
            very day. Fifteen years later, that software is worth over a trillion dollars, and no
            one knows who wrote it. Before understanding how Bitcoin works, you need to understand
            why someone felt it had to be written in the first place.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Tu sais maintenant ce qu'est Bitcoin : un logiciel, un réseau, une monnaie. Reste la vraie question :"
          : "You now know what Bitcoin is: a software, a network, and a currency. The real question remains:"}
      </p>
      <p>
        {fr ? (
          <>
            Pourquoi Bitcoin existe-t-il ? <br />
            Quel problème résout-il ?
          </>
        ) : (
          <>
            Why does Bitcoin exist? <br />
            What problem does it solve?
          </>
        )}
      </p>

      <p>{fr ? "Regardes ce graphique." : "Take a look at this chart."}</p>

      <M2MoneySupplyChart showTitle={isQuizSolved} />

      <Quiz {...getQuizDataM2Explosion(language)} onCorrectAnswer={onQuizSolved} />

      {isQuizSolved && (
        <>
          <p>{fr ? "Observes l'accélération." : "Notice the acceleration."}</p>
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
                  Et en 2020 (<i>crise du Covid</i>), c'est un mur vertical.
                </>
              ) : (
                <>
                  And in 2020 (<i>Covid crisis</i>), it becomes a vertical wall.
                </>
              )}
            </li>
          </ol>
          <p>
            {fr
              ? "En moins de deux ans, environ 6 000 milliards de dollars ont été créés à partir de rien."
              : "In less than two years, roughly $6 trillion was created from nothing."}
          </p>
          *
          <p>
            {fr ? (
              <>
                Cette création ne correspond à aucune richesse réellement produite. C'est de la
                dilution pure : plus de billets pour la même quantité de biens et de services .
              </>
            ) : (
              <>
                This creation does not correspond to any real wealth being produced. It's pure
                dilution: more bills for the same amount of goods and services .
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Le résultat est l'inflation que chacun a constatée dans sa vie quotidienne. C'est le
                fonctionnement normal d'un système où une poignée de décideurs peut créer de la
                monnaie sans limite et sans consentement, pour renflouer les banques et sauver le
                système bancaire .
              </>
            ) : (
              <>
                The result is the inflation that everyone has experienced in their daily life. This
                is how the system normally works: a small group of decision-makers can create money
                without limit and without consent, to bail out banks and keep the financial system
                afloat .
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
            {fr ? (
              <>
                C'est précisément dans ce contexte que Bitcoin a vu le jour. Le 3 janvier 2009, un
                développeur anonyme utilisant le pseudonyme{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Satoshi_Nakamoto">
                  Satoshi Nakamoto
                </Reference>{" "}
                a lancé le réseau Bitcoin (cf.{" "}
                <Reference href="https://bitcoin.org/bitcoin.pdf">livre blanc</Reference>). Et dans
                le tout premier bloc de la blockchain, il a inscrit un message :
              </>
            ) : (
              <>
                It is precisely in this context that Bitcoin was born. On January 3, 2009, an
                anonymous developer using the pseudonym{" "}
                <Reference href="https://en.wikipedia.org/wiki/Satoshi_Nakamoto">
                  Satoshi Nakamoto
                </Reference>{" "}
                launched the Bitcoin network (cf. the{" "}
                <Reference href="https://bitcoin.org/bitcoin.pdf">white paper</Reference>). And in
                the very first block of the blockchain, he inscribed a message:
              </>
            )}
          </p>
          <Quote>The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.</Quote>
          <p>
            {fr ? (
              <>
                Un titre du journal <i>The Times</i>. Le chancelier britannique était sur le point
                de renflouer les banques pour la deuxième fois. Ce message n'est pas anodin. C'est
                une déclaration d'intention gravée à jamais dans la blockchain .
              </>
            ) : (
              <>
                A headline from <i>The Times</i>. The British chancellor was about to bail out the
                banks for the second time. This message is no coincidence. It's a statement of
                intent forever etched in the blockchain.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Bitcoin a été conçu pour résoudre simultanément les problèmes de dureté et de
                centralisation abordés dans les deux premiers modules. Plus encore, il répare la
                boussole de la société.
              </>
            ) : (
              <>
                Bitcoin was designed to simultaneously solve the problems of hardness and
                centralization studied in the two first modules. More than that, it repairs
                society's compass.
              </>
            )}
          </p>
          <Callout
            title={
              fr
                ? "Une offre fixe, gravée dans le code"
                : "A fixed supply, hard-coded into the protocol"
            }
          >
            <p>
              {fr ? (
                <>
                  Face au problème de dureté, Bitcoin impose une offre maximale absolue de 21
                  millions de bitcoins, pas un de plus.
                </>
              ) : (
                <>
                  Facing the hardness problem, Bitcoin imposes an absolute maximum supply of 21
                  million bitcoins, not one more.
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Ce plafond est inscrit dans le code et vérifié par chaque nœud du réseau. Il ne
                  s'agit pas d'une promesse politique : c'est une règle mathématique.
                </>
              ) : (
                <>
                  This cap is written in the code and verified by every node in the network. It's
                  not a political promise: it's a mathematical rule.
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Puisque personne ne peut imprimer de bitcoins à volonté, le prix du temps (le taux
                  d'intérêt) redevient un signal honnête, non manipulable par une autorité centrale
                  .
                </>
              ) : (
                <>
                  Since no one can print bitcoins at will, the price of time (the interest rate)
                  becomes an honest signal again, one that cannot be manipulated by a central
                  authority .
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
                  Face au problème de centralisation, Bitcoin fonctionne sans autorité centrale. Le
                  réseau peut être vu comme un essaim d'abeilles où l'information est distribuée
                  collectivement et où personne ne décide pour les autres.
                </>
              ) : (
                <>
                  Facing the centralization problem, Bitcoin operates without a central authority.
                  The network can be seen as a swarm of bees, where information is collectively
                  distributed and no one decides for others.
                </>
              )}
            </p>
          </Callout>
          <TrustComparisonDemo />
          <p>
            {fr ? (
              <>
                Bitcoin n'est pas une simple innovation technologique. C'est l'implémentation
                concrète de la logique autrichienne dans le silicium : la première monnaie qui
                combine dureté absolue et décentralisation.
              </>
            ) : (
              <>
                Bitcoin is not just a technological innovation. It is the concrete implementation of
                Austrian logic in silicon: the first currency that combines absolute hardness with
                decentralization.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>Tu sais maintenant pourquoi Bitcoin existe et quels problèmes il résout.</>
            ) : (
              <>You now know why Bitcoin exists and what problems it solves.</>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Mais comprendre l'intention ne suffit pas. Reste à voir comment cette promesse tient
                en pratique. Comment la rareté est-elle protégée ? Comment le réseau fonctionne-t-il
                sans chef d'orchestre ?
              </>
            ) : (
              <>
                But understanding the intention is not enough. We still need to see how this promise
                holds up in practice. How is scarcity protected? How does the network function
                without a conductor?
              </>
            )}
          </p>
          <p>{fr ? "C'est ce qu'on regarde dans la suite !" : "That's what we'll look at next!"}</p>
        </>
      )}
    </PageTemplate>
  );
};
