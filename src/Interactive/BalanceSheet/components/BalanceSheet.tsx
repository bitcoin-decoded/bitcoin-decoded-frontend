import { type CSSProperties, type FC } from "react";

import { getTypography, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useBreakpoint } from "../../../Design/Responsive";
import { useTranslation } from "../../../I18n";
import type { BalanceSheetLine } from "../types";

type Props = {
  title: string;
  assets: BalanceSheetLine[];
  liabilities: BalanceSheetLine[];
};

export const BalanceSheet: FC<Props> = ({ title, assets, liabilities }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);

  const accentColor = colors[moduleTheme].border.secondary;
  const rowCount = Math.max(assets.length, liabilities.length);
  const rows = Array.from({ length: rowCount });

  // Ledger frame: sharp corners + a single module hairline. No gradient fill
  // and no gradient-border glow.
  const containerStyle: CSSProperties = {
    width: "100%",
    overflow: "hidden",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accentColor, 0.3)}`,
  };

  const titleStyle: CSSProperties = {
    ...typo.heading,
    padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
    letterSpacing: "0.08em",
    textAlign: "center",
    fontVariant: "small-caps",
    color: colors[moduleTheme].text.primary,
  };

  const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    maxWidth: "50rem",
    margin: "0 auto",
    textAlign: "center",
  };

  const tableHeaderStyle: CSSProperties = {
    ...typo.label,
    padding: isMobile ? "0.625rem 0.75rem" : "0.75rem 1.25rem",
    letterSpacing: "0.08em",
    fontVariant: "small-caps",
    color: colors[moduleTheme].text.primary,
    backgroundColor: withOpacity(accentColor, 0.1),
    borderBottom: `1px solid ${withOpacity(accentColor, 0.3)}`,
  };

  const headerLeftStyle: CSSProperties = {
    ...tableHeaderStyle,
    borderRight: `1px solid ${withOpacity(accentColor, 0.15)}`,
  };

  const cellStyle: CSSProperties = {
    padding: isMobile ? "0.625rem 0.75rem" : "0.75rem 1.25rem",
    width: "50%",
    whiteSpace: "pre-line",
    // Elevated from the old 14px: the parenthetical descriptions (e.g.
    // "créance sur Nicolas") were too small to read comfortably.
    fontSize: isMobile ? "0.875rem" : "0.9375rem",
    lineHeight: 1.55,
    color: colors.base.text.secondary,
    borderBottom: `1px solid ${withOpacity(accentColor, 0.1)}`,
  };

  const cellLeftStyle: CSSProperties = {
    ...cellStyle,
    borderRight: `1px solid ${withOpacity(accentColor, 0.15)}`,
  };

  const changedColor = colors.amber.text.secondary;
  const changedBg = withOpacity(colors.amber.text.secondary, 0.08);

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerLeftStyle}>{t("balanceSheet.assets")}</th>
            <th style={tableHeaderStyle}>{t("balanceSheet.liabilities")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => {
            const asset = assets[index];
            const liability = liabilities[index];
            const isLast = index === rowCount - 1;

            const buildCellContent = (line?: BalanceSheetLine) =>
              line ? (
                <>
                  {/* Amounts are ledger figures — mono, tabular, no faux-bold. */}
                  <strong style={{ ...typo.figure }}>{line.amount}</strong>
                  <br />
                  {line.description}
                </>
              ) : null;

            const lastRowOverride: CSSProperties = isLast ? { borderBottom: "none" } : {};

            const changedOverride = (line?: BalanceSheetLine): CSSProperties =>
              line?.hasChanged ? { color: changedColor, backgroundColor: changedBg } : {};

            return (
              <tr key={index}>
                <td style={{ ...cellLeftStyle, ...lastRowOverride, ...changedOverride(asset) }}>
                  {buildCellContent(asset)}
                </td>
                <td style={{ ...cellStyle, ...lastRowOverride, ...changedOverride(liability) }}>
                  {buildCellContent(liability)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
