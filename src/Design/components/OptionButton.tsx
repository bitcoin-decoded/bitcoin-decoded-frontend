import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { BRAND, getBrandGold, getTypography, usePageTheme, useThemeContext } from "../Theme";

type Props = {
  label: ReactNode;
  selected: boolean;
  accent: string;
  onClick: () => void;
  disabled?: boolean;
  index?: number;
};

export const OptionButton: FC<Props> = ({
  label,
  selected,
  accent,
  onClick,
  disabled = false,
  index,
}) => {
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const typo = getTypography(useBreakpoint());
  const [hover, setHover] = useState(false);
  const active = selected || (hover && !disabled);
  const ledger = index !== undefined;

  const gold = getBrandGold(theme);
  const isDark = theme === "dark";

  const bracket = active ? accent : withOpacity(gold, 0.85);
  const wash = selected
    ? withOpacity(accent, isDark ? 0.18 : 0.1)
    : hover && !disabled
      ? withOpacity(accent, isDark ? 0.12 : 0.07)
      : withOpacity(accent, isDark ? 0.06 : 0.04);

  const cornerSize = 12;
  const corners = (color: string): ReactNode => {
    const s = `${BRAND.figures.ruleThickness}px solid ${color}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      transition: "border-color 0.2s var(--ease-smooth)",
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: 0, left: 0, borderTop: s, borderLeft: s }} />
        <span style={{ ...base, top: 0, right: 0, borderTop: s, borderRight: s }} />
        <span style={{ ...base, bottom: 0, left: 0, borderBottom: s, borderLeft: s }} />
        <span style={{ ...base, bottom: 0, right: 0, borderBottom: s, borderRight: s }} />
      </>
    );
  };

  const buttonStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: ledger ? "0.85rem" : "0.7rem",
    width: "100%",
    textAlign: "left",
    padding: ledger ? "0.85rem 1rem" : "0.7rem 0.85rem",
    borderRadius: 0,
    cursor: disabled ? "default" : "pointer",
    background: ledger
      ? wash
      : selected
        ? withOpacity(accent, 0.12)
        : withOpacity(colors.base.text.secondary, 0.03),
    border: ledger
      ? "none"
      : `1px solid ${withOpacity(accent, selected ? 0.6 : active ? 0.35 : 0.18)}`,
    color: ledger && !active ? colors.base.text.secondary : colors.base.text.primary,
    fontSize: typo.note.fontSize,
    lineHeight: 1.5,
    opacity: disabled && !selected ? 0.5 : 1,
    transition: "all 0.2s var(--ease-smooth)",
  };

  const letterStyle: CSSProperties = {
    flexShrink: 0,
    alignSelf: "flex-start",
    width: "1.5rem",
    textAlign: "center",
    fontFamily: BRAND.fonts.mono,
    fontSize: "1.35rem",
    fontWeight: 400,
    lineHeight: 1.15,
    color: bracket,
    transition: "color 0.2s var(--ease-smooth)",
  };

  const radioStyle: CSSProperties = {
    flexShrink: 0,
    width: "1.05rem",
    height: "1.05rem",
    borderRadius: "50%",
    border: `2px solid ${withOpacity(accent, selected ? 0.9 : 0.4)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s var(--ease-smooth)",
  };

  const dotStyle: CSSProperties = {
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    background: accent,
    transform: selected ? "scale(1)" : "scale(0)",
    transition: "transform 0.2s var(--ease-smooth)",
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={selected}
      disabled={disabled}
    >
      {ledger ? (
        <>
          {corners(bracket)}
          <span style={letterStyle}>{String.fromCharCode(65 + (index ?? 0))}</span>
        </>
      ) : (
        <span style={radioStyle}>
          <span style={dotStyle} />
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>{label}</span>
    </button>
  );
};
