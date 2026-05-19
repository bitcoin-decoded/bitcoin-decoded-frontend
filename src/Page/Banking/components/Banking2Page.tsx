import { type FC } from "react";

import { Home } from "lucide-react";

import { Callout, KeywordHighlight, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/";

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
            Nicolas vient de virer 200 000 € pour acheter sa maison. Sauf qu'aucune liasse de 200
            000 € n'a bougé d'une banque à l'autre. Et pourtant, Mme Michu a bien reçu son virement.
            Comment c'est possible ?
          </>
        ) : (
          <>
            Nicolas just wired $200,000 to buy his house. Except not a single banknote made the trip
            from one bank to the other. And yet, Mrs. Michu did receive the money. How does that
            work?
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
            <i>Nicolas</i> is a happy man: his bank just lent him $200,000 to buy his main home.{" "}
            <br />
            That money won't sit in Nicolas's account for long: he's using it to pay the seller,{" "}
            <i>Mrs. Michu</i>. So what happens if <i>Mrs. Michu</i> banks somewhere else?
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est là qu'intervient le mécanisme de compensation interbancaire. Attends, ne pars pas
            ! Je vais tout t'expliquer, de manière très simple et concrète.
          </>
        ) : (
          <>
            This is where interbank clearing comes in. Wait, don't go! I'll walk you through it,
            nice and simple.
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "Les deux types de monnaie : celle que l'on utilise et celle réservée aux Banques"
            : "The two kinds of money: the one you use, and the one reserved for banks"
        }
      >
        <p>
          {fr
            ? "Avant d'aller plus loin, il faut comprendre qu'il existe deux types d'argent qui ne circulent jamais dans le même tuyau :"
            : "Before we go any further, you need to grasp one thing: there are two kinds of money, and they never flow through the same pipe:"}
        </p>
        <p>
          <KeywordHighlight>{fr ? "Monnaie M2" : "M2 money"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est l'argent que tu utilises tous les jours. Et l'essentiel est créé non pas par la Banque Centrale, mais par les banques commerciales quand elles accordent des crédits."
            : "→ This is the money you use every day. And most of it is created not by the Central Bank, but by commercial banks when they hand out loans."}
          <br />
          <i>
            {fr
              ? "Quand on paie nos courses, notre essence, notre shopping ou encore quand on achète quelques cryptos parce qu'on ne sait jamais, ..."
              : "When we pay for groceries, gas, a bit of shopping, or grab some crypto just in case you never know..."}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "Monnaie M0" : "M0 money"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est la monnaie émise par la Banque Centrale. Les billets dans ton portefeuille en font partie. Mais le gros morceau, ce sont les réserves : la monnaie que les banques commerciales utilisent entre elles pour régler leurs dettes mutuelles."
            : "→ This is the money issued by the Central Bank. The notes in your wallet are part of it. But the big chunk is the reserves: the money commercial banks use among themselves to settle what they owe each other."}
          <br />
          <i>
            {fr
              ? "Nous verrons juste après comment elles utilisent cet argent M0 pour régler leurs dettes nettes issues de toutes les transactions M2 de la journée."
              : "We'll see in a moment how they use this M0 money to settle the net debts left over from all the day's M2 transactions."}
          </i>
        </p>
      </Callout>
      <p>
        {fr
          ? "Imagine maintenant des millions de virements en monnaie M2 chaque jour entre les banques."
          : "Now picture millions of M2 transfers flying between banks every single day."}
      </p>
      <p>
        {fr ? (
          <>
            À fréquence régulière (par exemple, en fin de journée), les banques font le total de ce
            qu'elles se doivent mutuellement : c'est la compensation. Puis elles règlent uniquement
            la différence nette (le solde) en monnaie M0 : c'est le règlement. <br />
            C'est ça, la compensation interbancaire.
          </>
        ) : (
          <>
            At regular intervals (say, at the end of the day), banks tally up everything they owe
            one another: that's the clearing. Then they settle only the net difference (the balance)
            in M0 money: that's the settlement. <br />
            That, right there, is interbank clearing.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Cela te parait abstrait ? Très bien, passons une fois de plus à la pratique !"
          : "Sounds abstract? Good. Let's get our hands dirty once again!"}
      </p>
      <Callout
        icon={<Home size={20} strokeWidth={2} />}
        title={
          fr
            ? "Illustration concrète : Le mécanisme de compensation pour la transaction entre Nicolas et Mme Michu"
            : "A concrete walkthrough: the clearing mechanism for the Nicolas–Mrs. Michu transaction"
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
              Back to our two characters, <i>Nicolas </i>and<i> Mrs. Michu</i>. <br />
              Here we go: Nicolas wires $200,000 to Mrs. Michu's bank account. If you've been
              following, this transaction is M2 money. Perfect.
            </>
          )}
        </p>
        <p>
          {fr
            ? "On arrive en fin de journée, c'est l'heure des comptes : la banque de Nicolas doit 200 000 € à la banque de Mme Michu. Quelle monnaie va être utilisée ? Exact, la monnaie M0 !"
            : "End of the day rolls around, time to settle up: Nicolas's bank owes $200,000 to Mrs. Michu's bank. Which money gets used? Exactly, M0 money!"}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Maintenant, observons le bilan de la banque de <i>Nicolas</i> juste après son virement à
            Mme Michu. Note la dette de 200 000 € en M0 au passif. Clique ci-dessous pour voir
            comment la banque utilise ses réserves M0 pour solder cette dette lors de la
            compensation.
          </>
        ) : (
          <>
            Now let's look at <i>Nicolas</i>'s bank balance sheet right after his transfer to Mrs.
            Michu. Notice the $200,000 M0 debt on the liabilities side. Click below to see how the
            bank taps its M0 reserves to clear that debt during settlement.
          </>
        )}
      </p>
      <CompensationSimulator />
      <p>
        {fr
          ? "Tu viens encore de gratter une couche que la plupart des gens ne soupçonnent même pas. Et crois-moi, ça va servir pour la suite :"
          : "You've just scratched off another layer most people never even suspect is there. And trust me, it's going to matter for what comes next:"}{" "}
        <Reference to={ROUTE_NAME.Banking_3}>{t("nav.tree.qe")}</Reference>.
      </p>
    </PageTemplate>
  );
};
