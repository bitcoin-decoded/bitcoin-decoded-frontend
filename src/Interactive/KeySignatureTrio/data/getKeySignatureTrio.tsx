import { KeyRound, Lock, PenLine } from "lucide-react";

import type { Language } from "../../../I18n";
import type { KeyElement, TrioConnection } from "../types";

/**
 * Language-aware content for the trio. Geometry lives in TRIO_LAYOUT; this
 * getter only owns the prose + icons so the component stays dumb.
 */
export const getKeySignatureTrio = (
  language: Language,
): { elements: KeyElement[]; connections: TrioConnection[] } => {
  const fr = language === "fr";

  const elements: KeyElement[] = [
    {
      id: "privateKey",
      icon: Lock,
      title: fr ? "Clé privée" : "Private key",
      role: fr ? "Le secret" : "The secret",
      description: fr
        ? "Le cœur de tout. Elle ne doit jamais être divulguée : c'est elle, et elle seule, qui produit la signature prouvant que tu es le propriétaire. La perdre, c'est perdre l'accès. La partager, c'est tout donner."
        : "The heart of everything. It must never be shared: it alone produces the signature that proves you're the owner. Lose it and you lose access. Share it and you give everything away.",
    },
    {
      id: "publicKey",
      icon: KeyRound,
      title: fr ? "Clé publique" : "Public key",
      role: fr ? "Le vérificateur" : "The verifier",
      description: fr
        ? "Dérivée de la clé privée, mais impossible à inverser : on peut la diffuser au monde entier sans aucun risque. Son rôle ? Permettre à n'importe qui de vérifier qu'une signature est authentique — sans jamais voir le secret qui l'a créée."
        : "Derived from the private key, yet impossible to reverse: you can broadcast it to the whole world without any risk. Its job? Letting anyone verify that a signature is authentic — without ever seeing the secret that created it.",
    },
    {
      id: "signature",
      icon: PenLine,
      title: fr ? "Signature" : "Signature",
      role: fr ? "La preuve" : "The proof",
      description: fr
        ? "Produite par la clé privée pour un message précis. C'est la preuve cryptographique du droit de dépenser : unique à chaque transaction, impossible à falsifier, et vérifiable par tous grâce à la clé publique."
        : "Produced by the private key for a specific message. It's the cryptographic proof of the right to spend: unique to each transaction, impossible to forge, and verifiable by anyone using the public key.",
    },
  ];

  const connections: TrioConnection[] = [
    { from: "privateKey", to: "publicKey", label: fr ? "dérive" : "derives" },
    { from: "privateKey", to: "signature", label: fr ? "produit" : "produces" },
    { from: "publicKey", to: "signature", label: fr ? "vérifie" : "verifies" },
  ];

  return { elements, connections };
};
