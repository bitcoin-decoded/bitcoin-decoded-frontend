import { type FC } from "react";

import { usePageTheme } from "../../Design";
import { useTranslation } from "../../I18n";

import { AuthField } from "./AuthField";

import { Eye, EyeOff } from "@icons";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  reveal: boolean;
  onToggleReveal: () => void;
  hint?: string;
  error?: string | null;
  autoFocus?: boolean;
  autoComplete?: string;
  onEnter?: () => void;
};

// A password input with a reveal toggle, built on AuthField. The toggle's label
// is an accessibility string (auth.a11y.*), never shown as text. Dumb.
export const PasswordField: FC<Props> = ({
  label,
  value,
  onChange,
  reveal,
  onToggleReveal,
  hint,
  error,
  autoFocus,
  autoComplete,
  onEnter,
}) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  return (
    <AuthField
      label={label}
      value={value}
      onChange={onChange}
      type={reveal ? "text" : "password"}
      hint={hint}
      error={error}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      onEnter={onEnter}
      status={
        <button
          type="button"
          onClick={onToggleReveal}
          aria-label={t(reveal ? "auth.a11y.concealPassword" : "auth.a11y.revealPassword")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
            color: colors.base.text.secondary,
          }}
        >
          {reveal ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};
