import { clientKey } from "../_lib/clientKey.js";
import { sql } from "../_lib/db.js";
import { isHex } from "../_lib/isHex.js";
import { allowRequest } from "../_lib/rateLimit.js";

import { bytesToHex } from "@noble/hashes/utils.js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Issues a one-time, short-lived nonce for a public key. It does not reveal
// whether an account exists: a challenge is handed out either way (CDC 6).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  if (!allowRequest(clientKey(req))) return res.status(429).json({ error: "rate_limited" });

  const publicKey = (req.body as { publicKey?: unknown } | undefined)?.publicKey;
  if (!isHex(publicKey, 64)) return res.status(400).json({ error: "invalid_request" });

  const nonce = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + 120_000);

  // Opportunistic purge keeps auth_challenges bounded without a cron for it.
  await sql`delete from auth_challenges where expires_at < now() - interval '1 hour'`;
  await sql`
    insert into auth_challenges (nonce, public_key, issued_at, expires_at)
    values (${nonce}, ${publicKey}, ${issuedAt.toISOString()}, ${expiresAt.toISOString()})
  `;

  return res.status(200).json({
    nonce,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  });
}
