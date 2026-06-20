import { Sigma, Telescope } from "lucide-react";

import type { THEME_COLORS } from "../../../Design";
import type { Language } from "../../../I18n";
import type { ExpandableTerm } from "../../ExpandableDefinitions";

import { LogicianMethod } from "../components/LogicianMethod";
import { PhysicistMethod } from "../components/PhysicistMethod";

type ThemeColors = (typeof THEME_COLORS)["dark"];

/**
 * Two click-to-reveal terms for the keynesian-vs-austrian / physicist-vs-logician
 * comparison. Each body carries a short framing line plus the matching visual
 * (PhysicistMethod / LogicianMethod), so the reader pulls them in one at a
 * time instead of being faced with both illustrations stacked vertically.
 */
export const getScientificMethodTerms = (
  language: Language,
  colors: ThemeColors,
): ExpandableTerm[] => {
  const fr = language === "fr";

  return [
    {
      key: "keynesian",
      title: fr ? "L'école keynésienne" : "The Keynesian school",
      summary: fr
        ? "La méthode du physicien : observer les données, valider la théorie."
        : "The physicist's method: watch the data, validate the theory.",
      icon: Telescope,
      accentText: colors.blue.text.secondary,
      accentBorder: colors.blue.border.secondary,
      body: (
        <>
          <p>
            {fr
              ? "On observe des chiffres (PIB, chômage, prix), on formule une hypothèse, on regarde si les données du passé la confirment. La théorie reste vraie tant que les nouvelles observations ne la cassent pas."
              : "You watch the numbers (GDP, unemployment, prices), you form a hypothesis, you check whether past data backs it up. The theory holds as long as new observations don't break it."}
          </p>
          <PhysicistMethod />
        </>
      ),
    },
    {
      key: "austrian",
      title: fr ? "L'école autrichienne" : "The Austrian school",
      summary: fr
        ? "La méthode du logicien : partir d'un axiome, déduire le reste."
        : "The logician's method: start from an axiom, deduce the rest.",
      icon: Sigma,
      accentText: colors.violet.text.secondary,
      accentBorder: colors.violet.border.secondary,
      body: (
        <>
          <p>
            {fr
              ? "On part d'un point de départ tenu pour indiscutable, et on déduit tout le reste par la logique. Comme en géométrie : si les axiomes sont vrais, les conclusions le sont aussi, sans avoir besoin de mesurer."
              : "You start from a premise treated as indisputable, and deduce everything else through logic. Same as geometry: if the axioms are true, the conclusions are too, no need to measure."}
          </p>
          <LogicianMethod />
        </>
      ),
    },
  ];
};
