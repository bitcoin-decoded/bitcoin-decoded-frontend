import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  Button,
  Caption,
  Disclosure,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useHashDemo } from "../hooks";

import { DoodleHash } from "@doodle";

type Props = {
  onComplete?: () => void;
};

export const HashDemo: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const world = colors[moduleTheme];
  const { input, setInput, hash, hasHashed, handleHash, handleReset } = useHashDemo(onComplete);

  const disabled = hash !== null;
  const hashDisabled = input.length === 0 || disabled;

  // A wash rather than a slab: the demo sits inside a tinted callout, and the
  // opaque `background.secondary` punched a cold hole through it.
  const fieldFill = withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035);

  const inputStyle: CSSProperties = {
    ...typo.figure,
    padding: isMobile ? "0.7rem 1rem" : "0.75rem 1.25rem",
    border: `${BRAND.figures.ruleThickness}px solid ${
      hash ? world.border.secondary : colors.base.border.tertiary
    }`,
    background: fieldFill,
    color: disabled ? colors.base.text.secondary : colors.base.text.primary,
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s var(--ease-smooth), opacity 0.3s var(--ease-smooth)",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "default" : "text",
  };

  const outputBox: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: isMobile ? "0.75rem 1rem" : "1rem 1.25rem",
    background: fieldFill,
    border: `${BRAND.figures.ruleThickness}px solid ${withOpacity(world.border.secondary, 0.35)}`,
  };

  const outputLabelStyle: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    color: world.text.secondary,
  };

  const hashStyle: CSSProperties = {
    ...typo.figure,
    color: colors.base.text.primary,
    wordBreak: "break-all",
    lineHeight: 1.6,
  };

  return (
    <SurfaceCard style={{ marginTop: "0.75rem" }}>
      <Caption icon={<DoodleHash size={isMobile ? 22 : 24} />}>SHA-256</Caption>

      <input
        type="text"
        maxLength={50}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("hashDemo.placeholder")}
        style={inputStyle}
        disabled={disabled}
      />

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Button onClick={handleHash} disabled={hashDisabled}>
          {t("hashDemo.run")}
        </Button>
        {hash && (
          <Button variant="secondary" onClick={handleReset}>
            {t("hashDemo.retry")}
          </Button>
        )}
      </div>

      {hash && (
        <div style={outputBox}>
          <span style={outputLabelStyle}>{t("hashDemo.output")}</span>
          <span style={hashStyle}>{hash}</span>
        </div>
      )}

      {hasHashed && hash && (
        <Disclosure title={t("hashDemo.noteTitle")}>{t("hashDemo.note")}</Disclosure>
      )}
    </SurfaceCard>
  );
};
