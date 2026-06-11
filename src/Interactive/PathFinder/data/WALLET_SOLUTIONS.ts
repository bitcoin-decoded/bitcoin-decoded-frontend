import type { WalletSolution } from "../types";

export const WALLET_SOLUTIONS: WalletSolution[] = [
  // ── Acquisition: exchange platforms (also custodial holders) ───────────────
  {
    name: "Binance",
    custodial: true,
    openSource: false,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["exchange", "custodial"],
  },
  {
    name: "Kraken",
    custodial: true,
    openSource: false,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["exchange", "custodial"],
  },
  {
    name: "Coinbase",
    custodial: true,
    openSource: false,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["exchange", "custodial"],
  },

  // ── Acquisition: peer-to-peer ──────────────────────────────────────────────
  {
    name: "Peach Bitcoin",
    custodial: false,
    openSource: true,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["p2p"],
  },
  {
    name: "RoboSats",
    custodial: false,
    openSource: true,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["p2p"],
  },
  {
    name: "Bisq",
    custodial: false,
    openSource: true,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["p2p"],
  },

  // ── Acquisition: ETF (paper bitcoin, no real coins) ────────────────────────
  {
    name: "iShares Bitcoin Trust (IBIT)",
    custodial: true,
    openSource: false,
    connexion: "n-a",
    free: false,
    multisig: false,
    subCategories: ["etf"],
    sensitiveNote: {
      fr: "Tu détiens une part de fonds, pas de vrais bitcoins : aucun retrait on-chain.",
      en: "You hold a share of a fund, not actual bitcoin: no on-chain withdrawal.",
    },
  },
  {
    name: "Bitwise (BITB)",
    custodial: true,
    openSource: false,
    connexion: "n-a",
    free: false,
    multisig: false,
    subCategories: ["etf"],
    sensitiveNote: {
      fr: "Tu détiens une part de fonds, pas de vrais bitcoins : aucun retrait on-chain.",
      en: "You hold a share of a fund, not actual bitcoin: no on-chain withdrawal.",
    },
  },

  // ── Acquisition: Bitcoin ATM (cash → your wallet) ──────────────────────────
  {
    name: "Borne Bitcoin (générique)",
    custodial: false,
    openSource: false,
    connexion: "n-a",
    free: true,
    multisig: false,
    subCategories: ["atm"],
    sensitiveNote: {
      fr: "Frais souvent élevés ; vérifie le taux avant d'insérer tes espèces.",
      en: "Fees are often high; check the rate before you feed in your cash.",
    },
  },

  // ── Detention: self-custody — hot wallets ──────────────────────────────────
  {
    name: "BlueWallet",
    custodial: false,
    openSource: true,
    connexion: "hot",
    free: true,
    multisig: false,
    subCategories: ["hot"],
  },
  {
    name: "Green",
    custodial: false,
    openSource: true,
    connexion: "hot",
    free: true,
    multisig: true,
    subCategories: ["hot"],
  },

  // ── Detention: self-custody — cold wallets ─────────────────────────────────
  {
    name: "Trezor",
    custodial: false,
    openSource: true,
    connexion: "cold",
    free: false,
    multisig: true,
    subCategories: ["cold"],
  },
  {
    name: "Coldcard",
    custodial: false,
    openSource: true,
    connexion: "cold",
    free: false,
    multisig: true,
    subCategories: ["cold"],
  },
  {
    name: "Ledger",
    custodial: false,
    openSource: false,
    connexion: "cold",
    free: false,
    multisig: true,
    subCategories: ["cold"],
    sensitiveNote: {
      fr: "Firmware fermé ; la fonction Ledger Recover (2023) a relancé le débat sur l'extractibilité des clés.",
      en: "Closed firmware; the Ledger Recover feature (2023) reignited the debate over whether keys can be extracted.",
    },
  },
];
