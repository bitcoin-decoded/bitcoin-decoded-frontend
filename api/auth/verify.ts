import { verifyChallenge } from "../../src/Auth/index.js";
import { clientKey } from "../_lib/clientKey.js";
import { sql } from "../_lib/db.js";
import { isHex } from "../_lib/isHex.js";
import { allowRequest } from "../_lib/rateLimit.js";
import { sessionCookie, signSession } from "../_lib/session.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";

// Connection (CDC 6): claim the challenge atomically (single use, unexpired,
// bound to this key), rebuild the signed message from the stored issued_at, and
// verify the Schnorr signature. A missing account is a distinct, non-leaking
// rejection: creation goes through register.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  if (!allowRequest(clientKey(req))) return res.status(429).json({ error: "rate_limited" });

  const body = (req.body ?? {}) as { publicKey?: unknown; nonce?: unknown; signature?: unknown };
  if (!isHex(body.publicKey, 64) || !isHex(body.nonce, 64) || !isHex(body.signature, 128)) {
    return res.status(400).json({ error: "invalid_request" });
  }
  const { publicKey, nonce, signature } = body;

  const claimed = await sql`
    update auth_challenges set used_at = now()
    where nonce = ${nonce} and public_key = ${publicKey} and used_at is null and expires_at > now()
    returning issued_at
  `;
  if (!claimed[0]) return res.status(401).json({ error: "challenge_invalid" });

  const issuedAtIso = new Date(claimed[0].issued_at as string).toISOString();
  const valid = verifyChallenge({ publicKeyHex: publicKey, nonceHex: nonce, issuedAtIso }, signature, publicKey);
  if (!valid) return res.status(401).json({ error: "signature_invalid" });

  const account = await sql`select username from accounts where public_key = ${publicKey} limit 1`;
  if (!account[0]) return res.status(404).json({ error: "account_not_found" });

  await sql`update accounts set last_seen_at = now() where public_key = ${publicKey}`;
  res.setHeader("Set-Cookie", sessionCookie(await signSession(publicKey)));
  return res.status(200).json({ username: account[0].username });
}
