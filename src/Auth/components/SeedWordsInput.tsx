import {
  type ClipboardEvent,
  type CSSProperties,
  type FC,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

import { BRAND, getBrandGold, useBreakpoint, usePageTheme, withOpacity } from "../../Design";
import { interpolate, useTranslation } from "../../I18n";

type Props = {
  words: string[];
  onWordChange: (index: number, value: string) => void;
  onComplete?: () => void;
};

const COUNT = 12;

// The 12-word entry (CDC §7.3): one numbered field per word, so a recovery phrase
// reads like a phrase. Typing a space or pressing Enter jumps to the next field;
// pasting a whole phrase spreads it across the fields; Backspace on an empty field
// steps back. The single focus index is presentational state (as in Button).
export const SeedWordsInput: FC<Props> = ({ words, onWordChange, onComplete }) => {
  const { t } = useTranslation();
  const { colors, theme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const gold = getBrandGold(theme);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(null);

  const focus = (index: number) => refs.current[Math.max(0, Math.min(index, COUNT - 1))]?.focus();

  const distribute = (from: number, tokens: string[]) => {
    tokens.forEach((token, offset) => {
      if (from + offset < COUNT) onWordChange(from + offset, token);
    });
    focus(from + tokens.length);
  };

  const handleChange = (index: number, raw: string) => {
    if (!/\s/.test(raw)) {
      onWordChange(index, raw);
      return;
    }
    const tokens = raw.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      onWordChange(index, "");
      return;
    }
    distribute(index, tokens);
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    const tokens = event.clipboardData.getData("text").trim().split(/\s+/).filter(Boolean);
    if (tokens.length <= 1) return;
    event.preventDefault();
    distribute(index, tokens);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (index === COUNT - 1) onComplete?.();
      else focus(index + 1);
    } else if (event.key === "Backspace" && (words[index] ?? "") === "" && index > 0) {
      event.preventDefault();
      focus(index - 1);
    }
  };

  // minmax(0, 1fr) lets the columns shrink below their content on a narrow phone
  // (a bare 1fr keeps its min-content width and overflows). The label sits above
  // the input so the input keeps the full cell width instead of being pushed right.
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
    gap: "0.5rem",
  };

  const cellStyle = (index: number): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    minWidth: 0,
    padding: "0.35rem 0.5rem",
    background: withOpacity(colors.base.background.primary, theme === "dark" ? 0.6 : 0.7),
    border: `1px solid ${focused === index ? gold : colors.base.border.secondary}`,
    transition: "border-color 0.2s var(--ease-smooth)",
  });

  return (
    <div style={gridStyle}>
      {Array.from({ length: COUNT }, (_, index) => (
        <label key={index} style={cellStyle(index)}>
          <span
            style={{
              fontFamily: BRAND.fonts.mono,
              fontSize: "0.6rem",
              letterSpacing: "0.02em",
              color: colors.base.text.secondary,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {interpolate(t("auth.seed.confirm.field"), { n: index + 1 })}
          </span>
          <input
            ref={(node) => {
              refs.current[index] = node;
            }}
            value={words[index] ?? ""}
            onChange={(event) => handleChange(index, event.target.value)}
            onPaste={(event) => handlePaste(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused((current) => (current === index ? null : current))}
            autoFocus={index === 0}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            size={1}
            style={{
              width: "100%",
              minWidth: 0,
              border: "none",
              background: "transparent",
              outline: "none",
              color: colors.base.text.primary,
              fontFamily: BRAND.fonts.mono,
              fontSize: "0.85rem",
            }}
          />
        </label>
      ))}
    </div>
  );
};
