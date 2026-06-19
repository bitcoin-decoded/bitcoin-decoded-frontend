import type { Language } from "../../../I18n";
import type { Profile, ProfileKey } from "../types";

export const getProfiles = (language: Language): Record<ProfileKey, Profile> => {
  const fr = language === "fr";

  return {
    curieux: {
      name: fr ? "Le Curieux" : "The Curious",
      verdict: fr
        ? "Le plus léger possible, à chaque étape : un canal d'acquisition direct, et une première expérience de self-custody sur un portefeuille logiciel gratuit. Pas besoin de matériel pour démarrer."
        : "As light as possible, at every step: a direct acquisition channel, and a first taste of self-custody on a free software wallet. No hardware needed to get started.",
      why: fr
        ? "À quelques centaines d'euros, le coût d'un cold wallet pèse trop lourd. L'objectif, c'est d'apprendre le geste (acheter, retirer, détenir), pas de bâtir un coffre-fort."
        : "At a few hundred euros, a cold wallet costs too much in proportion. The goal is to learn the moves (buy, withdraw, hold), not to build a vault.",
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée, achat ponctuel : le canal le plus simple et le plus liquide."
            : "A regulated platform, a one-off buy: the simplest and most liquid channel.",
        },
        planB: {
          subCategory: "p2p",
          text: fr
            ? "Le pair-à-pair pour découvrir l'achat sans intermédiaire."
            : "Peer-to-peer to discover buying without a middleman.",
        },
      },
      detention: {
        planA: {
          subCategory: "hot",
          text: fr
            ? "Portefeuille logiciel gratuit : pratique de la self-custody sans coût matériel."
            : "A free software wallet: a way to practise self-custody at no hardware cost.",
        },
        planB: {
          subCategory: "custodial",
          text: fr
            ? "Laisser sur la plateforme tant que la gestion d'une seed paraît prématurée - acceptable à ces montants, à reconsidérer ensuite."
            : "Leaving it on the platform while handling a seed still feels premature - acceptable at these amounts, to revisit afterward.",
        },
      },
    },

    debutant: {
      name: fr ? "Le Débutant Méthodique" : "The Methodical Beginner",
      verdict: fr
        ? "Tout part d'un rythme : des achats réguliers étalés dans le temps (DCA), puis une consolidation périodique sur un portefeuille hors-ligne dès que le solde justifie l'investissement matériel."
        : "It all starts with a rhythm: regular buys spread over time (DCA), then periodic consolidation onto an offline wallet once the balance justifies the hardware cost.",
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
            ? "Service DCA dédié avec retrait automatique vers un portefeuille auto-hébergé."
            : "A dedicated DCA service with automatic withdrawal to a self-hosted wallet.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          text: fr
            ? "Portefeuille matériel (cold wallet) : retrait groupé toutes les quelques semaines pour limiter les frais réseau."
            : "A hardware wallet (cold wallet): grouped withdrawal every few weeks to keep network fees down.",
        },
        planB: {
          subCategory: "hot",
          text: fr
            ? "Portefeuille logiciel en attendant le seuil où le matériel devient rentable."
            : "A software wallet until the balance reaches the point where hardware becomes worthwhile.",
        },
      },
    },

    discretFrugal: {
      name: fr ? "Le Discret Frugal" : "The Frugal Privacy-Seeker",
      verdict: fr
        ? "La vie privée ne se découpe pas en tranches : acquisition discrète sans collecte d'identité, puis conservation sous contrôle direct, le cold wallet venant en montée en gamme naturelle à mesure que le solde grandit."
        : "Privacy doesn't come in slices: discreet acquisition with no identity collection, then keys held under direct control - a cold wallet being the natural step up as the balance grows.",
      why: fr
        ? "Acheter sans KYC pour tout laisser ensuite sur une plateforme identifiante annulerait l'effort. Ici la cohérence prime : exposition discrète et garde propre. Pas de compromis sur la vie privée, c'est l'axe directeur."
        : "Buying without KYC only to dump everything afterward on an identifying platform would cancel the whole effort. Here consistency rules: discreet entry, keys held directly. No compromise on privacy, that's the guiding line.",
      acquisition: {
        planA: {
          subCategory: "p2p",
          text: fr
            ? "Pair-à-pair sans collecte d'identité, paiement SEPA ou espèces."
            : "Peer-to-peer with no identity collection, SEPA or cash payment.",
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
            ? "Portefeuille logiciel souverain, idéalement via Tor pour préserver l'anonymat acquis."
            : "A sovereign software wallet, ideally over Tor to preserve the anonymity earned.",
        },
        planB: {
          subCategory: "cold",
          text: fr
            ? "Portefeuille matériel open source dès que le solde dépasse ce qu'on accepterait de perdre."
            : "An open-source hardware wallet once the balance exceeds what one would accept to lose.",
        },
      },
    },

    investisseur: {
      name: fr ? "L'Investisseur Sérieux" : "The Serious Investor",
      verdict: fr
        ? "À ce niveau d'encours, la sécurité passe devant le reste : acquisition via un canal liquide, puis bascule rapide vers une conservation hors-ligne. La conservation devient le vrai sujet, pas l'achat."
        : "At this level of holdings, security comes before the rest: acquisition through a liquid channel, then a quick switch to offline custody. Custody becomes the real subject, not the purchase.",
      why: fr
        ? "Plusieurs milliers d'euros chez un tiers, c'est un risque de faillite, de gel ou de piratage que rien ne justifie quand un cold wallet coûte le prix d'un dîner. À ce montant, la question bascule : ce n'est plus tellement « cold wallet ou pas », c'est « lequel ? »"
        : 'Several thousand euros sitting with a third party means a risk of bankruptcy, freeze or hack that nothing justifies when a cold wallet costs about the price of a dinner. At this amount the question flips: it\'s less "cold wallet or not", more "which one?".',
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée agréée MiCA, en lump sum ou DCA selon la conviction de marché."
            : "A MiCA-licensed regulated platform, lump sum or DCA depending on the market read.",
        },
        planB: {
          subCategory: "p2p",
          text: fr
            ? "Pair-à-pair pour limiter la surface d'identification, au prix d'un peu de liquidité."
            : "Peer-to-peer to shrink the identification footprint, at the cost of a little liquidity.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          text: fr
            ? "Portefeuille matériel open source, idéalement BTC-only. À ce niveau d'encours, la conservation hors-ligne devient le standard."
            : "An open-source hardware wallet, ideally BTC-only. At this level of holdings, offline custody becomes the standard.",
        },
      },
    },

    souverainDiscret: {
      name: fr ? "Le Souverain Discret" : "The Discreet Sovereign",
      verdict: fr
        ? "La souveraineté poussée aussi loin que possible : acquisition discrète, conservation hors-ligne, et configuration sur infrastructure personnelle quand c'est possible. La complexité monte en proportion."
        : "Sovereignty taken as far as it will go: discreet acquisition, offline custody, and personal infrastructure where possible. Complexity rises in proportion.",
      why: fr
        ? "La confidentialité se gagne ou se perd à chaque étape. Un wallet relié à son propre nœud, et non à un serveur tiers qui, lui, voit passer les adresses, limite ce qu'un intermédiaire apprend de bout en bout. Le profil le plus exigeant, mais le plus cohérent."
        : "Privacy is won or lost at every step. A wallet wired to one's own node, rather than a third-party server that gets to watch addresses go by, limits what any intermediary learns end to end. The most demanding profile, but the most consistent.",
      acquisition: {
        planA: {
          subCategory: "p2p",
          text: fr
            ? "Pair-à-pair, achats fractionnés pour lisser les entrées et brouiller le profil d'achat, paiement varié."
            : "Peer-to-peer, split buys to smooth entries and blur the buying pattern, varied payment.",
        },
        planB: {
          subCategory: "atm",
          label: fr ? "Mix P2P + borne" : "P2P + ATM mix",
          text: fr
            ? "Un mix pair-à-pair et borne en espèces pour diversifier les sources et brouiller le profil d'achat."
            : "A mix of peer-to-peer and cash ATM to diversify sources and blur the buying pattern.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          label: fr ? "Cold wallet via Tor / nœud perso" : "Cold wallet over Tor / own node",
          text: fr
            ? "Portefeuille matériel open source, BTC-only si la spécialisation est recherchée, configuré et utilisé via Tor et un nœud personnel."
            : "An open-source hardware wallet, BTC-only if specialisation is sought, set up and used over Tor and one's own node.",
        },
        planB: {
          subCategory: "cold",
          label: fr ? "Cold wallet + passphrase" : "Cold wallet + passphrase",
          text: fr
            ? "Portefeuille matériel avec passphrase (25ᵉ mot) pour une couche de déni plausible."
            : "A hardware wallet with a passphrase (25th word) for a layer of plausible deniability.",
        },
      },
    },

    baleine: {
      name: fr ? "La Baleine" : "The Whale",
      verdict: fr
        ? "Au-delà d'un certain montant, tout l'enjeu devient de répartir : acquisition via un canal capable d'absorber le volume, et conservation en multisig étalée sur plusieurs dispositifs et plusieurs sites. Concentrer, c'est s'exposer."
        : "Past a certain amount, the whole game becomes spreading out: acquisition through a channel that can absorb the volume, and multisig custody laid across several devices and several sites. To concentrate is to expose yourself.",
      why: fr
        ? "À ce niveau, le point de défaillance unique (un seul appareil, une seule seed) est le vrai risque : perte, vol, contrainte physique. Le multisig supprime ce point unique et permet une répartition géographique. La complexité devient un investissement justifié, idéalement accompagné."
        : "At this level, the single point of failure (one device, one seed) is the real risk: loss, theft, physical coercion. Multisig removes that single point and allows for geographic distribution. The complexity turns into a justified investment, ideally with guidance.",
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
            ? "Pair-à-pair fractionné si la discrétion prime, mais liquidité et délais deviennent contraignants à ce montant."
            : "Split peer-to-peer if discretion comes first, though liquidity and delays get awkward at this amount.",
        },
      },
      detention: {
        planA: {
          subCategory: "cold",
          label: fr ? "Multisig réparti" : "Distributed multisig",
          text: fr
            ? "Multisig 2-sur-3 ou 3-sur-5, plusieurs portefeuilles matériels de marques différentes, clés réparties géographiquement."
            : "A 2-of-3 or 3-of-5 multisig, several hardware wallets from different brands, keys spread geographically.",
        },
        planB: {
          subCategory: "cold",
          label: fr ? "Cold single-sig + passphrase" : "Single-sig cold + passphrase",
          text: fr
            ? "Portefeuille matériel single-sig avec passphrase comme étape intermédiaire, avant de monter en multisig."
            : "A single-sig hardware wallet with a passphrase as an interim step, before stepping up to multisig.",
        },
      },
    },

    indecis: {
      name: fr ? "L'Indécis" : "The Undecided",
      verdict: fr
        ? "Commencer maintenant, basculer plus tard : une exposition initiale par un canal simple, avec la migration vers la self-custody gardée comme horizon. Repousser cette migration indéfiniment n'efface pas le risque de contrepartie."
        : "Start now, switch later: initial exposure through a simple channel, with the move to self-custody kept on the horizon. Putting that move off forever doesn't erase the counterparty risk.",
      why: fr
        ? "Mieux vaut une exposition réelle imparfaite que pas d'exposition du tout. Mais la garde par un tiers reste une béquille : elle expose à la faillite de la plateforme. L'objectif est d'avancer, à son rythme, vers la détention propre."
        : "An imperfect real exposure beats no exposure at all. But third-party custody remains a crutch: it exposes you to the platform going under. The goal is to move, at your own pace, toward holding your own keys.",
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée, achat simple, sans engagement technique."
            : "A regulated platform, a simple buy, no technical commitment.",
        },
      },
      detention: {
        planA: {
          subCategory: "custodial",
          label: fr ? "Garde par le tiers (temporaire)" : "Third-party custody (temporary)",
          text: fr
            ? "Garde par un tiers, assumée temporairement (risque de contrepartie connu), avec la self-custody comme objectif."
            : "Third-party custody, owned as a temporary stage (counterparty risk acknowledged), with self-custody as the goal.",
        },
      },
    },

    delegant: {
      name: fr ? "Le Délégant Assumé" : "The Deliberate Delegator",
      verdict: fr
        ? "Déléguer, oui, mais en le sachant : exposition et conservation chez un intermédiaire. La cohérence interne est totale, le risque de contrepartie aussi."
        : "Delegating, yes - but with eyes open: exposure and custody through an intermediary. The internal consistency is total, so is the counterparty risk.",
      why: fr
        ? "Plusieurs milliers d'euros chez un tiers, ce n'est plus le même enjeu que quelques centaines (Mt. Gox, FTX, Celsius le rappellent). « Pas tes clés, pas tes bitcoins » décrit le droit détenu : une créance sur la plateforme, pas du Bitcoin. Tant que la délégation est choisie, autant la cadrer proprement."
        : 'Several thousand euros with a third party is no longer the same stakes as a few hundred (Mt. Gox, FTX, Celsius are there to remind us). "Not your keys, not your coins" describes the right held: a claim on the platform, not Bitcoin. As long as delegation is the chosen path, it deserves to be framed properly.',
      acquisition: {
        planA: {
          subCategory: "exchange",
          text: fr
            ? "Plateforme régulée agréée MiCA, choisie pour réduire certains risques (preuve de réserves, ancienneté, juridiction). On parle ici de réduire, pas supprimer."
            : "A MiCA-licensed regulated platform, picked to cut down certain risks (proof of reserves, track record, jurisdiction). The word here is reduce, not remove.",
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
            ? "Portefeuille matériel le jour où le pas paraît plus petit que le risque accepté."
            : "A hardware wallet the day the step looks smaller than the risk being carried.",
        },
      },
    },
  };
};
