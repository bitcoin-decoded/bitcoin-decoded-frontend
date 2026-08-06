import type { KeyPair } from "../types/index.js";

import { postSignedChallenge } from "./postSignedChallenge.js";

// Create the account for a key (POST /api/auth/register). An already-known key is
// treated as a reconnection server-side, so this also covers "restore then it
// turned out to already exist". Throws AuthError("username_taken") on collision.
export const register = async (keyPair: KeyPair, username: string): Promise<{ username: string }> => {
  const body = await postSignedChallenge(keyPair, "/api/auth/register", { username });
  return { username: typeof body.username === "string" ? body.username : username };
};
