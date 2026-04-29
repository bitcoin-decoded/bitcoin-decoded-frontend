import type { Language } from "../../../I18n";
import type { ReadingTimeFlavorMap } from "../types";

export const READING_TIME_FLAVORS: Readonly<Record<Language, ReadingTimeFlavorMap>> = {
  fr: {
    1: [
      "le temps de vérification de tes notifications chaue matin",
      "le temps pour boire un café tiède oublié sur le bureau",
      "le temps mis pour relire un message passif-agressif sans y répondre",
    ],
    2: [
      "le temps mis pour réaliser que les clés que tu cherches sont dans ta poche",
      "le temps d'un trajet en ascenseur dans un silence gênant",
      "le temps moyen d'attention sur TikTok",
    ],
    3: [
      "le temps d'un lavage des dents (en théorie)",
      "la durée d'une musique qu'on écoute en boucle",
      "la durée de notre patience avant de réactualiser la courbe du prix du bitcoin en plein bull-run",
    ],
    5: [
      "le temps d'attente à la boulangerie un samedi matin",
      "le temps moyen dans une discussion bitcoin avant que quelqu'un lance « Bitcoin finance le terrorisme »",
      "le temps d'une pause-café avec un collègue qui a une « théorie » sur l'économie",
    ],
    9: [
      "le temps d'écrire un email professionnel sans passer par une IA",
      "le temps d'une pause aux toilettes avec option « débat philosophique interne »",
      "le temps de dévorer un menu Maxi Best Of",
    ],
    10: [
      "le temps moyen de minage d'un bloc bitcoin",
      "le temps d'attente chez le médecin quand t'as de la chance",
      "le temps d'un café avec un collègue bavard qui te raconte ses dernières vacances",
    ],
  },
  en: {
    1: [
      "the time it takes to check your notifications every morning",
      "the time it takes to drink a forgotten lukewarm coffee at your desk",
      "the time it takes to reread a passive-aggressive message without replying",
    ],
    2: [
      "the time it takes to realize the keys you are looking for are in your pocket",
      "the duration of a lift ride in awkward silence",
      "the average attention span on TikTok",
    ],
    3: [
      "the time it takes to brush your teeth (in theory)",
      "the length of a song you keep looping",
      "the amount of patience we have before refreshing the Bitcoin price chart during a bull run",
    ],
    5: [
      "the time you spend waiting at the bakery on a Saturday morning",
      "the average length of a Bitcoin conversation before someone says, « Bitcoin finances terrorism »",
      "the time for a coffee break with a colleague who has a theory about economics",
    ],
    9: [
      "the time it takes to write a professional email without using AI",
      "the time of a bathroom break with an optional side of internal philosophical debate",
      "the time it takes to devour a fast-food combo meal",
    ],
    10: [
      "the average time it takes to mine a Bitcoin block",
      "the waiting time at the doctor's office when you are lucky",
      "the time for a coffee with a chatty colleague telling you about their latest holiday",
    ],
  },
};
