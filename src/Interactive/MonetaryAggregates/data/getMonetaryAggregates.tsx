import { Building2, ShoppingCart } from "lucide-react";

import type { THEME_COLORS } from "../../../Design";
import type { ExpandableTerm } from "../../ExpandableDefinitions";

type Language = "fr" | "en";
type ThemeColors = (typeof THEME_COLORS)["dark"];

export const getMonetaryAggregates = (
  language: Language,
  colors: ThemeColors,
): ExpandableTerm[] => {
  const fr = language === "fr";

  return [
    {
      key: "m2",
      title: fr ? "Monnaie M2" : "M2 money",
      summary: fr
        ? "L'argent que tu utilises tous les jours, créé par les banques commerciales."
        : "The money you use every day, created by commercial banks.",
      icon: ShoppingCart,
      accentText: colors.semantic.info.text,
      accentBorder: colors.semantic.info.border,
      body: fr ? (
        <>
          <p>
            <i>
              L'essentiel est créé non pas par la Banque Centrale, mais par les banques commerciales
              quand elles accordent des crédits.
            </i>
          </p>
          <p>
            <i>
              Quand on paie nos courses, notre essence, notre shopping ou encore quand on achète
              quelques cryptos parce qu'on ne sait jamais…
            </i>
          </p>
        </>
      ) : (
        <>
          <p>
            <i>
              Most of it is created not by the Central Bank, but by commercial banks when they hand
              out loans.
            </i>
          </p>
          <p>
            <i>
              When we pay for groceries, gas, a bit of shopping, or grab some crypto just in case
              you never know…
            </i>
          </p>
        </>
      ),
    },
    {
      key: "m0",
      title: fr ? "Monnaie M0" : "M0 money",
      summary: fr
        ? "La monnaie émise par la Banque Centrale, dont les réserves interbancaires."
        : "The money issued by the Central Bank, including interbank reserves.",
      icon: Building2,
      accentText: colors.amber.text.secondary,
      accentBorder: colors.amber.border.secondary,
      body: fr ? (
        <>
          <p>
            <i>
              Les billets dans ton portefeuille en font partie. Mais le gros morceau, ce sont les
              réserves : la monnaie que les banques commerciales utilisent entre elles pour régler
              leurs dettes mutuelles.
            </i>
          </p>
          <p>
            <i>
              Nous verrons juste après comment elles utilisent cet argent M0 pour régler leurs
              dettes nettes issues de toutes les transactions M2 de la journée.
            </i>
          </p>
        </>
      ) : (
        <>
          <p>
            <i>
              The notes in your wallet are part of it. But the big chunk is the reserves: the money
              commercial banks use among themselves to settle what they owe each other.
            </i>
          </p>
          <p>
            <i>
              We'll see in a moment how they use this M0 money to settle the net debts left over
              from all the day's M2 transactions.
            </i>
          </p>
        </>
      ),
    },
  ];
};
