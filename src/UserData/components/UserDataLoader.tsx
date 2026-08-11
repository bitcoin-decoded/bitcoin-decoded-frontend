import { type CSSProperties, type FC } from "react";

import { BitcoinDecodedLoader, BRAND, useBreakpoint, usePageTheme } from "../../Design";
import { useTranslation } from "../../I18n";

// The global init screen. Its reveal is delayed in CSS (`userDataLoaderReveal`),
// so a load that resolves in a frame, as localStorage always does, never flashes
// it: the reader just sees the app. The brand wordmark is the loader — its gold
// block slides along the rule — with a larger, clearly visible label beneath.
export const UserDataLoader: FC = () => {
  const { colors } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const { t } = useTranslation();

  const wrapStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.6rem",
    animation: "userDataLoaderReveal 0.4s var(--ease-smooth) 0.18s both",
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: isMobile ? "1rem" : "1.1rem",
    fontVariant: "small-caps",
    letterSpacing: "0.14em",
    color: colors.base.text.secondary,
  };

  return (
    <div style={wrapStyle} role="status" aria-live="polite">
      <BitcoinDecodedLoader width={isMobile ? 170 : 210} />
      <span style={labelStyle}>{t("userData.loading")}</span>
    </div>
  );
};
