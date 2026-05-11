import type { Language } from "../../I18n";
import { ROUTE_NAME } from "../../Routing";
import type {
  ChapterReference,
  SynthesisQuizData,
} from "../types/SynthesisQuizData";

const CHAPTERS = {
  whatIsMoney: { routeId: ROUTE_NAME.MoneyLaws_1, labelKey: "nav.tree.whatIsMoney" },
  economicCycles: { routeId: ROUTE_NAME.MoneyLaws_2, labelKey: "nav.tree.economicCycles" },
  socialismProblem: {
    routeId: ROUTE_NAME.MoneyLaws_3,
    labelKey: "nav.tree.socialismProblem",
  },
  austrianMethod: { routeId: ROUTE_NAME.MoneyLaws_4, labelKey: "nav.tree.austrianMethod" },
} as const satisfies Record<string, ChapterReference>;

export const getQuizDataModule2Synthesis = (language: Language): SynthesisQuizData => {
  const fr = language === "fr";

  return {
    passThreshold: 10,
    questions: [
      {
        question: fr
          ? "Pourquoi la monnaie a-t-elle été inventée historiquement ?"
          : "Why was money invented historically?",
        chapterRefs: [CHAPTERS.whatIsMoney],
        answers: [
          {
            text: fr
              ? "a) Pour permettre aux États de prélever l'impôt plus efficacement"
              : "a) To allow States to collect taxes more efficiently",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Pour dépasser les limites biologiques de la mémoire humaine au-delà d'environ 150 personnes"
              : "b) To overcome the biological limits of human memory beyond about 150 people",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Pour remplacer le troc, jugé trop inefficace"
              : "c) To replace barter, deemed too inefficient",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quelle est la différence entre rareté monétaire et dureté monétaire ?"
          : "What is the difference between monetary scarcity and monetary hardness?",
        chapterRefs: [CHAPTERS.whatIsMoney],
        answers: [
          {
            text: fr
              ? "a) La rareté concerne la quantité existante à l'instant T, la dureté concerne la résistance à la production de nouvelles unités"
              : "a) Scarcity refers to the quantity existing at a given time, hardness refers to the resistance to producing new units",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) La rareté est une propriété physique, la dureté est une propriété juridique"
              : "b) Scarcity is a physical property, hardness is a legal property",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Ce sont deux mots qui désignent la même chose"
              : "c) They are two words that mean the same thing",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Parmi ces cinq propriétés, laquelle ne fait PAS partie des piliers d'une bonne monnaie ?"
          : "Among these five properties, which is NOT one of the pillars of sound money?",
        chapterRefs: [CHAPTERS.whatIsMoney],
        answers: [
          {
            text: fr
              ? "a) Durabilité, portabilité, divisibilité"
              : "a) Durability, portability, divisibility",
            isCorrect: false,
          },
          {
            text: fr ? "b) Fongibilité, dureté" : "b) Fungibility, hardness",
            isCorrect: false,
          },
          {
            text: fr ? "c) Liquidité, rentabilité" : "c) Liquidity, profitability",
            isCorrect: true,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi les cauris et les pierres de Raï ont-ils cessé d'être utilisés comme monnaies ?"
          : "Why did cowries and Rai stones stop being used as money?",
        chapterRefs: [CHAPTERS.whatIsMoney],
        answers: [
          {
            text: fr
              ? "a) Parce que les autorités locales les ont officiellement interdits"
              : "a) Because local authorities officially banned them",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce que de nouvelles technologies ont rendu leur production ou leur collecte beaucoup plus facile, faisant chuter leur dureté"
              : "b) Because new technologies made their production or collection much easier, collapsing their hardness",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Parce qu'ils étaient trop fragiles physiquement et finissaient par se détériorer"
              : "c) Because they were too physically fragile and eventually deteriorated",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi l'or, malgré ses qualités, n'est-il plus utilisé comme monnaie d'échange au quotidien ?"
          : "Why is gold, despite its qualities, no longer used as everyday exchange money?",
        chapterRefs: [CHAPTERS.whatIsMoney],
        answers: [
          {
            text: fr
              ? "a) Parce que sa production est devenue trop facile avec les techniques minières modernes"
              : "a) Because its production has become too easy with modern mining techniques",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce qu'il est trop lourd, peu divisible et difficile à auditer pour les paiements courants"
              : "b) Because it is too heavy, hardly divisible, and difficult to audit for everyday payments",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Parce que les États en ont officiellement interdit l'usage entre particuliers"
              : "c) Because States have officially banned its use between individuals",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que la préférence temporelle ?" : "What is time preference?",
        chapterRefs: [CHAPTERS.economicCycles],
        answers: [
          {
            text: fr
              ? "a) La tendance d'un individu à privilégier la consommation présente plutôt que la consommation future"
              : "a) An individual's tendency to favor present consumption over future consumption",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Le temps moyen qu'un investisseur conserve un actif avant de le revendre"
              : "b) The average time an investor holds an asset before reselling it",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) La durée légale d'un contrat de prêt bancaire"
              : "c) The legal duration of a bank loan contract",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Dans une économie saine, quel rôle joue le taux d'intérêt ?"
          : "In a healthy economy, what role does the interest rate play?",
        chapterRefs: [CHAPTERS.economicCycles],
        answers: [
          {
            text: fr
              ? "a) Il est fixé par la Banque Centrale pour piloter l'inflation"
              : "a) It is set by the Central Bank to steer inflation",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Il reflète l'épargne réelle disponible et sert de signal aux entrepreneurs sur les projets qu'il est possible de lancer"
              : "b) It reflects the real available savings and serves as a signal to entrepreneurs about which projects can be launched",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Il représente la marge de profit garantie aux banques commerciales"
              : "c) It represents the profit margin guaranteed to commercial banks",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce qu'un détour de production ?" : "What is a roundabout production process?",
        chapterRefs: [CHAPTERS.economicCycles],
        answers: [
          {
            text: fr
              ? "a) Une étape intermédiaire qui consiste à fabriquer des outils ou des biens de capital pour produire ensuite plus efficacement"
              : "a) An intermediate step that consists of building tools or capital goods to then produce more efficiently",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un délai administratif imposé par la réglementation entre la commande et la livraison"
              : "b) An administrative delay imposed by regulation between order and delivery",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Une perte de temps causée par un mauvais choix logistique"
              : "c) A waste of time caused by a poor logistical choice",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Que se passe-t-il quand les banques injectent des liquidités et maintiennent les taux artificiellement bas ?"
          : "What happens when banks inject liquidity and keep rates artificially low?",
        chapterRefs: [CHAPTERS.economicCycles],
        answers: [
          {
            text: fr
              ? "a) L'épargne réelle augmente mécaniquement, ce qui finance davantage de projets"
              : "a) Real savings mechanically increase, financing more projects",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Les entrepreneurs reçoivent un faux signal et se lancent dans des projets que les ressources réelles ne permettent pas de terminer : c'est le malinvestissement"
              : "b) Entrepreneurs receive a false signal and launch projects that real resources cannot complete: that's malinvestment",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Rien de particulier : les taux finissent toujours par s'ajuster naturellement sans conséquence"
              : "c) Nothing particular: rates always end up adjusting naturally without consequence",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Que nous apprend le test de Robinson Crusoé sur l'épargne et l'investissement ?"
          : "What does the Robinson Crusoe test teach us about savings and investment?",
        chapterRefs: [CHAPTERS.economicCycles],
        answers: [
          {
            text: fr
              ? "a) Que l'épargne est inutile tant qu'on a la volonté de réussir un projet"
              : "a) That savings are useless as long as one has the will to succeed in a project",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Que l'épargne précède toujours l'investissement : on ne peut pas construire un outil sans avoir d'abord constitué les réserves nécessaires pour survivre pendant sa fabrication"
              : "b) That savings always precede investment: you cannot build a tool without first setting aside the reserves needed to survive while making it",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Que l'investissement est plus important que l'épargne dans une économie moderne"
              : "c) That investment is more important than savings in a modern economy",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Selon Ludwig von Mises, pourquoi le calcul économique est-il impossible en régime socialiste ?"
          : "According to Ludwig von Mises, why is economic calculation impossible under socialism?",
        chapterRefs: [CHAPTERS.socialismProblem],
        answers: [
          {
            text: fr
              ? "a) Parce que les planificateurs manquent généralement de compétences techniques"
              : "a) Because planners generally lack technical skills",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce que sans marché libre, il n'y a pas de prix, et sans prix, il n'existe pas de dénominateur commun pour comparer le coût social des ressources entre elles"
              : "b) Because without a free market there are no prices, and without prices there is no common denominator to compare the social cost of resources",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Parce que les citoyens d'un régime socialiste refusent de travailler efficacement"
              : "c) Because citizens under a socialist regime refuse to work efficiently",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quel rôle joue l'entrepreneur dans un système de prix de marché ?"
          : "What role does the entrepreneur play in a market price system?",
        chapterRefs: [CHAPTERS.socialismProblem],
        answers: [
          {
            text: fr
              ? "a) Il transmet passivement les prix fixés par les autorités aux consommateurs"
              : "a) They passively pass on the prices set by authorities to consumers",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Il crée de l'information économique en pariant son capital sur l'allocation des ressources : s'il a raison il gagne, s'il se trompe il fait faillite"
              : "b) They create economic information by betting their capital on the allocation of resources: if they're right they win, if they're wrong they go bankrupt",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Il exécute les plans de production définis en amont par les ingénieurs"
              : "c) They execute production plans defined upstream by engineers",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quelle est la différence fondamentale entre la manipulation monétaire et la planification socialiste ?"
          : "What is the fundamental difference between monetary manipulation and socialist planning?",
        chapterRefs: [CHAPTERS.economicCycles, CHAPTERS.socialismProblem],
        answers: [
          {
            text: fr
              ? "a) La manipulation monétaire fausse la boussole des prix, alors que la planification socialiste supprime totalement cette boussole"
              : "a) Monetary manipulation distorts the compass of prices, whereas socialist planning removes that compass entirely",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Les deux ont exactement les mêmes effets sur l'économie"
              : "b) Both have exactly the same effects on the economy",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) La manipulation monétaire est légale, la planification socialiste ne l'est pas"
              : "c) Monetary manipulation is legal, socialist planning is not",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi Hayek critique-t-il le « scientisme » en économie ?"
          : "Why does Hayek criticize \"scientism\" in economics?",
        chapterRefs: [CHAPTERS.austrianMethod],
        answers: [
          {
            text: fr
              ? "a) Parce que les économistes n'ont pas assez recours aux mathématiques"
              : "a) Because economists do not rely enough on mathematics",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce qu'appliquer les méthodes des sciences dures à l'action humaine est inadapté : la société n'est pas un laboratoire isolable, et les humains modifient leur comportement en apprenant"
              : "b) Because applying hard-science methods to human action is unsuitable: society is not an isolable laboratory, and humans change their behavior as they learn",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Parce que la science est trop neutre politiquement pour étudier l'économie"
              : "c) Because science is too politically neutral to study economics",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quel est l'axiome praxéologique sur lequel repose toute la pensée autrichienne ?"
          : "What is the praxeological axiom on which all Austrian thought is built?",
        chapterRefs: [CHAPTERS.austrianMethod],
        answers: [
          {
            text: fr
              ? "a) Toute monnaie tend naturellement vers la stabilité"
              : "a) All money naturally tends toward stability",
            isCorrect: false,
          },
          {
            text: fr ? "b) L'être humain agit dans un but" : "b) Human beings act with a purpose",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Les marchés sont toujours efficients à long terme"
              : "c) Markets are always efficient in the long run",
            isCorrect: false,
          },
        ],
      },
    ],
  };
};
