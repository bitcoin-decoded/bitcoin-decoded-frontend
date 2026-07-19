import { type FC } from "react";

import { Callout, Quote, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataM2Explosion,
  M2MoneySupplyChart,
  Quiz,
  TrustComparisonDemo,
  useToggleSimulator,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";

export const Bitcoin2Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();

  return (
    <PageTemplate title={t("nav.tree.whyBitcoin")}>
      <BlockReader chapterId={ROUTE_NAME.Bitcoin_2}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                En janvier 2009, un développeur anonyme lance un logiciel et grave un titre de
                presse dans son tout premier bloc. Une référence au sauvetage des banques
                britanniques, ce jour-là. Quinze ans plus tard, ce logiciel pèse plus de mille
                milliards de dollars et personne ne sait qui l'a écrit. Avant de comprendre comment
                Bitcoin fonctionne, il faut comprendre pourquoi quelqu'un a jugé nécessaire de
                l'écrire.
              </>
            ) : (
              <>
                In January 2009, an anonymous developer launched a piece of software and engraved a
                newspaper headline into its very first block. A reference to the UK bank bailouts,
                on that very day. Fifteen years later, that software is worth over a trillion
                dollars, and no one knows who wrote it. Before understanding how Bitcoin works, you
                need to understand why someone thought it had to be written in the first place.
              </>
            )}
          </ChapterPrelude>
          <p>
            {fr
              ? "Bitcoin, tu as vu ce qu'il est : un logiciel, un réseau, une monnaie. Reste la vraie question :"
              : "Bitcoin, you've seen what it is: a piece of software, a network, a currency. The real question remains:"}
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

          <p>{fr ? "Regarde ce graphique." : "Take a look at this chart."}</p>
        </Block>

        {/* Bloc-outil : déverrouillé quand le quiz reçoit une bonne réponse (le titre du graphique se révèle alors). */}
        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <M2MoneySupplyChart showTitle={isQuizSolved} />
              <Quiz
                {...getQuizDataM2Explosion(language)}
                onCorrectAnswer={() => {
                  onQuizSolved();
                  markComplete();
                }}
              />
            </>
          )}
        </Block>

        <Block>
          <p>{fr ? "Observe l'accélération." : "Notice the acceleration."}</p>
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
            {fr ? (
              <>
                En moins de deux ans, environ 6 000 milliards de dollars ont été injectés dans le
                système, principalement via l'achat d'actifs par la{" "}
                <Reference href="https://www.federalreserve.gov/monetarypolicy/bst_recenttrends.htm">
                  Fed
                </Reference>
                . Alors OK, ce n'est pas du papier qui sort d'une imprimante. Mais le résultat est
                exactement le même : une avalanche de nouveaux dollars en circulation, pour la même
                quantité de biens et services.
              </>
            ) : (
              <>
                In less than two years, roughly 6 trillion dollars were injected into the system,
                mostly through asset purchases by the{" "}
                <Reference href="https://www.federalreserve.gov/monetarypolicy/bst_recenttrends.htm">
                  Fed
                </Reference>
                . Sure, it's not paper coming out of a printer. But the result is exactly the same:
                a flood of new dollars in circulation, for the same amount of goods and services.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Cette création ne correspond à aucune richesse réellement produite. C'est de la
                dilution pure : plus de billets pour la même quantité de biens et de services.
              </>
            ) : (
              <>
                This creation doesn't match any wealth actually produced. It's pure dilution: more
                bills for the same amount of goods and services.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Une partie de cette création s'est retrouvée dans les prix que tu paies tous les
                jours. Pas toute, pas immédiatement, pas dans la même proportion partout. Mais pas
                besoin d'un prix Nobel pour comprendre que : quand tu multiplies les dollars en
                circulation par 1,4 en 18 mois, à un moment ou un autre ça se répercute dans
                l'économie réelle et ça crée de l'inflation. Il faut soit être de très mauvaise foi
                soit s'appeler Bruno Le Maire pour s'étonner que les prix bougent.
              </>
            ) : (
              <>
                Some of that creation ended up in the prices you pay every day. Not all of it, not
                immediately, not in the same proportion everywhere. But you don't need a Nobel Prize
                to figure out that: when you multiply the dollars in circulation by 1.4 in 18
                months, sooner or later it shows up in the real economy and creates inflation. You
                have to be acting in seriously bad faith - or be Jerome Powell calling it
                "transitory" - to act surprised when prices start moving.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                C'est le fonctionnement normal d'un système où une poignée de décideurs peut créer
                de la monnaie sans limite et sans consentement, pour renflouer les banques et sauver
                le système bancaire.
              </>
            ) : (
              <>
                That's how the system normally works: a small group of decision-makers can create
                money without limit and without consent, to bail out banks and keep the financial
                system afloat.
              </>
            )}
          </p>
        </Block>

        <Block>
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
                Bitcoin attaque exactement ce problème. Le 3 janvier 2009, un développeur anonyme
                utilisant le pseudonyme{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Satoshi_Nakamoto">
                  Satoshi Nakamoto
                </Reference>{" "}
                a lancé le réseau Bitcoin (cf.{" "}
                <Reference href="https://bitcoin.org/bitcoin.pdf">livre blanc</Reference>). Et dans
                le tout premier bloc de la blockchain, il a inscrit un message :
              </>
            ) : (
              <>
                Bitcoin tackles exactly that problem. On January 3, 2009, an anonymous developer
                using the pseudonym{" "}
                <Reference href="https://en.wikipedia.org/wiki/Satoshi_Nakamoto">
                  Satoshi Nakamoto
                </Reference>{" "}
                launched the Bitcoin network (see the{" "}
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
                une déclaration d'intention coulée dans le bloc zéro.
              </>
            ) : (
              <>
                A headline from <i>The Times</i>. The British chancellor was about to bail out the
                banks for the second time. This message is no accident. It's a statement of intent
                cast into block zero.
              </>
            )}
          </p>
        </Block>

        <Block>
          <p>
            {fr ? (
              <>
                Bitcoin a été conçu pour résoudre simultanément les problèmes de dureté et de
                centralisation abordés dans les deux premiers modules.
              </>
            ) : (
              <>
                Bitcoin was designed to solve, at the same time, the problems of hardness and
                centralization covered in the two previous modules.
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
                  To address the hardness problem, Bitcoin enforces an absolute maximum supply of 21
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
                  This cap is written in the code and verified by every node on the network. It's
                  not a political promise: it's a mathematical rule.
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Puisque personne ne peut imprimer de bitcoins à volonté, le taux d'intérêt cesse
                  d'être l'instrument d'une autorité centrale. Il redevient ce qu'il devrait
                  toujours être : le prix auquel les gens acceptent de prêter ou d'emprunter. Pas
                  une manette qu'on tourne dans un bureau.
                </>
              ) : (
                <>
                  Since no one can print bitcoins at will, the interest rate stops being the
                  instrument of a central authority. It goes back to being what it should always
                  have been: the price at which people agree to lend or borrow. Not a lever someone
                  pulls in an office.
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
                  collectivement. Pas d'autorité centrale capable d'imposer une règle. Juste des
                  développeurs, des mineurs, des nœuds qui ont chacun une influence, mais où aucun
                  ne décide pour tout le monde.
                </>
              ) : (
                <>
                  To address the centralization problem, Bitcoin runs without a central authority.
                  The network can be pictured as a swarm of bees where information is shared
                  collectively. No central authority can impose a rule. Just developers, miners, and
                  nodes, each with some influence, but none deciding for everyone else.
                </>
              )}
            </p>
          </Callout>
        </Block>

        {/* Bloc-outil : déverrouillé quand 2 actions distinctes ont été essayées (compteur x/2). */}
        <Block kind="tool">
          {({ markComplete }) => <TrustComparisonDemo onComplete={markComplete} />}
        </Block>

        <Block last>
          <p>
            {fr ? (
              <>
                Bitcoin n'est pas qu'une innovation technique. C'est l'école autrichienne grandeur
                nature : un plafond monétaire qu'on ne peut pas bouger, et personne pour décider
                d'en créer plus.
              </>
            ) : (
              <>
                Bitcoin isn't just one more piece of tech. The Austrian school made real: a money
                cap that can't be moved, and no one who can print more.
              </>
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
                But understanding the intention isn't enough. The real question is whether this
                promise holds up in practice. How is scarcity actually protected? How does the
                network run without a conductor?
              </>
            )}
          </p>
          <p>{fr ? "C'est ce qu'on regarde dans la suite !" : "That's what we'll look at next!"}</p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
