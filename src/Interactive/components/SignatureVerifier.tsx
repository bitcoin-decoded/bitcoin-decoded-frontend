import { type CSSProperties, type FC } from "react";
import { CheckCircle, RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";

import { Button, Caption, SurfaceCard, useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { type SigField, ORIGINAL_VALUES, useSignatureVerifier } from "../hooks/useSignatureVerifier";

export const SignatureVerifier: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const successColor = colors.semantic.success.text;
  const errorColor = colors.semantic.error?.text ?? "#ef4444";

  const { tampered, status, toggle, verify, reset, getValue } = useSignatureVerifier();

  const FIELDS: { key: SigField; label: string }[] = [
    { key: "message", label: t("sigVerifier.message") },
    { key: "pubkey", label: t("sigVerifier.pubkey") },
    { key: "signature", label: t("sigVerifier.signature") },
  ];

  const fieldRow: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? "0.4rem" : "0.75rem",
    padding: "0.65rem 0.85rem",
    borderRadius: "0.65rem",
    background: withOpacity(world.background.secondary, 0.03),
    border: `1px solid ${withOpacity(world.border.secondary, 0.12)}`,
    transition: "border-color 0.3s var(--ease-smooth)",
  };

  const fieldRowTampered: CSSProperties = {
    ...fieldRow,
    border: `1px solid ${withOpacity(errorColor, 0.4)}`,
    background: withOpacity(errorColor, 0.04),
  };

  const fieldLabel: CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: colors.base.text.secondary,
    minWidth: isMobile ? "auto" : "5rem",
    flexShrink: 0,
  };

  const fieldValue = (isTampered: boolean): CSSProperties => ({
    flex: 1,
    fontSize: isMobile ? "0.62rem" : "0.66rem",
    fontWeight: 600,
    color: isTampered ? errorColor : world.text.primary,
    wordBreak: "break-all",
    transition: "color 0.3s var(--ease-smooth)",
    letterSpacing: "0.02em",
  });

  const tamperBtn = (isTampered: boolean): CSSProperties => ({
    ...mono,
    flexShrink: 0,
    cursor: "pointer",
    padding: "0.3rem 0.6rem",
    borderRadius: "0.45rem",
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    border: `1px solid ${withOpacity(isTampered ? errorColor : world.border.secondary, isTampered ? 0.5 : 0.25)}`,
    background: isTampered ? withOpacity(errorColor, 0.1) : "transparent",
    color: isTampered ? errorColor : colors.base.text.secondary,
    transition: "all 0.25s var(--ease-smooth)",
  });

  const resultPanel: CSSProperties = {
    padding: "0.75rem 0.9rem",
    borderRadius: "0.65rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    transition: "all 0.35s var(--ease-smooth)",
    ...(status === "valid"
      ? {
          background: withOpacity(successColor, 0.07),
          border: `1px solid ${withOpacity(successColor, 0.3)}`,
        }
      : status === "invalid"
        ? {
            background: withOpacity(errorColor, 0.07),
            border: `1px solid ${withOpacity(errorColor, 0.3)}`,
          }
        : {
            background: withOpacity(colors.base.border.secondary, 0.04),
            border: `1px solid ${withOpacity(colors.base.border.secondary, 0.1)}`,
          }),
  };

  const resultTitle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.45rem",
    fontSize: "0.72rem",
    fontWeight: 700,
    color:
      status === "valid"
        ? successColor
        : status === "invalid"
          ? errorColor
          : colors.base.text.secondary,
    transition: "color 0.3s var(--ease-smooth)",
  };

  const resultDesc: CSSProperties = {
    fontSize: "0.66rem",
    lineHeight: 1.55,
    color: colors.base.text.secondary,
  };

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2rem 0"} style={mono}>
      <Caption tone="accent" size="md">
        {t("sigVerifier.title")}
      </Caption>

      {/* Field rows */}
      {FIELDS.map(({ key, label }) => {
        const isTampered = tampered.has(key);
        return (
          <div key={key} style={isTampered ? fieldRowTampered : fieldRow}>
            <span style={fieldLabel}>{label}</span>
            <span style={fieldValue(isTampered)}>
              {getValue(key)}
            </span>
            <button style={tamperBtn(isTampered)} onClick={() => toggle(key)}>
              {isTampered ? t("sigVerifier.restore") : t("sigVerifier.tamper")}
            </button>
          </div>
        );
      })}

      {/* Original reference (subtle) */}
      {tampered.size > 0 && (
        <div style={{ fontSize: "0.58rem", color: withOpacity(colors.base.text.secondary, 0.5), display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <CheckCircle size={10} strokeWidth={2} />
          {t("sigVerifier.originalHint")}
          {FIELDS.filter(f => tampered.has(f.key)).map(f => (
            <span key={f.key} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.54rem", opacity: 0.6 }}>
              {ORIGINAL_VALUES[f.key].slice(0, 10)}…
            </span>
          ))}
        </div>
      )}

      {/* Verify button */}
      <Button
        variant="primary"
        icon={<ShieldCheck size={14} strokeWidth={2} />}
        onClick={verify}
        style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
      >
        {t("sigVerifier.verify")}
      </Button>

      {/* Result */}
      <div style={resultPanel}>
        <div style={resultTitle}>
          {status === "valid" && <ShieldCheck size={14} strokeWidth={2} />}
          {status === "invalid" && <ShieldAlert size={14} strokeWidth={2} />}
          {status === "valid"
            ? t("sigVerifier.valid")
            : status === "invalid"
              ? t("sigVerifier.invalid")
              : t("sigVerifier.idle")}
        </div>
        {status !== "idle" && (
          <div style={resultDesc}>
            {status === "valid"
              ? t("sigVerifier.validDesc")
              : t("sigVerifier.invalidDesc")}
          </div>
        )}
      </div>

      <Button
        variant="secondary"
        size="sm"
        icon={<RefreshCw size={11} strokeWidth={2} />}
        onClick={reset}
        style={{ alignSelf: "flex-end" }}
      >
        {t("sigVerifier.reset")}
      </Button>
    </SurfaceCard>
  );
};
