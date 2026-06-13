import type { Language } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
import type { ChapterReference, SynthesisQuizData } from "../types";

const CHAPTERS = {
  whatIsMoney: { routeId: ROUTE_NAME.MoneyLaws_1, labelKey: "nav.tree.whatIsMoney" },
  priceOfTime: { routeId: ROUTE_NAME.MoneyLaws_2, labelKey: "nav.tree.priceOfTime" },
  economicCycles: { routeId: ROUTE_NAME.MoneyLaws_3, labelKey: "nav.tree.economicCycles" },
  socialismProblem: {
    routeId: ROUTE_NAME.MoneyLaws_4,
    labelKey: "nav.tree.socialismProblem",
  },
  austrianMethod: { routeId: ROUTE_NAME.MoneyLaws_5, labelKey: "nav.tree.austrianMethod" },
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
              ? "a) Pour permettre aux États naissants de prélever l'impôt plus efficacement sur leurs populations"
              : "a) To allow emerging States to collect taxes more efficiently from their populations",
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
              ? "c) Pour remplacer le troc, jugé trop inefficace pour faire prospérer les civilisations agraires"
              : "c) To replace barter, deemed too inefficient to grow agrarian civilizations",
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
              ? "b) La rareté est une propriété physique du métal ou du bien, la dureté est une propriété strictement juridique encadrée par les autorités"
              : "b) Scarcity is a physical property of the metal or good, hardness is a strictly legal property framed by the authorities",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Ce sont deux synonymes : les économistes utilisent l'un ou l'autre indifféremment selon leur école de pensée"
              : "c) They are two synonyms: economists use one or the other interchangeably depending on their school of thought",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Parmi ces propositions, laquelle ne fait PAS partie des piliers d'une bonne monnaie ?"
          : "Among these proposals, which one is NOT a pillar of sound money?",
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
              ? "a) Parce que les autorités locales ont fini par les interdire officiellement au profit de monnaies métalliques plus modernes"
              : "a) Because local authorities eventually banned them officially in favour of more modern metal currencies",
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
              ? "c) Parce qu'ils étaient physiquement trop fragiles et finissaient par se détériorer au fil des manipulations quotidiennes"
              : "c) Because they were physically too fragile and ended up deteriorating through daily handling",
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
              ? "a) Parce que sa production est devenue trop facile depuis l'arrivée des techniques minières industrielles, faisant chuter sa dureté"
              : "a) Because its production has become too easy with industrial mining techniques, collapsing its hardness",
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
              ? "c) Parce que les États ont fini par interdire officiellement son usage entre particuliers dans la plupart des juridictions"
              : "c) Because States eventually banned its use between individuals in most jurisdictions",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que la préférence temporelle ?" : "What is time preference?",
        chapterRefs: [CHAPTERS.priceOfTime],
        answers: [
          {
            text: fr
              ? "a) La tendance d'un individu à privilégier la consommation présente plutôt que la consommation future"
              : "a) An individual's tendency to favor present consumption over future consumption",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Le temps moyen pendant lequel un investisseur conserve un actif financier avant de le revendre sur le marché"
              : "b) The average time an investor holds a financial asset before reselling it on the market",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) La durée légale maximale d'un contrat de prêt bancaire à taux fixe, fixée par le législateur"
              : "c) The maximum legal duration of a fixed-rate bank loan contract, set by the legislator",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Dans une économie saine, quel rôle joue le taux d'intérêt ?"
          : "In a healthy economy, what role does the interest rate play?",
        chapterRefs: [CHAPTERS.priceOfTime],
        answers: [
          {
            text: fr
              ? "a) Il est fixé chaque trimestre par la Banque Centrale pour piloter l'inflation en fonction des objectifs gouvernementaux"
              : "a) It is set every quarter by the Central Bank to steer inflation according to government targets",
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
              ? "c) Il représente la marge de profit minimale garantie aux banques commerciales par la réglementation prudentielle européenne"
              : "c) It represents the minimum profit margin guaranteed to commercial banks by European prudential regulation",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce qu'un détour de production ?"
          : "What is a roundabout production process?",
        chapterRefs: [CHAPTERS.priceOfTime],
        answers: [
          {
            text: fr
              ? "a) Une étape intermédiaire qui consiste à fabriquer des outils ou des biens de capital pour produire ensuite plus efficacement"
              : "a) An intermediate step that consists of building tools or capital goods to then produce more efficiently",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un délai administratif imposé par la réglementation européenne entre la commande d'un bien et sa livraison effective"
              : "b) An administrative delay imposed by European regulation between the order of a good and its actual delivery",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Une perte de temps causée par un mauvais choix logistique, comme un itinéraire mal optimisé entre deux entrepôts"
              : "c) A waste of time caused by a poor logistical choice, such as a badly optimised route between two warehouses",
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
              ? "a) L'épargne réelle augmente mécaniquement, ce qui finance davantage de projets dans l'économie productive"
              : "a) Real savings mechanically increase, financing more projects in the productive economy",
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
              ? "c) Rien de particulier ne se produit, car les taux finissent toujours par s'ajuster naturellement sans aucune conséquence durable"
              : "c) Nothing particular happens, since rates always end up adjusting naturally without any lasting consequence",
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
              ? "a) Que l'épargne est largement inutile dès lors qu'un individu fait preuve de la volonté nécessaire pour mener à bien son projet"
              : "a) That savings are largely useless as long as an individual shows the necessary will to carry through their project",
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
              ? "c) Que l'investissement productif compte davantage que l'épargne dans une économie moderne hautement financiarisée"
              : "c) That productive investment matters more than savings in a modern, highly financialised economy",
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
              ? "a) Parce que les planificateurs centraux manquent généralement des compétences techniques et de l'expérience industrielle nécessaires pour piloter une économie complexe"
              : "a) Because central planners generally lack the technical skills and industrial experience needed to steer a complex economy",
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
              ? "c) Parce que les citoyens d'un régime socialiste refusent collectivement de travailler avec sérieux, sabotant ainsi tout effort de planification"
              : "c) Because citizens under a socialist regime collectively refuse to work seriously, sabotaging any planning effort",
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
              ? "a) Il transmet passivement aux consommateurs les prix officiellement fixés par les autorités économiques compétentes"
              : "a) They passively pass on to consumers the prices officially set by the competent economic authorities",
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
              ? "c) Il se contente d'exécuter sur le terrain les plans de production définis en amont par les ingénieurs et les bureaux d'études"
              : "c) They merely execute on the ground the production plans defined upstream by engineers and design offices",
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
              ? "b) Les deux mécanismes ont en réalité exactement les mêmes effets sur l'économie : seuls les habillages politiques diffèrent"
              : "b) Both mechanisms actually have exactly the same effects on the economy: only the political wrapping differs",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) La manipulation monétaire est parfaitement légale et encadrée, alors que la planification socialiste a été condamnée par les traités internationaux"
              : "c) Monetary manipulation is perfectly legal and regulated, whereas socialist planning has been condemned by international treaties",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi Hayek critique-t-il le « scientisme » en économie ?"
          : 'Why does Hayek criticize "scientism" in economics?',
        chapterRefs: [CHAPTERS.austrianMethod],
        answers: [
          {
            text: fr
              ? "a) Parce que les économistes contemporains n'ont pas suffisamment recours aux mathématiques pour formaliser leurs théories"
              : "a) Because contemporary economists do not rely enough on mathematics to formalize their theories",
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
              ? "c) Parce que la science est, selon lui, trop neutre politiquement pour pouvoir étudier honnêtement les phénomènes économiques"
              : "c) Because science is, in his view, too politically neutral to honestly study economic phenomena",
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
