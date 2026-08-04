import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  Caption,
  ExploredCounter,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useNodeSuperpowers } from "../hooks";
import type { Superpower } from "../types";

import { SuperpowerTile } from "./SuperpowerTile";

import { DoodleCursorClick } from "@doodle";

type Props = {
  title: string;
  icon?: ReactNode;
  powers: Superpower[];
  cta?: string;
  onComplete?: () => void;
};

export const NodeSuperpowers: FC<Props> = ({ title, icon, powers, cta, onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();

  const gated = onComplete !== undefined;
  const requiredCount = powers.filter((power) => !power.muted).length;
  const { openIndex, toggle, exploredCount, discovered } = useNodeSuperpowers({
    requiredExplored: gated ? requiredCount : 0,
    onComplete,
  });

  const accent = moduleTheme === "base" ? getBrandGold(theme) : colors[moduleTheme].text.secondary;
  const softWash = withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035);
  const active = openIndex === null ? null : powers[openIndex];

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.9rem" : "1.1rem",
    margin: isMobile ? "1.5rem 0" : "1.75rem 0",
    padding: isMobile ? "1rem" : "1.25rem",
    background: softWash,
    border: `1px solid ${colors.base.border.tertiary}`,
    textAlign: "left",
  };

  const headerRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.6rem 0.85rem",
    flexWrap: "wrap",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gap: isMobile ? "0.55rem" : "0.75rem",
    gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "6.25rem" : "7.5rem"}, 1fr))`,
  };

  const detailPanel: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: isMobile ? "4.25rem" : "3.75rem",
    justifyContent: "center",
    padding: isMobile ? "0.85rem 0.9rem" : "0.95rem 1.1rem",
    border: `1px solid ${withOpacity(accent, active ? 0.4 : 0.18)}`,
    background: active ? withOpacity(accent, 0.06) : "transparent",
    transition: "border-color 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth)",
  };

  const bodyStyle: CSSProperties = {
    ...typo.note,
    lineHeight: 1.6,
    margin: 0,
    textAlign: "left",
    color: colors.base.text.primary,
  };

  const hintStyle: CSSProperties = {
    ...typo.note,
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    margin: 0,
    fontStyle: "italic",
    color: withOpacity(colors.base.text.secondary, 0.85),
  };

  return (
    <div style={containerStyle}>
      <div style={headerRow}>
        <Caption tone="world" size="md" icon={icon}>
          {title}
        </Caption>
        {gated && (
          <ExploredCounter
            explored={exploredCount}
            total={requiredCount}
            label={t("nodeSuperpowers.explored")}
          />
        )}
      </div>

      <div style={gridStyle}>
        {powers.map((power, index) => (
          <SuperpowerTile
            key={index}
            index={index}
            superpower={power}
            active={openIndex === index}
            revealed={openIndex === index || discovered.has(index) || Boolean(power.muted)}
            dimmed={openIndex !== null && openIndex !== index}
            accent={accent}
            onSelect={() => toggle(index, !power.muted)}
          />
        ))}
      </div>

      <div style={detailPanel}>
        {active ? (
          <div
            key={openIndex}
            style={{ ...bodyStyle, animation: "chainFieldReveal 0.45s var(--ease-smooth) both" }}
          >
            {active.body}
          </div>
        ) : (
          <p style={hintStyle}>
            <DoodleCursorClick size={20} style={{ flexShrink: 0, color: accent }} />
            <span>{cta ?? t("nodeSuperpowers.cta")}</span>
          </p>
        )}
      </div>
    </div>
  );
};
