import type { ReactNode } from "react";

export type MonetaryItem = {
  name: string;
  profile: string;
  history: string;
  imgSrc: string;
  characteristics: {
    icon: ReactNode;
    label: string;
    score: number;
  }[];
  death: string | ReactNode;
};
