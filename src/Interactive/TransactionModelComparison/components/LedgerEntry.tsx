import { type CSSProperties, type FC } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { type Language } from "../../../I18n";
import { fmtEur } from "../../helpers";

type Props = {
  name: string;
  before: number;
  after: number;
  sent: number;
  positive: boolean;
  isAfter: boolean;
  accent: string;
  language: Language;
};

export const LedgerEntry: FC<Props> = ({
  name,
  before,
  after,
  sent,
  positive,
  isAfter,
  accent,
  language,
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();

  const row: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.35rem 0.75rem",
    padding: isMobile ? "0.5rem 0.65rem" : "0.6rem 0.8rem",
    background: withOpacity(accent, 0.05),
    border: `1px solid ${withOpacity(accent, 0.15)}`,
  };

  const nameStyle: CSSProperties = { ...typo.figure, color: colors.base.text.primary, flexShrink: 0 };

  const equation: CSSProperties = {
    ...typo.figure,
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "0.3rem",
  };

  const delta = positive ? colors.semantic.success.text : colors.semantic.error.text;

  return (
    <div style={row}>
      <span style={nameStyle}>{name}</span>
      <span style={equation}>
        {isAfter ? (
          <>
            <span style={{ color: colors.base.text.secondary }}>{fmtEur(before, language)}</span>
            <span style={{ color: delta }}>
              {positive ? "+" : "−"} {fmtEur(sent, language)}
            </span>
            <span style={{ color: colors.base.text.secondary }}>=</span>
            <span style={{ color: colors.base.text.primary }}>{fmtEur(after, language)}</span>
          </>
        ) : (
          <span style={{ color: colors.base.text.primary }}>{fmtEur(before, language)}</span>
        )}
      </span>
    </div>
  );
};
