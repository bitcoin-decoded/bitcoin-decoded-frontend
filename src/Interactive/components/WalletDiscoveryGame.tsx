import { type CSSProperties, type FC } from "react";
import {
  CheckCircle,
  KeyRound,
  RefreshCw,
  Sparkles,
  Wallet,
  XCircle,
} from "lucide-react";

import { useBreakpoint, usePageTheme } from "../../Design";
import { withOpacity } from "../../Design/helpers";
import { useTranslation } from "../../I18n";
import { useWalletDiscoveryGame } from "../hooks";
import { WalletCard } from "./WalletDiscoveryGame/index";

export const WalletDiscoveryGame: FC = () => {
  const { t } = useTranslation();
  const { colors: themeColors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = themeColors[moduleTheme];

  const accentColor = world.border.secondary;
  const successColor = themeColors.semantic.success.text;
  const errorColor = themeColors.semantic.error?.text ?? "#ef4444";
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
  } = useWalletDiscoveryGame();

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
    textAlign: "left",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    minWidth: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile ? "0.74rem" : "0.8rem",
    fontWeight: 700,
    color: basePrimaryText,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    minWidth: 0,
    overflowWrap: "anywhere",
  };

  const introStyle: CSSProperties = {
    fontSize: "0.7rem",
    lineHeight: 1.55,
    color: withOpacity(baseTextSecondary, 0.85),
    margin: 0,
  };

  // Style aligned with the rest of the Bitcoin section (cf. ByzantineGenerals,
  // chapter 4): subtle gradient + accent border, no saturated background.
  const primaryBtnStyle = (active = true): CSSProperties => ({
    ...mono,
    alignSelf: "flex-start",
    cursor: active ? "pointer" : "default",
    padding: isMobile ? "0.6rem 1.25rem" : "0.7rem 1.5rem",
    borderRadius: "0.75rem",
    fontSize: isMobile ? "0.72rem" : "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: active ? basePrimaryText : withOpacity(baseTextSecondary, 0.55),
    background: active
      ? `linear-gradient(135deg, ${withOpacity(accentColor, 0.12)}, transparent)`
      : withOpacity(baseBorderSecondary, 0.04),
    border: active
      ? `1.5px solid ${withOpacity(accentColor, 0.55)}`
      : `1px dashed ${withOpacity(baseBorderSecondary, 0.25)}`,
    boxShadow: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    whiteSpace: isMobile ? "normal" : "nowrap",
    transition: "all 0.3s var(--ease-smooth)",
  });

  const ghostBtnStyle: CSSProperties = {
    ...mono,
    alignSelf: "flex-end",
    cursor: "pointer",
    padding: "0.4rem 0.8rem",
    borderRadius: "0.5rem",
    fontSize: "0.66rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    border: `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`,
    background: "transparent",
    color: baseTextSecondary,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    whiteSpace: "nowrap",
    transition: "all 0.25s var(--ease-smooth)",
  };

  const sectionLabelStyle: CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: withOpacity(baseTextSecondary, 0.55),
    marginBottom: "0.55rem",
  };

  const verdictPanelStyle = (kind: "success" | "error"): CSSProperties => {
    const c = kind === "success" ? successColor : errorColor;
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

  const inputStyle: CSSProperties = {
    ...mono,
    width: "100%",
    maxWidth: isMobile ? "100%" : "16rem",
    padding: "0.5rem 0.7rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: 600,
    border: `1.5px solid ${withOpacity(accentColor, 0.4)}`,
    background: withOpacity(baseBackgroundSecondary, 0.05),
    color: basePrimaryText,
    outline: "none",
    boxSizing: "border-box",
    touchAction: "manipulation",
    transition: "border-color 0.25s var(--ease-smooth), box-shadow 0.25s var(--ease-smooth)",
  };

  const validateReady = selectedCardId !== null && amountInput.trim() !== "";

  return (
    <div
      className="gradient-border"
      style={{ ...containerStyle, "--border-glow-color": accentColor } as CSSProperties}
    >
      {/* Header */}
      <div style={headerStyle}>
        <Wallet
          size={isMobile ? 17 : 18}
          strokeWidth={2}
          style={{ color: accentColor, flexShrink: 0 }}
        />
        <span style={titleStyle}>{t("walletGame.title")}</span>
      </div>

      <p style={introStyle}>{t("walletGame.intro")}</p>

      {/* Stage: idle — only the reveal button is shown */}
      {stage === "idle" && (
        <button style={primaryBtnStyle(true)} onClick={reveal}>
          <KeyRound size={14} strokeWidth={2.2} />
          {t("walletGame.revealAction")}
        </button>
      )}

      {/* Stage: revealed or validated — full game UI */}
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

          {/* User answer area */}
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

            <button
              style={primaryBtnStyle(validateReady && !isLocked)}
              onClick={validate}
              disabled={!validateReady || isLocked}
            >
              <Sparkles size={14} strokeWidth={2.2} />
              {t("walletGame.validateAction")}
            </button>
          </div>

          {/* Verdict */}
          {stage === "validated" && verdict === "correct" && (
            <div style={verdictPanelStyle("success")}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: successColor,
                }}
              >
                <CheckCircle size={14} strokeWidth={2.5} />
                {t("walletGame.correctTitle")}
              </div>
              <p style={{ fontSize: "0.7rem", lineHeight: 1.55, color: basePrimaryText, margin: 0 }}>
                {t("walletGame.correctMain")}
              </p>
              <p
                style={{
                  fontSize: "0.66rem",
                  lineHeight: 1.55,
                  color: withOpacity(baseTextSecondary, 0.85),
                  margin: 0,
                }}
              >
                {t("walletGame.correctPedagogy")}
              </p>
            </div>
          )}

          {stage === "validated" && verdict === "incorrect" && (
            <div style={verdictPanelStyle("error")}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: errorColor,
                }}
              >
                <XCircle size={14} strokeWidth={2.5} />
                {t("walletGame.incorrectTitle")}
              </div>
              <p style={{ fontSize: "0.7rem", lineHeight: 1.55, color: basePrimaryText, margin: 0 }}>
                {t("walletGame.incorrectMain")}
              </p>
            </div>
          )}

          {/* Reset / restart — visible whenever cards are revealed */}
          <button style={ghostBtnStyle} onClick={restart}>
            <RefreshCw size={11} strokeWidth={2} />
            {t("walletGame.restart")}
          </button>
        </>
      )}

      {/* Discreet pedagogical disclaimer */}
      <p
        style={{
          fontSize: "0.55rem",
          fontStyle: "italic",
          color: withOpacity(baseTextSecondary, 0.55),
          margin: 0,
          textAlign: "center",
        }}
      >
        {t("walletGame.disclaimer")}
      </p>
    </div>
  );
};
