import { type CSSProperties, type FC, useState } from "react";

import { BRAND, getBrandGold, THEME_COLORS, useThemeContext } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuth, useAuthFlow } from "../hooks";

import { User } from "@icons";

// The header entry point to the account (CDC §7). Signed in, it is a quiet chip
// showing the pseudo that opens the settings panel (§7.11); otherwise it opens the
// flow — the landing for a guest, the unlock screen for a locked device.
export const AuthEntryButton: FC = () => {
  const { t } = useTranslation();
  const { theme } = useThemeContext();
  const { status, username } = useAuth();
  const { open } = useAuthFlow();
  const [hovered, setHovered] = useState(false);
  const colors = THEME_COLORS[theme];

  const base: CSSProperties = {
    height: "2rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0 0.6rem",
    border: `1px solid ${colors.base.border.primary}`,
    borderRadius: "0.5rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.75rem",
    letterSpacing: "0.02em",
  };

  const lit = hovered;
  const interactiveStyle: CSSProperties = {
    ...base,
    cursor: "pointer",
    background: lit ? colors.base.background.hover : "transparent",
    color: lit ? colors.base.text.primary : colors.base.text.secondary,
    transition: "background-color 0.2s, color 0.2s",
  };

  if (status === "authenticated") {
    return (
      <button
        onClick={open}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={t("auth.settings.sectionTitle")}
        style={interactiveStyle}
      >
        <User size={16} strokeWidth={2} />
        <span
          style={{
            maxWidth: "9rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: getBrandGold(theme),
            fontWeight: 500,
          }}
        >
          {username}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={t("auth.landing.title")}
      style={interactiveStyle}
    >
      <User size={16} strokeWidth={2} />
    </button>
  );
};
