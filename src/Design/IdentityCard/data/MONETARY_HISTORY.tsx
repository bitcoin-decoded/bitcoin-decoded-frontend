import {
  CloverLeafIcon,
  DivisionIcon,
  EqualIcon,
  FeatherIcon,
  TimeIcon,
} from "../..";
import grainOrge from "../../../Design/img/grains_orge.jpg";
import sel from "../../../Design/img/sel.jpg";
import cauris from "../../../Design/img/cauris.webp";
import or from "../../../Design/img/Or.png";
import oneDollar from "../../../Design/img/one_dollar.png";
import pierreYap from "../../../Design/img/yap_stone.jpg";
import type { MonetaryItem } from "../types";
import type { Language } from "../../../I18n";

export const getMonetaryHistory = (language: Language): MonetaryItem[] => {
  const fr = language === "fr";
  return [
    {
      name: fr ? "Le grain d'orge" : "Barley Grain",
      profile: fr ? "La monnaie de subsistance" : "The subsistence currency",
      history: fr
        ? "Dans l'ancienne Sumérie, on payait le travail avec des sacs d'orge. Pratique, vous me direz... à condition que cette monnaie n'ait pas été mangée par des souris ou pourrie par la pluie 😅."
        : "In ancient Sumer, labor was paid with bags of barley. Practical, you might say... as long as this currency wasn't eaten by mice or rotted by rain 😅.",
      imgSrc: grainOrge,
      characteristics: [
        {
          icon: <TimeIcon />,
          label: fr ? "Durabilité" : "Durability",
          score: 1,
        },
        {
          icon: <FeatherIcon />,
          label: fr ? "Portabilité" : "Portability",
          score: 2,
        },
        { icon: <DivisionIcon />, label: fr ? "Divisibilité" : "Divisibility", score: 5 },
        { icon: <EqualIcon />, label: fr ? "Fongibilité" : "Fungibility", score: 4 },
        {
          icon: <CloverLeafIcon />,
          label: fr ? "Dureté" : "Hardness",
          score: 3,
        },
      ],
      death: fr
        ? "L'orge se périssait vite, était lourde à transporter et difficile à stocker. En d'autres termes, cette monnaie n'était pas faite pour durer !"
        : "Barley perished quickly, was heavy to transport, and difficult to store. In other words, this currency wasn't built to last!",
    },
    {
      name: fr ? "Le Sel" : "Salt",
      profile: fr ? "La monnaie d'extraction" : "The extraction currency",
      history: fr
        ? "Le sel, ressource vitale pour manger et conserver ses aliments, servait aussi de salaire pour des légionnaires romains (sel, salaire... et oui il y a un lien étymologique 😉)."
        : "Salt, a vital resource for eating and preserving food, also served as wages for Roman legionaries (the word 'salary' actually comes from 'salt' 😉).",
      imgSrc: sel,
      characteristics: [
        {
          icon: <TimeIcon />,
          label: fr ? "Durabilité" : "Durability",
          score: 2,
        },
        { icon: <FeatherIcon />, label: fr ? "Portabilité" : "Portability", score: 4 },
        { icon: <DivisionIcon />, label: fr ? "Divisibilité" : "Divisibility", score: 5 },
        { icon: <EqualIcon />, label: fr ? "Fongibilité" : "Fungibility", score: 5 },
        {
          icon: <CloverLeafIcon />,
          label: fr ? "Dureté" : "Hardness",
          score: 1,
        },
      ],
      death: fr
        ? "Avec le progrès technique, extraire et produire du sel est devenu beaucoup plus simple. Et comme le sel se trouve en abondance à peu près partout, elle a cessé d'être une monnaie."
        : "With technological progress, extracting and producing salt became much simpler. And since salt is found abundantly almost everywhere, it ceased to be a currency.",
    },
    {
      name: fr ? "Les Pierres de Raï" : "Rai Stones",
      profile: fr ? "La monnaie de pierre" : "The stone currency",
      history: fr
        ? "Sur l'île de Yap, d'énormes disques de calcaire servaient de monnaie. Leur valeur venait de la difficulté à les tailler et les ramener par mer."
        : "On the island of Yap, enormous limestone discs served as currency. Their value came from the difficulty of carving them and bringing them back by sea.",
      imgSrc: pierreYap,
      characteristics: [
        {
          icon: <TimeIcon />,
          label: fr ? "Durabilité" : "Durability",
          score: 5,
        },
        {
          icon: <FeatherIcon />,
          label: fr ? "Portabilité" : "Portability",
          score: 0,
        },
        { icon: <DivisionIcon />, label: fr ? "Divisibilité" : "Divisibility", score: 1 },
        { icon: <EqualIcon />, label: fr ? "Fongibilité" : "Fungibility", score: 3 },
        {
          icon: <CloverLeafIcon />,
          label: fr ? "Dureté" : "Hardness",
          score: 3,
        },
      ],
      death: fr
        ? "Un capitaine étranger (David O'Keefe) est arrivé avec de la dynamite et des navires modernes. Ce qui demandait des années de travail d'extraction est soudain devenu facile."
        : "A foreign captain (David O'Keefe) arrived with dynamite and modern ships. What once required years of extraction work suddenly became easy.",
    },
    {
      name: fr ? "Les Cauris" : "Cowrie Shells",
      profile: fr ? "La monnaie géographique" : "The geographic currency",
      history: fr
        ? "Ces petits coquillages faisaient office de monnaie en Afrique et en Asie. Leur rareté venait de leur localisation géographique limitée et de la difficulté naturelle de les récolter."
        : "These small shells served as currency in Africa and Asia. Their scarcity came from their limited geographic location and the natural difficulty of harvesting them.",
      imgSrc: cauris,
      characteristics: [
        { icon: <TimeIcon />, label: fr ? "Durabilité" : "Durability", score: 4 },
        { icon: <FeatherIcon />, label: fr ? "Portabilité" : "Portability", score: 5 },
        { icon: <DivisionIcon />, label: fr ? "Divisibilité" : "Divisibility", score: 5 },
        { icon: <EqualIcon />, label: fr ? "Fongibilité" : "Fungibility", score: 5 },
        {
          icon: <CloverLeafIcon />,
          label: fr ? "Dureté" : "Hardness",
          score: 2,
        },
      ],
      death: fr
        ? "L'arrivée de technologies européennes avancées a transformé la récolte en promenade industrielle 😅. L'offre a littéralement explosé, en provoquant une hyperinflation locale."
        : "The arrival of advanced European technologies turned harvesting into an industrial walkover 😅. Supply literally exploded, causing local hyperinflation.",
    },
    {
      name: fr ? "L'Or" : "Gold",
      profile: fr ? "La monnaie de réserve" : "The reserve currency",
      history: fr
        ? "L'or, inaltérable et rare partout dans le monde, reste toujours la superstar des réserves de valeur. Son extraction demande beaucoup de travail, de temps et de ressources."
        : "Gold, imperishable and rare everywhere in the world, remains the superstar of stores of value. Its extraction requires a lot of labor, time, and resources.",
      imgSrc: or,
      characteristics: [
        { icon: <TimeIcon />, label: fr ? "Durabilité" : "Durability", score: 5 },
        {
          icon: <FeatherIcon />,
          label: fr ? "Portabilité" : "Portability",
          score: 2,
        },
        {
          icon: <DivisionIcon />,
          label: fr ? "Divisibilité" : "Divisibility",
          score: 2,
        },
        { icon: <EqualIcon />, label: fr ? "Fongibilité" : "Fungibility", score: 5 },
        {
          icon: <CloverLeafIcon />,
          label: fr ? "Dureté" : "Hardness",
          score: 5,
        },
      ],
      death: fr
        ? "Il est peu pratique de payer son café avec de l'or : trop lourd, pas assez divisible, et difficile à auditer. C'est pourquoi, aujourd'hui, l'or n'est plus utilisé comme monnaie d'échange quoditien."
        : "It's impractical to pay for your coffee with gold: too heavy, not divisible enough, and hard to audit. That's why gold is no longer used as everyday currency.",
    },
    {
      name: fr ? "Monnaie Fiat" : "Fiat Currency",
      profile: fr ? "La monnaie institutionnelle" : "The institutional currency",
      history: fr
        ? "Émise par l'État et les banques centrales, elle circule très rapidement (contrairement à l'or) mais peut être créée trèèès facilement. C'est une monnaie adaptée pour les paiements quotidiens, mais déconnectée de la réalité physique."
        : "Issued by the state and central banks, it circulates very quickly (unlike gold) but can be created veeeery easily. It's a currency suited for daily payments, but disconnected from physical reality.",
      imgSrc: oneDollar,
      characteristics: [
        {
          icon: <TimeIcon />,
          label: fr ? "Durabilité" : "Durability",
          score: 3,
        },
        {
          icon: <FeatherIcon />,
          label: fr ? "Portabilité" : "Portability",
          score: 5,
        },
        { icon: <DivisionIcon />, label: fr ? "Divisibilité" : "Divisibility", score: 5 },
        { icon: <EqualIcon />, label: fr ? "Fongibilité" : "Fungibility", score: 5 },
        {
          icon: <CloverLeafIcon />,
          label: fr ? "Dureté" : "Hardness",
          score: 0,
        },
      ],
      death: fr
        ? "Sans réelle contrainte d'émission, les monnaies fiduciaires n'accomplissent pas leur fonction de réserve de valeur. Historiquement, elle finissent toujours par disparaître."
        : "Without any real issuance constraint, fiat currencies fail to serve as a store of value. Historically, they always end up disappearing.",
    },
  ];
};
