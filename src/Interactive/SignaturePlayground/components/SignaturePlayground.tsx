import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  CheckCircle,
  Globe,
  KeyRound,
  Lightbulb,
  Lock,
  Mail,
  PenLine,
  RefreshCw,
  ShieldCheck,
  User,
  UserCheck,
  XCircle,
} from "lucide-react";

import {
  Badge,
  Button,
  Caption,
  Disclosure,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ActionButton, FieldCard, MatchVisualizer, PyramidConnector } from "../components";
import { useSignaturePlayground } from "../hooks";
import type { SigPlaygroundColors } from "../types";

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
    // Private key = blue, public key = lighter (info) blue, signature = violet.
    secretColor: themeColors.blue.text.secondary,
    publicColor: themeColors.semantic.info?.text ?? themeColors.blue.text.primary,
    signatureColor: themeColors.violet.text.secondary,
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
    isDerived,
    isOriginalKey,
    hasSignature,
    derive,
    updatePrivateKey,
    sign,
    verify,
    reset,
  } = useSignaturePlayground();

  const displayMessage = t("signaturePlayground.message");

  // ── styles ──────────────────────────────────────────────────────────────────

  const mono: CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

  const sectionLabel: CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: withOpacity(colors.baseTextSecondary, 0.55),
    marginBottom: "0.65rem",
  };

  // Message-to-sign, rendered as the header of the signature block.
  const msgHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    paddingBottom: "0.6rem",
    borderBottom: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.15)}`,
  };

  const msgHeaderLabel: CSSProperties = {
    fontSize: "0.52rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: withOpacity(colors.baseTextSecondary, 0.7),
  };

  const msgHeaderValue: CSSProperties = {
    fontSize: isMobile ? "0.7rem" : "0.74rem",
    fontWeight: 600,
    color: colors.basePrimaryText,
    lineHeight: 1.35,
  };

  // Pyramid: privée (apex) / publique (base-left) / signature (base-right).
  const pyramidCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.5rem" : "0.65rem",
    alignItems: "stretch",
  };

  const apexWrap: CSSProperties = { display: "flex", justifyContent: "center" };

  // Same width as one base column, so the three blocks read as equal-width.
  const apexNode: CSSProperties = {
    width: isMobile ? "100%" : "calc(50% - 0.3rem)",
    display: "flex",
  };

  const fanRow: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20%",
  };

  // Two equal columns, each the same width as the apex (calc(50% - 0.3rem)).
  const baseRow: CSSProperties = {
    display: "flex",
    alignItems: "stretch",
    gap: "0.6rem",
  };

  const verticalConnector: CSSProperties = {
    display: "flex",
    justifyContent: "center",
  };

  const coherenceBanner: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.4rem 0.55rem",
    borderRadius: "0.5rem",
    ...mono,
    fontSize: "0.62rem",
    fontWeight: 700,
    lineHeight: 1.4,
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
  };

  // ── render helpers ────────────────────────────────────────────────────────────

  const renderPending = (
    n: number,
    icon: ReactNode,
    label: string,
    hint: string,
    accent: string,
    header?: ReactNode,
  ) => (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.85rem 0.9rem",
        borderRadius: "0.7rem",
        border: `1px dashed ${withOpacity(accent, 0.3)}`,
        background: withOpacity(accent, 0.02),
      }}
    >
      {header}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "0.6rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: withOpacity(accent, 0.7),
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.05rem",
            height: "1.05rem",
            borderRadius: "50%",
            fontSize: "0.6rem",
            color: withOpacity(accent, 0.8),
            border: `1px dashed ${withOpacity(accent, 0.5)}`,
          }}
        >
          {n}
        </span>
        {icon}
        {label}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "0.62rem",
          lineHeight: 1.5,
          fontStyle: "italic",
          color: withOpacity(colors.baseTextSecondary, 0.7),
        }}
      >
        {hint}
      </p>
    </div>
  );

  // The message to sign - rendered as the header of the signature block, so
  // it reads as "this message → produces → this signature".
  const messageHeader = (
    <div style={msgHeaderStyle}>
      <Mail
        size={13}
        strokeWidth={2}
        style={{ color: withOpacity(colors.neutralColor, 0.55), flexShrink: 0 }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.05rem", minWidth: 0 }}>
        <span style={msgHeaderLabel}>{t("signaturePlayground.messageLabel")}</span>
        <span style={msgHeaderValue}>{displayMessage}</span>
      </div>
    </div>
  );

  const coherenceBadge = (
    <div style={coherenceBanner}>
      {isOriginalKey ? (
        <CheckCircle size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      ) : (
        <XCircle size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      )}
      <span style={{ minWidth: 0 }}>
        {isOriginalKey
          ? t("signaturePlayground.statusValid")
          : t("signaturePlayground.statusInvalid")}
      </span>
    </div>
  );

  const privateNode = (
    <FieldCard
      icon={<Lock size={11} strokeWidth={2.5} />}
      number={1}
      label={t("signaturePlayground.privateKeyLabel")}
      value={privateKey}
      tone="secret"
      valueKind="hex"
      editable={isDerived}
      onChange={updatePrivateKey}
      footerIcon={<User size={10} strokeWidth={2.5} />}
      footerLabel={t("signaturePlayground.privateKeyOwner")}
      editableLabel={t("signaturePlayground.editable")}
      readOnlyLabel={t("signaturePlayground.readOnly")}
      colors={colors}
    />
  );

  const publicNode = isDerived ? (
    <FieldCard
      icon={<KeyRound size={11} strokeWidth={2.5} />}
      number={2}
      label={t("signaturePlayground.publicKeyLabel")}
      valuePrefix={t("signaturePlayground.publicKeyGenerated")}
      value={publicKey}
      tone="public"
      valueKind="hex"
      truncate
      badge={coherenceBadge}
      footerIcon={<Globe size={10} strokeWidth={2.5} />}
      footerLabel={t("signaturePlayground.publicKeyOwner")}
      editableLabel={t("signaturePlayground.editable")}
      readOnlyLabel={t("signaturePlayground.readOnly")}
      colors={colors}
    />
  ) : (
    renderPending(
      2,
      <KeyRound size={11} strokeWidth={2.5} />,
      t("signaturePlayground.publicKeyLabel"),
      t("signaturePlayground.publicKeyPending"),
      colors.publicColor,
    )
  );

  const signatureNode = hasSignature ? (
    <FieldCard
      icon={<PenLine size={11} strokeWidth={2.5} />}
      number={3}
      header={messageHeader}
      label={t("signaturePlayground.signatureLabel")}
      valuePrefix={t("signaturePlayground.signatureGenerated")}
      value={signature ?? ""}
      tone="signature"
      valueKind="hex"
      truncate
      editableLabel={t("signaturePlayground.editable")}
      readOnlyLabel={t("signaturePlayground.readOnly")}
      colors={colors}
    />
  ) : (
    renderPending(
      3,
      <PenLine size={11} strokeWidth={2.5} />,
      t("signaturePlayground.signatureLabel"),
      t("signaturePlayground.signaturePending"),
      colors.neutralColor,
      messageHeader,
    )
  );

  const calcule = (
    <PyramidConnector
      label={t("signaturePlayground.edgeDerive")}
      icon={
        isMobile ? (
          <ArrowDown size={12} strokeWidth={2.2} />
        ) : (
          <ArrowDownLeft size={12} strokeWidth={2.2} />
        )
      }
      active={isDerived}
      colors={colors}
    />
  );

  const signe = (
    <PyramidConnector
      label={t("signaturePlayground.edgeSign")}
      icon={
        isMobile ? (
          <ArrowDown size={12} strokeWidth={2.2} />
        ) : (
          <ArrowDownRight size={12} strokeWidth={2.2} />
        )
      }
      active={hasSignature}
      colors={colors}
    />
  );

  const pyramid = isMobile ? (
    <div style={pyramidCol}>
      {privateNode}
      <div style={verticalConnector}>{calcule}</div>
      {publicNode}
      <div style={verticalConnector}>{signe}</div>
      {signatureNode}
    </div>
  ) : (
    <div style={pyramidCol}>
      <div style={apexWrap}>
        <div style={apexNode}>{privateNode}</div>
      </div>
      <div style={fanRow}>
        {calcule}
        {signe}
      </div>
      <div style={baseRow}>
        {publicNode}
        {signatureNode}
      </div>
    </div>
  );

  // The CTA depends on the phase: derive → sign → verify.
  const actionButton = !isDerived ? (
    <ActionButton
      onClick={derive}
      consumed={false}
      variant="primary"
      label={t("signaturePlayground.deriveAction")}
      consumedLabel={t("signaturePlayground.deriveConsumed")}
      icon={<KeyRound size={13} strokeWidth={2.2} />}
      isMobile={isMobile}
      colors={colors}
    />
  ) : !hasSignature ? (
    <ActionButton
      onClick={sign}
      consumed={false}
      variant="primary"
      label={t("signaturePlayground.signAction")}
      consumedLabel={t("signaturePlayground.signConsumed")}
      icon={<PenLine size={13} strokeWidth={2.2} />}
      isMobile={isMobile}
      colors={colors}
    />
  ) : verifyStatus === "idle" ? (
    <ActionButton
      onClick={verify}
      consumed={false}
      variant="primary"
      label={t("signaturePlayground.verifyAction")}
      consumedLabel={t("signaturePlayground.verifyConsumed")}
      icon={<ShieldCheck size={13} strokeWidth={2.2} />}
      isMobile={isMobile}
      colors={colors}
    />
  ) : null;

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <SurfaceCard
      gap="1.1rem"
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={{ ...mono, overflow: "hidden", textAlign: "left" }}
    >
      {/* Header */}
      <Caption
        tone="accent"
        size="md"
        icon={
          <UserCheck
            size={isMobile ? 17 : 18}
            strokeWidth={2}
            style={{ color: colors.accentColor, flexShrink: 0 }}
          />
        }
        style={{ minWidth: 0, overflowWrap: "anywhere" }}
      >
        {t("signaturePlayground.title")}
      </Caption>

      {/* The three elements, laid out as a pyramid */}
      <div style={{ minWidth: 0 }}>
        <div style={sectionLabel}>{t("signaturePlayground.sectionElements")}</div>
        {pyramid}
      </div>

      {/* Phase CTA */}
      {actionButton}

      {/* Verification result panel */}
      {verifyStatus !== "idle" && (
        <FeedbackPanel
          tone={verifyStatus === "accepted" ? "success" : "error"}
          style={{ gap: "0.85rem" }}
        >
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
              gap: "0.85rem",
            }}
          >
            {[
              {
                label: t("signaturePlayground.rowMessage"),
                value: displayMessage,
                kind: "text" as const,
                accent: withOpacity(colors.baseTextSecondary, 0.75),
              },
              {
                label: t("signaturePlayground.rowSignature"),
                value: signature ?? "",
                kind: "hex" as const,
                accent: colors.signatureColor,
              },
              {
                label: t("signaturePlayground.rowPubkey"),
                value: publicKey,
                kind: "hex" as const,
                accent: colors.publicColor,
              },
            ].map((row) => (
              <li
                key={row.label}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "baseline",
                  gap: isMobile ? "0.2rem" : "0.5rem",
                  fontSize: "0.62rem",
                  lineHeight: 1.5,
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
                    color: row.accent,
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

          <Badge
            tone={verifyStatus === "accepted" ? "success" : "error"}
            icon={
              verifyStatus === "accepted" ? (
                <CheckCircle size={11} strokeWidth={2.5} />
              ) : (
                <XCircle size={11} strokeWidth={2.5} />
              )
            }
            style={{ alignSelf: "flex-start" }}
          >
            {verifyStatus === "accepted"
              ? t("signaturePlayground.acceptedBadge")
              : t("signaturePlayground.rejectedBadge")}
          </Badge>

          <p style={{ fontSize: "0.66rem", lineHeight: 1.55, color: colors.baseTextSecondary, margin: 0 }}>
            {verifyStatus === "accepted"
              ? t("signaturePlayground.acceptedExpl")
              : t("signaturePlayground.rejectedExpl")}
          </p>
        </FeedbackPanel>
      )}

      {/* Pyramid context caption (kept from the original) */}
      <p
        style={{
          margin: 0,
          fontSize: "0.62rem",
          lineHeight: 1.55,
          fontStyle: "italic",
          color: withOpacity(colors.baseTextSecondary, 0.75),
        }}
      >
        {t("signaturePlayground.derivationCaption")}
      </p>

      {/* Pedagogy disclosures */}
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

      {/* Reset - available once the flow has started */}
      {(isDerived || hasSignature || verifyStatus !== "idle") && (
        <Button
          variant="secondary"
          size="sm"
          icon={<RefreshCw size={11} strokeWidth={2} />}
          onClick={reset}
          style={{ alignSelf: "flex-end" }}
        >
          {t("signaturePlayground.reset")}
        </Button>
      )}
    </SurfaceCard>
  );
};
