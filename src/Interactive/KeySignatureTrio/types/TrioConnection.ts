import type { KeyElementId } from "./KeyElementId";

/** A directed link between two elements, e.g. private key —produit→ signature. */
export type TrioConnection = {
  from: KeyElementId;
  to: KeyElementId;
  /** Verb shown on the edge, e.g. "dérive", "produit", "vérifie". */
  label: string;
};
