import cauris from "../../../Design/img/cauris.webp";
import grainOrge from "../../../Design/img/grains_orge.jpg";
import oneDollar from "../../../Design/img/one_dollar.png";
import or from "../../../Design/img/Or.png";
import sel from "../../../Design/img/sel.jpg";
import pierreYap from "../../../Design/img/yap_stone.jpg";
import type { Language } from "../../../I18n";
import { CloverLeafIcon, DivisionIcon, EqualIcon, FeatherIcon, Reference, TimeIcon } from "../..";
import type { MonetaryItem } from "../types";

export const getMonetaryHistory = (language: Language): MonetaryItem[] => {
  const fr = language === "fr";
  return [
    {
      name: fr ? "Le grain d'orge" : "Barley Grain",
      profile: fr ? "La monnaie de subsistance" : "The subsistence currency",
      history: fr ? (
        <>
          {" "}
          Dans <Reference href="https://fr.wikipedia.org/wiki/Sumer">la Sumer antique</Reference>,
          on payait le travail avec des sacs d'orge. Pratique, tu me diras... à condition que cette
          monnaie n'ait pas été mangée par des souris ou pourrie par la pluie !
        </>
      ) : (
        <>
          In <Reference href="https://en.wikipedia.org/wiki/Sumer">ancient Sumer</Reference>, labor
          was paid with sacks of barley. Handy, you'd say... as long as the currency didn't get
          eaten by mice or rotted away in the rain!
        </>
      ),
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
        ? "L'orge périssait vite, était lourde à transporter et difficile à stocker. En d'autres termes, cette monnaie n'était pas faite pour durer !"
        : "Barley perished quickly, was heavy to transport, and difficult to store. In other words, this currency wasn't built to last!",
    },
    {
      name: fr ? "Le Sel" : "Salt",
      profile: fr ? "La monnaie d'extraction" : "The extraction currency",
      history: fr ? (
        <>
          Le sel, ressource vitale pour manger et conserver ses aliments, servait aussi de salaire
          pour des légionnaires romains (sel, salaire... et oui il y a un{" "}
          <Reference href="https://fr.wikipedia.org/wiki/Salaire">lien étymologique</Reference> !).
        </>
      ) : (
        <>
          Salt - vital for eating and preserving food - also served as wages for Roman legionaries
          (salt, salary... yep, there's an{" "}
          <Reference href="https://en.wikipedia.org/wiki/Salary#Salarium">
            etymological link
          </Reference>
          !).
        </>
      ),
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
        ? "Avec le progrès technique, extraire et produire du sel est devenu beaucoup plus simple. Et comme le sel se trouve en abondance à peu près partout, il a cessé d'être une monnaie."
        : "With technological progress, extracting and producing salt became way easier. And since salt is found pretty much everywhere in abundance, it stopped being money.",
    },
    {
      name: fr ? "Les Pierres de Raï" : "Rai Stones",
      profile: fr ? "La monnaie de pierre" : "The stone currency",
      history: fr ? (
        <>
          Sur l'île de Yap, d'
          <Reference href="https://fr.wikipedia.org/wiki/Monnaie_de_pierre">
            énormes disques de calcaire servaient de monnaie
          </Reference>
          . Leur valeur venait de la difficulté à les tailler et les ramener par mer.
        </>
      ) : (
        <>
          On the island of Yap,{" "}
          <Reference href="https://en.wikipedia.org/wiki/Rai_stones">
            enormous limestone discs served as money
          </Reference>
          . Their value came from how hard they were to carve and ship back across the sea.
        </>
      ),
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
      death: fr ? (
        <>
          Un capitaine étranger (
          <Reference href="https://fr.wikipedia.org/wiki/David_O%27Keefe">David O'Keefe</Reference>)
          est arrivé au XIXe siècle avec des outils en fer et des navires modernes. Ce qui demandait
          des années de travail d'extraction est soudain devenu facile.
        </>
      ) : (
        <>
          A foreign captain (
          <Reference href="https://en.wikipedia.org/wiki/David_O%27Keefe_(ship_captain)">
            David O'Keefe
          </Reference>
          ) showed up in the 19th century with iron tools and modern ships. What used to take years
          of extraction work suddenly became easy.
        </>
      ),
    },
    {
      name: fr ? "Les Cauris" : "Cowrie Shells",
      profile: fr ? "La monnaie géographique" : "The geographic currency",
      history: fr ? (
        <>
          Ces{" "}
          <Reference href="https://fr.wikipedia.org/wiki/Monetaria_moneta">
            petits coquillages
          </Reference>{" "}
          faisaient office de monnaie en Afrique et en Asie. Leur rareté venait de leur localisation
          géographique limitée et de la difficulté naturelle de les récolter.
        </>
      ) : (
        <>
          These{" "}
          <Reference href="https://en.wikipedia.org/wiki/Monetaria_moneta">small shells</Reference>{" "}
          acted as money across Africa and Asia. Their scarcity came from their limited geographic
          spread and the natural difficulty of harvesting them.
        </>
      ),
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
        ? "L'arrivée de technologies européennes avancées a transformé la récolte en promenade industrielle. L'offre a littéralement explosé, provoquant une hyperinflation locale."
        : "The arrival of advanced European technologies turned harvesting into an industrial walk in the park. Supply literally exploded, triggering local hyperinflation.",
    },
    {
      name: fr ? "L'Or" : "Gold",
      profile: fr ? "La monnaie de réserve" : "The reserve currency",
      history: fr
        ? "L'or, inaltérable et rare partout dans le monde, reste toujours la superstar des réserves de valeur. Son extraction demande beaucoup de travail, de temps et de ressources."
        : "Gold - imperishable and rare across the world - is still the superstar of stores of value. Mining it takes serious work, time, and resources.",
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
      death: fr ? (
        <>
          Il est peu pratique de payer son café avec de l'or : trop lourd, pas assez divisible, et
          difficile à auditer. C'est pourquoi, aujourd'hui,{" "}
          <Reference href="https://www.banque-france.fr/fr/publications-et-statistiques/publications/lor">
            l'or n'est plus utilisé comme monnaie d'échange quotidien
          </Reference>
          .
        </>
      ) : (
        <>
          Paying for your coffee in gold isn't exactly practical: too heavy, not divisible enough,
          and hard to audit. Which is why, today,{" "}
          <Reference href="https://legalclarity.org/is-gold-a-currency-or-just-a-store-of-value/">
            gold is no longer used as everyday money
          </Reference>
          .
        </>
      ),
    },
    {
      name: fr ? "Monnaie Fiat" : "Fiat Currency",
      profile: fr ? "La monnaie institutionnelle" : "The institutional currency",
      history: fr
        ? "Émise par l'État et les banques centrales, elle circule très rapidement (contrairement à l'or) mais peut être créée trèèès facilement. C'est une monnaie adaptée pour les paiements quotidiens, mais déconnectée de la réalité physique."
        : "Issued by states and central banks, it circulates very fast (unlike gold) but can be created veeeery easily. A currency well suited for daily payments, but disconnected from physical reality.",
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
      death: fr ? (
        <>
          Sans réelle contrainte d'émission, les monnaies fiduciaires accomplissent mal leur
          fonction de réserve de valeur.{" "}
          <Reference href="https://www.cato.org/sites/cato.org/files/pubs/pdf/workingpaper-8_1.pdf">
            Historiquement, la quasi-totalité d'entre elles ont fini par s'effondrer ou se voir
            remplacées
          </Reference>
          .
        </>
      ) : (
        <>
          Without any real issuance constraint, fiat currencies do a poor job as a store of value.{" "}
          <Reference href="https://www.cato.org/sites/cato.org/files/pubs/pdf/workingpaper-8_1.pdf">
            Historically, nearly all of them have ended up collapsing or being replaced
          </Reference>
          .
        </>
      ),
    },
  ];
};
