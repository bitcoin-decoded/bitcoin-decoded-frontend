import { BECH32 } from "../data";

import { pick } from "./pick";

export const randomAddress = () => `bc1q${pick(BECH32, 38)}`;
