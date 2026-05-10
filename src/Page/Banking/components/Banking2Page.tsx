import { type FC } from "react";

import { Home } from "lucide-react";

import { Callout, Emphasis, KeywordHighlight } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";

import { CompensationSimulator } from "./CompensationSimulator";

export const Banking2Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.twoLevels")}
      prelude={
        fr ? (
          <>
            Nicolas vient de virer 200 000 € pour acheter sa maison. Sauf que cet argent n'a jamais
            quitté sa banque. Et pourtant, Mme Michu a bien reçu son virement. Comment est-ce
            possible ?
          </>
        ) : (
          <>
            Nicolas has just transferred $200,000 to buy his house. Except that the money never
            actually left his bank. And yet, Mrs. Michu did receive the transfer. How is that
            possible?
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            <i>Nicolas</i> est content puisqu'il a reçu 200 000 €, prêtés par sa banque pour l'achat
            d'une résidence principale. <br />
            Cet argent ne va pas rester très longtemps sur le compte de Nicolas : il va payer la
            vendeuse de la maison, <i>Mme Michu</i>. Et que se passe-t-il si le compte de{" "}
            <i>Mme Michu</i> est dans une autre banque ?
          </>
        ) : (
          <>
            <i>Nicolas</i> is happy because he received $200,000, lent by his bank to buy a primary
            residence. <br />
            This money won't stay long in Nicolas's account: he will pay the house seller,{" "}
            <i>Ms. Michu</i>. And what happens if <i>Ms. Michu</i>'s account is at a different bank?
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est là qu'intervient le mécanisme de <Emphasis>compensation interbancaire</Emphasis>.
            Attends, ne pars pas ! Je vais tout t'expliquer, de manière très simple et concrète.
          </>
        ) : (
          <>
            This is where the <Emphasis>interbank compensation</Emphasis> mechanism comes in. Wait,
            don't leave! I'll explain everything in a very simple and concrete way.
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "Les deux types de monnaie : celle que l'on utilise et celle réservée aux Banques"
            : "The two types of money: the one we use and the one reserved for Banks"
        }
      >
        <p>
          {fr
            ? "Avant d'aller plus loin, il faut comprendre qu'il existe deux types d'argent qui ne se mélangent jamais :"
            : "Before going further, you must understand that there are two types of money that never mix:"}
        </p>
        <p>
          <KeywordHighlight>{fr ? "Monnaie M2" : "M2 Money"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est l'argent créé à plus de 95% par les banques commerciales."
              : "→ This is the money that is more than 95% created by commercial banks."}
          </Emphasis>
          <br />
          <i>
            {fr
              ? "Quand on paie nos courses, notre essence, notre shopping ou encore quand on achète quelques cryptos parce qu'on ne sait jamais, ..."
              : "When we pay for groceries, gas, shopping, or when we buy some crypto just in case..."}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "Monnaie M0" : "M0 Money"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est la monnaie émise par la Banque Centrale et réservée aux banques commerciales, afin qu'elles règlent leurs dettes mutuelles entre elles."
              : "→ Money issued by the Central Bank and reserved for commercial banks, so they can settle their mutual debts with each other."}
          </Emphasis>
          <br />
          <i>
            {fr
              ? "Nous verrons juste après comment elles utilisent cet argent M0 pour régler leurs dettes nettes issues de toutes les transactions M2 de la journée."
              : "We'll see right after how they use this M0 money to settle their net debts arising from all M2 transactions of the day."}
          </i>
        </p>
      </Callout>
      <p>
        {fr
          ? "Imagines maintenant des millions de virements en monnaie M2 chaque jour entre les banques."
          : "Now imagine millions of M2 money transfers every day between banks."}
      </p>
      <p>
        {fr ? (
          <>
            À fréquence régulière (par exemple, en fin de journée), les banques font le total de ce
            qu'elles se doivent mutuellement à cause de tous ces virements. Elles ne se paient
            ensuite que la différence nette (le solde) en utilisant l'argent M0. <br />
            <Emphasis>C'est ça, la compensation interbancaire</Emphasis>.
          </>
        ) : (
          <>
            At regular intervals (for example, at end of day), banks calculate the total of what
            they owe each other from all these transfers. They then only pay the net difference (the
            balance) using M0 money. <br />
            <Emphasis>That's interbank compensation</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Cela te parait abstraît ? Très bien, passons une fois de plus à la pratique !"
          : "Does this seem abstract? Alright, let's get hands-on once again!"}
      </p>
      <Callout
        icon={<Home size={20} strokeWidth={2} />}
        title={
          fr
            ? "Illustration concrète : Le mécanisme de compensation pour la transaction entre Nicolas et Mme Michu"
            : "Concrete illustration: The compensation mechanism for the transaction between Nicolas and Ms. Michu"
        }
      >
        <p>
          {fr ? (
            <>
              Revenons à nos deux protagonistes <i>M. Nicolas </i> et <i>Mme Michu</i>. <br />
              Ça y est, Nicolas fait le virement de 200 000 € sur le compte bancaire de Mme Michu.
              Si tu as bien suivi, cette transaction correspond à la monnaie M2. Parfait.
            </>
          ) : (
            <>
              Let's return to our two protagonists <i>Mr. Nicolas </i>and<i> Ms. Michu</i>. <br />
              There it is, Nicolas transfers $200,000 to Ms. Michu's bank account. If you've been
              following, this transaction corresponds to M2 money. Perfect.
            </>
          )}
        </p>
        <p>
          {fr
            ? "On arrive en fin de journée, c'est l'heure des comptes : la banque de Nicolas doit 200 000 € à la banque de Mme Michu. Quelle monnaie va être utilisée ? Exact, la monnaie M0 !"
            : "We reach end of day, it's time to settle up: Nicolas's bank owes $200,000 to Ms. Michu's bank. Which money will be used? Exactly, M0 money!"}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Maintenant, observons le bilan de la banque de <i>Nicolas</i> juste après son
            virement à Mme Michu. Notes la dette de 200 000 € en M0 au passif. Cliques ci-dessous
            pour voir comment la banque utilise ses réserves M0 pour solder cette dette lors de la
            compensation.
          </>
        ) : (
          <>
            Now, let's observe <i>Nicolas</i>'s bank balance sheet right after his transfer to
            Ms. Michu. Note the $200,000 M0 debt on the liabilities side. Click below to see how the
            bank uses its M0 reserves to settle this debt during compensation.
          </>
        )}
      </p>
      <CompensationSimulator />
    </PageTemplate>
  );
};
