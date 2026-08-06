import { AuthError } from "./AuthError.js";
import { createVault } from "./createVault.js";
import { deriveKeyPair } from "./deriveKeyPair.js";
import { encryptVault } from "./encryptVault.js";
import { login } from "./login.js";
import { setSessionKey } from "./sessionKey.js";
import { validateMnemonic } from "./validateMnemonic.js";

// Restore on a new device from the 12 words (CDC §7.3): validate the checksum,
// derive, log in, then rewrite the local vault under a fresh password. An unknown
// account surfaces as AuthError("account_not_found") so the UI can offer to
// create one with this phrase rather than showing a dead end.
export const restore = async (input: {
  mnemonic: string;
  password: string;
}): Promise<{ username: string }> => {
  if (!validateMnemonic(input.mnemonic)) throw new AuthError("invalid_phrase");

  const keyPair = deriveKeyPair(input.mnemonic);
  const result = await login(keyPair);

  const container = await encryptVault({
    mnemonic: input.mnemonic,
    password: input.password,
    publicKeyHex: keyPair.publicKeyHex,
    username: result.username,
  });
  await createVault().save(container);
  setSessionKey(keyPair);
  return result;
};
