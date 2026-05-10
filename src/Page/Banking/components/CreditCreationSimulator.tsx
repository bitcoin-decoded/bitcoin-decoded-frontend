import { type CSSProperties, type FC, useMemo } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";
import { getUserBankCredit } from "../data";

import { BalanceSheet } from "./BalanceSheet";

export const CreditCreationSimulator: FC = () => {
  const { colors, moduleTheme } = usePageTheme();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const dataset = useMemo(() => getUserBankCredit(language), [language]);
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

  const grantButtonStyle: CSSProperties = {
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
            ...grantButtonStyle,
            ...(isActive ? disabledStyle : {}),
          }}
          onClick={activate}
          disabled={isActive}
        >
          {t("simulator.credit.grant")}
        </button>
        <button
          style={{
            ...resetButtonStyle,
            ...(!isActive ? disabledStyle : {}),
          }}
          onClick={reset}
          disabled={!isActive}
        >
          {t("simulator.credit.retry")}
        </button>
      </div>
      <BalanceSheet
        title={t("simulator.credit.title")}
        assets={data!.bank.assets}
        liabilities={data!.bank.liabilities}
      />
      {isActive && (
        <>
          <p style={sectionStyle}>
            <strong>
              {fr
                ? "ALAKAZAM ! 💥 Regardes attentivement la ligne en jaune. 🧐"
                : "ALAKAZAM! 💥 Look carefully at the yellow line. 🧐"}
            </strong>
            <br />
            {fr
              ? "Par un simple jeu d'écritures, en un seul clic, tu as en tant que banquier créé une ligne magique : une créance de 200 000 € (un actif car Nicolas te doit cet argent) et un dépôt de 200 000 € dans le compte de banque de Nicolas (un passif pour toi, car cet argent est dû au client : il peut le retirer ou le dépenser à tout moment). 200 000 € ont littéralement été ajoutés dans l'économie."
              : "With a simple accounting entry, in a single click, you as a banker created a magic line: a claim of $200,000 (an asset because Mr. Nicolas owes you this money) and a deposit of $200,000 in Nicolas's bank account (a liability for you, because this money is owed to the customer: they can withdraw it or spend it at any time). $200,000 has literally been added to the economy."}
          </p>
          <p style={sectionStyle}>
            {fr
              ? "Voilà. L'essentiel de la monnaie en circulation provient du crédit bancaire, pas de la planche à billets."
              : "The vast majority of money in circulation is created through bank lending, not by the central bank printing money."}
          </p>
        </>
      )}
    </div>
  );
};
