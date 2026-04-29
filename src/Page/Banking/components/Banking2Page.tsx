import { type FC } from "react";
import { Callout, Emphasis, KeywordHighlight } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";
import { Home } from "lucide-react";
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
            Seule la monnaie des Banques Commerciales (appelée M2) circule dans
            l'économie. Pour finaliser les transactions, les banques commerciales
            compensent leurs dettes reciproques en se payant mutuellement avec la
            monnaie de Banque Centrale (appelée M0).
          </>
        ) : (
          <>
            Only commercial bank money (called M2) circulates in the economy. To
            finalize transactions, commercial banks settle their mutual debts by
            paying each other with Central Bank money (called M0).
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            <i>Nicolas QuiPaye</i> est content puisqu'il a reçu 200 000 €,
            prêtés par sa banque pour l'achat d'une résidence principale. <br />
            Cet argent ne va pas rester très longtemps sur le compte de Nicolas :
            il va payer la vendeuse de la maison, <i>Mme Michu</i>. Et que se
            passe-t-il si le compte de <i>Mme Michu</i> est dans une autre
            banque ?
          </>
        ) : (
          <>
            <i>Nicolas WhoPays</i> is happy because he received €200,000, lent
            by his bank to buy a primary residence. <br />
            This money won't stay long in Nicolas's account: he will pay the
            house seller, <i>Ms. Michu</i>. And what happens if{" "}
            <i>Ms. Michu</i>'s account is at a different bank?
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est là qu'intervient le mécanisme de{" "}
            <Emphasis>compensation interbancaire</Emphasis>. Attendez, ne partez
            pas ! Je vais tout vous expliquer, de manière très simple et
            concrète.
          </>
        ) : (
          <>
            This is where the{" "}
            <Emphasis>interbank compensation</Emphasis> mechanism comes in.
            Wait, don't leave! I'll explain everything in a very simple and
            concrete way.
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "Les Deux Types de monnaie : Celle que l'on utilise et celle réservée aux Banques"
            : "The Two Types of money: The one we use and the one reserved for Banks"
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
              ? "→ C'est l'argent essentiellement créé par les banques commerciales et qui circule dans l'��conomie."
              : "→ Money essentially created by commercial banks that circulates in the economy."}
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
          ? "Imaginez maintenant des millions de virements en monnaie M2 chaque jour entre les banques."
          : "Now imagine millions of M2 money transfers every day between banks."}
      </p>
      <p>
        {fr ? (
          <>
            A fréquence régulière (par exemple, en fin de journée), les banques
            font le total de ce qu'elles se doivent mutuellement à cause de tous
            ces virements. Elles ne se paient ensuite que la différence nette (le
            solde) en utilisant l'argent M0. <br />
            <Emphasis>C'est ça, la compensation interbancaire</Emphasis>.
          </>
        ) : (
          <>
            At regular intervals (for example, at end of day), banks calculate
            the total of what they owe each other from all these transfers. They
            then only pay the net difference (the balance) using M0 money.{" "}
            <br />
            <Emphasis>That's interbank compensation</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Cela vous parait abstrait ? Très bien, passons une fois de plus à la pratique !"
          : "Does this seem abstract? Alright, let's get hands-on once again!"}
      </p>
      <Callout
        icon={<Home size={20} strokeWidth={2} />}
        title={
          fr
            ? "Illustration concrète — Le mécanisme de compensation pour la transaction entre M. QuiPaye et Mme Michu"
            : "Concrete illustration — The compensation mechanism for the transaction between Mr. WhoPays and Ms. Michu"
        }
      >
        <p>
          {fr ? (
            <>
              Revenons à nos deux protagonistes <i>M. Nicolas QuiPaye</i> et{" "}
              <i>Mme Michu</i>. <br />
              Ca y est, Nicolas fait le virement de 200 000 € sur le compte
              bancaire de Mme Michu. Si vous avez bien suivi, cette transaction
              correspond à la monnaie M2. Parfait.
            </>
          ) : (
            <>
              Let's return to our two protagonists <i>Mr. Nicolas WhoPays</i>{" "}
              and <i>Ms. Michu</i>. <br />
              There it is, Nicolas transfers €200,000 to Ms. Michu's bank
              account. If you've been following, this transaction corresponds to
              M2 money. Perfect.
            </>
          )}
        </p>
        <p>
          {fr
            ? "On arrive en fin de journée, c'est l'heure des comptes : la banque de Nicolas doit 200 000 € à la banque de Mme Michu. Quelle monnaie va être utilisée ? Bravo ! La monnaie M0."
            : "We reach end of day, it's time to settle up: Nicolas's bank owes €200,000 to Ms. Michu's bank. Which money will be used? Bravo! M0 money."}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Maintenant, observons le bilan de la banque de <i>M. QuiPaye</i>{" "}
            juste après son virement à Mme Michu. Notez la dette de 200 000 € en
            M0 au passif. Cliquez ci-dessous pour voir comment la banque utilise
            ses réserves M0 pour solder cette dette lors de la compensation.
          </>
        ) : (
          <>
            Now, let's observe <i>Mr. WhoPays</i>'s bank balance sheet right
            after his transfer to Ms. Michu. Note the €200,000 M0 debt on the
            liabilities side. Click below to see how the bank uses its M0
            reserves to settle this debt during compensation.
          </>
        )}
      </p>
      <CompensationSimulator />
    </PageTemplate>
  );
};
