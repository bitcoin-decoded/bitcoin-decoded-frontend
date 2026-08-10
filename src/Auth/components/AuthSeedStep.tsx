import { type CSSProperties, type FC } from "react";

import { BRAND, Button, FeedbackPanel, useBreakpoint, usePageTheme, withOpacity } from "../../Design";
import { useTranslation } from "../../I18n";
import { useAuthFlow } from "../hooks";

import { AuthScreen } from "./AuthScreen";

import { AlertTriangle, Copy } from "@icons";

// CDC §7.1 écran 3 / §14.3: show the 12 words, warn how to keep them, and lock the
// next step behind an explicit acknowledgement. A failed confirmation (écran 4)
// comes back here with the notice, the checkbox reset.
export const AuthSeedStep: FC = () => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { mnemonic, copySeed, seedAcknowledged, setSeedAcknowledged, goToConfirm, confirmError } =
    useAuthFlow();

  const words = mnemonic ? mnemonic.split(" ") : [];

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
    gap: "0.5rem",
    padding: "0.85rem",
    border: `1px solid ${colors.base.border.secondary}`,
    background: withOpacity(colors.base.background.primary, 0.5),
  };

  const cellStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.5rem",
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.9rem",
  };

  return (
    <AuthScreen title={t("auth.seed.display.title")} lead={t("auth.seed.display.body")}>
      {confirmError && <FeedbackPanel tone="error">{t("auth.seed.confirm.error")}</FeedbackPanel>}

      <div style={gridStyle}>
        {words.map((word, index) => (
          <div key={index} style={cellStyle}>
            <span style={{ color: colors.base.text.secondary, minWidth: "1.25rem", textAlign: "right" }}>
              {index + 1}
            </span>
            <span style={{ color: colors.base.text.primary }}>{word}</span>
          </div>
        ))}
      </div>

      <div>
        <Button variant="ghost" size="sm" icon={<Copy size={15} />} onClick={copySeed}>
          {t("auth.seed.display.copy")}
        </Button>
      </div>

      <FeedbackPanel tone="warning" icon={<AlertTriangle size={16} />}>
        {t("auth.seed.display.warning")}
      </FeedbackPanel>

      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={seedAcknowledged}
          onChange={(event) => setSeedAcknowledged(event.target.checked)}
          style={{ marginTop: "0.15rem", accentColor: colors.semantic.success.text, width: "1rem", height: "1rem" }}
        />
        <span style={{ fontFamily: BRAND.fonts.body, fontSize: "0.9rem", color: colors.base.text.primary }}>
          {t("auth.seed.display.checkbox")}
        </span>
      </label>

      <Button variant="primary" fullWidth disabled={!seedAcknowledged} onClick={goToConfirm}>
        {t("auth.seed.display.button")}
      </Button>
    </AuthScreen>
  );
};
