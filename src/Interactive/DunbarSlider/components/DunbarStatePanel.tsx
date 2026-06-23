import { type CSSProperties, type FC } from "react";

import { AlertTriangle, type LucideIcon } from "lucide-react";

import { BRAND, Caption, FeedbackPanel, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";

type Props = {
  icon: LucideIcon;
  label: string;
  statePhrase: string;
  relations: number;
  counterLabel: string;
  color: string;
  isOverload: boolean;
  overloadTitle: string;
  overloadBody: string;
  /** Intl locale tag for number grouping. */
  localeTag: string;
};

/**
 * Reads out the current tier: icon + label, the one-line state phrase, the
 * live relationship counter, and (past the Dunbar ceiling) an overload alert.
 */
export const DunbarStatePanel: FC<Props> = ({
  icon: Icon,
  label,
  statePhrase,
  relations,
  counterLabel,
  color,
  isOverload,
  overloadTitle,
  overloadBody,
  localeTag,
}) => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const panelStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
    flex: "1 1 0",
    minWidth: 0,
    justifyContent: "center",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    color,
    transition: "color 0.5s var(--ease-smooth)",
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.95rem" : "1.05rem",
    fontWeight: 700,
    letterSpacing: "0.01em",
  };

  const phraseStyle: CSSProperties = {
    margin: 0,
    color: colors.base.text.primary,
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    lineHeight: 1.6,
  };

  const dividerStyle: CSSProperties = {
    width: "100%",
    height: "1px",
    border: "none",
    background: withOpacity(colors.base.text.secondary, 0.14),
    margin: 0,
  };

  const counterValueStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1.6rem" : "2rem",
    fontWeight: 700,
    color,
    letterSpacing: "0.01em",
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.1,
    transition: "color 0.5s var(--ease-smooth)",
  };

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <Icon size={isMobile ? 18 : 20} strokeWidth={2} />
        <span style={labelStyle}>{label}</span>
      </div>

      <p style={phraseStyle}>{statePhrase}</p>

      <hr style={dividerStyle} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Caption tone="muted" size="xs">
          {counterLabel}
        </Caption>
        <span style={counterValueStyle}>{relations.toLocaleString(localeTag)}</span>
      </div>

      {isOverload && (
        <div key={label} className="metric-pop">
          <FeedbackPanel
            tone="error"
            title={overloadTitle}
            icon={<AlertTriangle size={isMobile ? 13 : 14} strokeWidth={2.2} />}
          >
            {overloadBody}
          </FeedbackPanel>
        </div>
      )}
    </div>
  );
};
