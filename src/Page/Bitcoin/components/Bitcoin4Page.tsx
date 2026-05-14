import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
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
import { PageTemplate } from "../../Shared/";

export const Bitcoin4Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.proofOfWork")}
      prelude={
        fr
          ? "Bitcoin consomme l'équivalent en électricité d'un pays moyen. Pour valider des transactions. Vu de loin, ça paraît absurde. Vu de près, c'est exactement le contraire : c'est la seule manière connue de se mettre d'accord à plusieurs millions, sans chef et sans confiance. Ce chapitre explique pourquoi."
          : "Bitcoin consumes as much electricity as a mid-sized country. To validate transactions. From a distance, that sounds absurd. Up close, it's exactly the opposite: it is the only known way for millions of people to reach consensus without a leader and without trust. This chapter explains why."
      }
    >
      <p>
        {fr
          ? "Imagines un réseau mondial où personne ne se connaît, personne ne fait confiance à personne. Et pourtant, tout le monde doit être d'accord sur une seule version du registre."
          : "Imagine a global network where nobody knows anyone, and nobody trusts anyone. Yet everyone must agree on a single version of the ledger."}
      </p>

      <p>
        <ul>
          <li>{fr ? "Qui a payé qui ?" : "Who paid whom?"}</li>
          <li>{fr ? "Quelle transaction est valide ?" : "Which transaction is valid?"}</li>
          <li>{fr ? "Laquelle est une fraude ?" : "Which one is a fraud?"}</li>
        </ul>
      </p>

      <p>
        {fr ? (
          <>
            Dans un système centralisé, la réponse est simple : une autorité tranche. Mais ici, il
            n'y en a pas.
          </>
        ) : (
          <>
            In a centralized system, the answer is simple: an authority decides. But here, there is
            none.
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
            , formulé par Lamport en 1982. Bitcoin en est la première solution pratique à grande
            échelle.
          </>
        ) : (
          <>
            This coordination problem has a historical name: the{" "}
            <Reference href="https://en.wikipedia.org/wiki/Byzantine_fault">
              Byzantine Generals Problem
            </Reference>
            , framed by Lamport in 1982. Bitcoin is its first practical large-scale solution.
          </>
        )}
      </p>

      <DoubleSpendDemo scrollTargetId="bitcoin4-byzantine-quiz" />

      <div id="bitcoin4-byzantine-quiz">
        <Quiz {...getQuizDataByzantine(language)} onCorrectAnswer={() => {}} />
      </div>

      <p>
        {fr
          ? "Regardons exactement comment Bitcoin résout élégamment ce problème. Pour cela, on va voir successivement :"
          : "Let's see exactly how Bitcoin elegantly solves this problem. To do so, we'll go through, in order:"}
      </p>

      <ol>
        <li>{fr ? "La mempool" : "The mempool"}</li>
        <li>{fr ? "Le fonctionnement du minage" : "How mining works"}</li>
        <li>{fr ? "Et la formation du consensus" : "And how consensus is reached"}</li>
      </ol>

      <Callout title={fr ? "Memory Pool ou salle d'attente" : "Memory Pool: the waiting room"}>
        <p>
          {fr ? (
            <>
              Quand une transaction est soumise au réseau Bitcoin, elle n'est pas immédiatement
              validée. Elle entre dans une salle d'attente appelée « mempool ».
            </>
          ) : (
            <>
              When a transaction is submitted to the Bitcoin network, it is not immediately
              validated. It enters a waiting room called the "mempool".
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
              Each node on the network maintains its own mempool: it contains valid but
              not-yet-confirmed transactions, and potentially... conflicting ones.
            </>
          )}
        </p>

        <p>
          {fr
            ? "Oui, tu as bien lu. Deux transactions contradictoires peuvent coexister temporairement :"
            : "Yes, you read that right. Two contradictory transactions can coexist temporarily:"}
          <ul>
            <li>
              <i>{fr ? "Nicolas envoie 1 BTC à Mme. Michu" : "Nicolas sends 1 BTC to Ms. Michu"}</i>
            </li>
            <li>
              <i>
                {fr
                  ? "Nicolas envoie le même BTC à Christine L."
                  : "Nicolas sends the same BTC to Christine L."}
              </i>
            </li>
          </ul>
        </p>

        <p>
          {fr ? (
            <>
              Les deux peuvent circuler en parallèle dans le réseau : à ce stade, aucun consensus
              n'existe encore.
            </>
          ) : (
            <>
              Both can circulate in parallel across the network: at this stage, no consensus exists
              yet.
            </>
          )}
        </p>

        <MempoolVisual variant="intro" />
      </Callout>

      <p>
        {fr
          ? "C'est ici que les mineurs entrent en jeu. Leur rôle :"
          : "This is where miners come in. Their role:"}
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
            : "try to get this block accepted by the network"}
        </li>
      </ol>
      <p>
        {fr ? (
          <>
            Mais attention : tout le monde peut proposer un bloc. Alors comment décider qui a le
            droit d'écrire la prochaine page ? <br />
            La réponse est simple : le premier à trouver la solution gagne.
          </>
        ) : (
          <>
            But careful: anyone can propose a block. So how do we decide who gets to write the next
            page? <br />
            The answer is simple: The first to find the solution wins.
          </>
        )}
      </p>

      <Callout
        title={
          fr
            ? "Une compétition mondiale pas comme les autres"
            : "a global competition like no other"
        }
      >
        <p>
          {fr
            ? "Le mineur construit l'en-tête de son bloc et le passe dans une fonction de hachage (SHA-256, appliquée deux fois)."
            : "The miner builds the block header and runs it through a hashing function (SHA-256, applied twice)."}
        </p>
        <p>
          {fr
            ? "Le but est d'obtenir un hash numériquement inférieur à une cible fixée par le réseau. Concrètement, comme un hash s'écrit en hexadécimal, cela revient à produire un hash qui commence par un certain nombre de zéros."
            : "The goal is to obtain a hash numerically lower than a target set by the network. In practice, since a hash is written in hexadecimal, this amounts to producing a hash that begins with a certain number of zeros."}
        </p>
        <p>
          {fr
            ? "Et pour y parvenir, le mineur modifie un paramètre appelé nonce et recommence."
            : "And to achieve this, the miner tweaks a parameter called the nonce and tries again."}
        </p>
        <p>
          {fr ? (
            <>
              C'est du pur essai-erreur. <br />
              Aucune astuce. Aucune optimisation magique.
              <br />
              Juste de la puissance de calcul : du travail computationnel.
            </>
          ) : (
            <>
              It's pure trial and error. <br />
              No trick. No magic optimization.
              <br />
              Just raw computing power: computational work.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Tu veux miner un bloc ? Vas-y, la compétition est ouverte à toutes et à tous !"
            : "Want to mine a block? Go ahead: the competition is open to everyone!"}
        </p>
        <MiningSimulator />
      </Callout>

      <p>
        {fr
          ? "Le premier mineur qui trouve un hash valide propose son bloc au réseau. Les autres nœuds vérifient instantanément et, si tout est valide, alors le bloc est ajouté au registre."
          : "The first miner who finds a valid hash broadcasts their block to the network. Other nodes verify it instantly, and if everything checks out, the block is added to the ledger."}
      </p>
      <p>
        {fr
          ? "Souviens-toi des deux transactions concurrentes de l'exemple précédent : si le mineur a choisi de prendre une transaction dans le nouveau bloc miné, alors la seconde est automatiquement rejetée de la mempool."
          : "Remember the two competing transactions from the previous example: if the miner chose to include one of them in the newly mined block, then the other is automatically rejected from the mempool."}
      </p>

      <MempoolVisual variant="resolution" />

      <p>
        {fr ? (
          <>
            Et là je te vois venir : « Que se passe-t-il si deux mineurs trouvent en même temps un
            hash valide ? » <br />
            Très bonne question.
          </>
        ) : (
          <>
            And here I see what's coming: « What happens if two miners find a valid hash at the same
            time? » <br />
            Great question.
          </>
        )}
      </p>

      <Callout
        title={
          fr
            ? "Le cas subtil : deux chaînes concurrentes (ou plus)"
            : "The subtle case: two (or more) competing chains"
        }
      >
        <p>
          {fr
            ? "Il est possible qu'un mineur valide un bloc en même temps qu'un autre : le réseau se retrouve alors avec deux versions concurrentes."
            : "It's possible that one miner validates a block at the same time as another: the network then ends up with two competing versions."}
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
              La règle du consensus est sans ambiguïté : le réseau conserve la chaîne qui a accumulé
              le plus de travail cumulé (pas la plus longue en nombre de blocs, mais celle dont la
              difficulté totale est la plus élevée) .
            </>
          ) : (
            <>
              The consensus rule is unambiguous: the network keeps the chain that has accumulated
              the most cumulative work (not the longest in number of blocks, but the one with the
              highest total difficulty) .
            </>
          )}
        </p>

        <p>
          {fr
            ? "Autrement dit : les mineurs continuent de construire sur le bloc qu'ils ont reçu en premier, une chaîne prend de l'avance et l'autre est naturellement abandonnée"
            : "In other words: miners keep building on the block they received first, one chain pulls ahead, and the other is naturally abandoned"}
          .
        </p>
      </Callout>

      <p>
        {fr
          ? "Avant de boucler ce chapitre, un dernier point : la cible de difficulté."
          : "Before wrapping up this chapter, one last point: the difficulty target."}
      </p>

      <Callout
        title={
          fr
            ? "Le réglage de la difficulté comme une horloge numérique"
            : "Difficulty adjustment as a digital clock"
        }
      >
        <p>
          {fr
            ? "La cible de difficulté n'est pas un choix arbitraire."
            : "The difficulty target is not an arbitrary choice."}
        </p>
        <p>
          {fr ? (
            <>
              Elle s'ajuste tous les 2016 blocs (~2 semaines) de façon à ce qu'un bloc soit miné
              toutes les 10 minutes .
            </>
          ) : (
            <>
              It adjusts every 2016 blocks (~2 weeks) so that a block is mined roughly every 10
              minutes .
            </>
          )}
        </p>

        <DifficultyAdjustment />
      </Callout>

      <p>
        {fr ? (
          <>
            Voilà. La preuve de travail résout deux choses d'un coup : les conflits sans autorité
            centrale, et la transformation de l'énergie en confiance .
          </>
        ) : (
          <>
            That's it. Proof of Work solves two problems at once: resolving conflicts without a
            central authority, and transforming energy into trust .
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
            But why do miners spend so much energy to participate? <br />
            On to the next chapter:{" "}
            <Reference to={ROUTE_NAME.Bitcoin_5}>the reward and the halving</Reference>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
