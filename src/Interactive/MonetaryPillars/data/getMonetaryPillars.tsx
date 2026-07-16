import type { Language } from "../../../I18n";
import type { MonetaryPillar } from "../types";

import {
  DoodleCouponCut,
  DoodleEquals,
  DoodleGoldBars,
  DoodleHourglass,
  DoodlePaperPlane,
} from "@doodle";

export const getMonetaryPillars = (language: Language): MonetaryPillar[] => {
  const fr = language === "fr";
  return [
    {
      key: "durability",
      icon: DoodleHourglass,
      title: fr ? "Durabilité" : "Durability",
      description: fr
        ? "Elle doit pouvoir se conserver, c'est-à-dire survivre physiquement à l'épreuve du temps."
        : "It must be able to endure, meaning it must physically survive the test of time.",
    },
    {
      key: "portability",
      icon: DoodlePaperPlane,
      title: fr ? "Portabilité" : "Portability",
      description: fr ? "Elle doit être facile à déplacer." : "It must be easy to carry.",
    },
    {
      key: "divisibility",
      icon: DoodleCouponCut,
      title: fr ? "Divisibilité" : "Divisibility",
      description: fr
        ? "Elle doit être facilement fractionnable, afin de permettre des petits achats (un café) comme des gros (une maison)."
        : "It must be easily divisible, allowing both small purchases (a coffee) and large ones (a house).",
    },
    {
      key: "fungibility",
      icon: DoodleEquals,
      title: fr ? "Fongibilité" : "Fungibility",
      description: fr
        ? "Chaque unité doit être identique (1€ = 1€). Pas de discrimination."
        : "Each unit must be identical (1$ = 1$). No discrimination.",
    },
    {
      key: "hardness",
      icon: DoodleGoldBars,
      title: fr ? "Dureté" : "Hardness",
      description: fr
        ? "Comme vu plus haut, c'est la résistance à la création de nouvelles unités. C'est un peu le patron. Tu vas le voir à l'œuvre dans la galerie juste en dessous."
        : "As mentioned just above, it's the resistance to the creation of new units. The boss, basically. You'll see it in action in the gallery just below.",
      isKeystone: true,
    },
  ];
};
