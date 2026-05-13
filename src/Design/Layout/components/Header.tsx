import { type CSSProperties, type FC, useState } from "react";

import { LanguageToggle, useTranslation } from "../../../I18n";
import { ROUTE_NAME, useRouterContext } from "../../../Routing";
import type { Breakpoint } from "../../Responsive";
import { THEME_COLORS, ThemeToggle, useThemeContext } from "../../Theme";

import { HamburgerButton } from "./HamburgerButton";
import { useHeaderHidden } from "../hooks";

// Brand "live indicator" red - distinct from the Bitcoin orange used
// elsewhere on the page so the wordmark in the navbar reads as a
// status/identity beacon, not as a content accent.
const DOT_RED = "#ef4444";

type Props = {
  showHamburger?: boolean;
  isDrawerOpen?: boolean;
  onToggleDrawer?: () => void;
  breakpoint?: Breakpoint;
};

export const Header: FC<Props> = ({
  showHamburger = false,
  isDrawerOpen = false,
  onToggleDrawer,
  breakpoint = "desktop",
}) => {
  const { setCurrentPage } = useRouterContext();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const colors = THEME_COLORS[theme];

  const isMobile = breakpoint === "mobile";

  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);

  // Hide-on-scroll-down / reveal-on-scroll-up — single source of truth
  // shared with the sidebar in MainLayout (see useHeaderHidden).
  // When the drawer is open we FORCE the header visible so the user
  // can always reach the close (X) button — the alternative (header
  // hidden + drawer open) would trap the user.
  const isHidden = useHeaderHidden();
  const effectivelyHidden = isHidden && !isDrawerOpen;

  // Header background mirrors the Footer's tonal+halo treatment, but
  // INVERTED top/bottom so the header reads as a warm horizon at the very
  // top of the viewport that fades into the navbar/body color at its
  // bottom edge. Halo glows DOWN from above the top edge.
  const haloOpacity = theme === "dark" ? 0.16 : 0.08;
  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "0 1rem" : "0 2.5rem",
    background: `
      radial-gradient(ellipse 70% 110% at 50% -15%, rgba(247, 147, 26, ${haloOpacity}) 0%, transparent 60%),
      linear-gradient(to bottom,
        ${colors.amber.background.primary} 0%,
        ${colors.base.background.tertiary} 45%,
        ${colors.base.background.primary} 100%)
    `,
    borderBottom: `1px solid ${colors.base.border.primary}`,
    height: "3.5rem",
    width: "100%",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 101,
    gap: "0.75rem",
    transform: effectivelyHidden ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)",
    willChange: "transform",
  };

  // Left: simple "Bitcoin.Decoded" wordmark (no icon) - the dot between
  // the two words turns red as a small live-indicator beacon, distinct
  // from the orange used in content. We dropped the avatar here to
  // avoid duplicating the brand mark already shown in the Hero.
  const wordmarkButtonStyle: CSSProperties = {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 500,
    fontSize: isMobile ? "0.875rem" : "0.95rem",
    letterSpacing: "0.04em",
    color: isWordmarkHovered ? colors.base.text.primary : colors.base.text.secondary,
    transition: "color 0.25s cubic-bezier(0.165, 0.84, 0.44, 1)",
    display: "inline-flex",
    alignItems: "center",
  };

  const wordmarkDotStyle: CSSProperties = {
    color: DOT_RED,
    margin: "0 0.05em",
    // Subtle scale-up on hover - the dot reads more like a beacon coming
    // online rather than a static glyph.
    transform: isWordmarkHovered ? "scale(1.25)" : "scale(1)",
    display: "inline-block",
    transition: "transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1)",
  };

  // Right group: Language → Theme → Menu (hamburger), all aligned at 2rem
  // height with consistent border + hover treatment.
  const rightGroupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  return (
    <header style={headerStyle}>
      <button
        style={wordmarkButtonStyle}
        onClick={() => setCurrentPage(ROUTE_NAME.HomePage)}
        onMouseEnter={() => setIsWordmarkHovered(true)}
        onMouseLeave={() => setIsWordmarkHovered(false)}
        aria-label={t("header.homeAriaLabel")}
      >
        Bitcoin<span style={wordmarkDotStyle}>.</span>Decoded
      </button>

      <div style={rightGroupStyle}>
        <LanguageToggle />
        <ThemeToggle />
        {showHamburger && onToggleDrawer && (
          <HamburgerButton isOpen={isDrawerOpen} onToggle={onToggleDrawer} />
        )}
      </div>
    </header>
  );
};
