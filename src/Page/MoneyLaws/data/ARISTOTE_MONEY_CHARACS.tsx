import type { ReactNode } from "react";

import { CloverLeafIcon } from "../../../Design/icons/CloverLeafIcon";
import { DivisionIcon } from "../../../Design/icons/DivisionIcon";
import { EqualIcon } from "../../../Design/icons/EqualIcon";
import { FeatherIcon } from "../../../Design/icons/FeatherIcon";
import { TimeIcon } from "../../../Design/icons/TimeIcon";
import type { Language } from "../../../I18n";

export type AristoteMoneyCharacs = {
  icon: ReactNode;
  title: string;
  text: string;
};

export const getAristoteMoneyCharacs = (language: Language): AristoteMoneyCharacs[] => {
  const fr = language === "fr";
  return [
    {
      icon: <TimeIcon size="2.5rem" />,
      title: fr ? "DURABILITÉ" : "DURABILITY",
      text: fr
        ? "Elle doit pouvoir se conserver, c'est-à-dire survivre physiquement à l'épreuve du temps."
        : "It must be able to endure, meaning it must physically survive the test of time.",
    },
    {
      icon: <FeatherIcon size="2.5rem" />,
      title: fr ? "PORTABILITÉ" : "PORTABILITY",
      text: fr ? "Elle doit être facile à déplacer." : "It must be easy to carry.",
    },
    {
      icon: <DivisionIcon size="2.5rem" />,
      title: fr ? "DIVISIBILITÉ" : "DIVISIBILITY",
      text: fr
        ? "Elle doit être facilement fractionnable, afin de permettre des petits achats (un café) comme des gros (une maison)."
        : "It must be easily divisible, allowing both small purchases (a coffee) and large ones (a house).",
    },
    {
      icon: <EqualIcon size="2.5rem" />,
      title: fr ? "FONGIBILITÉ" : "FUNGIBILITY",
      text: fr
        ? "Chaque unité doit être identique (1€ = 1€). Pas de discrimination."
        : "Each unit must be identical (1€ = 1€). No discrimination.",
    },
    {
      icon: <CloverLeafIcon size="2.5rem" />,
      title: fr ? "DURETÉ" : "HARDNESS",
      text: fr
        ? "Comme vu précédemment, elle doit être difficile à produire."
        : "As previously discussed, it must be difficult to produce.",
    },
  ];
};
