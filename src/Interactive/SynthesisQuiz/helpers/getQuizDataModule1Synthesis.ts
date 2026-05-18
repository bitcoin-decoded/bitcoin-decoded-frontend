import type { Language } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
import type { ChapterReference, SynthesisQuizData } from "../types";

const CHAPTERS = {
  moneyOrigin: { routeId: ROUTE_NAME.Banking_1, labelKey: "nav.tree.moneyOrigin" },
  twoLevels: { routeId: ROUTE_NAME.Banking_2, labelKey: "nav.tree.twoLevels" },
  qe: { routeId: ROUTE_NAME.Banking_3, labelKey: "nav.tree.qe" },
  brokenEngine: { routeId: ROUTE_NAME.Banking_4, labelKey: "nav.tree.brokenEngine" },
  cantillon: { routeId: ROUTE_NAME.Banking_5, labelKey: "nav.tree.cantillon" },
  inflation: { routeId: ROUTE_NAME.Banking_6, labelKey: "nav.tree.inflation" },
} as const satisfies Record<string, ChapterReference>;

export const getQuizDataModule1Synthesis = (language: Language): SynthesisQuizData => {
  const fr = language === "fr";

  return {
    passThreshold: 10,
    questions: [
      {
        question: fr
          ? "Quelle proportion de la monnaie en circulation est créée par les banques commerciales ?"
          : "What share of the money in circulation is created by commercial banks?",
        chapterRefs: [CHAPTERS.moneyOrigin],
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
        chapterRefs: [CHAPTERS.moneyOrigin],
        answers: [
          {
            text: fr
              ? "a) Elle reçoit de la M0 de la Banque Centrale, puis la reprête à ses clients en gardant une marge au passage"
              : "a) It receives M0 from the Central Bank, then re-lends it to its customers while pocketing a margin along the way",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Elle puise dans les dépôts existants de ses autres clients pour les prêter à de nouveaux emprunteurs"
              : "b) It dips into the existing deposits of its other customers to lend them to new borrowers",
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
        chapterRefs: [CHAPTERS.moneyOrigin],
        answers: [
          {
            text: fr
              ? "a) Un actif, car le client doit rembourser cet argent à la banque"
              : "a) An asset, because the customer must repay this money to the bank",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un passif, puisque la banque doit cet argent au client qui le lui a emprunté"
              : "b) A liability, since the bank owes this money to the customer who borrowed it",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Un élément de capitaux propres, puisque le prêt accordé enrichit la banque dès sa signature"
              : "c) An equity item, since the loan granted enriches the bank from the moment it is signed",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce qui distingue la monnaie M0 de la monnaie M2 ?"
          : "What distinguishes M0 money from M2 money?",
        chapterRefs: [CHAPTERS.twoLevels],
        answers: [
          {
            text: fr
              ? "a) La M0 désigne uniquement les pièces et billets physiques, la M2 désigne uniquement l'argent qui circule par virement ou carte bancaire"
              : "a) M0 refers only to physical coins and notes; M2 refers only to money moving via transfers or bank cards",
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
              ? "c) La M0 est garantie par l'État via le Fonds de Garantie des Dépôts, la M2 ne bénéficie d'aucune protection"
              : "c) M0 is guaranteed by the State through the Deposit Guarantee Fund; M2 has no protection at all",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "À quoi sert la compensation interbancaire ?"
          : "What is the purpose of interbank settlement?",
        chapterRefs: [CHAPTERS.twoLevels],
        answers: [
          {
            text: fr
              ? "a) À permettre aux banques de régler entre elles uniquement le solde net de leurs transactions, en monnaie M0"
              : "a) To let banks settle only the net balance of their transactions among themselves, in M0",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) À garantir les dépôts des clients en cas de faillite d'une banque, via un fonds commun alimenté quotidiennement"
              : "b) To guarantee customer deposits in case of bank failure, through a common fund replenished daily",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) À transférer chaque soir la M2 des comptes clients vers les coffres-forts numériques de la Banque Centrale"
              : "c) To transfer M2 every evening from customer accounts into the Central Bank's digital vaults",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quand Nicolas vire 200 000 € à Mme Michu (cliente d'une autre banque), que se passe-t-il concrètement en fin de journée ?"
          : "When Nicolas transfers €200,000 to Mrs. Michu (a customer of another bank), what actually happens at the end of the day?",
        chapterRefs: [CHAPTERS.twoLevels],
        answers: [
          {
            text: fr
              ? "a) La banque de Nicolas envoie directement 200 000 € en monnaie M2 aux serveurs de la banque de Mme Michu"
              : "a) Nicolas' bank directly sends €200,000 in M2 to the servers of Mrs. Michu's bank",
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
              ? "c) La Banque Centrale crédite directement le compte M2 de Mme Michu, en débitant celui de Nicolas par contrepartie"
              : "c) The Central Bank directly credits Mrs. Michu's M2 account, debiting Nicolas' account as a counterpart",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quelle est la cause principale qui peut amener une banque commerciale à manquer de M0 ?"
          : "What is the main cause that can leave a commercial bank short of M0?",
        chapterRefs: [CHAPTERS.qe],
        answers: [
          {
            text: fr
              ? "a) Une amende disciplinaire infligée par la Banque Centrale, qui ponctionne ses réserves pour sanctionner un mauvais comportement"
              : "a) A disciplinary fine from the Central Bank, draining its reserves to punish bad behaviour",
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
              ? "c) Un retrait massif de billets aux distributeurs par ses clients pris d'une soudaine fièvre du cash"
              : "c) A massive cash withdrawal by its customers, suddenly seized by an attack of cash fever",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que le Quantitative Easing ?" : "What is Quantitative Easing?",
        chapterRefs: [CHAPTERS.qe],
        answers: [
          {
            text: fr
              ? "a) Un programme de prêts à taux préférentiels accordés aux entreprises jugées stratégiques pour l'économie nationale"
              : "a) A program of preferential-rate loans granted to companies deemed strategic for the national economy",
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
              ? "c) Un dispositif d'assurance qui garantit les dépôts des particuliers en cas de faillite bancaire, financé par les cotisations des banques"
              : "c) An insurance scheme guaranteeing retail deposits in case of bank failure, funded by bank contributions",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Lorsque la Banque Centrale achète massivement des obligations, quel est l'effet mécanique sur leurs taux d'intérêt ?"
          : "When the Central Bank massively buys bonds, what is the mechanical effect on their interest rates?",
        chapterRefs: [CHAPTERS.brokenEngine],
        answers: [
          {
            text: fr
              ? "a) Les taux montent, car cette ruée sur les obligations signale aux investisseurs qu'elles sont devenues plus risquées"
              : "a) Rates rise, because this rush on bonds signals to investors that they have become riskier",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Les taux restent stables, parce que le coupon de chaque obligation est contractuellement fixe et ne peut pas bouger"
              : "b) Rates stay stable, because the coupon of each bond is contractually fixed and cannot move",
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
        chapterRefs: [CHAPTERS.brokenEngine],
        answers: [
          {
            text: fr
              ? "a) Principalement en facturant des frais de tenue de compte, de carte bancaire et de découvert à ses clients particuliers"
              : "a) Mainly by charging account-keeping, card and overdraft fees to its retail customers",
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
              ? "c) En revendant à profit sur les marchés financiers les obligations d'État qu'elle accumule patiemment dans son bilan"
              : "c) By selling at a profit on financial markets the government bonds it patiently piles up on its balance sheet",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi le Quantitative Easing « casse-t-il le moteur » des banques commerciales ?"
          : 'Why does Quantitative Easing "break the engine" of commercial banks?',
        chapterRefs: [CHAPTERS.brokenEngine],
        answers: [
          {
            text: fr
              ? "a) Il écrase les taux à long terme et réduit la marge des banques, rendant le financement de l'économie productive trop peu rentable face au risque"
              : "a) It crushes long-term rates and shrinks bank margins, making productive-economy lending too unprofitable relative to its risk",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Il oblige les banques à immobiliser des montagnes de réserves M0 inutilisées, qui dorment sur leur bilan sans rapporter un centime"
              : "b) It forces banks to lock up mountains of unused M0 reserves, sleeping on their balance sheet without earning a cent",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Il interdit explicitement aux banques de prêter à long terme tant que les obligations d'État rachetées par la Banque Centrale ne sont pas revendues"
              : "c) It explicitly forbids banks from lending long term until the government bonds bought back by the Central Bank are resold",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Face à un entrepreneur (projet risqué, peu de garanties) et un investisseur qui achète des actions en nantissant son portefeuille existant, pourquoi la banque privilégie-t-elle aujourd'hui le second ?"
          : "Between an entrepreneur (risky project, few guarantees) and an investor who buys stocks while pledging their existing portfolio as collateral, why does the bank now favor the latter?",
        chapterRefs: [CHAPTERS.brokenEngine, CHAPTERS.cantillon],
        answers: [
          {
            text: fr
              ? "a) Parce que les nouvelles réglementations bancaires interdisent désormais le financement d'entrepreneurs ne disposant pas d'un apport personnel suffisant"
              : "a) Because new banking regulations now forbid financing entrepreneurs who do not have sufficient personal equity",
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
              ? "c) Parce que les investisseurs financiers sont contractuellement obligés de payer des taux d'intérêt plus élevés que les entrepreneurs porteurs de projets"
              : "c) Because financial investors are contractually obliged to pay higher interest rates than project-bearing entrepreneurs",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que l'Effet Cantillon ?" : "What is the Cantillon Effect?",
        chapterRefs: [CHAPTERS.cantillon],
        answers: [
          {
            text: fr
              ? "a) Le phénomène par lequel l'argent nouvellement créé profite d'abord à ceux qui détiennent déjà des actifs, avant de ruisseler vers le reste de l'économie"
              : "a) The phenomenon whereby newly created money first benefits those who already hold assets, before trickling down to the rest of the economy",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) La théorie économique selon laquelle toute inflation se répartit uniformément et instantanément dans l'ensemble de l'économie, sans favoriser aucun acteur"
              : "b) The economic theory that any inflation spreads uniformly and instantly across the whole economy, favouring no single actor",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Le mécanisme par lequel la Banque Centrale calibre son taux directeur en fonction des écarts d'inflation observés entre régions"
              : "c) The mechanism by which the Central Bank calibrates its policy rate based on observed inflation gaps between regions",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Comment l'argent créé par le crédit bancaire finit-il par atteindre l'économie réelle ?"
          : "How does money created by bank credit eventually reach the real economy?",
        chapterRefs: [CHAPTERS.inflation],
        answers: [
          {
            text: fr
              ? "a) Par la fiscalité : l'État prélève l'impôt sur les plus-values des détenteurs d'actifs et le redistribue aux ménages modestes"
              : "a) Through taxation: the State levies tax on the capital gains of asset holders and redistributes it to lower-income households",
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
              ? "c) Par la Banque Centrale, qui transfère directement chaque trimestre une fraction de la M0 sur les comptes courants des ménages"
              : "c) Through the Central Bank, which directly transfers a fraction of M0 each quarter into household current accounts",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi l'inflation des prix de consommation finit-elle par apparaître ?"
          : "Why does consumer price inflation eventually appear?",
        chapterRefs: [CHAPTERS.inflation],
        answers: [
          {
            text: fr
              ? "a) Parce que les coûts de production des entreprises augmentent mécaniquement chaque année, indépendamment de toute autre variable économique"
              : "a) Because companies' production costs mechanically rise each year, independently of any other economic variable",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce que les banques commerciales décident, à intervalles réguliers, d'augmenter leurs marges sur les prêts accordés à l'économie"
              : "b) Because commercial banks decide, at regular intervals, to widen their margins on loans granted to the economy",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Parce que la quantité de monnaie en circulation augmente plus vite que la quantité de biens et services produits"
              : "c) Because the amount of money in circulation rises faster than the quantity of goods and services produced",
            isCorrect: true,
          },
        ],
      },
    ],
  };
};
