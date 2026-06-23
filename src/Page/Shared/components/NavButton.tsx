import { type CSSProperties, type FC, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { BRAND, getBrandGold, useBreakpoint, usePageTheme, useThemeContext } from "../../../Design";
import { withOpacity } from "../../../Design/helpers";
import { useTranslation } from "../../../I18n";
import { type RouteName, useRouterContext } from "../../../Routing/";

type Props = {
  page: { id: RouteName; label: string };
  type: "prev" | "next";
};

/**
 * One chapter-level nav button, ledger register: a sharp hairline frame (no
 * gradient-border, no rounded card, no circle icon), a mono small-caps kicker
 * label, the destination title in Patrick Hand, a chevron in the module color.
 * The frame + label brighten to the module accent on hover.
 */
export const NavButton: FC<Props> = ({ page, type }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const isMobile = useBreakpoint() === "mobile";
  const { t } = useTranslation();
  const { setCurrentPage } = useRouterContext();
  const [hovered, setHovered] = useState(false);

  const gold = getBrandGold(theme);
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;
  const align = type === "prev" ? "left" : "right";
  const Icon = type === "prev" ? ChevronLeft : ChevronRight;

  const btnStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    flexDirection: align === "left" ? "row" : "row-reverse",
    flex: 1,
    padding: isMobile ? "0.85rem 1rem" : "0.95rem 1.15rem",
    border: `1px solid ${hovered ? withOpacity(moduleAccent, 0.6) : withOpacity(colors.base.text.primary, 0.14)}`,
    background: "transparent",
    cursor: "pointer",
    transition: "border-color 0.25s var(--ease-smooth)",
    textAlign: align,
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "0.62rem" : "0.66rem",
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.1em",
    color: hovered ? moduleAccent : colors.base.text.secondary,
    transition: "color 0.25s var(--ease-smooth)",
  };

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: isMobile ? "0.95rem" : "1.05rem",
    color: colors.base.text.primary,
    lineHeight: 1.25,
  };

  return (
    <button
      style={btnStyle}
      onClick={() => setCurrentPage(page.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={isMobile ? 17 : 19} strokeWidth={2} style={{ flexShrink: 0, color: moduleAccent }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", flex: 1 }}>
        <span style={labelStyle}>{type === "prev" ? t("nav.previous") : t("nav.next")}</span>
        <span style={titleStyle}>{page.label}</span>
      </div>
    </button>
  );
};
