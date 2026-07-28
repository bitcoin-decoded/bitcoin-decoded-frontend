import { type CSSProperties, type FC } from "react";

import { getTypography, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { type Language } from "../../../I18n";
import { fmtEur } from "../../helpers";

import { ArrowDown, ArrowUp } from "@icons";

type Props = {
  name: string;
  imgSrc: string;
  balanceLabel: string;
  balance: number;
  language: Language;
  accent: string;
  isAfter: boolean;
  direction: "up" | "down";
  flipImage?: boolean;
  objectPosition?: string;
};

export const AccountCard: FC<Props> = ({
  name,
  imgSrc,
  balanceLabel,
  balance,
  language,
  accent,
  isAfter,
  direction,
  flipImage = false,
  objectPosition = "50% 22%",
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();

  const success = colors.semantic.success.text;
  const dirColor = direction === "up" ? success : colors.base.text.secondary;
  const tint = direction === "up" ? success : accent;
  const Arrow = direction === "up" ? ArrowUp : ArrowDown;

  const card: CSSProperties = {
    flex: "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${withOpacity(accent, 0.3)}`,
    background: withOpacity(accent, 0.05),
  };

  const imgWrap: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    padding: isMobile ? "0.7rem 0.5rem 0" : "0.9rem 0.6rem 0",
  };

  const imgFrame: CSSProperties = {
    position: "relative",
    width: isMobile ? "64%" : "56%",
    height: isMobile ? "6.5rem" : "8rem",
    flexShrink: 0,
  };

  const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition,
    display: "block",
    transform: flipImage ? "scaleX(-1)" : undefined,
  };

  const cornerSize = isMobile ? 10 : 12;
  const cornerRule = `1.5px solid ${withOpacity(accent, 0.75)}`;
  const cornerBase: CSSProperties = { position: "absolute", width: cornerSize, height: cornerSize, pointerEvents: "none" };

  const footer: CSSProperties = {
    padding: isMobile ? "0.55rem 0.6rem" : "0.7rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.1rem",
    textAlign: "center",
  };

  const balanceRow: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const arrowStyle: CSSProperties = {
    position: "absolute",
    right: "calc(100% + 0.2rem)",
    opacity: isAfter ? 1 : 0,
    transition: "opacity 0.4s var(--ease-smooth)",
  };

  const amountStyle: CSSProperties = {
    ...typo.figure,
    color: colors.base.text.primary,
    padding: "0.1rem 0.45rem",
    background: isAfter ? withOpacity(tint, 0.14) : "transparent",
    transition: "background 0.4s var(--ease-smooth)",
  };

  return (
    <div style={card}>
      <div style={imgWrap}>
        <div style={imgFrame}>
          <img src={imgSrc} alt={name} style={imgStyle} />
          <span style={{ ...cornerBase, top: 0, left: 0, borderTop: cornerRule, borderLeft: cornerRule }} />
          <span style={{ ...cornerBase, top: 0, right: 0, borderTop: cornerRule, borderRight: cornerRule }} />
          <span style={{ ...cornerBase, bottom: 0, left: 0, borderBottom: cornerRule, borderLeft: cornerRule }} />
          <span style={{ ...cornerBase, bottom: 0, right: 0, borderBottom: cornerRule, borderRight: cornerRule }} />
        </div>
      </div>
      <div style={footer}>
        <span style={{ ...typo.figure, color: colors.base.text.primary }}>{name}</span>
        <span style={{ ...typo.micro, fontVariant: "small-caps", color: colors.base.text.secondary }}>
          {balanceLabel}
        </span>
        <span style={balanceRow}>
          <Arrow size={14} color={dirColor} style={arrowStyle} />
          <span style={amountStyle}>{fmtEur(balance, language)}</span>
        </span>
      </div>
    </div>
  );
};
