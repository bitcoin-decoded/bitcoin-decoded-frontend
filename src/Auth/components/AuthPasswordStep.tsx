import { type CSSProperties, type FC } from "react";

import { Button, usePageTheme } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";
import { PasswordField } from "./PasswordField";

// CDC §7.1 écran 5 / §14.5: choose the device password. The strength read is
// informative only; the minimum of 8 is the sole gate.
export const AuthPasswordStep: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    revealPassword,
    toggleReveal,
    strength,
    passwordMismatch,
    canSubmitCreate,
    submitCreate,
    busy,
  } = useAuthFlow();

  const segmentColor = (index: number): string => {
    if (index >= strength) return colors.base.border.secondary;
    if (strength <= 1) return colors.semantic.warning.text;
    if (strength === 2) return colors.semantic.info.text;
    return colors.semantic.success.text;
  };

  const meterStyle: CSSProperties = { display: "flex", gap: "0.35rem", marginTop: "-0.4rem" };

  return (
    <AuthScreen
      title={t("auth.password.create.title")}
      lead={[t("auth.password.create.body1"), t("auth.password.create.body2")]}
    >
      <PasswordField
        label={t("auth.password.create.field1")}
        value={password}
        onChange={setPassword}
        reveal={revealPassword}
        onToggleReveal={toggleReveal}
        hint={t("auth.password.create.hint")}
        autoFocus
        autoComplete="new-password"
      />
      {password.length > 0 && (
        <div style={meterStyle} aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              style={{ flex: 1, height: "3px", background: segmentColor(index), transition: "background 0.25s" }}
            />
          ))}
        </div>
      )}
      <PasswordField
        label={t("auth.password.create.field2")}
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        reveal={revealPassword}
        onToggleReveal={toggleReveal}
        error={passwordMismatch ? t("auth.password.create.mismatch") : undefined}
        autoComplete="new-password"
        onEnter={submitCreate}
      />
      <Button
        variant="primary"
        style={{ alignSelf: "center" }}
        disabled={!canSubmitCreate || busy}
        onClick={submitCreate}
      >
        {t("auth.password.create.button")}
      </Button>
    </AuthScreen>
  );
};
