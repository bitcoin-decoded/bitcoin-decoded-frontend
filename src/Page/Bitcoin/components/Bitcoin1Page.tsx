import { type CSSProperties, type FC } from "react";

import {
  Bitcoin,
  Blocks,
  Cpu,
  Laptop,
  Monitor,
  Pickaxe,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

import { Callout, Disclosure, IdentityCard, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BitcoinNetworkMap, BitcoinNodeDemo } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PAGE_STYLES, PageTemplate } from "../../Shared/";

export const Bitcoin1Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  const cardWrapperStyle: CSSProperties = {
    flex: "1 1 300px",
    maxWidth: "25rem",
    minWidth: "17.5rem",
    display: "flex",
    flexDirection: "column",
  };

  // Same row as PAGE_STYLES.cardsContainer, but stretched so the two cards
  // share a uniform height (paired with each card's fillHeight).
  const cardsRowStyle: CSSProperties = {
    ...PAGE_STYLES.cardsContainer,
    alignItems: "stretch",
  };

  const charIconProps = { size: 15, strokeWidth: 2 } as const;

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
          : "Explaining Bitcoin in a simple yet complete way isn't easy: it's a tricky object to approach because it touches on so many different topics."}
      </p>
      <p>{fr ? "Bitcoin est trois choses à la fois :" : "Bitcoin is three things at once:"}</p>
      <ol>
        <li>{fr ? "Un logiciel" : "A piece of software"}</li>
        <li>{fr ? "Un réseau" : "A network"}</li>
        <li>{fr ? "Et une monnaie" : "And a currency"}</li>
      </ol>
      <p>
        {fr
          ? "Ensemble, ces éléments constituent l'essence de Bitcoin, c'est-à-dire une infrastructure publique de paiement."
          : "Together, these pieces form the essence of Bitcoin: a public payment infrastructure."}
      </p>
      <p>
        {fr ? (
          <>
            Cette infrastructure change la donne : elle permet à n'importe qui, n'importe où et
            n'importe quand de pouvoir envoyer ou de recevoir de la valeur. Sans discrimination.
            Sans tiers de confiance. Uniquement de pair-à-pair au sein d'un réseau décentralisé.
          </>
        ) : (
          <>
            This infrastructure changes the picture: it lets anyone, anywhere, at any time, send or
            receive value. Without discrimination. Without any trusted third party. Purely
            peer-to-peer, inside a decentralized network.
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
            "OK, sounds nice, but how does it actually work?" you're probably asking. <br />
            And you're right to ask. That's exactly what you're about to see.
          </>
        )}
      </p>

      <Callout
        title={fr ? "Comment ça fonctionne - Les nœuds simples" : "How it works - Simple nodes"}
      >
        <p>
          {fr
            ? "Bitcoin est un logiciel libre et gratuit qui tourne sur un ordinateur. N'importe qui peut en lire le code, le modifier, le faire tourner."
            : "Bitcoin is a free and open-source software that runs on a computer. Anyone can read the code, modify it, run it."}
        </p>
        <p>
          {fr
            ? "Et ce logiciel permet d'avoir en quelque sorte des super-pouvoirs :"
            : "And this software gives you a kind of superpower:"}
        </p>
        <ul>
          <li>
            {fr ? (
              <span>
                Accès à l'historique de toutes les transactions qui ont eu lieu sur le réseau depuis
                le départ, c'est-à-dire un grand livre de comptes appelé{" "}
                <Reference to={ROUTE_NAME.Bitcoin_3}>
                  <i>blockchain</i>
                </Reference>
                .
              </span>
            ) : (
              <span>
                Access to the full history of every transaction that ever happened on the network -
                a ledger called the{" "}
                <Reference to={ROUTE_NAME.Bitcoin_3}>
                  <i>blockchain</i>
                </Reference>
                .
              </span>
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
              : "And the ability to enforce the rules by spotting any malicious actor."}
          </li>
        </ul>

        <p>
          {fr ? (
            <span>
              En utilisant ce logiciel, on devient un acteur à part entière du réseau Bitcoin,
              appelé <i>nœud</i>.
            </span>
          ) : (
            <span>
              By running this software, you become a full participant in the Bitcoin network, called
              a <i>node</i>.
            </span>
          )}
        </p>
        <BitcoinNodeDemo />
      </Callout>
      <p>
        {fr
          ? "Et le réseau Bitcoin, ce n'est rien de plus que plusieurs nœuds connectés entre eux."
          : "And the Bitcoin network is nothing more than a bunch of nodes connected to each other."}
      </p>
      <BitcoinNetworkMap />
      <p>{fr ? "Il existe plusieurs types de nœuds :" : "There are several types of nodes:"}</p>
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

      <Callout
        title={fr ? "Comment ça fonctionne - Les nœuds-mineurs" : "How it works - Mining nodes"}
      >
        <p>
          {fr ? (
            <>
              Les nœuds-mineurs sont des nœuds comme les autres, mais avec un super-pouvoir en plus.
            </>
          ) : (
            <>Mining nodes are regular nodes, but with one extra superpower.</>
          )}
        </p>
        <p>
          {fr ? (
            <>
              En plus de stocker et vérifier les transactions, ils participent à une compétition
              permanente : ils utilisent leur puissance de calcul pour résoudre un calcul difficile
              à résoudre, mais simple à vérifier, appelé{" "}
              <Reference to={ROUTE_NAME.Bitcoin_4}>
                <i>preuve de travail</i>
              </Reference>
              .
            </>
          ) : (
            <>
              On top of storing and verifying transactions, they enter a permanent race: they use
              their computing power to solve a calculation that's hard to crack but easy to check,
              called{" "}
              <Reference to={ROUTE_NAME.Bitcoin_4}>
                <i>proof of work</i>
              </Reference>
              .
            </>
          )}
        </p>
        <p>
          {fr
            ? "Le premier mineur qui trouve la solution gagne deux choses :"
            : "The first miner to find the solution wins two things:"}
        </p>
        <ol>
          <li>
            {fr ? (
              <>Le droit d'ajouter une nouvelle page au grand livre de comptes.</>
            ) : (
              <>The right to add a new page to the ledger.</>
            )}
          </li>

          <li>
            {fr ? (
              <>
                Une récompense en bitcoin composée de deux parts : les nouveaux bitcoins créés par
                le protocole (la seule façon dont de nouveaux bitcoins entrent en circulation) et
                les frais des transactions incluses dans le bloc.
              </>
            ) : (
              <>
                A bitcoin reward made of two parts: the new bitcoins created by the protocol (the
                only way new bitcoins enter circulation) and the fees from the transactions included
                in the block.
              </>
            )}
          </li>
        </ol>
        <Disclosure title={fr ? "Note d'attention" : "A word of caution"}>
          {fr ? (
            <p>
              La création de nouveaux bitcoins n'est pas illimitée : elle est divisée par deux tous
              les quatre ans environ et s'arrêtera définitivement à 21 millions de bitcoins au
              total. Cette mécanique fondamentale a un nom et tout un chapitre dédié :{" "}
              <Reference to={ROUTE_NAME.Bitcoin_5}>le halving</Reference>.
            </p>
          ) : (
            <p>
              The creation of new bitcoins isn't unlimited: it's cut in half roughly every four
              years and will stop for good at a total of 21 million bitcoins. This core mechanic has
              a name, and a chapter of its own:{" "}
              <Reference to={ROUTE_NAME.Bitcoin_5}>the halving</Reference>.
            </p>
          )}
        </Disclosure>
      </Callout>

      <p>
        {fr ? (
          <>
            Une fois qu'un mineur a trouvé la solution et proposé un nouveau bloc, celui-ci est
            diffusé à l'ensemble du réseau.
          </>
        ) : (
          <>
            Once a miner finds the solution and proposes a new block, it gets broadcast to the
            entire network.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Les nœuds simples entrent alors en action : chacun d'entre eux vérifie indépendamment que le bloc respecte toutes les règles :"
          : "Simple nodes then step in: each one independently checks that the block follows every rule:"}
      </p>
      <ul>
        <li>{fr ? "Les transactions sont-elles valides ?" : "Are the transactions valid?"}</li>

        <li>
          {fr
            ? "Le problème mathématique a-t-il bien été résolu ?"
            : "Was the calculation properly solved?"}
        </li>

        <li>{fr ? "Aucune règle n'a-t-elle été enfreinte ?" : "Was any rule broken?"}</li>
      </ul>
      <p>
        {fr ? (
          <>
            Et si tout est conforme, le nœud ajoute cette nouvelle page à son propre exemplaire du
            grand livre de comptes. Sinon, le bloc est purement et simplement rejeté.
          </>
        ) : (
          <>
            If everything checks out, the node adds this new page to its own copy of the ledger.
            Otherwise, the block is plainly and simply rejected.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est cette vérification collective et indépendante qui rend Bitcoin si robuste :
            personne ne fait confiance à personne, mais tout le monde vérifie tout.
          </>
        ) : (
          <>
            This collective, independent verification is what makes Bitcoin so robust: nobody trusts
            anyone, but everyone verifies everything.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Pour récapituler, voici les deux acteurs du réseau :"
          : "To recap, here are the two players in the network:"}
      </p>
      <div style={cardsRowStyle}>
        <div style={cardWrapperStyle}>
          <IdentityCard
            compact
            fillHeight
            name={fr ? "Nœud simple" : "Simple node"}
            profile={fr ? "Le gardien des règles" : "The rule keeper"}
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
                icon: <ScrollText {...charIconProps} />,
                label: fr ? "Son rôle :" : "Its role:",
                value: fr
                  ? "Stocker une copie complète de la blockchain et vérifier que chaque transaction et chaque bloc respectent les règles du protocole."
                  : "Store a complete copy of the blockchain and check that every transaction and every block follows the protocol's rules.",
              },
              {
                icon: <ShieldCheck {...charIconProps} />,
                label: fr ? "Son super-pouvoir :" : "Its superpower:",
                value: fr
                  ? "Rejeter tout bloc invalide, même s'il provient du mineur le plus puissant du monde."
                  : "Reject any invalid block, even from the most powerful miner on Earth.",
              },
              {
                icon: <Laptop {...charIconProps} />,
                label: fr ? "Accessible à tous :" : "Within reach of anyone:",
                value: fr
                  ? "Un simple ordinateur et une connexion internet suffisent pour en faire tourner un."
                  : "A regular computer and an internet connection are all it takes to run one.",
              },
            ]}
          />
        </div>
        <div style={cardWrapperStyle}>
          <IdentityCard
            compact
            fillHeight
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
                icon: <Blocks {...charIconProps} />,
                label: fr ? "Son rôle :" : "Its role:",
                value: fr
                  ? "Proposer un nouveau bloc rempli de transactions en résolvant ce calcul le premier."
                  : "Propose a new block full of transactions by being the first to solve that calculation.",
              },
              {
                icon: <Bitcoin {...charIconProps} />,
                label: fr ? "Son super-pouvoir :" : "Its superpower:",
                value: fr
                  ? "Créer de nouveaux bitcoins à chaque bloc validé, en quantité qui diminue de moitié tous les quatre ans environ, jusqu'à un plafond total de 21 millions."
                  : "Create new bitcoins with every validated block, in an amount that gets cut in half roughly every four years, up to a total cap of 21 million.",
              },
              {
                icon: <Cpu {...charIconProps} />,
                label: fr ? "Ce qu'il faut :" : "What it takes:",
                value: fr
                  ? "Du matériel de calcul spécialisé (ASIC) et de l'électricité à moindre coût pour que cela soit rentable."
                  : "Specialized computing hardware (ASIC) and cheap electricity to make it profitable.",
              },
            ]}
          />
        </div>
      </div>

      <p>
        {fr
          ? "Voilà, tu comprends maintenant les grandes fondations de Bitcoin : un réseau décentralisé où des nœuds gardent les règles et des mineurs sécurisent le système en échange de bitcoin."
          : "There you have it. You now grasp the foundations of Bitcoin: a decentralized network where nodes keep the rules and miners secure the system in exchange for bitcoin."}
      </p>
      <p>
        {fr
          ? "Aucune banque pour valider les transactions. Aucun gouvernement pour faire tourner le réseau. Aucun intermédiaire pour autoriser ton paiement. Juste du code, de l'électricité et des maths."
          : "No bank to validate the transactions. No government to run the network. No middleman to authorize your payment. Just code, electricity, and math."}
      </p>
      <p>
        {fr ? (
          <>
            Mais une question essentielle reste en suspens : pourquoi tout cela est-il si important
            ?
            <br />
            Pourquoi l'humanité aurait-elle besoin d'une monnaie que personne ne contrôle ?
          </>
        ) : (
          <>
            But one crucial question still hangs in the air: why does all of this matter?
            <br />
            Why would humanity need a currency that nobody controls?
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Pour le comprendre, il va falloir revenir sur les crises qui ont façonné notre époque et
            découvrir ce que Bitcoin propose comme alternative.{" "}
            <Reference to={ROUTE_NAME.Bitcoin_2}>Satoshi, nous voici !</Reference>
          </>
        ) : (
          <>
            To understand it, we'll have to revisit the crises that shaped our era and discover what
            Bitcoin brings to the table.{" "}
            <Reference to={ROUTE_NAME.Bitcoin_2}>Satoshi, here we come!</Reference>
          </>
        )}
      </p>
    </PageTemplate>
  );
};
