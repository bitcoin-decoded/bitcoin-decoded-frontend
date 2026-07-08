import { type CSSProperties, type FC } from "react";

import { Caption, ExploredCounter, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { renderActionButton, renderFeedback } from "../helpers";
import { useTrustComparisonDemo } from "../hooks";

import { Ban, Bitcoin, CirclePlus, Landmark, ShieldCheck, ShieldOff } from "@icons";

// Try at least two of the four action buttons to clear the gate.
const REQUIRED_EXPLORED = 2;

type Props = {
  /** Fired once two distinct action buttons have been tried (gates the tool block). */
  onComplete?: () => void;
};

export const TrustComparisonDemo: FC<Props> = ({ onComplete }) => {
  const typo = getTypography();
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
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
    exploredCount,
  } = useTrustComparisonDemo({ requiredExplored: gated ? REQUIRED_EXPLORED : 0, onComplete });

  const danger = colors.semantic.error.text;
  const success = colors.semantic.success.text;
  const textPrimary = colors.base.text.primary;
  const textSecondary = colors.base.text.secondary;
  const borderSecondary = colors.base.border.secondary;
  const iconSize = isMobile ? 14 : 16;

  // The two déclinaisons (Fiat vs Bitcoin) live inside ONE SurfaceCard, so the
  // comparison gets a SINGLE three-square separator bracket — not one pair per
  // column (which read as four separators). Each side is a bordered ledger panel.
  const fiatAccent = fiatTrustBroken ? danger : borderSecondary;
  const bitcoinAccent = bitcoinAttempted ? success : world.border.secondary;

  const panel = (accent: string): CSSProperties => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: isMobile ? "1rem" : "1.25rem",
    borderRadius: 0,
    border: `1px solid ${withOpacity(accent, 0.25)}`,
    background: withOpacity(accent, 0.03),
    transition: "all 0.35s var(--ease-smooth)",
  });

  const infoBox = (accent: string): CSSProperties => ({
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: 0,
    background: withOpacity(accent, 0.06),
    border: `1px solid ${withOpacity(accent, 0.15)}`,
    fontSize: typo.note.fontSize,
    lineHeight: 1.5,
    color: textPrimary,
  });

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2rem 0"} gap="1rem">
      {gated && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ExploredCounter
            explored={Math.min(exploredCount, REQUIRED_EXPLORED)}
            total={REQUIRED_EXPLORED}
            label={t("trustComparison.explored")}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1.5rem" : "2rem",
          width: "100%",
        }}
      >
        <div style={panel(fiatAccent)}>
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
                  : "Trust can be broken. And that's exactly what's happening in the current system."
                : fr
                  ? "On te fait confiance pour ne cliquer sur aucun des deux boutons ci-dessous."
                  : "We're trusting you not to click either of the buttons below."}
            </span>
          </div>

          {renderActionButton(
            fiat.createMoney,
            fiatCreateMoney,
            <CirclePlus size={iconSize} />,
            fr ? "Créer de la monnaie" : "Create money",
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
            fiatCensorTx,
            <Ban size={iconSize} />,
            fr ? "Censurer une transaction" : "Censor a transaction",
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
        </div>

        <div style={panel(bitcoinAccent)}>
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
                  ? "Le protocole a fait son travail. Pas de PDG à appeler, pas de comité à supplier, pas de ministre à convaincre. Reste à faire confiance au code lui-même, que chacun de nous peut lire."
                  : "The protocol did its job. No CEO to call, no committee to beg, no minister to convince. The only thing left to trust is the code itself, which anyone can read."
                : fr
                  ? "Pas besoin de te faire confiance ici. Mais tente quand même."
                  : "No need to trust you here. But go ahead and try."}
            </span>
          </div>

          {renderActionButton(
            bitcoin.createMoney,
            bitcoinCreateMoney,
            <CirclePlus size={iconSize} />,
            fr ? "Créer de la monnaie" : "Create money",
          )}
          {renderFeedback(
            bitcoin.createMoney,
            null,
            fr
              ? "Échec. L'offre maximale de 21 millions est gravée dans le code, et chaque nœud du réseau refuserait la transaction."
              : "Failed. The maximum supply of 21 million is hard-coded, and every node on the network would reject the transaction.",
            success,
            danger,
          )}

          {renderActionButton(
            bitcoin.censorTx,
            bitcoinCensorTx,
            <Ban size={iconSize} />,
            fr ? "Censurer une transaction" : "Censor a transaction",
          )}
          {renderFeedback(
            bitcoin.censorTx,
            null,
            fr
              ? "Échec. Aucun acteur unique n'a ce pouvoir sur le réseau lui-même."
              : "Failed. No single actor has that power over the network itself.",
            success,
            danger,
          )}
        </div>
      </div>
    </SurfaceCard>
  );
};
