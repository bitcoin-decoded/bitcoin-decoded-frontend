import { type CSSProperties, type FC, useEffect } from "react";

import { FeedbackPanel, usePageTheme } from "../../../Design";
import { useBreakpoint } from "../../../Design/Responsive";
import { FrText, useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";

import { SimulatorControls } from "./SimulatorControls";

type Props = {
  /** Fired once the QE operation has been run (the simulator's final state). */
  onComplete?: () => void;
};

export const QESimulator: FC<Props> = ({ onComplete }) => {
  const { theme, colors } = usePageTheme();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const isMobile = useBreakpoint() === "mobile";
  const { isActive, activate, reset } = useToggleSimulator();

  useEffect(() => {
    if (isActive) onComplete?.();
  }, [isActive, onComplete]);

  const ticketContainerStyle: CSSProperties = {
    position: "relative",
    backgroundColor: theme === "dark" ? "#172554" : "#fde68a",
    border: `1px dashed ${theme === "dark" ? "#d97706" : "#451a03"}`,
    borderRadius: "0.5rem",
    padding: isMobile ? "1.25rem 1rem" : "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
  };

  const captionStyle: CSSProperties = {
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    color: colors.base.text.primary,
    margin: "0.5rem 0 1.25rem",
    lineHeight: 1.5,
  };

  const fieldsRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    // Align fields by their bottom edge so the values stay on a single visual
    // baseline even when one label wraps onto two lines.
    alignItems: "flex-end",
    gap: "1rem",
  };

  const fieldStyle: CSSProperties = {
    flex: "1 1 0",
    minWidth: "min(100%, 8rem)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
  };

  const labelStyle: CSSProperties = {
    color: colors.base.text.secondary,
    fontSize: isMobile ? "0.75rem" : "0.8rem",
    fontWeight: 500,
    textAlign: "center",
  };

  const valueStyle: CSSProperties = {
    color: theme === "dark" ? "#f59e0b" : "#451a03",
    fontSize: isMobile ? "1.4rem" : "1.75rem",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.2,
    textAlign: "center",
    whiteSpace: "nowrap",
    // Brief background flash on the new value so the change registers,
    // without permanently shifting the color (orange stays the field tone).
    padding: "0.1rem 0.4rem",
    borderRadius: "0.4rem",
    animation: isActive ? "qeValuePulse 0.85s ease-out" : undefined,
  };

  const cutoutStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "1rem",
    height: "3rem",
    backgroundColor: theme === "dark" ? "#d97706" : "#451a03",
    borderRadius: "50%",
  };

  return (
    <FrText>
      <style>{`
        @keyframes qeValuePulse {
          0% { background-color: rgba(245, 158, 11, 0); }
          15% { background-color: rgba(245, 158, 11, 0.32); }
          100% { background-color: rgba(245, 158, 11, 0); }
        }
      `}</style>
      <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
        <SimulatorControls
          primaryLabel={t("simulator.qe.buy")}
          secondaryLabel={t("simulator.qe.retry")}
          onPrimary={activate}
          onSecondary={reset}
          primaryDisabled={isActive}
          secondaryDisabled={!isActive}
        />
        <div style={ticketContainerStyle}>
          <div style={{ ...cutoutStyle, left: "-0.5rem" }}></div>
          <div style={{ ...cutoutStyle, right: "-0.5rem" }}></div>
          <h4
            style={{
              margin: 0,
              color: colors.base.text.primary,
              fontSize: isMobile ? "1.1rem" : "1.25rem",
              lineHeight: 1.25,
            }}
          >
            {t("simulator.qe.bondTitle")}
          </h4>
          <div style={captionStyle}>{t("simulator.qe.bondCaption")}</div>
          <div style={fieldsRowStyle}>
            <div style={fieldStyle}>
              <div style={labelStyle}>{t("simulator.qe.bondPrice")}</div>
              <div style={valueStyle}>{isActive ? "↗ 4 000 €" : "1 000 €"}</div>
            </div>
            <div style={fieldStyle}>
              <div style={labelStyle}>{t("simulator.qe.bondYield")}</div>
              <div style={valueStyle}>{isActive ? "↘ 1%" : "4%"}</div>
            </div>
          </div>
        </div>
        {isActive && (
          <FeedbackPanel tone="warning" style={{ marginTop: "1.5rem" }}>
            {fr ? (
              <p style={{ margin: 0 }}>
                La Banque Centrale a inondé le marché pour acheter ces titres. En faisant s'envoler
                le prix de l'obligation à 4 000 €, son rendement annuel s'écrase mécaniquement à 1%
                : le coupon reste fixé à 40 €, mais rapporté à un prix d'achat de 4 000 €, cela ne
                représente plus que 1% de rendement. C'est ainsi que l'
                <strong>
                  assouplissement quantitatif écrase artificiellement les taux, et de proche en
                  proche, sur une grande partie de l'économie.
                </strong>
              </p>
            ) : (
              <p style={{ margin: 0 }}>
                The Central Bank flooded the market to snap up these securities. By sending the
                bond's price soaring to €4,000, its annual yield mechanically collapses to 1%: the
                coupon is still fixed at €40, but set against a €4,000 purchase price, that's no
                more than a 1% return. This is how{" "}
                <strong>
                  Quantitative Easing artificially crushes rates, and step by step, spreads across
                  a large part of the economy.
                </strong>
              </p>
            )}
          </FeedbackPanel>
        )}
      </div>
    </FrText>
  );
};
