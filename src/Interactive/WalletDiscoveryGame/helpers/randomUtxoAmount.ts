import { round1 } from "./round1";

// One decimal place keeps the mental sum easy (e.g. 0.2 + 0.3 + 0.4). Range
// [0.1, 0.5] so every UTXO is non-zero and amounts stay round.
export const randomUtxoAmount = () => round1(0.1 + Math.random() * 0.4);
