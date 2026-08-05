// Fixed authentication parameters (CDC §4). Changing any of these invalidates
// existing vaults and derived keys, so a change means a vault `version` bump plus
// a migration, never an in-place edit.
export const AUTH_DERIVATION = {
  salt: "bitcoin-decoded",
  info: "bitcoin-decoded-auth-v1",
};

export const PBKDF2_ITERATIONS = 600_000;

export const VAULT_FORMAT = {
  format: "bitcoin-decoded-vault",
  version: 1,
};
