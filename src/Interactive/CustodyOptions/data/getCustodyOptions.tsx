import type { THEME_COLORS } from "../../../Design";
import type { ExpandableTerm } from "../../ExpandableDefinitions";

import { DoodleBank, DoodleKey } from "@doodle";

type Language = "fr" | "en";
type ThemeColors = (typeof THEME_COLORS)["dark"];

export const getCustodyOptions = (language: Language, colors: ThemeColors): ExpandableTerm[] => {
  const fr = language === "fr";

  return [
    {
      key: "platform",
      title: fr ? "Confiée à une plateforme" : "On a centralized exchange",
      summary: fr
        ? "Simple et rapide. Sauf qu'il y a un hic."
        : "Simple and fast. Except there's a catch.",
      icon: DoodleBank,
      accentText: colors.base.text.primary,
      accentBorder: colors.base.border.primary,
      body: fr ? (
        <>
          <p>
            Tu ouvres un compte, tu achètes, tes bitcoins s'affichent à l'écran. Le monde parfait.
            Enfin, presque. Ce que tu détiens, c'est une promesse : celle de l'entreprise de te les
            rendre quand tu les demandes.
          </p>
          <p>
            <i>
              C'est un peu comme si tu confiais ta voiture à un ami. Quand tu en as besoin, tu lui
              réclames les clés. Si tout va bien, tout va bien. Jusqu'au jour où ton ami fait
              n'importe quoi avec, te trahit ou disparaît. Là, tu découvres dans la douleur que ta
              voiture ne t'appartenait plus vraiment.
            </i>
          </p>
        </>
      ) : (
        <>
          <p>
            You open an account, you buy, your bitcoin shows up on a screen. A perfect world. Well,
            almost. What you hold is a promise: the company's promise to hand it back when you ask.
          </p>
          <p>
            <i>
              It's a bit like lending your car to a friend. When you need it, you ask for the keys
              back. As long as all goes well, all goes well. Until the day your friend does
              something reckless with it, betrays you or vanishes. That's when you find out, the
              hard way, that the car wasn't really yours anymore.
            </i>
          </p>
        </>
      ),
    },
    {
      key: "self-custody",
      title: fr ? "Assurée par toi-même" : "On self-custody",
      summary: fr
        ? "Tu détiens les clés toi-même. Personne ne peut déplacer tes bitcoins sans ton autorisation, mais attention."
        : "You hold the keys yourself. No one can move your bitcoin without your say-so, but watch out.",
      icon: DoodleKey,
      accentText: colors.violet.text.secondary,
      accentBorder: colors.violet.border.secondary,
      body: fr ? (
        <p>
          « Pas tes clés, pas tes bitcoins. » Ce n'est pas juste un slogan, c'est un constat
          technique réel. Tes clés privées sont générées sous ton contrôle et restent chez toi. Tu
          es souverain : plus d'intermédiaire qui peut te trahir, mais plus d'intermédiaire non plus
          pour voler à ton secours si jamais tu fais des erreurs.
        </p>
      ) : (
        <p>
          "Not your keys, not your coins." It's not just a slogan, it's a real technical fact. Your
          private keys are generated under your control and stay with you. You're sovereign: no more
          middleman who can betray you, but no more middleman to come to your rescue either if you
          ever slip up.
        </p>
      ),
    },
  ];
};
