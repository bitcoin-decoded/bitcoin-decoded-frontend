import { type CSSProperties, type FC } from "react";

import { BRAND, Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ORIGINAL_VALUES } from "../data";
import { useSignatureVerifier } from "../hooks";
import type { SigField } from "../types";

import { CheckCircle, RefreshCw, ShieldAlert, ShieldCheck } from "@icons";

export const SignatureVerifier: FC = () => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };
  const errorColor = colors.semantic.error.text;

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
    borderRadius: 0,
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
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.07em",
    color: colors.base.text.secondary,
    minWidth: isMobile ? "auto" : "5rem",
    flexShrink: 0,
  };

  const fieldValue = (isTampered: boolean): CSSProperties => ({
    flex: 1,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
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
    borderRadius: 0,
    fontSize: BRAND.fontSize.note,
    fontWeight: 500,
    letterSpacing: "0.05em",
    fontVariant: "small-caps",
    border: `1px solid ${withOpacity(isTampered ? errorColor : world.border.secondary, isTampered ? 0.5 : 0.25)}`,
    background: isTampered ? withOpacity(errorColor, 0.1) : "transparent",
    color: isTampered ? errorColor : colors.base.text.secondary,
    transition: "all 0.25s var(--ease-smooth)",
  });

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
            <span style={fieldValue(isTampered)}>{getValue(key)}</span>
            <button style={tamperBtn(isTampered)} onClick={() => toggle(key)}>
              {isTampered ? t("sigVerifier.restore") : t("sigVerifier.tamper")}
            </button>
          </div>
        );
      })}

      {/* Original reference (subtle) */}
      {tampered.size > 0 && (
        <div
          style={{
            fontSize: BRAND.fontSize.note,
            color: withOpacity(colors.base.text.secondary, 0.5),
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <CheckCircle size={12} strokeWidth={2} />
          {t("sigVerifier.originalHint")}
          {FIELDS.filter((f) => tampered.has(f.key)).map((f) => (
            <span
              key={f.key}
              style={{
                fontFamily: BRAND.fonts.mono,
                fontSize: BRAND.fontSize.note,
                opacity: 0.6,
              }}
            >
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
        style={{ letterSpacing: "0.05em" }}
      >
        {t("sigVerifier.verify")}
      </Button>

      {/* Result */}
      <FeedbackPanel
        tone={status === "valid" ? "success" : status === "invalid" ? "error" : "neutral"}
        icon={
          status === "valid" ? (
            <ShieldCheck size={14} strokeWidth={2} />
          ) : status === "invalid" ? (
            <ShieldAlert size={14} strokeWidth={2} />
          ) : undefined
        }
        title={
          status === "valid"
            ? t("sigVerifier.valid")
            : status === "invalid"
              ? t("sigVerifier.invalid")
              : t("sigVerifier.idle")
        }
      >
        {status !== "idle" &&
          (status === "valid" ? t("sigVerifier.validDesc") : t("sigVerifier.invalidDesc"))}
      </FeedbackPanel>

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
