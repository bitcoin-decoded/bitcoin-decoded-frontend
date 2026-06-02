/**
 * Pool of alternative (non-Nicolas) private keys. Clicking "modifier la clé
 * privée" cycles through them: each is 31 chars like the original, but visibly
 * different in its first 8 / last 6 chars so the truncated display changes on
 * every click. None of them derives to Nicolas's on-record public key, so they
 * all break the match (red) and get rejected by the network.
 */
export const ALT_PRIVATE_KEYS = [
  "K9dW2nP7xB4mZ1rQ8aT6yH3sF5jL0cV",
  "T3bV8mN5wQ2xK9rP1aH7yG4sD6fW0cZ",
  "P6xK1nB9wM4zT8rV2aQ5yH3sJ7dF0cN",
];
