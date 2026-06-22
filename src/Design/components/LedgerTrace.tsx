import { type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, getBrandGold, usePageTheme, useThemeContext } from "../Theme";

export type LedgerTraceRow = {
  /** Left-aligned label, rendered in mono. */
  label: ReactNode;
  /** Right-aligned value, rendered in mono. */
  value: ReactNode;
  /**
   * Visual treatment:
   * - `default`: standard row with `→` arrow prefix
   * - `muted`: dimmer text for secondary/derived rows
   * - `highlight`: bold value (for emphasis without changing color)
   * @default "default"
   */
  variant?: "default" | "muted" | "highlight";
};

type Props = {
  /** Ordered rows rendered as the trace output. */
  rows: LedgerTraceRow[];
  /**
   * Optional "final" row — gets a separator rule above it and a `⌗`
   * gold marker as prefix instead of the `→` arrow. Use for sealed/
   * validated values (e.g. "M2 estimée", "système externe requis").
   */
  finalRow?: LedgerTraceRow;
  /** Override the accent color of the `⌗` final marker. Defaults to brand gold. */
  accentColor?: string;
};

/**
 * The ledger-system simulation output — replaces the metric cards and
 * pop-styled result boxes that simulators currently use. A vertical mono
 * column of `→ label    value` rows reads as the trace of an executed
 * transaction, like a block explorer printing the operations of a sealed
 * block. The final row (optional) is the "result", marked by the gold
 * `⌗` glyph above a hairline gold separator.
 *
 * Pure presentation — callers compute the rows and pass them in. The
 * primitive doesn't know about the simulation; it just lays out the
 * output in the canonical ledger register.
 */
export const LedgerTrace: FC<Props> = ({ rows, finalRow, accentColor }) => {
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();

  const accent = accentColor ?? getBrandGold(theme);

  const containerStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.8125rem",
    lineHeight: 1.85,
    color: colors.base.text.primary,
    display: "flex",
    flexDirection: "column",
  };

  const rowStyle = (variant: LedgerTraceRow["variant"] = "default"): CSSProperties => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "1rem",
    color: variant === "muted" ? colors.base.text.secondary : colors.base.text.primary,
    fontWeight: variant === "highlight" ? 500 : 400,
  });

  const labelStyle: CSSProperties = {
    flex: "1 1 auto",
    display: "flex",
    gap: "0.55rem",
    alignItems: "baseline",
    minWidth: 0,
  };

  const prefixStyle = (highlighted: boolean): CSSProperties => ({
    flex: "0 0 auto",
    color: highlighted ? accent : colors.base.text.secondary,
    fontWeight: highlighted ? 500 : 400,
  });

  const valueStyle = (highlight: boolean): CSSProperties => ({
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    fontWeight: highlight ? 500 : 400,
  });

  const finalSeparatorStyle: CSSProperties = {
    height: BRAND.figures.ruleThickness,
    background: `${accent}55`,
    marginTop: "0.4rem",
    marginBottom: "0.4rem",
  };

  return (
    <div style={containerStyle}>
      {rows.map((row, index) => (
        <div key={index} style={rowStyle(row.variant)}>
          <span style={labelStyle}>
            <span aria-hidden="true" style={prefixStyle(false)}>
              →
            </span>
            <span>{row.label}</span>
          </span>
          <span style={valueStyle(row.variant === "highlight")}>{row.value}</span>
        </div>
      ))}
      {finalRow && (
        <>
          <div aria-hidden="true" style={finalSeparatorStyle} />
          <div style={rowStyle("highlight")}>
            <span style={labelStyle}>
              <span aria-hidden="true" style={prefixStyle(true)}>
                ⌗
              </span>
              <span>{finalRow.label}</span>
            </span>
            <span style={valueStyle(true)}>{finalRow.value}</span>
          </div>
        </>
      )}
    </div>
  );
};
