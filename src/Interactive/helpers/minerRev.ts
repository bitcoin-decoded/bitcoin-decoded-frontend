import { BITCOIN_REFERENCE_VALUES } from "../data";

const SUBSIDY = BITCOIN_REFERENCE_VALUES.BLOCK_SUBSIDY_BTC;

export const minerRev = (fees: number): number => SUBSIDY + fees;
