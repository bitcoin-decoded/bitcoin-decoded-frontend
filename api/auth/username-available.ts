import { sql } from "../_lib/db.js";
import { isValidUsername, normalizeUsername } from "../_lib/username.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";

// Says only whether a username is free, nothing else (CDC 6). Case-insensitive.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const raw = (req.body as { username?: unknown } | undefined)?.username;
  if (typeof raw !== "string") return res.status(400).json({ available: false, reason: "invalid" });

  const username = normalizeUsername(raw);
  if (!isValidUsername(username)) return res.status(200).json({ available: false, reason: "invalid" });

  const rows = await sql`select 1 from accounts where lower(username) = ${username} limit 1`;
  const taken = rows.length > 0;
  return res.status(200).json({ available: !taken, reason: taken ? "taken" : null });
}
