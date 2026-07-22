import { type FC, useRef } from "react";

import { Callout, Reference, useExplorationGate } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  DifficultyAdjustment,
  DoubleSpendDemo,
  getQuizDataByzantine,
  MempoolVisual,
  MiningSimulator,
  Quiz,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";

export const Bitcoin4Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  const byzantineMarkRef = useRef<() => void>(() => {});
  const { markExplored: markByzantine } = useExplorationGate({
    threshold: 2,
    onComplete: () => byzantineMarkRef.current(),
  });

  return (
    <PageTemplate title={t("nav.tree.proofOfWork")}>
      <BlockReader chapterId={ROUTE_NAME.Bitcoin_4}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Bitcoin consomme en moyenne l'équivalent en électricité d'un pays comme la Pologne (
                <Reference href="https://ccaf.io/cbnsi/cbeci">
                  estimation de consommation : CCAF
                </Reference>
                ). Vu de loin, ça paraît absurde. Vu de près, c'est exactement le contraire : c'est
                la seule manière connue de se mettre d'accord à plusieurs millions d'inconnus, sur
                un réseau ouvert à tous, sans chef et sans confiance. Ce chapitre explique pourquoi.
              </>
            ) : (
              <>
                Bitcoin uses roughly as much electricity as a country like Poland (
                <Reference href="https://ccaf.io/cbnsi/cbeci">electricity estimate: CCAF</Reference>
                ). From far away, it sounds absurd. Up close, it's the exact opposite: it's the only
                known way for millions of strangers to agree on the same ledger, on an open network,
                with no leader and no trust required. This chapter explains why.
              </>
            )}
          </ChapterPrelude>
          <p>
            {fr ? (
              <>
                Imagine un réseau mondial où personne ne se connaît, personne ne fait confiance à
                personne. Et pourtant, tout le monde doit être d'accord sur une seule version du
                registre.
              </>
            ) : (
              <>
                Picture a global network where nobody knows anyone, and nobody trusts anyone. And
                yet everyone has to agree on a single version of the ledger.
              </>
            )}
          </p>
          <ul>
            <li>{fr ? "Qui a payé qui ?" : "Who paid whom?"}</li>
            <li>{fr ? "Quelle transaction est valide ?" : "Which transaction is valid?"}</li>
            <li>{fr ? "Laquelle est une fraude ?" : "Which one is a fraud?"}</li>
          </ul>
          <p>
            {fr ? (
              <>
                Dans un système centralisé, la réponse est simple : une autorité tranche. Mais ici,
                il n'y en a pas.
              </>
            ) : (
              <>
                In a centralized system, the answer is easy: an authority decides. But here, there
                is no authority.
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                Ce problème de coordination porte un nom historique : le{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Probl%C3%A8me_des_g%C3%A9n%C3%A9raux_byzantins">
                  problème des généraux byzantins
                </Reference>
                , formulé par Lamport en 1982. Bitcoin en est la première solution déployée à grande
                échelle dans un réseau ouvert et sans permission.
              </>
            ) : (
              <>
                This coordination problem has a historical name: the{" "}
                <Reference href="https://en.wikipedia.org/wiki/Byzantine_fault">
                  Byzantine Generals Problem
                </Reference>
                , formulated by Lamport in 1982. Bitcoin is its first solution deployed at scale on
                an open, permissionless network.
              </>
            )}
          </p>
        </Block>

        <Block kind="tool">
          {({ markComplete }) => {
            byzantineMarkRef.current = markComplete;
            return (
              <>
                <DoubleSpendDemo
                  scrollTargetId="bitcoin4-byzantine-quiz"
                  onComplete={() => markByzantine(0)}
                />

                <div id="bitcoin4-byzantine-quiz">
                  <Quiz
                    {...getQuizDataByzantine(language)}
                    onCorrectAnswer={() => markByzantine(1)}
                  />
                </div>
              </>
            );
          }}
        </Block>

        <Block>
          <p>
            {fr
              ? "Regardons exactement comment Bitcoin résout ce problème. Pour cela, on va voir successivement :"
              : "Let's look at exactly how Bitcoin solves this. We'll walk through three pieces, in order:"}
          </p>

          <ol>
            <li>{fr ? "La mempool" : "The mempool"}</li>
            <li>{fr ? "Le fonctionnement du minage" : "How mining works"}</li>
            <li>{fr ? "Et la formation du consensus" : "How consensus emerges"}</li>
          </ol>
        </Block>

        <Block>
          <Callout title={fr ? "Memory Pool ou salle d'attente" : "Memory Pool: the waiting room"}>
            <p>
              {fr ? (
                <>
                  Quand une transaction est soumise au réseau Bitcoin, elle n'est pas immédiatement
                  validée. Elle entre dans une salle d'attente appelée « mempool ».
                </>
              ) : (
                <>
                  When a transaction is submitted to the Bitcoin network, it isn't validated right
                  away. It lands in a waiting room called the "mempool".
                </>
              )}
            </p>

            <p>
              {fr ? (
                <>
                  Chaque nœud du réseau maintient sa propre mempool : elle contient les transactions
                  valides, mais pas encore confirmées, et potentiellement... en conflit.
                </>
              ) : (
                <>
                  Every node on the network keeps its own mempool: valid transactions, not yet
                  confirmed, and potentially... in conflict with each other.
                </>
              )}
            </p>
            <p>
              {fr
                ? "Oui, tu as bien lu. Deux transactions contradictoires peuvent coexister temporairement :"
                : "Yes, you read that right. Two contradictory transactions can coexist for a while:"}
            </p>
            <ul>
              <li>
                <i>
                  {fr ? "Nicolas envoie 1 BTC à Mme Michu" : "Nicolas sends 1 BTC to Ms. Smith"}
                </i>
              </li>

              <li>
                <i>
                  {fr
                    ? "Nicolas envoie le même BTC à Christine L."
                    : "Nicolas sends the same BTC to Christine L."}
                </i>
              </li>
            </ul>
            <p>
              {fr ? (
                <>
                  Les deux peuvent circuler en parallèle dans le réseau : à ce stade, aucun
                  consensus n'existe encore.
                </>
              ) : (
                <>
                  Both can travel through the network in parallel. At this point, there's no
                  consensus yet.
                </>
              )}
            </p>
            <MempoolVisual variant="intro" />
          </Callout>
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr
                  ? "C'est ici que les mineurs entrent en jeu. Leur rôle :"
                  : "This is where miners step in. Their job:"}
              </p>

              <ol>
                <li>
                  {fr
                    ? "sélectionner des transactions dans la mempool"
                    : "pick transactions from the mempool"}
                </li>

                <li>{fr ? "les regrouper dans un bloc" : "bundle them into a block"}</li>

                <li>
                  {fr
                    ? "tenter de faire accepter ce bloc par le réseau"
                    : "try to get the network to accept that block"}
                </li>
              </ol>
              <p>
                {fr ? (
                  <>
                    Mais attention : tout le monde peut proposer un bloc. Alors comment décider qui
                    a le droit d'écrire la prochaine page ? <br />
                    La réponse est simple et... un peu darwinienne : le premier à trouver la
                    solution gagne.
                  </>
                ) : (
                  <>
                    But here's the catch: anyone can propose a block. So how do we decide who gets
                    to write the next page? <br />
                    The answer is simple, and a bit darwinian: the first to find the solution wins.
                  </>
                )}
              </p>

              <Callout
                title={
                  fr
                    ? "Une compétition mondiale pas comme les autres"
                    : "A global competition like no other"
                }
              >
                <p>
                  {fr
                    ? "Le mineur construit l'en-tête de son bloc et le passe dans une fonction de hachage (SHA-256, qu'on applique deux fois, sinon c'est pas drôle)."
                    : "The miner builds the block header and runs it through a hash function (SHA-256, applied twice - yes, twice, on purpose)."}
                </p>
                <p>
                  {fr
                    ? "Le but est d'obtenir un hash numériquement inférieur à une cible fixée par le réseau. Concrètement, comme un hash s'écrit en hexadécimal, cela revient à produire un hash qui commence par un certain nombre de zéros."
                    : "The goal: get a hash numerically lower than a target set by the network. Since a hash is written in hexadecimal, in practice this means producing a hash that starts with a certain number of zeros."}
                </p>
                <p>
                  {fr
                    ? "Et pour y parvenir, le mineur modifie un paramètre appelé nonce et recommence."
                    : "To get there, the miner tweaks a parameter called the nonce and tries again."}
                </p>
                <p>
                  {fr ? (
                    <>
                      C'est du pur essai-erreur. <br />
                      Aucune astuce. Aucune optimisation magique.
                      <br />
                      Juste de la puissance de calcul.
                    </>
                  ) : (
                    <>
                      Pure trial and error. <br />
                      No trick. No magic shortcut.
                      <br />
                      Just raw computing power.
                    </>
                  )}
                </p>
                <p>
                  {fr
                    ? "Tu veux miner un bloc ? Vas-y, la compétition est ouverte à toutes et à tous après tout !"
                    : "You want in? Go for it: the competition is open to everyone, after all."}
                </p>
                <MiningSimulator onComplete={markComplete} />
              </Callout>
            </>
          )}
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr
                  ? "Le premier mineur qui trouve un hash valide propose son bloc au réseau. Les autres nœuds vérifient en quelques secondes et, si tout est valide, alors le bloc est ajouté au registre."
                  : "The first miner to find a valid hash broadcasts the block to the network. Other nodes verify it within seconds, and if everything checks out, the block is added to the ledger."}
              </p>
              <p>
                {fr
                  ? "Souviens-toi des deux transactions concurrentes de l'exemple précédent : si le mineur a choisi de prendre une transaction dans le nouveau bloc miné, alors la seconde devient invalide : les nœuds la retirent progressivement de leur mempool."
                  : "Remember the two competing transactions from earlier? If the miner picked one of them for the new block, the other becomes invalid: nodes drop it from their mempool over time."}
              </p>

              <MempoolVisual variant="resolution" onComplete={markComplete} />
            </>
          )}
        </Block>

        <Block>
          <p>
            {fr ? (
              <>
                Et là je te vois venir : « Que se passe-t-il si deux mineurs trouvent en même temps
                un hash valide ? » <br />
                Très bonne question. Le cas un peu tordu aussi mais qui arrive fréquemment.
              </>
            ) : (
              <>
                And here's where you'll come at me: "What happens if two miners find a valid hash at
                the exact same time?" <br />
                Great question. A tricky case, and one that actually happens often.
              </>
            )}
          </p>

          <Callout
            title={
              fr
                ? "Le cas tordu : deux chaînes concurrentes (ou plus)"
                : "The tricky case: two (or more) competing chains"
            }
          >
            <p>
              {fr
                ? "Il est possible qu'un mineur valide un bloc en même temps qu'un autre : le réseau se retrouve alors avec deux versions concurrentes."
                : "It can happen that two miners validate a block at the same moment: the network ends up with two competing versions."}
            </p>

            <p>
              {fr ? (
                <>C'est ce que l'on appelle un fork temporaire.</>
              ) : (
                <>This is what's called a temporary fork.</>
              )}
            </p>

            <p>
              {fr ? (
                <>
                  La règle du consensus est simple : à mesure que les blocs s'empilent, le réseau
                  converge vers la chaîne avec le plus de travail cumulé - c'est pas forcément la
                  chaîne la plus longue en nombre de blocs, c'est celle dont la difficulté totale
                  est la plus élevée (les deux coïncident presque toujours).
                </>
              ) : (
                <>
                  The consensus rule is simple: as blocks pile up, the network converges toward the
                  chain with the most accumulated work - not necessarily the longest in number of
                  blocks, but the one with the highest total difficulty (which is almost always the
                  same thing).
                </>
              )}
            </p>

            <p>
              {fr
                ? "Autrement dit : les mineurs continuent de construire sur le bloc qu'ils ont reçu en premier, une chaîne prend de l'avance et l'autre est naturellement abandonnée."
                : "In other words: miners keep building on whichever block they received first, one chain pulls ahead, and the other is naturally abandoned."}
            </p>
          </Callout>
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr
                  ? "Avant de boucler ce chapitre, un dernier point : la cible de difficulté."
                  : "Before wrapping up, one last piece: the difficulty target."}
              </p>

              <Callout
                title={
                  fr
                    ? "Le réglage de la difficulté comme une horloge numérique"
                    : "Difficulty as a digital clock"
                }
              >
                <p>
                  {fr
                    ? "La cible de difficulté n'est pas un choix arbitraire."
                    : "The difficulty target isn't picked at random."}
                </p>
                <p>
                  {fr ? (
                    <>
                      Elle s'ajuste tous les 2016 blocs (~2 semaines) de façon à ce qu'un bloc soit
                      miné toutes les 10 minutes.
                    </>
                  ) : (
                    <>
                      It readjusts every 2016 blocks (~2 weeks) so that one block is mined every 10
                      minutes on average.
                    </>
                  )}
                </p>

                <DifficultyAdjustment onComplete={markComplete} />
              </Callout>
            </>
          )}
        </Block>

        <Block last>
          <p>
            {fr ? (
              <>
                Voilà. La preuve de travail accomplit deux prouesses d'un coup : elle rend les
                conflits économiquement ruineux, et elle transforme l'énergie en confiance.
              </>
            ) : (
              <>
                That's it. Proof of Work pulls off two feats at once: it makes conflicts
                economically ruinous, and it turns energy into trust.
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                Mais pourquoi des mineurs dépensent-ils autant d'énergie pour participer ? <br />
                Direction le prochain chapitre :{" "}
                <Reference to={ROUTE_NAME.Bitcoin_5}>la récompense et le halving</Reference>.
              </>
            ) : (
              <>
                But why would miners burn that much energy just to take part? <br />
                On to the next chapter:{" "}
                <Reference to={ROUTE_NAME.Bitcoin_5}>the reward and the halving</Reference>.
              </>
            )}
          </p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
