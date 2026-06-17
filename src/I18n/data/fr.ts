const fr = {
  // Layout
  "header.homeAriaLabel": "Retour à la page d'accueil",
  "nav.title": "Navigation",
  "nav.previous": "Précédent",
  "nav.next": "Suivant",
  "theme.toggleAriaLabel.light": "Passer en mode sombre",
  "theme.toggleAriaLabel.dark": "Passer en mode clair",
  "language.toggleAriaLabel": "Switch to English",

  // Components
  "chapterPrelude.label": "Prélude",
  "quiz.label": "Quiz",
  "synthesisQuiz.label": "Quiz de synthèse",
  "synthesisQuiz.question": "Question",
  "synthesisQuiz.chapter": "Chapitre",
  "synthesisQuiz.submit": "Valider mes réponses",
  "synthesisQuiz.answerAll": "Réponds à toutes les questions",
  "synthesisQuiz.retry": "Recommencer",
  "synthesisQuiz.threshold": "Seuil de validation :",
  "synthesisQuiz.passed": "Validé ! Tu maîtrises les fondations.",
  "synthesisQuiz.failed": "Pas tout à fait. Recommence pour valider.",

  // Badges / accomplissements
  "badges.navLabel": "Mes badges",
  "badges.title": "Ma collection de badges",
  "badges.intro":
    "Chaque chapitre terminé et chaque quiz de module validé débloque un badge, une seule fois. Termine le parcours pour compléter ta collection.",
  "badges.unlocked": "débloqués",
  "badges.unlockedToast": "Badge débloqué",
  "badges.moduleQuiz.banking": "Système bancaire décodé",
  "badges.moduleQuiz.moneyLaws": "Lois de la monnaie maîtrisées",
  "badges.moduleQuiz.bitcoin": "Bitcoin décodé",
  "synthesisQuiz.next": "Suivant",
  "synthesisQuiz.back": "Précédent",
  "identityCard.expand": "Déplier",
  "identityCard.collapse": "Replier",
  "balanceSheet.assets": "ACTIF",
  "balanceSheet.liabilities": "PASSIF",

  // Simulators - buttons
  "simulator.credit.grant": "J'accorde le prêt !",
  "simulator.credit.retry": "Réessayer",
  "simulator.credit.title": "BILAN COMPTABLE DE LA BANQUE DE NICOLAS",
  "simulator.compensation.start": "Démarrer la compensation",
  "simulator.compensation.retry": "Réessayer",
  "simulator.compensation.title": "BILAN COMPTABLE DE LA BANQUE DE NICOLAS",
  "simulator.default.simulate": "Simuler un défaut de paiement d'une valeur totale de 30 000 000 €",
  "simulator.default.retry": "Réessayer",
  "simulator.default.title": "ILLUSTRATION DES POINTS 1 ET 2 SUR LE BILAN COMPTABLE DE LA BANQUE",
  "simulator.qe.buy": "Acheter massivement des obligations",
  "simulator.qe.retry": "Réessayer",
  "simulator.qe.bondTitle": "Coupon d'obligation d'État",
  "simulator.qe.bondPrice": "Prix de l'obligation",
  "simulator.qe.bondYield": "Rendement (Taux d'intérêt)",
  "simulator.capitalChain.button": "REMONTER LE TEMPS",

  // YieldCurve
  "yieldCurve.title":
    "Simulation de la rentabilité des banques commerciales en fonction du taux à long terme",
  "yieldCurve.shortRate": "Taux à court terme",
  "yieldCurve.longRate": "Taux à long terme",
  "yieldCurve.shortRateName": "Taux Court",
  "yieldCurve.longRateName": "Taux Long",
  "yieldCurve.years": "Années",
  "yieldCurve.evaluation": "Évaluation",

  // MonetaryGallery
  "monetaryGallery.history": "Son histoire :",
  "monetaryGallery.characteristics": "Ses caractéristiques :",
  "monetaryGallery.limitations": "Ses limitations :",
  "monetaryGallery.explored": "explorées",

  // Monetary characteristics
  "characteristic.durability": "Durabilité",
  "characteristic.portability": "Portabilité",
  "characteristic.divisibility": "Divisibilité",
  "characteristic.fungibility": "Fongibilité",
  "characteristic.hardness": "Dureté",

  // AccountingTerms
  "accountingTerms.sectionTitle": "Comptabilité : quelques définitions",

  // CustodyOptions
  "custodyOptions.sectionTitle": "Deux grandes manières de garder tes bitcoins",

  // WalletFamilies
  "walletFamilies.sectionTitle": "Deux familles de portefeuilles",

  // PathFinder — Quelle voie pour toi ?
  "pathFinder.step": "Étape",

  // MonetaryAggregates
  "monetaryAggregates.sectionTitle":
    "Les deux types de monnaie : celle que l'on utilise et celle réservée aux Banques",

  // MonetaryPillars
  "monetaryPillars.sectionTitle": "Les cinq piliers d'une monnaie",
  "monetaryPillars.prompt":
    " Clique sur chaque pilier pour la définition. Garde un œil sur le cinquième. C'est lui qui décide de tout.",

  // MonetaryProperties
  "monetaryProperties.sectionTitle": "Rareté versus Dureté",

  // BlockchainChainVisual
  "chain.block": "Bloc",
  "chain.header": "En-tête",
  "chain.body": "Corps",
  "chain.merkleRoot": "Racine de Merkle",
  "chain.hashFormula": "Hash de l'en-tête du bloc",
  "chain.blockHash": "Hash du bloc",
  "chain.prevHash": "Hash bloc préc.",
  "chain.timestamp": "Horodatage",
  "chain.transaction": "Transaction",
  "chain.addBlock": "Ajouter un bloc",
  "chain.reset": "Réinitialiser",
  "chain.chainBroken": "Lien rompu",
  "chain.modified": "Falsifié",
  "chain.editTx": "Modifier la transaction",
  "chain.modifyTx": "Modifier la transaction",
  "chain.originalHash": "Hash d'origine",
  "chain.newHash": "Nouveau hash",
  "chain.invitation":
    "ALAKAZAM ! 💥 Tu vois ? Le hash du premier bloc est devenu la référence du second. Maintenant, le clou du spectacle : modifie la transaction du bloc #100826 et regarde la chaîne se briser.",
  "chain.disclosureTitle": "Pourquoi une seule transaction par bloc ?",
  "chain.disclosureBody":
    "Simplification pédagogique. Dans la réalité, un bloc Bitcoin contient des milliers de transactions, toutes résumées dans la racine de Merkle. Ici, on n'en met qu'une pour que le mécanisme reste lisible. Rassure-toi, le principe est exactement le même.",
  "chain.noteTitle": "Pourquoi modifier une transaction casse toute la chaîne",
  "chain.note":
    "Le hash de chaque bloc est calculé en appliquant un double SHA-256 à son en-tête — pas directement à ses transactions. Les transactions sont d'abord condensées en une racine de Merkle, qui est placée dans l'en-tête. Modifier une seule transaction change la racine de Merkle, donc l'en-tête, donc le hash du bloc — et tous les blocs suivants pointent alors vers un hash qui n'existe plus. La chaîne entière s'effondre.",

  // MiningSimulator
  "mining.title": "Simulateur de minage",
  "mining.target": "Cible : le hash doit commencer par",
  "mining.button": "Tester un nonce",
  "mining.reset": "Réinitialiser",
  "mining.attempt": "Nonce",
  "mining.found": "Nonce valide trouvé ! Le mineur a gagné le droit de proposer ce bloc.",
  "mining.notFound": "Hash invalide: la cible n'est pas atteinte. Essaie encore !",
  "mining.headerLabel": "En-tête du bloc hashé :",
  "mining.nonce": "nonce",

  // DoubleSpendDemo
  "doubleSpend.title": "La double dépense",
  "doubleSpend.sender": "Nicolas",
  "doubleSpend.txA": "Transaction A",
  "doubleSpend.txB": "Transaction B",
  "doubleSpend.signedFrom": "signée depuis",
  "doubleSpend.amount": "0.1 BTC",
  "doubleSpend.recipientA": "Christine L.",
  "doubleSpend.recipientB": "Mme Michu",
  "doubleSpend.originA": "Paris",
  "doubleSpend.originB": "Tokyo",
  "doubleSpend.pinch":
    "Même bitcoin, deux destinataires. Nicolas tente de le dépenser deux fois, depuis deux endroits du globe.",
  "doubleSpend.revealAction": "Que voient les nœuds ?",
  "doubleSpend.firstSeenLabel": "Ce que chaque nœud a vu en premier",
  "doubleSpend.verdictTitle": "Le réseau n'est pas d'accord",
  "doubleSpend.verdictBody":
    "Christine pense être payée. Mme Michu aussi. Personne ne peut trancher sans autorité centrale.",
  "doubleSpend.reset": "Recommencer",
  "doubleSpend.continue": "Comment décider ?",

  // MempoolVisual
  "mempool.subtitle": "Transactions en attente",
  "mempool.blockLabel": "Bloc",
  "mempool.blockSubtitle": "En-tête & transactions incluses",
  "mempool.added": "Ajouté",
  "mempool.empty": "- vide -",
  "mempool.doubleSpend.prefix": "Nicolas tente de dépenser",
  "mempool.doubleSpend.emphasis": "le même BTC",
  "mempool.doubleSpend.suffix": "deux fois : une fois vers Mme Michu, une fois vers Christine L.",
  "mempool.invalidated.prefix": "Transaction",
  "mempool.invalidated.emphasis": "invalidée",
  "mempool.invalidated.suffix": ": ce BTC a déjà été dépensé dans le bloc miné.",
  "mempool.addBlock": "Ajouter ce nouveau bloc",
  "mempool.reset": "Réinitialiser",

  // MiningRewardBlock
  "miningReward.blockSubtitle": "En-tête + transactions sélectionnées par le mineur",
  "miningReward.validated": "Validé",
  "miningReward.rewardTitle": "Récompense du bloc",
  "miningReward.rewardSubtitle": "Subvention protocolaire + frais de transaction",
  "miningReward.subsidy": "Subvention (2026)",
  "miningReward.fees": "Frais de transaction",
  "miningReward.total": "Total récompense",
  "miningReward.wallet": "Portefeuille mineur",
  "miningReward.unassigned": "Récompense non attribuée",
  "miningReward.rewarded": "Mineur récompensé",
  "miningReward.rewardBtn": "Récompenser le mineur",
  "miningReward.resetBtn": "Réinitialiser",
  "miningReward.rewardNoteTitle": "Récompense reçue",
  "miningReward.rewardNoteFees": "de frais de transaction",
  "miningReward.rewardNoteSubsidy": "de subvention protocolaire",
  "miningReward.rewardNoteNewBitcoin": "nouveaux bitcoins créés par ce bloc",

  // HalvingChart
  "halvingChart.title": "Récompense par bloc (BTC) - programme des halvings",
  "halvingChart.today": "aujourd'hui",
  "halvingChart.tooltipLabel": "Récompense",
  "halvingChart.tooltipYear": "Année",
  "halvingChart.caption":
    "Chaque palier correspond à un halving (~tous les 210 000 blocs, soit ~4 ans).",

  // HalvingTimeMachine
  "halvingTimeMachine.title": "Machine à explorer le halving",
  "halvingTimeMachine.yearLabel": "Année",
  "halvingTimeMachine.intro":
    "Règle le cadran. Tire le levier. Découvre la récompense par bloc de l'époque.",
  "halvingTimeMachine.dialLabel": "Année de destination",
  "halvingTimeMachine.screenIdle": "Tire le levier pour voyager dans le temps.",
  "halvingTimeMachine.traveling": "Voyage temporel…",
  "halvingTimeMachine.rewardLabel": "Récompense par bloc",
  "halvingTimeMachine.workTimePrefix": "Ce qu'un mineur obtenait en 10 minutes en 2009 lui demande",
  "halvingTimeMachine.workTimeSuffix": "de travail.",
  "halvingTimeMachine.workTimeGenesis":
    "Le tout premier palier : 50 BTC par bloc, toutes les 10 minutes.",
  "halvingTimeMachine.workTimeSymbolic":
    "À ce stade, la subvention est devenue symbolique. C'est désormais aux frais de transaction de prendre le relais.",
  "halvingTimeMachine.exhausted":
    "Émission terminée : les 21 millions de bitcoins sont tous en circulation.",
  "halvingTimeMachine.lever": "Tire le levier",
  "halvingTimeMachine.leverTraveling": "Voyage en cours...",
  "halvingTimeMachine.caption":
    "Récompenses arrondies au satoshi près. Au-delà de ~2140, l'émission tombe à zéro.",

  // DunbarSlider
  "dunbar.sliderAria": "Taille du groupe",
  "dunbar.peopleLabel": "personnes",
  "dunbar.counterLabel": "Relations possibles à mémoriser",
  "dunbar.overloadTitle": "Surcharge cognitive",
  "dunbar.overloadBody": "Mémoire individuelle saturée. Il faut un système externe : la monnaie.",

  // NetworkFlywheel
  "flywheel.step.usage": "Utilisation du réseau",
  "flywheel.step.fees": "Frais générés (par bloc)",
  "flywheel.step.miners": "Revenus mineurs (par bloc)",
  "flywheel.step.security": "Sécurité du réseau",
  "flywheel.step.value": "Valeur sécurisée",
  "flywheel.increase": "Augmenter l'utilisation",
  "flywheel.maxReached": "Utilisation maximale",
  "flywheel.reset": "Réinitialiser",
  "flywheel.taglineIdle": "Augmente l'utilisation pour observer la propagation dans le cycle.",
  "flywheel.tagline": "Plus le réseau est utilisé, plus il est sécurisé.",
  "flywheel.cycleLabel": "Cycle auto-renforcé",

  // UTXOTransactionBuilder
  "utxoBuilder.title": "Construis une transaction",
  "utxoBuilder.step1": "1. Sélectionne les pièces de Nicolas",
  "utxoBuilder.step2": "2. Montant à envoyer (BTC)",
  "utxoBuilder.placeholder": "ex : 0.75",
  "utxoBuilder.totalInput": "Total entrées :",
  "utxoBuilder.inputs": "Entrées",
  "utxoBuilder.outputs": "Sorties",
  "utxoBuilder.recipient": "Destinataire",
  "utxoBuilder.change": "Monnaie (Nicolas)",
  "utxoBuilder.fees": "Frais mineur",
  "utxoBuilder.valid": "Transaction valide",
  "utxoBuilder.insufficient": "Fonds insuffisants",
  "utxoBuilder.selectHint": "Sélectionne des pièces à dépenser",
  "utxoBuilder.reset": "Tout effacer",
  "utxoBuilder.utxoHint":
    "Chaque pièce est indivisible dans le portefeuille de Nicolas, impossible de la découper.",
  "utxoBuilder.newUtxoRecipient": "Nouvelle pièce → Destinataire",
  "utxoBuilder.newUtxoNicolas": "Nouvelle pièce → Nicolas",
  "utxoBuilder.recipientDesc": "Ce que Mme Michu reçoit",
  "utxoBuilder.changeDesc": "Monnaie rendue (entrées - montant - frais)",
  "utxoBuilder.feesImplicit": "Frais implicites → Mineur",
  "utxoBuilder.feesDesc": "Différence non attribuée, collectée par le mineur",
  "utxoBuilder.totalRow": "Total entrées",
  "utxoBuilder.coinLabel": "Pièce",

  // CapitalStructureChain
  "capitalChain.traceBack": "REMONTER LE TEMPS ⌛ →",
  "capitalChain.explored": "explorés",
  "flipCard.explored": "explorées",
  "debateArena.explored": "explorées",
  "trustComparison.explored": "explorés",

  // UtxoGraph
  "utxoGraph.title": "Le graphe des UTXO",
  "utxoGraph.walletTitle": "Ton portefeuille",
  "utxoGraph.balance": "Solde :",
  "utxoGraph.inputs": "Entrées (UTXO existants)",
  "utxoGraph.outputs": "Sorties (nouveaux UTXO)",
  "utxoGraph.tx": "transaction",
  "utxoGraph.run": "Exécuter la transaction",
  "utxoGraph.replay": "Rejouer",
  "utxoGraph.consumed": "consommé",
  "utxoGraph.created": "créé",
  "utxoGraph.recipient": "destinataire",
  "utxoGraph.change": "monnaie",
  "utxoGraph.lockedBy": "verrouillé",
  "utxoGraph.captionIntro":
    "La valeur ne monte ni ne descend comme un solde : les pièces d'entrée sont détruites, et de nouvelles pièces (des droits de dépense) sont recréées.",
  "utxoGraph.captionKeys":
    "Chaque pièce est verrouillée par une clé. La dépenser, c'est prouver qu'on possède la clé, pas déplacer un solde.",
  "utxoGraph.captionWallet":
    "Ton « solde » n'est pas un compteur : c'est la somme des pièces que tes clés contrôlent, recalculée après chaque transaction.",

  // Reading (lecture par blocs)
  "reading.next": "Bloc suivant",
  "reading.previous": "Bloc précédent",
  "reading.finish": "Terminer",
  "reading.lockHint": "Manipule le composant pour continuer.",
  "reading.completed": "Chapitre terminé",
  "reading.replay": "Recommencer le chapitre",
  "reading.milestoneAria": "Progression dans le chapitre",
  "reading.blockLabel": "Bloc",

  // SignatureVerifier
  "sigVerifier.title": "Vérification de signature",
  "sigVerifier.message": "Message",
  "sigVerifier.pubkey": "Clé publique",
  "sigVerifier.signature": "Signature",
  "sigVerifier.tamper": "Altérer",
  "sigVerifier.restore": "Restaurer",
  "sigVerifier.originalHint": "Valeur originale :",
  "sigVerifier.verify": "Vérifier la signature",
  "sigVerifier.valid": "Signature valide",
  "sigVerifier.invalid": "Signature invalide",
  "sigVerifier.validDesc":
    "Les trois éléments correspondent. Le réseau accepterait cette transaction.",
  "sigVerifier.invalidDesc":
    "L'un des éléments a été altéré. Le réseau rejette immédiatement cette transaction.",
  "sigVerifier.idle": "Clique sur « Vérifier » pour simuler la vérification.",
  "sigVerifier.reset": "Réinitialiser",

  // KeySignatureTrio
  "keyTrio.sectionTitle": "Trois éléments, trois rôles",
  "keyTrio.prompt": "Clique sur chaque élément. Tu vas voir comment tout s'articule.",
  "keyTrio.emptyState": "Choisis un élément pour découvrir son rôle.",
  "keyTrio.explored": "explorés",

  // SignaturePlayground
  "signaturePlayground.title": "Nicolas réalise sa première transaction",
  "signaturePlayground.sectionElements": "Les trois éléments",
  "signaturePlayground.privateKeyLabel": "Clé privée (secrète)",
  "signaturePlayground.publicKeyLabel": "Clé publique",
  "signaturePlayground.messageLabel": "Message à signer",
  "signaturePlayground.messageHint": "Le contenu de la transaction qui sera signée.",
  "signaturePlayground.signatureLabel": "Signature",
  "signaturePlayground.publicKeyGenerated": "Clé publique générée :",
  "signaturePlayground.signatureGenerated": "Signature générée :",
  "signaturePlayground.publicKeyPending": "Pas encore calculée.",
  "signaturePlayground.signaturePending": "Message pas encore signé.",
  "signaturePlayground.modifyKeyAction": "Modifier la clé privée",
  "signaturePlayground.readOnly": "Lecture seule",
  "signaturePlayground.privateKeyOwner": "Connue uniquement de Nicolas",
  "signaturePlayground.publicKeyOwner": "Connue de l'ensemble du réseau",
  "signaturePlayground.publicKeyDerivation": "Dérivée de la clé privée",
  "signaturePlayground.derivationCaption":
    "Cet exemple présente l'un des couples (clé privée ↔ clé publique) de Nicolas. Dans Bitcoin, chaque utilisateur peut en posséder plusieurs. Et chaque couple est tiré d'un espace si vaste qu'il y a plus de clés possibles que d'atomes dans l'univers observable. Bonne chance pour tomber sur la même !",
  "signaturePlayground.message": "Nicolas envoie 1 BTC à Mme Michu",
  "signaturePlayground.statusValid": "Cette clé publique est bien dérivée de la clé privée",
  "signaturePlayground.statusInvalid": "Cette clé publique n'est plus dérivée de cette clé privée",
  "signaturePlayground.edgeDerive": "calcule",
  "signaturePlayground.edgeSign": "signe",
  "signaturePlayground.deriveAction": "Calculer la clé publique (dérivation)",
  "signaturePlayground.deriveConsumed": "Clé dérivée",
  "signaturePlayground.signAction": "Signer le message",
  "signaturePlayground.signConsumed": "Message signé",
  "signaturePlayground.verifyAction": "Simuler la vérification par le réseau",
  "signaturePlayground.verifyConsumed": "Vérification simulée",
  "signaturePlayground.matchVerifyFn": "verify(message, signature, clé publique)",
  "signaturePlayground.matchYes": "correspondent",
  "signaturePlayground.matchNo": "ne correspondent pas",
  "signaturePlayground.verifyMoreInfo": "en savoir plus",
  "signaturePlayground.verifyMoreInfoUrl": "https://fr.wikipedia.org/wiki/ECDSA",
  "signaturePlayground.networkVerifies": "Chaque nœud du réseau vérifie 3 éléments",
  "signaturePlayground.rowMessage": "message",
  "signaturePlayground.rowSignature": "signature",
  "signaturePlayground.rowPubkey": "clé publique",
  "signaturePlayground.acceptedBadge": "Acceptée par le réseau",
  "signaturePlayground.rejectedBadge": "Rejetée par le réseau",
  "signaturePlayground.acceptedExpl":
    "Le réseau peut vérifier que cette signature correspond bien à ce message et à cette clé publique, sans jamais avoir besoin de connaître la clé privée.",
  "signaturePlayground.rejectedExpl":
    "Le réseau attendait une signature correspondant à la clé publique de Nicolas. Aucune clé n'est « fausse » en soi : toute autre clé privée peut signer ses propres transactions, mais ne peut jamais se substituer à Nicolas pour signer la sienne.",
  "signaturePlayground.disclosureDerivationTitle": "Qu'est-ce qu'une dérivation ?",
  "signaturePlayground.disclosurePrivateKeyTitle":
    "Comment cela prouve-t-il que l'on détient la clé privée sans jamais l'exposer ?",
  "signaturePlayground.derivationDefinition":
    "Tu as vu que la clé publique est calculée à partir de la clé privée par une opération à sens unique. Ce calcul a un nom : la dérivation. C'est l'effet « tube de dentifrice » : une fois sorti, il ne rentre plus.",
  "signaturePlayground.pedagogyConcretely":
    "Aucune méthode connue ne permet de remonter de la clé publique à la clé privée. Et créer une signature valide sans la bonne clé privée demanderait plus de temps que l'âge de l'univers, même en mobilisant toute la puissance de calcul de la planète.",
  "signaturePlayground.pedagogyAnalogy":
    "C'est comme une serrure : tout le monde peut vérifier qu'une clé ouvre la porte, mais seul celui qui possède la bonne clé peut l'utiliser.",
  "signaturePlayground.reset": "Réinitialiser",

  // SeedGenerator
  "seedGenerator.title": "Génères ta seed",
  "seedGenerator.subtitle":
    "Une seed phrase est une façon simple pour un humain de représenter une grande quantité d'information aléatoire, que la machine, elle, manipule en bits.",
  "seedGenerator.step1Label": "1. Choisis le format",
  "seedGenerator.step2Label": "2. Générer la seed",
  "seedGenerator.length12": "12 mots",
  "seedGenerator.length24": "24 mots",
  "seedGenerator.generate": "Générer une seed",
  "seedGenerator.regenerate": "Générer une nouvelle seed",
  "seedGenerator.mnemonicLabelPrefix": "Phrase mnémonique",
  "seedGenerator.binaryDisclosureTitle": "Voir ce qu'il y a derrière la seed",
  "seedGenerator.entropy": "Entropie",
  "seedGenerator.checksum": "Checksum",
  "seedGenerator.mnemonic": "Mnemonic",
  "seedGenerator.bitsUnit": "bits",
  "seedGenerator.wordsUnit": "mots",
  "seedGenerator.heroQuote":
    "Derrière ces mots, il y a en réalité une suite de bits générée aléatoirement. C'est ça, la vraie seed. Les mots ne sont qu'une couche de lecture pour ton cerveau.",
  "seedGenerator.noteTitle": "À retenir",
  "seedGenerator.noteWordForm":
    "La forme en mots est choisie pour être plus simple à retenir et à recopier qu'une longue suite binaire.",
  "seedGenerator.noteWordList":
    "Ces mots ne sont pas choisis librement : ils proviennent d'une liste prédéfinie de 2048 mots (standard BIP39).",
  "seedGenerator.noteStandardLengths":
    "En BIP39, les longueurs standard sont 12, 15, 18, 21 ou 24 mots.",
  "seedGenerator.notePedagogical": "Les mots affichés ici sont des exemples pédagogiques.",

  // WalletDiscoveryGame
  "walletGame.title": "Retrouve les fonds dans ce portefeuille",
  "walletGame.intro":
    "Pour cet exercice, le portefeuille ne génère que 3 clés. Une seule permet de dépenser des fonds. Sauras-tu la retrouver ?",
  "walletGame.revealAction": "Dériver 3 paires de clés",
  "walletGame.derivedSection": "Trois adresses dérivées de la seed",
  "walletGame.questionLabel": "Quelle adresse permet de dépenser des fonds ?",
  "walletGame.selectHint": "Clique sur l'une des cartes ci-dessus pour la sélectionner.",
  "walletGame.selectedPrefix": "Adresse",
  "walletGame.selectedSuffix": "sélectionnée.",
  "walletGame.amountLabel": "Quel est le montant total contrôlé (BTC) ?",
  "walletGame.validateAction": "Valider ma réponse",
  "walletGame.correctTitle": "Correct",
  "walletGame.correctMain":
    "Cette adresse contrôle plusieurs UTXO, et leur somme constitue le montant affiché par le portefeuille.",
  "walletGame.correctPedagogy":
    "Chaque UTXO est verrouillé pour une adresse donnée. La clé privée correspondante permet de produire une signature valide pour les dépenser. Le portefeuille agrège ces UTXO pour afficher un montant simple.",
  "walletGame.incorrectTitle": "Incorrect",
  "walletGame.incorrectMain":
    "Observe quelles adresses possèdent des UTXO et additionne-les. Tu peux changer ta sélection ci-dessus puis re-valider.",
  "walletGame.restart": "Recommencer",
  "walletGame.disclaimer":
    "Les clés et adresses affichées sont fictives et utilisées uniquement à des fins pédagogiques.",
  "walletGame.cardAddressPrefix": "Adresse",
  "walletGame.cardPrivateKey": "Clé privée",
  "walletGame.cardPublicKey": "Clé publique",
  "walletGame.cardAddressLabel": "Adresse",
  "walletGame.cardUtxosLabel": "UTXO contrôlés",
  "walletGame.cardNoUtxos": "Aucun UTXO sur cette adresse",
  "walletGame.cardUtxoPrefix": "UTXO",

  // TransactionModelComparison
  "txComparison.bankTitle": "Banque",
  "txComparison.bankSubtitle": "Simulation d'une transaction bancaire",
  "txComparison.bankDesc": "Un virement met à jour un solde de compte.",
  "txComparison.bankScenario": "Nicolas souhaite virer 1 000 € à Mme Michu.",
  "txComparison.bankSummary": "Le solde est modifié dans le registre bancaire.",
  "txComparison.bankLedger": "Registre bancaire",
  "txComparison.bankUpdated": "Mis à jour",
  "txComparison.bankTransferLabel": "Virement",
  "txComparison.bankKeyText": "Une transaction bancaire déplace un solde.",
  "txComparison.btcTitle": "Bitcoin",
  "txComparison.btcSubtitle": "Simulation d'une transaction Bitcoin",
  "txComparison.btcDesc": "Une transaction consomme des UTXO et en crée de nouvelles.",
  "txComparison.btcScenario":
    "Nicolas souhaite envoyer 1,3 BTC à Mme Michu. Elle possède deux UTXO (0,8 et 1 BTC).",
  "txComparison.btcBefore": "Avant",
  "txComparison.btcAfter": "Après",
  "txComparison.btcAction": "Transaction de 1,3 BTC",
  "txComparison.btcConsumed": "Consommés",
  "txComparison.btcOutputs": "Nouvelles sorties",
  "txComparison.btcSummary": "Le droit de dépenser est transféré, pas un solde.",
  "txComparison.btcKeyText":
    "Une transaction Bitcoin n'est pas un déplacement monétaire : c'est un transfert du droit de dépenser.",
  "txComparison.nicolas": "Nicolas",
  "txComparison.michu": "Mme Michu",
  "txComparison.change": "Change (Nicolas)",
  "txComparison.fees": "Frais mineur",
  "txComparison.simulate": "Effectuer la transaction",
  "txComparison.reset": "Réinitialiser",
  "txComparison.balance": "Solde",
  "txComparison.btcInputsLabel": "ENTRÉES",
  "txComparison.btcOutputsLabel": "NOUVELLES SORTIES",
  "txComparison.btcLockedBy": "Verrouillé par",
  "txComparison.btcCanSpend": "peut dépenser",
  "txComparison.btcConsumedBadge": "CONSOMMÉ",
  "txComparison.btcTxBox": "TRANSACTION",
  "txComparison.btcChangeNote": "monnaie",
  "txComparison.btcRightsDestroyed":
    "Les anciens droits sont détruits. De nouveaux droits sont créés.",

  // DifficultyAdjustment
  "difficulty.title": "Régulation de la difficulté",
  "difficulty.miners": "mineurs",
  "difficulty.hashTarget": "Cible de hash",
  "difficulty.avgTime": "Temps moyen / bloc",
  "difficulty.hint.prefix":
    "Peu importe le nombre de mineurs sur le réseau, la cible s'ajuste pour maintenir un bloc toutes les",
  "difficulty.hint.emphasis": "~10 minutes",
  "difficulty.hint.suffix": ". Plus de mineurs ⇒ plus de zéros exigés ⇒ problème plus dur.",

  // Navigation tree
  "nav.tree.bankingSystem": "Comment fonctionne l'argent",
  "nav.tree.moneyOrigin": "D'où vient vraiment ton argent?",
  "nav.tree.twoLevels": "Les deux euros que tu ignores",
  "nav.tree.qe": "L'arme nucléaire des banques centrales",
  "nav.tree.brokenEngine": "Qui a cassé le moteur ?",
  "nav.tree.cantillon": "Pourquoi l'argent va à l'argent",
  "nav.tree.inflation": "Pourquoi ta baguette coûte plus cher",
  "nav.tree.synthesis": "Tu as compris ? Prouve-le.",
  "nav.tree.moneyLaws": "Pourquoi le système échoue",
  "nav.tree.whatIsMoney": "5000 ans de batteries qui fuient",
  "nav.tree.priceOfTime": "Quand le taux dit la vérité",
  "nav.tree.economicCycles": "La boussole truquée de l'économie",
  "nav.tree.socialismProblem": "Mises avait prévenu",
  "nav.tree.austrianMethod": "Le physicien contre le logicien",
  "nav.tree.bitcoinRevolution": "La rupture Bitcoin",
  "nav.tree.howBitcoinWorks": "Bitcoin, sous le capot",
  "nav.tree.whyBitcoin": "Le bloc qui contenait un message",
  "nav.tree.blockchain": "La blockchain disséquée",
  "nav.tree.proofOfWork": "Se mettre d'accord sans chef",
  "nav.tree.rewardAndHalving": "Halving, la dureté codée en dur",
  "nav.tree.utxoAndTransactions": "Bitcoin ne déplace pas d'argent",
  "nav.tree.keysAndSignatures": "Prouver sans se montrer",
  "nav.tree.walletsAndSeed": "Bitcoin, ni compte, ni coffre",
  "nav.tree.getStarted": "Entrer dans le terrier",

  // Footer
  "footer.builtWith": "Construit avec",
  "footer.inspiredBy": "Inspiré par le travail de",

  // HomePage - Hero
  "home.hero.headline": "L'argent que tu utilises... tu ne le comprends pas vraiment.",
  "home.hero.subheadline":
    "Comprendre Bitcoin, c'est d'abord comprendre comment fonctionne l'argent aujourd'hui.",
  "home.hero.ctaPrimary": "Commencer le parcours",
  "home.hero.ctaSecondary": "Voir le programme",

  // HomePage - Section 1: Hook
  "home.hook.title": "Quelque chose ne colle pas.",
  "home.hook.line1": "Ton épargne diminue.",
  "home.hook.line2": "Les prix augmentent.",
  "home.hook.line3": "Les règles changent.",
  "home.hook.bridgeP1": "Et pourtant…",
  "home.hook.bridgeP2": "personne ne t'explique vraiment pourquoi.",

  // HomePage - Section 2: Positioning
  "home.positioning.title": "Ce site n'explique pas Bitcoin. Il remonte plus loin.",
  "home.positioning.comparisonP1": "Comprendre Bitcoin sans comprendre l'argent,",
  "home.positioning.comparisonP2": "c'est comme lire la fin sans connaître l'histoire.",
  "home.positioning.flip": "Ici, on fait l'inverse.",

  // HomePage - Section 3: Journey (3 cards)
  "home.journey.title": "Un parcours en 3 modules",
  "home.journey.step1.label": "Module 1",
  "home.journey.step1.title": "Le Problème",
  "home.journey.step1.desc":
    "Pourquoi ton épargne perd-elle de la valeur ?\nComment l'argent est-il créé ?",
  "home.journey.step2.label": "Module 2",
  "home.journey.step2.title": "Les Lois",
  "home.journey.step2.desc":
    "Qu'est-ce qui fait une « bonne » monnaie ?\nLes règles invisibles qui gouvernent tout.",
  "home.journey.step3.label": "Module 3",
  "home.journey.step3.title": "Bitcoin",
  "home.journey.step3.desc":
    "Une autre façon de concevoir l'argent.\nEt ce que cela change vraiment.",
  "home.journey.cardCta": "Voir ce module",

  // HomePage - Section 4: Audience
  "home.audience.title": "Ce parcours est pour toi si…",
  "home.audience.item1": "Tu veux comprendre sans te perdre.",
  "home.audience.item2": "Tu sens que « l'argent » est important... sans savoir pourquoi.",
  "home.audience.item3": "Tu en as marre des explications floues.",
  "home.audience.item4": "Tu préfères comprendre avant d'avoir un avis.",

  // HomePage - Section 5: Promise
  "home.promise.title": "Ce que tu vas obtenir",
  "home.promise.intro": "À la fin du parcours :",
  "home.promise.item1": "Tu verras Bitcoin beaucoup plus clairement.",
  "home.promise.item2": "Tu comprendras ce qu'il change vraiment.",
  "home.promise.item3": "Et surtout... pourquoi il existe.",

  // HomePage - Section 6: Differentiation
  "home.differentiation.neg1": "Ici, pas de jargon inutile.",
  "home.differentiation.neg2": "Pas de discours militant.",
  "home.differentiation.neg3": "Pas de simplification trompeuse.",
  "home.differentiation.posIntro": "Juste un objectif :",
  "home.differentiation.pos": "Te faire comprendre.",

  // HomePage - Section 7: Philosophy quote
  "home.philosophy.quote":
    "Le problème fondamental des monnaies traditionnelles, c'est toute la confiance qu'elles exigent.",

  // HomePage - Section 8: Final CTA
  "home.finalCta.titleP1": "Accès totalement libre et gratuit.",
  "home.finalCta.titleP2": "La curiosité est ton seul guide.",
  "home.finalCta.button": "Commencer le parcours",

  // Footer
  "footer.donateMessage": "Si ce projet te plaît, soutiens-le en sats.",
  "footer.copy": "Copier",
  "footer.copied": "Copié !",
  "footer.copyright": "© 2026 - Bitcoin.Decoded",
} as const;

export default fr;
