import type { ReactNode } from "react";

export type ProductionStep = {
  id: string;
  image: ReactNode;
  title: string;
  text: string;
};

export const SANDWICH_CHAIN: ProductionStep[] = [
  {
    id: "1",
    image: <div style={{ fontSize: "2.5rem" }}>🥪</div>,
    title: "Sandwich",
    text: "Notre bien de consommation final",
  },
  {
    id: "2",
    image: <div style={{ fontSize: "2.5rem" }}>🔥🎛️🔥</div>,
    title: "Four",
    text: "Pour produire le pain, il faut un four",
  },
  {
    id: "3",
    image: <div style={{ fontSize: "2.5rem" }}>⛰️</div>,
    title: "Carrière",
    text: "Pour construire un four, il faut des pierres",
  },
  {
    id: "4",
    image: <div style={{ fontSize: "2.5rem" }}>🏗️⛏️</div>,
    title: "Extraction",
    text: "Pour extraire ces pierres, il faut des machines",
  },
  {
    id: "5",
    image: <div style={{ fontSize: "2.5rem" }}>🏭</div>,
    title: "Usine",
    text: "Pour produire ces machines, il faut des usines",
  },
  {
    id: "6",
    image: <div style={{ fontSize: "2.5rem" }}>🌾</div>,
    title: "Blé",
    text: "Pour produire du pain, il faut également du blé",
  },
  {
    id: "7",
    image: <div style={{ fontSize: "2.5rem" }}>🚜</div>,
    title: "Tracteur",
    text: "Pour semer le blé, il faut des tracteurs",
  },
];
