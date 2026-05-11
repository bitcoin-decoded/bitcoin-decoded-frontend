import type { Language } from "../../I18n";
import type { SynthesisQuizData } from "../types/SynthesisQuizData";

export const getQuizDataModule1Synthesis = (language: Language): SynthesisQuizData => {
  const fr = language === "fr";

  const chapters = {
    moneyOrigin: fr ? "D'où vient vraiment ton argent ?" : "Where does your money really come from?",
    twoEuros: fr ? "Les deux euros que tu ignores" : "The two euros you never knew about",
    nuclearWeapon: fr
      ? "L'arme nucléaire des banques centrales"
      : "The central banks' nuclear weapon",
    brokenEngine: fr ? "Qui a cassé le moteur ?" : "Who broke the engine?",
    moneyGoesToMoney: fr ? "Pourquoi l'argent va à l'argent" : "Why money goes to money",
    baguette: fr ? "Pourquoi ta baguette coûte plus cher" : "Why your baguette costs more",
  } as const;

  return {
    passThreshold: 10,
    questions: [
      {
        question: fr
          ? "Quelle proportion de la monnaie en circulation est créée par les banques commerciales ?"
          : "What share of the money in circulation is created by commercial banks?",
        chapterRef: chapters.moneyOrigin,
        answers: [
          { text: fr ? "a) Environ 50 %" : "a) About 50%", isCorrect: false },
          { text: fr ? "b) Plus de 95 %" : "b) More than 95%", isCorrect: true },
          { text: fr ? "c) Environ 75 %" : "c) About 75%", isCorrect: false },
        ],
      },
      {
        question: fr
          ? "Comment une banque commerciale crée-t-elle de l'argent ?"
          : "How does a commercial bank create money?",
        chapterRef: chapters.moneyOrigin,
        answers: [
          {
            text: fr
              ? "a) Elle reçoit de la monnaie M0 de la Banque Centrale puis la prête à ses clients"
              : "a) It receives M0 from the Central Bank and lends it to its customers",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Elle prête une partie des dépôts existants de ses autres clients"
              : "b) It lends out part of the existing deposits of its other customers",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Elle inscrit une simple écriture comptable lorsqu'elle accorde un prêt"
              : "c) It records a simple accounting entry when it grants a loan",
            isCorrect: true,
          },
        ],
      },
      {
        question: fr
          ? "Dans le bilan comptable d'une banque, une créance sur un client est :"
          : "On a bank's balance sheet, a claim on a customer is:",
        chapterRef: chapters.moneyOrigin,
        answers: [
          {
            text: fr
              ? "a) Un actif, car le client doit rembourser cet argent à la banque"
              : "a) An asset, because the customer must repay this money to the bank",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un passif, car la banque doit cet argent au client"
              : "b) A liability, because the bank owes this money to the customer",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Un capital propre, car cela appartient à la banque"
              : "c) Equity, because it belongs to the bank",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce qui distingue la monnaie M0 de la monnaie M2 ?"
          : "What distinguishes M0 money from M2 money?",
        chapterRef: chapters.twoEuros,
        answers: [
          {
            text: fr
              ? "a) La M0 est physique (pièces et billets), la M2 est numérique"
              : "a) M0 is physical (coins and notes), M2 is digital",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) La M0 est émise par la Banque Centrale et réservée aux échanges entre banques, la M2 circule entre particuliers et entreprises"
              : "b) M0 is issued by the Central Bank and reserved for inter-bank settlements; M2 circulates between individuals and businesses",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) La M0 est garantie par l'État, la M2 ne l'est pas"
              : "c) M0 is guaranteed by the State, M2 is not",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "À quoi sert la compensation interbancaire ?"
          : "What is the purpose of interbank settlement?",
        chapterRef: chapters.twoEuros,
        answers: [
          {
            text: fr
              ? "a) À permettre aux banques de régler entre elles uniquement le solde net de leurs transactions, en monnaie M0"
              : "a) To let banks settle only the net balance of their transactions among themselves, in M0",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) À garantir les dépôts des clients en cas de faillite d'une banque"
              : "b) To guarantee customer deposits in case of a bank failure",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) À transférer la M2 des comptes clients vers les réserves de la Banque Centrale"
              : "c) To transfer M2 from customer accounts to Central Bank reserves",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quand Nicolas vire 200 000 € à Mme Michu (cliente d'une autre banque), que se passe-t-il concrètement en fin de journée ?"
          : "When Nicolas transfers €200,000 to Mrs. Michu (a customer of another bank), what actually happens at the end of the day?",
        chapterRef: chapters.twoEuros,
        answers: [
          {
            text: fr
              ? "a) La banque de Nicolas transfère 200 000 € en M2 à la banque de Mme Michu"
              : "a) Nicolas' bank transfers €200,000 in M2 to Mrs. Michu's bank",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) La banque de Nicolas utilise ses réserves M0 pour régler sa dette envers la banque de Mme Michu"
              : "b) Nicolas' bank uses its M0 reserves to settle its debt to Mrs. Michu's bank",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) La Banque Centrale crédite directement le compte M2 de Mme Michu"
              : "c) The Central Bank directly credits Mrs. Michu's M2 account",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quelle est la cause principale qui peut amener une banque commerciale à manquer de M0 ?"
          : "What is the main cause that can leave a commercial bank short of M0?",
        chapterRef: chapters.nuclearWeapon,
        answers: [
          {
            text: fr
              ? "a) Une amende infligée par la Banque Centrale qui ponctionne ses réserves"
              : "a) A fine from the Central Bank that drains its reserves",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Des défauts de paiement en cascade qui érodent son capital propre et provoquent une crise de confiance"
              : "b) Cascading payment defaults that erode its equity and trigger a loss of confidence",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Un retrait massif de billets aux distributeurs par ses clients"
              : "c) A massive withdrawal of cash from ATMs by its customers",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que le Quantitative Easing ?" : "What is Quantitative Easing?",
        chapterRef: chapters.nuclearWeapon,
        answers: [
          {
            text: fr
              ? "a) Un programme de prêts à taux préférentiels aux entreprises stratégiques"
              : "a) A program of preferential loans to strategic companies",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Une opération où la Banque Centrale rachète massivement des obligations détenues par les banques commerciales, en imprimant de la M0 sans contrepartie"
              : "b) An operation where the Central Bank massively buys back bonds held by commercial banks, printing M0 without counterpart",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Un mécanisme de garantie des dépôts des particuliers en cas de faillite bancaire"
              : "c) A mechanism to guarantee retail deposits in case of bank failure",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Lorsque la Banque Centrale achète massivement des obligations, quel est l'effet mécanique sur leurs taux d'intérêt ?"
          : "When the Central Bank massively buys bonds, what is the mechanical effect on their interest rates?",
        chapterRef: chapters.brokenEngine,
        answers: [
          {
            text: fr
              ? "a) Les taux montent, car la demande pour les obligations augmente"
              : "a) Rates rise, because demand for bonds increases",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Les taux restent stables, car le coupon de l'obligation est fixe"
              : "b) Rates stay stable, because the bond coupon is fixed",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Les taux baissent, car le prix de l'obligation monte alors que son coupon reste fixe"
              : "c) Rates fall, because the bond's price rises while its coupon stays fixed",
            isCorrect: true,
          },
        ],
      },
      {
        question: fr
          ? "Comment une banque commerciale gagne-t-elle traditionnellement de l'argent ?"
          : "How does a commercial bank traditionally make money?",
        chapterRef: chapters.brokenEngine,
        answers: [
          {
            text: fr
              ? "a) En facturant des frais de tenue de compte à ses clients"
              : "a) By charging account-keeping fees to its customers",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Sur l'écart entre les taux à long terme auxquels elle prête et les taux à court terme auxquels elle emprunte"
              : "b) On the spread between the long-term rates at which it lends and the short-term rates at which it borrows",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) En revendant à profit les obligations qu'elle détient"
              : "c) By reselling at a profit the bonds it holds",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi le Quantitative Easing « casse-t-il le moteur » des banques commerciales ?"
          : "Why does Quantitative Easing \"break the engine\" of commercial banks?",
        chapterRef: chapters.brokenEngine,
        answers: [
          {
            text: fr
              ? "a) Il écrase les taux à long terme et réduit la marge des banques, rendant le financement de l'économie productive trop peu rentable face au risque"
              : "a) It crushes long-term rates and shrinks bank margins, making productive-economy lending too unprofitable relative to its risk",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Il oblige les banques à conserver davantage de réserves M0 inutilisées"
              : "b) It forces banks to hold more unused M0 reserves",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Il interdit aux banques de prêter à long terme tant que les obligations d'État ne sont pas vendues"
              : "c) It forbids banks from lending long term until government bonds are sold",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Face à un entrepreneur (projet risqué, peu de garanties) et un investisseur (achat d'actions avec son portefeuille existant en nantissement), pourquoi la banque privilégie-t-elle aujourd'hui le second ?"
          : "Between an entrepreneur (risky project, few guarantees) and an investor (buying stocks with an existing portfolio as collateral), why does the bank now favor the latter?",
        chapterRef: `${chapters.brokenEngine} + ${chapters.moneyGoesToMoney}`,
        answers: [
          {
            text: fr
              ? "a) Parce que la réglementation interdit désormais le financement des entrepreneurs sans apport personnel"
              : "a) Because regulation now forbids financing entrepreneurs without personal equity",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce que le prêt est sécurisé par des actifs existants, donc à risque quasi nul, ce qui correspond à la nouvelle équation de survie des banques"
              : "b) Because the loan is secured by existing assets, so risk is near zero, which fits the banks' new survival equation",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Parce que les investisseurs paient des taux d'intérêt plus élevés que les entrepreneurs"
              : "c) Because investors pay higher interest rates than entrepreneurs",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que l'Effet Cantillon ?" : "What is the Cantillon Effect?",
        chapterRef: chapters.moneyGoesToMoney,
        answers: [
          {
            text: fr
              ? "a) Le phénomène par lequel l'argent nouvellement créé profite d'abord à ceux qui détiennent déjà des actifs, avant de ruisseler vers le reste de l'économie"
              : "a) The phenomenon whereby newly created money first benefits those who already hold assets, before trickling down to the rest of the economy",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) La théorie selon laquelle l'inflation se répartit uniformément dans toute l'économie"
              : "b) The theory that inflation spreads uniformly across the whole economy",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Le mécanisme par lequel la Banque Centrale fixe le taux directeur en fonction de l'inflation"
              : "c) The mechanism by which the Central Bank sets the policy rate based on inflation",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Comment l'argent créé par le crédit bancaire finit-il par atteindre l'économie réelle ?"
          : "How does money created by bank credit eventually reach the real economy?",
        chapterRef: chapters.baguette,
        answers: [
          {
            text: fr
              ? "a) Par la fiscalité : l'État prélève l'impôt sur les plus-values et le redistribue"
              : "a) Through taxation: the State levies tax on capital gains and redistributes it",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Par l'Effet de Richesse : les détenteurs d'actifs valorisés vendent une partie, dépensent en biens réels, et l'argent ruisselle de proche en proche"
              : "b) Through the Wealth Effect: holders of appreciated assets sell some, spend on real goods, and the money trickles outward step by step",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Par la Banque Centrale, qui transfère directement une partie de la M0 vers les comptes des ménages"
              : "c) Through the Central Bank, which directly transfers part of the M0 to household accounts",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi l'inflation des prix de consommation finit-elle par apparaître ?"
          : "Why does consumer price inflation eventually appear?",
        chapterRef: chapters.baguette,
        answers: [
          {
            text: fr
              ? "a) Parce que les coûts de production augmentent mécaniquement avec le temps"
              : "a) Because production costs mechanically rise over time",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce que les banques commerciales décident d'augmenter leurs marges sur les prêts"
              : "b) Because commercial banks decide to widen their loan margins",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Parce que la quantité de monnaie en circulation augmente massivement alors que la quantité de biens disponibles reste à peu près stable"
              : "c) Because the amount of money in circulation rises massively while the amount of available goods stays roughly stable",
            isCorrect: true,
          },
        ],
      },
    ],
  };
};
