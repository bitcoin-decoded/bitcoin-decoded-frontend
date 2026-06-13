import type { ReactNode } from "react";

import type { Language } from "../../../I18n";

export type ProductionStep = {
  id: string;
  image: ReactNode;
  title: string;
  text: string;
};

/** The sandwich production chain, language-aware (mirrors getBeerProductionChain). */
export const getSandwichChain = (language: Language): ProductionStep[] => {
  const fr = language === "fr";
  return [
    {
      id: "1",
      image: <div style={{ fontSize: "1.5rem" }}>🥪</div>,
      title: fr ? "Sandwich" : "Sandwich",
      text: fr ? "Notre bien de consommation final" : "Our final consumer good",
    },
    {
      id: "2",
      image: <div style={{ fontSize: "1.5rem" }}>🔥🎛️🔥</div>,
      title: fr ? "Four" : "Oven",
      text: fr
        ? "Pour produire le pain du sandwich, il faut un four"
        : "To make the sandwich's bread, you need an oven",
    },
    {
      id: "3",
      image: <div style={{ fontSize: "1.5rem" }}>⛰️</div>,
      title: fr ? "Carrière" : "Quarry",
      text: fr
        ? "Pour construire un four, il faut des pierres"
        : "To build an oven, you need stones",
    },
    {
      id: "4",
      image: <div style={{ fontSize: "1.5rem" }}>🏗️⛏️</div>,
      title: fr ? "Extraction" : "Extraction",
      text: fr
        ? "Pour extraire ces pierres, il faut des machines"
        : "To extract those stones, you need machines",
    },
    {
      id: "5",
      image: <div style={{ fontSize: "1.5rem" }}>🏭</div>,
      title: fr ? "Usine" : "Factory",
      text: fr
        ? "Pour produire ces machines, il faut des usines"
        : "To produce those machines, you need factories",
    },
    {
      id: "6",
      image: <div style={{ fontSize: "1.5rem" }}>🌾</div>,
      title: fr ? "Blé" : "Wheat",
      text: fr
        ? "Pour produire du pain, il faut également du blé"
        : "To make bread, you also need wheat",
    },
    {
      id: "7",
      image: <div style={{ fontSize: "1.5rem" }}>🚜</div>,
      title: fr ? "Tracteur" : "Tractor",
      text: fr ? "Pour semer le blé, il faut des tracteurs" : "To sow the wheat, you need tractors",
    },
  ];
};
