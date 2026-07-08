import { type FC, useEffect, useMemo } from "react";

import { FrText, useTranslation } from "../../../I18n";
import { BalanceSheet } from "../../BalanceSheet";
import { useToggleSimulator } from "../../hooks";
import { SimulatorControls } from "../../SimulatorControls";
import { getUsersDebtsDefault } from "../data";

type Props = {
  /** Fired once the default has been simulated (the simulator's final state). */
  onComplete?: () => void;
};

export const DefaultSimulator: FC<Props> = ({ onComplete }) => {
  const { t, language } = useTranslation();
  const dataset = useMemo(() => getUsersDebtsDefault(language), [language]);
  const { isActive, activate, reset, data } = useToggleSimulator(dataset);

  useEffect(() => {
    if (isActive) onComplete?.();
  }, [isActive, onComplete]);

  return (
    <FrText>
      <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
        <BalanceSheet
          title={t("simulator.default.title")}
          assets={data!.bank.assets}
          liabilities={data!.bank.liabilities}
        />
        <div style={{ marginTop: "1rem" }}>
          <SimulatorControls
            primaryLabel={t("simulator.default.simulate")}
            secondaryLabel={t("simulator.default.retry")}
            onPrimary={activate}
            onSecondary={reset}
            primaryDisabled={isActive}
            secondaryDisabled={!isActive}
          />
        </div>
      </div>
    </FrText>
  );
};
