import { type FC } from "react";

import { Callout, HighlightText, Quote, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataHalving,
  HalvingChart,
  HalvingTimeMachine,
  MiningRewardBlock,
  NetworkFlywheel,
  Quiz,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
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
          : "In 2009, mining a block paid out 50 bitcoins. In 2026, it pays 3.125. By 2140, it will pay zero. This isn't drift, it's been the plan from day one."
      }
    >
      <p>
        {fr ? (
          <>
            Tu as vu la <Reference to={ROUTE_NAME.Bitcoin_4}>preuve de travail</Reference> dans le
            chapitre précédent. Elle repose sur un effort important fourni par les mineurs.
          </>
        ) : (
          <>
            You've already met <Reference to={ROUTE_NAME.Bitcoin_4}>proof of work</Reference> in the
            previous chapter. It rests on serious effort from miners.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Pourquoi un tel travail ? Pas par pur altruisme, mais parce que le protocole les
            récompense.
          </>
        ) : (
          <>Why bother? Not out of pure altruism. The protocol rewards them.</>
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
            : "Every time a block is validated, the protocol hands the miner two things:"}
        </p>
        <ul>
          <li>
            {fr ? (
              <>
                une <HighlightText>subvention</HighlightText>, c'est-à-dire une émission de nouveaux
                bitcoins
              </>
            ) : (
              <>
                a <HighlightText>subsidy</HighlightText>, meaning a fresh issuance of bitcoins
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
                plus a <HighlightText>bonus</HighlightText> made up of the transaction fees bundled
                into the block
              </>
            )}
          </li>
        </ul>
        <p>
          {fr
            ? "Clique sur le bouton « Récompenser le mineur » et observe ce qu'il se passe."
            : 'Click "Reward the miner" and watch what happens.'}
        </p>
        <MiningRewardBlock />
      </Callout>

      <p>
        {fr
          ? "Cependant, cette subvention ne reste pas stable dans le temps. Regarde attentivement la courbe qui suit."
          : "But the subsidy doesn't stay put. Look carefully at the curve below."}
      </p>

      <HalvingChart />

      <p>
        {fr
          ? "La subvention ne fait que décroître dans le temps. La dernière fraction de bitcoin sera émise vers 2140."
          : "The subsidy only shrinks over time. The last fraction of a bitcoin will be issued around 2140."}
      </p>
      <p>
        {fr
          ? "L'émission de nouveaux bitcoins suit une courbe mathématique en escalier. Elle correspond à un mécanisme appelé « halving ». Regarde ça de plus près."
          : "The issuance of new bitcoins follows a mathematical staircase. It's driven by a mechanism called the halving. Let's take a closer look."}
      </p>

      <Callout title={fr ? "Le halving et ses effets" : "The halving and its effects"}>
        <p>
          {fr
            ? "Le halving définit la politique monétaire d'émission de nouveaux bitcoins."
            : "The halving is Bitcoin's monetary policy for issuing new coins."}
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
              It's hard-coded into the protocol and goes like this: every <i>210,000 blocks</i>{" "}
              (roughly every <i>4 years</i>), the subsidy paid to miners for each validated block is
              cut in half.
            </>
          )}
        </p>

        <p>
          {fr ? (
            <>
              La compréhension de ce mécanisme change radicalement la façon de voir Bitcoin. Pour la
              première fois, une monnaie combine une rareté absolue (21 millions d'unités, pas une
              de plus) avec une émission entièrement prévisible, sans autorité centrale qui pilote.
            </>
          ) : (
            <>
              Once you grasp this mechanism, Bitcoin looks completely different. For the first time,
              a currency combines absolute scarcity (21 million units, not one more) with a fully
              predictable issuance, with no central authority steering it.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Du point de vue de l'acquéreur : avec le temps, obtenir des bitcoins ne passe plus par
              la création, mais par l'échange. Il faut les acheter à quelqu'un d'autre.
            </>
          ) : (
            <>
              If you're a buyer: over time, getting bitcoin isn't about creation anymore, it's about
              exchange. You buy them from someone else.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Du point de vue du mineur : à chaque halving, les revenus chutent, la pression monte,
              et seuls les plus efficaces restent en course.
            </>
          ) : (
            <>
              If you're a miner: every halving, revenue drops, pressure climbs, and only the most
              efficient stay in the race.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Bitcoin devient donc plus rare pour tout le monde et plus exigeant pour ceux qui le produisent."
            : "Bitcoin gets scarcer for everyone, and tougher for those who produce it."}
        </p>

        <p style={{ marginTop: "1rem" }}>
          {fr ? (
            <>
              Dès 2032, la récompense ne sera plus que de <strong>0,78125 BTC par bloc</strong>,
              soit 64 fois moins qu'à l'origine. La subvention tend inexorablement vers zéro.
            </>
          ) : (
            <>
              By 2032, the reward will be down to <strong>0.78125 BTC per block</strong>, 64 times
              less than at the start. The subsidy heads inexorably toward zero.
            </>
          )}
        </p>
      </Callout>

      <HalvingTimeMachine />

      <p>
        {fr
          ? "Mets-toi un instant à la place d'un mineur."
          : "Put yourself in a miner's shoes for a moment."}
      </p>
      <ul>
        <li>
          {fr
            ? "ton revenu en bitcoins est divisé par deux"
            : "your bitcoin income just got halved"}
        </li>
        <li>
          {fr
            ? "tes coûts (machines, électricité) restent à peu près identiques"
            : "your costs (hardware, electricity) barely budge"}
        </li>
      </ul>
      <p>
        {fr
          ? "ta marge de rentabilité est menacée. Tu pourrais quitter le marché avec d'autres mineurs devenus moins efficaces. Et là, la sécurité du réseau pourrait vaciller."
          : "Your margin is under threat. You might walk away from the market, along with other miners who can no longer keep up. And right there, the network's security could start to wobble."}
      </p>
      <p>
        {fr
          ? "Que répondrais-tu à la question suivante :"
          : "How would you answer the following question?"}
      </p>

      <Quiz {...getQuizDataHalving(language)} onCorrectAnswer={() => {}} />

      <p>
        {fr
          ? "Une question revient souvent sur la rentabilité du minage à long terme, quand il n'y aura presque plus d'émissions de nouveaux bitcoins."
          : "One question keeps coming back about the long-term economics of mining, once new bitcoin issuance has nearly dried up."}
      </p>

      <Callout title={fr ? "Objection fréquente" : "A common objection"}>
        <p>
          {fr
            ? "Si les mineurs ne reçoivent plus de récompense en bitcoins, pourquoi continueraient-ils à sécuriser le réseau ?"
            : "If miners no longer receive a bitcoin reward, why would they keep securing the network?"}
        </p>
        <p>
          {fr ? (
            <>
              Bitcoin n'a pas été conçu pour être sécurisé par une émission monétaire permanente,
              mais par la valeur qu'il protège.
            </>
          ) : (
            <>
              Bitcoin wasn't designed to be secured by permanent monetary issuance. It was designed
              to be secured by the value it protects.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Quand la subvention disparaît, les frais de transaction prennent le relais. Pourquoi ? Parce que les utilisateurs paient pour sécuriser :"
            : "When the subsidy fades out, transaction fees take over. Why? Because users pay to protect:"}
        </p>
        <ul>
          <li>{fr ? "leurs transactions" : "their transactions"}</li>
          <li>{fr ? "leur épargne" : "their savings"}</li>
          <li>{fr ? "leur patrimoine" : "their wealth"}</li>
        </ul>
        <p>
          {fr ? (
            <>
              Ce n'est pas une affirmation sortie de nulle part : la transition vers un système
              dominé par les frais est explicitement prévue dans le protocole dès son origine. Reste
              à voir si l'usage suivra. Aujourd'hui, les frais représentent déjà 2 à 15% de la
              rémunération des mineurs en période normale, jusqu'à 50% lors des pics de congestion (
              <Reference href="https://deriexs.com/en/indicators/minerRevenueFeesVsRewards">
                source : deriexs.com
              </Reference>
              )
            </>
          ) : (
            <>
              This isn't pulled out of thin air: the transition to a fee-dominated system is
              explicitly written into the protocol from the very start. Whether usage will follow
              remains to be seen. Today, fees already make up 2 to 15% of miners' revenue in calm
              periods, and up to 50% during congestion spikes (
              <Reference href="https://deriexs.com/en/indicators/minerRevenueFeesVsRewards">
                source : deriexs.com
              </Reference>
              )
            </>
          )}
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
          : "Bitcoin flips the standard monetary logic on its head:"}
      </p>
      <ul>
        <li>
          {fr ? (
            <>
              Dans les systèmes monétaires classiques, le coût du système est largement payé par la
              création monétaire et les intermédiaires
            </>
          ) : (
            <>
              In classical monetary systems, the cost of the system is largely paid through money
              creation and intermediaries
            </>
          )}
        </li>
        <li>
          {fr ? (
            <>
              Dans Bitcoin, le coût est payé par les frais que les utilisateurs acceptent quand ils
              utilisent le réseau
            </>
          ) : (
            <>
              In Bitcoin, the cost is paid through the fees users agree to when they use the network
            </>
          )}
        </li>
      </ul>

      <p>
        {fr ? (
          <>Un cercle vertueux qui s'auto-renforce.</>
        ) : (
          <>A virtuous cycle that feeds itself.</>
        )}
      </p>

      <p>
        {fr
          ? "Voilà l'idée en mouvement (chiffres illustratifs, ordres de grandeur 2025) :"
          : "Here's the idea in motion (illustrative figures, 2025 ballpark):"}
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
            You now know <i>why miners take part</i>, <i>how their subsidy evolves</i>, and{" "}
            <i>why it slowly fades out</i>.
          </>
        )}
      </p>
      <p>{fr ? <>Que sécurisent-ils exactement ?</> : <>But what exactly are they securing?</>}</p>
      <p>
        {fr
          ? "Comment une transaction Bitcoin fonctionne-t-elle sans banque ? Et comment la propriété est-elle transférée sans intermédiaire ?"
          : "How does a Bitcoin transaction work without a bank? And how does ownership change hands without an intermediary?"}
      </p>
      <p>
        {fr ? (
          <>
            Direction le prochain chapitre :{" "}
            <Reference to={ROUTE_NAME.Bitcoin_6}>Transactions et modèle UTXO</Reference>.
          </>
        ) : (
          <>
            On to the next chapter:{" "}
            <Reference to={ROUTE_NAME.Bitcoin_6}>Transactions and the UTXO model</Reference>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
