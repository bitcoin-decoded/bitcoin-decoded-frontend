import { type CSSProperties, type FC, type ReactNode } from "react";

import { Badge, BRAND, Button, Caption, Disclosure, FeedbackPanel, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { fixFrenchPunctuation } from "../../../FrenchPunctuation";
import { useTranslation } from "../../../I18n";
import {
  ActionButton,
  FieldCard,
  MatchVisualizer,
  ModifyKeyButton,
  PyramidConnector,
} from "../components";
import { useSignaturePlayground } from "../hooks";
import type { SigPlaygroundColors } from "../types";

import { DoodleBulb } from "@doodle";
import {
  ArrowDownLeft,
  ArrowDownRight,
  CheckCircle,
  Globe,
  KeyRound,
  Lock,
  Mail,
  PenLine,
  RefreshCw,
  ShieldCheck,
  User,
  UserCheck,
  XCircle,
} from "@icons";

type Props = {
  onComplete?: () => void;
};

export const SignaturePlayground: FC<Props> = ({ onComplete }) => {
  const typo = getTypography();
  const { t, language } = useTranslation();
  const { colors: themeColors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = themeColors[moduleTheme];

  const colors: SigPlaygroundColors = {
    accentColor: world.border.secondary,
    successColor: themeColors.semantic.success.text,
    errorColor: themeColors.semantic.error.text,
    neutralColor: themeColors.base.text.primary,
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
    canModifyKey,
    derive,
    modifyKey,
    sign,
    verify,
    reset,
  } = useSignaturePlayground(onComplete);

  const matchColor = isOriginalKey ? colors.successColor : colors.errorColor;

  const displayMessage = t("signaturePlayground.message");
  const quotedMessage =
    language === "fr"
      ? fixFrenchPunctuation(`« ${displayMessage} »`)
      : `"${displayMessage}"`;


  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  const sectionLabel: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(colors.baseTextSecondary, 0.55),
    marginBottom: "0.65rem",
  };

  const msgHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    paddingBottom: "0.6rem",
    borderBottom: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.15)}`,
  };

  const msgHeaderLabel: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: withOpacity(colors.baseTextSecondary, 0.7),
  };

  const msgHeaderValue: CSSProperties = {
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    fontStyle: "italic",
    color: colors.basePrimaryText,
    lineHeight: 1.4,
  };

  const pyramidCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.5rem" : "0.65rem",
    alignItems: "stretch",
  };

  const apexWrap: CSSProperties = { display: "flex", justifyContent: "center" };

  const apexNode: CSSProperties = {
    width: isMobile ? "72%" : "calc(50% - 0.3rem)",
    display: "flex",
  };

  const fanRow: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20%",
  };

  const baseRow: CSSProperties = {
    display: "flex",
    alignItems: "stretch",
    gap: "0.6rem",
  };

  const coherenceBanner: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.4rem 0.55rem",
    borderRadius: 0,
    ...mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
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
        borderRadius: 0,
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
          fontSize: typo.micro.fontSize,
          fontWeight: 500,
          fontVariant: "small-caps",
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
            fontSize: typo.micro.fontSize,
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
          fontSize: typo.micro.fontSize,
          lineHeight: 1.5,
          fontStyle: "italic",
          color: withOpacity(colors.baseTextSecondary, 0.7),
        }}
      >
        {hint}
      </p>
    </div>
  );

  const messageHeader = (
    <div style={msgHeaderStyle}>
      <Mail
        size={13}
        strokeWidth={2}
        style={{ color: withOpacity(colors.neutralColor, 0.55), flexShrink: 0 }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.05rem", minWidth: 0 }}>
        <span style={msgHeaderLabel}>{t("signaturePlayground.messageLabel")}</span>
        <span style={msgHeaderValue}>{quotedMessage}</span>
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

  const modifyButton = (
    <ModifyKeyButton
      onClick={modifyKey}
      disabled={!canModifyKey}
      label={t("signaturePlayground.modifyKeyAction")}
      colors={colors}
    />
  );

  const privateNode = (
    <FieldCard
      icon={<Lock size={11} strokeWidth={2.5} />}
      number={1}
      label={t("signaturePlayground.privateKeyLabel")}
      value={privateKey}
      tone="secret"
      valueKind="hex"
      truncate
      valueColor={isDerived ? matchColor : undefined}
      action={modifyButton}
      footerIcon={<User size={10} strokeWidth={2.5} />}
      footerLabel={t("signaturePlayground.privateKeyOwner")}
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
      valueColor={matchColor}
      badge={coherenceBadge}
      footerIcon={<Globe size={10} strokeWidth={2.5} />}
      footerLabel={t("signaturePlayground.publicKeyOwner")}
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
      icon={<ArrowDownLeft size={12} strokeWidth={2.2} />}
      active={isDerived}
      colors={colors}
    />
  );

  const signe = (
    <PyramidConnector
      label={t("signaturePlayground.edgeSign")}
      icon={<ArrowDownRight size={12} strokeWidth={2.2} />}
      active={hasSignature}
      colors={colors}
    />
  );

  const pyramid = (
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


  return (
    <SurfaceCard
      gap="1.1rem"
      margin={isMobile ? "1.5rem 0" : "2rem 0"}
      style={{ ...mono, overflow: "hidden", textAlign: "left" }}
    >
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

      <div style={{ minWidth: 0 }}>
        <div style={sectionLabel}>{t("signaturePlayground.sectionElements")}</div>
        {pyramid}
      </div>

      {actionButton}

      {verifyStatus !== "idle" && (
        <FeedbackPanel
          tone={verifyStatus === "accepted" ? "success" : "error"}
          style={{ gap: "1.1rem" }}
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

          <MatchVisualizer
            message={quotedMessage}
            messageLabel={t("signaturePlayground.rowMessage")}
            publicKey={publicKey}
            publicKeyLabel={t("signaturePlayground.rowPubkey")}
            signature={signature ?? ""}
            signatureLabel={t("signaturePlayground.rowSignature")}
            matches={isOriginalKey}
            verifyFnLabel={t("signaturePlayground.matchVerifyFn")}
            verifyMoreInfoLabel={t("signaturePlayground.verifyMoreInfo")}
            verifyMoreInfoUrl={t("signaturePlayground.verifyMoreInfoUrl")}
            matchLabel={t("signaturePlayground.matchYes")}
            noMatchLabel={t("signaturePlayground.matchNo")}
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

          <p
            style={{
              fontSize: typo.note.fontSize,
              lineHeight: 1.55,
              color: colors.baseTextSecondary,
              margin: 0,
            }}
          >
            {verifyStatus === "accepted"
              ? t("signaturePlayground.acceptedExpl")
              : t("signaturePlayground.rejectedExpl")}
          </p>
        </FeedbackPanel>
      )}

      <p
        style={{
          margin: 0,
          fontSize: typo.micro.fontSize,
          lineHeight: 1.55,
          fontStyle: "italic",
          color: withOpacity(colors.baseTextSecondary, 0.75),
        }}
      >
        {t("signaturePlayground.derivationCaption")}
      </p>

      <Disclosure
        title={t("signaturePlayground.disclosureDerivationTitle")}
        icon={<DoodleBulb size={28} />}
      >
        <p style={{ margin: 0 }}>{t("signaturePlayground.derivationDefinition")}</p>
      </Disclosure>
      <Disclosure
        title={t("signaturePlayground.disclosurePrivateKeyTitle")}
        icon={<DoodleBulb size={28} />}
      >
        <p style={{ margin: 0 }}>{t("signaturePlayground.pedagogyConcretely")}</p>
        <p
          style={{
            margin: 0,
            fontStyle: "italic",
            color: withOpacity(colors.baseTextSecondary, 0.85),
            fontSize: typo.micro.fontSize,
            lineHeight: 1.55,
          }}
        >
          {t("signaturePlayground.pedagogyAnalogy")}
        </p>
      </Disclosure>

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
