import { round1 } from "./round1";

export const randomUtxoAmount = () => round1(0.1 + Math.random() * 0.4);
