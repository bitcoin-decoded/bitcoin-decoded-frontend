import { BASE58 } from "../data";

import { pick } from "./pick";

export const randomPrivateKey = () => `${Math.random() < 0.5 ? "K" : "L"}${pick(BASE58, 51)}`;
