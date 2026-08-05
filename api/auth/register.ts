import { verifyChallenge } from "../../src/Auth/index.js";
import { clientKey } from "../_lib/clientKey.js";
import { sql } from "../_lib/db.js";
import { isHex } from "../_lib/isHex.js";
import { allowRequest } from "../_lib/rateLimit.js";
import { sessionCookie, signSession } from "../_lib/session.js";
import { isValidUsername, normalizeUsername } from "../_lib/username.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";

// Registration (CDC 6): same signature proof as verify, then create the account.
// An already-known public key is treated as a reconnection, not an error (CDC 9):
// the user is restoring, so a session is issued instead of a second account.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  if (!allowRequest(clientKey(req))) return res.status(429).json({ error: "rate_limited" });

  const body = (req.body ?? {}) as {
    publicKey?: unknown;
    username?: unknown;
    nonce?: unknown;
    signature?: unknown;
  };
  if (!isHex(body.publicKey, 64) || !isHex(body.nonce, 64) || !isHex(body.signature, 128)) {
    return res.status(400).json({ error: "invalid_request" });
  }
  if (typeof body.username !== "string") return res.status(400).json({ error: "invalid", reason: "invalid" });
  const { publicKey, nonce, signature } = body;
  const username = normalizeUsername(body.username);
  if (!isValidUsername(username)) return res.status(400).json({ error: "invalid", reason: "invalid" });

  const claimed = await sql`
    update auth_challenges set used_at = now()
    where nonce = ${nonce} and public_key = ${publicKey} and used_at is null and expires_at > now()
    returning issued_at
  `;
  if (!claimed[0]) return res.status(401).json({ error: "challenge_invalid" });

  const issuedAtIso = new Date(claimed[0].issued_at as string).toISOString();
  const valid = verifyChallenge({ publicKeyHex: publicKey, nonceHex: nonce, issuedAtIso }, signature, publicKey);
  if (!valid) return res.status(401).json({ error: "signature_invalid" });

  const existing = await sql`select username from accounts where public_key = ${publicKey} limit 1`;
  if (existing[0]) {
    await sql`update accounts set last_seen_at = now() where public_key = ${publicKey}`;
    res.setHeader("Set-Cookie", sessionCookie(await signSession(publicKey)));
    return res.status(200).json({ username: existing[0].username });
  }

  const taken = await sql`select 1 from accounts where lower(username) = ${username} limit 1`;
  if (taken[0]) return res.status(409).json({ error: "username_taken", reason: "taken" });

  try {
    await sql`insert into accounts (public_key, username) values (${publicKey}, ${username})`;
  } catch {
    // Lost a race on the public key or the username unique index.
    return res.status(409).json({ error: "conflict" });
  }

  res.setHeader("Set-Cookie", sessionCookie(await signSession(publicKey)));
  return res.status(200).json({ username });
}
