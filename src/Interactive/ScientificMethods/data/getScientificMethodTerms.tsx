import { HighlightText, type THEME_COLORS } from "../../../Design";
import type { Language } from "../../../I18n";
import type { ExpandableTerm } from "../../ExpandableDefinitions";
import { LogicianMethod } from "../components/LogicianMethod";
import { PhysicistMethod } from "../components/PhysicistMethod";

import { Sigma, Telescope } from "@icons";

type ThemeColors = (typeof THEME_COLORS)["dark"];

export const getScientificMethodTerms = (
  language: Language,
  colors: ThemeColors,
): ExpandableTerm[] => {
  const fr = language === "fr";

  return [
    {
      key: "keynesian",
      title: fr ? "L'école keynésienne" : "The Keynesian school",
      summary: fr ? "La méthode du physicien" : "The physicist's method",
      icon: Telescope,
      accentText: colors.blue.text.secondary,
      accentBorder: colors.blue.border.secondary,
      body: (
        <>
          <p>
            {fr ? (
              <>
                On observe des chiffres (genre le PIB, le chômage, ...), on fait une hypothèse et on
                regarde si les données du passé confirment la théorie.{" "}
                <HighlightText>C'est ce qu'on appelle l'empirisme</HighlightText> (ou le positivisme
                dans sa version méthodologique).
              </>
            ) : (
              <>
                You watch the numbers (GDP, unemployment, that kind of thing), you form a
                hypothesis, and you check whether past data backs it up.{" "}
                <HighlightText>This is called empiricism</HighlightText>
                (or positivism, in its methodological flavor).
              </>
            )}
          </p>
          <PhysicistMethod />
        </>
      ),
    },
    {
      key: "austrian",
      title: fr ? "L'école autrichienne" : "The Austrian school",
      summary: fr ? "La méthode du logicien" : "The logician's method",
      icon: Sigma,
      accentText: colors.violet.text.secondary,
      accentBorder: colors.violet.border.secondary,
      body: (
        <>
          <p>
            {fr ? (
              <>
                Là, on ne part pas de l'observation, mais d'un point de départ qu'on tient pour
                indiscutable, puis on en déduit tout le reste par la logique, exactement comme en
                géométrie. <HighlightText>C'est la méthode axiomatique-déductive</HighlightText>.
              </>
            ) : (
              <>
                Here, you don't start from observation but from a premise you treat as indisputable,
                and you deduce everything else through logic, exactly like in geometry.{" "}
                <HighlightText>This is the axiomatic-deductive method</HighlightText>.
              </>
            )}
          </p>
          <LogicianMethod />
        </>
      ),
    },
  ];
};
