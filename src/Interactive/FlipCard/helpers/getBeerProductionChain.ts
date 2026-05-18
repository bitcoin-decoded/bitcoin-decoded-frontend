import type { Language } from "../../../I18n";
import type { FlipCardItem } from "../types";

export const getBeerProductionChain = (language: Language): FlipCardItem[] => {
  const fr = language === "fr";
  return [
    {
      emoji: "🌾",
      title: fr ? "Cultiver" : "Grow",
      questions: fr
        ? ["Sur quelle terre ?", "Quel climat ?", "Quel engrais ?", "Quelle variété de houblon ?"]
        : ["On what land?", "What climate?", "What fertilizer?", "What hop variety?"],
    },
    {
      emoji: "🏗️",
      title: fr ? "Construire" : "Build",
      questions: fr
        ? [
            "Avec quels matériaux ?",
            "Quelle taille de brasserie ?",
            "Quel emplacement ?",
            "Quel coût de construction ?",
          ]
        : [
            "With what materials?",
            "What brewery size?",
            "What location?",
            "What construction cost?",
          ],
    },
    {
      emoji: "⚙️",
      title: fr ? "Fabriquer" : "Manufacture",
      questions: fr
        ? [
            "En cuivre, acier ou inox ?",
            "Quelle capacité ?",
            "Quel fournisseur ?",
            "Quel délai de livraison ?",
          ]
        : [
            "Copper, steel, or stainless?",
            "What capacity?",
            "Which supplier?",
            "What delivery time?",
          ],
    },
    {
      emoji: "🍶",
      title: fr ? "Embouteiller" : "Bottle",
      questions: fr
        ? ["Quel type de verre ?", "Cannette ou bouteille ?", "Quel volume ?", "Quel étiquetage ?"]
        : ["What type of glass?", "Can or bottle?", "What volume?", "What labeling?"],
    },
    {
      emoji: "🚛",
      title: fr ? "Transporter" : "Transport",
      questions: fr
        ? [
            "Route, rail ou bateau ?",
            "Quelle distance ?",
            "Réfrigéré ou non ?",
            "Quel coût logistique ?",
          ]
        : [
            "Road, rail, or ship?",
            "What distance?",
            "Refrigerated or not?",
            "What logistics cost?",
          ],
    },
    {
      emoji: "🏪",
      title: fr ? "Distribuer" : "Distribute",
      questions: fr
        ? [
            "Quels magasins ?",
            "Quelle quantité ?",
            "Quel prix de vente ?",
            "Quelle marge pour le distributeur ?",
          ]
        : [
            "Which stores?",
            "What quantity?",
            "What selling price?",
            "What margin for the distributor?",
          ],
    },
  ];
};
