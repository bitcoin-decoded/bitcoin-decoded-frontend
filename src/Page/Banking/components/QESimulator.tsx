import { type CSSProperties, type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";

export const QESimulator: FC = () => {
  const { theme, colors, moduleTheme } = usePageTheme();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { isActive, activate, reset } = useToggleSimulator();

  const controlsStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
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
    backgroundColor: colors.base.background.secondary,
    color: colors.base.text.primary,
  };

  const disabledStyle: CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  const ticketContainerStyle: CSSProperties = {
    position: "relative",
    backgroundColor: `${theme === "dark" ? "#172554" : "#fde68a"}`,
    border: `1px dashed ${theme === "dark" ? "#d97706" : "#451a03"}`,
    borderRadius: "0.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
  };

  const labelStyle: CSSProperties = {
    color: colors.base.text.secondary,
    fontSize: "0.875rem",
    marginBottom: "0.25rem",
  };

  const valueStyle: CSSProperties = {
    color: `${theme === "dark" ? "#f59e0b" : "#451a03"}`,
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
  };

  const cutoutStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "1rem",
    height: "3rem",
    backgroundColor: `${theme === "dark" ? "#d97706" : "#451a03"}`,
    borderRadius: "50%",
  };

  return (
    <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
      <div style={controlsStyle}>
        <button
          style={{ ...baseButtonStyle, ...(isActive ? disabledStyle : {}) }}
          onClick={activate}
          disabled={isActive}
        >
          {t("simulator.qe.buy")}
        </button>
        <button
          style={{ ...baseButtonStyle, ...(!isActive ? disabledStyle : {}) }}
          onClick={reset}
          disabled={!isActive}
        >
          {t("simulator.qe.retry")}
        </button>
      </div>
      <div style={ticketContainerStyle}>
        <div style={{ ...cutoutStyle, left: "-0.5rem" }}></div>
        <div style={{ ...cutoutStyle, right: "-0.5rem" }}></div>
        <h4
          style={{
            margin: 0,
            color: colors.base.text.primary,
            fontSize: "1.25rem",
          }}
        >
          {t("simulator.qe.bondTitle")}
        </h4>
        <div
          style={{
            fontSize: "0.9rem",
            color: colors.base.text.primary,
            marginBottom: "1.5rem",
            marginTop: "0.25rem",
          }}
        >
          {fr
            ? "Le coupon (paiement annuel) de l'obligation est fixé à 40€ (4% de 1 000 €)"
            : "The coupon (annual payment) of the bond is fixed at €40 (4% of €1,000)"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "1rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>{t("simulator.qe.bondPrice")}</div>
            {!isActive ? (
              <div style={valueStyle}>1 000 €</div>
            ) : (
              <div style={valueStyle}>↗ 4 000 €</div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={labelStyle}>{t("simulator.qe.bondYield")}</div>
            {!isActive ? <div style={valueStyle}>4%</div> : <div style={valueStyle}>↘ 1%</div>}
          </div>
        </div>
      </div>
      {isActive && (
        <p style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
          {fr ? (
            <>
              La Banque Centrale a inondé le marché pour acheter ces titres. En faisant s'envoler le
              prix de l'obligation à 4 000 €, son rendement annuel s'écrase mécaniquement à 1% : le
              coupon reste fixé à 40 €, mais rapporté à un prix d'achat de 4 000 €, cela ne
              représente plus que 1% de rendement. C'est ainsi que le{" "}
              <strong>
                Quantitative Easing écrase artificiellement les taux sur toute l'économie.
              </strong>
            </>
          ) : (
            <>
              The Central Bank flooded the market to buy these securities. By driving the bond's price up to €4,000, its annual yield mechanically drops to 1%: the coupon remains fixed at €40, but relative to a purchase price of €4,000, that's only a 1% return. This is
              how{" "}
              <strong>
                Quantitative Easing artificially crushes rates across the entire economy.
              </strong>
            </>
          )}
        </p>
      )}
    </div>
  );
};
