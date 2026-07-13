import { type FC, useEffect, useMemo } from "react";

import { Disclosure, FeedbackPanel, HighlightText, Reference } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
import { BalanceSheet } from "../../BalanceSheet";
import { useToggleSimulator } from "../../hooks";
import { SimulatorControls } from "../../SimulatorControls";
import { getUserBankCredit } from "../data";

type Props = {
  /** Fired once the loan has been granted (the simulator's final state). */
  onComplete?: () => void;
};

export const CreditCreationSimulator: FC<Props> = ({ onComplete }) => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const dataset = useMemo(() => getUserBankCredit(language), [language]);
  const { isActive, activate, reset, data } = useToggleSimulator(dataset);

  useEffect(() => {
    if (isActive) onComplete?.();
  }, [isActive, onComplete]);

  return (
    <FrText>
      <div style={{ marginTop: "2rem" }}>
        <SimulatorControls
          primaryLabel={t("simulator.credit.grant")}
          secondaryLabel={t("simulator.credit.retry")}
          onPrimary={activate}
          onSecondary={reset}
          primaryDisabled={isActive}
          secondaryDisabled={!isActive}
        />
        <BalanceSheet
          title={t("simulator.credit.title")}
          assets={data!.bank.assets}
          liabilities={data!.bank.liabilities}
        />
        <div style={{ marginTop: "1rem" }}>
          <Disclosure title={fr ? "Note d'attention" : "A word of caution"}>
            {fr ? (
              <p>
                Petite triche pédagogique : j'ai laissé de côté le capital propre, les réserves, les
                dettes interbancaires. Une vraie banque a tout ça aussi. On y revient{" "}
                <Reference to={ROUTE_NAME.Banking_2}>au chapitre suivant</Reference>. Pour
                l'instant, on regarde un seul truc : la ligne magique.
              </p>
            ) : (
              <p>
                A small pedagogical shortcut: I've left out the bank's own capital, its reserves,
                its interbank debt. A real bank has all of that too. We'll get to it in{" "}
                <Reference to={ROUTE_NAME.Banking_2}>the next chapter</Reference>. For now, we're
                zooming in on one thing only: the magic line.
              </p>
            )}
          </Disclosure>
        </div>
        {isActive && (
          <FeedbackPanel tone="info" style={{ marginTop: "1.5rem" }}>
            <p style={{ margin: "0 0 0.6rem 0" }}>
              {fr
                ? "ALAKAZAM ! 💥 Regarde attentivement la ligne en jaune."
                : "ALAKAZAM! 💥 Look closely at the line in yellow."}
            </p>
            <p style={{ margin: "0 0 0.6rem 0" }}>
              {fr
                ? "Par un simple jeu d'écritures, en un seul clic, tu as en tant que banquier créé une ligne magique : une créance de 200 000 € (un actif car Nicolas te doit cet argent) et un dépôt de 200 000 € dans le compte de banque de Nicolas (un passif pour toi, car cet argent est dû au client : il peut le retirer ou le dépenser à tout moment)."
                : "With one simple bookkeeping move, in a single click, you the banker just created a magic line: a €200,000 claim (an asset, because Nicolas owes you that money) and a €200,000 deposit in Nicolas's bank account (a liability for you, because that money is owed to the customer: he can withdraw it or spend it whenever he wants)."}
            </p>

            <p style={{ margin: "0 0 0.6rem 0" }}>
              {fr ? (
                <>
                  200 000 € viennent d'apparaître sur le compte de Nicolas. Ils sont sortis du
                  chapeau, enfin... presque ! En face, Nicolas porte maintenant une dette de 200 000
                  €.{" "}
                  <HighlightText>
                    La banque n'a absolument pas créé de richesse. Elle a juste créé de la monnaie
                    d'un côté et une dette de l'autre.
                  </HighlightText>
                  {" Et c'est exactement ça, le tour de passe-passe."}
                </>
              ) : (
                <>
                  €200,000 just appeared in Nicolas's account. Pulled out of a hat, well... almost!
                  On the other side, Nicolas now carries a €200,000 debt.{" "}
                  <HighlightText>
                    The bank created no wealth whatsoever. It just created money on one side and
                    debt on the other.
                  </HighlightText>
                  {" And that, right there, is the sleight of hand."}
                </>
              )}
            </p>

            <p style={{ margin: 0 }}>
              {fr ? (
                <>
                  Voilà.{" "}
                  <Reference href="https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf">
                    La monnaie scripturale que tu utilises tous les jours naît surtout du crédit
                    bancaire
                  </Reference>
                  {", bien plus que de la planche à billets."}
                </>
              ) : (
                <>
                  There you have it.{" "}
                  <strong>
                    <Reference href="https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf">
                      The bank-deposit money you use every day is born mostly from bank lending
                    </Reference>
                  </strong>
                  {", far more than from any printing press."}
                </>
              )}
            </p>
          </FeedbackPanel>
        )}
      </div>
    </FrText>
  );
};
