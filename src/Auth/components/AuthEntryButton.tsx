import { type CSSProperties, type FC, useState } from "react";

import { BRAND, THEME_COLORS, useThemeContext } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuth, useAuthFlow } from "../hooks";

import { DoodleFaceMale } from "@doodle";

// The header entry point to the account (CDC §7). Signed in, it is a quiet chip
// showing the pseudo (settings land in Phase 4d-3); otherwise it opens the flow —
// the landing for a guest, the unlock screen for a locked device.
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

  if (status === "authenticated") {
    return (
      <span style={{ ...base, color: colors.base.text.secondary }}>
        <DoodleFaceMale size={18} />
        <span style={{ maxWidth: "9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {username}
        </span>
      </span>
    );
  }

  const lit = hovered;
  return (
    <button
      onClick={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={t("auth.landing.title")}
      style={{
        ...base,
        cursor: "pointer",
        background: lit ? colors.base.background.hover : "transparent",
        color: lit ? colors.base.text.primary : colors.base.text.secondary,
        transition: "background-color 0.2s, color 0.2s",
      }}
    >
      <DoodleFaceMale size={18} />
    </button>
  );
};
