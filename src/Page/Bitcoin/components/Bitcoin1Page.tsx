import { type FC } from "react";

import { Callout, Disclosure, ReaderAside, Reference, useBreakpoint } from "../../../Design";
import synergyFr from "../../../Design/img/Simple-nodes-and-mining-nodes-synergy.webp";
import synergyEn from "../../../Design/img/Simple-nodes-and-mining-nodes-synergy_EN.webp";
import { useTranslation } from "../../../I18n";
import {
  BitcoinNetworkMap,
  BitcoinNodeDemo,
  Illustration,
  NodeSuperpowers,
  type Superpower,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";

import {
  DoodleBookPages,
  DoodleContentWrite,
  DoodleMining,
  DoodleNodeLaptop,
  DoodleShieldWall,
  DoodleSynchronize,
} from "@doodle";

export const Bitcoin1Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const isMobile = useBreakpoint() === "mobile";

  const powerIconSize = isMobile ? 26 : 30;
  const headerIconSize = isMobile ? 20 : 24;
  const synergyImg = fr ? synergyFr : synergyEn;

  // The three superpowers a simple node holds. Reused as a dimmed recall on the
  // mining side, where the fourth power is what actually gets highlighted.
  const nodePowers = (muted: boolean): Superpower[] => [
    {
      muted,
      icon: <DoodleBookPages size={powerIconSize} />,
      label: fr ? "Accès au registre" : "Ledger access",
      body: fr
        ? " Pouvoir n°1 : il connaît l'historique de toutes les transactions validées sur le réseau depuis le tout début. En quelque sorte, il est omniscient."
        : "Superpower #1: it has access to the complete history of all transactions confirmed on the network since day one. In a way, it is omniscient.",
    },
    {
      muted,
      icon: (
        <>
          <DoodleSynchronize size={powerIconSize} />
          <DoodleBookPages size={powerIconSize} />
        </>
      ),
      label: fr ? "Synchronisation" : "Synchronization",
      body: fr
        ? "Pouvoir n°2 : il est capable de se synchroniser en permanence avec le réseau pour connaître les dernières transactions validées."
        : "Superpower #2: it constantly stays synchronized with the network, keeping track of the latest validated transactions.",
    },
    {
      muted,
      icon: <DoodleShieldWall size={powerIconSize} />,
      label: fr ? "Sentinelle" : "Sentinel",
      body: fr
        ? "Pouvoir n°3 : il joue le rôle de sentinelle du réseau en vérifiant que les règles de Bitcoin sont respectées et en rejetant toute transaction invalide."
        : "Superpower #3: it acts as a network sentinel by checking that Bitcoin's rules are followed and rejecting any invalid transaction.",
    },
  ];

  // The fourth power is what a mining node adds: the right to write new
  // transactions into Bitcoin's history by winning the mining competition.
  const builderPower: Superpower = {
    highlight: true,
    icon: <DoodleContentWrite size={powerIconSize} />,
    label: fr ? "Écrire le registre" : "Write to the ledger",
    body: fr ? (
      <>
        <span style={{ display: "block" }}>
          Pouvoir n°4 : certains nœuds ont un pouvoir supplémentaire : ils peuvent ajouter de
          nouvelles transactions à l'historique de Bitcoin.
        </span>
        <span style={{ display: "block", marginTop: "0.85rem" }}>
          Ces nœuds particuliers sont appelés des mineurs. Pour obtenir ce droit, ils participent à
          une compétition.
        </span>
        <span style={{ display: "block", marginTop: "0.85rem" }}>
          Le premier mineur qui gagne la compétition a le droit d'ajouter les nouvelles transactions
          et reçoit une récompense en bitcoin. Génial non ?
        </span>
      </>
    ) : (
      <>
        <span style={{ display: "block" }}>
          Superpower #4: some nodes hold one extra power: they get to add brand-new transactions to
          Bitcoin's history.
        </span>
        <span style={{ display: "block", marginTop: "0.85rem" }}>
          These special nodes are called miners. To earn that right, they enter a competition.
        </span>
        <span style={{ display: "block", marginTop: "0.85rem" }}>
          The first miner to win it earns the right to add the new transactions, and pockets a
          bitcoin reward. Pretty neat, right?
        </span>
      </>
    ),
  };

  return (
    <PageTemplate title={t("nav.tree.howBitcoinWorks")}>
      <BlockReader chapterId={ROUTE_NAME.Bitcoin_1}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Bitcoin est trois choses à la fois : un logiciel, un réseau, une monnaie. Trois mots
                simples. Et pourtant, expliquer comment ces trois choses tiennent ensemble, sans
                aucune banque, aucun gouvernement, personne aux commandes, c'est là que la plupart
                des explications dérapent. On va essayer de ne pas déraper.
              </>
            ) : (
              <>
                Bitcoin is three things at once: software, a network, and a currency. Three simple
                words. And yet, explaining how these three pieces hold together, without any bank,
                any government, anyone in charge, is where most explanations fall apart. Let's try
                not to fall apart.
              </>
            )}
          </ChapterPrelude>
          <p>
            {fr ? (
              <>
                Un logiciel, un réseau, une monnaie. Ensemble, ça permet à n'importe qui, n'importe
                où et n'importe quand d'envoyer et de recevoir de la valeur. Sans aucun
                intermédiaire. Juste celui qui envoie, et celui qui reçoit.
              </>
            ) : (
              <>
                Software, a network, a currency. Together, they let anyone, anywhere, anytime send
                and receive value. No middleman. Just the one who sends, and the one who receives.
              </>
            )}
          </p>
        </Block>

        <Block>
          {({ markComplete }) => (
            <>
              <ReaderAside mode="question">
                {fr ? "Waouh, tout ça à la fois ?" : "Wow... it's all of that at once?"}
              </ReaderAside>
              <p>
                {fr
                  ? "Dans l'mille ! C'est justement pour cette raison qu'il y a tant de confusion quand on parle de Bitcoin. Laisse moi t'expliquer."
                  : "Bingo! That's exactly why Bitcoin can be so confusing at first. Let's break it down."}
              </p>
              <p>
                {fr
                  ? "Bitcoin est un logiciel libre et gratuit qui tourne sur un ordinateur. N'importe qui peut en lire le code, l'améliorer, le partager, le faire tourner."
                  : "Bitcoin is a free and open-source software that runs on a computer. Anyone can read the code, improve it, share it, run it."}
              </p>
              <p>
                {fr ? (
                  <span>
                    En utilisant ce logiciel tu deviens un acteur à part entière du réseau Bitcoin,
                    appelé <i>nœud</i>.
                  </span>
                ) : (
                  <span>
                    By running this software you become a full participant of the Bitcoin network,
                    called a <i>node</i>.
                  </span>
                )}
              </p>
              <BitcoinNodeDemo onComplete={markComplete} />
            </>
          )}
        </Block>

        <Block>
          <p>
            {fr
              ? "Le réseau Bitcoin, ce n'est rien de plus que plusieurs nœuds."
              : "And the Bitcoin network is nothing more than a bunch of nodes."}
          </p>
          <BitcoinNetworkMap />
          <p>
            {fr
              ? "Et tous ces nœuds connectés au réseau, ils permettent de faire circuler quoi ? Une monnaie appelée bitcoin."
              : "And what do all these nodes connected to the network make possible? The transfer of a currency called bitcoin."}
          </p>
          <p>
            {fr
              ? "Et voilà, les trois concepts sont calés."
              : "And there you go, the three concepts are now clear."}
          </p>
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <Callout
                title={fr ? "Comment fonctionnent les nœuds ?" : "How do Bitcoin nodes work?"}
              >
                <p>
                  {fr
                    ? "Tous les nœuds exécutent le même logiciel et appliquent les mêmes règles. Ensemble, ils font vivre le réseau Bitcoin, en le maintenant et en le faisant fonctionner."
                    : "All nodes run the same software and follow the same rules. Together, they keep the Bitcoin network alive by maintaining it and making it work."}
                </p>

                <NodeSuperpowers
                  title={
                    fr ? "Les superpouvoirs des nœuds simples" : "The superpowers of simple nodes"
                  }
                  icon={<DoodleNodeLaptop size={headerIconSize} />}
                  powers={nodePowers(false)}
                  onComplete={markComplete}
                />
              </Callout>
            </>
          )}
        </Block>

        <Block>
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
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <Callout
              title={
                fr ? "Comment ça fonctionne - Les nœuds-mineurs" : "How it works - Mining nodes"
              }
            >
              <p>
                {fr ? (
                  <>
                    Les nœuds-mineurs sont des nœuds comme les autres, mais avec un super-pouvoir en
                    plus.
                  </>
                ) : (
                  <>Mining nodes are regular nodes, but with one extra superpower.</>
                )}
              </p>

              <NodeSuperpowers
                title={
                  fr ? "Les superpouvoirs des nœuds-mineurs" : "The superpowers of mining nodes"
                }
                icon={<DoodleMining size={headerIconSize} />}
                powers={[...nodePowers(true), builderPower]}
                cta={t("nodeSuperpowers.ctaLast")}
                onComplete={markComplete}
              />

              <Disclosure title={fr ? "Note d'attention" : "A word of caution"}>
                {fr ? (
                  <p>
                    La création de nouveaux bitcoins n'est pas illimitée : elle est divisée par deux
                    tous les quatre ans environ et s'arrêtera définitivement à 21 millions de
                    bitcoins au total. Cette mécanique fondamentale a un nom et tout un chapitre
                    dédié : <Reference to={ROUTE_NAME.Bitcoin_5}>le halving</Reference>.
                  </p>
                ) : (
                  <p>
                    The creation of new bitcoins isn't unlimited: it's cut in half roughly every
                    four years and will stop for good at a total of 21 million bitcoins. This core
                    mechanic has a name, and a chapter of its own:{" "}
                    <Reference to={ROUTE_NAME.Bitcoin_5}>the halving</Reference>.
                  </p>
                )}
              </Disclosure>
            </Callout>
          )}
        </Block>

        <Block>
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
                Et si tout est conforme, le nœud ajoute cette nouvelle page à son propre exemplaire
                du grand livre de comptes. Sinon, le bloc est purement et simplement rejeté.
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
                This collective, independent verification is what makes Bitcoin so robust: nobody
                trusts anyone, but everyone verifies everything.
              </>
            )}
          </p>
          <Illustration
            src={synergyImg}
            alt={
              fr
                ? "Nœuds simples et nœuds-mineurs travaillant en synergie"
                : "Simple nodes and mining nodes working in synergy"
            }
            width="60%"
          />
        </Block>

        <Block last>
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
                Mais une question essentielle reste en suspens : pourquoi tout cela est-il si
                important ?
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
                Pour le comprendre, il va falloir revenir sur les crises qui ont façonné notre
                époque et découvrir ce que Bitcoin propose comme alternative.{" "}
                <Reference to={ROUTE_NAME.Bitcoin_2}>Satoshi, nous voici !</Reference>
              </>
            ) : (
              <>
                To understand it, we'll have to revisit the crises that shaped our era and discover
                what Bitcoin brings to the table.{" "}
                <Reference to={ROUTE_NAME.Bitcoin_2}>Satoshi, here we come!</Reference>
              </>
            )}
          </p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
