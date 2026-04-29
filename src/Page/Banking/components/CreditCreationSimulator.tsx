import { type FC, type CSSProperties, useMemo } from "react";
import { BalanceSheet } from "./BalanceSheet";
import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";
import { getUserBankCredit } from "../data";

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
                ? "ALAKAZAM ! 💥 Regardez attentivement la ligne en jaune. 🧐"
                : "ALAKAZAM! 💥 Look carefully at the yellow line. 🧐"}
            </strong>
            <br />
            {fr
              ? "Par un simple jeu d'écritures, en un seul clic, vous avez en tant que banquier créé une ligne magique : une créance de 200 000 € (un actif car M. Nicolas QuiPaye vous doit cet argent) et un dépôt de 200 000 € dans le compte de banque de M. Nicolas QuiPaye (un passif pour vous, car vous avez envoyé cet argent sur son compte). 200 000 € ont littéralement été ajouté dans l'économie."
              : "With a simple accounting entry, in a single click, you as a banker created a magic line: a claim of €200,000 (an asset because Mr. Nicolas WhoPays owes you this money) and a deposit of €200,000 in Mr. Nicolas WhoPays's bank account (a liability for you, because you sent this money to his account). €200,000 has literally been added to the economy."}
          </p>
          <p style={sectionStyle}>
            {fr
              ? "Nous venons de voir un des principes les plus importants de l'économie moderne : l'essentiel de la monnaie provient du crédit."
              : "We have just seen one of the most important principles of the modern economy: most money comes from credit."}
          </p>
        </>
      )}
    </div>
  );
};
