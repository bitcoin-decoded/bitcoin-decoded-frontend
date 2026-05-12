import type { Language } from "../../I18n";
import { ROUTE_NAME } from "../../Routing";
import type { ChapterReference, SynthesisQuizData } from "../types/";

const CHAPTERS = {
  howBitcoinWorks: { routeId: ROUTE_NAME.Bitcoin_1, labelKey: "nav.tree.howBitcoinWorks" },
  whyBitcoin: { routeId: ROUTE_NAME.Bitcoin_2, labelKey: "nav.tree.whyBitcoin" },
  blockchain: { routeId: ROUTE_NAME.Bitcoin_3, labelKey: "nav.tree.blockchain" },
  proofOfWork: { routeId: ROUTE_NAME.Bitcoin_4, labelKey: "nav.tree.proofOfWork" },
  rewardAndHalving: {
    routeId: ROUTE_NAME.Bitcoin_5,
    labelKey: "nav.tree.rewardAndHalving",
  },
  utxoAndTransactions: {
    routeId: ROUTE_NAME.Bitcoin_6,
    labelKey: "nav.tree.utxoAndTransactions",
  },
  keysAndSignatures: {
    routeId: ROUTE_NAME.Bitcoin_7,
    labelKey: "nav.tree.keysAndSignatures",
  },
  walletsAndSeed: { routeId: ROUTE_NAME.Bitcoin_8, labelKey: "nav.tree.walletsAndSeed" },
} as const satisfies Record<string, ChapterReference>;

export const getQuizDataModule3Synthesis = (language: Language): SynthesisQuizData => {
  const fr = language === "fr";

  return {
    passThreshold: 15,
    questions: [
      {
        question: fr
          ? "Quelles sont les trois dimensions qui définissent Bitcoin ?"
          : "What are the three dimensions that define Bitcoin?",
        chapterRefs: [CHAPTERS.howBitcoinWorks],
        answers: [
          {
            text: fr
              ? "a) Un logiciel, un réseau et une monnaie"
              : "a) A software, a network, and a currency",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Une banque numérique, un protocole de paiement et une crypto-monnaie volatile"
              : "b) A digital bank, a payment protocol, and a volatile cryptocurrency",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Une blockchain, un marché spéculatif et un actif financier non régulé"
              : "c) A blockchain, a speculative market, and an unregulated financial asset",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quelle est la fonction principale d'un nœud simple dans le réseau Bitcoin ?"
          : "What is the main function of a regular node in the Bitcoin network?",
        chapterRefs: [CHAPTERS.howBitcoinWorks],
        answers: [
          {
            text: fr
              ? "a) Miner de nouveaux bitcoins en résolvant des problèmes mathématiques complexes pour empocher la récompense"
              : "a) Mining new bitcoins by solving complex mathematical problems to pocket the reward",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Stocker une copie complète de la blockchain et vérifier que chaque transaction et chaque bloc respectent les règles du protocole"
              : "b) Storing a full copy of the blockchain and verifying that every transaction and every block follow the protocol rules",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Centraliser localement les transactions de sa région géographique avant de les transmettre aux mineurs autorisés"
              : "c) Locally centralizing the transactions of its geographical region before forwarding them to authorized miners",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce qui distingue un nœud-mineur d'un nœud simple ?"
          : "What distinguishes a miner-node from a regular node?",
        chapterRefs: [CHAPTERS.howBitcoinWorks],
        answers: [
          {
            text: fr
              ? "a) Le nœud-mineur ne stocke pas la blockchain et se contente de calculer des hashs"
              : "a) The miner-node does not store the blockchain and only computes hashes",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Le nœud-mineur participe à une compétition de calcul (preuve de travail) pour proposer de nouveaux blocs et reçoit en échange une récompense en bitcoins"
              : "b) The miner-node takes part in a computational race (proof of work) to propose new blocks and is rewarded in bitcoins",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Le nœud-mineur est désigné par un comité de gouvernance du réseau, sur dossier et après vote des autres mineurs"
              : "c) The miner-node is appointed by a network governance committee, after application and a vote of other miners",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quel message Satoshi Nakamoto a-t-il inscrit dans le tout premier bloc de la blockchain Bitcoin (bloc Genesis) ?"
          : "What message did Satoshi Nakamoto inscribe in the very first block of the Bitcoin blockchain (Genesis block)?",
        chapterRefs: [CHAPTERS.whyBitcoin],
        answers: [
          {
            text: fr
              ? "a) Un manifeste philosophique de plusieurs paragraphes sur la liberté monétaire et la souveraineté individuelle"
              : "a) A multi-paragraph philosophical manifesto on monetary freedom and individual sovereignty",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Un titre du journal The Times daté du 3 janvier 2009 mentionnant le sauvetage imminent des banques par le chancelier britannique"
              : "b) A headline from The Times dated January 3, 2009, mentioning the imminent bank bailout by the UK chancellor",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Une dédicace à Friedrich Hayek et Ludwig von Mises, accompagnée d'une citation tirée de L'Action humaine"
              : "c) A dedication to Friedrich Hayek and Ludwig von Mises, with a quote from Human Action",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quels sont les deux grands problèmes que Bitcoin a été conçu pour résoudre simultanément ?"
          : "Which two major problems was Bitcoin designed to solve at the same time?",
        chapterRefs: [CHAPTERS.whyBitcoin],
        answers: [
          {
            text: fr
              ? "a) La lenteur des paiements internationaux et les frais bancaires excessifs sur les virements transfrontaliers"
              : "a) The slowness of international payments and the excessive banking fees on cross-border transfers",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Le problème de dureté monétaire et le problème de centralisation"
              : "b) The monetary-hardness problem and the centralization problem",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) La fraude fiscale internationale et le blanchiment d'argent dans les paradis fiscaux"
              : "c) International tax fraud and money laundering through tax havens",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quelle est l'offre maximale de bitcoins inscrite dans le protocole ?"
          : "What is the maximum supply of bitcoins written into the protocol?",
        chapterRefs: [CHAPTERS.whyBitcoin],
        answers: [
          {
            text: fr
              ? "a) 100 millions, ajustables par vote des principaux mineurs lors d'une mise à jour quadriennale du protocole"
              : "a) 100 million, adjustable by a vote of the main miners during a four-yearly protocol upgrade",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) 21 millions, gravée dans le code et vérifiée par chaque nœud"
              : "b) 21 million, hard-coded and verified by every node",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Aucune limite : l'émission s'ajuste à la demande réelle pour stabiliser le prix au fil du temps"
              : "c) No limit: issuance adjusts to real demand to stabilise the price over time",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce qu'un bloc Bitcoin contient exactement ?"
          : "What does a Bitcoin block contain, exactly?",
        chapterRefs: [CHAPTERS.blockchain],
        answers: [
          {
            text: fr
              ? "a) Uniquement la liste des transactions de la dernière période, sans aucune autre métadonnée"
              : "a) Only the list of transactions from the last period, without any other metadata",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Un en-tête (hash du bloc précédent, racine de Merkle, horodatage, nonce) et un corps contenant la liste des transactions"
              : "b) A header (previous block hash, Merkle root, timestamp, nonce) and a body containing the list of transactions",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Un solde global du réseau mis à jour à chaque cycle, accompagné de la liste des comptes actifs sur la période"
              : "c) A global network balance updated each cycle, alongside the list of active accounts during the period",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi la blockchain Bitcoin est-elle dite « immutable » ?"
          : 'Why is the Bitcoin blockchain said to be "immutable"?',
        chapterRefs: [CHAPTERS.blockchain],
        answers: [
          {
            text: fr
              ? "a) Parce que les blocs sont stockés sur des serveurs ultra-sécurisés appartenant à la Fondation Bitcoin basée à Genève"
              : "a) Because blocks are stored on ultra-secure servers owned by the Bitcoin Foundation based in Geneva",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Parce que chaque bloc contient le hash du bloc précédent : modifier une seule transaction change tous les hashes suivants, ce qui invalide toute la chaîne"
              : "b) Because each block contains the previous block's hash: modifying a single transaction changes every following hash, invalidating the whole chain",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Parce qu'un traité international signé en 2015 interdit explicitement toute modification rétroactive des données du réseau"
              : "c) Because an international treaty signed in 2015 explicitly forbids any retroactive modification of network data",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "À quoi sert la fonction de hachage SHA-256 dans Bitcoin ?"
          : "What is the SHA-256 hash function used for in Bitcoin?",
        chapterRefs: [CHAPTERS.blockchain],
        answers: [
          {
            text: fr
              ? "a) À chiffrer les transactions pour qu'elles soient illisibles par des observateurs extérieurs au réseau"
              : "a) To encrypt transactions so that they become unreadable to outside observers of the network",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) À produire une empreinte numérique de taille fixe à partir de n'importe quelle donnée, ce qui permet de lier les blocs entre eux"
              : "b) To produce a fixed-size digital fingerprint from any data, which links blocks together",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) À compresser les données du bloc pour économiser de l'espace de stockage sur les serveurs des mineurs"
              : "c) To compress block data and save storage space on the miners' servers",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce que le problème des généraux byzantins, et comment Bitcoin le résout-il ?"
          : "What is the Byzantine generals problem, and how does Bitcoin solve it?",
        chapterRefs: [CHAPTERS.proofOfWork],
        answers: [
          {
            text: fr
              ? "a) C'est un problème de cryptographie ancienne datant de l'Empire byzantin, résolu par Bitcoin grâce à la signature numérique elliptique"
              : "a) It's an ancient cryptography problem dating from the Byzantine Empire, solved by Bitcoin through elliptic-curve digital signatures",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) C'est un problème de coordination sans confiance, résolu par Bitcoin grâce à une preuve coûteuse à produire mais facile à vérifier (la preuve de travail)"
              : "b) It's a problem of trustless coordination, solved by Bitcoin through a proof that is costly to produce but easy to verify (proof of work)",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) C'est un problème de routage réseau lié à la propagation des paquets, résolu par Bitcoin grâce aux connexions directes entre nœuds géographiquement proches"
              : "c) It's a network-routing problem linked to packet propagation, solved by Bitcoin through direct connections between geographically close nodes",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que la mempool ?" : "What is the mempool?",
        chapterRefs: [CHAPTERS.proofOfWork],
        answers: [
          {
            text: fr
              ? "a) Une salle d'attente où sont stockées les transactions valides mais pas encore confirmées dans un bloc"
              : "a) A waiting room where valid but not-yet-confirmed transactions are stored",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un fonds de garantie alimenté par les frais de transaction, qui sert à couvrir les pertes en cas de fork"
              : "b) A guarantee fund fed by transaction fees, used to cover losses in case of a fork",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Le portefeuille collectif des mineurs, où s'accumulent les récompenses avant leur redistribution mensuelle"
              : "c) The miners' collective wallet, where rewards accumulate before their monthly redistribution",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "En cas de fork temporaire (deux blocs valides minés en même temps), quelle règle départage les deux chaînes concurrentes ?"
          : "In a temporary fork (two valid blocks mined at the same time), what rule decides between the competing chains?",
        chapterRefs: [CHAPTERS.proofOfWork],
        answers: [
          {
            text: fr
              ? "a) Le réseau conserve la chaîne qui a accumulé le plus de travail cumulé"
              : "a) The network keeps the chain with the most accumulated work",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un vote pondéré des nœuds simples selon leur ancienneté détermine la chaîne gagnante à l'issue de la période contestée"
              : "b) A weighted vote of regular nodes based on their seniority decides the winning chain at the end of the contested period",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) C'est la chaîne contenant le plus grand nombre de transactions sur le bloc litigieux qui l'emporte automatiquement"
              : "c) The chain containing the largest number of transactions in the disputed block automatically wins",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Pourquoi la difficulté de minage s'ajuste-t-elle automatiquement tous les 2016 blocs ?"
          : "Why does mining difficulty automatically adjust every 2016 blocks?",
        chapterRefs: [CHAPTERS.proofOfWork],
        answers: [
          {
            text: fr
              ? "a) Pour maintenir un temps moyen d'environ 10 minutes par bloc, quelle que soit la puissance de calcul totale du réseau"
              : "a) To keep an average of about 10 minutes per block, regardless of the network's total computing power",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Pour récompenser financièrement les mineurs qui ont validé le plus de blocs sur la période, en augmentant leur quote-part de subvention"
              : "b) To financially reward miners who validated the most blocks during the period, by increasing their share of the subsidy",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Pour permettre à de nouveaux mineurs d'entrer plus facilement sur le réseau, en baissant temporairement le seuil de calcul requis"
              : "c) To let new miners join the network more easily, by temporarily lowering the required computational threshold",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce que le halving ?" : "What is the halving?",
        chapterRefs: [CHAPTERS.rewardAndHalving],
        answers: [
          {
            text: fr
              ? "a) Un événement qui divise par deux le nombre total de bitcoins déjà en circulation, redistribué à parts égales aux mineurs actifs"
              : "a) An event that halves the total number of bitcoins already in circulation, redistributed equally among active miners",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) La division par deux de la subvention accordée aux mineurs pour chaque bloc validé, tous les 210 000 blocs (environ tous les 4 ans)"
              : "b) The halving of the subsidy granted to miners for each validated block, every 210,000 blocks (roughly every 4 years)",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Un mécanisme de gouvernance qui permet aux nœuds de voter à la majorité simple sur les évolutions techniques du protocole"
              : "c) A governance mechanism that lets nodes vote by simple majority on the technical evolutions of the protocol",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quand l'émission de nouveaux bitcoins par le protocole prendra-t-elle fin ?"
          : "When will the protocol's issuance of new bitcoins come to an end?",
        chapterRefs: [CHAPTERS.rewardAndHalving],
        answers: [
          {
            text: fr
              ? "a) Vers 2140, après quoi la subvention sera nulle et les mineurs seront uniquement rémunérés par les frais de transaction"
              : "a) Around 2140, after which the subsidy will be zero and miners will be paid only through transaction fees",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) En 2032, lorsque le réseau aura atteint sa pleine maturité technique et que l'adoption institutionnelle sera consolidée"
              : "b) In 2032, once the network has reached technical maturity and institutional adoption is consolidated",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Jamais : l'émission continuera indéfiniment à un rythme constant pour garantir la rémunération perpétuelle des mineurs"
              : "c) Never: issuance will continue indefinitely at a constant pace to guarantee miners' perpetual remuneration",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Comment la sécurité du réseau sera-t-elle financée quand la subvention aura disparu ?"
          : "How will network security be funded once the subsidy disappears?",
        chapterRefs: [CHAPTERS.rewardAndHalving],
        answers: [
          {
            text: fr
              ? "a) Par une taxe annuelle prélevée sur les détenteurs de bitcoins en proportion de leur portefeuille"
              : "a) Through an annual tax levied on bitcoin holders in proportion to their portfolio size",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Par les frais de transaction payés par les utilisateurs, selon une logique où la sécurité est financée par l'usage"
              : "b) Through transaction fees paid by users, on the principle that security is funded by usage",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Par une subvention conjointe versée par les principales bourses d'échange, qui ont tout intérêt à préserver l'infrastructure"
              : "c) Through a joint subsidy paid by the main exchanges, which have every interest in preserving the infrastructure",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr ? "Qu'est-ce qu'un UTXO ?" : "What is a UTXO?",
        chapterRefs: [CHAPTERS.utxoAndTransactions],
        answers: [
          {
            text: fr
              ? "a) Une sortie de transaction non dépensée, qui peut être vue comme une pièce indivisible prête à être dépensée"
              : "a) An unspent transaction output, which can be seen as an indivisible coin ready to be spent",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) Un solde de compte numérique enregistré dans la blockchain et associé à l'adresse publique de son détenteur"
              : "b) A digital account balance recorded on the blockchain and linked to its holder's public address",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) Une unité de mesure du temps de minage utilisée pour évaluer la productivité des fermes industrielles"
              : "c) A unit of measurement for mining time, used to evaluate the productivity of industrial farms",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Dans une transaction Bitcoin, à quoi correspond la différence entre la somme des entrées et la somme des sorties ?"
          : "In a Bitcoin transaction, what does the difference between the sum of inputs and the sum of outputs correspond to?",
        chapterRefs: [CHAPTERS.utxoAndTransactions],
        answers: [
          {
            text: fr
              ? "a) Aux frais de transaction, qui reviennent au mineur qui inclut la transaction dans un bloc"
              : "a) The transaction fees, which go to the miner who includes the transaction in a block",
            isCorrect: true,
          },
          {
            text: fr
              ? "b) À une taxe automatique reversée au protocole pour financer son développement et la maintenance des nœuds officiels"
              : "b) An automatic tax paid back to the protocol to fund its development and the maintenance of official nodes",
            isCorrect: false,
          },
          {
            text: fr
              ? "c) À un nouveau bitcoin créé spontanément par le portefeuille de l'expéditeur lorsque la transaction est confirmée"
              : "c) A new bitcoin spontaneously created by the sender's wallet when the transaction is confirmed",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Quel est le rôle respectif de la clé privée, de la clé publique et de la signature dans une transaction Bitcoin ?"
          : "What are the respective roles of the private key, the public key, and the signature in a Bitcoin transaction?",
        chapterRefs: [CHAPTERS.keysAndSignatures],
        answers: [
          {
            text: fr
              ? "a) La clé privée chiffre la transaction, la clé publique la déchiffre, et la signature certifie l'identité civile de l'utilisateur auprès du réseau"
              : "a) The private key encrypts the transaction, the public key decrypts it, and the signature certifies the user's civil identity to the network",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) La clé privée permet de produire une signature, la clé publique permet au réseau de vérifier cette signature, et la signature prouve le droit de dépenser sans jamais exposer la clé privée"
              : "b) The private key produces a signature, the public key lets the network verify that signature, and the signature proves the right to spend without ever exposing the private key",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) La clé privée est partagée avec le destinataire pour qu'il reçoive les fonds, la clé publique reste secrète chez l'expéditeur, et la signature est générée par le mineur"
              : "c) The private key is shared with the recipient so they receive the funds, the public key stays secret with the sender, and the signature is generated by the miner",
            isCorrect: false,
          },
        ],
      },
      {
        question: fr
          ? "Qu'est-ce qu'un portefeuille Bitcoin contient réellement ?"
          : "What does a Bitcoin wallet actually contain?",
        chapterRefs: [CHAPTERS.walletsAndSeed],
        answers: [
          {
            text: fr
              ? "a) Des bitcoins, stockés sous forme numérique dans une base de données locale chiffrée par le mot de passe de l'utilisateur"
              : "a) Bitcoins, stored digitally in a local database encrypted with the user's password",
            isCorrect: false,
          },
          {
            text: fr
              ? "b) Une seed à partir de laquelle sont dérivées les clés privées qui permettent de dépenser les UTXO associés aux adresses correspondantes"
              : "b) A seed from which private keys are derived, which then let you spend the UTXOs associated with the matching addresses",
            isCorrect: true,
          },
          {
            text: fr
              ? "c) Un solde bancaire numérique synchronisé en continu avec un serveur central géré par les principaux fournisseurs de portefeuilles"
              : "c) A digital bank balance continuously synchronized with a central server managed by the main wallet providers",
            isCorrect: false,
          },
        ],
      },
    ],
  };
};
