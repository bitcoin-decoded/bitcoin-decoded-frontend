// A freshly surfaced block's two-phase entrance (see index.css):
//   "arriving" — held hidden while the page mechanically scrolls to it;
//   "playing"  — its content composes in, top-to-bottom, once the scroll lands.
export type RevealPhase = "arriving" | "playing";
