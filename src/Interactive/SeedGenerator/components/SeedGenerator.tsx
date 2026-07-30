import { type CSSProperties, type FC } from "react";

import { Button, Caption, Disclosure, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { groupBits } from "../helpers";
import { useSeedGenerator } from "../hooks";
import type { SeedLength } from "../types";

import { DoodleBulb, DoodleMagicHat, DoodleSeedling } from "@doodle";

type Props = {
  onComplete?: () => void;
};

export const SeedGenerator: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors: themeColors, moduleTheme } = usePageTheme();
  const world = themeColors[moduleTheme];

  const accentColor = world.text.secondary;
  const successColor = themeColors.semantic.success.text;
  const basePrimaryText = world.text.primary;
  const baseTextSecondary = themeColors.base.text.secondary;
  const baseBorderSecondary = themeColors.base.border.secondary;
  const baseBackgroundSecondary = themeColors.base.background.secondary;

  const { length, seed, revealedCount, generate, setLength } = useSeedGenerator(onComplete);

  const stepLabelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: withOpacity(baseTextSecondary, 0.7),
    marginBottom: "0.4rem",
  };

  const segmentBtnStyle = (active: boolean): CSSProperties => ({
    ...typo.micro,
    cursor: "pointer",
    padding: isMobile ? "0.6rem 1rem" : "0.7rem 1.2rem",
    border: "none",
    letterSpacing: "0.04em",
    color: active ? themeColors.base.text.onAccent : withOpacity(baseTextSecondary, 0.85),
    background: active ? accentColor : "transparent",
    transition: "all 0.25s var(--ease-smooth)",
  });

  const sectionLabelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(baseTextSecondary, 0.6),
    marginBottom: "0.5rem",
  };

  const wordChipStyle = (revealed: boolean): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    padding: "0.45rem 0.55rem",
    border: `1px solid ${withOpacity(accentColor, revealed ? 0.3 : 0.12)}`,
    background: withOpacity(accentColor, revealed ? 0.06 : 0.02),
    minWidth: 0,
    boxSizing: "border-box",
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(4px)",
    transition: "opacity 0.3s var(--ease-smooth), transform 0.3s var(--ease-smooth)",
  });

  const wordIndexStyle: CSSProperties = {
    ...typo.micro,
    color: withOpacity(baseTextSecondary, 0.55),
    letterSpacing: "0.04em",
  };

  const wordTextStyle: CSSProperties = {
    ...typo.figure,
    color: basePrimaryText,
    wordBreak: "break-word",
  };

  const binaryBlockStyle = (color: string): CSSProperties => ({
    ...typo.micro,
    padding: "0.55rem 0.7rem",
    background: withOpacity(baseBackgroundSecondary, 0.06),
    border: `1px solid ${withOpacity(color, 0.25)}`,
    color: withOpacity(basePrimaryText, 0.85),
    wordBreak: "break-all",
    lineHeight: 1.55,
  });

  const noteStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: "0.85rem 1rem",
    border: `1px solid ${withOpacity(accentColor, 0.22)}`,
    background: withOpacity(accentColor, 0.05),
  };

  const heroQuoteStyle: CSSProperties = {
    ...typo.note,
    fontStyle: "italic",
    lineHeight: 1.55,
    color: withOpacity(basePrimaryText, 0.85),
    padding: "0.7rem 0.85rem",
    borderLeft: `3px solid ${withOpacity(accentColor, 0.45)}`,
    background: withOpacity(accentColor, 0.04),
    margin: 0,
  };

  const wordsGridStyle: CSSProperties = {
    display: "grid",
    gap: "0.45rem",
    gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
  };

  return (
    <SurfaceCard gap="1.1rem" margin={isMobile ? "1.5rem 0" : "2rem 0"} style={{ overflow: "hidden", textAlign: "left" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", minWidth: 0 }}>
        <Caption
          tone="accent"
          size="md"
          icon={<DoodleSeedling size={isMobile ? 20 : 22} style={{ color: accentColor }} />}
          style={{ minWidth: 0, overflowWrap: "anywhere" }}
        >
          {t("seedGenerator.title")}
        </Caption>
        <p style={{ ...typo.note, fontStyle: "italic", color: withOpacity(baseTextSecondary, 0.75), margin: 0 }}>
          {t("seedGenerator.subtitle")}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "flex-end",
          gap: isMobile ? "0.85rem" : "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={stepLabelStyle}>{t("seedGenerator.step1Label")}</div>
          <div
            role="tablist"
            aria-label={t("seedGenerator.step1Label")}
            style={{ display: "inline-flex", border: `1px solid ${withOpacity(baseBorderSecondary, 0.25)}`, overflow: "hidden" }}
          >
            {([12, 24] as SeedLength[]).map((n) => (
              <button key={n} role="tab" aria-selected={length === n} onClick={() => setLength(n)} style={segmentBtnStyle(length === n)}>
                {n === 12 ? t("seedGenerator.length12") : t("seedGenerator.length24")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={stepLabelStyle}>{t("seedGenerator.step2Label")}</div>
          <Button
            variant="primary"
            icon={<DoodleMagicHat size={16} />}
            onClick={generate}
            style={{ whiteSpace: isMobile ? "normal" : "nowrap" }}
          >
            {seed ? t("seedGenerator.regenerate") : t("seedGenerator.generate")}
          </Button>
        </div>
      </div>

      {seed && (
        <>
          <div>
            <div style={sectionLabelStyle}>
              {t("seedGenerator.mnemonicLabelPrefix")} ({seed.words.length} {t("seedGenerator.wordsUnit")})
            </div>
            <div style={wordsGridStyle}>
              {seed.words.map((word, i) => (
                <div key={`${i}-${word}`} style={wordChipStyle(i < revealedCount)}>
                  <span style={wordIndexStyle}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={wordTextStyle}>{word}</span>
                </div>
              ))}
            </div>
          </div>

          <Disclosure title={t("seedGenerator.binaryDisclosureTitle")}>
            <div>
              <div style={sectionLabelStyle}>
                {t("seedGenerator.entropy")} ({seed.entropy.length} {t("seedGenerator.bitsUnit")})
              </div>
              <div style={binaryBlockStyle(accentColor)}>{groupBits(seed.entropy)}</div>
            </div>

            <div>
              <div style={sectionLabelStyle}>
                {t("seedGenerator.checksum")} ({seed.checksum.length} {t("seedGenerator.bitsUnit")})
              </div>
              <div style={binaryBlockStyle(successColor)}>{seed.checksum}</div>
            </div>

            <div>
              <div style={sectionLabelStyle}>
                {t("seedGenerator.mnemonic")} ({seed.mnemonic.length} {t("seedGenerator.bitsUnit")} ⇒ {seed.words.length}{" "}
                {t("seedGenerator.wordsUnit")})
              </div>
              <div style={binaryBlockStyle(baseBorderSecondary)}>{groupBits(seed.mnemonic, 11, " · ")}</div>
            </div>
          </Disclosure>

          <p style={heroQuoteStyle}>{t("seedGenerator.heroQuote")}</p>
        </>
      )}

      <div style={noteStyle}>
        <Caption tone="world" size="xs" color={accentColor} icon={<DoodleBulb size={18} />}>
          {t("seedGenerator.noteTitle")}
        </Caption>
        <ul
          style={{
            ...typo.note,
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            lineHeight: 1.55,
            color: withOpacity(baseTextSecondary, 0.9),
          }}
        >
          <li>{t("seedGenerator.noteWordForm")}</li>
          <li>{t("seedGenerator.noteWordList")}</li>
          <li>{t("seedGenerator.noteStandardLengths")}</li>
          <li>{t("seedGenerator.notePedagogical")}</li>
        </ul>
      </div>
    </SurfaceCard>
  );
};
