import type { KeyPair } from "../types/index.js";

import { postSignedChallenge } from "./postSignedChallenge.js";

// Prove an existing account and open a session (POST /api/auth/verify). Throws
// AuthError("account_not_found") when the key has no account yet.
export const login = async (keyPair: KeyPair): Promise<{ username: string }> => {
  const body = await postSignedChallenge(keyPair, "/api/auth/verify");
  return { username: typeof body.username === "string" ? body.username : "" };
};
