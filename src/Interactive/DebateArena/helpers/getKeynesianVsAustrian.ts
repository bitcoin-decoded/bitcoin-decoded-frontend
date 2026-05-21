import type { Language } from "../../../I18n";
import type { DebateItem } from "../types";

export const getKeynesianVsAustrian = (language: Language): DebateItem[] => {
  const fr = language === "fr";
  return [
    {
      topic: fr ? "Comment vérifier une théorie ?" : "How do you verify a theory?",
      sides: [
        {
          school: fr ? "Keynésien" : "Keynesian",
          argument: fr
            ? "On regarde les données passées. Si les chiffres confirment l'hypothèse, alors la théorie est validée jusqu'à preuve du contraire."
            : "You look at past data. If the numbers back the hypothesis, the theory holds up until proven otherwise.",
        },
        {
          school: fr ? "Autrichien" : "Austrian",
          argument: fr
            ? "On part d'une vérité logique indiscutable et on en déduit le reste. Ce qui est logiquement vrai ne dépend pas des données : c'est vrai partout et tout le temps."
            : "You start from a premise treated as indisputable and deduce the rest. What's logically true doesn't depend on data: it holds everywhere, all the time.",
        },
      ],
    },
    {
      topic: fr ? "L'inflation après 2008" : "Inflation after 2008",
      sides: [
        {
          school: fr ? "Le Keynésien" : "The Keynesian",
          argument: fr
            ? "Nous avons injecté des milliards de liquidités et l'indice des prix (le pain, le lait, ...) n'a pas explosé. Donc, imprimer de la monnaie ne provoque pas d'inflation."
            : "We injected billions in liquidity and the price index (bread, milk, that kind of thing) didn't blow up. So, printing money doesn't cause inflation.",
        },
        {
          school: fr ? "L'Autrichien" : "The Austrian",
          argument: fr
            ? "L'inflation ne se limite pas au prix du pain. Une grande partie de la monnaie créée s'est reflétée dans l'immobilier et la bourse, sur des actifs que les principaux indices d'inflation ne mesurent pas."
            : "Inflation isn't just about the price of bread. A large share of the newly created money showed up in real estate and the stock market, on assets the main inflation indexes don't even track.",
        },
      ],
    },
  ];
};
