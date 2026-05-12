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
              ? "Et voilà ! La compensation est effectuée. Observes bien les changements en jaune."
              : "There you go! The compensation is complete. Look closely at the changes in yellow."}
            <br />
            {fr ? (
              <ul>
                <li>Au passif : la banque de Nicolas a épongé sa dette.</li>
                <li>À l'actif : les "Réserves M0" de la banque ont diminué de 200 000 €.</li>
              </ul>
            ) : (
              <>
                - On the liabilities side: Nicolas's bank has settled its debt.
                <br />- On the assets side: the bank's "M0 Reserves" decreased by $200,000.
              </>
            )}
          </p>
          <p>
            {fr
              ? "La banque a bel et bien utilisé sa monnaie de Banque Centrale (M0) pour régler une dette née d'une transaction en monnaie commerciale (M2). Tu saisis maintenant la différence entre ces deux niveaux de monnaie !"
              : "The bank did indeed use its Central Bank money (M0) to settle a debt born from a transaction in commercial money (M2). You now understand the difference between these two layers of money!"}
          </p>
        </>
      )}
    </div>
  );
};
