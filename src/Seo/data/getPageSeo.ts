import type { Language } from "../../I18n";
import { ROUTE_NAME, type RouteName } from "../../Routing";
import type { PageSeo } from "../types";

const FR: Record<RouteName, PageSeo> = {
  [ROUTE_NAME.HomePage]: {
    title: "Comprendre l'argent, l'économie et Bitcoin",
    description:
      "Comprendre Bitcoin en partant du système bancaire et des lois de la monnaie. Un parcours interactif en trois modules, sans jargon, pour curieux non initiés.",
  },
  [ROUTE_NAME.Banking_1]: {
    title: "Création monétaire : comment les banques créent l'argent",
    description:
      "Plus de 90 % de ton argent n'a jamais été imprimé : il naît d'un crédit bancaire. Comment les banques créent la monnaie, expliqué pas à pas.",
  },
  [ROUTE_NAME.Banking_2]: {
    title: "Monnaie centrale et monnaie bancaire : les deux euros",
    description:
      "Un virement de 200 000 € sans qu'un seul billet ne bouge. Les deux monnaies qui coexistent dans le système : celle des banques entre elles, et la tienne.",
  },
  [ROUTE_NAME.Banking_3]: {
    title: "Assouplissement quantitatif : l'arme des banques centrales",
    description:
      "La banque centrale appuie sur un bouton et l'argent apparaît. L'assouplissement quantitatif (QE) expliqué simplement, et ce qu'il coûte réellement.",
  },
  [ROUTE_NAME.Banking_4]: {
    title: "Allocation du crédit : pourquoi ta banque préfère la pierre",
    description:
      "Pourquoi ta banque déroule le tapis rouge pour l'immobilier et fait la moue devant un vrai projet. Taux directeurs et allocation du crédit.",
  },
  [ROUTE_NAME.Banking_5]: {
    title: "Effet Cantillon : pourquoi l'argent va à l'argent",
    description:
      "Ceux qui reçoivent l'argent créé en premier achètent avant que les prix ne montent. L'effet Cantillon expliqué, et pourquoi il creuse les inégalités.",
  },
  [ROUTE_NAME.Banking_6]: {
    title: "Inflation : pourquoi la monnaie perd de sa valeur",
    description:
      "Tes courses augmentent, le CAC 40 bat des records, ton salaire suit. Où va vraiment l'argent créé ? L'inflation au-delà de l'indice des prix.",
  },
  [ROUTE_NAME.Banking_7]: {
    title: "Quiz : système bancaire et création monétaire",
    description:
      "Quinze questions pour vérifier ce que tu as retenu du module : création monétaire, assouplissement quantitatif, effet Cantillon et inflation.",
  },
  [ROUTE_NAME.MoneyLaws_1]: {
    title: "Qu'est-ce que la monnaie ? 5000 ans d'histoire monétaire",
    description:
      "Pourquoi adopte-t-on une monnaie, et pourquoi en abandonne-t-on une autre ? Cinq mille ans d'histoire monétaire et les propriétés qui font une bonne monnaie.",
  },
  [ROUTE_NAME.MoneyLaws_2]: {
    title: "Taux d'intérêt et préférence temporelle : le prix du temps",
    description:
      "La prospérité ne vient pas de ce qu'on dépense, mais de ce qu'on choisit de ne pas consommer tout de suite. Préférence temporelle, épargne et taux d'intérêt.",
  },
  [ROUTE_NAME.MoneyLaws_3]: {
    title: "Cycles économiques : pourquoi les crises reviennent",
    description:
      "Pourquoi les crises reviennent-elles toujours, malgré les leçons du passé ? La théorie autrichienne des cycles économiques, expliquée par la monnaie.",
  },
  [ROUTE_NAME.MoneyLaws_4]: {
    title: "Calcul économique : pourquoi les prix sont un savoir",
    description:
      "Combien d'acier la France doit-elle produire l'an prochain ? Le problème du calcul économique, et pourquoi les prix sont un savoir que rien ne remplace.",
  },
  [ROUTE_NAME.MoneyLaws_5]: {
    title: "École autrichienne : la méthode qui explique 2008",
    description:
      "En 2008, des milliers de milliards injectés sans explosion des prix. Mauvaise conclusion, surtout mauvaise méthode. Comment raisonne l'école autrichienne.",
  },
  [ROUTE_NAME.MoneyLaws_6]: {
    title: "Quiz : les lois de la monnaie",
    description:
      "Quinze questions pour valider le module : nature de la monnaie, préférence temporelle, cycles économiques et problème du calcul économique.",
  },
  [ROUTE_NAME.Bitcoin_1]: {
    title: "Comment fonctionne Bitcoin : logiciel, réseau et monnaie",
    description:
      "Bitcoin est trois choses à la fois : un logiciel, un réseau, une monnaie. Comment elles tiennent ensemble sans banque et sans personne aux commandes.",
  },
  [ROUTE_NAME.Bitcoin_2]: {
    title: "Pourquoi Bitcoin existe : le bloc genèse de 2009",
    description:
      "Janvier 2009 : un développeur anonyme grave un titre de presse dans le tout premier bloc. Pourquoi Bitcoin est né, et quel problème de confiance il résout.",
  },
  [ROUTE_NAME.Bitcoin_3]: {
    title: "Blockchain : comment fonctionne une chaîne de blocs",
    description:
      "Une blockchain est une chaîne de blocs, littéralement. La vraie question n'est pas ce que c'est, mais pourquoi c'est si difficile à falsifier.",
  },
  [ROUTE_NAME.Bitcoin_4]: {
    title: "Preuve de travail : se mettre d'accord sans chef",
    description:
      "Bitcoin consomme l'équivalent d'un pays en électricité. Absurde vu de loin, indispensable vu de près : la preuve de travail, et pourquoi elle doit coûter cher.",
  },
  [ROUTE_NAME.Bitcoin_5]: {
    title: "Halving : la récompense des mineurs et la dureté de Bitcoin",
    description:
      "Tous les quatre ans environ, la récompense des mineurs est divisée par deux. Le halving, l'émission de bitcoin et sa dureté monétaire inscrite dans le code.",
  },
  [ROUTE_NAME.Bitcoin_6]: {
    title: "Transactions et UTXO : Bitcoin ne déplace pas d'argent",
    description:
      "Une transaction Bitcoin ne fait pas voyager un objet numérique d'un portefeuille à l'autre. Comprendre les UTXO et ce qui circule réellement sur le réseau.",
  },
  [ROUTE_NAME.Bitcoin_7]: {
    title: "Clés privées et signatures : prouver sans se montrer",
    description:
      "Tes bitcoins sont posés derrière une serrure, et une seule clé l'ouvre. Clé privée, clé publique et signature numérique, expliquées sans une seule équation.",
  },
  [ROUTE_NAME.Bitcoin_8]: {
    title: "Portefeuille et seed : ni compte, ni coffre",
    description:
      "Un portefeuille Bitcoin ne contient pas de bitcoins. Ce que sont vraiment une seed, une adresse et un portefeuille, et pourquoi douze mots décident de tout.",
  },
  [ROUTE_NAME.Bitcoin_9]: {
    title: "Quiz : blockchain, minage et portefeuilles",
    description:
      "Vingt questions pour valider le module : blockchain, preuve de travail, halving, transactions, clés privées et portefeuilles.",
  },
  [ROUTE_NAME.GetStarted]: {
    title: "Acheter et détenir du bitcoin : entrer dans le terrier",
    description:
      "Acheter est l'étape facile. Détenir vraiment, c'est le vrai sujet. Comment acquérir du bitcoin et prendre la garde de tes propres clés.",
  },
  [ROUTE_NAME.Badges]: {
    title: "Tes badges",
    description:
      "Ta collection Bitcoin.Decoded : les chapitres terminés et les quiz de module validés, module par module.",
  },
  [ROUTE_NAME.NotFound]: {
    title: "Page introuvable",
    description: "Cette adresse ne mène nulle part. Le parcours, lui, est toujours là.",
  },
};

const EN: Record<RouteName, PageSeo> = {
  [ROUTE_NAME.HomePage]: {
    title: "Understanding money, economics and Bitcoin",
    description:
      "Understand Bitcoin starting from the banking system and the laws of money. An interactive three-module course, jargon free, for curious newcomers.",
  },
  [ROUTE_NAME.Banking_1]: {
    title: "Money creation: how banks create the money you use",
    description:
      "Over 90% of your money was never printed: it is born from a bank loan. How banks create money, explained step by step with a simulator.",
  },
  [ROUTE_NAME.Banking_2]: {
    title: "Central and commercial money: the two euros",
    description:
      "A 200,000 € transfer without a single banknote moving. The two kinds of money that coexist in the system: the one banks use, and yours.",
  },
  [ROUTE_NAME.Banking_3]: {
    title: "Quantitative easing: the central banks' weapon",
    description:
      "The central bank presses a button and money appears. Quantitative easing (QE) explained simply, and what it actually costs.",
  },
  [ROUTE_NAME.Banking_4]: {
    title: "Credit allocation: why your bank prefers real estate",
    description:
      "Why your bank rolls out the red carpet for real estate and frowns at a real project. Policy rates, collateral and credit allocation, without the jargon.",
  },
  [ROUTE_NAME.Banking_5]: {
    title: "Cantillon effect: why money flows to money",
    description:
      "Those who receive newly created money first buy before prices rise. The Cantillon effect explained, and why it widens inequality.",
  },
  [ROUTE_NAME.Banking_6]: {
    title: "Inflation: why money loses its value",
    description:
      "Your groceries climb, the stock market breaks records, your salary lags. Where does newly created money actually go? Inflation beyond the price index.",
  },
  [ROUTE_NAME.Banking_7]: {
    title: "Quiz: banking system and money creation",
    description:
      "Fifteen questions to check what you retained from the module: money creation, quantitative easing, the Cantillon effect and inflation.",
  },
  [ROUTE_NAME.MoneyLaws_1]: {
    title: "What is money? 5000 years of monetary history",
    description:
      "Why do we adopt one money and abandon another? Five thousand years of monetary history, and the properties that make a money good.",
  },
  [ROUTE_NAME.MoneyLaws_2]: {
    title: "Interest rates and time preference: the price of time",
    description:
      "Prosperity comes not from what we spend but from what we choose not to consume yet. Time preference, savings and the interest rate.",
  },
  [ROUTE_NAME.MoneyLaws_3]: {
    title: "Business cycles: why crises keep coming back",
    description:
      "Why do crises keep coming back despite every lesson of the past? The Austrian theory of the business cycle, explained through money.",
  },
  [ROUTE_NAME.MoneyLaws_4]: {
    title: "Economic calculation: why prices are knowledge",
    description:
      "How much steel should a country produce next year? The economic calculation problem, and why prices are knowledge nothing can replace.",
  },
  [ROUTE_NAME.MoneyLaws_5]: {
    title: "Austrian school: the method that explains 2008",
    description:
      "In 2008, trillions were injected with no price explosion. Wrong conclusion, and above all wrong method. How the Austrian school reasons.",
  },
  [ROUTE_NAME.MoneyLaws_6]: {
    title: "Quiz: the laws of money",
    description:
      "Fifteen questions to validate the module: the nature of money, time preference, business cycles and the economic calculation problem.",
  },
  [ROUTE_NAME.Bitcoin_1]: {
    title: "How Bitcoin works: software, network and money",
    description:
      "Bitcoin is three things at once: software, a network, a money. How they hold together with no bank, no government, and nobody in charge.",
  },
  [ROUTE_NAME.Bitcoin_2]: {
    title: "Why Bitcoin exists: the 2009 genesis block",
    description:
      "January 2009: an anonymous developer carves a newspaper headline into the very first block. Why Bitcoin was born, and which trust problem it solves.",
  },
  [ROUTE_NAME.Bitcoin_3]: {
    title: "Blockchain: how a chain of blocks works",
    description:
      "A blockchain is a chain of blocks, literally. The real question is not what it is, but why it is so hard to forge that nobody bothers.",
  },
  [ROUTE_NAME.Bitcoin_4]: {
    title: "Proof of work: agreeing without a leader",
    description:
      "Bitcoin consumes as much electricity as a country. Absurd from afar, essential up close: proof of work explained, and why it has to be expensive.",
  },
  [ROUTE_NAME.Bitcoin_5]: {
    title: "Halving: the mining reward and Bitcoin's hardness",
    description:
      "Roughly every four years, the miners' reward is cut in half. The halving, bitcoin issuance, and monetary hardness written into the code.",
  },
  [ROUTE_NAME.Bitcoin_6]: {
    title: "Transactions and UTXOs: Bitcoin doesn't move money",
    description:
      "A Bitcoin transaction does not send a digital object from one wallet to another. Understanding UTXOs and what actually travels across the network.",
  },
  [ROUTE_NAME.Bitcoin_7]: {
    title: "Private keys and signatures: proving without showing",
    description:
      "Your bitcoins sit behind a lock, and one key opens it. Private key, public key and digital signature, explained without a single equation.",
  },
  [ROUTE_NAME.Bitcoin_8]: {
    title: "Wallet and seed: neither account nor vault",
    description:
      "A Bitcoin wallet holds no bitcoins. What a seed, an address and a wallet really are, and why twelve words decide everything.",
  },
  [ROUTE_NAME.Bitcoin_9]: {
    title: "Quiz: blockchain, mining and wallets",
    description:
      "Twenty questions to validate the module: blockchain, proof of work, halving, transactions, private keys and wallets.",
  },
  [ROUTE_NAME.GetStarted]: {
    title: "Buying and holding bitcoin: down the rabbit hole",
    description:
      "Buying is the easy part. Actually holding is the real subject. How to acquire bitcoin and take custody of your own keys.",
  },
  [ROUTE_NAME.Badges]: {
    title: "Your badges",
    description:
      "Your Bitcoin.Decoded collection: chapters completed and module quizzes passed, module by module.",
  },
  [ROUTE_NAME.NotFound]: {
    title: "Page not found",
    description: "This address leads nowhere. The course, however, is still here.",
  },
};

export const getPageSeo = (route: RouteName, language: Language): PageSeo =>
  (language === "fr" ? FR : EN)[route];
