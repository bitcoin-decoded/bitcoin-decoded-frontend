import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { BRAND, getBrandGold, usePageTheme, withOpacity } from "../../Design";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  hint?: string;
  error?: string | null;
  status?: ReactNode;
  autoFocus?: boolean;
  autoComplete?: string;
  onEnter?: () => void;
};

// A single styled control (input or textarea) with an optional mono label, a
// trailing adornment slot, and a hint or error line. The focus border mirrors the
// design system's approach (local presentational state, as in Button). Dumb.
export const AuthField: FC<Props> = ({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  rows = 3,
  placeholder,
  hint,
  error,
  status,
  autoFocus,
  autoComplete,
  onEnter,
}) => {
  const { colors, theme } = usePageTheme();
  const [focused, setFocused] = useState(false);
  const gold = getBrandGold(theme);
  const errorColor = colors.semantic.error.text;

  const borderColor = error ? errorColor : focused ? gold : colors.base.border.secondary;

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: colors.base.text.secondary,
    marginBottom: "0.45rem",
    display: "block",
  };

  const controlStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "0.7rem 0.85rem",
    paddingRight: status ? "2.6rem" : "0.85rem",
    background: withOpacity(colors.base.background.primary, theme === "dark" ? 0.6 : 0.7),
    border: `1px solid ${borderColor}`,
    borderRadius: 0,
    color: colors.base.text.primary,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.95rem",
    letterSpacing: "0.01em",
    lineHeight: 1.5,
    outline: "none",
    resize: multiline ? "vertical" : "none",
    transition: "border-color 0.2s var(--ease-smooth)",
  };

  const shared = {
    value,
    placeholder,
    autoFocus,
    autoComplete,
    onChange: (event: { target: { value: string } }) => onChange(event.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: controlStyle,
  };

  return (
    <label style={{ display: "block" }}>
      {label && <span style={labelStyle}>{label}</span>}
      <span style={{ position: "relative", display: "block" }}>
        {multiline ? (
          <textarea {...shared} rows={rows} spellCheck={false} autoCapitalize="none" />
        ) : (
          <input
            {...shared}
            type={type}
            spellCheck={false}
            autoCapitalize="none"
            onKeyDown={(event) => {
              if (event.key === "Enter" && onEnter) {
                event.preventDefault();
                onEnter();
              }
            }}
          />
        )}
        {status && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: "0.7rem",
              transform: "translateY(-50%)",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {status}
          </span>
        )}
      </span>
      {(hint || error) && (
        <span
          style={{
            display: "block",
            marginTop: "0.4rem",
            fontFamily: BRAND.fonts.body,
            fontSize: "0.8rem",
            lineHeight: 1.4,
            color: error ? errorColor : colors.base.text.secondary,
          }}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
};
