import { HEX } from "../data";

import { pick } from "./pick";

export const randomPublicKey = () => `${Math.random() < 0.5 ? "02" : "03"}${pick(HEX, 64)}`;
