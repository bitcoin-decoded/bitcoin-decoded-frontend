import { type FC } from "react";

import michuCruise from "../../../../src/Design/img/michu_cruise.webp";
import michuHouse from "../../../../src/Design/img/michu_house.webp";
import nicolasRich from "../../../../src/Design/img/nicolas_rich.webp";
import { Callout, Disclosure, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { CompensationSimulator, Illustration, MonetaryAggregates } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";

import { Home } from "@icons";

export const Banking2Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.twoLevels")}>
      <BlockReader chapterId={ROUTE_NAME.Banking_2}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Nicolas vient de virer 200 000 € pour acheter sa maison. Sauf qu'aucune liasse de
                200 000 € n'a bougé d'une banque à l'autre. Et pourtant, Mme Michu a bien reçu son
                virement. Comment c'est possible ?
              </>
            ) : (
              <>
                Nicolas just wired €200,000 to buy his house. Except not a single banknote made the
                trip from one bank to the other. And yet, Ms. Smith did receive the money. How does
                that work?
              </>
            )}
          </ChapterPrelude>
        </Block>

        <Block>
          <Illustration
            src={nicolasRich}
            alt={
              fr
                ? "Nicolas en smoking et monocle, un éventail de billets à la main"
                : "Nicolas in black tie and monocle, holding a fan of banknotes"
            }
            width="42%"
          />
          <p>
            {fr ? (
              <>
                <i>Nicolas</i> est content puisqu'il a reçu 200 000 €, prêtés par sa banque pour
                l'achat d'une résidence principale. Cet argent ne va pas rester très longtemps sur
                le compte de Nicolas : il va payer la vendeuse de la maison, <i>Mme Michu</i>.
              </>
            ) : (
              <>
                <i>Nicolas</i> is a happy man: his bank just lent him €200,000 to buy his main home.
                That money won't sit in Nicolas's account for long: he's using it to pay the seller,{" "}
                <i>Ms. Smith</i>.
              </>
            )}
          </p>
          <Illustration
            src={michuHouse}
            alt={
              fr
                ? "Mme Michu, lunettes de soleil et collier de perles, devant sa maison"
                : "Ms. Smith, in sunglasses and pearls, standing in front of her house"
            }
            width="55%"
            margin="1.5rem auto"
          />
          <p>
            {fr ? (
              <>
                Et que se passe-t-il si le compte de <i>Mme Michu</i> est dans une autre banque ?
              </>
            ) : (
              <>
                So what happens if <i>Ms. Smith</i> banks somewhere else?
              </>
            )}
          </p>
        </Block>

        <Block>
          <p>
            {fr ? (
              <>
                C'est là qu'intervient le mécanisme de compensation interbancaire. Attends, ne pars
                pas ! Je vais tout t'expliquer, de manière très simple et concrète.
              </>
            ) : (
              <>
                This is where interbank clearing comes in. Wait, don't go! I'll walk you through it,
                nice and simple.
              </>
            )}
          </p>
          <p>
            {fr
              ? "Avant d'aller plus loin, il faut comprendre qu'il existe deux types d'argent qui ne circulent jamais dans le même tuyau :"
              : "Before we go any further, you need to grasp one thing: there are two kinds of money, and they never flow through the same pipe:"}
          </p>
          <MonetaryAggregates />
        </Block>

        <Block>
          <p>
            {fr
              ? "Imagine maintenant des millions de virements en monnaie M2 chaque jour entre les banques."
              : "Now picture millions of M2 transfers flying between banks every single day."}
          </p>
          <p>
            {fr ? (
              <>
                À fréquence régulière (par exemple, en fin de journée), les banques font le total de
                ce qu'elles se doivent mutuellement : c'est la{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Compensation_(finance)">
                  compensation
                </Reference>
                . Puis elles règlent uniquement la différence nette (le solde) en monnaie M0 : c'est
                le{" "}
                <Reference href="https://fr.wikipedia.org/wiki/R%C3%A8glement_-_livraison">
                  règlement
                </Reference>
                . C'est ça, la compensation interbancaire.
              </>
            ) : (
              <>
                At regular intervals (say, at the end of the day), banks tally up everything they
                owe one another: that's the{" "}
                <Reference href="https://en.wikipedia.org/wiki/Clearing_(finance)">
                  clearing
                </Reference>
                . Then they settle only the net difference (the balance) in M0 money: that's the{" "}
                <Reference href="https://en.wikipedia.org/wiki/Settlement_(finance)">
                  settlement
                </Reference>
                . That, right there, is interbank clearing.
              </>
            )}
          </p>
        </Block>

        <Block>
          <p>
            {fr
              ? "Cela te parait abstrait ? Très bien, passons une fois de plus à la pratique !"
              : "Sounds abstract? Good. Let's get our hands dirty once again!"}
          </p>
          <Callout
            icon={<Home size={20} strokeWidth={2} />}
            title={
              fr
                ? "Le mécanisme de compensation pour la transaction entre Nicolas et Mme Michu"
                : "The clearing mechanism for the Nicolas-Ms. Smith transaction"
            }
          >
            <p>
              {fr ? (
                <>
                  Revenons à nos deux protagonistes <i>M. Nicolas </i> et <i>Mme Michu</i>. <br />
                  Ça y est, Nicolas fait le virement de 200 000 € sur le compte bancaire de Mme
                  Michu. Si tu as bien suivi, cette transaction correspond à la monnaie M2. Parfait.
                </>
              ) : (
                <>
                  Back to our two characters, <i>Nicolas </i>and<i> Ms. Smith</i>. <br />
                  Here we go: Nicolas wires €200,000 to Ms. Smith's bank account. If you've been
                  following, this transaction is M2 money. Perfect.
                </>
              )}
            </p>
            <Illustration
              src={michuCruise}
              alt={
                fr
                  ? "Mme Michu trinque au champagne sur le pont d'un bateau de croisière"
                  : "Ms. Smith raising a glass of champagne on a cruise ship deck"
              }
              width="62%"
              margin="1.5rem auto"
            />
            <p>
              {fr
                ? "On arrive en fin de journée, c'est l'heure des comptes : la banque de Nicolas doit 200 000 € à la banque de Mme Michu. Quelle monnaie va être utilisée ? Exact, la monnaie M0 !"
                : "End of the day rolls around, time to settle up: Nicolas's bank owes €200,000 to Ms. Smith's bank. Which money gets used? Exactly, M0 money!"}
            </p>
            <Disclosure title={fr ? "Note d'attention" : "A word of caution"}>
              {fr ? (
                <p>
                  On a simplifié : une seule transaction aujourd'hui. En vrai, c'est des millions de
                  virements compensés, et seul le solde net change de mains. Mais la mécanique est
                  identique.
                </p>
              ) : (
                <p>
                  We've simplified: just one transaction today. In real life it's millions of
                  transfers, all netted, and only the net balance changes hands. But the mechanism
                  is exactly the same.
                </p>
              )}
            </Disclosure>
          </Callout>
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr ? (
                  <>
                    Maintenant, observons le bilan complet de la banque de <i>Nicolas</i>, cette
                    fois avec tout ce qu'on avait laissé de côté{" "}
                    <Reference to={ROUTE_NAME.Banking_1}>au chapitre précédent</Reference> : les
                    réserves M0, les dettes envers la Banque Centrale, le capital propre. Note la
                    dette de 200 000 € en M0 au passif.
                  </>
                ) : (
                  <>
                    Now let's look at the full balance sheet of <i>Nicolas</i>'s bank - this time
                    with everything we set aside in{" "}
                    <Reference to={ROUTE_NAME.Banking_1}>the previous chapter</Reference>: the M0
                    reserves, the debt owed to the Central Bank, the equity. Notice the €200,000 M0
                    debt on the liabilities side.
                  </>
                )}
              </p>
              <p>
                {fr
                  ? "Clique ci-dessous pour voir comment la banque utilise ses réserves M0 pour solder cette dette lors de la compensation."
                  : "Click below to see how the bank taps its M0 reserves to clear that debt during settlement."}
              </p>
              <CompensationSimulator onComplete={markComplete} />
            </>
          )}
        </Block>

        <Block last>
          <p>
            {fr
              ? "Tu viens encore de gratter une couche que la plupart des gens ne soupçonnent même pas. Et crois-moi, ça va servir pour la suite :"
              : "You've just scratched off another layer most people never even suspect is there. And trust me, it's going to matter for what comes next:"}{" "}
            <Reference to={ROUTE_NAME.Banking_3}>{t("nav.tree.qe")}</Reference>.
          </p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
