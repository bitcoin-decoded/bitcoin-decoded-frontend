import { type FC } from "react";
import { Callout, Emphasis, KeywordHighlight } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";
import { CreditCreationSimulator } from "./CreditCreationSimulator";

export const Banking1Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.moneyOrigin")}
      prelude={
        fr ? (
          <>
            Plus de 95% de la monnaie que nous utilisons est créée par les
            banques commerciales, au moment où elles accordent un prêt.
          </>
        ) : (
          <>
            Over 95% of the money we use is created by commercial banks at the
            moment they grant a loan.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Alors, savez-vous d'où vient l'argent ?
            <br />
            Si vous répondez{" "}
            <i>« de la planche à billets de la banque centrale »</i>, alors vous
            êtes tombés dans le piège.
            <br />
            Lisez attentivement ce qui suit, vous allez être surpris :
          </>
        ) : (
          <>
            So, do you know where money comes from?
            <br />
            If you answer{" "}
            <i>"from the central bank's printing press"</i>, then you've fallen
            into the trap.
            <br />
            Read carefully what follows, you're in for a surprise:
          </>
        )}
        <Callout title={fr ? "D'où vient l'argent ?" : "Where does money come from?"}>
          {fr ? (
            <>
              Plus de 95% de notre monnaie n'est ni imprimée par l'État ni
              imprimée par les Banques Centrales, mais créée{" "}
              <i>*comme par magie*</i> par les banques commerciales (du style BNP
              Paribas, Caisse d'Épargne, ...) à chaque fois qu'elles prêtent de
              l'argent.
              <p>
                Dès qu'elles accordent un prêt, par une simple écriture comptable
                elles créent de l'argent à partir de rien.
              </p>
              <p>
                Ces banques disposent donc en quelque sorte d'un pouvoir magique.
              </p>
            </>
          ) : (
            <>
              Over 95% of our money is neither printed by the State nor by
              Central Banks, but created <i>*as if by magic*</i> by commercial
              banks (like JPMorgan, HSBC, ...) every time they lend money.
              <p>
                As soon as they grant a loan, through a simple accounting entry
                they create money out of thin air.
              </p>
              <p>These banks thus possess a sort of magical power.</p>
            </>
          )}
        </Callout>
      </p>
      <p>
        {fr ? (
          <>
            Vous voulez le voir de vos propres yeux ? Parfait. Passons à la
            pratique.
            <br />
            Vous êtes maintenant un banquier, toutes mes félicitations ! (ou pas)
          </>
        ) : (
          <>
            Want to see it with your own eyes? Perfect. Let's get hands-on.
            <br />
            You are now a banker, congratulations! (or not)
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "Illustration concrète — M. Nicolas QuiPaye veut acheter une maison"
            : "Concrete illustration — Mr. Nicolas WhoPays wants to buy a house"
        }
      >
        <p>
          {fr
            ? "Nicolas QuiPaye a un super projet : être propriétaire de sa résidence principale. Pour cela, il va faire une demande de prêt à sa banque pour un montant de 200 000 €."
            : "Nicolas WhoPays has a great plan: to own his primary residence. To do so, he will apply for a loan from his bank for €200,000."}
        </p>
        <p>
          {fr
            ? "Et c'est là que vous entrez en scène : vous êtes son banquier, vous avez le pouvoir d'accomplir son rêve en lui accordant ce prêt."
            : "And this is where you come in: you are his banker, you have the power to make his dream come true by granting this loan."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Mais avant de prendre les commandes, faisons un petit rappel de vocabulaire en comptabilité."
          : "But before taking the controls, let's do a quick vocabulary refresher in accounting."}
      </p>
      <Callout
        title={
          fr
            ? "Comptabilité — Quelques définitions essentielles"
            : "Accounting — A few essential definitions"
        }
      >
        <p>
          <KeywordHighlight>{fr ? "ACTIF" : "ASSETS"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est tout ce que vous possédez et qui a de la valeur."
              : "→ Everything you own that has value."}
          </Emphasis>{" "}
          <br />
          <i>
            {fr
              ? "Votre épargne, votre maison, votre téléphone..."
              : "Your savings, your house, your phone..."}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "PASSIF" : "LIABILITIES"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est la provenance de l'argent qui a payé tout ce que vous possédez."
              : "→ The source of the money that paid for everything you own."}
          </Emphasis>
          <br />
          <i>
            {fr ? (
              <>
                L'argent peut venir de deux endroits :
                <ul>
                  <li>
                    Des autres : c'est une <u>dette</u>.
                  </li>
                  <li>
                    De vous-même : c'est un <u>capital propre</u>.
                  </li>
                </ul>
              </>
            ) : (
              <>
                Money can come from two places:
                <ul>
                  <li>
                    From others: that's a <u>debt</u>.
                  </li>
                  <li>
                    From yourself: that's <u>equity</u>.
                  </li>
                </ul>
              </>
            )}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "CRÉANCE" : "CLAIM"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est une promesse officielle que quelqu'un va vous rendre l'argent qu'il vous doit."
              : "→ An official promise that someone will pay you back the money they owe you."}
          </Emphasis>
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            C'est bon ? Parfait. <br /> Regardez le bilan de la banque de M.
            QuiPaye : elle a déjà octroyé des prêts à des clients pour une valeur
            de 1 000 000 €. <br />
            Maintenant, il est temps d'accorder le prêt à votre client.
          </>
        ) : (
          <>
            Got it? Perfect. <br /> Look at Mr. WhoPays's bank balance sheet: it
            has already granted loans to customers worth €1,000,000. <br />
            Now, it's time to grant the loan to your customer.
          </>
        )}
      </p>
      <CreditCreationSimulator />
      <p>
        {fr
          ? <>
              Si tout ceci est clair pour vous, je vous propose de passer au second
              aspect fondamental de notre économie :{" "}
              <Emphasis>les deux niveaux de monnaies</Emphasis>.
            </>
          : <>
              If all of this is clear, I suggest we move on to the second
              fundamental aspect of our economy:{" "}
              <Emphasis>the two levels of money</Emphasis>.
            </>}
      </p>
    </PageTemplate>
  );
};
