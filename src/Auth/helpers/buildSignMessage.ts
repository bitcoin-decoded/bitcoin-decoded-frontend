import type { ChallengeMessage } from "../types";

// The exact bytes the client signs and the server reconstructs (CDC §4.3). Both
// sides call this one function, so correctness only needs the two calls to agree.
// ASCII only, "\n" separators, no trailing spaces: the CDC's own note mandates
// ASCII to rule out any client/server encoding divergence, so the header dash is
// a plain hyphen, never an em dash.
export const buildSignMessage = ({ publicKeyHex, nonceHex, issuedAtIso }: ChallengeMessage): string =>
  `Bitcoin.Decoded - connexion\nCle: ${publicKeyHex}\nNonce: ${nonceHex}\nEmis: ${issuedAtIso}`;
