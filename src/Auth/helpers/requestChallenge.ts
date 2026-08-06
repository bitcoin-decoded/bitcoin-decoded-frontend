import { AuthError } from "./AuthError.js";
import { authFetch } from "./authFetch.js";

// Ask the server for a one-time nonce to sign (CDC §6). The returned issuedAt is
// the exact string the client signs and the server reconstructs — the octet
// contract depends on passing it through unchanged.
export const requestChallenge = async (
  publicKeyHex: string,
): Promise<{ nonce: string; issuedAt: string }> => {
  const { status, body } = await authFetch("/api/auth/challenge", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ publicKey: publicKeyHex }),
  });
  if (status === 429) throw new AuthError("rate_limited");
  if (status !== 200 || typeof body.nonce !== "string" || typeof body.issuedAt !== "string") {
    throw new AuthError("server");
  }
  return { nonce: body.nonce, issuedAt: body.issuedAt };
};
