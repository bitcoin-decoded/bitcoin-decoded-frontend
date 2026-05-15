import { type FC } from "react";

import picsouCar from "../../../../src/Design/img/picsou_car.jpg";
import picsouVilla from "../../../../src/Design/img/picsou_villa.jpg";
import { Callout, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { Illustration } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PAGE_STYLES, PageTemplate } from "../../Shared/";

export const Banking6Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.inflation")}
      prelude={
        fr ? (
          <>
            Tes courses ont augmenté. Ton loyer aussi. Ton salaire, lui, suit mollement. Pendant ce
            temps, le CAC 40 bat des records et l'immobilier parisien tutoie l'absurde. tu sens
            qu'il y a un lien. Tu as raison.
          </>
        ) : (
          <>
            Your grocery bill has gone up. So has your rent. Your salary, meanwhile, is barely
            keeping pace. At the same time, the NASDAQ is hitting record highs and real estate
            prices are climbing into the absurd. You sense there's a link. You're right.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Tu pensais que l'argent resterait sagement enfermé dans les actifs patrimoniaux ? Mauvaise nouvelle."
          : "You thought money would stay neatly locked away in wealth assets? Bad news."}
      </p>
      <p>
        {fr ? (
          <>
            L'argent finit toujours par brûler les doigts. C'est ce qu'on appelle l'
            <Reference href="https://fr.wikipedia.org/wiki/Effet_de_richesse">
              <i>Effet de Richesse.</i>
            </Reference>
          </>
        ) : (
          <>
            Money always ends up burning your fingers. This is called the{" "}
            <Reference href="https://en.wikipedia.org/wiki/Wealth_effect">
              <i>Wealth Effect.</i>
            </Reference>
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "Comment l'argent finit par arriver dans l'économie réelle ?"
            : "How does money end up reaching the real economy?"
        }
      >
        <p>
          {fr ? (
            <>
              Reprenons notre ami <i>M. Balthazar Picsou</i>. Grâce au crédit facile et à la hausse
              des marchés, son portefeuille d'actions a doublé de valeur. Il se sent... très riche.
            </>
          ) : (
            <>
              Let's bring back our friend <i>Mr. Scrooge McDuck</i>. Thanks to easy credit and
              rising markets, his stock portfolio has doubled in value. He feels... very rich.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Il décide alors de se faire plaisir, et c'est bien normal :"
            : "He then decides to treat himself, and that's perfectly normal:"}
        </p>
        <ul>
          <li>{fr ? "il vend quelques actions" : "he sells some shares"}</li>

          <li>
            {fr
              ? "il achète une résidence secondaire au bord de la mer"
              : "he buys a seaside vacation home"}
          </li>

          <li>{fr ? "et il commande une voiture de luxe." : "and he orders a luxury car."}</li>
        </ul>
        <div style={PAGE_STYLES.illustrationsWrapper}>
          <Illustration
            src={picsouVilla}
            alt={fr ? "Résidence secondaire de Picsou" : "Scrooge's vacation home"}
            width="30%"
            caption={
              fr
                ? "Picsou devant sa nouvelle résidence secondaire"
                : "Scrooge in front of his new vacation home"
            }
          />
          <Illustration
            src={picsouCar}
            alt={fr ? "Voiture de Picsou" : "Scrooge's car"}
            width="30%"
            caption={
              fr
                ? "Picsou au volant de sa belle voiture de collection"
                : "Scrooge at the wheel of his beautiful classic car"
            }
          />
        </div>
        <p>
          {fr
            ? "Et voilà ! L'argent vient de sortir du circuit financier pour entrer dans l'économie réelle : le vendeur de la maison et le concessionnaire auto le reçoivent."
            : "And there you go! Money has just left the financial circuit to enter the real economy: the house seller and the car dealer both receive it."}
        </p>
        <p>
          {fr ? (
            <>
              Ces gens-là vont à leur tour dépenser cet argent au restaurant, au supermarché, ou
              pour faire des travaux.
              <br />
              Le fameux « ruissellement » commence, celui dont parlent les économistes en costume.
            </>
          ) : (
            <>
              These people will in turn spend this money at restaurants, at the supermarket, or on
              renovations.
              <br />
              The famous "trickle-down" begins-the one economists in suits like to talk about.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>OK. L'argent afflue dans l'économie réelle. Tu sens le problème arriver, non ?</>
        ) : (
          <>
            OK. Money is flooding into the real economy. You can feel the problem coming, can't you?
          </>
        )}
      </p>
      <p>
        {fr
          ? "Eh oui ! Les banques ont créé de la nouvelle monnaie en abondance, augmentant massivement la quantité d'argent en circulation. Mais est-ce que le nombre de baguettes de pain, de litres d'essence ou de maisons a explosé aussi vite ? Non."
          : "Indeed! Banks have created new money in abundance, massively increasing the amount of money in circulation. But has the number of loaves of bread, liters of gas, or houses exploded just as fast? No."}
      </p>
      <p>
        {fr ? (
          <>
            Et ça, c'est la définition mécanique de l'inflation : si la quantité d'argent en
            circulation explose, mais que la quantité de produits reste à peu près la même, alors
            les prix finissent eux aussi par exploser . Logique, non ?
          </>
        ) : (
          <>
            And that is the mechanical definition of inflation: if the amount of money in
            circulation explodes, but the quantity of goods stays roughly the same, then prices end
            up exploding too . Makes sense, right?
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Et voilà. Premier module bouclé. Avant de passer à la suite,{" "}
            <Reference to={ROUTE_NAME.Banking_7}>un petit quiz</Reference> pour vérifier que tout
            est solide.
          </>
        ) : (
          <>
            That's it. First module done. Before moving on,{" "}
            <Reference to={ROUTE_NAME.Banking_7}>a quick quiz</Reference> to make sure everything's
            solid.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
