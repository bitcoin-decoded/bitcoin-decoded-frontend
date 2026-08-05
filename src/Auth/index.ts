export {
  buildSignMessage,
  decryptVault,
  deriveKeyPair,
  encryptVault,
  generateMnemonic,
  parseVaultFile,
  signChallenge,
  validateMnemonic,
  verifyChallenge,
} from "./helpers/index.js";
export type { ChallengeMessage, KeyPair, VaultContainer } from "./types/index.js";
