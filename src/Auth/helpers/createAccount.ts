import { createVault } from "./createVault.js";
import { deriveKeyPair } from "./deriveKeyPair.js";
import { encryptVault } from "./encryptVault.js";
import { register } from "./register.js";
import { setSessionKey } from "./sessionKey.js";

// Finalize account creation (CDC §7.1 écran 6): encrypt and store the vault
// first, then register the public key. The mnemonic was generated and confirmed
// earlier in the flow and is passed in — never regenerated here.
export const createAccount = async (input: {
  mnemonic: string;
  username: string;
  password: string;
}): Promise<{ username: string }> => {
  const keyPair = deriveKeyPair(input.mnemonic);
  const container = await encryptVault({
    mnemonic: input.mnemonic,
    password: input.password,
    publicKeyHex: keyPair.publicKeyHex,
    username: input.username,
  });
  await createVault().save(container);
  const result = await register(keyPair, input.username);
  setSessionKey(keyPair);
  return result;
};
