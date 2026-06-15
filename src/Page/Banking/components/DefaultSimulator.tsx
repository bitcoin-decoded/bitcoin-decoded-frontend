import { type CSSProperties, type FC, useEffect, useMemo } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useToggleSimulator } from "../../Shared/hooks";
import { getUsersDebtsDefault } from "../data";

import { BalanceSheet } from "./BalanceSheet";

type Props = {
  /** Fired once the default has been simulated (the simulator's final state). */
  onComplete?: () => void;
};

export const DefaultSimulator: FC<Props> = ({ onComplete }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t, language } = useTranslation();
  const dataset = useMemo(() => getUsersDebtsDefault(language), [language]);
  const { isActive, activate, reset, data } = useToggleSimulator(dataset);

  useEffect(() => {
    if (isActive) onComplete?.();
  }, [isActive, onComplete]);

  const controlsStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "2rem",
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

  return (
    <>
      <BalanceSheet
        title={t("simulator.default.title")}
        assets={data!.bank.assets}
        liabilities={data!.bank.liabilities}
      />
      <div style={controlsStyle}>
        <button
          style={{ ...baseButtonStyle, ...(isActive ? disabledStyle : {}) }}
          onClick={activate}
          disabled={isActive}
        >
          {t("simulator.default.simulate")}
        </button>
        <button
          style={{ ...baseButtonStyle, ...(!isActive ? disabledStyle : {}) }}
          onClick={reset}
          disabled={!isActive}
        >
          {t("simulator.default.retry")}
        </button>
      </div>
    </>
  );
};
