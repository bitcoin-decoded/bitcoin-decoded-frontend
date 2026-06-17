import { type CSSProperties, type FC } from "react";

import { usePageTheme } from "../../../Design";

type Props = {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
  primaryDisabled: boolean;
  secondaryDisabled: boolean;
};

export const SimulatorControls: FC<Props> = ({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryDisabled,
  secondaryDisabled,
}) => {
  const { colors, moduleTheme } = usePageTheme();

  const containerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "1rem",
  };

  const buttonStyle: CSSProperties = {
    flex: "1 1 0",
    minWidth: "min(100%, 9rem)",
    padding: "0.7rem 1rem",
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: 1.3,
    borderRadius: "0.5rem",
    border: `1px solid ${colors[moduleTheme].border.secondary}`,
    backgroundColor: colors.base.background.secondary,
    color: colors.base.text.primary,
    cursor: "pointer",
    transition: "background-color 0.2s, opacity 0.2s",
    textAlign: "center",
    whiteSpace: "normal",
  };

  const disabledStyle: CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <div style={containerStyle}>
      <button
        style={{ ...buttonStyle, ...(primaryDisabled ? disabledStyle : {}) }}
        onClick={onPrimary}
        disabled={primaryDisabled}
      >
        {primaryLabel}
      </button>
      <button
        style={{ ...buttonStyle, ...(secondaryDisabled ? disabledStyle : {}) }}
        onClick={onSecondary}
        disabled={secondaryDisabled}
      >
        {secondaryLabel}
      </button>
    </div>
  );
};
