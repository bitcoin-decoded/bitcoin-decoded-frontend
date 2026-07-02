import { type CSSProperties, type FC, type ReactNode } from "react";

import { LanguageToggle, useTranslation } from "../../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";
import type { Breakpoint } from "../../Responsive";
import { BRAND, getBrandGold, THEME_COLORS, ThemeToggle, useThemeContext } from "../../Theme";
import { useHeader, useHeaderHidden } from "../hooks";

import { HamburgerButton } from "./HamburgerButton";

type Props = {
  showHamburger?: boolean;
  isDrawerOpen?: boolean;
  onToggleDrawer?: () => void;
  breakpoint?: Breakpoint;
  rightSlot?: ReactNode;
};

export const Header: FC<Props> = ({
  showHamburger = false,
  isDrawerOpen = false,
  onToggleDrawer,
  breakpoint = "desktop",
  rightSlot,
}) => {
  const { setCurrentPage } = useRouterContext();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];
  const gold = getBrandGold(theme);

  const isMobile = breakpoint === "mobile";

  const { isWordmarkHovered, setIsWordmarkHovered } = useHeader();

  const isHidden = useHeaderHidden();
  const effectivelyHidden = isHidden && !isDrawerOpen;

  const headerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    background: colors.base.background.primary,
    width: "100%",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 101,
    transform: effectivelyHidden ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.3s var(--ease-smooth)",
    willChange: "transform",
  };

  const topRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "0 1rem" : "0 2.5rem",
    height: "3.5rem",
    gap: "0.75rem",
  };

  const wordmarkButtonStyle: CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: isMobile ? "0.4rem" : "0.5rem",
    color: isWordmarkHovered ? colors.base.text.primary : colors.base.text.secondary,
    transition: "color 0.25s var(--ease-smooth)",
  };

  const wordmarkTextBitcoinStyle: CSSProperties = {
    fontFamily: BRAND.fonts.wordmark,
    fontWeight: 500,
    fontSize: isMobile ? "1.05rem" : "1.2rem",
    letterSpacing: "0.04em",
    lineHeight: 1,
  };

  const wordmarkTextDecodedStyle: CSSProperties = {
    fontFamily: BRAND.fonts.wordmark,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: isMobile ? "1.05rem" : "1.2rem",
    letterSpacing: "0.04em",
    lineHeight: 1,
  };

  const wordmarkBlockStyle: CSSProperties = {
    width: isMobile ? 10 : BRAND.figures.blockSize - 2,
    height: isMobile ? 10 : BRAND.figures.blockSize - 2,
    background: gold,
    transform: isWordmarkHovered ? "scale(1.15)" : "scale(1)",
    transition: "transform 0.25s var(--ease-smooth)",
    flexShrink: 0,
  };

  const ruleLineStyle: CSSProperties = {
    height: BRAND.figures.ruleThickness,
    background: gold,
    width: "100%",
  };

  const rightGroupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  return (
    <header style={headerStyle}>
      <div style={topRowStyle}>
        <button
          style={wordmarkButtonStyle}
          onClick={() => setCurrentPage(ROUTE_NAME.HomePage)}
          onMouseEnter={() => setIsWordmarkHovered(true)}
          onMouseLeave={() => setIsWordmarkHovered(false)}
          aria-label={t("header.homeAriaLabel")}
        >
          <span style={wordmarkTextBitcoinStyle}>Bitcoin</span>
          <span style={wordmarkBlockStyle} aria-hidden="true" />
          <span style={wordmarkTextDecodedStyle}>Decoded</span>
        </button>

        <div style={rightGroupStyle}>
          {rightSlot}
          <LanguageToggle />
          <ThemeToggle />
          {showHamburger && onToggleDrawer && (
            <HamburgerButton isOpen={isDrawerOpen} onToggle={onToggleDrawer} />
          )}
        </div>
      </div>

      <div style={ruleLineStyle} aria-hidden="true" />
    </header>
  );
};
