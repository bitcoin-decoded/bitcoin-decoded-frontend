import { Feather, KeyRound, Smartphone, Vault } from "lucide-react";

import type { THEME_COLORS } from "../../../Design";
import type { ExpandableTerm } from "../../ExpandableDefinitions";
import { ScoreGauge } from "../components/ScoreGauge";

type Language = "fr" | "en";
type ThemeColors = (typeof THEME_COLORS)["dark"];

export const getWalletFamilies = (language: Language, colors: ThemeColors): ExpandableTerm[] => {
  const fr = language === "fr";
  const simplicityLabel = fr ? "Simplicité" : "Simplicity";
  const sovereigntyLabel = fr ? "Souveraineté" : "Sovereignty";

  const gauges = (accent: string, simplicity: number, sovereignty: number) => (
    <>
      <ScoreGauge label={simplicityLabel} icon={Feather} score={simplicity} accent={accent} />
      <ScoreGauge label={sovereigntyLabel} icon={KeyRound} score={sovereignty} accent={accent} />
    </>
  );

  const violetText = colors.violet.text.primary;
  const violetBorder = colors.violet.border.primary;
  const violetTextAlt = colors.violet.text.secondary;
  const violetBorderAlt = colors.violet.border.primary;

  return [
    {
      key: "hot",
      title: fr ? "Portefeuille logiciel" : "Software wallet",
      summary: fr
        ? "Une appli sur ton téléphone ou ton ordinateur. Tes clés sont générées sur ton appareil et elles y restent. C'est toi qui les héberges, pas un tiers."
        : "An app on your phone or computer. Your keys are generated on your device and stay there. You host them, not a third party.",
      icon: Smartphone,
      accentText: violetText,
      accentBorder: violetBorder,
      meta: gauges(violetText, 4, 4),
      body: fr ? (
        <p>
          Idéal pour les petits montants et les usages quotidiens. C'est un peu le portefeuille que
          tu gardes dans ta poche : pratique, mais pas adapté pour y stocker toute ton épargne !
        </p>
      ) : (
        <p>
          Perfect for small amounts and everyday use. It's a bit like the wallet you keep in your
          pocket: handy, but not where you'd stash your whole savings.
        </p>
      ),
    },
    {
      key: "hardware",
      title: fr ? "Portefeuille matériel" : "Hardware wallet",
      summary: fr ? (
        <>
          Un boîtier dédié qui génère tes clés et les garde hors ligne, à l'abri d'Internet. Le
          coffre de <i>Balthazar Picsou</i>, si tu préfères.
        </>
      ) : (
        <>
          A dedicated device that generates your keys and keeps them offline, out of the internet's
          reach. <i>Scrooge McDuck</i>'s vault, if you like.
        </>
      ),
      icon: Vault,
      accentText: violetTextAlt,
      accentBorder: violetBorderAlt,
      meta: gauges(violetTextAlt, 2, 5),
      body: fr ? (
        <p>
          Tes clés restent hors ligne. Pour signer une transaction, tu confirmes sur l'appareil
          lui-même : même un ordinateur infecté ne peut pas les extraire. Un peu plus cher, un peu
          plus exigeant... mais le plus solide pour les montants qui comptent. Et de loin. Personne
          ne démarre avec le coffre : on commence petit, on apprend, on monte en exigence.
        </p>
      ) : (
        <p>
          Your keys stay offline. To sign a transaction, you confirm on the device itself: even an
          infected computer can't pull them out. A bit pricier, a bit more demanding... but the
          sturdiest by far for amounts that matter. Nobody starts with the vault: you start small,
          you learn, you raise your standards.
        </p>
      ),
    },
  ];
};
