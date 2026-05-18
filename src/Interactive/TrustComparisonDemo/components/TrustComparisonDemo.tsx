import { type CSSProperties, type FC } from "react";

import { Ban, Bitcoin, CirclePlus, Landmark, ShieldCheck, ShieldOff } from "lucide-react";

import { Caption, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useLanguageContext } from "../../../I18n";
import { renderActionButton, renderFeedback } from "../helpers";
import { useTrustComparisonDemo } from "../hooks";

export const TrustComparisonDemo: FC = () => {
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];

  const {
    fiat,
    bitcoin,
    fiatCreateMoney,
    fiatCensorTx,
    bitcoinCreateMoney,
    bitcoinCensorTx,
    fiatTrustBroken,
    bitcoinAttempted,
  } = useTrustComparisonDemo();

  const danger = colors.semantic.error.text;
  const success = colors.semantic.success.text;
  const dangerBg = colors.semantic.error.background;
  const textPrimary = colors.base.text.primary;
  const textSecondary = colors.base.text.secondary;
  const borderSecondary = colors.base.border.secondary;
  const iconSize = isMobile ? 14 : 16;

  const infoBox = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.15)}`,
    fontSize: isMobile ? "0.75rem" : "0.8rem",
    lineHeight: 1.5,
    color: textPrimary,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "1.5rem" : "2rem",
        width: "100%",
        margin: isMobile ? "1.5rem 0" : "2rem 0",
      }}
    >
      <SurfaceCard
        fillColor={withOpacity(dangerBg, 0.08)}
        glowColor={fiatTrustBroken ? danger : borderSecondary}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Caption
          icon={<Landmark size={isMobile ? 16 : 18} />}
          tone="accent"
          size="md"
          color={textPrimary}
        >
          {fr ? "Monnaie Fiat" : "Fiat Currency"}
        </Caption>

        <div style={infoBox(fiatTrustBroken ? danger : textSecondary)}>
          {fiatTrustBroken ? (
            <ShieldOff size={16} color={danger} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
          ) : (
            <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
          )}
          <span>
            {fiatTrustBroken
              ? fr
                ? "La confiance peut être rompue. Et c'est exactement ce qui se passe dans le système actuel."
                : "Trust can be broken. And yet, this is exactly what happens in the current system."
              : fr
                ? "On te fait confiance pour ne cliquer sur aucun des deux boutons ci-dessous."
                : "We trust you not to click either of the two buttons below."}
          </span>
        </div>

        {renderActionButton(
          fiat.createMoney,
          danger,
          fiatCreateMoney,
          <CirclePlus size={iconSize} />,
          fr ? "Créer de la monnaie" : "Create money",
          borderSecondary,
        )}
        {renderFeedback(
          fiat.createMoney,
          fr
            ? "Monnaie créée. L'épargne de tout le monde vient d'être diluée."
            : "Money created. Everyone's savings just got diluted.",
          null,
          success,
          danger,
        )}

        {renderActionButton(
          fiat.censorTx,
          danger,
          fiatCensorTx,
          <Ban size={iconSize} />,
          fr ? "Censurer une transaction" : "Censor a transaction",
          borderSecondary,
        )}
        {renderFeedback(
          fiat.censorTx,
          fr
            ? "Transaction censurée. L'utilisateur n'a aucun recours."
            : "Transaction censored. The user has no recourse.",
          null,
          success,
          danger,
        )}
      </SurfaceCard>

      <SurfaceCard
        glowColor={bitcoinAttempted ? success : world.border.secondary}
        style={{ flex: 1, minWidth: 0 }}
      >
        <Caption
          icon={<Bitcoin size={isMobile ? 16 : 18} color={world.text.secondary} />}
          tone="accent"
          size="md"
          color={textPrimary}
        >
          Bitcoin
        </Caption>

        <div style={infoBox(bitcoinAttempted ? success : world.text.secondary)}>
          <ShieldCheck
            size={16}
            color={bitcoinAttempted ? success : world.text.secondary}
            style={{ flexShrink: 0, marginTop: "0.1rem" }}
          />
          <span>
            {bitcoinAttempted
              ? fr
                ? "Le protocole a fait son travail. Aucune confiance n'était nécessaire."
                : "The protocol did its job. No trust was needed."
              : fr
                ? "Pas besoin de te faire confiance ici. Mais tentes quand même."
                : "No need to trust you here. But try anyway."}
          </span>
        </div>

        {renderActionButton(
          bitcoin.createMoney,
          world.border.secondary,
          bitcoinCreateMoney,
          <CirclePlus size={iconSize} />,
          fr ? "Créer de la monnaie" : "Create money",
          borderSecondary,
        )}
        {renderFeedback(
          bitcoin.createMoney,
          null,
          fr
            ? "Échec. L'offre maximale de 21 millions est gravée dans le code."
            : "Failed. The maximum supply of 21 million is hard-coded.",
          success,
          danger,
        )}

        {renderActionButton(
          bitcoin.censorTx,
          world.border.secondary,
          bitcoinCensorTx,
          <Ban size={iconSize} />,
          fr ? "Censurer une transaction" : "Censor a transaction",
          borderSecondary,
        )}
        {renderFeedback(
          bitcoin.censorTx,
          null,
          fr
            ? "Échec. Le réseau est décentralisé, personne n'a ce pouvoir."
            : "Failed. The network is decentralized - no one has that power.",
          success,
          danger,
        )}
      </SurfaceCard>
    </div>
  );
};
