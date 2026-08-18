import type { Language } from "../../../I18n";

// Key concepts surfaced on each module card, in curriculum order. Short standalone
// keywords (no articles, one notion each, never a compound joined by "et"/"vs"), so
// each stays on a single highlighted line. FR is the éditorial wording; EN is a
// proposed edition pending éditorial validation, like the module names. Kept here
// rather than in the flat dictionaries because it is list data, consumed language-aware.
const NOTIONS: Record<Language, string[][]> = {
  fr: [
    [
      "création monétaire",
      "monnaie centrale",
      "monnaie bancaire",
      "assouplissement quantitatif",
      "effet Cantillon",
      "inflation",
    ],
    [
      "monnaie",
      "taux d'intérêt",
      "préférence temporelle",
      "cycles économiques",
      "calcul économique",
      "école autrichienne",
    ],
    [
      "blockchain",
      "preuve de travail",
      "halving",
      "transactions",
      "UTXO",
      "clés privées",
      "signatures",
      "portefeuille",
      "phrase de récupération",
    ],
  ],
  en: [
    [
      "money creation",
      "central money",
      "bank money",
      "quantitative easing",
      "Cantillon effect",
      "inflation",
    ],
    [
      "money",
      "interest rates",
      "time preference",
      "economic cycles",
      "economic calculation",
      "Austrian school",
    ],
    [
      "blockchain",
      "proof of work",
      "halving",
      "transactions",
      "UTXOs",
      "private keys",
      "signatures",
      "wallets",
      "seed phrase",
    ],
  ],
};

export const getModuleNotions = (language: Language, moduleIndex: number): string[] =>
  NOTIONS[language][moduleIndex] ?? [];
