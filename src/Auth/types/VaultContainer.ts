// The encrypted container, identical in IndexedDB and in the .bdw export file
// (CDC §4.5). Only `cipher.data` is secret; `publicKey` and `username` are public
// so a backup can show "Backup for <name>" before the password is asked.
export type VaultContainer = {
  format: string;
  version: number;
  kdf: { algo: "PBKDF2-SHA256"; iterations: number; salt: string };
  cipher: { algo: "AES-256-GCM"; iv: string; data: string };
  publicKey: string;
  username: string;
  createdAt: string;
};
