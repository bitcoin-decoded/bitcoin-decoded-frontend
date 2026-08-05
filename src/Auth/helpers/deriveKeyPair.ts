import { AUTH_DERIVATION } from "../data";
import type { KeyPair } from "../types";

import { schnorr } from "@noble/curves/secp256k1.js";
import { hkdf } from "@noble/hashes/hkdf.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";
import { mnemonicToSeedSync } from "@scure/bip39";

// secp256k1 group order n (fixed curve constant, SEC 2 §2.4.1). A derived scalar
// that is 0 or >= n is rejected and derivation retried with a bumped info tag.
const CURVE_ORDER = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;

// Domain-separated derivation (CDC §4.2), not BIP32: a Bitcoin.Decoded key can
// never collide with a real Bitcoin wallet key.
export const deriveKeyPair = (mnemonic: string): KeyPair => {
  const ikm = mnemonicToSeedSync(mnemonic);
  const salt = utf8ToBytes(AUTH_DERIVATION.salt);

  for (let attempt = 0; attempt < 100; attempt++) {
    const tag = attempt === 0 ? AUTH_DERIVATION.info : `${AUTH_DERIVATION.info}/${attempt}`;
    const candidate = hkdf(sha256, ikm, salt, utf8ToBytes(tag), 32);
    const scalar = BigInt(`0x${bytesToHex(candidate)}`);
    if (scalar > 0n && scalar < CURVE_ORDER) {
      return { privateKey: candidate, publicKeyHex: bytesToHex(schnorr.getPublicKey(candidate)) };
    }
  }
  // Astronomically unreachable: HKDF would have to yield an out-of-range scalar
  // 100 times in a row.
  throw new Error("Key derivation failed");
};
