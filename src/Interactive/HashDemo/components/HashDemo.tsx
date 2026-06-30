import { type CSSProperties, type FC } from "react";

import { BRAND, Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity, } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { useHashDemo } from "../hooks";

import { CircleCheck, Hash, RotateCcw } from "@icons";

type Props = {
  /** Fired once the reader hashes something (gates the surrounding tool block). */
  onComplete?: () => void;
};

export const HashDemo: FC<Props> = ({ onComplete }) => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const { input, setInput, hash, hasHashed, handleHash, handleReset } = useHashDemo(onComplete);

  const disabled = hash !== null;
  const hashDisabled = input.length === 0 || disabled;

  const inputStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.body,
    padding: isMobile ? "0.7rem 1rem" : "0.75rem 1.25rem",
    borderRadius: 0,
    border: `1px solid ${hash ? world.border.secondary : colors.base.border.secondary}`,
    background: colors.base.background.secondary,
    color: disabled ? colors.base.text.secondary : colors.base.text.primary,
    outline: "none",
    width: "100%",
    transition: "all 0.3s var(--ease-smooth)",
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "default" : "text",
  };

  const outputBox: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: BRAND.fontSize.note,
    lineHeight: 1.6,
    padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem",
    borderRadius: 0,
    background: withOpacity(world.background.secondary, 0.06),
    border: `1px solid ${withOpacity(world.border.secondary, 0.3)}`,
    color: world.text.secondary,
    wordBreak: "break-all",
    textAlign: "left",
  };

  return (
    <SurfaceCard
      glowColor={hash ? world.border.secondary : colors.base.border.secondary}
      style={{ marginTop: "0.75rem" }}
    >
      <Caption icon={<Hash size={isMobile ? 16 : 18} strokeWidth={2} />}>SHA-256</Caption>

      <input
        type="text"
        maxLength={50}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={fr ? "Entres ce que tu veux..." : "Type anything you want..."}
        style={inputStyle}
        disabled={disabled}
      />

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Button onClick={handleHash} disabled={hashDisabled}>
          {fr ? "▶ Hacher" : "▶ Hash"}
        </Button>
        {hash && (
          <Button
            variant="secondary"
            onClick={handleReset}
            icon={<RotateCcw size={isMobile ? 12 : 14} strokeWidth={2} />}
          >
            {fr ? "Réessayer" : "Retry"}
          </Button>
        )}
      </div>

      {hash && (
        <div style={outputBox}>
          {fr ? "Empreinte générée :" : "Generated hash:"} <strong>{hash}</strong>
        </div>
      )}

      {hasHashed && hash && (
        <FeedbackPanel
          tone="success"
          icon={<CircleCheck size={18} strokeWidth={2} color={colors.semantic.success.text} />}
        >
          {fr
            ? "En pratique, il est impossible de retrouver le texte d'origine à partir de son hash. Chaque empreinte est déterministe, de taille fixe (64 caractères hexadécimaux pour SHA-256) et conçue pour que deux entrées différentes produisent quasiment jamais la même empreinte."
            : "In practice, there's no way to recover the original text from its hash. Each fingerprint is deterministic, fixed in size (64 hexadecimal characters for SHA-256), and built so that two different inputs are vanishingly unlikely to land on the same fingerprint."}
        </FeedbackPanel>
      )}
    </SurfaceCard>
  );
};
