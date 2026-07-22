import type { Language } from "../../../I18n";
import type { PathAnswers } from "../types";

type Capital = NonNullable<PathAnswers["capital"]>;
type Frequency = NonNullable<PathAnswers["frequency"]>;
type Custody = NonNullable<PathAnswers["custody"]>;
type Privacy = NonNullable<PathAnswers["privacy"]>;

export const getPathFinderCopy = (language: Language) => {
  const fr = language === "fr";

  const q1Options: { value: Capital; label: string }[] = [
    {
      value: "P1",
      label: fr
        ? "Une petite somme, quelques centaines d'euros pas plus"
        : "A small amount, a few hundred euros at most",
    },
    {
      value: "P2",
      label: fr
        ? "Un montant assez important, quelques milliers d'euros tout de même"
        : "A fairly large amount, a few thousand even so",
    },
    {
      value: "P3",
      label: fr
        ? "Un montant conséquent, en centaines de milliers d'euros au moins"
        : "A serious amount, hundreds of thousands of euros at least",
    },
  ];

  const q2Options: { value: Frequency; label: string }[] = [
    { value: "single", label: fr ? "Un seul achat" : "A single buy" },
    { value: "dca", label: fr ? "Des achats réguliers (DCA)" : "Recurring buys (DCA)" },
  ];

  const q3Options: { value: Custody; label: string }[] = [
    {
      value: "simple",
      label: fr ? "Non, peu importe, on fait au plus simple" : "No, I don't mind, keep it simple",
    },
    {
      value: "sovereign",
      label: fr ? "Oui, je veux être souverain" : "Yes, I want to be sovereign",
    },
    { value: "unsure", label: fr ? "Je ne sais pas encore" : "I'm not sure yet" },
  ];

  const q4Options: { value: Privacy; label: string }[] = [
    {
      value: "discreet",
      label: fr ? "Oui, je veux rester discret" : "Yes, I want to stay discreet",
    },
    { value: "dontcare", label: fr ? "Non, ça m'est égal" : "No, I don't mind" },
  ];

  return {
    title: fr ? "Quelle voie pour toi ?" : "Which path for you?",
    back: fr ? "Précédent" : "Back",
    finish: fr ? "J'ai fini de répondre" : "I'm done answering",
    reset: fr ? "Réinitialiser" : "Reset",
    progress: (step: number, total: number) =>
      fr ? `Question ${step} / ${total}` : `Question ${step} / ${total}`,
    recommendedAria: fr ? "Recommandé pour toi" : "Recommended for you",
    planPrefix: fr ? "Plan" : "Plan",
    profileLead: fr ? "Ton profil" : "Your profile",
    whyLabel: fr ? "Pourquoi ce plan" : "Why this plan",

    questions: {
      q1: {
        text: fr
          ? "Quel capital souhaites-tu investir de ta poche ?"
          : "How much capital do you want to put in from your own pocket?",
        options: q1Options,
      },
      q2: {
        text: fr ? "Un coup unique, ou des achats réguliers ?" : "A one-off, or recurring buys?",
        options: q2Options,
      },
      q3: {
        text: fr
          ? "Tu veux détenir tes bitcoins en détention propre ?"
          : "Do you want to hold your bitcoin in self-custody?",
        options: q3Options,
      },
      q4: {
        text: fr
          ? "La confidentialité de ta détention compte pour toi ?"
          : "Does the privacy of your holdings matter to you?",
        options: q4Options,
        disclosureTitle: fr ? "Pourquoi cette question ?" : "Why this question?",
        disclosureBody: fr ? (
          <>
            <p>
              Deux raisons, factuelles. D'abord le cadre réglementaire : la directive européenne
              DAC8 impose aux plateformes de déclarer automatiquement les avoirs de leurs clients à
              l'administration fiscale. Acheter via une plateforme, c'est donc associer ton identité
              à un montant détenu.
            </p>
            <p>
              Ensuite la sécurité physique : les agressions ciblant des détenteurs identifiés
              augmentent. Rester discret sur ce que tu possèdes, ce n'est pas se cacher, c'est la
              même prudence que de ne pas afficher le code de sa carte ou le contenu de son coffre.
            </p>
            <p>
              Tu peux parfaitement tout déclarer au fisc et rester discret vis-à-vis du reste du
              monde : les deux ne s'opposent pas.
            </p>
          </>
        ) : (
          <>
            <p>
              Two reasons, both factual. First, the regulatory frame: the EU's DAC8 directive
              requires platforms to automatically report their clients' holdings to the tax
              authorities. Buying through a platform ties your identity to an amount held.
            </p>
            <p>
              Second, physical security: attacks targeting identified holders are on the rise.
              Staying discreet about what you own isn't hiding, it's the same caution as not
              announcing your card's PIN or what's in your safe.
            </p>
            <p>
              You can absolutely report everything to the tax office and still stay discreet toward
              the rest of the world: the two don't conflict.
            </p>
          </>
        ),
      },
    },

    sections: {
      acquisition: {
        label: fr ? "Je m'expose à Bitcoin" : "I get exposure to Bitcoin",
        sub: {
          exchange: { label: fr ? "Plateforme d'échange" : "Exchange platform" },
          p2p: { label: fr ? "Pair-à-pair (P2P)" : "Peer-to-peer (P2P)" },
          atm: { label: fr ? "Borne d'achat (ATM)" : "Bitcoin ATM" },
        },
      },
      detention: {
        label: fr ? "Je conserve mon exposition" : "I keep my exposure",
        sub: {
          custodial: { label: fr ? "Confié à un tiers" : "Held by a third party" },
          hot: { label: fr ? "Hot wallet (self-custody)" : "Hot wallet (self-custody)" },
          cold: { label: fr ? "Cold wallet (self-custody)" : "Cold wallet (self-custody)" },
        },
      },
    },

  };
};

export type PathFinderCopy = ReturnType<typeof getPathFinderCopy>;
