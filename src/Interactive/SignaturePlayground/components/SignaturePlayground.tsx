import { type CSSProperties, type FC, type ReactNode } from "react";

import { Badge, Button, Caption, Disclosure, FeedbackPanel, getBrandGold, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { fixFrenchPunctuation } from "../../../FrenchPunctuation";
import { useTranslation } from "../../../I18n";
import { FieldCard, MatchVisualizer, ModifyKeyButton, PyramidConnector, SignatureParcours } from "../components";
import { useSignaturePlayground } from "../hooks";
import type { ParcoursStep, SigPlaygroundColors } from "../types";

import { DoodleBulb, DoodleDrawPen, DoodleEyeNetwork, DoodleFaceMale, DoodleFlowDiagonal, DoodleLoginKey, DoodleMailFilter, DoodleNetwork } from "@doodle";
import { CheckCircle, RefreshCw, XCircle } from "@icons";

type Props = {
  onComplete?: () => void;
};

export const SignaturePlayground: FC<Props> = ({ onComplete }) => {
  const typo = getTypography();
  const { t, language } = useTranslation();
  const { colors: themeColors, moduleTheme, theme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = themeColors[moduleTheme];
  const gold = getBrandGold(theme);

  const colors: SigPlaygroundColors = {
    accentColor: world.text.secondary,
    successColor: themeColors.semantic.success.text,
    errorColor: themeColors.semantic.error.text,
    neutralColor: themeColors.base.text.primary,
    secretColor: gold,
    publicColor: world.text.secondary,
    signatureColor: world.text.secondary,
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

  const elementLabel = t("signaturePlayground.elementLabel");

  const displayMessage = t("signaturePlayground.message");
  const quotedMessage =
    language === "fr" ? fixFrenchPunctuation(`« ${displayMessage} »`) : `"${displayMessage}"`;

  const concordance = (ok: boolean): string =>
    t(ok ? "signaturePlayground.parcoursConcordant" : "signaturePlayground.parcoursNotConcordant");

  const steps: ParcoursStep[] = [
    {
      label: t("signaturePlayground.parcoursDerive"),
      status: !isDerived ? "current" : "done",
      note: isDerived ? concordance(isOriginalKey) : undefined,
    },
    {
      label: t("signaturePlayground.parcoursSign"),
      status: !isDerived ? "upcoming" : !hasSignature ? "current" : "done",
      note: hasSignature
        ? t(isOriginalKey ? "signaturePlayground.parcoursOriginalKey" : "signaturePlayground.parcoursModifiedKey")
        : undefined,
    },
    {
      label: t("signaturePlayground.parcoursVerify"),
      status: !hasSignature ? "upcoming" : verifyStatus === "idle" ? "current" : "done",
      note: verifyStatus === "idle" ? undefined : concordance(verifyStatus === "accepted"),
    },
  ];

  const sectionLabel: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(colors.baseTextSecondary, 0.6),
    marginBottom: "0.65rem",
  };

  const contentPanel: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.85rem" : "1rem",
    padding: isMobile ? "0.85rem 0.8rem" : "1.1rem 1.1rem",
    background: withOpacity(themeColors.base.text.primary, theme === "dark" ? 0.05 : 0.035),
    border: `1px solid ${themeColors.base.border.tertiary}`,
  };

  const pyramidCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.5rem" : "0.65rem",
    alignItems: "stretch",
  };

  const apexWrap: CSSProperties = { display: "flex", justifyContent: "center" };
  const apexNode: CSSProperties = { width: isMobile ? "78%" : "calc(50% - 0.3rem)", display: "flex" };
  const fanRow: CSSProperties = { display: "flex", justifyContent: "space-between", padding: "0 20%" };
  const baseRow: CSSProperties = { display: "flex", alignItems: "stretch", gap: "0.6rem" };

  const elementIcon = (icon: ReactNode, color: string): ReactNode => (
    <span style={{ color, flexShrink: 0, display: "inline-flex" }}>{icon}</span>
  );

  const messageBlock: ReactNode = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.4rem",
        width: "100%",
        padding: "0.5rem 0.6rem",
        border: `1px solid ${withOpacity(colors.baseBorderSecondary, 0.16)}`,
        background: withOpacity(colors.neutralColor, 0.02),
        textAlign: "left",
      }}
    >
      <DoodleMailFilter size={16} style={{ flexShrink: 0, color: withOpacity(colors.neutralColor, 0.6) }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", minWidth: 0 }}>
        <span style={{ ...typo.micro, fontVariant: "small-caps", letterSpacing: "0.05em", color: withOpacity(colors.baseTextSecondary, 0.7) }}>
          {t("signaturePlayground.messageLabel")}
        </span>
        <span style={{ ...typo.note, fontStyle: "italic", color: colors.basePrimaryText, lineHeight: 1.4 }}>
          {quotedMessage}
        </span>
      </div>
    </div>
  );

  const privateNode = (
    <FieldCard
      elementLabel={elementLabel}
      number={1}
      icon={elementIcon(<DoodleLoginKey size={22} />, colors.secretColor)}
      label={t("signaturePlayground.privateKeyLabel")}
      value={privateKey}
      tone="secret"
      valueKind="hex"
      truncate
      action={
        <ModifyKeyButton
          onClick={modifyKey}
          disabled={!canModifyKey}
          label={t("signaturePlayground.modifyKeyAction")}
          colors={colors}
        />
      }
      footerIcon={<DoodleFaceMale size={16} style={{ color: withOpacity(colors.baseTextSecondary, 0.85) }} />}
      footerLabel={t("signaturePlayground.privateKeyOwner")}
      readOnlyLabel={t("signaturePlayground.readOnly")}
      colors={colors}
    />
  );

  const publicNode = (
    <FieldCard
      elementLabel={elementLabel}
      number={2}
      icon={elementIcon(<DoodleLoginKey size={22} />, colors.publicColor)}
      label={t("signaturePlayground.publicKeyLabel")}
      pending={!isDerived}
      valuePrefix={t("signaturePlayground.publicKeyGenerated")}
      value={publicKey}
      tone="public"
      valueKind="hex"
      truncate
      footerIcon={<DoodleNetwork size={16} style={{ color: withOpacity(colors.baseTextSecondary, 0.85) }} />}
      footerLabel={t("signaturePlayground.publicKeyOwner")}
      readOnlyLabel={t("signaturePlayground.readOnly")}
      colors={colors}
    />
  );

  const signatureNode = (
    <FieldCard
      elementLabel={elementLabel}
      number={3}
      icon={elementIcon(<DoodleDrawPen size={22} />, colors.signatureColor)}
      label={t("signaturePlayground.signatureLabel")}
      pending={!hasSignature}
      valuePrefix={t("signaturePlayground.signatureGenerated")}
      value={signature ?? ""}
      tone="signature"
      valueKind="hex"
      truncate
      bottomSlot={messageBlock}
      readOnlyLabel={t("signaturePlayground.readOnly")}
      colors={colors}
    />
  );

  const pyramid = (
    <div style={pyramidCol}>
      <div style={apexWrap}>
        <div style={apexNode}>{privateNode}</div>
      </div>
      <div style={fanRow}>
        <PyramidConnector
          label={t("signaturePlayground.edgeDerive")}
          icon={<DoodleFlowDiagonal size={16} />}
          active={isDerived}
          colors={colors}
        />
        <PyramidConnector
          label={t("signaturePlayground.edgeSign")}
          icon={<DoodleFlowDiagonal size={16} style={{ transform: "scaleX(-1)" }} />}
          active={hasSignature}
          colors={colors}
        />
      </div>
      <div style={baseRow}>
        {publicNode}
        {signatureNode}
      </div>
    </div>
  );

  const actionButton = !isDerived ? (
    <Button variant="primary" color={colors.accentColor} icon={<DoodleLoginKey size={16} />} onClick={derive} style={{ alignSelf: "center" }}>
      {t("signaturePlayground.deriveAction")}
    </Button>
  ) : !hasSignature ? (
    <Button variant="primary" color={colors.accentColor} icon={<DoodleDrawPen size={16} />} onClick={sign} style={{ alignSelf: "center" }}>
      {t("signaturePlayground.signAction")}
    </Button>
  ) : verifyStatus === "idle" ? (
    <Button variant="primary" color={colors.accentColor} icon={<DoodleEyeNetwork size={16} />} onClick={verify} style={{ alignSelf: "center" }}>
      {t("signaturePlayground.verifyAction")}
    </Button>
  ) : null;

  return (
    <SurfaceCard gap="1.1rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={{ overflow: "hidden", textAlign: "left" }}>
      <Caption
        tone="accent"
        size="md"
        icon={<DoodleDrawPen size={isMobile ? 20 : 22} style={{ color: colors.accentColor, flexShrink: 0 }} />}
        style={{ minWidth: 0, overflowWrap: "anywhere" }}
      >
        {t("signaturePlayground.title")}
      </Caption>

      <SignatureParcours steps={steps} colors={colors} />

      {actionButton}

      <div style={contentPanel}>
        {pyramid}

        {verifyStatus !== "idle" && (
          <FeedbackPanel tone={verifyStatus === "accepted" ? "success" : "error"} style={{ gap: "1.1rem" }}>
            <div style={{ ...sectionLabel, marginBottom: 0, color: withOpacity(colors.baseTextSecondary, 0.6) }}>
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
              icon={verifyStatus === "accepted" ? <CheckCircle size={11} strokeWidth={2.5} /> : <XCircle size={11} strokeWidth={2.5} />}
              style={{ alignSelf: "flex-start" }}
            >
              {verifyStatus === "accepted" ? t("signaturePlayground.acceptedBadge") : t("signaturePlayground.rejectedBadge")}
            </Badge>

            <p style={{ ...typo.note, lineHeight: 1.55, color: colors.baseTextSecondary, margin: 0 }}>
              {verifyStatus === "accepted" ? t("signaturePlayground.acceptedExpl") : t("signaturePlayground.rejectedExpl")}
            </p>
          </FeedbackPanel>
        )}

        <Disclosure title={t("signaturePlayground.disclosureDerivationTitle")} icon={<DoodleBulb size={28} />}>
          <p style={{ margin: 0 }}>{t("signaturePlayground.derivationDefinition")}</p>
        </Disclosure>
        <Disclosure title={t("signaturePlayground.disclosurePrivateKeyTitle")} icon={<DoodleBulb size={28} />}>
          <p style={{ margin: 0 }}>{t("signaturePlayground.pedagogyConcretely")}</p>
          <p style={{ ...typo.note, margin: 0, fontStyle: "italic", color: withOpacity(colors.baseTextSecondary, 0.85), lineHeight: 1.55 }}>
            {t("signaturePlayground.pedagogyAnalogy")}
          </p>
        </Disclosure>
      </div>

      {(isDerived || hasSignature || verifyStatus !== "idle") && (
        <Button variant="secondary" size="sm" icon={<RefreshCw size={11} strokeWidth={2} />} onClick={reset} style={{ alignSelf: "flex-end" }}>
          {t("signaturePlayground.reset")}
        </Button>
      )}
    </SurfaceCard>
  );
};
