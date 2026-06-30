import type { Language } from "../../../I18n";
import type { KeyElement, TrioConnection } from "../types";

import { KeyRound, Lock, PenLine } from "@icons";

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
        ? "Le cœur de tout. Elle ne se partage jamais : c'est elle, et elle seule, qui produit la signature prouvant ton droit de dépenser. La perdre, c'est perdre l'accès. La partager, c'est tout donner."
        : "The heart of everything. It's never shared: it's the one and only thing that can produce the signature proving your right to spend. Lose it, lose access. Share it, give everything away.",
    },
    {
      id: "publicKey",
      icon: KeyRound,
      title: fr ? "Clé publique" : "Public key",
      role: fr ? "Le vérificateur" : "The verifier",
      description: fr
        ? "Calculée à partir de la clé privée par une opération à sens unique, mais impossible à inverser : on peut la diffuser au monde entier sans risque. Son rôle ? Permettre à n'importe qui de vérifier qu'une signature est authentique, sans jamais voir le secret qui l'a créée."
        : "Calculated from the private key through a one-way operation, but impossible to reverse: you can share it with the entire world without risk. Its role? To let anyone verify that a signature is authentic, without ever seeing the secret that created it.",
    },
    {
      id: "signature",
      icon: PenLine,
      title: fr ? "Signature" : "Signature",
      role: fr ? "La preuve" : "The proof",
      description: fr
        ? "Produite par la clé privée pour un message précis. C'est la preuve cryptographique du droit de dépenser : unique à chaque transaction, vérifiable par tous via la clé publique, mais impossible à fabriquer sans la clé privée correspondante."
        : "Produced by the private key for a specific message. It's the cryptographic proof of the right to spend: unique to every transaction, verifiable by anyone with the public key, but impossible to forge without the matching private key.",
    },
  ];

  const connections: TrioConnection[] = [
    { from: "privateKey", to: "publicKey", label: fr ? "calcule" : "calculates" },
    { from: "privateKey", to: "signature", label: fr ? "produit" : "produces" },
    { from: "publicKey", to: "signature", label: fr ? "vérifie" : "verifies" },
  ];

  return { elements, connections };
};
