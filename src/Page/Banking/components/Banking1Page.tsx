import { type FC } from "react";

import { Callout, Emphasis, KeywordHighlight, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
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
            95% de ton argent n'a jamais existé physiquement. Il n'a pas été imprimé. Il n'a pas été
            frappé. Il a été tapé au clavier. Par ta banque. Pour te prêter de l'argent que personne
            ne possédait.
          </>
        ) : (
          <>
            95% of your money has never physically existed. It was not printed. It was not minted.
            It was typed into a computer by your bank, to lend you money that nobody actually
            possessed.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Alors, sais-tu d'où vient l'argent ?
            <br />
            Si tu réponds <i>« de la planche à billets de la banque centrale »</i>, alors t'es tombé
            dans le piège.
            <br />
            Lis attentivement ce qui suit, tu vas être surpris :
          </>
        ) : (
          <>
            So, do you know where money comes from?
            <br />
            If you answer <i>"from the central bank's printing press"</i>, then you've fallen into
            the trap.
            <br />
            Read carefully what follows, you're in for a surprise:
          </>
        )}
        <Callout title={fr ? "D'où vient l'argent ?" : "Where does money come from?"}>
          {fr ? (
            <>
              Plus de 95% de notre monnaie n'est ni imprimée par l'État ni créée par les Banques
              Centrales, mais créée <i>comme par magie</i> par les banques commerciales (du style
              BNP Paribas, Caisse d'Épargne, ...) à chaque fois qu'elles prêtent de l'argent.
              <p>
                Dès qu'elles accordent un prêt, par une simple écriture comptable elles créent de
                l'argent à partir de rien.
              </p>
              <p>Ces banques disposent d'un pouvoir quasi magique.</p>
            </>
          ) : (
            <>
              More than 95% of our money is neither printed by the state nor created by central
              banks, but instead is created <i>as if by magic</i> by commercial banks (like
              JPMorgan, HSBC, ...) every time they lend money.
              <p>
                As soon as they grant a loan, through a simple accounting entry they create money
                out of thin air.
              </p>
              <p>These banks have an almost magical power.</p>
            </>
          )}
        </Callout>
      </p>
      <p>
        {fr ? (
          <>
            Tu veux le voir de tes propres yeux ? Parfait. Passons à la pratique.
            <br />
            Tu es maintenant banquier, toutes mes félicitations ! (ou pas)
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
            ? "Illustration concrète : Nicolas veut acheter une maison"
            : "Concrete illustration: Mr. Nicolas wants to buy a house"
        }
      >
        <p>
          {fr
            ? "Nicolas a un super projet : être propriétaire de sa résidence principale. Pour cela, il va faire une demande de prêt à sa banque pour un montant de 200 000 €."
            : "Nicolas has a great plan: to own his primary residence. To do so, he will apply for a loan from his bank for $200,000."}
        </p>
        <p>
          {fr
            ? "Et c'est là que tu entres en scène : Tu es son banquier, tu as le pouvoir d'accomplir son rêve en lui accordant ce prêt."
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
            ? "Comptabilité : Quelques définitions essentielles"
            : "Accounting: A few essential definitions"
        }
      >
        <p>
          <KeywordHighlight>{fr ? "ACTIF" : "ASSETS"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est tout ce que tu possèdes et qui a de la valeur."
              : "→ Everything you own that has value."}
          </Emphasis>{" "}
          <br />
          <i>
            {fr
              ? "ton épargne, ta maison, ton téléphone..."
              : "Your savings, your house, your phone..."}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "PASSIF" : "LIABILITIES"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est la provenance de l'argent qui a payé tout ce que tu possèdes."
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
                    De toi-même : c'est un <u>capital propre</u>.
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
              ? "→ C'est une promesse officielle que quelqu'un va te rendre l'argent qu'il te doit."
              : "→ An official promise that someone will pay you back the money they owe you."}
          </Emphasis>
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            C'est bon ? Parfait. <br /> Regardes le bilan de la banque de Nicolas : elle a déjà
            octroyé des prêts à des clients pour une valeur de 1 000 000 €. <br />
            Maintenant, accordes le prêt à ton client.
          </>
        ) : (
          <>
            Got it? Perfect. <br /> Look at Nicolas's bank balance sheet: it has already granted
            loans to customers worth $1,000,000. <br />
            Now, grant the loan to your customer.
          </>
        )}
      </p>
      <CreditCreationSimulator />
      <p>
        {fr ? (
          <>
            On enchaîne sur le second pilier :{" "}
            <Reference to={ROUTE_NAME.Banking_2}>les deux niveaux de monnaies</Reference>.
          </>
        ) : (
          <>
            Let's move on to the second pillar:{" "}
            <Reference to={ROUTE_NAME.Banking_2}>the two levels of money</Reference>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
