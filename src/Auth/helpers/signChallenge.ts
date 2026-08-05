import type { ChallengeMessage } from "../types";

import { buildSignMessage } from "./buildSignMessage";

import { schnorr } from "@noble/curves/secp256k1.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";

// Schnorr BIP340 signature (64 bytes, lowercase hex) over the reconstructed
// message.
export const signChallenge = (message: ChallengeMessage, privateKey: Uint8Array): string =>
  bytesToHex(schnorr.sign(utf8ToBytes(buildSignMessage(message)), privateKey));
