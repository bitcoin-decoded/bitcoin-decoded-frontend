// Lowercase-hex of an exact length: public keys are 64, nonces 64, signatures
// 128. Anything else is rejected before it reaches the database or the verifier.
export const isHex = (value: unknown, length: number): value is string =>
  typeof value === "string" && value.length === length && /^[0-9a-f]+$/.test(value);
