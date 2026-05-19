import { type FC } from "react";

import { Callout, KeywordHighlight, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/";

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
            Plus de 90% de ton argent n'a jamais pris la forme d'un billet. Il n'a pas été imprimé.
            Il n'a pas été frappé. Il existe sous forme d'une ligne sur un compte. Créée par ta
            banque. Pour te prêter une somme que personne ne détenait avant.
          </>
        ) : (
          <>
            More than 90% of your money has never taken the shape of a banknote. It was never
            printed. It was never minted. It exists as a line on an account. Created by your bank.
            To lend you a sum that nobody held before.
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
            dans le piège. Comme 95% des gens, y compris des diplômés en finance. Ce n'est pas ta
            faute : on ne te l'a jamais expliqué correctement.
            <br />
            Lis attentivement ce qui suit, tu vas être surpris :
          </>
        ) : (
          <>
            So, do you actually know where money comes from?
            <br />
            If your answer is <i>"the central bank's printing press"</i>, then you just walked right
            into it. Like 95% of people, finance graduates included. It's not your fault: no one
            ever explained it to you properly.
            <br />
            Read the next part carefully, you're in for a surprise:
          </>
        )}
        <Callout title={fr ? "D'où vient l'argent ?" : "Where does money come from?"}>
          {fr ? (
            <>
              Plus de 90% de notre monnaie n'est ni imprimée par l'État ni créée par les Banques
              Centrales, mais créée <i>comme par magie</i> par les banques commerciales (du style
              BNP Paribas, Caisse d'Épargne, ...) à chaque fois qu'elles prêtent de l'argent.
              <p>
                Dès qu'elles accordent un prêt, par une simple écriture comptable elles créent de
                l'argent à partir de rien.
              </p>
              <p>
                « À partir de rien, vraiment ? », me répondront les plus sceptiques ! Presque. À
                partir d'une promesse : celle de l'emprunteur de rembourser. C'est tout ce qu'il
                faut à une banque pour fabriquer de la monnaie.
              </p>
              <p>
                Ces banques disposent d'un pouvoir quasi magique. Quasi seulement : ce pouvoir n'est
                ni illimité ni gratuit. Il faut un emprunteur solvable, des règles à respecter, de
                quoi se refinancer. Ces contraintes existent, mais elles sont plus souples qu'on ne
                le croit. Dans les faits, quand la banque veut prêter, elle prête - et crée la
                monnaie au passage.
              </p>
            </>
          ) : (
            <>
              More than 90% of our money is neither printed by the state nor created by central
              banks. It's conjured up <i>as if by magic</i> by commercial banks (think JPMorgan,
              HSBC, ...) every single time they lend money.
              <p>
                The moment they grant a loan, with one simple accounting entry, they create money
                out of thin air.
              </p>
              <p>
                "Out of thin air, really?", the skeptics will fire back. Almost. Out of a promise:
                the borrower's promise to pay it back. That's all a bank needs to manufacture money.
              </p>
              <p>
                These banks hold an almost magical power. Almost: this power is neither unlimited
                nor free. It takes a creditworthy borrower, rules to follow, a way to refinance.
                Those constraints are real, but looser than people think. In practice, when a bank
                wants to lend, it lends - and creates the money along the way.
              </p>
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
            Want to see it with your own eyes? Perfect. Let's get our hands dirty.
            <br />
            You're a banker now. Congratulations! (or not)
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "Illustration concrète : Nicolas veut acheter une maison"
            : "A concrete example: Nicolas wants to buy a house"
        }
      >
        <p>
          {fr
            ? "Nicolas a un super projet : être propriétaire de sa résidence principale. Pour cela, il va faire une demande de prêt à sa banque pour un montant de 200 000 €."
            : "Nicolas has a great plan: to own the home he lives in. To pull it off, he's going to ask his bank for a $200,000 loan."}
        </p>
        <p>
          {fr
            ? "Et c'est là que tu entres en scène : Tu es son banquier, tu as le pouvoir d'accomplir son rêve en lui accordant ce prêt."
            : "And this is where you step in: you're his banker, and you hold the power to make his dream happen by granting that loan."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Mais avant de prendre les commandes, faisons un petit rappel de vocabulaire en comptabilité."
          : "But before you take the controls, let's run through a quick accounting vocabulary refresher."}
      </p>
      <Callout
        title={
          fr
            ? "Comptabilité : Quelques définitions essentielles"
            : "Accounting: a few essential definitions"
        }
      >
        <p>
          <KeywordHighlight>{fr ? "ACTIF" : "ASSETS"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est tout ce que tu possèdes, ou tout ce qu'on te doit."
            : "→ Everything you own, or everything you're owed."}{" "}
          <br />
          <i>
            {fr
              ? "Ton épargne, ton téléphone, l'argent que t'as prêté à ton beau-frère et qu'il te doit toujours ? Ce sont des actifs !"
              : "Your savings, your phone, that money you lent your brother-in-law and still haven't seen again? All assets!"}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "PASSIF" : "LIABILITIES"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est tout ce que tu dois aux autres, plus ce qui t'appartient vraiment en propre."
            : "→ Everything you owe to others, plus what truly belongs to you (your own equity)."}
        </p>

        <i>
          {fr ? "L'argent peut venir de deux endroits :" : "The money can come from two places:"}
        </i>

        <ul>
          <li>
            {fr ? (
              <span>
                Des autres : c'est une <u>dette</u>.
              </span>
            ) : (
              <span>
                From others: that's <u>debt</u>.
              </span>
            )}
          </li>

          <li>
            {fr ? (
              <span>
                De toi-même : c'est un <u>capital propre</u>.
              </span>
            ) : (
              <span>
                From yourself: that's <u>equity</u>.
              </span>
            )}
          </li>
        </ul>
        <p>
          <KeywordHighlight>{fr ? "CRÉANCE" : "CLAIM"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est une promesse officielle que quelqu'un va te rendre l'argent qu'il te doit."
            : "→ An official, enforceable promise that someone will pay you back the money they owe you."}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            C'est bon ? Parfait. Regarde le bilan de la banque de Nicolas : elle a déjà octroyé des
            prêts à des clients pour une valeur de 1 000 000 €. <br />
          </>
        ) : (
          <>
            Got it? Perfect. Take a look at Nicolas's bank balance sheet: it has already lent
            $1,000,000 to its customers. <br />
          </>
        )}
      </p>
      <p>
        {fr ? "Maintenant, accorde le prêt à ton client." : "Now, grant the loan to your customer."}
      </p>
      <CreditCreationSimulator />
      <p>
        {fr
          ? "Mais il manque encore une pièce du puzzle : ce que la banque doit garder en réserve en face de ce crédit."
          : "But one piece of the puzzle is still missing: what the bank has to hold in reserve against that credit."}{" "}
        <Reference to={ROUTE_NAME.Banking_2}>
          {fr ? "C'est le sujet suivant" : "That's the next topic"}
        </Reference>
        .
      </p>
    </PageTemplate>
  );
};
