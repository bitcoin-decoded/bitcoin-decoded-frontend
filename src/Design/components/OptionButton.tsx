import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { withOpacity } from "../helpers";
import { usePageTheme } from "../Theme";

type Props = {
  label: ReactNode;
  selected: boolean;
  accent: string;
  onClick: () => void;
  disabled?: boolean;
};

export const OptionButton: FC<Props> = ({ label, selected, accent, onClick, disabled = false }) => {
  const { colors } = usePageTheme();
  const [hover, setHover] = useState(false);
  const active = selected || (hover && !disabled);

  const buttonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    width: "100%",
    textAlign: "left",
    padding: "0.7rem 0.85rem",
    borderRadius: 0,
    cursor: disabled ? "default" : "pointer",
    background: selected
      ? withOpacity(accent, 0.12)
      : withOpacity(colors.base.text.secondary, 0.03),
    border: `1px solid ${withOpacity(accent, selected ? 0.6 : active ? 0.35 : 0.18)}`,
    color: colors.base.text.primary,
    fontSize: "0.85rem",
    lineHeight: 1.4,
    opacity: disabled && !selected ? 0.5 : 1,
    transition: "all 0.2s var(--ease-smooth)",
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
      <span style={radioStyle}>
        <span style={dotStyle} />
      </span>
      <span>{label}</span>
    </button>
  );
};
