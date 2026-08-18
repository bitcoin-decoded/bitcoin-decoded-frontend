import type { Language } from "../../../I18n";

// Key concepts surfaced on each module card, in curriculum order. FR is the
// éditorial wording (spec §3.4, verbatim); EN is a proposed edition pending
// éditorial validation, like the module names. Kept here rather than in the flat
// dictionaries because it is list data, consumed language-aware.
const NOTIONS: Record<Language, string[][]> = {
  fr: [
    [
      "la création monétaire par les banques",
      "monnaie centrale vs bancaire",
      "l'assouplissement quantitatif",
      "l'effet Cantillon",
      "l'origine réelle de l'inflation",
    ],
    [
      "ce qu'est vraiment la monnaie",
      "taux d'intérêt et préférence temporelle",
      "les cycles économiques",
      "le calcul économique",
      "l'école autrichienne",
    ],
    [
      "la blockchain",
      "la preuve de travail",
      "le halving",
      "transactions et UTXO",
      "clés privées et signatures",
      "portefeuille et phrase de récupération",
    ],
  ],
  en: [
    [
      "bank money creation",
      "central vs commercial money",
      "quantitative easing",
      "the Cantillon effect",
      "the real cause of inflation",
    ],
    [
      "what money really is",
      "interest rates and time preference",
      "economic cycles",
      "economic calculation",
      "the Austrian school",
    ],
    [
      "the blockchain",
      "proof of work",
      "the halving",
      "transactions and UTXOs",
      "private keys and signatures",
      "wallets and seed phrases",
    ],
  ],
};

export const getModuleNotions = (language: Language, moduleIndex: number): string[] =>
  NOTIONS[language][moduleIndex] ?? [];
