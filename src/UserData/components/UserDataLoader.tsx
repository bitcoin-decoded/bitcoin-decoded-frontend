import { type CSSProperties, type FC } from "react";

import {
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../Design";
import { useTranslation } from "../../I18n";

// The global init screen. Its reveal is delayed in CSS (`userDataLoaderReveal`),
// so a load that resolves in a frame, as localStorage always does, never flashes
// the spinner: the reader just sees the app.
export const UserDataLoader: FC = () => {
  const { colors, theme } = usePageTheme();
  const typo = getTypography(useBreakpoint());
  const { t } = useTranslation();
  const gold = getBrandGold(theme);

  const wrapStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.1rem",
    animation: "userDataLoaderReveal 0.4s var(--ease-smooth) 0.18s both",
  };

  const ringStyle: CSSProperties = {
    width: "2.25rem",
    height: "2.25rem",
    borderRadius: "50%",
    border: `2px solid ${withOpacity(gold, 0.18)}`,
    borderTopColor: gold,
    animation: "userDataSpin 0.9s linear infinite",
  };

  const labelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: colors.base.text.secondary,
  };

  return (
    <div style={wrapStyle} role="status" aria-live="polite">
      <span style={ringStyle} aria-hidden="true" />
      <span style={labelStyle}>{t("userData.loading")}</span>
    </div>
  );
};
