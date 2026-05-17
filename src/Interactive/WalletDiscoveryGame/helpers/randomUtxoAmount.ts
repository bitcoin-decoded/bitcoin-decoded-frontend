import { round2 } from "./round2";

export const randomUtxoAmount = () => round2(0.05 + Math.random() * 0.5);
