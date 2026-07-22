import { type CSSProperties, type FC, Fragment } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  THEME_COLORS,
  useBreakpoint,
  useHeaderHidden,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  count: number;
  current: number;
  maxRevealed: number;
  onJump: (index: number) => void;
};

const HEADER_OFFSET = "3.5rem";

export const BlockMilestones: FC<Props> = ({ count, current, maxRevealed, onJump }) => {
  const { theme } = useThemeContext();
  const colors = THEME_COLORS[theme];
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const headerHidden = useHeaderHidden();

  const gold = getBrandGold(theme);
  const idleStroke = withOpacity(colors.base.text.primary, 0.22);
  const linkColor = withOpacity(gold, 0.6);
  const linkIdle = withOpacity(colors.base.text.primary, 0.15);

  const size = isMobile ? 6 : 7;
  const linkWidth = isMobile ? 12 : 18;

  const pillStyle: CSSProperties = {
    position: "sticky",
    top: headerHidden ? "0.6rem" : `calc(${HEADER_OFFSET} + 0.6rem)`,
    zIndex: 90,
    width: "fit-content",
    maxWidth: "100%",
    margin: "0 auto 1.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    padding: isMobile ? "0.45rem 0.8rem" : "0.55rem 1rem",
    background: withOpacity(colors.base.background.primary, 0.85),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `${BRAND.figures.ruleThickness}px solid ${withOpacity(colors.base.text.primary, 0.1)}`,
    transition: "top 0.3s var(--ease-smooth)",
  };

  const railLabelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: typo.label.fontSize,
    fontWeight: 400,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: gold,
    marginRight: isMobile ? "0.5rem" : "0.65rem",
    flex: "0 0 auto",
  };

  const linkStyle = (filled: boolean): CSSProperties => ({
    width: linkWidth,
    height: BRAND.figures.ruleThickness,
    flex: "0 0 auto",
    background: filled ? linkColor : linkIdle,
    transition: "background 0.45s var(--ease-smooth)",
  });

  const blockStyle = (reached: boolean, isCurrent: boolean, reachable: boolean): CSSProperties => ({
    width: size,
    height: size,
    flex: "0 0 auto",
    padding: 0,
    appearance: "none",
    border: reached ? "none" : `${BRAND.figures.ruleThickness}px solid ${idleStroke}`,
    background: reached ? gold : "transparent",
    transform: isCurrent ? "scale(1.25)" : "scale(1)",
    boxShadow: isCurrent ? `0 0 0 2px ${withOpacity(gold, 0.14)}` : "none",
    cursor: reachable ? "pointer" : "default",
    transition:
      "transform 0.4s var(--ease-smooth), background 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth), border-color 0.4s var(--ease-smooth)",
  });

  return (
    <div role="group" aria-label={t("reading.milestoneAria")} style={pillStyle}>
      <span style={railLabelStyle}>{t("reading.railLabel")}</span>
      {Array.from({ length: count }).map((_, i) => {
        const reached = i <= maxRevealed;
        const reachable = i <= maxRevealed;
        const isCurrent = i === current;
        return (
          <Fragment key={i}>
            {i > 0 && <span style={linkStyle(i <= maxRevealed)} />}
            <button
              type="button"
              aria-label={`${t("reading.milestoneAria")} ${i + 1}/${count}`}
              aria-current={isCurrent ? "step" : undefined}
              disabled={!reachable}
              onClick={() => reachable && onJump(i)}
              style={blockStyle(reached, isCurrent, reachable)}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
