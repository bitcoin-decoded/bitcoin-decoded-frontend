import { type FC } from "react";

import moneyConsuming from "../../../../src/Design/img/money_consuming.jpg";
import moneyCreationCodeline from "../../../../src/Design/img/money_creation_codeline.jpg";
import moneyPrinting from "../../../../src/Design/img/money_printing.webp";
import { Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { Illustration } from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";

export const Banking7Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.synthesis")}>
      <p>{fr ? "Pour commencer, bravo !" : "First of all, well done!"}</p>
      <p>
        {fr
          ? "Vous avez traversé la partie la plus dense. Prenons maintenant un peu de recul. Si l'on assemble les mécanismes que nous venons de voir, une image cohérente, et un peu inquiétante, se dessine."
          : "You've made it through the densest part. Let's now take a step back. If we put together the mechanisms we've just seen, a coherent - and somewhat troubling - picture emerges."}
      </p>
      <p>
        {fr ? (
          <>
            Nous avons vu que l'argent utilisé au quotidien (M2) n'est plus une ressource rare
            adossé à un sous-jacent réel, mais{" "}
            <Emphasis>
              une monnaie scripturale créée par les banques commerciales lors de l'octroi de crédits
            </Emphasis>
            . Cette création monétaire s'inscrit dans un cadre réglementaire et comptable, mais elle
            demeure structurellement extensible. Autrement dit, la monnaie est devenue{" "}
            <Emphasis>intrinsèquement facile à produire</Emphasis>.
          </>
        ) : (
          <>
            We saw that the money used daily (M2) is no longer a scarce resource backed by a real
            underlying asset, but{" "}
            <Emphasis>
              a scriptural currency created by commercial banks when granting loans
            </Emphasis>
            . This money creation operates within a regulatory and accounting framework, but it
            remains structurally expandable. In other words, money has become{" "}
            <Emphasis>inherently easy to produce</Emphasis>.
          </>
        )}
        <Illustration
          src={moneyCreationCodeline}
          alt={
            fr ? "Création monétaire via une ligne de code" : "Money creation via a line of code"
          }
          width="30%"
          caption={fr ? "Une simple ligne de code" : "A simple line of code"}
        />
      </p>
      <p>
        {fr ? (
          <>
            Lorsque ce système montre des signes de fragilité, un acteur central intervient : la
            Banque Centrale. Sans consultation directe des épargnants ou des citoyens, elle dispose
            du pouvoir d'augmenter la monnaie de base (M0) en volumes très importants, notamment via
            des programmes de rachat d'actifs comme le <Emphasis>Quantitative Easing</Emphasis>. Ces
            interventions permettent de maintenir le système financier à court terme,{" "}
            <Emphasis>
              mais au prix d'une dilution progressive de la valeur de la monnaie existante, lorsque
              cette expansion n'est pas compensée par une création de richesse réelle équivalente.
            </Emphasis>
          </>
        ) : (
          <>
            When this system shows signs of fragility, a central actor intervenes: the Central Bank.
            Without directly consulting savers or citizens, it has the power to increase base money
            (M0) in very large volumes, notably through asset purchase programs like{" "}
            <Emphasis>Quantitative Easing</Emphasis>. These interventions help maintain the
            financial system in the short term,{" "}
            <Emphasis>
              but at the cost of a gradual dilution of the existing money's value, when this
              expansion is not offset by equivalent real wealth creation.
            </Emphasis>
          </>
        )}
        <Illustration
          src={moneyPrinting}
          alt="Brr printing meme"
          width="40%"
          caption="brrr printing machine!"
        />
      </p>
      <p>
        {fr ? (
          <>
            Cette création monétaire n'affecte pas l'ensemble de l'économie de manière uniforme.
            Comme nous l'avons vu avec l'
            <Emphasis>Effet Cantillon</Emphasis>, l'argent nouvellement créé bénéficie d'abord aux
            acteurs les plus proches de sa source, principalement les marchés financiers et les
            détenteurs d'actifs. Il en résulte une inflation marquée des prix des actifs, notamment
            sur la bourse et l'immobilier, tandis que l'économie productive et les revenus du
            travail n'évoluent pas au même rythme,{" "}
            <Emphasis>accentuant les écarts de richesse</Emphasis>.
          </>
        ) : (
          <>
            This money creation does not affect the entire economy uniformly. As we saw with the{" "}
            <Emphasis>Cantillon Effect</Emphasis>, newly created money first benefits those closest
            to its source, mainly financial markets and asset holders. This results in marked asset
            price inflation, particularly in stocks and real estate, while the productive economy
            and labor income don't keep pace, <Emphasis>widening the wealth gap</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            A terme, ces déséquilibres se diffusent vers l'économie réelle. Une masse monétaire en
            forte expansion, confrontée à une production de biens et de services qui progresse plus
            lentement, exerce une pression inflationniste durable. Il ne s'agit pas simplement d'une
            hausse ponctuelle des prix, mais{" "}
            <Emphasis>d'une dégradation progressive de la valeur de la monnaie elle-même</Emphasis>.
          </>
        ) : (
          <>
            Eventually, these imbalances spread to the real economy. A rapidly expanding money
            supply, facing production of goods and services that grows more slowly, exerts lasting
            inflationary pressure. This is not simply a one-time price increase, but{" "}
            <Emphasis>a gradual degradation of the value of money itself</Emphasis>.
          </>
        )}
        <Illustration
          src={moneyConsuming}
          alt={fr ? "Consumation des monnaies fiduciaires" : "Fiat currencies burning away"}
          width="30%"
          caption={
            fr
              ? "Lentement mais sûrement les monnaies fiduciaires se consumment"
              : "Slowly but surely, fiat currencies burn away"
          }
        />
      </p>
      <p>
        {fr ? (
          <>
            <Emphasis>Le constat est donc structurel</Emphasis>. Ces dynamiques ne relèvent ni d'un
            accident de parcours, ni de mauvaises décisions isolées. Elles découlent du{" "}
            <Emphasis>
              fonctionnement même d'un système monétaire fondé sur l'expansion du crédit et de la
              dette
            </Emphasis>
            . En cherchant à résoudre des déséquilibres à court terme par une création monétaire
            toujours plus importante, le système tend à transférer dans le temps, et vers les
            épargnants, le coût de ces ajustements.
          </>
        ) : (
          <>
            <Emphasis>The diagnosis is therefore structural</Emphasis>. These dynamics are neither
            an accident nor isolated bad decisions. They stem from the{" "}
            <Emphasis>
              very functioning of a monetary system based on credit and debt expansion
            </Emphasis>
            . By trying to resolve short-term imbalances through ever-increasing money creation, the
            system tends to transfer the cost of these adjustments over time - and onto savers.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Dès lors, un espoir émerge. On pourrait rêver d'un outil différent. Une monnaie que personne ne pourrait imprimer à volonté, qui ne dépendrait d'aucun émetteur central et qui protégerait \"mécaniquement\" la valeur de notre épargne dans le temps. Une telle solution semble être le \"Graal\" de l'économie. Mais avant de découvrir si cet outil existe et comment il fonctionne, nous devons d'abord lever le voile sur un mystère que l'on oublie trop souvent : Dès lors, une question fondamentale se pose :"
          : 'From here, a hope emerges. We could dream of a different tool. A currency that nobody could print at will, that wouldn\'t depend on any central issuer, and that would "mechanically" protect the value of our savings over time. Such a solution seems to be the "Holy Grail" of economics. But before discovering if this tool exists and how it works, we must first unveil a mystery too often forgotten. A fundamental question arises:'}
      </p>
      <p>
        {fr ? (
          <>
            <Emphasis>Au fond, c'est quoi l'argent ?</Emphasis> Pourquoi un billet a-t-il de la
            valeur alors qu'une feuille d'arbre n'en a pas ? Pourquoi l'humanité a-t-elle utilisé de
            l'or pendant des millénaires avant de s'en détourner ? Pour comprendre la solution, il
            faut d'abord redéfinir les bases.
          </>
        ) : (
          <>
            <Emphasis>What is money, really?</Emphasis> Why does a banknote have value while a tree
            leaf doesn't? Why did humanity use gold for millennia before turning away from it? To
            understand the solution, we must first redefine the basics.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Cap vers notre prochaine destination : l'essence même de la monnaie !"
          : "Onward to our next destination: the very essence of money!"}
      </p>
    </PageTemplate>
  );
};
