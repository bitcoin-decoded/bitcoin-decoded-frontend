import { type CSSProperties, type FC } from "react";

import {
  ArrowDown,
  CheckCircle,
  KeyRound,
  Lightbulb,
  Link2,
  Lock,
  Mail,
  PenLine,
  RefreshCw,
  ShieldCheck,
  User,
  UserCheck,
  XCircle,
} from "lucide-react";

import { Disclosure, useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useSignaturePlayground } from "../hooks/useSignaturePlayground";
import type { SigPlaygroundColors } from "../types";

import { ActionButton, FieldCard, MatchVisualizer, StatusBadge } from "./SignaturePlayground/index";

export const SignaturePlayground: FC = () => {
  const { t } = useTranslation();
  const { colors: themeColors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = themeColors[moduleTheme];

  // Bundle of colors used by every sub-component
  const colors: SigPlaygroundColors = {
    accentColor: world.border.secondary,
    successColor: themeColors.semantic.success.text,
    errorColor: themeColors.semantic.error?.text ?? "#ef4444",
    neutralColor: themeColors.base.text.primary,
    worldBorderSecondary: world.border.secondary,
    basePrimaryText: world.text.primary,
    baseTextSecondary: themeColors.base.text.secondary,
    baseBorderSecondary: themeColors.base.border.secondary,
    baseBackgroundSecondary: themeColors.base.background.secondary,
  };

  const {
    privateKey,
    publicKey,
    signature,
    verifyStatus,
    isOriginalKey,
    hasSignature,
    updatePrivateKey,
    sign,
    verify,
    reset,
  } = useSignaturePlayground();

  // The displayed message comes from i18n so it translates; the hook keeps
  // an internal opaque value for state purposes.
  const displayMessage = t("signaturePlayground.message");

  // ── Container & one-off styles ─────────────────────────────────────────────

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const containerStyle: CSSProperties = {
    ...mono,
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
    padding: isMobile ? "1.1rem" : "1.5rem",
    borderRadius: "1rem",
    background: `linear-gradient(190deg, ${world.background.primary}, ${themeColors.base.background.primary})`,
    margin: isMobile ? "1.5rem 0" : "2rem 0",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    // Override MainLayout's desktop "text-align: justify" — looks awkward in narrow cards
    textAlign: "left",
  };

  const sectionLabel: CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: withOpacity(colors.baseTextSecondary, 0.55),
    marginBottom: "0.55rem",
  };

  const panelStyle = (tone: "success" | "error"): CSSProperties => {
    const c = tone === "success" ? colors.successColor : colors.errorColor;
    return {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      padding: "0.85rem 0.95rem",
      borderRadius: "0.7rem",
      border: `1px solid ${withOpacity(c, 0.32)}`,
      background: withOpacity(c, 0.06),
      transition: "all 0.35s var(--ease-smooth)",
      minWidth: 0,
      boxSizing: "border-box",
    };
  };

  const sigCodeBoxStyle: CSSProperties = {
    ...mono,
    padding: "0.55rem 0.7rem",
    borderRadius: "0.5rem",
    background: withOpacity(colors.baseBackgroundSecondary, 0.08),
    border: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.15)}`,
    fontSize: isMobile ? "0.62rem" : "0.66rem",
    fontWeight: 600,
    color: colors.basePrimaryText,
    wordBreak: "break-all",
    lineHeight: 1.5,
  };

  const resetBtnStyle: CSSProperties = {
    ...mono,
    alignSelf: "flex-end",
    cursor: "pointer",
    padding: "0.4rem 0.8rem",
    borderRadius: "0.5rem",
    fontSize: "0.66rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    border: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.25)}`,
    background: "transparent",
    color: colors.baseTextSecondary,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    whiteSpace: "nowrap",
    transition: "all 0.25s var(--ease-smooth)",
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      className="gradient-border"
      style={{ ...containerStyle, "--border-glow-color": colors.accentColor } as CSSProperties}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", minWidth: 0 }}>
          <UserCheck
            size={isMobile ? 17 : 18}
            strokeWidth={2}
            style={{ color: colors.accentColor, flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: isMobile ? "0.74rem" : "0.8rem",
              fontWeight: 700,
              color: colors.basePrimaryText,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              minWidth: 0,
              overflowWrap: "anywhere",
            }}
          >
            {t("signaturePlayground.title")}
          </span>
        </div>
        <span
          style={{
            fontSize: "0.66rem",
            color: withOpacity(colors.baseTextSecondary, 0.7),
            paddingLeft: `calc(0.55rem + ${isMobile ? "17px" : "18px"})`,
          }}
        >
          {t("signaturePlayground.subtitle")}
        </span>
      </div>

      {/* Section: Les éléments */}
      <div style={{ minWidth: 0 }}>
        <div style={sectionLabel}>{t("signaturePlayground.sectionElements")}</div>
        <div
          style={{
            display: "grid",
            gap: "0.7rem",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.6fr) minmax(0, 1fr)",
            alignItems: "start",
          }}
        >
          {/* Unified pair card: private key ↓ public key */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.7rem",
              padding: "0.95rem 1rem",
              borderRadius: "0.75rem",
              border: `1px solid ${withOpacity(colors.accentColor, 0.25)}`,
              background: `linear-gradient(180deg, ${withOpacity(colors.errorColor, 0.04)} 0%, ${withOpacity(colors.errorColor, 0.04)} 45%, ${withOpacity(colors.worldBorderSecondary, 0.04)} 55%, ${withOpacity(colors.worldBorderSecondary, 0.04)} 100%)`,
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <FieldCard
              icon={<Lock size={11} strokeWidth={2.5} />}
              label={t("signaturePlayground.privateKeyLabel")}
              value={privateKey}
              tone="secret"
              valueKind="hex"
              editable
              embedded
              onChange={updatePrivateKey}
              hint={t("signaturePlayground.privateKeyHint")}
              footerIcon={<User size={10} strokeWidth={2.5} />}
              footerLabel={t("signaturePlayground.privateKeyOwner")}
              editableLabel={t("signaturePlayground.editable")}
              readOnlyLabel={t("signaturePlayground.readOnly")}
              colors={colors}
            />

            {/* Pair-coherence banner — attached to the private key (the field
                that drives the verdict). */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.55rem 0.7rem",
                borderRadius: "0.55rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: isMobile ? "0.66rem" : "0.7rem",
                fontWeight: 700,
                ...(isOriginalKey
                  ? {
                      color: colors.successColor,
                      background: withOpacity(colors.successColor, 0.1),
                      border: `1px solid ${withOpacity(colors.successColor, 0.3)}`,
                    }
                  : {
                      color: colors.errorColor,
                      background: withOpacity(colors.errorColor, 0.1),
                      border: `1px solid ${withOpacity(colors.errorColor, 0.3)}`,
                    }),
                transition: "all 0.35s var(--ease-smooth)",
              }}
            >
              {isOriginalKey ? (
                <CheckCircle size={14} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              ) : (
                <XCircle size={14} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              )}
              <span style={{ minWidth: 0 }}>
                {isOriginalKey
                  ? t("signaturePlayground.statusValid")
                  : t("signaturePlayground.statusInvalid")}
              </span>
            </div>

            {/* Derivation arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.1rem 0",
                color: withOpacity(colors.baseTextSecondary, 0.55),
              }}
            >
              <hr
                style={{
                  flex: 1,
                  height: 1,
                  border: "none",
                  background: withOpacity(colors.baseBorderSecondary, 0.18),
                  margin: 0,
                }}
              />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                <ArrowDown size={12} strokeWidth={2.2} />
                {t("signaturePlayground.derivationArrowLabel")}
              </span>
              <hr
                style={{
                  flex: 1,
                  height: 1,
                  border: "none",
                  background: withOpacity(colors.baseBorderSecondary, 0.18),
                  margin: 0,
                }}
              />
            </div>

            <FieldCard
              icon={<KeyRound size={11} strokeWidth={2.5} />}
              label={t("signaturePlayground.publicKeyLabel")}
              value={publicKey}
              tone="public"
              valueKind="hex"
              embedded
              hint={t("signaturePlayground.publicKeyHint")}
              editableLabel={t("signaturePlayground.editable")}
              readOnlyLabel={t("signaturePlayground.readOnly")}
              colors={colors}
            />
          </div>

          {/* Message card */}
          <FieldCard
            icon={<Mail size={11} strokeWidth={2.5} />}
            label={t("signaturePlayground.messageLabel")}
            value={displayMessage}
            tone="neutral"
            valueKind="text"
            hint={t("signaturePlayground.messageHint")}
            editableLabel={t("signaturePlayground.editable")}
            readOnlyLabel={t("signaturePlayground.readOnly")}
            colors={colors}
          />
        </div>

        {/* Derivation caption */}
        <div
          style={{
            marginTop: "0.7rem",
            display: "inline-flex",
            alignItems: "flex-start",
            gap: "0.45rem",
            fontSize: "0.6rem",
            lineHeight: 1.5,
            color: withOpacity(colors.baseTextSecondary, 0.75),
            fontStyle: "italic",
          }}
        >
          <Link2
            size={11}
            strokeWidth={2}
            style={{ flexShrink: 0, marginTop: "0.15rem", color: colors.accentColor }}
          />
          <span style={{ minWidth: 0 }}>{t("signaturePlayground.derivationCaption")}</span>
        </div>
      </div>

      {/* Sign action */}
      <ActionButton
        onClick={sign}
        consumed={hasSignature}
        variant="primary"
        label={t("signaturePlayground.signAction")}
        consumedLabel={t("signaturePlayground.signConsumed")}
        icon={<PenLine size={13} strokeWidth={2.2} />}
        isMobile={isMobile}
        colors={colors}
      />

      {/* Signature output panel */}
      {hasSignature && (
        <div style={panelStyle(isOriginalKey ? "success" : "error")}>
          <StatusBadge
            tone={isOriginalKey ? "success" : "error"}
            icon={
              isOriginalKey ? (
                <CheckCircle size={11} strokeWidth={2.5} />
              ) : (
                <XCircle size={11} strokeWidth={2.5} />
              )
            }
            label={
              isOriginalKey
                ? t("signaturePlayground.signatureValidBadge")
                : t("signaturePlayground.signatureInvalidBadge")
            }
            colors={colors}
          />
          <div style={sigCodeBoxStyle}>
            <span
              style={{
                color: withOpacity(colors.baseTextSecondary, 0.7),
                fontWeight: 500,
                marginRight: "0.4rem",
                whiteSpace: "nowrap",
              }}
            >
              {t("signaturePlayground.signaturePrefix")}
            </span>
            {signature}
          </div>

          <MatchVisualizer
            publicKey={publicKey}
            signature={signature ?? ""}
            matches={isOriginalKey}
            publicKeyLabel={t("signaturePlayground.publicKeyLabel")}
            signatureLabel={t("signaturePlayground.rowSignature")}
            verifyFnLabel={t("signaturePlayground.matchVerifyFn")}
            verifyMoreInfoLabel={t("signaturePlayground.verifyMoreInfo")}
            verifyMoreInfoUrl={t("signaturePlayground.verifyMoreInfoUrl")}
            matchLabel={t("signaturePlayground.matchYes")}
            noMatchLabel={t("signaturePlayground.matchNo")}
            isMobile={isMobile}
            colors={colors}
          />

          <p
            style={{
              fontSize: "0.66rem",
              lineHeight: 1.5,
              color: colors.baseTextSecondary,
              margin: 0,
            }}
          >
            {isOriginalKey
              ? t("signaturePlayground.signValidExpl")
              : t("signaturePlayground.signInvalidExpl")}
          </p>
        </div>
      )}

      {/* Verify action */}
      {hasSignature && (
        <ActionButton
          onClick={verify}
          consumed={verifyStatus !== "idle"}
          variant="verify"
          label={t("signaturePlayground.verifyAction")}
          consumedLabel={t("signaturePlayground.verifyConsumed")}
          icon={<ShieldCheck size={13} strokeWidth={2.2} />}
          isMobile={isMobile}
          colors={colors}
        />
      )}

      {/* Verification result panel */}
      {verifyStatus !== "idle" && (
        <div style={panelStyle(verifyStatus === "accepted" ? "success" : "error")}>
          <div
            style={{
              ...sectionLabel,
              marginBottom: 0,
              color: withOpacity(colors.baseTextSecondary, 0.6),
            }}
          >
            {t("signaturePlayground.networkVerifies")}
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
            }}
          >
            {[
              {
                label: t("signaturePlayground.rowMessage"),
                value: displayMessage,
                kind: "text" as const,
              },
              {
                label: t("signaturePlayground.rowSignature"),
                value: signature ?? "",
                kind: "hex" as const,
              },
              {
                label: t("signaturePlayground.rowPubkey"),
                value: publicKey,
                kind: "hex" as const,
              },
            ].map((row) => (
              <li
                key={row.label}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "baseline",
                  gap: isMobile ? "0.15rem" : "0.5rem",
                  fontSize: "0.62rem",
                  color: colors.baseTextSecondary,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontSize: "0.55rem",
                    color: withOpacity(colors.baseTextSecondary, 0.6),
                    minWidth: isMobile ? "auto" : "5.5rem",
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    color: colors.basePrimaryText,
                    fontWeight: 600,
                    wordBreak: row.kind === "hex" ? "break-all" : "normal",
                    overflowWrap: row.kind === "hex" ? "anywhere" : "break-word",
                  }}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>

          <StatusBadge
            tone={verifyStatus === "accepted" ? "success" : "error"}
            icon={
              verifyStatus === "accepted" ? (
                <CheckCircle size={11} strokeWidth={2.5} />
              ) : (
                <XCircle size={11} strokeWidth={2.5} />
              )
            }
            label={
              verifyStatus === "accepted"
                ? t("signaturePlayground.acceptedBadge")
                : t("signaturePlayground.rejectedBadge")
            }
            colors={colors}
          />

          <p
            style={{
              fontSize: "0.66rem",
              lineHeight: 1.55,
              color: colors.baseTextSecondary,
              margin: 0,
            }}
          >
            {verifyStatus === "accepted"
              ? t("signaturePlayground.acceptedExpl")
              : t("signaturePlayground.rejectedExpl")}
          </p>
        </div>
      )}

      {/* Pedagogy disclosure */}
      <Disclosure
        title={t("signaturePlayground.disclosureDerivationTitle")}
        icon={<Lightbulb size={13} strokeWidth={2} />}
      >
        <p style={{ margin: 0 }}>{t("signaturePlayground.derivationDefinition")}</p>
      </Disclosure>
      <Disclosure
        title={t("signaturePlayground.disclosurePrivateKeyTitle")}
        icon={<Lightbulb size={13} strokeWidth={2} />}
      >
        <p style={{ margin: 0 }}>
          {t("signaturePlayground.pedagogyBefore")}{" "}
          <strong>{t("signaturePlayground.pedagogyHighlight")}</strong>{" "}
          {t("signaturePlayground.pedagogyAfter")}
        </p>
        <p style={{ margin: 0 }}>{t("signaturePlayground.pedagogyConcretely")}</p>
        <p
          style={{
            margin: 0,
            fontStyle: "italic",
            color: withOpacity(colors.baseTextSecondary, 0.85),
            fontSize: "0.66rem",
            lineHeight: 1.55,
          }}
        >
          {t("signaturePlayground.pedagogyAnalogy")}
        </p>
      </Disclosure>

      {/* Reset */}
      <button style={resetBtnStyle} onClick={reset}>
        <RefreshCw size={11} strokeWidth={2} />
        {t("signaturePlayground.reset")}
      </button>
    </div>
  );
};
