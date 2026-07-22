import { type CSSProperties, type FC } from "react";

import { BRAND, Caption, FeedbackPanel, getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";

import { DoodleWarningTriangle } from "@doodle";

type Props = {
  label: string;
  statePhrase: string;
  relations: number;
  counterLabel: string;
  color: string;
  isOverload: boolean;
  overloadTitle: string;
  overloadBody: string;
  localeTag: string;
};

export const DunbarStatePanel: FC<Props> = ({
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
  const typo = getTypography();
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

  const phraseStyle: CSSProperties = {
    margin: 0,
    color: colors.base.text.primary,
    fontSize: typo.note.fontSize,
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
    fontSize: isMobile ? "1.3rem" : "1.55rem",
    fontWeight: 400,
    color,
    letterSpacing: "0.01em",
    fontVariantNumeric: "tabular-nums",
    lineHeight: 1.1,
    transition: "color 0.5s var(--ease-smooth)",
  };

  return (
    <div style={panelStyle}>
      <p style={phraseStyle}>{statePhrase}</p>

      <hr style={dividerStyle} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Caption tone="muted" size="sm">
          {counterLabel}
        </Caption>
        <span style={counterValueStyle}>{relations.toLocaleString(localeTag)}</span>
      </div>

      {isOverload && (
        <div key={label} className="metric-pop">
          <FeedbackPanel
            tone="error"
            title={overloadTitle}
            icon={<DoodleWarningTriangle size={isMobile ? 22 : 26} />}
          >
            {overloadBody}
          </FeedbackPanel>
        </div>
      )}
    </div>
  );
};
