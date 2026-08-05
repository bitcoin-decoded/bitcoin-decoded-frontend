// The three server-held values that compose the signed login message (CDC §4.3).
export type ChallengeMessage = {
  publicKeyHex: string;
  nonceHex: string;
  issuedAtIso: string;
};
