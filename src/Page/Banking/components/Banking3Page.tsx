import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataM0, Quiz } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

import { DefaultSimulator } from "./DefaultSimulator";

export const Banking3Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();

  return (
    <PageTemplate
      title={t("nav.tree.qe")}
      prelude={
        fr ? (
          <>
            Une banque manque d'argent. Pas de problème : la Banque Centrale appuie sur un bouton,
            et l'argent apparaît. Magique, non ? Tu te doutes bien qu'il y a un piège. Il s'appelle
            le Quantitative Easing.
          </>
        ) : (
          <>
            A bank runs short of money. No problem: the central bank presses a button, and the money
            appears. Magic, right? You can probably guess there's a catch. It's called Quantitative
            Easing.
          </>
        )
      }
    >
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
              Si la Banque de <i>Nicolas</i> n'avait pas pu payer sa dette auprès de la Banque de{" "}
              <i>Mme Michu</i>, alors il est possible que la banque de <i>Mme Michu</i> n'aurait à
              son tour pas pu payer toutes ses dettes auprès d'autres banques tierces, et ainsi de
              suite. Par effet domino, les banques pourraient être dans l'incapacité d'honorer leurs
              dettes. Et ce serait catastrophique.
            </>
          ) : (
            <>
              If <i>Nicolas</i>'s Bank couldn't pay its debt to <i>Ms. Michu</i>'s Bank, then{" "}
              <i>Ms. Michu</i>'s bank might in turn fail to pay all its own debts to other
              third-party banks, and so on. Through a domino effect, banks could become unable to
              honor their debts. And that would be catastrophic.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              La monnaie M0 est la garantie que les paiements en M2 (qui sont des promesses)
              reposent sur un actif que personne ne peut contester : la monnaie de Banque Centrale
              elle-même. Sans cela, c'est tout le système de paiement qui s'enraye : les promesses
              ne valent plus grand-chose si personne ne peut tenir la sienne.
            </>
          ) : (
            <>
              M0 money is what guarantees that M2 payments (which are promises) rest on an asset
              nobody can dispute: Central Bank money itself. Without it, the whole payment system
              seizes up: promises aren't worth much if no one can keep their own.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Tu comprends donc que ne plus pouvoir payer en M0, c'est la spirale infernale : crise de liquidité, puis faillite, puis blocage en chaîne de l'économie."
            : "So you can see that no longer being able to pay in M0 is the start of the spiral: a liquidity crisis, then failure, then a chain freeze of the economy."}
        </p>
      </Callout>
      <Quiz {...getQuizDataM0(language)} onCorrectAnswer={onQuizSolved} />

      {isQuizSolved && (
        <>
          <p>
            {fr
              ? "Si plusieurs Nicolas n'arrivent plus à rembourser leurs prêts au sein d'une même banque, voici la réaction en chaîne :"
              : "If several borrowers can no longer repay their loans within the same bank, here is the chain reaction:"}
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
            <li>
              <DefaultSimulator />
            </li>
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

          <p>
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
          </p>
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
                  peuvent créer de la M0 quasiment à partir de rien, en échange d'obligations
                  qu'elles encaissent à leur bilan. La « contrepartie » ? De la dette d'État.
                  (Rassurant, non ?)
                </>
              ) : (
                <>
                  It's a genuine sleight of hand: commercial banks get bailed out in M0, as if by
                  magic, thanks to central banks that can conjure M0 out of almost nothing, in
                  exchange for bonds they park on their own balance sheet. The "counterpart"?
                  Government debt. (Reassuring, isn't it?)
                </>
              )}
            </p>
            <p>
              {fr ? (
                <>
                  Et ce n'est pas de la science-fiction : cette « arme » a été utilisée massivement
                  par les plus grandes banques centrales (Japon, États-Unis, Europe) après la{" "}
                  <i>crise des subprimes</i> de 2008 et lors de la <i>crise pandémique</i> de 2020.
                </>
              ) : (
                <>
                  And this isn't science fiction: this "weapon" was used massively by the largest
                  central banks (Japan, United States, Europe) after the <i>subprime crisis</i> of
                  2008 and during the <i>pandemic crisis</i> of 2020.
                </>
              )}
            </p>
          </Callout>
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
        </>
      )}
    </PageTemplate>
  );
};
