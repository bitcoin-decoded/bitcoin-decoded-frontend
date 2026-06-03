import type { Language } from "../../../I18n";
import type { DunbarTierKey } from "../types";

/**
 * Localized short label + one-line state phrase for each tier. Kept as a
 * language-aware data getter (not global t() keys) since it is a small,
 * feature-local dataset, mirroring getMonetaryPillars / getAccountingTerms.
 */
export const getDunbarTierText = (
  language: Language,
): Record<DunbarTierKey, { label: string; statePhrase: string }> => {
  const fr = language === "fr";
  return {
    family: {
      label: fr ? "Famille" : "Family",
      statePhrase: fr
        ? "Tout le monde se connaît. La confiance suffit, aucun registre nécessaire."
        : "Everyone knows everyone. Trust is enough, no ledger needed.",
    },
    clan: {
      label: fr ? "Clan" : "Clan",
      statePhrase: fr
        ? "Ça reste gérable. Tu te souviens encore de qui doit quoi à qui."
        : "Still manageable. You can still remember who owes what to whom.",
    },
    village: {
      label: fr ? "Village (seuil de Dunbar)" : "Village (Dunbar's threshold)",
      statePhrase: fr
        ? "Le plafond cognitif. Pile à la limite : au-delà, ta mémoire lâche."
        : "The cognitive ceiling. Right at the edge: beyond this, your memory gives out.",
    },
    town: {
      label: fr ? "Ville" : "Town",
      statePhrase: fr
        ? "Trop d'inconnus. La confiance directe ne tient plus, il faut un système externe."
        : "Too many strangers. Direct trust no longer holds, you need an external system.",
    },
    society: {
      label: fr ? "Société moderne" : "Modern society",
      statePhrase: fr
        ? "Tout retenir de tête est absurde. Sans monnaie, l'échange s'effondre."
        : "Tracking it all by memory is absurd. Without money, exchange collapses.",
    },
  };
};
