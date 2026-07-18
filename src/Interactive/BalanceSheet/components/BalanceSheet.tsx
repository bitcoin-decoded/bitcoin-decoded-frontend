import { type CSSProperties, type FC } from "react";

import { getTypography, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useBreakpoint } from "../../../Design/Responsive";
import { useTranslation } from "../../../I18n";
import type { BalanceSheetLine } from "../types";

import { DoodleBalance } from "@doodle";

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
    // A balance sheet is two columns of figures whose thousands separators are
    // non-breaking ("500 000 000 €" is one token), so the table cannot fold
    // below ~640px. With `overflow: hidden` that width was pushed onto the
    // page, which is what broke the chapter on a phone. It scrolls inside its
    // own frame instead — the page body never scrolls sideways.
    overflowX: "auto",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accentColor, 0.3)}`,
  };

  const titleStyle: CSSProperties = {
    ...typo.heading,
    padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
    letterSpacing: "0.08em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.5rem" : "0.7rem",
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
  const changedBg = withOpacity(colors.amber.text.secondary, 0.16);

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        <DoodleBalance size={isMobile ? 24 : 30} style={{ flexShrink: 0 }} />
        <span style={{ textAlign: "center" }}>{title}</span>
      </h3>
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
