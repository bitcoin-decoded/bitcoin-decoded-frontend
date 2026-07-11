import type { THEME_COLORS } from "../../../Design";
import type { ExpandableTerm } from "../../ExpandableDefinitions";

import { DoodleBanknote, DoodleHandshake, DoodleWallet } from "@doodle";

type Language = "fr" | "en";
type ThemeColors = (typeof THEME_COLORS)["dark"];

export const getAccountingTerms = (
  language: Language,
  colors: ThemeColors,
  moduleTheme: "amber" | "blue" | "violet" | "base",
): ExpandableTerm[] => {
  const fr = language === "fr";
  const worldText =
    moduleTheme === "base" ? colors.base.text.secondary : colors[moduleTheme].text.secondary;
  const worldBorder =
    moduleTheme === "base" ? colors.base.border.secondary : colors[moduleTheme].border.secondary;

  return [
    {
      key: "asset",
      title: fr ? "Actif" : "Asset",
      summary: fr
        ? "Ce que tu possèdes, ou ce qu'on te doit."
        : "What you own, or what you're owed.",
      icon: DoodleWallet,
      accentText: colors.semantic.success.text,
      accentBorder: colors.semantic.success.border,
      body: fr ? (
        <p>
          <i>
            Ton épargne, ton téléphone, l'argent que t'as prêté à ton beau-frère et qu'il te doit
            toujours ? Ce sont des actifs !
          </i>
        </p>
      ) : (
        <p>
          <i>
            Your savings, your phone, that money you lent your brother-in-law and still haven't seen
            again? All assets!
          </i>
        </p>
      ),
    },
    {
      key: "liability",
      title: fr ? "Passif" : "Liability",
      summary: fr
        ? "D'où vient l'argent qui a financé tout ça."
        : "Where the money that financed all of it came from.",
      icon: DoodleBanknote,
      accentText: worldText,
      accentBorder: worldBorder,
      body: fr ? (
        <>
          <p>
            <i>Cet argent vient forcément de l'une de ces deux sources :</i>
          </p>
          <ol>
            <li>Des autres : tu leur dois, c'est une dette.</li>
            <li>De toi-même : c'est ton capital propre.</li>
          </ol>
          <p>
            <i>
              Eh oui, ton propre argent apparaît au passif. Pas parce que tu le dois à quelqu'un,
              mais parce que le passif répond à une seule question : « qui a payé ? » Et la réponse,
              ici, c'est toi.
            </i>
          </p>
        </>
      ) : (
        <>
          <p>
            <i>That money can only come from one of two sources:</i>
          </p>
          <ol>
            <li>From others: you owe them, that's debt.</li>
            <li>From yourself: that's your equity.</li>
          </ol>
          <p>
            <i>
              Yes, your own money shows up under liabilities. Not because you owe it to anyone, but
              because liabilities answer one single question: "who paid for this?" And here, the
              answer is you.
            </i>
          </p>
        </>
      ),
    },
    {
      key: "claim",
      title: fr ? "Créance" : "Claim",
      summary: fr
        ? "Le droit d'exiger que quelqu'un te rende l'argent qu'il te doit."
        : "Your right to be paid back the money someone owes you.",
      icon: DoodleHandshake,
      accentText: colors.violet.text.secondary,
      accentBorder: colors.violet.border.secondary,
      body: fr ? (
        <p>
          <i>
            T'as prêté de l'argent ? Tant que t'es pas remboursé, tu détiens une créance - une
            promesse d'être payé, et donc un actif à ton bilan.
          </i>
        </p>
      ) : (
        <p>
          <i>
            Lent money out? Until you're not paid back, you hold a claim - a promise to be paid, and
            therefore an asset on your balance sheet.
          </i>
        </p>
      ),
    },
  ];
};
