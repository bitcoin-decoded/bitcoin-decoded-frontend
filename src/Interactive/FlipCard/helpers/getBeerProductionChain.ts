import type { Language } from "../../../I18n";
import type { FlipCardItem } from "../types";

export const getBeerProductionChain = (language: Language): FlipCardItem[] => {
  const fr = language === "fr";
  return [
    {
      emoji: "🌾",
      title: fr ? "Cultiver" : "Grow",
      questions: fr
        ? ["Sur quelle terre ?", "Quel climat ?", "Quelle variété de houblon ?"]
        : ["On what land?", "What climate?", "What hop variety?"],
    },
    {
      emoji: "🏗️",
      title: fr ? "Construire" : "Build",
      questions: fr
        ? ["Avec quels matériaux ?", "Quelle taille de brasserie ?", "Quel emplacement ?"]
        : ["With what materials?", "What brewery size?", "What location?"],
    },
    {
      emoji: "⚙️",
      title: fr ? "Fabriquer" : "Manufacture",
      questions: fr
        ? ["En cuivre, acier ou inox ?", "Quelle capacité ?", "Quel fournisseur ?"]
        : ["Copper, steel, or stainless?", "What capacity?", "Which supplier?"],
    },
    {
      emoji: "🍶",
      title: fr ? "Embouteiller" : "Bottle",
      questions: fr
        ? ["Quel type de verre ?", "Cannette ou bouteille ?", "Quel étiquetage ?"]
        : ["What type of glass?", "Can or bottle?", "What labeling?"],
    },
    {
      emoji: "🚛",
      title: fr ? "Transporter" : "Transport",
      questions: fr
        ? ["Route, rail ou bateau ?", "Quelle distance ?", "Réfrigéré ou non ?"]
        : ["Road, rail, or ship?", "What distance?", "Refrigerated or not?"],
    },
    {
      emoji: "🏪",
      title: fr ? "Distribuer" : "Distribute",
      questions: fr
        ? ["Quels magasins ?", "Quel prix de vente ?", "Quelle marge pour le distributeur ?"]
        : ["Which stores?", "What selling price?", "What margin for the distributor?"],
    },
  ];
};
