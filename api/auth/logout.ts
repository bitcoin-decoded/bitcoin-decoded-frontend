import { clearedSessionCookie } from "../_lib/session.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";

// Clears the session cookie. It never touches client storage: the vault stays in
// IndexedDB so the reader can unlock again with their password (CDC 6, 7.7).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  res.setHeader("Set-Cookie", clearedSessionCookie);
  return res.status(200).json({ ok: true });
}
