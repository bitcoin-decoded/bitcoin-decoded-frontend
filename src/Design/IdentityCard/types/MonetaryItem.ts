import type { ReactNode } from "react";

export type MonetaryItem = {
  name: string;
  profile: string;
  history: string | ReactNode;
  imgSrc: string;
  characteristics: {
    icon: ReactNode;
    label: string;
    score: number;
  }[];
  death: string | ReactNode;
};
