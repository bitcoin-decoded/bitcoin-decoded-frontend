import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  Button,
  ExploredCounter,
  getBrandGold,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { renderActionButton, renderFeedback } from "../helpers";
import { useTrustComparisonDemo } from "../hooks";

const REQUIRED_EXPLORED = 2;

type Props = {
  onComplete?: () => void;
};

export const TrustComparisonDemo: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const gated = onComplete !== undefined;

  const {
    fiat,
    bitcoin,
    fiatCreateMoney,
    fiatCensorTx,
    bitcoinCreateMoney,
    bitcoinCensorTx,
    fiatTrustBroken,
    bitcoinAttempted,
    hasActed,
    reset,
    exploredCount,
  } = useTrustComparisonDemo({ requiredExplored: gated ? REQUIRED_EXPLORED : 0, onComplete });

  const gold = getBrandGold(theme);
  const textPrimary = colors.base.text.primary;
  const textSecondary = colors.base.text.secondary;

  // Gold is the measure of trust, so both sides are drawn in it and only its
  // strength differs: break the fiat side and its gold fades, push on the
  // Bitcoin side and its gold holds. Green and red said the opposite of what
  // happens here, since creating money out of thin air succeeds, which is the
  // bad news, and the attempt on Bitcoin fails, which is the good news.
  //
  // The strength is a number rather than a pre-dimmed colour: `withOpacity`
  // replaces an alpha instead of multiplying it, so nesting two calls silently
  // dropped the first.
  const IDLE_STRENGTH = 0.22;
  const fiatStrength = fiatTrustBroken ? 0.12 : IDLE_STRENGTH;
  const bitcoinStrength = bitcoinAttempted ? 0.5 : IDLE_STRENGTH;

  const headerStyle: CSSProperties = {
    ...typo.kicker,
    color: gold,
    textAlign: "center",
    paddingBottom: "0.7rem",
    borderBottom: `${BRAND.figures.ruleThickness}px solid ${withOpacity(gold, 0.4)}`,
  };

  const gridStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "stretch",
    gap: isMobile ? "1.25rem" : "1.75rem",
    width: "100%",
  };

  const panelStyle = (strength: number): CSSProperties => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
    padding: isMobile ? "1rem" : "1.25rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(gold, strength)}`,
    background: withOpacity(gold, strength * 0.16),
    transition: "border-color 0.4s var(--ease-smooth), background 0.4s var(--ease-smooth)",
  });

  const panelTitleStyle: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    color: textPrimary,
    textAlign: "left",
  };

  // The reading column is justified, and these short lines would open rivers
  // of white inside a narrow panel, so they opt out explicitly.
  const stateStyle = (accent: string): CSSProperties => ({
    ...typo.note,
    color: accent,
    textAlign: "left",
    minHeight: "2.6em",
  });

  const effectStyle: CSSProperties = {
    ...typo.note,
    color: textSecondary,
    textAlign: "left",
  };

  const trustLine = (broken: boolean, side: "fiat" | "bitcoin"): string => {
    if (side === "fiat") {
      return broken
        ? fr
          ? "Confiance rompue. Rien ne t'en a empêché."
          : "Trust broken. Nothing stopped you."
        : fr
          ? "Repose sur la confiance. La tienne, ici."
          : "Rests on trust. Yours, right here.";
    }
    return broken
      ? fr
        ? "Confiance intacte. Le code a refusé, pas un arbitre."
        : "Trust intact. The code refused, not a referee."
      : fr
        ? "Ne demande aucune confiance. Essaie donc."
        : "Asks for no trust. Go ahead and try.";
  };

  const panel = (side: "fiat" | "bitcoin"): ReactNode => {
    const isFiat = side === "fiat";
    const strength = isFiat ? fiatStrength : bitcoinStrength;
    const touched = isFiat ? fiatTrustBroken : bitcoinAttempted;
    const state = isFiat ? fiat : bitcoin;
    // The state line follows the panel: dimmed where trust was lost, full
    // strength where it held.
    const accent = withOpacity(gold, isFiat && touched ? 0.55 : 1);

    return (
      <div style={panelStyle(strength)}>
        <span style={panelTitleStyle}>{isFiat ? (fr ? "Monnaie fiat" : "Fiat money") : "Bitcoin"}</span>
        <span style={stateStyle(touched ? accent : textSecondary)}>
          {trustLine(touched, side)}
        </span>

        {renderActionButton(
          state.createMoney,
          isFiat ? fiatCreateMoney : bitcoinCreateMoney,
          fr ? "Créer de la monnaie" : "Create money",
          accent,
        )}
        {renderFeedback(
          state.createMoney,
          isFiat
            ? fr
              ? "Monnaie créée. L'épargne de tout le monde vient d'être diluée."
              : "Money created. Everyone's savings just got diluted."
            : fr
              ? "Refusé. Les 21 millions sont dans le code, et chaque nœud rejetterait la transaction."
              : "Refused. The 21 million cap is in the code, and every node would reject the transaction.",
          accent,
          effectStyle,
        )}

        {renderActionButton(
          state.censorTx,
          isFiat ? fiatCensorTx : bitcoinCensorTx,
          fr ? "Censurer une transaction" : "Censor a transaction",
          accent,
        )}
        {renderFeedback(
          state.censorTx,
          isFiat
            ? fr
              ? "Transaction censurée. L'utilisateur n'a aucun recours."
              : "Transaction censored. The user has no recourse."
            : fr
              ? "Refusé. Aucun acteur seul n'a ce pouvoir sur le réseau."
              : "Refused. No single actor holds that power over the network.",
          accent,
          effectStyle,
        )}
      </div>
    );
  };

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2rem 0"} gap="1.25rem">
      {gated && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ExploredCounter
            explored={Math.min(exploredCount, REQUIRED_EXPLORED)}
            total={REQUIRED_EXPLORED}
            label={t("trustComparison.explored")}
          />
        </div>
      )}

      <span style={headerStyle}>{fr ? "État de la confiance" : "State of trust"}</span>

      <div style={gridStyle}>
        {panel("fiat")}
        {panel("bitcoin")}
      </div>

      {hasActed && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" onClick={reset}>
            {fr ? "Réinitialiser" : "Reset"}
          </Button>
        </div>
      )}
    </SurfaceCard>
  );
};
