import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";
import type { VercelRequest } from "@vercel/node";

// An opaque, non-reversible key for rate limiting. The raw IP is read from the
// forwarded header, hashed immediately, and never retained: it is not stored,
// not logged, and not kept in memory in the clear (privacy invariant).
export const clientKey = (req: VercelRequest): string => {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip = (first ?? "").split(",")[0]?.trim() || "unknown";
  return bytesToHex(sha256(utf8ToBytes(ip))).slice(0, 32);
};
