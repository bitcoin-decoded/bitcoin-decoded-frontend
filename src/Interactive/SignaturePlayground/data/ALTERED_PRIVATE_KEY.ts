/**
 * The single "wrong" private key the user swaps to when clicking "modifier la
 * clé privée". Like the edit-once pattern in BlockchainChainVisual, the key can
 * only be changed once, so a single alternative is enough. It is 31 chars like
 * the original but differs in its first 8 / last 6 chars (visible after
 * truncation), and it does not derive to Nicolas's on-record public key — so it
 * breaks the match (red) and gets rejected by the network.
 */
export const ALTERED_PRIVATE_KEY = "K9dW2nP7xB4mZ1rQ8aT6yH3sF5jL0cV";
