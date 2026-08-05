// Session = a JWT (HS256) in an httpOnly cookie. The public key is the whole
// identity, so the token carries nothing else. HMAC is done with WebCrypto
// (crypto.subtle), available on the Vercel Node runtime, so no jwt library and
// no extra crypto dependency. crypto.subtle.verify is constant-time.

export type SessionPayload = { sub: string; iat: number; exp: number };

export const SESSION_COOKIE = "bd_session";

const THIRTY_DAYS = 60 * 60 * 24 * 30;
const RENEW_AFTER = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();
const nowSec = (): number => Math.floor(Date.now() / 1000);
const b64urlText = (text: string): string => Buffer.from(text, "utf8").toString("base64url");
const b64urlBytes = (bytes: ArrayBuffer): string => Buffer.from(bytes).toString("base64url");

const hmacKey = (usage: "sign" | "verify"): Promise<CryptoKey> => {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret) throw new Error("AUTH_SESSION_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage],
  );
};

export const signSession = async (publicKey: string): Promise<string> => {
  const iat = nowSec();
  const head = b64urlText(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64urlText(JSON.stringify({ sub: publicKey, iat, exp: iat + THIRTY_DAYS }));
  const signature = await crypto.subtle.sign("HMAC", await hmacKey("sign"), encoder.encode(`${head}.${body}`));
  return `${head}.${body}.${b64urlBytes(signature)}`;
};

export const verifySession = async (token: string): Promise<SessionPayload | null> => {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [head, body, signature] = parts;
  const valid = await crypto.subtle.verify(
    "HMAC",
    await hmacKey("verify"),
    Buffer.from(signature, "base64url"),
    encoder.encode(`${head}.${body}`),
  );
  if (!valid) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Partial<SessionPayload>;
    if (typeof payload.sub !== "string" || typeof payload.iat !== "number" || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp < nowSec()) return null;
    return payload as SessionPayload;
  } catch {
    return null;
  }
};

// Sliding window: a token still valid but older than a week is reissued, so an
// active reader is never logged out at the 30 day mark (CDC 6).
export const needsRenewal = (payload: SessionPayload): boolean => nowSec() - payload.iat > RENEW_AFTER;

const attributes = "Path=/; HttpOnly; Secure; SameSite=Lax";
export const sessionCookie = (token: string): string =>
  `${SESSION_COOKIE}=${token}; ${attributes}; Max-Age=${THIRTY_DAYS}`;
export const clearedSessionCookie = `${SESSION_COOKIE}=; ${attributes}; Max-Age=0`;

export const readCookie = (header: string | undefined, name: string): string | null => {
  if (!header) return null;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
};
