import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { getScientificMethodsCopy } from "../data";

import { MethodFrame } from "./MethodFrame";

import { ArrowDown, MoreHorizontal, ScrollText, Sigma, Triangle } from "@icons";

export const LogicianMethod: FC = () => {
  const typo = getTypography();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { language } = useTranslation();
  const { logician } = getScientificMethodsCopy(language);

  const accent = colors.violet.text.secondary;
  const line = withOpacity(accent, 0.35);
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  const treeWrap: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.45rem",
    width: "100%",
  };
  const rootNode: CSSProperties = {
    width: "100%",
    maxWidth: "30rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    textAlign: "center",
    padding: "0.85rem 1.1rem",
    borderRadius: 0,
    border: `1.5px solid ${withOpacity(accent, 0.4)}`,
    background: withOpacity(accent, 0.06),
  };
  const rootLabel: CSSProperties = {
    ...mono,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    fontSize: isMobile ? "0.88rem" : "0.95rem",
    fontWeight: 500,
    color: colors.base.text.primary,
  };
  const rootSubtitle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontStyle: "italic",
    lineHeight: 1.45,
    color: colors.base.text.secondary,
  };

  const forkWrap: CSSProperties = { position: "relative", width: "50%", height: "1.25rem" };
  const busLine: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: line,
  };
  const drop = (side: "left" | "right"): CSSProperties => ({
    position: "absolute",
    top: 0,
    [side]: 0,
    width: "2px",
    height: "100%",
    background: line,
  });

  const childrenGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "100%",
  };
  const childCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0 0.4rem",
    minWidth: 0,
  };
  const childNode: CSSProperties = {
    ...mono,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    width: "100%",
    maxWidth: "12rem",
    padding: "0.6rem 0.7rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    background: withOpacity(accent, 0.07),
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    color: colors.base.text.primary,
    textAlign: "center",
    lineHeight: 1.3,
  };
  const othersNode: CSSProperties = {
    ...mono,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.35rem 0.6rem",
    borderRadius: 0,
    border: `1px dashed ${withOpacity(accent, 0.3)}`,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.05em",
    color: withOpacity(colors.base.text.secondary, 0.85),
  };

  const renderChild = (label: string) => (
    <div style={childCol}>
      <ArrowDown size={16} strokeWidth={2} style={{ color: withOpacity(accent, 0.5) }} />
      <div style={childNode}>
        <Triangle size={13} strokeWidth={2} style={{ color: accent, flexShrink: 0 }} />
        <span>{label}</span>
      </div>
      <ArrowDown size={13} strokeWidth={2} style={{ color: withOpacity(accent, 0.3) }} />
      <span style={othersNode}>
        <MoreHorizontal size={12} strokeWidth={2} />
        {logician.others}
      </span>
    </div>
  );

  return (
    <FrText>
      <MethodFrame
        title={logician.title}
        icon={<Sigma size={16} strokeWidth={2} />}
        accent={accent}
        closingLine={logician.closing}
      >
        <div style={treeWrap}>
          <div style={rootNode}>
            <span style={rootLabel}>
              <ScrollText size={15} strokeWidth={2} style={{ color: accent, flexShrink: 0 }} />
              {logician.root.label}
            </span>
            <span style={rootSubtitle}>{logician.root.subtitle}</span>
          </div>

          <ArrowDown size={16} strokeWidth={2} style={{ color: withOpacity(accent, 0.5) }} />

          <div style={forkWrap}>
            <div style={busLine} />
            <div style={drop("left")} />
            <div style={drop("right")} />
          </div>

          <div style={childrenGrid}>
            {renderChild(logician.thales)}
            {renderChild(logician.pythagoras)}
          </div>
        </div>
      </MethodFrame>
    </FrText>
  );
};
