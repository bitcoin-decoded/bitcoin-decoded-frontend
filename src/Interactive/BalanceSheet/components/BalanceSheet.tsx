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

  // The rules carry the ledger here, so they are drawn rather than hinted: the
  // frame at two pixels, the head-to-body divider with it, and the cell rules
  // left at one but given the opacity they were missing. A pixel and a half
  // lands between device pixels on a standard screen and blurs, which reads as
  // weaker than one crisp pixel, not stronger.
  const outerRule = `2px solid ${withOpacity(accentColor, 0.55)}`;
  const headRule = `2px solid ${withOpacity(accentColor, 0.45)}`;
  const columnRule = `1px solid ${withOpacity(accentColor, 0.38)}`;
  const rowRule = `1px solid ${withOpacity(accentColor, 0.26)}`;

  const containerStyle: CSSProperties = {
    width: "100%",
    overflowX: "auto",
    borderRadius: 0,
    border: outerRule,
  };

  const titleStyle: CSSProperties = {
    ...typo.heading,
    padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
    letterSpacing: "0.08em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: withOpacity(accentColor, 0.12),
    borderBottom: headRule,
  };

  const headerLeftStyle: CSSProperties = {
    ...tableHeaderStyle,
    borderRight: columnRule,
  };

  const cellStyle: CSSProperties = {
    padding: isMobile ? "0.625rem 0.75rem" : "0.75rem 1.25rem",
    width: "50%",
    whiteSpace: "pre-line",
    fontSize: isMobile ? "0.875rem" : "0.9375rem",
    lineHeight: 1.55,
    color: colors.base.text.secondary,
    borderBottom: rowRule,
  };

  const cellLeftStyle: CSSProperties = {
    ...cellStyle,
    borderRight: columnRule,
  };

  const changedColor = colors.amber.text.secondary;
  const changedBg = withOpacity(colors.amber.text.secondary, 0.16);

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
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
