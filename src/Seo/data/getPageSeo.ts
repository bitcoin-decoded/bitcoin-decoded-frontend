import type { Language } from "../../I18n";
import { ROUTE_NAME, type RouteName } from "../../Routing";
import type { PageSeo } from "../types";

/**
 * Title and description for every route, in both languages.
 *
 * Titles are hybrid on purpose: the editorial title the chapter already carries,
 * extended with the term the page should be found on. `nav.tree.*` alone reads
 * well but contains none of the vocabulary anyone searches for, and the title is
 * the strongest on-page signal there is.
 *
 * Descriptions are written, not extracted. A meta description is a pitch aimed
 * at someone scanning a result page, which is a different job from a chapter's
 * opening paragraph.
 */
const FR: Record<RouteName, PageSeo> = {
  [ROUTE_NAME.HomePage]: {
    title: "Comprendre Bitcoin par l'économie autrichienne",
    description:
      "Comprendre Bitcoin en partant du système bancaire et des lois de la monnaie. Un parcours interactif en trois modules, sans jargon, pour curieux non initiés.",
  },
  [ROUTE_NAME.Banking_1]: {
    title: "D'où vient vraiment ton argent ? La création monétaire expliquée",
    description:
      "Plus de 90 % de ton argent n'a jamais été imprimé : il naît d'un crédit bancaire. Comment les banques créent la monnaie, expliqué pas à pas.",
  },
  [ROUTE_NAME.Banking_2]: {
    title: "Les deux euros que tu ignores : monnaie centrale et monnaie bancaire",
    description:
      "Un virement de 200 000 € sans qu'un seul billet ne bouge. Les deux monnaies qui coexistent dans le système : celle des banques entre elles, et la tienne.",
  },
  [ROUTE_NAME.Banking_3]: {
    title: "L'arme nucléaire des banques centrales : l'assouplissement quantitatif",
    description:
      "La banque centrale appuie sur un bouton et l'argent apparaît. L'assouplissement quantitatif (QE) expliqué simplement, et ce qu'il coûte réellement.",
  },
  [ROUTE_NAME.Banking_4]: {
    title: "Qui a cassé le moteur ? Taux directeurs et allocation du crédit",
    description:
      "Pourquoi ta banque déroule le tapis rouge pour l'immobilier et fait la moue devant un vrai projet. Taux directeurs et allocation du crédit.",
  },
  [ROUTE_NAME.Banking_5]: {
    title: "Pourquoi l'argent va à l'argent : l'effet Cantillon",
    description:
      "Ceux qui reçoivent l'argent créé en premier achètent avant que les prix ne montent. L'effet Cantillon expliqué, et pourquoi il creuse les inégalités.",
  },
  [ROUTE_NAME.Banking_6]: {
    title: "Pourquoi ta baguette coûte plus cher : comprendre l'inflation",
    description:
      "Tes courses augmentent, le CAC 40 bat des records, ton salaire suit. Où va vraiment l'argent créé ? L'inflation au-delà de l'indice des prix.",
  },
  [ROUTE_NAME.Banking_7]: {
    title: "Quiz : le système bancaire et la création monétaire",
    description:
      "Quinze questions pour vérifier ce que tu as retenu du module : création monétaire, assouplissement quantitatif, effet Cantillon et inflation.",
  },
  [ROUTE_NAME.MoneyLaws_1]: {
    title: "5000 ans de batteries qui fuient : qu'est-ce que la monnaie ?",
    description:
      "Pourquoi adopte-t-on une monnaie, et pourquoi en abandonne-t-on une autre ? Cinq mille ans d'histoire monétaire et les propriétés qui font une bonne monnaie.",
  },
  [ROUTE_NAME.MoneyLaws_2]: {
    title: "Quand le taux dit la vérité : préférence temporelle et taux d'intérêt",
    description:
      "La prospérité ne vient pas de ce qu'on dépense, mais de ce qu'on choisit de ne pas consommer tout de suite. Préférence temporelle, épargne et taux d'intérêt.",
  },
  [ROUTE_NAME.MoneyLaws_3]: {
    title: "La boussole truquée de l'économie : les cycles économiques",
    description:
      "Pourquoi les crises reviennent-elles toujours, malgré les leçons du passé ? La théorie autrichienne des cycles économiques, expliquée par la monnaie.",
  },
  [ROUTE_NAME.MoneyLaws_4]: {
    title: "Mises avait prévenu : le problème du calcul économique",
    description:
      "Combien d'acier la France doit-elle produire l'an prochain ? Le problème du calcul économique, et pourquoi les prix sont un savoir que rien ne remplace.",
  },
  [ROUTE_NAME.MoneyLaws_5]: {
    title: "Le physicien contre le logicien : la méthode autrichienne",
    description:
      "En 2008, des milliers de milliards injectés sans explosion des prix. Mauvaise conclusion, surtout mauvaise méthode. Comment raisonne l'école autrichienne.",
  },
  [ROUTE_NAME.MoneyLaws_6]: {
    title: "Quiz : les lois de la monnaie",
    description:
      "Quinze questions pour valider le module : nature de la monnaie, préférence temporelle, cycles économiques et problème du calcul économique.",
  },
  [ROUTE_NAME.Bitcoin_1]: {
    title: "Bitcoin, sous le capot : logiciel, réseau et monnaie",
    description:
      "Bitcoin est trois choses à la fois : un logiciel, un réseau, une monnaie. Comment elles tiennent ensemble sans banque et sans personne aux commandes.",
  },
  [ROUTE_NAME.Bitcoin_2]: {
    title: "Le bloc qui contenait un message : pourquoi Bitcoin existe",
    description:
      "Janvier 2009 : un développeur anonyme grave un titre de presse dans le tout premier bloc. Pourquoi Bitcoin est né, et quel problème de confiance il résout.",
  },
  [ROUTE_NAME.Bitcoin_3]: {
    title: "La blockchain disséquée : comment fonctionne une chaîne de blocs",
    description:
      "Une blockchain est une chaîne de blocs, littéralement. La vraie question n'est pas ce que c'est, mais pourquoi c'est si difficile à falsifier.",
  },
  [ROUTE_NAME.Bitcoin_4]: {
    title: "Se mettre d'accord sans chef : la preuve de travail",
    description:
      "Bitcoin consomme l'équivalent d'un pays en électricité. Absurde vu de loin, indispensable vu de près : la preuve de travail, et pourquoi elle doit coûter cher.",
  },
  [ROUTE_NAME.Bitcoin_5]: {
    title: "Halving, la dureté codée en dur : la récompense des mineurs",
    description:
      "Tous les quatre ans environ, la récompense des mineurs est divisée par deux. Le halving, l'émission de bitcoin et sa dureté monétaire inscrite dans le code.",
  },
  [ROUTE_NAME.Bitcoin_6]: {
    title: "Bitcoin ne déplace pas d'argent : transactions et UTXO",
    description:
      "Une transaction Bitcoin ne fait pas voyager un objet numérique d'un portefeuille à l'autre. Comprendre les UTXO et ce qui circule réellement sur le réseau.",
  },
  [ROUTE_NAME.Bitcoin_7]: {
    title: "Prouver sans se montrer : clés privées et signatures",
    description:
      "Tes bitcoins sont posés derrière une serrure, et une seule clé l'ouvre. Clé privée, clé publique et signature numérique, expliquées sans une seule équation.",
  },
  [ROUTE_NAME.Bitcoin_8]: {
    title: "Bitcoin, ni compte, ni coffre : portefeuilles et seed",
    description:
      "Un portefeuille Bitcoin ne contient pas de bitcoins. Ce que sont vraiment une seed, une adresse et un portefeuille, et pourquoi douze mots décident de tout.",
  },
  [ROUTE_NAME.Bitcoin_9]: {
    title: "Quiz : Bitcoin",
    description:
      "Vingt questions pour valider le module : blockchain, preuve de travail, halving, transactions, clés privées et portefeuilles.",
  },
  [ROUTE_NAME.GetStarted]: {
    title: "Entrer dans le terrier : acheter et détenir du bitcoin",
    description:
      "Acheter est l'étape facile. Détenir vraiment, c'est le vrai sujet. Comment acquérir du bitcoin et prendre la garde de tes propres clés.",
  },
  [ROUTE_NAME.Badges]: {
    title: "Tes badges",
    description:
      "Ta collection Bitcoin.Decoded : les chapitres terminés et les quiz de module validés, module par module.",
  },
};

const EN: Record<RouteName, PageSeo> = {
  [ROUTE_NAME.HomePage]: {
    title: "Understanding Bitcoin through Austrian economics",
    description:
      "Understand Bitcoin starting from the banking system and the laws of money. An interactive three-module course, jargon free, for curious newcomers.",
  },
  [ROUTE_NAME.Banking_1]: {
    title: "Where does your money actually come from? Money creation explained",
    description:
      "Over 90% of your money was never printed: it is born from a bank loan. How banks create money, explained step by step with a simulator.",
  },
  [ROUTE_NAME.Banking_2]: {
    title: "The two euros you don't know about: central and commercial money",
    description:
      "A 200,000 € transfer without a single banknote moving. The two kinds of money that coexist in the system: the one banks use, and yours.",
  },
  [ROUTE_NAME.Banking_3]: {
    title: "The central banks' nuclear option: quantitative easing",
    description:
      "The central bank presses a button and money appears. Quantitative easing (QE) explained simply, and what it actually costs.",
  },
  [ROUTE_NAME.Banking_4]: {
    title: "Who broke the engine? Policy rates and credit allocation",
    description:
      "Why your bank rolls out the red carpet for real estate and frowns at a real project. Policy rates, collateral and credit allocation, without the jargon.",
  },
  [ROUTE_NAME.Banking_5]: {
    title: "Why money flows to money: the Cantillon effect",
    description:
      "Those who receive newly created money first buy before prices rise. The Cantillon effect explained, and why it widens inequality.",
  },
  [ROUTE_NAME.Banking_6]: {
    title: "Why your bread costs more: understanding inflation",
    description:
      "Your groceries climb, the stock market breaks records, your salary lags. Where does newly created money actually go? Inflation beyond the price index.",
  },
  [ROUTE_NAME.Banking_7]: {
    title: "Quiz: the banking system and money creation",
    description:
      "Fifteen questions to check what you retained from the module: money creation, quantitative easing, the Cantillon effect and inflation.",
  },
  [ROUTE_NAME.MoneyLaws_1]: {
    title: "5000 years of leaking batteries: what is money?",
    description:
      "Why do we adopt one money and abandon another? Five thousand years of monetary history, and the properties that make a money good.",
  },
  [ROUTE_NAME.MoneyLaws_2]: {
    title: "When the rate tells the truth: time preference and interest rates",
    description:
      "Prosperity comes not from what we spend but from what we choose not to consume yet. Time preference, savings and the interest rate.",
  },
  [ROUTE_NAME.MoneyLaws_3]: {
    title: "The economy's rigged compass: business cycles",
    description:
      "Why do crises keep coming back despite every lesson of the past? The Austrian theory of the business cycle, explained through money.",
  },
  [ROUTE_NAME.MoneyLaws_4]: {
    title: "Mises warned us: the economic calculation problem",
    description:
      "How much steel should a country produce next year? The economic calculation problem, and why prices are knowledge nothing can replace.",
  },
  [ROUTE_NAME.MoneyLaws_5]: {
    title: "The physicist against the logician: the Austrian method",
    description:
      "In 2008, trillions were injected with no price explosion. Wrong conclusion, and above all wrong method. How the Austrian school reasons.",
  },
  [ROUTE_NAME.MoneyLaws_6]: {
    title: "Quiz: the laws of money",
    description:
      "Fifteen questions to validate the module: the nature of money, time preference, business cycles and the economic calculation problem.",
  },
  [ROUTE_NAME.Bitcoin_1]: {
    title: "Bitcoin under the hood: software, network and money",
    description:
      "Bitcoin is three things at once: software, a network, a money. How they hold together with no bank, no government, and nobody in charge.",
  },
  [ROUTE_NAME.Bitcoin_2]: {
    title: "The block that carried a message: why Bitcoin exists",
    description:
      "January 2009: an anonymous developer carves a newspaper headline into the very first block. Why Bitcoin was born, and which trust problem it solves.",
  },
  [ROUTE_NAME.Bitcoin_3]: {
    title: "The blockchain dissected: how a chain of blocks works",
    description:
      "A blockchain is a chain of blocks, literally. The real question is not what it is, but why it is so hard to forge that nobody bothers.",
  },
  [ROUTE_NAME.Bitcoin_4]: {
    title: "Agreeing without a leader: proof of work",
    description:
      "Bitcoin consumes as much electricity as a country. Absurd from afar, essential up close: proof of work explained, and why it has to be expensive.",
  },
  [ROUTE_NAME.Bitcoin_5]: {
    title: "Halving, hardness written into the code: the mining reward",
    description:
      "Roughly every four years, the miners' reward is cut in half. The halving, bitcoin issuance, and monetary hardness written into the code.",
  },
  [ROUTE_NAME.Bitcoin_6]: {
    title: "Bitcoin doesn't move money: transactions and UTXOs",
    description:
      "A Bitcoin transaction does not send a digital object from one wallet to another. Understanding UTXOs and what actually travels across the network.",
  },
  [ROUTE_NAME.Bitcoin_7]: {
    title: "Proving without showing: private keys and signatures",
    description:
      "Your bitcoins sit behind a lock, and one key opens it. Private key, public key and digital signature, explained without a single equation.",
  },
  [ROUTE_NAME.Bitcoin_8]: {
    title: "Bitcoin, neither account nor vault: wallets and seed",
    description:
      "A Bitcoin wallet holds no bitcoins. What a seed, an address and a wallet really are, and why twelve words decide everything.",
  },
  [ROUTE_NAME.Bitcoin_9]: {
    title: "Quiz: Bitcoin",
    description:
      "Twenty questions to validate the module: blockchain, proof of work, halving, transactions, private keys and wallets.",
  },
  [ROUTE_NAME.GetStarted]: {
    title: "Down the rabbit hole: buying and holding bitcoin",
    description:
      "Buying is the easy part. Actually holding is the real subject. How to acquire bitcoin and take custody of your own keys.",
  },
  [ROUTE_NAME.Badges]: {
    title: "Your badges",
    description:
      "Your Bitcoin.Decoded collection: chapters completed and module quizzes passed, module by module.",
  },
};

export const getPageSeo = (route: RouteName, language: Language): PageSeo =>
  (language === "fr" ? FR : EN)[route];
