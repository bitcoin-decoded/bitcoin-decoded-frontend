import { sql } from "./_lib/db.js";
import { mergeProgress, type ProgressItem } from "./_lib/mergeProgress.js";
import {
  needsRenewal,
  readCookie,
  SESSION_COOKIE,
  sessionCookie,
  signSession,
  verifySession,
} from "./_lib/session.js";

import type { VercelRequest, VercelResponse } from "@vercel/node";

const toItem = (row: Record<string, unknown>): ProgressItem => ({
  itemId: row.item_id as string,
  itemType: row.item_type as string,
  status: row.status as string,
  score: (row.score as number | null) ?? null,
  data: row.data ?? null,
});

const parseIncoming = (raw: unknown): ProgressItem | null => {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.itemId !== "string" || r.itemId.length === 0 || r.itemId.length > 128) return null;
  if (typeof r.itemType !== "string" || typeof r.status !== "string") return null;
  const score = typeof r.score === "number" ? r.score : null;
  return { itemId: r.itemId, itemType: r.itemType, status: r.status, score, data: r.data ?? null };
};

// Reads and writes the signed-in account's progress. The write merges each item
// with the non-regressive rule (CDC 6), which is also what makes the first-login
// migration from localStorage safe (CDC 8): pushing local progress can only ever
// add to what the server holds, never overwrite it downward.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = readCookie(req.headers.cookie, SESSION_COOKIE);
  const session = token ? await verifySession(token) : null;
  if (!session) return res.status(401).json({ error: "unauthenticated" });
  const publicKey = session.sub;

  if (needsRenewal(session)) res.setHeader("Set-Cookie", sessionCookie(await signSession(publicKey)));

  if (req.method === "GET") {
    const rows = await sql`
      select item_id, item_type, status, score, data from progress where public_key = ${publicKey}
    `;
    return res.status(200).json({ items: rows.map(toItem) });
  }

  if (req.method === "POST") {
    const items = (req.body as { items?: unknown } | undefined)?.items;
    if (!Array.isArray(items)) return res.status(400).json({ error: "invalid_request" });

    for (const raw of items) {
      const incoming = parseIncoming(raw);
      if (!incoming) continue;
      const stored = await sql`
        select item_id, item_type, status, score, data from progress
        where public_key = ${publicKey} and item_id = ${incoming.itemId} limit 1
      `;
      const merged = mergeProgress(stored[0] ? toItem(stored[0]) : null, incoming);
      const dataJson = JSON.stringify(merged.data ?? null);
      await sql`
        insert into progress (public_key, item_id, item_type, status, score, data, updated_at)
        values (${publicKey}, ${merged.itemId}, ${merged.itemType}, ${merged.status}, ${merged.score}, ${dataJson}::jsonb, now())
        on conflict (public_key, item_id) do update set
          item_type = excluded.item_type,
          status = excluded.status,
          score = excluded.score,
          data = excluded.data,
          updated_at = now()
      `;
    }
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "method_not_allowed" });
}
