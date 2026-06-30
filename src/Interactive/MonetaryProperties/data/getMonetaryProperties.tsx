import type { THEME_COLORS } from "../../../Design";
import petrole from "../../../Design/img/Petroleum_sample.jpg";
import pikachuIllustratorCard from "../../../Design/img/Pikachu_Illustrator_Card.webp";
import type { ExpandableTerm } from "../../ExpandableDefinitions";
import { Illustration } from "../../Illustration";

import { Gem, Mountain } from "@icons";

type Language = "fr" | "en";
type ThemeColors = (typeof THEME_COLORS)["dark"];

export const getMonetaryProperties = (
  language: Language,
  colors: ThemeColors,
): ExpandableTerm[] => {
  const fr = language === "fr";

  return [
    {
      key: "scarcity",
      title: fr ? "Rareté monétaire" : "Monetary scarcity",
      summary: fr
        ? "Une photographie à l'instant T du stock existant."
        : "A snapshot, at a given moment, of the existing stock.",
      icon: Gem,
      accentText: colors.semantic.info.text,
      accentBorder: colors.semantic.info.border,
      body: fr ? (
        <>
          <p>
            <i>« Combien y en a-t-il actuellement ? »</i>
          </p>
          <Illustration
            src={pikachuIllustratorCard}
            alt="Carte de Pikachu Illustrator"
            width="18rem"
            margin="0.4rem auto 0"
            caption="« Pikachu Illustrator » est la carte pokémon la plus rare (39 exemplaires dans le monde). Cependant, elle n'est pas dure (Nintendo pourrait facilement imprimer des milliers de cartes « Pikachu Illustrator » identiques)."
          />
        </>
      ) : (
        <>
          <p>
            <i>"How much of it exists right now?"</i>
          </p>
          <Illustration
            src={pikachuIllustratorCard}
            alt="Pikachu Illustrator card"
            width="18rem"
            margin="0.4rem auto 0"
            caption={
              '"Pikachu Illustrator" is the rarest Pokémon card (39 copies worldwide). But it isn\'t hard: Nintendo could easily print thousands of identical "Pikachu Illustrator" cards if they wanted to.'
            }
          />
        </>
      ),
    },
    {
      key: "hardness",
      title: fr ? "Dureté monétaire" : "Monetary hardness",
      summary: fr
        ? "La résistance de la monnaie à la production de nouvelles unités."
        : "How much a currency resists the production of new units.",
      icon: Mountain,
      accentText: colors.amber.text.secondary,
      accentBorder: colors.amber.border.secondary,
      body: fr ? (
        <>
          <p>
            <i>
              « Si l'on augmente la production d'une monnaie, est-ce que l'offre va suivre cette
              demande ? » Si la réponse est non, alors cette monnaie est dure.
            </i>
          </p>
          <Illustration
            src={petrole}
            alt="Pétrole brut"
            width="18rem"
            margin="0.4rem auto 0"
            caption="Le pétrole n'est pas rare, les gisements abondent dans le monde. Pourtant, il est dur : même avec la meilleure volonté, doubler la production annuelle est impossible à court terme."
          />
        </>
      ) : (
        <>
          <p>
            <i>
              "If we crank up production of a currency, will supply actually follow demand?" If the
              answer is no, then that currency is hard.
            </i>
          </p>
          <Illustration
            src={petrole}
            alt="Crude oil"
            width="18rem"
            margin="0.4rem auto 0"
            caption="Oil isn't rare - deposits are abundant around the world. Yet it's hard: even with the best intentions, doubling annual production in the short term is impossible."
          />
        </>
      ),
    },
  ];
};
