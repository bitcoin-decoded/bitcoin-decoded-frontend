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

  const sectionStyle: CSSProperties = {
    paddingTop: "2rem",
    fontSize: "1rem",
    letterSpacing: "0.05rem",
    lineHeight: 1.625,
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
          <p style={sectionStyle}>
            <strong>
              {fr
                ? "Et voilà ! La compensation est effectuée. Observez bien les changements en jaune."
                : "There you go! The compensation is complete. Look closely at the changes in yellow."}
            </strong>
            <br />
            {fr ? (
              <>
                - Au passif : la banque de Nicolas a épongé sa dette.
                <br />- À l'actif : les "Réserves M0" de la banque ont diminué de 200 000 €.
              </>
            ) : (
              <>
                - On the liabilities side: Nicolas's bank has settled its debt.
                <br />- On the assets side: the bank's "M0 Reserves" decreased by €200,000.
              </>
            )}
          </p>
          <p style={sectionStyle}>
            {fr
              ? "La banque a bel et bien utilisé sa monnaie de Banque Centrale (M0) pour régler une dette née d'une transaction en monnaie commerciale (M2). Vous saisissez maintenant la différence entre ces deux niveaux de monnaie !"
              : "The bank did indeed use its Central Bank money (M0) to settle a debt born from a transaction in commercial money (M2). You now understand the difference between these two layers of money!"}
          </p>
          <p style={sectionStyle}>
            {fr
              ? "Vous venez encore de gratter une couche que la plupart des gens ne soupçonnent même pas. Et croyez-moi, ça va servir pour la suite."
              : "You've just uncovered another layer that most people don't even suspect exists. And trust me, this will matter for what comes next."}
          </p>
        </>
      )}
    </div>
  );
};
