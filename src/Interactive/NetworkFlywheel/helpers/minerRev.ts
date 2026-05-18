import { getCurrentBlockSubsidyBTC } from "../../../References";

export const minerRev = (fees: number): number => getCurrentBlockSubsidyBTC() + fees;
