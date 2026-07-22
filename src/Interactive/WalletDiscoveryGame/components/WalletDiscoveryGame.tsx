import { type CSSProperties, type FC } from "react";

import { BRAND, Button, Caption, FeedbackPanel, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useWalletDiscoveryGame } from "../hooks";

import { WalletCard } from "./WalletCard";

import { CheckCircle, KeyRound, RefreshCw, Sparkles, Wallet, XCircle } from "@icons";

type Props = {
  onComplete?: () => void;
};

export const WalletDiscoveryGame: FC<Props> = ({ onComplete }) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors: themeColors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = themeColors[moduleTheme];

  const accentColor = world.border.secondary;
  const successColor = themeColors.semantic.success.text;
  const errorColor = themeColors.semantic.error.text;
  const basePrimaryText = world.text.primary;
  const baseTextSecondary = themeColors.base.text.secondary;
  const baseBorderSecondary = themeColors.base.border.secondary;
  const baseBackgroundSecondary = themeColors.base.background.secondary;

  const {
    stage,
    cards,
    fundedCardId,
    selectedCardId,
    amountInput,
    verdict,
    isLocked,
    reveal,
    selectCard,
    updateAmount,
    validate,
    restart,
  } = useWalletDiscoveryGame(onComplete);

  const mono: CSSProperties = { fontFamily: BRAND.fonts.mono };

  const introStyle: CSSProperties = {
    fontSize: typo.note.fontSize,
    lineHeight: 1.55,
    color: withOpacity(baseTextSecondary, 0.85),
    margin: 0,
  };

  const sectionLabelStyle: CSSProperties = {
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(baseTextSecondary, 0.55),
    marginBottom: "0.55rem",
  };

  const inputStyle: CSSProperties = {
    ...mono,
    width: "100%",
    maxWidth: isMobile ? "100%" : "16rem",
    padding: "0.5rem 0.7rem",
    borderRadius: 0,
    fontSize: "1rem",
    fontWeight: 500,
    border: `1px solid ${withOpacity(accentColor, 0.4)}`,
    background: withOpacity(baseBackgroundSecondary, 0.05),
    color: basePrimaryText,
    boxSizing: "border-box",
    touchAction: "manipulation",
    transition: "border-color 0.25s var(--ease-smooth), box-shadow 0.25s var(--ease-smooth)",
  };

  const validateReady = selectedCardId !== null && amountInput.trim() !== "";

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
          <Wallet
            size={isMobile ? 17 : 18}
            strokeWidth={2}
            style={{ color: accentColor, flexShrink: 0 }}
          />
        }
        style={{ minWidth: 0, overflowWrap: "anywhere" }}
      >
        {t("walletGame.title")}
      </Caption>

      <p style={introStyle}>{t("walletGame.intro")}</p>

      {stage === "idle" && (
        <Button
          variant="primary"
          icon={<KeyRound size={14} strokeWidth={2.2} />}
          onClick={reveal}
          style={{ alignSelf: "flex-start" }}
        >
          {t("walletGame.revealAction")}
        </Button>
      )}

      {stage !== "idle" && (
        <>
          <div style={{ minWidth: 0 }}>
            <div style={sectionLabelStyle}>{t("walletGame.derivedSection")}</div>
            <div
              style={{
                display: "grid",
                gap: "0.7rem",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                alignItems: "stretch",
              }}
            >
              {cards.map((card, idx) => {
                const isAnswer = stage === "validated" && card.id === fundedCardId;
                const isWrong =
                  stage === "validated" &&
                  verdict === "incorrect" &&
                  selectedCardId === card.id &&
                  card.id !== fundedCardId;
                return (
                  <WalletCard
                    key={card.id}
                    card={card}
                    index={idx}
                    selected={selectedCardId === card.id && stage !== "validated"}
                    highlightAsAnswer={isAnswer}
                    highlightAsWrong={isWrong}
                    onSelect={selectCard}
                    addressPrefix={t("walletGame.cardAddressPrefix")}
                    privateKeyLabel={t("walletGame.cardPrivateKey")}
                    publicKeyLabel={t("walletGame.cardPublicKey")}
                    addressLabel={t("walletGame.cardAddressLabel")}
                    utxosLabel={t("walletGame.cardUtxosLabel")}
                    noUtxosLabel={t("walletGame.cardNoUtxos")}
                    utxoPrefix={t("walletGame.cardUtxoPrefix")}
                    accentColor={accentColor}
                    successColor={successColor}
                    errorColor={errorColor}
                    basePrimaryText={basePrimaryText}
                    baseTextSecondary={baseTextSecondary}
                    baseBorderSecondary={baseBorderSecondary}
                    baseBackgroundSecondary={baseBackgroundSecondary}
                  />
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", minWidth: 0 }}>
            <div>
              <div style={sectionLabelStyle}>{t("walletGame.questionLabel")}</div>
              <p style={{ ...introStyle, marginTop: 0 }}>
                {selectedCardId === null
                  ? t("walletGame.selectHint")
                  : `${t("walletGame.selectedPrefix")} #${selectedCardId + 1} ${t("walletGame.selectedSuffix")}`}
              </p>
            </div>

            <div>
              <label
                style={{
                  ...sectionLabelStyle,
                  display: "block",
                  marginBottom: "0.4rem",
                }}
                htmlFor="wallet-game-amount"
              >
                {t("walletGame.amountLabel")}
              </label>
              <input
                id="wallet-game-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amountInput}
                onChange={(e) => updateAmount(e.target.value)}
                disabled={isLocked}
                style={{
                  ...inputStyle,
                  opacity: isLocked ? 0.6 : 1,
                  cursor: isLocked ? "default" : "text",
                }}
              />
            </div>

            <Button
              variant="primary"
              icon={<Sparkles size={14} strokeWidth={2.2} />}
              onClick={validate}
              disabled={!validateReady || isLocked}
              style={{ alignSelf: "flex-start" }}
            >
              {t("walletGame.validateAction")}
            </Button>
          </div>

          {stage === "validated" && verdict === "correct" && (
            <FeedbackPanel
              tone="success"
              icon={<CheckCircle size={14} strokeWidth={2.5} />}
              title={t("walletGame.correctTitle")}
            >
              <p
                style={{ fontSize: typo.note.fontSize, lineHeight: 1.55, color: basePrimaryText, margin: 0 }}
              >
                {t("walletGame.correctMain")}
              </p>
              <p
                style={{
                  fontSize: typo.micro.fontSize,
                  lineHeight: 1.55,
                  color: withOpacity(baseTextSecondary, 0.85),
                  margin: "0.4rem 0 0 0",
                }}
              >
                {t("walletGame.correctPedagogy")}
              </p>
            </FeedbackPanel>
          )}

          {stage === "validated" && verdict === "incorrect" && (
            <FeedbackPanel
              tone="error"
              icon={<XCircle size={14} strokeWidth={2.5} />}
              title={t("walletGame.incorrectTitle")}
            >
              <p
                style={{ fontSize: typo.note.fontSize, lineHeight: 1.55, color: basePrimaryText, margin: 0 }}
              >
                {t("walletGame.incorrectMain")}
              </p>
            </FeedbackPanel>
          )}

          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw size={11} strokeWidth={2} />}
            onClick={restart}
            style={{ alignSelf: "flex-end" }}
          >
            {t("walletGame.restart")}
          </Button>
        </>
      )}

      <p
        style={{
          fontSize: typo.micro.fontSize,
          fontStyle: "italic",
          color: withOpacity(baseTextSecondary, 0.55),
          margin: 0,
          textAlign: "center",
        }}
      >
        {t("walletGame.disclaimer")}
      </p>
    </SurfaceCard>
  );
};
