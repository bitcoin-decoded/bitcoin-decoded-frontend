import { CloverLeafIcon, DivisionIcon, EqualIcon, FeatherIcon, TimeIcon } from "../../../Design";
import type { Language } from "../../../I18n";
import type { MonetaryPillar } from "../types";

export const getMonetaryPillars = (language: Language): MonetaryPillar[] => {
  const fr = language === "fr";
  return [
    {
      key: "durability",
      icon: TimeIcon,
      title: fr ? "Durabilité" : "Durability",
      description: fr
        ? "Elle doit pouvoir se conserver, c'est-à-dire survivre physiquement à l'épreuve du temps."
        : "It must be able to endure, meaning it must physically survive the test of time.",
    },
    {
      key: "portability",
      icon: FeatherIcon,
      title: fr ? "Portabilité" : "Portability",
      description: fr ? "Elle doit être facile à déplacer." : "It must be easy to carry.",
    },
    {
      key: "divisibility",
      icon: DivisionIcon,
      title: fr ? "Divisibilité" : "Divisibility",
      description: fr
        ? "Elle doit être facilement fractionnable, afin de permettre des petits achats (un café) comme des gros (une maison)."
        : "It must be easily divisible, allowing both small purchases (a coffee) and large ones (a house).",
    },
    {
      key: "fungibility",
      icon: EqualIcon,
      title: fr ? "Fongibilité" : "Fungibility",
      description: fr
        ? "Chaque unité doit être identique (1€ = 1€). Pas de discrimination."
        : "Each unit must be identical (1$ = 1$). No discrimination.",
    },
    {
      key: "hardness",
      icon: CloverLeafIcon,
      title: fr ? "Dureté" : "Hardness",
      description: fr
        ? "Comme vu précédemment, elle doit être difficile à produire. C'est la propriété qui détermine si une monnaie peut tenir sur la durée — sans elle, les quatre autres ne suffisent pas."
        : "As previously discussed, it must be difficult to produce. It's the property that decides whether a currency can last through time — without it, the four others aren't enough.",
      isKeystone: true,
    },
  ];
};
