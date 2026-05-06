import { type FC } from "react";

import { Callout, Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataM0, Quiz } from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";
import { useToggleSimulator } from "../../Shared/hooks";

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
            Pour faire face à une crise de liquidité majeure et ainsi rétablir la confiance, la
            Banque Centrale renfloue les banques commerciales en monnaie M0 en leur rachetant
            massivement des obligations.
          </>
        ) : (
          <>
            To face a major liquidity crisis and restore confidence, the Central Bank bails out
            commercial banks in M0 money by massively buying back their bonds.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            On a vu deux grands principes :
            <ol>
              <li>
                L'essentiel de la monnaie en circulation (M2) est une promesse de remboursement.
              </li>
              <li>
                Les banques commerciales doivent absolument avoir assez de monnaie de réserve (M0)
                afin de régler leurs comptes entre elles.
              </li>
            </ol>
          </>
        ) : (
          <>
            We have seen two key principles:
            <ol>
              <li>Most of the money in circulation (M2) is a promise of repayment.</li>
              <li>
                Commercial banks absolutely must have enough reserve money (M0) to settle their
                accounts with each other.
              </li>
            </ol>
          </>
        )}
      </p>
      <p>
        <Emphasis>
          {fr
            ? "Et si une banque venait à manquer de M0, que se passerait-il ?"
            : "What if a bank were to run out of M0?"}
        </Emphasis>
      </p>
      <Callout
        title={
          fr
            ? "La monnaie de Banque Centrale : le pilier de l'édifice économique"
            : "Central Bank money: the pillar of the economic edifice"
        }
      >
        <p>
          {fr ? (
            <>
              Si la Banque de <i>M. QuiPaye</i> n'avait pas pu payer sa dette auprès de la Banque de{" "}
              <i>Mme Michu</i>, alors il est possible que la banque de <i>Mme Michu</i> n'aurait à
              son tour pas pu payer toutes ses dettes auprès d'autres banques tierces, et ainsi de
              suite. Par effet domino, les banques pourraient être dans l'incapacité d'honorer leurs
              dettes. <Emphasis>Et ce serait catastrophique.</Emphasis>
            </>
          ) : (
            <>
              If <i>Mr. WhoPays</i>'s Bank hadn't been able to pay its debt to <i>Ms. Michu</i>'s
              Bank, then it's possible that <i>Ms. Michu</i>'s bank in turn couldn't pay all its
              debts to other third-party banks, and so on. Through a domino effect, banks could
              become unable to honor their debts.{" "}
              <Emphasis>And that would be catastrophic.</Emphasis>
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              La monnaie M0 est la garantie que les paiements en M2 (qui sont des promesses) sont
              bel et bien basés sur quelque chose de réel.{" "}
              <Emphasis>
                Sans cela, c'est tout le système de paiement qui s'effondre car les promesses n'ont
                tout simplement plus aucune valeur
              </Emphasis>
              .
            </>
          ) : (
            <>
              M0 money is the guarantee that M2 payments (which are promises) are indeed based on
              something real.{" "}
              <Emphasis>
                Without it, the entire payment system collapses because promises simply have no
                value anymore
              </Emphasis>
              .
            </>
          )}
        </p>
        <p>
          {fr
            ? "Vous comprenez donc que ne pas payer en M0, c'est la faillite immédiate et le blocage de toute l'économie."
            : "So you understand that failing to pay in M0 means immediate bankruptcy and the freezing of the entire economy."}
        </p>
      </Callout>
      <Quiz {...getQuizDataM0(language)} onCorrectAnswer={onQuizSolved} />

      {isQuizSolved && (
        <>
          <p>
            {fr ? (
              <>
                Si plusieurs Nicolas n'arrivent plus à rembourser leurs prêts au sein d'une même
                banque, voici la réaction en chaîne :
                <ol>
                  <li>
                    Les créances de la banque diminuent à chaque fois qu'un prêt n'est pas
                    remboursé.
                  </li>
                  <li>
                    Le capital propre diminue à son tour, afin que le bilan de la banque soit
                    équilibré.
                  </li>
                  <DefaultSimulator />
                  <li>
                    Les autres banques voient le capital propre de la banque fondre et commencent à
                    paniquer.
                  </li>
                  <li>
                    Paniquées, les banques ne prêtent plus de M0 à la banque en difficulté :{" "}
                    <Emphasis>c'est la crise de confiance</Emphasis>.
                  </li>
                  <li>
                    La banque n'a plus accès au M0 et ne peut plus régler ses dettes avec les autres
                    banques : <Emphasis>tout le système est paralysé</Emphasis>.
                  </li>
                </ol>
              </>
            ) : (
              <>
                If several borrowers can no longer repay their loans within the same bank, here is
                the chain reaction:
                <ol>
                  <li>The bank's claims decrease each time a loan is not repaid.</li>
                  <li>Equity decreases in turn, so the bank's balance sheet stays balanced.</li>
                  <DefaultSimulator />
                  <li>Other banks see the bank's equity melting and start to panic.</li>
                  <li>
                    Panicked, banks stop lending M0 to the struggling bank:{" "}
                    <Emphasis>it's a confidence crisis</Emphasis>.
                  </li>
                  <li>
                    The bank no longer has access to M0 and can no longer settle its debts with
                    other banks: <Emphasis>the entire system is paralyzed</Emphasis>.
                  </li>
                </ol>
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Face à un risque d'effondrement complet, la Banque Centrale sort son arme nucléaire
                monétaire pour sauver le système : le <i>Quantitative Easing</i>.
              </>
            ) : (
              <>
                Facing the risk of total collapse, the Central Bank deploys its monetary nuclear
                weapon to save the system: <i>Quantitative Easing</i>.
              </>
            )}
          </p>
          <Callout
            title={fr ? "Qu'est-ce que le Quantitative Easing ?" : "What is Quantitative Easing?"}
          >
            <p>
              {fr
                ? "Le Quantitative Easing (ou assouplissement quantitatif) est une opération menée par les banques centrales qui consiste à racheter massivement des obligations (principalement des obligations d'État, autrement dit des dettes contractées par l'État) et qui sont détenues par des banques commerciales en manque de M0."
                : "Quantitative Easing is an operation conducted by central banks that consists of massively buying back bonds (mainly government bonds, essentially debts contracted by the State) held by commercial banks that are short on M0."}
            </p>
            <p>
              {fr
                ? "Il s'agit d'un véritable tour de passe-passe : les banques commerciales peuvent ainsi être renflouées en M0, comme par magie, grâce aux banques centrales qui peuvent imprimer de la M0 sans aucune contrepartie."
                : "It's a real magic trick: commercial banks can thus be bailed out in M0, as if by magic, thanks to central banks that can print M0 with no counterpart whatsoever."}
            </p>
            <p>
              {fr ? (
                <>
                  Et ce n'est pas de la science-fiction : cette "arme" a été utilisée massivement
                  par toutes les grandes banques centrales (Japon, États-Unis, Europe) après la{" "}
                  <i>crise des subprimes</i> de 2008 et lors de la <i>crise pandémique</i> de 2020.
                </>
              ) : (
                <>
                  And this is not science fiction: this "weapon" has been used massively by all
                  major central banks (Japan, United States, Europe) after the{" "}
                  <i>subprime crisis</i> of 2008 and during the <i>pandemic crisis</i> of 2020.
                </>
              )}
            </p>
          </Callout>
          <p>
            {fr
              ? "Tout cela semble merveilleux, n'est-ce pas ?"
              : "All of this seems wonderful, doesn't it?"}
          </p>
          <p>
            {fr ? (
              <>
                On a ENFIN résolu tous les soucis monétaires en imprimant de la M0 à foison (ce que
                l'on appelle <i>faire tourner la planche à billets</i>).
              </>
            ) : (
              <>
                We have FINALLY solved all monetary problems by printing M0 in abundance (what we
                call <i>running the printing press</i>).
              </>
            )}
          </p>
          <p>
            {fr
              ? "Vous vous doutez bien que tout cela est bien trop beau pour être vrai. Et vous avez raison : ces manœuvres ont des conséquences lourdes sur l'économie, et elles sont au cœur du problème financier actuel. C'est ce que vous allez voir par la suite. On y arrive !"
              : "You probably suspect all of this is too good to be true. And you're right: these maneuvers have major consequences for the economy, and they are at the heart of the current financial problem. This is what you are going to see next. We're getting there!"}
          </p>
        </>
      )}
    </PageTemplate>
  );
};
