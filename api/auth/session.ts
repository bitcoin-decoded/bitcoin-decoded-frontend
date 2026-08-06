import { sql } from "../_lib/db.js";
import {
  needsRenewal,
  readCookie,
  SESSION_COOKIE,
  sessionCookie,
  signSession,
  verifySession,
} from "../_lib/session.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";

// "Who am I": the account's username if the session cookie is valid, 401
// otherwise. The single client-facing probe for session freshness — the cookie
// is the one truth (identity presence is the vault's job, client-side). A
// stale-but-valid token is renewed in place, so opening the app keeps it warm.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  const token = readCookie(req.headers.cookie, SESSION_COOKIE);
  const session = token ? await verifySession(token) : null;
  if (!session) return res.status(401).json({ error: "unauthenticated" });

  const rows = await sql`select username from accounts where public_key = ${session.sub} limit 1`;
  if (!rows[0]) return res.status(401).json({ error: "unauthenticated" });

  if (needsRenewal(session)) res.setHeader("Set-Cookie", sessionCookie(await signSession(session.sub)));
  return res.status(200).json({ username: rows[0].username });
}
