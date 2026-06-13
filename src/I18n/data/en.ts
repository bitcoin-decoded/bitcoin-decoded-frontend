const en = {
  // Layout
  "header.homeAriaLabel": "Back to homepage",
  "nav.title": "Navigation",
  "nav.previous": "Previous",
  "nav.next": "Next",
  "theme.toggleAriaLabel.light": "Switch to dark mode",
  "theme.toggleAriaLabel.dark": "Switch to light mode",
  "language.toggleAriaLabel": "Passer en français",

  // Components
  "chapterPrelude.label": "Prelude",
  "quiz.label": "Quiz",
  "synthesisQuiz.label": "Synthesis quiz",
  "synthesisQuiz.question": "Question",
  "synthesisQuiz.chapter": "Chapter",
  "synthesisQuiz.submit": "Submit my answers",
  "synthesisQuiz.answerAll": "Answer every question first",
  "synthesisQuiz.retry": "Try again",
  "synthesisQuiz.threshold": "Pass threshold:",
  "synthesisQuiz.passed": "Passed! The foundations are in place.",
  "synthesisQuiz.failed": "Not quite there. Try again to unlock the synthesis.",
  "identityCard.expand": "Expand",
  "identityCard.collapse": "Collapse",
  "balanceSheet.assets": "ASSETS",
  "balanceSheet.liabilities": "LIABILITIES",

  // Simulators - buttons
  "simulator.credit.grant": "Grant the loan!",
  "simulator.credit.retry": "Retry",
  "simulator.credit.title": "NICOLAS'S BANK BALANCE SHEET",
  "simulator.compensation.start": "Start compensation",
  "simulator.compensation.retry": "Retry",
  "simulator.compensation.title": "NICOLAS'S BANK BALANCE SHEET",
  "simulator.default.simulate": "Simulate a loan default worth a total of €30,000,000",
  "simulator.default.retry": "Retry",
  "simulator.default.title": "ILLUSTRATION OF POINTS 1 AND 2 ON THE BANK'S BALANCE SHEET",
  "simulator.qe.buy": "Buy bonds massively",
  "simulator.qe.retry": "Retry",
  "simulator.qe.bondTitle": "Government Bond Coupon",
  "simulator.qe.bondPrice": "Bond price",
  "simulator.qe.bondYield": "Yield (Interest rate)",
  "simulator.capitalChain.button": "GO BACK IN TIME",

  // YieldCurve
  "yieldCurve.title": "Simulation of commercial bank profitability based on the long-term rate",
  "yieldCurve.shortRate": "Short-term rate",
  "yieldCurve.longRate": "Long-term rate",
  "yieldCurve.shortRateName": "Short Rate",
  "yieldCurve.longRateName": "Long Rate",
  "yieldCurve.years": "Years",
  "yieldCurve.evaluation": "Assessment",

  // MonetaryGallery
  "monetaryGallery.history": "Its history:",
  "monetaryGallery.characteristics": "Its characteristics:",
  "monetaryGallery.limitations": "Its limitations:",

  // Monetary characteristics
  "characteristic.durability": "Durability",
  "characteristic.portability": "Portability",
  "characteristic.divisibility": "Divisibility",
  "characteristic.fungibility": "Fungibility",
  "characteristic.hardness": "Hardness",

  // AccountingTerms
  "accountingTerms.sectionTitle": "Accounting: a few key definitions",

  // CustodyOptions
  "custodyOptions.sectionTitle": "Two ways to hold your bitcoin",

  // WalletFamilies
  "walletFamilies.sectionTitle": "Three wallet families",

  // PathFinder — Which path for you?
  "pathFinder.step": "Step",

  // MonetaryAggregates
  "monetaryAggregates.sectionTitle":
    "The two kinds of money: the one you use, and the one reserved for banks",

  // MonetaryPillars
  "monetaryPillars.sectionTitle": "The five pillars of money",
  "monetaryPillars.prompt":
    "Click each pillar for the definition. Keep an eye on the fifth one. It's the one that decides everything.",

  // MonetaryProperties
  "monetaryProperties.sectionTitle": "Scarcity versus Hardness",

  // BlockchainChainVisual
  "chain.block": "Block",
  "chain.header": "Header",
  "chain.body": "Body",
  "chain.merkleRoot": "Merkle root",
  "chain.hashFormula": "Hash of the block header",
  "chain.blockHash": "Block hash",
  "chain.prevHash": "Prev. block hash",
  "chain.timestamp": "Timestamp",
  "chain.transaction": "Transaction",
  "chain.addBlock": "Add a block",
  "chain.reset": "Reset",
  "chain.chainBroken": "Broken link",
  "chain.modified": "Tampered",
  "chain.editTx": "Edit transaction",
  "chain.modifyTx": "Modify transaction",
  "chain.originalHash": "Original hash",
  "chain.newHash": "New hash",
  "chain.invitation":
    "ALAKAZAM! 💥 See that? The hash of the first block became the reference of the second. Now, the real show: modify the transaction in block #100826 and watch the chain break.",
  "chain.disclosureTitle": "Why only one transaction per block?",
  "chain.disclosureBody":
    "A teaching simplification. In reality, a Bitcoin block contains thousands of transactions, all summed up in the Merkle root. Here we show only one so the mechanism stays readable. Don't worry, the principle is exactly the same.",
  "chain.noteTitle": "Why editing one transaction breaks the whole chain",
  "chain.note":
    "Each block's hash is computed by applying SHA-256 twice to its header — not directly to its transactions. Transactions are first condensed into a Merkle root, which is then placed in the header. Modifying a single transaction changes the Merkle root, hence the header, hence the block hash — and every subsequent block now points to a hash that no longer exists. The whole chain collapses.",

  // MiningSimulator
  "mining.title": "Mining simulator",
  "mining.target": "Target: the hash must start with",
  "mining.button": "Test a nonce",
  "mining.reset": "Reset",
  "mining.attempt": "Nonce",
  "mining.found": "Valid nonce found! The miner earned the right to propose this block.",
  "mining.notFound": "Invalid hash - target not reached. Try again!",
  "mining.headerLabel": "Block header being hashed:",
  "mining.nonce": "nonce",

  // DoubleSpendDemo
  "doubleSpend.title": "Double-spending",
  "doubleSpend.sender": "Nicolas",
  "doubleSpend.txA": "Transaction A",
  "doubleSpend.txB": "Transaction B",
  "doubleSpend.signedFrom": "signed from",
  "doubleSpend.amount": "0.1 BTC",
  "doubleSpend.recipientA": "Christine L.",
  "doubleSpend.recipientB": "Mrs. Smith",
  "doubleSpend.originA": "Paris",
  "doubleSpend.originB": "Tokyo",
  "doubleSpend.pinch":
    "Same bitcoin, two recipients. Nicolas tries to spend it twice, from two different points on the globe.",
  "doubleSpend.revealAction": "What do the nodes see?",
  "doubleSpend.firstSeenLabel": "What each node saw first",
  "doubleSpend.verdictTitle": "The network disagrees",
  "doubleSpend.verdictBody":
    "Christine thinks she's been paid. So does Mrs. Smith. Nobody can decide without a central authority.",
  "doubleSpend.reset": "Try again",
  "doubleSpend.continue": "How do we decide?",

  // MempoolVisual
  "mempool.subtitle": "Pending transactions",
  "mempool.blockLabel": "Block",
  "mempool.blockSubtitle": "Header & included transactions",
  "mempool.added": "Added",
  "mempool.empty": "- empty -",
  "mempool.doubleSpend.prefix": "Nicolas is trying to spend",
  "mempool.doubleSpend.emphasis": "the same BTC",
  "mempool.doubleSpend.suffix": "twice: once to Ms. Smith, once to Christine L.",
  "mempool.invalidated.prefix": "Transaction",
  "mempool.invalidated.emphasis": "invalidated",
  "mempool.invalidated.suffix": ": this BTC was already spent in the mined block.",
  "mempool.addBlock": "Add this new block",
  "mempool.reset": "Reset",

  // MiningRewardBlock
  "miningReward.blockSubtitle": "Header + transactions selected by the miner",
  "miningReward.validated": "Validated",
  "miningReward.rewardTitle": "Block reward",
  "miningReward.rewardSubtitle": "Protocol subsidy + transaction fees",
  "miningReward.subsidy": "Subsidy (2026)",
  "miningReward.fees": "Transaction fees",
  "miningReward.total": "Total reward",
  "miningReward.wallet": "Miner wallet",
  "miningReward.unassigned": "Reward not yet assigned",
  "miningReward.rewarded": "Miner rewarded",
  "miningReward.rewardBtn": "Reward the miner",
  "miningReward.resetBtn": "Reset",
  "miningReward.rewardNoteTitle": "Reward received",
  "miningReward.rewardNoteFees": "in transaction fees",
  "miningReward.rewardNoteSubsidy": "in protocol subsidy",
  "miningReward.rewardNoteNewBitcoin": "new bitcoins created by this block",

  // HalvingChart
  "halvingChart.title": "Block reward (BTC) - halving schedule",
  "halvingChart.today": "today",
  "halvingChart.tooltipLabel": "Reward",
  "halvingChart.tooltipYear": "Year",
  "halvingChart.caption":
    "Each plateau corresponds to a halving (~every 210,000 blocks, i.e. ~4 years).",

  // HalvingTimeMachine
  "halvingTimeMachine.title": "Halving time machine",
  "halvingTimeMachine.yearLabel": "Year",
  "halvingTimeMachine.intro":
    "Set the dial. Pull the lever. Discover the block reward of that era.",
  "halvingTimeMachine.dialLabel": "Destination year",
  "halvingTimeMachine.screenIdle": "Pull the lever to travel through time.",
  "halvingTimeMachine.traveling": "Time traveling…",
  "halvingTimeMachine.rewardLabel": "Reward per block",
  "halvingTimeMachine.workTimePrefix":
    "What a miner earned in 10 minutes back in 2009 would now take them",
  "halvingTimeMachine.workTimeSuffix": "of work.",
  "halvingTimeMachine.workTimeGenesis": "The very first tier: 50 BTC per block, every 10 minutes.",
  "halvingTimeMachine.workTimeSymbolic":
    "By now, the subsidy is barely a token. It's the transaction fees that pick up the slack.",
  "halvingTimeMachine.exhausted": "Issuance complete: all 21 million bitcoins are in circulation.",
  "halvingTimeMachine.lever": "Pull the lever",
  "halvingTimeMachine.leverTraveling": "Traveling...",
  "halvingTimeMachine.caption":
    "Rewards rounded to the nearest satoshi. Beyond ~2140, issuance drops to zero.",

  // DunbarSlider
  "dunbar.sliderAria": "Group size",
  "dunbar.peopleLabel": "people",
  "dunbar.counterLabel": "Possible relationships to remember",
  "dunbar.overloadTitle": "Cognitive overload",
  "dunbar.overloadBody": "Individual memory maxed out. You need an external system: money.",

  // NetworkFlywheel
  "flywheel.step.usage": "Network usage",
  "flywheel.step.fees": "Fees generated (per block)",
  "flywheel.step.miners": "Miner revenue (per block)",
  "flywheel.step.security": "Network security",
  "flywheel.step.value": "Value secured",
  "flywheel.increase": "Increase usage",
  "flywheel.maxReached": "Maximum usage",
  "flywheel.reset": "Reset",
  "flywheel.taglineIdle": "Increase usage to observe how the cycle propagates.",
  "flywheel.tagline": "The more the network is used, the more secure it becomes.",
  "flywheel.cycleLabel": "Self-reinforcing cycle",

  // UTXOTransactionBuilder
  "utxoBuilder.title": "Build a transaction",
  "utxoBuilder.step1": "1. Select Nicolas's UTXOs",
  "utxoBuilder.step2": "2. Amount to send (BTC)",
  "utxoBuilder.placeholder": "e.g. 0.75",
  "utxoBuilder.totalInput": "Total inputs:",
  "utxoBuilder.inputs": "Inputs",
  "utxoBuilder.outputs": "Outputs",
  "utxoBuilder.recipient": "Recipient",
  "utxoBuilder.change": "Change (Nicolas)",
  "utxoBuilder.fees": "Miner fee",
  "utxoBuilder.valid": "Valid transaction",
  "utxoBuilder.insufficient": "Insufficient funds",
  "utxoBuilder.selectHint": "Select UTXOs and enter an amount",
  "utxoBuilder.reset": "Clear all",
  "utxoBuilder.utxoHint":
    "Each UTXO is like an indivisible coin in Nicolas's wallet - they can't be split.",
  "utxoBuilder.newUtxoRecipient": "New UTXO → Recipient",
  "utxoBuilder.newUtxoNicolas": "New UTXO → Nicolas",
  "utxoBuilder.recipientDesc": "What they receive",
  "utxoBuilder.changeDesc": "Change returned (inputs - amount - fees)",
  "utxoBuilder.feesImplicit": "Implicit fees → Miner",
  "utxoBuilder.feesDesc": "Unallocated difference, collected by the miner",
  "utxoBuilder.totalRow": "Total inputs",

  // SignatureVerifier
  "sigVerifier.title": "Signature verification",
  "sigVerifier.message": "Message",
  "sigVerifier.pubkey": "Public key",
  "sigVerifier.signature": "Signature",
  "sigVerifier.tamper": "Tamper",
  "sigVerifier.restore": "Restore",
  "sigVerifier.originalHint": "Original value:",
  "sigVerifier.verify": "Verify signature",
  "sigVerifier.valid": "Valid signature",
  "sigVerifier.invalid": "Invalid signature",
  "sigVerifier.validDesc": "All three elements match. The network would accept this transaction.",
  "sigVerifier.invalidDesc":
    "One element has been tampered with. The network immediately rejects this transaction.",
  "sigVerifier.idle": 'Click "Verify" to simulate the verification.',
  "sigVerifier.reset": "Reset",

  // KeySignatureTrio
  "keyTrio.sectionTitle": "Three elements, three roles",
  "keyTrio.prompt": "Click on each element. You'll see how it all fits together.",
  "keyTrio.emptyState": "Pick an element to discover its role.",
  "keyTrio.explored": "explored",

  // SignaturePlayground
  "signaturePlayground.title": "Nicolas makes his first transaction",
  "signaturePlayground.sectionElements": "The three elements",
  "signaturePlayground.privateKeyLabel": "Private key (secret)",
  "signaturePlayground.publicKeyLabel": "Public key",
  "signaturePlayground.messageLabel": "Message to sign",
  "signaturePlayground.messageHint": "The transaction content that will be signed.",
  "signaturePlayground.signatureLabel": "Signature",
  "signaturePlayground.publicKeyGenerated": "Generated public key:",
  "signaturePlayground.signatureGenerated": "Generated signature:",
  "signaturePlayground.publicKeyPending": "Not computed yet.",
  "signaturePlayground.signaturePending": "Message not signed yet.",
  "signaturePlayground.modifyKeyAction": "Modify the private key",
  "signaturePlayground.readOnly": "Read-only",
  "signaturePlayground.privateKeyOwner": "Known only by Nicolas",
  "signaturePlayground.publicKeyOwner": "Known to the entire network",
  "signaturePlayground.publicKeyDerivation": "Derived from the private key",
  "signaturePlayground.derivationCaption":
    "This example shows one of Nicolas's (private key ↔ public key) pairs. In Bitcoin, each user can hold several. And each pair is drawn from a space so vast that there are more possible keys than atoms in the observable universe. Good luck landing on the same one.",
  "signaturePlayground.message": "Nicolas sends 1 BTC to Ms. Smith",
  "signaturePlayground.statusValid": "This public key is derived from the private key",
  "signaturePlayground.statusInvalid": "This public key is no longer derived from the private key",
  "signaturePlayground.edgeDerive": "computes",
  "signaturePlayground.edgeSign": "signs",
  "signaturePlayground.deriveAction": "Compute the public key (derivation)",
  "signaturePlayground.deriveConsumed": "Key derived",
  "signaturePlayground.signAction": "Sign the message",
  "signaturePlayground.signConsumed": "Message signed",
  "signaturePlayground.verifyAction": "Simulate network verification",
  "signaturePlayground.verifyConsumed": "Verification simulated",
  "signaturePlayground.matchVerifyFn": "verify(message, signature, public key)",
  "signaturePlayground.matchYes": "match",
  "signaturePlayground.matchNo": "do not match",
  "signaturePlayground.verifyMoreInfo": "learn more",
  "signaturePlayground.verifyMoreInfoUrl":
    "https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm",
  "signaturePlayground.networkVerifies": "Each network node verifies 3 elements",
  "signaturePlayground.rowMessage": "message",
  "signaturePlayground.rowSignature": "signature",
  "signaturePlayground.rowPubkey": "public key",
  "signaturePlayground.acceptedBadge": "Accepted by the network",
  "signaturePlayground.rejectedBadge": "Rejected by the network",
  "signaturePlayground.acceptedExpl":
    "The network can verify that this signature matches this message and this public key, without ever needing to know the private key.",
  "signaturePlayground.rejectedExpl":
    "he network was expecting a signature corresponding to Nicolas's public key. No key is ever 'wrong' in itself: any other private key can sign its own transactions, but none of them can produce a signature that matches Nicolas's public key.",
  "signaturePlayground.disclosureDerivationTitle": "What does derivation mean?",
  "signaturePlayground.disclosurePrivateKeyTitle":
    "How does this prove possession of the private key without ever revealing it?",
  "signaturePlayground.derivationDefinition":
    "You've seen that the public key is calculated from the private key through a one-way operation. That calculation has a name: derivation. It's the 'toothpaste tube' effect: once it's out, it doesn't go back in.",
  "signaturePlayground.pedagogyConcretely":
    "No known method can derive the private key from the public key. And forging a valid signature without the right private key would take longer than the age of the universe, even harnessing every computer on the planet.",
  "signaturePlayground.pedagogyAnalogy":
    "It's like a lock: anyone can verify that a key opens the door, but only whoever holds the right key can use it.",
  "signaturePlayground.reset": "Reset",

  // SeedGenerator
  "seedGenerator.title": "Generate your seed",
  "seedGenerator.subtitle":
    "A seed phrase is a human-friendly way to represent a large amount of random information - information the machine itself handles as bits.",
  "seedGenerator.step1Label": "1. Choose the format",
  "seedGenerator.step2Label": "2. Generate the seed",
  "seedGenerator.length12": "12 words",
  "seedGenerator.length24": "24 words",
  "seedGenerator.generate": "Generate a seed",
  "seedGenerator.regenerate": "Generate a new seed",
  "seedGenerator.mnemonicLabelPrefix": "Mnemonic phrase",
  "seedGenerator.binaryDisclosureTitle": "See what's behind the seed",
  "seedGenerator.entropy": "Entropy",
  "seedGenerator.checksum": "Checksum",
  "seedGenerator.mnemonic": "Mnemonic",
  "seedGenerator.bitsUnit": "bits",
  "seedGenerator.wordsUnit": "words",
  "seedGenerator.heroQuote":
    "Behind these words, there's actually a sequence of randomly generated bits. That's the real seed. The words are just a readable layer for your brain.",
  "seedGenerator.noteTitle": "Key points",
  "seedGenerator.noteWordForm":
    "The word form is chosen because it's easier to remember and copy than a long binary string.",
  "seedGenerator.noteWordList":
    "These words are not chosen freely: they come from a predefined list of 2048 words (BIP39 standard).",
  "seedGenerator.noteStandardLengths":
    "In BIP39, the standard lengths are 12, 15, 18, 21 or 24 words.",
  "seedGenerator.notePedagogical": "The words shown here are pedagogical examples.",

  // WalletDiscoveryGame
  "walletGame.title": "Find the funds in this wallet",
  "walletGame.intro":
    "For this exercise, the wallet generates only 3 keys. Only one allows you to spend funds. Can you find it?",
  "walletGame.revealAction": "Derive 3 key pairs",
  "walletGame.derivedSection": "Three addresses derived from the seed",
  "walletGame.questionLabel": "Which address can spend funds?",
  "walletGame.selectHint": "Click one of the cards above to select it.",
  "walletGame.selectedPrefix": "Address",
  "walletGame.selectedSuffix": "selected.",
  "walletGame.amountLabel": "What's the total amount controlled (BTC)?",
  "walletGame.validateAction": "Submit my answer",
  "walletGame.correctTitle": "Correct",
  "walletGame.correctMain":
    "This address controls several UTXOs, and their sum makes up the amount the wallet displays.",
  "walletGame.correctPedagogy":
    "Each UTXO is locked to a given address. The matching private key produces a valid signature to spend it. The wallet aggregates these UTXOs to display a single simple amount.",
  "walletGame.incorrectTitle": "Incorrect",
  "walletGame.incorrectMain":
    "Look at which addresses hold UTXOs and add them up. You can change your selection above and submit again.",
  "walletGame.restart": "Start over",
  "walletGame.disclaimer":
    "The keys and addresses shown are fictitious, used for teaching purposes only.",
  "walletGame.cardAddressPrefix": "Address",
  "walletGame.cardPrivateKey": "Private key",
  "walletGame.cardPublicKey": "Public key",
  "walletGame.cardAddressLabel": "Address",
  "walletGame.cardUtxosLabel": "Controlled UTXOs",
  "walletGame.cardNoUtxos": "No UTXO on this address",
  "walletGame.cardUtxoPrefix": "UTXO",

  // TransactionModelComparison
  "txComparison.bankTitle": "Bank",
  "txComparison.bankSubtitle": "Bank transaction simulation",
  "txComparison.bankDesc": "A transfer updates an account balance.",
  "txComparison.bankScenario": "Nicolas wants to transfer €1,000 to Ms. Smith.",
  "txComparison.bankSummary": "The balance is updated in the bank ledger.",
  "txComparison.bankLedger": "Bank ledger",
  "txComparison.bankUpdated": "Updated",
  "txComparison.bankTransferLabel": "Transfer",
  "txComparison.bankKeyText": "A bank transaction moves a balance.",
  "txComparison.btcTitle": "Bitcoin",
  "txComparison.btcSubtitle": "Bitcoin transaction simulation",
  "txComparison.btcDesc": "A transaction consumes UTXOs and creates new ones.",
  "txComparison.btcScenario":
    "Nicolas wants to send 1.3 BTC to Ms. Smith. She holds two UTXOs (0.8 and 1 BTC).",
  "txComparison.btcBefore": "Before",
  "txComparison.btcAfter": "After",
  "txComparison.btcAction": "Transaction of 1.3 BTC",
  "txComparison.btcConsumed": "Consumed",
  "txComparison.btcOutputs": "New outputs",
  "txComparison.btcSummary": "The right to spend is transferred, not a balance.",
  "txComparison.btcKeyText":
    "A Bitcoin transaction is not a monetary transfer: it's a transfer of the right to spend.",
  "txComparison.nicolas": "Nicolas",
  "txComparison.michu": "Ms. Smith",
  "txComparison.change": "Change (Nicolas)",
  "txComparison.fees": "Miner fee",
  "txComparison.simulate": "Execute transaction",
  "txComparison.reset": "Reset",
  "txComparison.balance": "Balance",
  "txComparison.btcInputsLabel": "INPUTS",
  "txComparison.btcOutputsLabel": "NEW OUTPUTS",
  "txComparison.btcLockedBy": "Locked by",
  "txComparison.btcCanSpend": "can spend",
  "txComparison.btcConsumedBadge": "CONSUMED",
  "txComparison.btcTxBox": "TRANSACTION",
  "txComparison.btcChangeNote": "change",
  "txComparison.btcRightsDestroyed": "Old rights are destroyed. New rights are created.",

  // DifficultyAdjustment
  "difficulty.title": "Difficulty self-regulation",
  "difficulty.miners": "miners",
  "difficulty.hashTarget": "Hash target",
  "difficulty.avgTime": "Avg time / block",
  "difficulty.hint.prefix":
    "No matter how many miners are on the network, the target adjusts to maintain one block every",
  "difficulty.hint.emphasis": "~10 minutes",
  "difficulty.hint.suffix": ". More miners ⇒ more zeros required ⇒ harder problem.",

  // Navigation tree
  "nav.tree.bankingSystem": "How money really works",
  "nav.tree.moneyOrigin": "Who really creates your money?",
  "nav.tree.twoLevels": "The two dollars you don't know about",
  "nav.tree.qe": "The Central Banks' Nuclear Option",
  "nav.tree.brokenEngine": "Who broke the engine?",
  "nav.tree.cantillon": "The trickle that never trickles",
  "nav.tree.inflation": "Why your groceries cost more",
  "nav.tree.synthesis": "Got it? Prove it.",
  "nav.tree.moneyLaws": "Why does the system fail?",
  "nav.tree.whatIsMoney": "5,000 years of leaky batteries",
  "nav.tree.priceOfTime": "When Interest Rates Tell the Truth",
  "nav.tree.economicCycles": "Economy's rigged compass",
  "nav.tree.socialismProblem": "Mises saw it coming",
  "nav.tree.austrianMethod": "The physicist vs. the logician",
  "nav.tree.bitcoinRevolution": "The Bitcoin breakthrough",
  "nav.tree.howBitcoinWorks": "Bitcoin, under the hood",
  "nav.tree.whyBitcoin": "The block that contained a message",
  "nav.tree.blockchain": "The blockchain, dissected",
  "nav.tree.proofOfWork": "Reaching agreement without a leader",
  "nav.tree.rewardAndHalving": "Halving: the hardness hard-coded into the protocol",
  "nav.tree.utxoAndTransactions": "Bitcoin doesn't move money",
  "nav.tree.keysAndSignatures": "Proving without revealing oneself",
  "nav.tree.walletsAndSeed": "Bitcoin: not an account, not a vault",
  "nav.tree.getStarted": "Down the Rabbit Hole",

  // Footer
  "footer.builtWith": "Built with",
  "footer.inspiredBy": "Inspired by the work of",

  // HomePage - Hero
  "home.hero.headline": "The money you use... you don't really understand it.",
  "home.hero.subheadline":
    "To understand Bitcoin, you first need to understand how money work today.",
  "home.hero.ctaPrimary": "Start the journey",
  "home.hero.ctaSecondary": "See the program",

  // HomePage - Section 1: Hook
  "home.hook.title": "Something doesn't add up.",
  "home.hook.line1": "Your savings shrink.",
  "home.hook.line2": "Prices rise.",
  "home.hook.line3": "The rules change.",
  "home.hook.bridgeP1": "And yet…",
  "home.hook.bridgeP2": "no one really explains why.",

  // HomePage - Section 2: Positioning
  "home.positioning.title": "This site doesn't explain Bitcoin. It goes back further.",
  "home.positioning.comparisonP1": "Understanding Bitcoin without understanding money,",
  "home.positioning.comparisonP2": "is like reading the ending without knowing the story.",
  "home.positioning.flip": "Here, we do the opposite.",

  // HomePage - Section 3: Journey (3 cards)
  "home.journey.title": "A journey in 3 modules",
  "home.journey.step1.label": "Module 1",
  "home.journey.step1.title": "The Problem",
  "home.journey.step1.desc": "Why are your savings losing value?\nHow is money actually created?",
  "home.journey.step2.label": "Module 2",
  "home.journey.step2.title": "The Rules",
  "home.journey.step2.desc":
    'What makes a currency "good"?\nThe invisible rules that govern everything.',
  "home.journey.step3.label": "Module 3",
  "home.journey.step3.title": "Bitcoin",
  "home.journey.step3.desc": "A different way to design money.\nAnd what it really changes.",
  "home.journey.cardCta": "See this module",

  // HomePage - Section 4: Audience
  "home.audience.title": "This journey is for you if...",
  "home.audience.item1": "You want to understand without getting lost",
  "home.audience.item2": 'You sense that "money" is important... without knowing why',
  "home.audience.item3": "You're tired of fuzzy explanations",
  "home.audience.item4": "You'd rather understand before forming an opinion",

  // HomePage - Section 5: Promise
  "home.promise.title": "What you'll get",
  "home.promise.intro": "By the end of the journey:",
  "home.promise.item1": "You'll see Bitcoin more clearly.",
  "home.promise.item2": "You'll understand what it really changes.",
  "home.promise.item3": "And above all... why it exists",

  // HomePage - Section 6: Differentiation
  "home.differentiation.neg1": "No unnecessary jargon.",
  "home.differentiation.neg2": "No ideology.",
  "home.differentiation.neg3": "No misleading simplifications.",
  "home.differentiation.posIntro": "Just one goal:",
  "home.differentiation.pos": "to make you understand.",

  // HomePage - Section 7: Philosophy quote
  "home.philosophy.quote":
    "The root problem with conventional currency is all the trust that's required...",

  // HomePage - Section 8: Final CTA
  "home.finalCta.titleP1": "Free and open access.",
  "home.finalCta.titleP2": "Curiosity is your only guide.",
  "home.finalCta.button": "Start the journey",

  // Footer
  "footer.donateMessage": "If you like this project, support it in sats.",
  "footer.copy": "Copy",
  "footer.copied": "Copied!",
  "footer.copyright": "© 2026 - Bitcoin.Decoded",
} as const;

export default en;
