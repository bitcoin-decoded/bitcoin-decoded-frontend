import type { ChallengeMessage } from "../types/index.js";

import { buildSignMessage } from "./buildSignMessage.js";

import { schnorr } from "@noble/curves/secp256k1.js";
import { hexToBytes, utf8ToBytes } from "@noble/hashes/utils.js";

// The verification the server performs (CDC §6): rebuild the message from held
// values, then check the signature against it. Shared with the client so the
// octet contract cannot drift. Any malformed input is a plain false, never a
// leaked cause.
export const verifyChallenge = (
  message: ChallengeMessage,
  signatureHex: string,
  publicKeyHex: string,
): boolean => {
  try {
    return schnorr.verify(
      hexToBytes(signatureHex),
      utf8ToBytes(buildSignMessage(message)),
      hexToBytes(publicKeyHex),
    );
  } catch {
    return false;
  }
};
