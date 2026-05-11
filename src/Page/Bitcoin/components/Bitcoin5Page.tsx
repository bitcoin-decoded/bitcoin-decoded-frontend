import { type FC } from "react";

import { Callout, Emphasis, HighlightText, Quote } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataHalving,
  HalvingChart,
  MiningRewardBlock,
  NetworkFlywheel,
  Quiz,
} from "../../../Interactive";
import { PageTemplate } from "../../Shared/";

export const Bitcoin5Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.rewardAndHalving")}
      prelude={
        fr
          ? "En 2009, miner un bloc rapportait 50 bitcoins. En 2026, c'est 3,125. En 2140, ce sera zéro. Ce n'est pas une dérive, c'est le plan depuis le départ."
          : "In 2009, mining a block earned 50 bitcoins. In 2026, it's 3.125. In 2140, it will be zero. This isn't a drift, it's been the plan from the very beginning."
      }
    >
      <p>
        {fr
          ? "Tu as vu la preuve de travail dans le chapitre précédent. Elle repose sur un effort important fourni par les mineurs."
          : "You saw proof of work, a mechanism that relies on significant effort from miners."}
      </p>
      <p>
        {fr ? (
          <>
            Pourquoi un tel travail ? Pas par pur altruisme, mais{" "}
            <Emphasis>parce que le protocole les récompense</Emphasis>.
          </>
        ) : (
          <>
            Why such effort? Not out of pure altruism, but{" "}
            <Emphasis>because the protocol rewards them</Emphasis>.
          </>
        )}
      </p>

      <Callout
        title={
          fr
            ? "Bitcoin, un moteur d'incitation économique"
            : "Bitcoin: an economic incentive engine"
        }
      >
        <p>
          {fr
            ? "À chaque bloc validé, le protocole attribue au mineur :"
            : "Each time a block is validated, the protocol rewards the miner with:"}
        </p>
        <ul>
          <li>
            {fr ? (
              <>
                {fr && (
                  <>
                    une <HighlightText>subvention</HighlightText>, c'est-à-dire une émission de
                    nouveaux bitcoins
                  </>
                )}
              </>
            ) : (
              <>
                a <HighlightText>subsidy</HighlightText> - newly issued bitcoins
              </>
            )}
          </li>
          <li>
            {fr ? (
              <>
                ainsi qu'une <HighlightText>prime additionnelle</HighlightText>, qui correspond aux
                frais de transaction inclus dans le bloc
              </>
            ) : (
              <>
                plus an <HighlightText>additional bonus</HighlightText> equal to the transaction
                fees included in the block
              </>
            )}
          </li>
        </ul>
        <p>
          {fr
            ? "Cliques sur le bouton « Récompenser le mineur » et observes ce qu'il se passe."
            : 'Click the "Reward the miner" button and observe what happens.'}
        </p>
        <MiningRewardBlock />
      </Callout>

      <p>
        {fr
          ? "Cependant, cette subvention ne reste pas stable dans le temps. Regardes attentivement la courbe qui suit."
          : "However, this subsidy does not remain stable over time. Take a close look at the curve below."}
      </p>

      <HalvingChart />

      <p>
        {fr
          ? "La subvention ne fait que décroître dans le temps. La dernière fraction de bitcoin sera émise vers 2140."
          : "The subsidy only ever decreases over time. The last fraction of bitcoin will be issued around 2140."}
      </p>
      <p>
        <Emphasis>
          {fr
            ? "L'émission de nouveaux bitcoins suit une courbe mathématique en escalier. Elle correspond à un mécanisme appelé « halving ». Regardes ça de plus près."
            : "The issuance of new bitcoins follows a mathematical staircase curve, defined by a mechanism called the halving. Let's explore this further."}
        </Emphasis>
      </p>

      <Callout title={fr ? "Le halving et ses effets" : "The halving and its effects"}>
        <p>
          <Emphasis>
            {fr
              ? "Le halving définit la politique monétaire d'émission de nouveaux bitcoins."
              : "The halving defines Bitcoin's monetary policy for issuing new coins."}
          </Emphasis>
        </p>
        <p>
          {fr ? (
            <>
              Elle est codée en dur dans le protocole et peut se résumer ainsi : tous les{" "}
              <i>210 000 blocs</i> (soit environ tous les <i>4 ans</i>), la subvention accordée aux
              mineurs pour chaque bloc validé est divisée par deux.
            </>
          ) : (
            <>
              It is hard-coded into the protocol and can be summarised as follows: every{" "}
              <i>210,000 blocks</i> (roughly every <i>4 years</i>), the subsidy paid to miners for
              each validated block is cut in half.
            </>
          )}
        </p>

        <p>
          {fr ? (
            <>
              La compréhension de ce mécanisme change radicalement la façon de voir Bitcoin. Pour la
              première fois,{" "}
              <Emphasis>
                une monnaie combine une rareté absolue (21 millions d'unités, pas une de plus) avec
                une émission entièrement prévisible, indépendante de toute décision humaine
              </Emphasis>
              .
            </>
          ) : (
            <>
              Understanding this mechanism fundamentally changes how you see Bitcoin. For the first
              time,{" "}
              <Emphasis>
                a currency combines absolute scarcity (21 million units, not one more) with a fully
                predictable issuance, independent of any human decision
              </Emphasis>
              .
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Du point de vue de l'acquéreur : avec le temps, obtenir des bitcoins ne passe plus par
              la création, mais par l'échange.{" "}
              <Emphasis>Il faut les acheter à quelqu'un d'autre</Emphasis>.
            </>
          ) : (
            <>
              From the buyer's perspective: over time, obtaining bitcoin no longer goes through
              creation but through exchange.{" "}
              <Emphasis>You have to buy it from someone else</Emphasis>.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Du point de vue du mineur : à chaque halving, les revenus chutent, la pression monte,
              et <Emphasis>seuls les plus efficaces restent en course</Emphasis>.
            </>
          ) : (
            <>
              From the miner's perspective: with each halving, revenue drops, pressure rises, and{" "}
              <Emphasis>only the most efficient survive</Emphasis>.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Bitcoin devient donc plus rare pour tout le monde et plus exigeant pour ceux qui le produisent."
            : "Bitcoin thus becomes scarcer for everyone and more demanding for those who produce it."}
        </p>

        <p style={{ marginTop: "1rem" }}>
          <Emphasis>
            {fr ? (
              <>
                Dès 2032, la récompense ne sera plus que de <strong>0,78125 BTC par bloc</strong>,
                soit 64 fois moins qu'à l'origine. La subvention tend inexorablement vers zéro.
              </>
            ) : (
              <>
                By 2032, the reward will be just <strong>0.78125 BTC per block</strong>, 64 times
                less than the original. The subsidy is inexorably approaching zero.
              </>
            )}
          </Emphasis>
        </p>
      </Callout>

      <p>
        {fr
          ? "Mets-toi un instant à la place d'un mineur."
          : "Put yourself in a miner's shoes for a moment."}
      </p>
      <ul>
        <li>
          {fr ? "ton revenu en bitcoins est divisé par deux" : "your bitcoin income is cut in half"}
        </li>
        <li>
          {fr
            ? "tes coûts (machines, électricité) restent à peu près identiques"
            : "your costs (hardware, electricity) remain roughly the same"}
        </li>
      </ul>
      <p>
        {fr
          ? "ta marge de rentabilité est menacée. Tu pourrais quitter le marché avec d'autres mineurs devenus moins efficaces. Et là, la sécurité du réseau pourrait vaciller."
          : "Your profit margin is under threat. You could leave the market along with other miners who have become less efficient. And at that point, the security of the network could start to weaken."}
      </p>
      <p>
        {fr
          ? "Que répondrais-tu à la question suivante :"
          : "How would you answer the following question:"}
      </p>

      <Quiz {...getQuizDataHalving(language)} onCorrectAnswer={() => {}} />

      <p>
        {fr
          ? "Une question revient souvent sur la rentabilité du minage à long terme, quand il n'y aura presque plus d'émissions de nouveaux bitcoins."
          : "One question often comes up about the long-term profitability of mining, once there are almost no new bitcoins left to be issued."}
      </p>

      <Callout title={fr ? "Objection fréquente" : "Common objection"}>
        <p>
          {fr
            ? "Si les mineurs ne reçoivent plus de récompense en bitcoins, pourquoi continueraient-ils à sécuriser le réseau ?"
            : "If miners no longer receive a bitcoin reward, why would they continue to secure the network?"}
        </p>
        <p>
          {fr ? (
            <>
              {" "}
              <Emphasis>
                Bitcoin n'a pas été conçu pour être sécurisé par une émission monétaire permanente,
                mais par la valeur qu'il protège
              </Emphasis>
              .
            </>
          ) : (
            <>
              {" "}
              <Emphasis>
                Bitcoin was not designed to be secured by permanent monetary issuance, but by the
                value it protects
              </Emphasis>
              .
            </>
          )}
        </p>
        <p>
          {fr
            ? "Quand la subvention disparaît, les frais de transaction prennent le relais. Pourquoi ? Parce que les utilisateurs paient pour sécuriser :"
            : "When the subsidy disappears, transaction fees take over. Why? Because users pay to secure:"}
        </p>
        <ul>
          <li>{fr ? "leurs transactions" : "their transactions"}</li>
          <li>{fr ? "leur épargne" : "their savings"}</li>
          <li>{fr ? "leur patrimoine" : "their wealth"}</li>
        </ul>
        <p>
          {fr
            ? "Ce n'est pas une hypothèse : c'est écrit dès l'origine dans le protocole."
            : "This is not a hypothesis: it has been written into the protocol from the very beginning."}
        </p>
        <Quote
          author="Satoshi Nakamoto"
          source={fr ? "Livre blanc Bitcoin, 2008" : "Bitcoin Whitepaper, 2008"}
        >
          {fr
            ? "Lorsqu'un nombre prédéterminé de pièces est en circulation, le mécanisme d'incitation peut entièrement basculer vers les frais de transaction et être complètement exempt d'inflation."
            : "Once a predetermined number of coins have entered circulation, the incentive can transition entirely to transaction fees and be completely inflation free."}
        </Quote>
      </Callout>

      <p>
        {fr
          ? "Bitcoin inverse complètement la logique monétaire :"
          : "Bitcoin completely inverts monetary logic:"}
      </p>
      <ul>
        <li>
          {fr ? (
            <>
              Dans les systèmes traditionnels, la sécurité est{" "}
              <Emphasis>financée par l'inflation</Emphasis>
            </>
          ) : (
            <>
              In traditional systems, security is <Emphasis>funded by inflation</Emphasis>
            </>
          )}
        </li>
        <li>
          {fr ? (
            <>
              Dans Bitcoin, la sécurité est <Emphasis>financée par l'usage</Emphasis>
            </>
          ) : (
            <>
              In Bitcoin, security is <Emphasis>funded by usage</Emphasis>
            </>
          )}
        </li>
      </ul>

      <p>
        {fr ? (
          <>
            {" "}
            <Emphasis>Un cercle vertueux qui s'auto-renforce.</Emphasis>.
          </>
        ) : (
          <>
            {" "}
            <Emphasis>A virtuous self-reinforcing cycle</Emphasis>.
          </>
        )}
      </p>

      <NetworkFlywheel />

      <p>
        {fr ? (
          <>
            Tu sais maintenant <i>pourquoi les mineurs participent</i>,{" "}
            <i>comment leur subvention évolue</i> et <i>pourquoi elle disparaît progressivement</i>.
          </>
        ) : (
          <>
            You now understand <i>why miners participate</i>, <i>how their subsidy evolves</i>, and{" "}
            <i>why it progressively disappears</i>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            {" "}
            <Emphasis>Que sécurisent-ils exactement ?</Emphasis>
          </>
        ) : (
          <>
            {" "}
            <Emphasis>But what exactly are they securing?</Emphasis>
          </>
        )}
      </p>
      <p>
        {fr
          ? "Comment une transaction Bitcoin fonctionne-t-elle sans banque ? Et comment la propriété est-elle transférée sans intermédiaire ?"
          : "How does a Bitcoin transaction work without a bank? And how is ownership transferred without an intermediary?"}
      </p>
      <p>
        {fr ? (
          <>
            {" "}
            Direction le prochain chapitre : <Emphasis>Transactions et modèle UTXO</Emphasis>.
          </>
        ) : (
          <>
            {" "}
            On to the next chapter: <Emphasis>Transactions and the UTXO model</Emphasis>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
