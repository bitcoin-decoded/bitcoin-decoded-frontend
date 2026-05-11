import { type CSSProperties, type FC } from "react";

import { Monitor, Pickaxe } from "lucide-react";

import { Callout, Emphasis, IdentityCard } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BitcoinNetworkMap, BitcoinNodeDemo } from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";
import { PAGE_STYLES } from "../../Shared/styles";

export const Bitcoin1Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  const cardWrapperStyle: CSSProperties = {
    flex: "1 1 300px",
    maxWidth: "25rem",
    minWidth: "17.5rem",
  };

  return (
    <PageTemplate
      title={t("nav.tree.howBitcoinWorks")}
      prelude={
        fr ? (
          <>
            Bitcoin est trois choses à la fois : un logiciel, un réseau, une monnaie. Trois mots
            simples. Et pourtant, expliquer comment ces trois choses tiennent ensemble, sans aucune
            banque, aucun gouvernement, personne aux commandes, c'est là que la plupart des
            explications dérapent. On va essayer de ne pas déraper.
          </>
        ) : (
          <>
            Bitcoin is three things at once: software, a network, and a currency. Three simple
            words. And yet, explaining how these three pieces hold together, without any bank, any
            government, anyone in charge, is where most explanations fall apart. Let's try not to
            fall apart.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Expliquer Bitcoin de façon simple et complète n'est pas si facile, tant c'est un objet compliqué à approcher parce qu'il couvre beaucoup de sujets différents."
          : "Explaining Bitcoin in a simple yet complete way is not that easy, as it is a complex object that covers many different topics."}
      </p>
      <p>
        {fr ? "Bitcoin est trois choses à la fois :" : "Bitcoin is three things at once:"}
        <ol>
          <li>{fr ? "Un logiciel" : "A software"}</li>
          <li>{fr ? "Un réseau" : "A network"}</li>
          <li>{fr ? "Et une monnaie" : "And a currency"}</li>
        </ol>
        {fr ? (
          <>
            Ensemble, ces éléments constituent l'essence de Bitcoin, c'est-à-dire{" "}
            <Emphasis>une infrastructure publique de paiement</Emphasis>.
          </>
        ) : (
          <>
            Together, these elements form the essence of Bitcoin, that is{" "}
            <Emphasis>a public payment infrastructure</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Cette infrastructure change la donne :{" "}
            <Emphasis>
              elle permet à n'importe qui, n'importe où et n'importe quand de pouvoir envoyer ou de
              recevoir de la valeur. Sans discrimination. Sans tiers de confiance. Uniquement de
              pair-à-pair au sein d'un réseau décentralisé.
            </Emphasis>
          </>
        ) : (
          <>
            This infrastructure changes the picture:{" "}
            <Emphasis>
              it allows anyone, anywhere, at any time, to send or receive value. Without
              discrimination. Without a trusted third party. Purely peer-to-peer within a
              decentralized network.
            </Emphasis>
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            « Ok c'est bien, mais concrètement comment ça fonctionne ? » me demanderas-tu. <br />
            Et t'as bien raison de demander, c'est précisément ce que tu vas voir maintenant.
          </>
        ) : (
          <>
            "OK, that's great, but how does it actually work?" you might ask. <br />
            And you're right to ask - that's precisely what we're about to explore.
          </>
        )}
      </p>

      <Callout
        title={
          fr ? "Comment ça fonctionne - Les nœuds simples" : "How does it works - Simple nodes"
        }
      >
        <p>
          {fr ? (
            <>
              {fr && "Bitcoin est un "}
              <Emphasis>logiciel public et gratuit </Emphasis>qui tourne sur un ordinateur.
            </>
          ) : (
            <>
              Bitcoin is a <Emphasis>free and open-source software</Emphasis> that runs on a
              computer.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Et ce logiciel permet d'avoir en quelque sorte des super-pouvoirs :"
            : "And this software grants you a kind of superpower:"}
          <ul>
            <li>
              {fr ? (
                <>
                  Accès à l'historique de toutes les transactions qui ont eu lieu sur le réseau
                  depuis le départ, c'est-à-dire{" "}
                  <Emphasis>
                    un grand livre de comptes appelé <i>blockchain</i>
                  </Emphasis>
                  .
                </>
              ) : (
                <>
                  Access to the full history of every transaction that ever occurred on the network
                  - a{" "}
                  <Emphasis>
                    ledger called the <i>blockchain</i>
                  </Emphasis>
                  .
                </>
              )}
            </li>
            <li>
              {fr
                ? "Synchronisation avec ce grand livre de comptes en temps réel."
                : "Real-time synchronization with this ledger."}
            </li>
            <li>
              {fr
                ? "Et capacité de veiller à la bonne application des règles en détectant d'éventuels acteurs malveillants."
                : "And the ability to enforce the rules by detecting any malicious actors."}
            </li>
          </ul>
          <p>
            {fr ? (
              <>
                <Emphasis>
                  En utilisant ce logiciel, on devient un acteur à part entière du réseau Bitcoin,
                  appelé <i>nœud</i>
                </Emphasis>
                .
              </>
            ) : (
              <>
                <Emphasis>
                  By running this software, you become a full participant in the Bitcoin network,
                  called a <i>node</i>
                </Emphasis>
                .
              </>
            )}
          </p>
        </p>
        <BitcoinNodeDemo />
      </Callout>
      <p>
        {fr
          ? "Et le réseau Bitcoin, ce n'est rien de plus que plusieurs nœuds connectés entre eux."
          : "And the Bitcoin network is nothing more than a set of interconnected nodes."}
      </p>
      <BitcoinNetworkMap />
      <p>
        {fr ? "Il existe plusieurs types de nœuds :" : "There are several types of nodes:"}
        <ul>
          <li>
            {fr
              ? "Les nœuds simples (ceux que tu viens tout juste de voir)."
              : "Simple nodes (the ones you just saw)."}
          </li>
          <li>
            {fr
              ? "Et les nœuds-mineurs (ceux que tu vas découvrir dès maintenant)."
              : "And mining nodes (the ones you're about to discover)."}
          </li>
        </ul>
      </p>

      <Callout
        title={
          fr ? "Comment ça fonctionne - Les nœuds-mineurs" : "How does it works - Mining nodes"
        }
      >
        <p>
          {fr ? (
            <>
              Les nœuds-mineurs sont des nœuds comme les autres, mais avec{" "}
              <Emphasis>un super-pouvoir en plus</Emphasis>.
            </>
          ) : (
            <>
              Mining nodes are regular nodes, but with <Emphasis>an extra superpower</Emphasis>.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              En plus de stocker et vérifier les transactions, ils participent à une compétition
              permanente : ils utilisent leur puissance de calcul pour{" "}
              <Emphasis>
                résoudre un problème mathématique complexe appelé <i>preuve de travail</i>
              </Emphasis>
              .
            </>
          ) : (
            <>
              On top of storing and verifying transactions, they compete in a permanent race: they
              use their computing power to{" "}
              <Emphasis>
                solve a complex mathematical problem called <i>proof of work</i>
              </Emphasis>
              .
            </>
          )}
        </p>
        <p>
          {fr
            ? "Le premier mineur qui trouve la solution gagne deux choses :"
            : "The first miner to find the solution wins two things:"}
          <ol>
            <li>
              {fr ? (
                <>
                  <Emphasis>Le droit d'ajouter une nouvelle page</Emphasis> au grand livre de
                  compte.
                </>
              ) : (
                <>
                  <Emphasis>The right to add a new page</Emphasis> to the ledger.
                </>
              )}
            </li>
            <li>
              {fr ? (
                <>
                  <Emphasis>Une récompense en bitcoin</Emphasis> composée de deux parts : les
                  nouveaux bitcoins créés par le protocole (la seule façon dont de nouveaux bitcoins
                  entrent en circulation) et les frais des transactions incluses dans le bloc.
                </>
              ) : (
                <>
                  A <Emphasis>Bitcoin reward</Emphasis> made up of two parts: newly created bitcoins
                  issued by the protocol (the only way new bitcoins enter circulation) and the
                  transaction fees included in the block.
                </>
              )}
            </li>
          </ol>
        </p>
      </Callout>

      <p>
        {fr ? (
          <>
            Une fois qu'un mineur a trouvé la solution et proposé un nouveau bloc, celui-ci est
            diffusé à l'ensemble du réseau.
          </>
        ) : (
          <>
            Once a miner finds the solution and proposes a new block, it is broadcast to the entire
            network.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            <Emphasis>Les nœuds simples entrent alors en action</Emphasis> : chacun d'entre eux
            vérifie indépendamment que le bloc respecte toutes les règles :
          </>
        ) : (
          <>
            <Emphasis>Simple nodes then step in</Emphasis>: each one independently verifies that the
            block follows all the rules:
          </>
        )}
        <ul>
          <li>{fr ? "Les transactions sont-elles valides ?" : "Are the transactions valid?"}</li>
          <li>
            {fr
              ? "Le problème mathématique a-t-il bien été résolu ?"
              : "Was the mathematical problem properly solved?"}
          </li>
          <li>{fr ? "Aucune règle n'a-t-elle été enfreinte ?" : "Were any rules broken?"}</li>
        </ul>
      </p>
      <p>
        {fr ? (
          <>
            Et si tout est conforme,{" "}
            <Emphasis>
              le nœud ajoute cette nouvelle page à son propre exemplaire du grand livre de comptes
            </Emphasis>
            . Sinon, le bloc est purement et simplement rejeté.
          </>
        ) : (
          <>
            If everything checks out,{" "}
            <Emphasis>the node adds this new page to its own copy of the ledger</Emphasis>.
            Otherwise, the block is simply rejected.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est cette vérification collective et indépendante qui rend Bitcoin si robuste :{" "}
            <Emphasis>
              personne ne fait confiance à personne, mais tout le monde vérifie tout
            </Emphasis>
            .
          </>
        ) : (
          <>
            This collective and independent verification is what makes Bitcoin so robust:{" "}
            <Emphasis>nobody trusts anyone, but everyone verifies everything</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Pour récapituler, voici les deux acteurs du réseau :"
          : "To recap, here are the two actors in the network:"}
      </p>
      <div style={PAGE_STYLES.cardsContainer}>
        <div style={cardWrapperStyle}>
          <IdentityCard
            name={fr ? "Nœud simple" : "Simple node"}
            profile={fr ? "Le gardien des règles" : "The rule guardian"}
            profilePicture={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Monitor size={48} strokeWidth={1.5} />
              </div>
            }
            characteristics={[
              {
                label: fr ? "Son rôle :" : "Its role:",
                value: fr
                  ? "Stocker une copie complète de la blockchain et vérifier que chaque transaction et chaque bloc respectent les règles du protocole."
                  : "Store a complete copy of the blockchain and verify that every transaction and block follows the protocol's rules.",
              },
              {
                label: fr ? "Son super-pouvoir :" : "Its superpower:",
                value: fr
                  ? "Rejeter tout bloc invalide, même s'il provient du mineur le plus puissant du monde."
                  : "Reject any invalid block, even from the most powerful miner in the world.",
              },
              {
                label: fr ? "Accessible à tous :" : "Accessible to all:",
                value: fr
                  ? "Un simple ordinateur et une connexion internet suffisent pour en faire tourner un."
                  : "A regular computer and an internet connection are all you need to run one.",
              },
            ]}
          />
        </div>
        <div style={cardWrapperStyle}>
          <IdentityCard
            name={fr ? "Nœud mineur" : "Mining node"}
            profile={fr ? "Le bâtisseur de blocs" : "The block builder"}
            profilePicture={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Pickaxe size={48} strokeWidth={1.5} />
              </div>
            }
            characteristics={[
              {
                label: fr ? "Son rôle :" : "Its role:",
                value: fr
                  ? "Proposer un nouveau bloc rempli de transactions en résolvant en premier un problème mathématique complexe."
                  : "Propose a new block filled with transactions by being the first to solve a complex mathematical problem.",
              },
              {
                label: fr ? "Son super-pouvoir :" : "Its superpower:",
                value: fr
                  ? "Créer de nouveaux bitcoins à chaque bloc validé."
                  : "Create new bitcoins with every validated block.",
              },
              {
                label: fr ? "Ce qu'il faut :" : "What it takes:",
                value: fr
                  ? "Du matériel de calcul spécialisé (ASIC) et de l'électricité à moindre coût pour que cela soit rentable."
                  : "Specialized computing hardware (ASIC) and low-cost electricity to make it profitable.",
              },
            ]}
          />
        </div>
      </div>

      <p>
        {fr
          ? "Voilà, tu comprends maintenant les grandes fondations de Bitcoin : un réseau décentralisé où des nœuds gardent les règles et des mineurs sécurisent le système en échange de bitcoin."
          : "There you have it, you now understand the foundations of Bitcoin: a decentralized network where nodes enforce the rules and miners secure the system in exchange for bitcoin."}
      </p>
      <p>
        {fr
          ? "Aucune banque. Aucun gouvernement. Aucun intermédiaire. Juste du code, de l'électricité et des maths."
          : "No banks. No governments. No intermediaries. Just code, electricity, and mathematics."}
      </p>
      <p>
        {fr ? (
          <>
            <Emphasis>
              Mais une question essentielle reste en suspens : pourquoi tout cela est-il si
              important ?
            </Emphasis>
            <br />
            Pourquoi l'humanité aurait-elle besoin d'une monnaie que personne ne contrôle ?
          </>
        ) : (
          <>
            <Emphasis>But a crucial question remains: why does all of this matter?</Emphasis>
            <br />
            Why would humanity need a currency that nobody controls?
          </>
        )}
      </p>
      <p>
        {fr
          ? "Pour le comprendre, il va falloir revenir sur les crises qui ont façonné notre époque et découvrir ce que Bitcoin propose comme alternative. Satoshi, nous voici !"
          : "To understand, we'll need to revisit the crises that shaped our era and discover what Bitcoin offers as an alternative. Satoshi, here we come!"}
      </p>
    </PageTemplate>
  );
};
