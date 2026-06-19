import { Fragment, type CSSProperties, type FC } from "react";

import { useBreakpoint, useHeaderHidden, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  count: number;
  current: number;
  maxRevealed: number;
  onJump: (index: number) => void;
};

// Header height it tucks under (see Header.tsx - sticky, 3.5rem).
const HEADER_OFFSET = "3.5rem";

/**
 * Chapter progress as a sticky sub-bar centered on the content column. It tucks
 * just under the auto-hiding header and rides to the top edge when the header
 * slides away (sharing the header's `useHeaderHidden` source of truth), so it
 * stays visible while reading without colliding with the header or the footer.
 * A centered row of small linked "blocks": reached ones fill with the module
 * accent, the current one lifts with a soft ring, future ones stay faint.
 * Clicking an already-revealed block jumps and scrolls to it.
 */
export const BlockMilestones: FC<Props> = ({ count, current, maxRevealed, onJump }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const isMobile = useBreakpoint() === "mobile";
  const headerHidden = useHeaderHidden();

  // On neutral pages (outside any module) the module accent collapses to
  // the same dark/light grey as the pill background - dots and links
  // vanish into the chrome. Fall back to base text colour so the
  // milestones stay visible on both dark and light themes.
  const accent =
    moduleTheme === "base"
      ? colors.base.text.secondary
      : colors[moduleTheme].background.secondary;
  const reachedLink = withOpacity(accent, 0.55);
  const idle = withOpacity(colors.base.text.primary, 0.16);
  const size = isMobile ? 9 : 10;
  const linkWidth = isMobile ? 16 : 24;

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
    padding: isMobile ? "0.5rem 0.85rem" : "0.6rem 1.05rem",
    borderRadius: 999,
    background: withOpacity(colors.base.background.tertiary, 0.82),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${colors.base.border.secondary}`,
    boxShadow: colors.boxShadow.soft,
    transition: "top 0.3s var(--ease-smooth)",
  };

  const linkStyle = (filled: boolean): CSSProperties => ({
    width: linkWidth,
    height: 2,
    flex: "0 0 auto",
    borderRadius: 1,
    background: filled ? reachedLink : idle,
    transition: "background 0.45s var(--ease-smooth)",
  });

  const dotStyle = (reached: boolean, isCurrent: boolean, reachable: boolean): CSSProperties => ({
    width: size,
    height: size,
    flex: "0 0 auto",
    padding: 0,
    appearance: "none",
    outline: "none",
    borderRadius: 3,
    border: reached ? "none" : `1.5px solid ${idle}`,
    background: reached ? accent : "transparent",
    transform: isCurrent ? "scale(1.35)" : "scale(1)",
    boxShadow: isCurrent ? `0 0 0 4px ${withOpacity(accent, 0.16)}` : "none",
    cursor: reachable ? "pointer" : "default",
    transition:
      "transform 0.4s var(--ease-smooth), background 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth), border-color 0.4s var(--ease-smooth)",
  });

  return (
    <div role="group" aria-label={t("reading.milestoneAria")} style={pillStyle}>
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
              style={dotStyle(reached, isCurrent, reachable)}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
