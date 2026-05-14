import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  Ban,
  Bitcoin,
  CircleCheck,
  CirclePlus,
  CircleX,
  Landmark,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";

import {
  Button,
  Caption,
  FeedbackPanel,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../Design";
import { useLanguageContext } from "../../I18n";
import { useTrustComparison } from "../hooks";

type ActionState = "idle" | "success" | "failure";

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
  } = useTrustComparison();

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

  const renderFeedback = (state: ActionState, successMsg: ReactNode, failureMsg: ReactNode) => {
    if (state === "idle") return null;
    const isSuccess = state === "success";
    // Inverted mapping: in this demo "success" of a bad action shows in error
    // tone (it actually happened - fiat dilution / censorship), and "failure"
    // of a bad action shows in success tone (Bitcoin protocol prevented it).
    return (
      <FeedbackPanel
        tone={isSuccess ? "error" : "success"}
        icon={
          isSuccess ? (
            <CircleCheck size={18} strokeWidth={2} color={danger} />
          ) : (
            <CircleX size={18} strokeWidth={2} color={success} />
          )
        }
      >
        {isSuccess ? successMsg : failureMsg}
      </FeedbackPanel>
    );
  };

  const renderActionButton = (
    state: ActionState,
    accentColor: string,
    onClick: () => void,
    icon: ReactNode,
    label: string,
  ) => (
    <Button
      variant={state === "idle" ? "primary" : "secondary"}
      color={state === "idle" ? accentColor : borderSecondary}
      icon={icon}
      onClick={state === "idle" ? onClick : undefined}
      disabled={state !== "idle"}
      fullWidth
    >
      {label}
    </Button>
  );

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
        )}
        {renderFeedback(
          fiat.createMoney,
          fr
            ? "Monnaie créée. L'épargne de tout le monde vient d'être diluée."
            : "Money created. Everyone's savings just got diluted.",
          null,
        )}

        {renderActionButton(
          fiat.censorTx,
          danger,
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
        )}
        {renderFeedback(
          bitcoin.createMoney,
          null,
          fr
            ? "Échec. L'offre maximale de 21 millions est gravée dans le code."
            : "Failed. The maximum supply of 21 million is hard-coded.",
        )}

        {renderActionButton(
          bitcoin.censorTx,
          world.border.secondary,
          bitcoinCensorTx,
          <Ban size={iconSize} />,
          fr ? "Censurer une transaction" : "Censor a transaction",
        )}
        {renderFeedback(
          bitcoin.censorTx,
          null,
          fr
            ? "Échec. Le réseau est décentralisé, personne n'a ce pouvoir."
            : "Failed. The network is decentralized - no one has that power.",
        )}
      </SurfaceCard>
    </div>
  );
};
