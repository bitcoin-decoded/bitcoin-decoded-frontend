import { type CSSProperties, type FC } from "react";

import {
  Button,
  Caption,
  FeedbackPanel,
  getBrandGold,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useDifficultyAdjustment } from "../hooks";

import { DoodleClock, DoodleHash, DoodleMining } from "@doodle";
import { Minus, Plus } from "@icons";

type Props = {
  onComplete?: () => void;
};

export const DifficultyAdjustment: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const world = colors[moduleTheme];
  const gold = getBrandGold(theme);
  const { miners, target, canDecrease, canIncrease, decrease, increase, step } =
    useDifficultyAdjustment(onComplete);

  const iconSize = isMobile ? 20 : 22;

  const controlRow: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: isMobile ? "0.5rem" : "0.75rem",
    padding: "0.85rem 1rem",
    background: withOpacity(world.background.secondary, 0.05),
    border: `1px solid ${withOpacity(world.border.secondary, 0.18)}`,
  };

  const minerCount: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.1rem",
    flex: 1,
    textAlign: "center",
    minWidth: 0,
  };

  const minerNumber: CSSProperties = {
    ...typo.heading,
    color: colors.base.text.primary,
    transition: "color 0.3s var(--ease-smooth)",
  };

  const minerLabel: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.secondary,
  };

  const metricsRow: CSSProperties = {
    display: "flex",
    gap: isMobile ? "0.6rem" : "0.85rem",
    flexDirection: isMobile ? "column" : "row",
  };

  const metric: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    padding: "0.75rem 0.9rem",
    background: withOpacity(world.background.secondary, 0.05),
    border: `1px solid ${withOpacity(world.border.secondary, 0.18)}`,
    minWidth: 0,
  };

  const metricValue = (accent: string): CSSProperties => ({
    ...typo.figure,
    color: accent,
    letterSpacing: "0.05em",
    transition: "color 0.3s var(--ease-smooth)",
    wordBreak: "break-word",
  });

  return (
    <SurfaceCard gap="0.85rem" margin={isMobile ? "1.5rem 0" : "2rem 0"}>
      <Caption tone="world" size="md" icon={<DoodleMining size={iconSize} />}>
        {t("difficulty.title")}
      </Caption>

      <div style={controlRow}>
        <Button
          variant="primary"
          size="sm"
          icon={<Minus size={isMobile ? 12 : 14} strokeWidth={2.5} />}
          onClick={decrease}
          disabled={!canDecrease}
        >
          {step}
        </Button>

        <div style={minerCount}>
          <span style={minerNumber}>{miners}</span>
          <span style={minerLabel}>{t("difficulty.miners")}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={isMobile ? 12 : 14} strokeWidth={2.5} />}
          onClick={increase}
          disabled={!canIncrease}
        >
          {step}
        </Button>
      </div>

      <div style={metricsRow}>
        <div style={metric}>
          <Caption tone="muted" size="xs" icon={<DoodleHash size={iconSize} />}>
            {t("difficulty.hashTarget")}
          </Caption>
          <span style={metricValue(gold)}>{target}…</span>
        </div>

        <div style={metric}>
          <Caption tone="muted" size="xs" icon={<DoodleClock size={iconSize} />}>
            {t("difficulty.avgTime")}
          </Caption>
          <span style={metricValue(world.text.secondary)}>10 min</span>
        </div>
      </div>

      <FeedbackPanel tone="info">
        {t("difficulty.hint.prefix")} <b>{t("difficulty.hint.emphasis")}</b>
        {t("difficulty.hint.suffix")}
      </FeedbackPanel>
    </SurfaceCard>
  );
};
