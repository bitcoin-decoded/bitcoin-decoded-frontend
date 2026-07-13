import { type FC } from "react";

import { Callout, HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { AccountingTerms, CreditCreationSimulator } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";

export const Banking1Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.moneyOrigin")} showChapterNav={false}>
      <BlockReader chapterId={ROUTE_NAME.Banking_1}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Plus de 90% de ton argent n'a jamais pris la forme d'un billet. Il n'a pas été
                imprimé. Il n'a pas été frappé. Il existe sous forme d'une ligne sur un compte.
                Créée par ta banque. Pour te prêter une somme que personne ne détenait avant.
              </>
            ) : (
              <>
                More than 90% of your money has never taken the shape of a banknote. It was never
                printed. It was never minted. It exists as a line on an account. Created by your
                bank. To lend you a sum that nobody held before.
              </>
            )}
          </ChapterPrelude>

          {fr ? (
            <>
              <p>Alors, sais-tu d'où vient l'argent ?</p>
              <p>
                Si tu réponds <i>« de la planche à billets de la banque centrale »</i>, alors t'es
                tombé dans le piège. Comme 95% des gens, y compris des diplômés en finance. C'est
                simplement parce qu'on ne te l'a jamais expliqué correctement.
              </p>
              <p>Lis attentivement ce qui suit, tu vas être surpris.</p>
            </>
          ) : (
            <>
              <p>So, do you actually know where money comes from?</p>
              <p>
                If your answer is <i>"the central bank's printing press"</i>, then you just walked
                right into it. Like 95% of people, finance graduates included. No one ever explained
                it to you properly.
              </p>
              <p>Read the next part carefully, you're in for a surprise.</p>
            </>
          )}
        </Block>

        <Block>
          <Callout title={fr ? "D'où vient l'argent ?" : "Where does money come from?"}>
            {fr ? (
              <>
                <Reference href="https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-in-the-modern-economy-an-introduction.pdf">
                  Plus de 90%
                </Reference>{" "}
                de notre monnaie n'est ni imprimée par l'État ni créée par les Banques Centrales,
                mais créée comme par magie par les banques commerciales (du style BNP Paribas,
                Caisse d'Épargne, ...) à chaque fois qu'elles prêtent de l'argent.
                <p>
                  Dès qu'elles accordent un prêt, par une simple écriture comptable elles créent de
                  l'argent à partir de rien.
                </p>
                <p>
                  Les plus sceptiques diront <i>« à partir de rien, vraiment ? »</i>. Pas tout à
                  fait, c'est vrai. À partir d'une promesse : celle de l'emprunteur de rembourser.
                  C'est tout ce qu'il faut à une banque pour fabriquer de la monnaie.
                </p>
                <p>
                  Ces banques disposent d'un pouvoir quasi magique. Quasi seulement : ce pouvoir
                  n'est ni illimité ni gratuit. Il faut un emprunteur solvable, des règles à
                  respecter, de quoi se refinancer. Ces contraintes existent, mais elles sont plus
                  souples qu'on ne le croit.{" "}
                  <HighlightText>
                    Dans les faits, quand la banque veut prêter, elle prête, et crée la monnaie au
                    passage
                  </HighlightText>
                  .
                </p>
              </>
            ) : (
              <>
                <Reference href="https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-in-the-modern-economy-an-introduction.pdf">
                  More than 90%
                </Reference>{" "}
                of our money is neither printed by the state nor created by central banks. It's
                conjured up <i>as if by magic</i> by commercial banks (think JPMorgan, HSBC, ...)
                every single time they lend money.
                <p>
                  The moment they grant a loan, with one simple accounting entry, they create money
                  out of thin air.
                </p>
                <p>
                  "Out of thin air, really?", the skeptics will fire back. That's true, but not
                  quite. Out of a promise: the borrower's promise to pay it back. That's all a bank
                  needs to manufacture money.
                </p>
                <p>
                  These banks hold an almost magical power. Almost: this power is neither unlimited
                  nor free. It takes a creditworthy borrower, rules to follow, a way to refinance.
                  Those constraints are real, but looser than people think.{" "}
                  <HighlightText>
                    In practice, when a bank wants to lend, it lends - and creates the money along
                    the way
                  </HighlightText>
                  .
                </p>
              </>
            )}
          </Callout>
        </Block>

        <Block>
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
                ? "Nicolas veut acheter une maison"
                : "Nicolas wants to buy a house"
            }
          >
            <p>
              {fr
                ? "Nicolas a un super projet : être propriétaire de sa résidence principale. Pour cela, il va faire une demande de prêt à sa banque pour un montant de 200 000 €."
                : "Nicolas has a great plan: to own the home he lives in. To pull it off, he's going to ask his bank for a €200,000 loan."}
            </p>
            <p>
              {fr
                ? "Et c'est là que tu entres en scène : tu es son banquier, tu as le pouvoir d'accomplir son rêve en lui accordant ce prêt."
                : "And this is where you step in: you're his banker and you hold the power to make his dream happen by granting that loan."}
            </p>
          </Callout>
        </Block>

        <Block>
          <p>
            {fr
              ? "Mais avant de prendre les commandes, faisons un petit rappel de vocabulaire en comptabilité."
              : "But before you take the controls, let's run through a quick accounting vocabulary refresher."}
          </p>
          <AccountingTerms />
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr ? (
                  <>
                    C'est bon ? Parfait. Regarde le bilan de la banque de Nicolas : elle a déjà
                    octroyé des prêts à des clients pour une valeur de 480 000 000 €. <br />
                  </>
                ) : (
                  <>
                    Got it? Perfect. Take a look at Nicolas's bank balance sheet: it has already
                    lent €1,000,000 to its customers. <br />
                  </>
                )}
              </p>
              <p>
                {fr
                  ? "Maintenant, accorde le prêt à ton client."
                  : "Now, grant the loan to your customer."}
              </p>
              <CreditCreationSimulator onComplete={markComplete} />
            </>
          )}
        </Block>

        <Block last>
          <p>
            {fr
              ? "Mais il manque encore une pièce du puzzle : ce que la banque doit garder en réserve en face de ce crédit."
              : "But one piece of the puzzle is still missing: what the bank has to hold in reserve against that credit."}{" "}
            <Reference to={ROUTE_NAME.Banking_2}>
              {fr ? "C'est le sujet suivant" : "That's the next topic"}
            </Reference>
            .
          </p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
