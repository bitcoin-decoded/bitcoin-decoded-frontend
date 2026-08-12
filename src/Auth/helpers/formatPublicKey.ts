// Shorten a public key for display (CDC §14.11): the first 8 and last 8
// characters around an ellipsis, so it reads as an identity fingerprint rather
// than a wall of hex. A key too short to shorten is returned unchanged.
export const formatPublicKey = (publicKey: string): string =>
  publicKey.length <= 16 ? publicKey : `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`;
