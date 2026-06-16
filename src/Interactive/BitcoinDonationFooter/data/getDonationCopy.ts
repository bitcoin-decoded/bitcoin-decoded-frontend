import type { Language } from "../../../I18n";

/**
 * Every bilingual string of the donation flow, in one place. Kept as a
 * language-aware getter (not ~70 global t() keys) because the set is large,
 * feature-local, and heavily interpolated. Formatting of numbers (sats, EUR,
 * BTC, fees) is done by the caller via helpers; the builders here only
 * template the already-formatted strings.
 */
export const getDonationCopy = (language: Language) => {
  const fr = language === "fr";

  return {
    footerCta: fr ? "Soutenir en bitcoin" : "Support with bitcoin",
    notConfigured: fr
      ? "Adresse de don pas encore configurée."
      : "Donation address not configured yet.",
    copy: fr ? "Copier" : "Copy",
    copied: fr ? "Copié" : "Copied",
    close: fr ? "Fermer" : "Close",

    gate: {
      title: fr ? "Soutenir Bitcoin.Decoded en bitcoin" : "Support Bitcoin.Decoded with bitcoin",
      noWalletLink: fr ? "Je n'ai pas de wallet" : "I don't have a wallet",
    },

    amount: {
      lead: fr
        ? "Tu veux soutenir mon travail de pédagogie ?"
        : "Want to support the teaching behind this?",
      title: fr ? "Chaque geste compte" : "Every contribution helps",
      customPlaceholder: fr ? "autre montant..." : "other amount...",
      satsApprox: (satsStr: string) => `≈ ${satsStr} sats`,
      rateLine: (eurStr: string) =>
        fr ? `taux du moment : 1 BTC = ${eurStr} €` : `current rate: 1 BTC = €${eurStr}`,
      refreshRate: fr ? "Actualiser le taux" : "Refresh rate",
      showAddress: fr ? "Voir l'adresse de don" : "Show donation address",
      back: fr ? "Retour" : "Back",
      rateOutdated: fr ? "taux peut-être obsolète" : "rate may be outdated",
      rateUnavailable: fr ? "taux temporairement indisponible" : "rate temporarily unavailable",
      disclaimer: fr
        ? "Les montants en euros sont indicatifs. Le donataire reçoit la valeur en bitcoin que tu envoies."
        : "Euro amounts are indicative. The recipient receives the bitcoin value you send.",
      /** Coffee anchors. 21 is intentionally absent (silent easter egg). */
      presetSubs: {
        1: fr ? "le prix d'un expresso" : "the price of an espresso",
        5: fr ? "le prix d'une bière en pression" : "the price of a draft beer",
      } as Record<number, string>,
    },

    onchain: {
      title: fr ? "Adresse bitcoin" : "Bitcoin address",
      suggested: (eurStr: string) =>
        fr ? `Montant suggéré : ${eurStr} €` : `Suggested amount: €${eurStr}`,
      approxBtc: (btcStr: string) => `≈ ${btcStr} BTC`,
      feeWarning: (satsStr: string, eurStr: string) =>
        fr
          ? `Vérifie les frais réseau avant d'envoyer. En ce moment : environ ${satsStr} sats (≈ ${eurStr} €)`
          : `Check network fees before sending. Right now: about ${satsStr} sats (≈ €${eurStr})`,
      feesUnavailable: fr
        ? "vérifie les frais dans ton wallet avant d'envoyer"
        : "check fees in your wallet before sending",
      reassurance: fr
        ? "Une fois le paiement envoyé, il faut généralement 10 à 30 minutes pour la confirmation. Tu peux fermer cette page sans souci."
        : "Once the payment is sent, confirmation usually takes 10 to 30 minutes. You can close this page without worry.",
      qrAria: fr ? "QR code de l'adresse bitcoin" : "Bitcoin address QR code",
      sent: fr ? "J'ai envoyé" : "I've sent it",
      highFeesWarning: fr
        ? "Les frais réseau sont élevés en ce moment, ce petit don paiera surtout les frais."
        : "Network fees are high right now, this small donation will mostly cover fees.",
    },

    noWallet: {
      title: fr
        ? "Pas de wallet ? C'est le moment d'en avoir un."
        : "No wallet? Now's a good time to get one.",
      body1: fr
        ? "Avoir un wallet Bitcoin, c'est l'équivalent d'avoir un compte bancaire, sauf que tu le contrôles toi-même, sans permission. C'est l'étape de base pour utiliser Bitcoin pour de vrai."
        : "Having a Bitcoin wallet is like having a bank account, except you control it yourself, without permission. It's the basic step to actually use Bitcoin.",
      body2: fr
        ? "On en parle en détail dans le chapitre dédié."
        : "We cover it in detail in the dedicated chapter.",
      readChapter: fr
        ? "Lire le chapitre « Entrer dans le terrier »"
        : "Read the « Down the Rabbit Hole » chapter",
      later: fr ? "Revenir plus tard" : "I'll come back later",
    },

    thankYou: {
      title: fr ? "Bien reçu. Merci." : "Got it. Thanks.",
      body1: fr
        ? "Tu viens de faire une transaction Bitcoin. Sans intermédiaire, sans autorisation, sans formulaire à signer."
        : "You just made a Bitcoin transaction. No middleman, no permission needed, no form to sign.",
      body2: fr
        ? "C'est ça que le chapitre voulait te montrer."
        : "That's what the chapter was trying to show you.",
      continue: fr ? "Continuer ma lecture" : "Continue reading",
    },
  };
};
