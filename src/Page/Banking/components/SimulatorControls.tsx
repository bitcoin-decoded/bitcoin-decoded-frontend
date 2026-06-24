import { type CSSProperties, type FC } from "react";

import { Button, usePageTheme } from "../../../Design";

type Props = {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
  primaryDisabled: boolean;
  secondaryDisabled: boolean;
};

/**
 * The two simulator actions (run / reset), rendered with the ledger `Button`
 * primitive: a bracketed module-color primary and a quiet dashed-underline
 * secondary. No hand-rolled rounded boxes.
 */
export const SimulatorControls: FC<Props> = ({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryDisabled,
  secondaryDisabled,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const moduleColor = moduleTheme === "base" ? undefined : colors[moduleTheme].text.secondary;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.25rem",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  };

  return (
    <div style={containerStyle}>
      <Button variant="primary" color={moduleColor} onClick={onPrimary} disabled={primaryDisabled}>
        {primaryLabel}
      </Button>
      <Button variant="secondary" onClick={onSecondary} disabled={secondaryDisabled}>
        {secondaryLabel}
      </Button>
    </div>
  );
};
