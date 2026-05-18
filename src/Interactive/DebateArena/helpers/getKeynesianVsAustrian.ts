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
            : "We look at past data. If the numbers confirm the hypothesis, the theory is validated until proven otherwise.",
        },
        {
          school: fr ? "Autrichien" : "Austrian",
          argument: fr
            ? "On part d'une vérité logique indiscutable et on en déduit le reste. Ce qui est logiquement vrai ne dépend pas des données : c'est vrai partout et tout le temps."
            : "We start from an indisputable logical truth and deduce the rest. What is logically true does not depend on data: it holds everywhere and at all times.",
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
            : "We injected billions in liquidity and the price index (bread, milk, ...) didn't skyrocket. Therefore, printing money doesn't cause inflation.",
        },
        {
          school: fr ? "L'Autrichien" : "The Austrian",
          argument: fr
            ? "L'inflation ne se limite pas au prix du pain. La monnaie créée s'est déversée dans l'immobilier et la bourse, gonflant des bulles invisibles dans les statistiques officielles."
            : "Inflation isn't limited to the price of bread. The newly created money flowed into real estate and stocks, inflating bubbles invisible in official statistics.",
        },
      ],
    },
  ];
};
