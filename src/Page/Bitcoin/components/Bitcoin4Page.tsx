import { type FC } from "react";

import { Callout, Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  ByzantineGenerals,
  DifficultyAdjustment,
  getQuizDataByzantine,
  MempoolVisual,
  MiningSimulator,
  Quiz,
} from "../../../Interactive";
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
            Dans un système centralisé, la réponse est simple : une autorité tranche.{" "}
            <Emphasis>Mais ici, il n'y en a pas</Emphasis>.
          </>
        ) : (
          <>
            In a centralized system, the answer is simple: an authority decides.{" "}
            <Emphasis>But here, there is none</Emphasis>.
          </>
        )}
      </p>

      <Callout title={fr ? "Le problème des généraux byzantins" : "The Byzantine Generals Problem"}>
        <p>
          {fr ? (
            <>
              Plusieurs généraux encerclent une ville. Ils doivent se coordonner et choisir une
              tactique : <i>attaquer</i> ou <i>battre en retraite</i>.
            </>
          ) : (
            <>
              Several generals surround a city. They must coordinate and choose a tactic:{" "}
              <i>attack</i> or <i>retreat</i>.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Mais ils communiquent uniquement par messagers qui peuvent être retardés, perdus ou corrompus."
            : "But they communicate only through messengers who can be delayed, lost, or corrupted."}
        </p>
        <p>
          {fr
            ? "Si certains généraux attaquent et que d'autres reculent, c'est la défaite assurée faute de coordination."
            : "If some generals attack while others retreat, defeat is certain due to lack of coordination."}
        </p>
        <p>
          {fr ? (
            <>
              C'est ça, le problème des généraux byzantins :{" "}
              <Emphasis>
                comment être sûr que tout le monde prendra la même décision, sans se faire confiance
                ?
              </Emphasis>
            </>
          ) : (
            <>
              That is the Byzantine Generals Problem:{" "}
              <Emphasis>
                how can we be sure everyone will make the same decision, without trusting one
                another?
              </Emphasis>
            </>
          )}
        </p>

        <ByzantineGenerals />

        <p>
          {fr
            ? "Bitcoin fait face au même problème : comment s'accorder sur l'état complet du registre de la blockchain, sans autorité centrale ?"
            : "Bitcoin faces the same problem: how do we agree on the full state of the blockchain ledger, without a central authority?"}
        </p>
      </Callout>

      <Quiz {...getQuizDataByzantine(language)} onCorrectAnswer={() => {}} />

      <p>
        {fr
          ? "Regardons exactement comment Bitcoin résout élégamment ce problème. Pour cela, on va voir successivement :"
          : "Let's see exactly how Bitcoin elegantly solves this problem. To do so, we'll go through, in order:"}
        <ol>
          <li>{fr ? "La mempool" : "The mempool"}</li>
          <li>{fr ? "Le fonctionnement du minage" : "How mining works"}</li>
          <li>{fr ? "Et la formation du consensus" : "And how consensus is reached"}</li>
        </ol>
      </p>

      <Callout title={fr ? "Memory Pool ou salle d'attente" : "Memory Pool: the waiting room"}>
        <p>
          {fr ? (
            <>
              Quand une transaction est soumise au réseau Bitcoin, elle n'est pas immédiatement
              validée. <Emphasis>Elle entre dans une salle d'attente appelée « mempool »</Emphasis>.
            </>
          ) : (
            <>
              When a transaction is submitted to the Bitcoin network, it is not immediately
              validated. <Emphasis>It enters a waiting room called the "mempool"</Emphasis>.
            </>
          )}
        </p>

        <p>
          {fr ? (
            <>
              Chaque nœud du réseau maintient sa propre mempool : elle contient les transactions
              valides, mais pas encore confirmées, et{" "}
              <Emphasis>potentiellement... en conflit</Emphasis>.
            </>
          ) : (
            <>
              Each node on the network maintains its own mempool: it contains valid but
              not-yet-confirmed transactions, and{" "}
              <Emphasis>potentially... conflicting ones</Emphasis>.
            </>
          )}
        </p>

        <p>
          {fr
            ? "Oui, tu as bien lu. Deux transactions contradictoires peuvent coexister temporairement :"
            : "Yes, you read that right. Two contradictory transactions can coexist temporarily:"}
          <ul>
            <li>
              <i>{fr ? "Alice envoie 1 BTC à Bob" : "Alice sends 1 BTC to Bob"}</i>
            </li>
            <li>
              <i>
                {fr ? "Alice envoie le même BTC à Charlie" : "Alice sends the same BTC to Charlie"}
              </i>
            </li>
          </ul>
        </p>

        <p>
          {fr ? (
            <>
              Les deux peuvent circuler en parallèle dans le réseau :{" "}
              <Emphasis>à ce stade, aucun consensus n'existe encore</Emphasis>.
            </>
          ) : (
            <>
              Both can circulate in parallel across the network:{" "}
              <Emphasis>at this stage, no consensus exists yet</Emphasis>.
            </>
          )}
        </p>

        <MempoolVisual variant="intro" />
      </Callout>

      <p>
        {fr
          ? "C'est ici que les mineurs entrent en jeu. Leur rôle :"
          : "This is where miners come in. Their role:"}
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
      </p>
      <p>
        {fr ? (
          <>
            Mais attention : tout le monde peut proposer un bloc. Alors{" "}
            <Emphasis>comment décider qui a le droit d'écrire la prochaine page ?</Emphasis> <br />
            La réponse est simple : <Emphasis>le premier à trouver la solution gagne</Emphasis>.
          </>
        ) : (
          <>
            But careful: anyone can propose a block. So{" "}
            <Emphasis>how do we decide who gets to write the next page?</Emphasis> <br />
            The answer is simple: <Emphasis>The first to find the solution wins</Emphasis>.
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
              <Emphasis>Juste de la puissance de calcul : du travail computationnel</Emphasis>.
            </>
          ) : (
            <>
              It's pure trial and error. <br />
              No trick. No magic optimization.
              <br />
              <Emphasis>Just raw computing power: computational work</Emphasis>.
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
            <>
              C'est ce que l'on appelle un <Emphasis>fork temporaire</Emphasis>.
            </>
          ) : (
            <>
              This is what's called a <Emphasis>temporary fork</Emphasis>.
            </>
          )}
        </p>

        <p>
          {fr ? (
            <>
              La règle du consensus est sans ambiguïté :{" "}
              <Emphasis>
                le réseau conserve la chaîne qui a accumulé le plus de travail cumulé (pas la plus
                longue en nombre de blocs, mais celle dont la difficulté totale est la plus élevée)
              </Emphasis>
              .
            </>
          ) : (
            <>
              The consensus rule is unambiguous:{" "}
              <Emphasis>
                the network keeps the chain that has accumulated the most cumulative work (not the
                longest in number of blocks, but the one with the highest total difficulty)
              </Emphasis>
              .
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
              <Emphasis>
                Elle s'ajuste tous les 2016 blocs (~2 semaines) de façon à ce qu'un bloc soit miné
                toutes les 10 minutes
              </Emphasis>
              .
            </>
          ) : (
            <>
              <Emphasis>
                It adjusts every 2016 blocks (~2 weeks) so that a block is mined roughly every 10
                minutes
              </Emphasis>
              .
            </>
          )}
        </p>

        <DifficultyAdjustment />
      </Callout>

      <p>
        {fr ? (
          <>
            Voilà. La preuve de travail résout deux choses d'un coup :{" "}
            <Emphasis>
              les conflits sans autorité centrale, et la transformation de l'énergie en confiance
            </Emphasis>
            .
          </>
        ) : (
          <>
            That's it. Proof of Work solves two problems at once:{" "}
            <Emphasis>
              resolving conflicts without a central authority, and transforming energy into trust
            </Emphasis>
            .
          </>
        )}
      </p>

      <p>
        {fr ? (
          <>
            Mais pourquoi des mineurs dépensent-ils autant d'énergie pour participer ? <br />
            Direction le prochain chapitre : <Emphasis>la récompense et le halving</Emphasis>.
          </>
        ) : (
          <>
            But why do miners spend so much energy to participate? <br />
            On to the next chapter: <Emphasis>the reward and the halving</Emphasis>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
