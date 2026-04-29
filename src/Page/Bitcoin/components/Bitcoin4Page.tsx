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
import { PageTemplate } from "../../Shared/components";

export const Bitcoin4Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.proofOfWork")}
      prelude={
        fr
          ? "La preuve de travail est un mécanisme de consensus basé sur une compétition computationnelle entre mineurs, qui repose sur une cible de difficulté et un nonce pour trouver un hash valide. Cet ingénieux dispositif rend toute réécriture de l'historique économiquement prohibitive, permet une vérification simple et rapide du travail effectué, et résout le problème de la double dépense dans les systèmes distribués."
          : "Proof of work is a consensus mechanism based on a computational competition between miners, relying on a difficulty target and a nonce to find a valid hash. This ingenious mechanism makes any attempt to rewrite history economically prohibitive, allows simple and fast verification of the work performed, and solves the double-spending problem in distributed systems."
      }
    >
      <p>
        {fr
          ? "Imaginez un réseau mondial où personne ne se connaît, personne ne fait confiance à personne. Et pourtant, tout le monde doit être d'accord sur une seule version du registre."
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
          ? "Voyons exactement comment Bitcoin résout élégamment ce problème. Pour cela, nous allons voir successivement :"
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
            ? "Oui, vous avez bien lu. Deux transactions contradictoires peuvent coexister temporairement :"
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
            ? "Le mineur construit l'en-tête de son bloc et le passe dans une fonction de hachage."
            : "The miner builds the header of their block and runs it through a hash function."}
        </p>
        <p>
          {fr
            ? "Le but est d'obtenir un hash inférieur à une cible fixée par le réseau. Concrètement, cela revient à produire un hash avec un certain nombre de zéros au début."
            : "The goal is to produce a hash lower than a target set by the network. Concretely, that means producing a hash with a certain number of leading zeros."}
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
            ? "Vous voulez miner un bloc ? Allez-y, la compétition est ouverte à toutes et à tous !"
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
          ? "Rappelez-vous des deux transactions concurrentes de l'exemple précédent : si le mineur a choisi de prendre une transaction dans le nouveau bloc miné, alors la seconde est automatiquement rejetée de la mempool."
          : "Remember the two competing transactions from the previous example: if the miner chose to include one of them in the newly mined block, then the other is automatically rejected from the mempool."}
      </p>

      <MempoolVisual variant="resolution" />

      <p>
        {fr ? (
          <>
            Et là je vous vois venir : « Que se passe t-il si deux mineurs trouve en même temps un
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
              La règle du consensus est sans ambiguité :{" "}
              <Emphasis>le réseau conserve la chaîne qui a accumulé le plus de travail</Emphasis>.
            </>
          ) : (
            <>
              The consensus rule is unambiguous:{" "}
              <Emphasis>the network keeps the chain that has accumulated the most work</Emphasis>.
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
          ? "Avant de terminer sur ce chapitre assez dense mais fondamental, il faut revenir sur la cible de difficulté."
          : "Before wrapping up this dense but fundamental chapter, we need to come back to the difficulty target."}
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
            En conclusion, la preuve de travail réalise une double prouesse,{" "}
            <Emphasis>
              en résolvant les conflits sans autorité centrale et en transformant l'énergie en
              confiance
            </Emphasis>
            .
          </>
        ) : (
          <>
            In conclusion, proof of work achieves a double feat:{" "}
            <Emphasis>
              resolving conflicts without a central authority and turning energy into trust
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
