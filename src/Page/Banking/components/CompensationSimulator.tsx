import { type CSSProperties, type FC, useMemo } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";
import { getUserBankCompensation } from "../data";

import { BalanceSheet } from "./BalanceSheet";

export const CompensationSimulator: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const dataset = useMemo(() => getUserBankCompensation(language), [language]);
  const { isActive, activate, reset, data } = useToggleSimulator(dataset);

  const controlsStyle: CSSProperties = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const baseButtonStyle: CSSProperties = {
    padding: "0.75rem 1.5rem",
    fontWeight: 600,
    borderRadius: "0.5rem",
    border: `1px solid ${colors[moduleTheme].border.secondary}`,
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const clearButtonStyle: CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: colors.base.background.secondary,
    color: colors.base.text.primary,
  };

  const resetButtonStyle: CSSProperties = {
    ...baseButtonStyle,
    backgroundColor: colors.base.background.secondary,
    color: colors.base.text.primary,
  };

  const disabledStyle: CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={controlsStyle}>
        <button
          style={{
            ...clearButtonStyle,
            ...(isActive ? disabledStyle : {}),
          }}
          onClick={activate}
          disabled={isActive}
        >
          {t("simulator.compensation.start")}
        </button>
        <button
          style={{
            ...resetButtonStyle,
            ...(!isActive ? disabledStyle : {}),
          }}
          onClick={reset}
          disabled={!isActive}
        >
          {t("simulator.compensation.retry")}
        </button>
      </div>
      <BalanceSheet
        title={t("simulator.compensation.title")}
        assets={data!.bank.assets}
        liabilities={data!.bank.liabilities}
      />
      {isActive && (
        <>
          <p>
            {fr
              ? "Et voilà ! La compensation est effectuée. Observe bien les changements en jaune."
              : "And there it is! The clearing is done. Look closely at what changed in yellow."}
          </p>
          <ul>
            {fr ? (
              <>
                <li>Au passif : la banque de Nicolas a épongé sa dette.</li>
                <li>À l'actif : les "Réserves M0" de la banque ont diminué de 200 000 €.</li>
              </>
            ) : (
              <>
                <li>Liabilities side: Nicolas's bank has wiped out its debt.</li>

                <li>Assets side: the bank's "M0 reserves" dropped by $200,000.</li>
              </>
            )}
          </ul>
          <p>
            {fr
              ? "La banque a bel et bien utilisé ses réserves en monnaie de Banque Centrale (M0) pour régler une dette née d'une transaction en monnaie commerciale (M2). Tu saisis maintenant la différence entre ces deux niveaux de monnaie !"
              : "The bank really did use its Central Bank reserves (M0) to settle a debt born from a commercial-money (M2) transaction. Now you've got the difference between these two levels of money!"}
          </p>
        </>
      )}
    </div>
  );
};
