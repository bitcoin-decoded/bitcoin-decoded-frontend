import { type CSSProperties, type FC } from "react";

import { Badge, BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { getScientificMethodsCopy } from "../data";

import { MethodFrame } from "./MethodFrame";

import { ArrowDown, ArrowRight, Telescope } from "@icons";

type Theory = { year: string; name: string; observations: string };

export const PhysicistMethod: FC = () => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { language } = useTranslation();
  const { physicist } = getScientificMethodsCopy(language);

  const accent = colors.blue.text.secondary;
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  const axisRow: CSSProperties = { display: "flex", alignItems: "center", gap: "0.6rem" };
  const timeLabel: CSSProperties = {
    ...mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(accent, 0.7),
    whiteSpace: "nowrap",
  };
  const axisLine: CSSProperties = {
    position: "relative",
    flex: 1,
    height: "2px",
    background: withOpacity(accent, 0.25),
  };
  const arrowHead: CSSProperties = {
    position: "absolute",
    right: "-4px",
    top: "-7px",
    color: withOpacity(accent, 0.55),
  };

  const blocksWrap: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "0.5rem" : "0.75rem",
    alignItems: "stretch",
    justifyContent: "center",
  };
  const theoryCard: CSSProperties = {
    flex: isMobile ? "1 1 auto" : "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.55rem",
    padding: "0.9rem 1rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    background: withOpacity(accent, 0.05),
  };
  const theoryHeader: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  };
  const theoryName: CSSProperties = {
    ...mono,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: colors.base.text.primary,
  };
  const dotRow: CSSProperties = {
    display: "flex",
    gap: "0.3rem",
    flexWrap: "wrap",
    minHeight: "0.5rem",
  };
  const dot = (opacity: number): CSSProperties => ({
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    background: withOpacity(accent, opacity),
    flexShrink: 0,
  });
  const obsCaption: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontStyle: "italic",
    lineHeight: 1.45,
    color: withOpacity(colors.base.text.secondary, 0.9),
  };

  const chipWrap: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
  };
  const replaceChip: CSSProperties = {
    ...mono,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.28rem 0.6rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    background: withOpacity(accent, 0.1),
    color: accent,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
  };

  const renderTheory = (theory: Theory, dotCount: number, dotOpacity: number) => (
    <div style={theoryCard}>
      <div style={theoryHeader}>
        <Badge tone="world" color={accent} size="xs">
          {theory.year}
        </Badge>
        <span style={theoryName}>{theory.name}</span>
      </div>
      <div style={dotRow}>
        {Array.from({ length: dotCount }).map((_, i) => (
          <span key={i} style={dot(dotOpacity)} />
        ))}
      </div>
      <span style={obsCaption}>{theory.observations}</span>
    </div>
  );

  return (
    <FrText>
      <MethodFrame
        title={physicist.title}
        icon={<Telescope size={16} strokeWidth={2} />}
        accent={accent}
        closingLine={physicist.closing}
      >
        {!isMobile && (
          <div style={axisRow}>
            <span style={timeLabel}>{physicist.timeLabel}</span>
            <div style={axisLine}>
              <ArrowRight size={15} strokeWidth={2.2} style={arrowHead} />
            </div>
          </div>
        )}

        <div style={blocksWrap}>
          {renderTheory(physicist.newton, 4, 0.4)}
          <div style={chipWrap}>
            <span style={replaceChip}>
              {isMobile ? (
                <ArrowDown size={12} strokeWidth={2.4} />
              ) : (
                <ArrowRight size={12} strokeWidth={2.4} />
              )}
              {physicist.replaces}
            </span>
          </div>
          {renderTheory(physicist.einstein, 6, 0.8)}
        </div>
      </MethodFrame>
    </FrText>
  );
};
