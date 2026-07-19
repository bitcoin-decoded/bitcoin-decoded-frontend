import { type CSSProperties, type FC, useState } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
} from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { useChapterLock } from "../../../Progression";
import { type RouteName, useRouterContext } from "../../../Routing/";

import { DoodleLock } from "@doodle";
import { ChevronLeft, ChevronRight } from "@icons";

type Props = {
  page: { id: RouteName; label: string };
  type: "prev" | "next";
};

/**
 * One chapter-level nav button, ledger register: a sharp hairline frame (no
 * gradient-border, no rounded card, no circle icon), a mono small-caps kicker
 * label, the destination title in the body serif, a chevron in the module color.
 * The frame + label brighten to the module accent on hover.
 */
export const NavButton: FC<Props> = ({ page, type }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { setCurrentPage } = useRouterContext();
  const { isLocked } = useChapterLock();
  const [hovered, setHovered] = useState(false);

  // Same verdict as the navbar and the rail, read from the one place that
  // states it.
  const locked = isLocked(page.id);

  const gold = getBrandGold(theme);
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;
  const align = type === "prev" ? "left" : "right";
  const Icon = type === "prev" ? ChevronLeft : ChevronRight;
  const isHovered = hovered && !locked;

  const btnStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    flexDirection: align === "left" ? "row" : "row-reverse",
    flex: 1,
    padding: isMobile ? "0.85rem 1rem" : "0.95rem 1.15rem",
    border: `1px solid ${isHovered ? withOpacity(moduleAccent, 0.7) : withOpacity(colors.base.text.primary, 0.3)}`,
    background: "transparent",
    cursor: locked ? "not-allowed" : "pointer",
    opacity: locked ? 0.85 : 1,
    transition: "border-color 0.25s var(--ease-smooth)",
    textAlign: align,
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    // Was 10px and faux-bold on single-weight Cutive.
    fontSize: typo.micro.fontSize,
    fontWeight: 400,
    fontVariant: "small-caps",
    letterSpacing: "0.1em",
    color: isHovered ? moduleAccent : withOpacity(colors.base.text.primary, 0.75),
    transition: "color 0.25s var(--ease-smooth)",
  };

  // The chevron keeps the outer edge in both directions, so it still reads as
  // "back" on the left and "forward" on the right with the padlock beside it.
  const iconGroupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexDirection: align === "left" ? "row" : "row-reverse",
    gap: "0.4rem",
    flexShrink: 0,
  };

  const titleStyle: CSSProperties = {
    ...typo.label,
    fontFamily: BRAND.fonts.body,
    color: colors.base.text.primary,
    lineHeight: 1.25,
  };

  return (
    <button
      style={btnStyle}
      onClick={() => !locked && setCurrentPage(page.id)}
      aria-disabled={locked || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={iconGroupStyle}>
        <Icon
          size={isMobile ? 17 : 19}
          strokeWidth={2}
          style={{ flexShrink: 0, color: moduleAccent }}
        />
        {locked && (
          <DoodleLock size={isMobile ? 16 : 18} style={{ flexShrink: 0, color: moduleAccent }} />
        )}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", flex: 1 }}>
        <span style={labelStyle}>
          {locked
            ? t("nav.lockedShort")
            : type === "prev"
              ? t("nav.previous")
              : t("nav.next")}
        </span>
        <span style={titleStyle}>{locked ? t("nav.locked") : page.label}</span>
      </div>
    </button>
  );
};
