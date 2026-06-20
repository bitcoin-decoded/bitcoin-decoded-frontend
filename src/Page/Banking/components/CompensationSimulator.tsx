import { type FC, useEffect, useMemo } from "react";

import { ArrowLeftRight } from "lucide-react";

import { FeedbackPanel } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";
import { getUserBankCompensation } from "../data";

import { BalanceSheet } from "./BalanceSheet";
import { SimulatorControls } from "./SimulatorControls";

type Props = {
  /** Fired once the compensation has been triggered (the simulator's final state). */
  onComplete?: () => void;
};

export const CompensationSimulator: FC<Props> = ({ onComplete }) => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const dataset = useMemo(() => getUserBankCompensation(language), [language]);
  const { isActive, activate, reset, data } = useToggleSimulator(dataset);

  useEffect(() => {
    if (isActive) onComplete?.();
  }, [isActive, onComplete]);

  return (
    <FrText>
      <div style={{ marginTop: "2rem" }}>
        <SimulatorControls
          primaryLabel={t("simulator.compensation.start")}
          secondaryLabel={t("simulator.compensation.retry")}
          onPrimary={activate}
          onSecondary={reset}
          primaryDisabled={isActive}
          secondaryDisabled={!isActive}
        />
        <BalanceSheet
          title={t("simulator.compensation.title")}
          assets={data!.bank.assets}
          liabilities={data!.bank.liabilities}
        />
        {isActive && (
          <FeedbackPanel
            tone="info"
            title={fr ? "Ce qui vient de se passer" : "What just happened"}
            icon={<ArrowLeftRight size={14} strokeWidth={2.2} />}
          >
            <p style={{ margin: "0 0 0.6rem 0" }}>
              {fr
                ? "Et voilà ! La compensation est effectuée. Observe bien les changements en jaune."
                : "And there it is! The clearing is done. Look closely at what changed in yellow."}
            </p>
            <ul style={{ margin: "0 0 0.6rem 0", paddingLeft: "1.2rem" }}>
              {fr ? (
                <>
                  <li>Au passif : la banque de Nicolas a épongé sa dette.</li>
                  <li>À l'actif : les "Réserves M0" de la banque ont diminué de 200 000 €.</li>
                </>
              ) : (
                <>
                  <li>Liabilities side: Nicolas's bank has wiped out its debt.</li>
                  <li>Assets side: the bank's "M0 reserves" dropped by €200,000.</li>
                </>
              )}
            </ul>
            <p style={{ margin: 0 }}>
              {fr
                ? "La banque a bel et bien utilisé ses réserves en monnaie de Banque Centrale (M0) pour régler une dette née d'une transaction en monnaie commerciale (M2). Tu saisis maintenant la différence entre ces deux niveaux de monnaie !"
                : "The bank really did use its Central Bank reserves (M0) to settle a debt born from a commercial-money (M2) transaction. Now you've got the difference between these two levels of money!"}
            </p>
          </FeedbackPanel>
        )}
      </div>
    </FrText>
  );
};
