import { type CSSProperties, type ReactNode } from "react";

import { BRAND, getTypography, OptionButton, usePageTheme, withOpacity } from "../../../Design";


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
  const typo = getTypography();
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
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.note.fontSize,
    fontWeight: 500,
  };

  const questionStyle: CSSProperties = {
    fontSize: typo.note.fontSize,
    fontWeight: 500,
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
