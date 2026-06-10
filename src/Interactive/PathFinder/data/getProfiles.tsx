import type { Language } from "../../../I18n";
import type { Profile, ProfileKey } from "../types";

export const getProfiles = (language: Language): Record<ProfileKey, Profile> => {
  const fr = language === "fr";

  return {
    curieux: {
      name: fr ? "Le Curieux" : "The Curious",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer via une plateforme régulée, puis rapatrier aussitôt tes bitcoins sur un hot wallet gratuit, pour goûter à la détention propre sans rien dépenser de plus."
        : "The most coherent path for you: get exposure through a regulated platform, then move your bitcoin straight onto a free hot wallet, to taste self-custody without spending a cent more.",
      why: fr
        ? "À quelques centaines d'euros, le coût d'un cold wallet pèse trop lourd. L'objectif, c'est d'apprendre le geste (acheter, retirer, détenir), pas de bâtir un coffre-fort."
        : "At a few hundred euros, a cold wallet costs too much in proportion. The goal is to learn the moves (buy, withdraw, hold), not to build a vault.",
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée, achat ponctuel : le plus simple et le plus liquide."
            : "A regulated platform, a one-off buy: the simplest and most liquid.",
        },
        planB: {
          subCategory: "p2p",
          text: fr
            ? "Le pair-à-pair si tu veux d'emblée découvrir l'achat sans intermédiaire."
            : "Peer-to-peer if you'd rather discover buying without a middleman right away.",
        },
      },
      detention: {
        planA: {
          subCategory: "hot",
          text: fr
            ? "Hot wallet gratuit (Blue Wallet, Electrum) : tu apprends la self-custody sans frais."
            : "A free hot wallet (Blue Wallet, Electrum): you learn self-custody at no cost.",
        },
        planB: {
          subCategory: "custodial",
          text: fr
            ? "Laisser sur la plateforme si tu n'es pas prêt à gérer une seed, acceptable à ces montants."
            : "Leaving it on the platform if you're not ready to handle a seed, acceptable at these amounts.",
        },
      },
    },

    debutant: {
      name: fr ? "Le Débutant Méthodique" : "The Methodical Beginner",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer par achats réguliers (DCA) sur une plateforme régulée, puis consolider périodiquement sur un cold wallet dès que ton solde le justifie."
        : "The most coherent path for you: get exposure through recurring buys (DCA) on a regulated platform, then consolidate onto a cold wallet from time to time, as soon as your balance warrants it.",
      why: fr
        ? "Le DCA multiplie les petites transactions. Retirer à chaque achat coûterait cher en frais réseau, d'où le retrait groupé. Le cold wallet s'amortit vite dès qu'on accumule sérieusement."
        : "DCA multiplies small transactions. Withdrawing after each buy would rack up network fees, hence the grouped withdrawal. A cold wallet pays for itself fast once you start accumulating seriously.",
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée avec DCA automatisé : achat récurrent programmé, frais maîtrisés."
            : "A regulated platform with automated DCA: scheduled recurring buys, fees kept in check.",
        },
        planB: {
          subCategory: "exchange",
          label: fr ? "Service DCA dédié" : "Dedicated DCA service",
          text: fr
            ? "Un service DCA dédié (type Relai, Swan) avec retrait automatique vers ton wallet."
            : "A dedicated DCA service (Relai, Swan and the like) with automatic withdrawal to your wallet.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          text: fr
            ? "Cold wallet (BitBox02, Trezor Safe) : retrait groupé toutes les quelques semaines pour limiter les frais réseau."
            : "A cold wallet (BitBox02, Trezor Safe): one grouped withdrawal every few weeks to keep network fees down.",
        },
        planB: {
          subCategory: "hot",
          text: fr
            ? "Un hot wallet en attendant le seuil où le cold wallet devient rentable."
            : "A hot wallet until you reach the point where a cold wallet becomes worthwhile.",
        },
      },
    },

    discretFrugal: {
      name: fr ? "Le Discret Frugal" : "The Frugal Privacy-Seeker",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer en pair-à-pair sans KYC, puis sécuriser sur un hot wallet, le cold wallet restant une montée en gamme naturelle dès que le montant grandit."
        : "The most coherent path for you: get exposure peer-to-peer without KYC, then secure it on a hot wallet, a cold wallet being the natural step up as the amount grows.",
      why: fr
        ? "Acheter sans KYC pour tout laisser ensuite sur une plateforme identifiante annulerait l'effort. Ici la cohérence prime : exposition discrète et garde propre. Pas de compromis sur la vie privée, c'est ton axe directeur."
        : "Buying without KYC only to dump everything afterward on an identifying platform would cancel the whole effort. Here consistency rules: discreet entry, keys you hold yourself. No compromise on privacy, that's your guiding line.",
      acquisition: {
        planA: {
          subCategory: "p2p",
          text: fr
            ? "Pair-à-pair (Peach), sans KYC, paiement SEPA ou espèces."
            : "Peer-to-peer (Peach), no KYC, SEPA or cash payment.",
        },
        planB: {
          subCategory: "atm",
          text: fr
            ? "Une borne en espèces pour de très petits montants, malgré les frais : aucun compte à ouvrir."
            : "A cash ATM for very small amounts, fees aside: no account to open.",
        },
      },
      detention: {
        planA: {
          subCategory: "hot",
          text: fr
            ? "Hot wallet souverain (Electrum), idéalement via Tor pour ne pas casser l'anonymat acquis."
            : "A sovereign hot wallet (Electrum), ideally over Tor so you don't break the anonymity you've earned.",
        },
        planB: {
          subCategory: "cold",
          text: fr
            ? "Un cold wallet open source dès que le solde dépasse ce que tu accepterais de perdre."
            : "An open-source cold wallet as soon as the balance climbs past what you'd be willing to lose.",
        },
      },
    },

    investisseur: {
      name: fr ? "L'Investisseur Sérieux" : "The Serious Investor",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer via une plateforme régulée (simplicité, liquidité), puis tout sécuriser sans délai sur un cold wallet. À ce montant, la détention propre hors-ligne n'est plus optionnelle."
        : "The most coherent path for you: get exposure through a regulated platform (simple, liquid), then secure everything on a cold wallet without delay. At this amount, holding your own keys offline stops being optional.",
      why: fr
        ? "Plusieurs milliers d'euros chez un tiers, c'est un risque de faillite, de gel ou de piratage que rien ne justifie quand un cold wallet coûte le prix d'un dîner. À ce montant, la question bascule : ce n'est plus tellement « cold wallet ou pas », c'est « lequel ? »"
        : 'Several thousand euros sitting with a third party means a risk of bankruptcy, freeze or hack that nothing justifies when a cold wallet costs about the price of a dinner. At this amount the question flips: it\'s less "cold wallet or not", more "which one?".',
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée agréée MiCA, en lump sum ou DCA selon ta conviction de marché."
            : "A MiCA-licensed regulated platform, lump sum or DCA depending on your read of the market.",
        },
        planB: {
          subCategory: "p2p",
          text: fr
            ? "Le pair-à-pair si tu veux limiter ta surface d'identification, au prix d'un peu de liquidité."
            : "Peer-to-peer if you want to shrink your identification footprint, at the cost of a little liquidity.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          text: fr
            ? "Cold wallet open source, idéalement BTC-only (BitBox02, Coldcard, Trezor Safe ne sont que des exemples). Le cold wallet à ce niveau, lui, n'est plus une option."
            : "An open-source cold wallet, ideally BTC-only (BitBox02, Coldcard, Trezor Safe are just examples). The cold wallet itself, at this level, is no longer optional.",
        },
      },
    },

    souverainDiscret: {
      name: fr ? "Le Souverain Discret" : "The Discreet Sovereign",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer en pair-à-pair sans KYC, puis tout sécuriser sur un cold wallet open source. La combinaison qui pousse le plus loin la souveraineté et la confidentialité, au prix de la complexité."
        : "The most coherent path for you: get exposure peer-to-peer without KYC, then secure everything on an open-source cold wallet. The combination that pushes sovereignty and privacy the furthest, at the price of complexity.",
      why: fr
        ? "La confidentialité se gagne ou se perd à chaque étape. Un wallet relié à ton propre nœud, et non à un serveur tiers qui, lui, voit passer tes adresses, limite ce qu'un intermédiaire apprend sur toi de bout en bout. Le profil le plus exigeant, mais le plus cohérent."
        : "Privacy is won or lost at every step. A wallet wired to your own node, rather than a third-party server that gets to watch your addresses go by, limits what any intermediary learns about you from end to end. The most demanding profile, but the most consistent.",
      acquisition: {
        planA: {
          subCategory: "p2p",
          text: fr
            ? "Pair-à-pair (Peach), achats fractionnés pour lisser tes entrées et brouiller ton profil d'achat, paiement varié."
            : "Peer-to-peer (Peach), split buys to smooth out your entries and blur your buying pattern, varied payment.",
        },
        planB: {
          subCategory: "atm",
          label: fr ? "Mix P2P + borne" : "P2P + ATM mix",
          text: fr
            ? "Un mix pair-à-pair et borne en espèces pour diversifier les sources et brouiller le profil d'achat."
            : "A mix of peer-to-peer and cash ATM to diversify sources and blur your buying pattern.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          label: fr ? "Cold wallet via Tor / nœud perso" : "Cold wallet over Tor / own node",
          text: fr
            ? "Cold wallet open source, et BTC-only si c'est ton axe, configuré et utilisé via Tor et ton propre nœud."
            : "An open-source cold wallet, BTC-only if that's your angle, set up and used over Tor and your own node.",
        },
        planB: {
          subCategory: "cold",
          label: fr ? "Cold wallet + passphrase" : "Cold wallet + passphrase",
          text: fr
            ? "Cold wallet avec passphrase (25ᵉ mot) pour une couche de déni plausible."
            : "A cold wallet with a passphrase (25th word) for a layer of plausible deniability.",
        },
      },
    },

    baleine: {
      name: fr ? "La Baleine" : "The Whale",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer via un canal à forte liquidité (plateforme, voire desk OTC), puis sécuriser en multisig réparti sur plusieurs dispositifs. À ce niveau d'enjeu, la mono-signature montre vite ses limites : un seul appareil, une seule seed, un seul point de défaillance."
        : "The most coherent path for you: get exposure through a high-liquidity channel (platform, or even an OTC desk), then secure it in multisig spread across several devices. At this level of stakes, single-signature custody quickly shows its limits: one device, one seed, one point of failure.",
      why: fr
        ? "À ce niveau, le point de défaillance unique (un seul appareil, une seule seed) est le vrai risque : perte, vol, contrainte physique. Le multisig supprime ce point unique et permet une répartition géographique. La complexité devient un investissement justifié, idéalement accompagné."
        : "At this level, the single point of failure (one device, one seed) is the real risk: loss, theft, physical coercion. Multisig removes that single point and lets you spread keys geographically. The complexity turns into a justified investment, ideally with guidance.",
      acquisition: {
        planA: {
          subCategory: "exchange",
          label: fr ? "Plateforme / desk OTC" : "Platform / OTC desk",
          text: fr
            ? "Plateforme régulée ou desk OTC pour absorber le volume sans faire bouger le marché, en DCA sur plusieurs semaines."
            : "A regulated platform or OTC desk to absorb the volume without moving the market, DCA'd across several weeks.",
        },
        planB: {
          subCategory: "p2p",
          text: fr
            ? "Le pair-à-pair fractionné si la discrétion prime, mais liquidité et délais deviennent contraignants à ce montant."
            : "Split peer-to-peer if discretion comes first, though liquidity and delays get awkward at this amount.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          label: fr ? "Multisig réparti" : "Distributed multisig",
          text: fr
            ? "Multisig 2-sur-3 ou 3-sur-5 (setup type Sparrow + plusieurs hardware de marques différentes), clés réparties géographiquement."
            : "A 2-of-3 or 3-of-5 multisig (something like Sparrow plus several hardware devices from different brands), keys spread geographically.",
        },
        planB: {
          subCategory: "cold",
          label: fr ? "Cold single-sig + passphrase" : "Single-sig cold + passphrase",
          text: fr
            ? "Cold wallet single-sig avec passphrase comme étape intermédiaire, avant de monter en multisig."
            : "A single-sig cold wallet with a passphrase as an interim step, before stepping up to multisig.",
        },
      },
    },

    indecis: {
      name: fr ? "L'Indécis" : "The Undecided",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer via une plateforme régulée et y laisser provisoirement tes bitcoins, en gardant comme cap la migration future vers un wallet propre. L'ETF coté reste une alternative « papier » si tu refuses durablement de toucher à une clé."
        : 'The most coherent path for you: get exposure through a regulated platform and leave your bitcoin there for now, keeping a future move to your own wallet as the heading. A listed ETF stays a "paper" alternative if you flatly refuse to ever touch a key.',
      why: fr
        ? "Mieux vaut une exposition réelle imparfaite que pas d'exposition du tout. Mais la garde par un tiers et l'ETF sont des béquilles : l'une t'expose à la faillite de la plateforme, l'autre te prive de tout ce qui fait Bitcoin. Le but, c'est de te faire passer, à ton rythme, vers la détention propre."
        : "An imperfect real exposure beats no exposure at all. But third-party custody and the ETF are crutches: one exposes you to the platform going under, the other strips away everything that makes Bitcoin what it is. The aim is to walk you, at your own pace, toward holding your own keys.",
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée, achat simple, sans engagement technique."
            : "A regulated platform, a simple buy, no technical commitment.",
        },
        planB: {
          subCategory: "etf",
          text: fr
            ? "Un ETF / ETN coté sur compte-titres si tu préfères rester dans un cadre 100 % boursier, mais ce n'est pas du Bitcoin."
            : "A listed ETF/ETN in a brokerage account if you'd rather stay in a fully stock-market frame, but it isn't Bitcoin.",
        },
      },
      detention: {
        planA: {
          subCategory: "custodial",
          label: fr ? "Garde par le tiers (temporaire)" : "Third-party custody (temporary)",
          text: fr
            ? "Garde par le tiers, assumée temporairement (risque de contrepartie connu), avec la self-custody comme objectif."
            : "Third-party custody, owned as a temporary stage (counterparty risk acknowledged), with self-custody as the goal.",
        },
      },
    },

    delegant: {
      name: fr ? "Le Délégant Assumé" : "The Deliberate Delegator",
      verdict: fr
        ? "La piste la plus cohérente pour toi : t'exposer via une plateforme régulée et y conserver tes bitcoins en garde déléguée. Un choix que je déconseille mais que je respecte, à condition d'adopter quelques bonnes mesures en matière de sécurité."
        : "The most coherent path for you: get exposure through a regulated platform and keep your bitcoin there in delegated custody. A choice I'd advise against but respect, provided you put a few solid security habits in place.",
      why: fr
        ? "Je respecte ton choix, mais je te le chiffre honnêtement : plusieurs milliers d'euros chez un tiers, ce n'est plus le même enjeu que quelques centaines (Mt. Gox, FTX, Celsius le rappellent). « Pas tes clés, pas tes bitcoins » décrit le droit que tu détiens : une créance sur la plateforme, pas du Bitcoin. Tant que tu délègues, fais-le proprement."
        : 'I respect your choice, but I\'ll price it honestly: several thousand euros with a third party is no longer the same stakes as a few hundred (Mt. Gox, FTX, Celsius are there to remind you). "Not your keys, not your coins" describes the right you hold: a claim on the platform, not Bitcoin. As long as you delegate, do it properly.',
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée agréée MiCA, choisie pour réduire certains risques (preuve de réserves, ancienneté, juridiction). On parle ici de réduire, pas supprimer."
            : "A MiCA-licensed regulated platform, picked to cut down certain risks (proof of reserves, track record, jurisdiction). The word here is reduce, not remove.",
        },
        planB: {
          subCategory: "etf",
          text: fr
            ? "Un ETF / ETN coté sur compte-titres si tu préfères un cadre purement boursier, mais ce n'est plus du Bitcoin."
            : "A listed ETF/ETN in a brokerage account if you prefer a purely stock-market frame, but it's no longer Bitcoin.",
        },
      },
      detention: {
        planA: {
          subCategory: "custodial",
          label: fr ? "Garde déléguée disciplinée" : "Disciplined delegated custody",
          text: fr
            ? "2FA matérielle, whitelist de retrait, répartition sur deux plateformes au-delà d'un seuil."
            : "Hardware 2FA, a withdrawal whitelist, and splitting across two platforms past a certain amount.",
        },
        planB: {
          subCategory: "cold",
          text: fr
            ? "Un cold wallet le jour où tu réalises que le pas est plus petit que le risque accepté."
            : "A cold wallet the day you realize the step is smaller than the risk you're taking on.",
        },
      },
    },
  };
};
