import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { DefaultSimulator, getQuizDataM0, Quiz } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";


export const Banking3Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.qe")}>
      <BlockReader chapterId={ROUTE_NAME.Banking_3}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Une banque manque d'argent. Pas de problème : la Banque Centrale appuie sur un
                bouton, et l'argent apparaît. Magique, non ? Tu te doutes bien qu'il y a un piège.
                Il s'appelle le Quantitative Easing.
              </>
            ) : (
              <>
                A bank runs short of money. No problem: the central bank presses a button, and the
                money appears. Magic, right? You can probably guess there's a catch. It's called
                Quantitative Easing.
              </>
            )}
          </ChapterPrelude>
          <p>{fr ? "On a vu deux grands principes :" : "We've seen two key principles:"}</p>
          <ol>
            <li>
              {fr
                ? "L'essentiel de la monnaie en circulation (M2) est une promesse de remboursement."
                : "Most of the money in circulation (M2) is a promise of repayment."}
            </li>
            <li>
              {fr
                ? "Les banques commerciales doivent absolument avoir assez de monnaie de réserve (M0) afin de régler leurs comptes entre elles."
                : "Commercial banks absolutely must hold enough reserve money (M0) to settle their accounts with one another."}
            </li>
          </ol>
          <p>
            {fr
              ? "Et si une banque venait à manquer de M0, que se passerait-il ?"
              : "And if a bank were to run out of M0, what would happen?"}
          </p>
        </Block>

        <Block>
          <Callout
            title={
              fr
                ? "La monnaie de Banque Centrale : le pilier de l'édifice économique"
                : "Central Bank money: the pillar holding up the whole structure"
            }
          >
            <p>
              {fr ? (
                <>
                  Si la Banque de <i>Nicolas</i> n'avait pas pu payer sa dette auprès de la Banque
                  de <i>Mme Michu</i>, alors il est possible que la banque de <i>Mme Michu</i>{" "}
                  n'aurait à son tour pas pu payer toutes ses dettes auprès d'autres banques
                  tierces, et ainsi de suite. Par effet domino, les banques pourraient être dans
                  l'incapacité d'honorer leurs dettes. Et ce serait catastrophique.
                </>
              ) : (
                <>
                  If <i>Nicolas</i>'s Bank couldn't pay its debt to <i>Ms. Smith</i>'s Bank, then{" "}
                  <i>Ms. Smith</i>'s bank might in turn fail to pay all its own debts to other
                  third-party banks, and so on. Through a domino effect, banks could become unable
                  to honor their debts. And that would be catastrophic.
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  La monnaie M0 est la garantie que les paiements en M2 (qui sont des promesses)
                  reposent sur un actif que personne ne peut contester : la monnaie de Banque
                  Centrale elle-même. Sans cela, c'est tout le système de paiement qui s'enraye :
                  les promesses ne valent plus grand-chose si personne ne peut tenir la sienne.
                </>
              ) : (
                <>
                  M0 money is what guarantees that M2 payments (which are promises) rest on an asset
                  nobody can dispute: Central Bank money itself. Without it, the whole payment
                  system seizes up: promises aren't worth much if no one can keep their own.
                </>
              )}
            </p>
            <p>
              {fr
                ? "Tu comprends donc que ne plus pouvoir payer en M0, c'est la spirale infernale : crise de liquidité, puis faillite, puis blocage en chaîne de l'économie."
                : "So you can see that no longer being able to pay in M0 is the start of the spiral: a liquidity crisis, then failure, then a chain freeze of the economy."}
            </p>
          </Callout>
        </Block>

        {/* Bloc-outil : déverrouillé quand le quiz reçoit une bonne réponse. */}
        <Block kind="tool">
          {({ markComplete }) => (
            <Quiz {...getQuizDataM0(language)} onCorrectAnswer={markComplete} />
          )}
        </Block>

        {/* Bloc-outil : déverrouillé quand la défaillance est simulée. */}
        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr ? (
                  <>
                    Reprenons la banque de <i>Nicolas</i>{" "}
                    <Reference to={ROUTE_NAME.Banking_2}> du chapitre précédent</Reference>. Tout
                    allait bien, jusqu'au jour où plusieurs <i>Nicolas</i> (appelons-les les{" "}
                    <i>Nicolas-bis</i>) cessent de rembourser leurs prêts. Voici la réaction en
                    chaîne :
                  </>
                ) : (
                  <>
                    Let's go back to <i>Nicolas</i>'s bank from{" "}
                    <Reference to={ROUTE_NAME.Banking_2}> the previous chapter</Reference>.
                    Everything was fine - until the day several <i>Nicolas</i>-types (let's call
                    them the <i>Nicolas-bis</i>) stop repaying their loans. Here's the chain
                    reaction:
                  </>
                )}
              </p>
              <ol>
                <li>
                  {fr
                    ? "Les créances de la banque diminuent à chaque fois qu'un prêt n'est pas remboursé."
                    : "The bank's claims shrink every time a loan goes unpaid."}
                </li>
                <li>
                  {fr
                    ? "Le capital propre diminue à son tour, afin que le bilan de la banque soit équilibré."
                    : "Equity shrinks in turn, so the bank's balance sheet stays balanced."}
                </li>
              </ol>
              <DefaultSimulator onComplete={markComplete} />
              <ol start={3}>
                <li>
                  {fr
                    ? "Les autres banques voient le capital propre de la banque fondre et commencent à paniquer."
                    : "Other banks watch the bank's equity melt away and start to panic."}
                </li>
                <li>
                  {fr
                    ? "Paniquées, les banques ne prêtent plus de M0 à la banque en difficulté : c'est la crise de confiance."
                    : "Panicked, banks stop lending M0 to the struggling bank: the confidence crisis hits."}
                </li>
                <li>
                  {fr
                    ? "La banque n'a plus accès au M0 et ne peut plus régler ses dettes avec les autres banques : tout le système est paralysé."
                    : "The bank no longer has access to M0 and can't settle its debts with other banks: the whole system is paralyzed."}
                </li>
              </ol>
            </>
          )}
        </Block>

        <Block>
          {fr ? (
            <>
              Face à un risque d'effondrement complet, la Banque Centrale sort son arme nucléaire
              monétaire pour sauver le système : le{" "}
              <Reference href="https://fr.wikipedia.org/wiki/Assouplissement_quantitatif">
                Quantitative Easing
              </Reference>
              .
            </>
          ) : (
            <>
              Facing the risk of total collapse, the Central Bank pulls out its monetary nuclear
              weapon to save the system:{" "}
              <Reference href="https://en.wikipedia.org/wiki/Quantitative_easing">
                Quantitative Easing
              </Reference>
              .
            </>
          )}
          <Callout
            title={fr ? "Qu'est-ce que le Quantitative Easing ?" : "What is Quantitative Easing?"}
          >
            <p>
              {fr
                ? "Le Quantitative Easing (ou assouplissement quantitatif) est une opération menée par les banques centrales qui consiste à racheter massivement des obligations (principalement des obligations d'État, autrement dit des dettes contractées par l'État) et qui sont détenues par des banques commerciales en manque de M0."
                : "Quantitative Easing is an operation run by central banks that consists of massively buying back bonds (mainly government bonds, in other words debts contracted by the State) held by commercial banks short on M0."}
            </p>
            <p>
              {fr ? (
                <>
                  Il s'agit d'un véritable tour de passe-passe : les banques commerciales peuvent
                  ainsi être renflouées en M0, comme par magie, grâce aux banques centrales qui
                  créent cette M0 quasiment à partir de rien. En échange, elles récupèrent les
                  obligations et les inscrivent à leur propre bilan. Autrement dit, la contrepartie
                  de tout ce M0 fraîchement créé, c'est de la dette d'État (rassurant, non ?).
                </>
              ) : (
                <>
                  It's a genuine sleight of hand: commercial banks get bailed out in M0, as if by
                  magic, thanks to central banks that conjure this M0 out of almost nothing. In
                  return, they take in the bonds and park them on their own balance sheet. In other
                  words, the counterpart backing all that freshly created M0 is government debt
                  (reassuring, isn't it?).
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Et ce n'est pas de la science-fiction : la Banque du Japon dégaine cette « arme »
                  dès 2001, la Fed américaine et la Banque d'Angleterre l'utilisent massivement
                  après la <i>crise des subprimes</i> de 2008, et la BCE s'y met à son tour en 2015.
                  Puis tout le monde remet ça, ensemble, lors de la <i>crise pandémique</i> de 2020.
                  Si tu veux vérifier par toi-même, la{" "}
                  <Reference href="https://www.banque-france.fr/fr/publications-et-statistiques/publications/quantitative-easing">
                    Banque de France
                  </Reference>{" "}
                  le raconte sans détour.
                </>
              ) : (
                <>
                  And this isn't science fiction: the Bank of Japan first pulled out this "weapon"
                  back in 2001, the US Fed and the Bank of England used it massively after the{" "}
                  <i>subprime crisis</i> of 2008, and the ECB joined in by 2015. Then everyone did
                  it again, together, during the <i>pandemic crisis</i> of 2020. If you want to
                  check for yourself, the{" "}
                  <Reference href="https://www.banque-france.fr/en/monetary-strategy/operational-framework/asset-purchase-programmes">
                    Banque de France
                  </Reference>{" "}
                  lays it out plainly.
                </>
              )}
            </p>
          </Callout>
        </Block>

        <Block last>
          <p>
            {fr
              ? "Tout cela semble merveilleux, n'est-ce pas ?"
              : "All of this sounds wonderful, doesn't it?"}
          </p>
          <p>
            {fr ? (
              <>
                On a ENFIN résolu tous les soucis monétaires en imprimant de la M0 à foison (ce que
                l'on appelle <i>faire tourner la planche à billets</i>).
              </>
            ) : (
              <>
                We've FINALLY solved every monetary problem by printing M0 by the truckload (what's
                called <i>running the printing press</i>).
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Tu te doutes bien que tout cela est bien trop beau pour être vrai. Et t'as raison :
                ces manœuvres ont des conséquences lourdes sur l'économie. Pour beaucoup de
                critiques du système monétaire, elles sont même au cœur du problème financier actuel
                - et après ce que tu vas lire, tu pourrais bien être d'accord ! C'est ce que tu vas
                voir par la suite :{" "}
              </>
            ) : (
              <>
                You can probably tell this is all too good to be true. And you're right: these
                maneuvers have heavy consequences for the economy. For many critics of the monetary
                system, they're even at the very heart of today's financial problem - and after what
                you're about to read, you might well agree. That's what you're going to see
                next:{" "}
              </>
            )}
            <Reference to={ROUTE_NAME.Banking_4}>{t("nav.tree.brokenEngine")}</Reference>.
          </p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
