import { type CSSProperties, type ReactNode } from "react";

import { usePageTheme, withOpacity } from "../../../Design";

import { OptionButton } from "./OptionButton";

type Option<T extends string> = { value: T; label: ReactNode };

type Props<T extends string> = {
  number: number;
  question: string;
  options: Option<T>[];
  selected: T | null;
  accent: string;
  onSelect: (value: T) => void;
  disabled?: boolean;
  footer?: ReactNode;
};

export const QuestionStep = <T extends string>({
  number,
  question,
  options,
  selected,
  accent,
  onSelect,
  disabled = false,
  footer,
}: Props<T>) => {
  const { colors } = usePageTheme();

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.65rem",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  };

  const numberStyle: CSSProperties = {
    flexShrink: 0,
    width: "1.6rem",
    height: "1.6rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: withOpacity(accent, 0.12),
    border: `1px solid ${withOpacity(accent, 0.4)}`,
    color: accent,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.78rem",
    fontWeight: 700,
  };

  const questionStyle: CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: colors.base.text.primary,
    lineHeight: 1.4,
  };

  const optionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingLeft: "0.1rem",
  };

  return (
    <div style={wrapStyle}>
      <div style={headerStyle}>
        <span style={numberStyle}>{number}</span>
        <span style={questionStyle}>{question}</span>
      </div>
      <div style={optionsStyle}>
        {options.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={selected === option.value}
            accent={accent}
            disabled={disabled}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
      {footer}
    </div>
  );
};
