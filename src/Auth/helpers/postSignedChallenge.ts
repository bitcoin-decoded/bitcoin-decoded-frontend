import type { KeyPair } from "../types/index.js";

import { AuthError } from "./AuthError.js";
import { authFetch } from "./authFetch.js";
import { requestChallenge } from "./requestChallenge.js";
import { signChallenge } from "./signChallenge.js";

// Prove key ownership, then POST to a verify/register route. One re-challenge if
// the nonce was consumed or expired between issue and use (CDC §9). The server's
// coded errors become AuthError codes the UI maps to text.
export const postSignedChallenge = async (
  keyPair: KeyPair,
  path: string,
  extra: Record<string, unknown> = {},
): Promise<Record<string, unknown>> => {
  for (let attempt = 0; attempt < 2; attempt++) {
    const { nonce, issuedAt } = await requestChallenge(keyPair.publicKeyHex);
    const signature = signChallenge(
      { publicKeyHex: keyPair.publicKeyHex, nonceHex: nonce, issuedAtIso: issuedAt },
      keyPair.privateKey,
    );
    const { status, body } = await authFetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ publicKey: keyPair.publicKeyHex, nonce, signature, ...extra }),
    });
    if (status === 200) return body;

    const code = typeof body.error === "string" ? body.error : "server";
    if (code === "challenge_invalid" && attempt === 0) continue;
    if (code === "account_not_found") throw new AuthError("account_not_found");
    if (code === "username_taken") throw new AuthError("username_taken");
    if (code === "signature_invalid") throw new AuthError("signature_invalid");
    if (status === 429) throw new AuthError("rate_limited");
    throw new AuthError(code === "challenge_invalid" ? "challenge_invalid" : "server");
  }
  throw new AuthError("challenge_invalid");
};
