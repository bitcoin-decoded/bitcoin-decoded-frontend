import type { Language } from "../../../I18n";

/**
 * Bilingual copy for the two method visuals (physicist vs logician).
 * Feature-local, language-aware getter (mirrors getDunbarTierText /
 * getDonationCopy) rather than global t() keys: the set is small, specific to
 * this chapter, and never reused elsewhere. The years are language-neutral and
 * live here too so each visual can render them as standalone badges.
 */
export const getScientificMethodsCopy = (language: Language) => {
  const fr = language === "fr";

  return {
    physicist: {
      title: fr ? "La méthode du physicien" : "The physicist's method",
      timeLabel: fr ? "le temps" : "time",
      replaces: fr ? "remplace" : "replaces",
      newton: {
        year: "1687",
        name: fr ? "Théorie de Newton" : "Newton's theory",
        observations: fr ? "observations qui collent" : "observations that fit",
      },
      einstein: {
        year: "1915",
        name: fr ? "Théorie d'Einstein" : "Einstein's theory",
        observations: fr
          ? "observations qui collent mieux (ex : trajectoire de Mercure)"
          : "observations that fit better (e.g. Mercury's orbit)",
      },
      closing: fr
        ? "On garde la théorie qui explique le mieux les données. Jusqu'à preuve du contraire."
        : "You keep the theory that best explains the data. Until proven otherwise.",
    },
    logician: {
      title: fr ? "La méthode du logicien" : "The logician's method",
      root: {
        label: fr ? "Axiomes d'Euclide" : "Euclid's axioms",
        subtitle: fr
          ? "ex : « par deux points ne passe qu'une seule droite »"
          : 'e.g. "through two points passes one and only one line"',
      },
      thales: fr ? "Théorème de Thalès" : "Thales' theorem",
      pythagoras: fr ? "Théorème de Pythagore" : "Pythagoras' theorem",
      others: fr ? "autres théorèmes" : "other theorems",
      closing: fr
        ? "Si les axiomes sont vrais, les conclusions le sont aussi. Pas besoin de mesurer un seul triangle."
        : "If the axioms are true, the conclusions are too. No need to measure a single triangle.",
    },
  };
};
