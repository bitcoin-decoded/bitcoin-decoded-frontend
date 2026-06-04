import type { LightningInvoice } from "../types";

/** BOLT11 expiry isn't parsed; we show a fixed 10-minute countdown. */
const DEFAULT_EXPIRY_MS = 10 * 60 * 1000;

/**
 * Resolve a fresh BOLT11 invoice for `amountSats` from a Lightning Address
 * via the LNURL-pay flow:
 *   1. GET https://{domain}/.well-known/lnurlp/{name}  → { callback, min/maxSendable }
 *   2. GET {callback}?amount={msats}                   → { pr: bolt11 }
 * Throws on any failure; the caller then falls back to the static Lightning
 * Address + QR (spec §4.3).
 */
export const resolveLightningInvoice = async (
  lightningAddress: string,
  amountSats: number,
): Promise<LightningInvoice> => {
  const [name, domain] = lightningAddress.split("@");
  if (!name || !domain) throw new Error("invalid lightning address");

  const metaRes = await fetch(`https://${domain}/.well-known/lnurlp/${name}`);
  if (!metaRes.ok) throw new Error("lnurl resolve failed");
  const meta = await metaRes.json();
  const callback = meta?.callback;
  if (typeof callback !== "string") throw new Error("lnurl: no callback");

  const amountMsats = amountSats * 1000;
  if (Number(meta?.minSendable) > amountMsats) throw new Error("below min");
  if (Number(meta?.maxSendable) > 0 && Number(meta?.maxSendable) < amountMsats) {
    throw new Error("above max");
  }

  const sep = callback.includes("?") ? "&" : "?";
  const invRes = await fetch(`${callback}${sep}amount=${amountMsats}`);
  if (!invRes.ok) throw new Error("lnurl callback failed");
  const inv = await invRes.json();
  const bolt11 = inv?.pr;
  if (typeof bolt11 !== "string" || bolt11.length === 0) throw new Error("no invoice");

  return { bolt11, amountSats, expiresAt: Date.now() + DEFAULT_EXPIRY_MS };
};
