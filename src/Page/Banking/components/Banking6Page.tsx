import { type FC } from "react";
import { Callout, Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";
import { PAGE_STYLES } from "../../Shared/styles";
import { Illustration } from "../../../Interactive";
import picsouCar from "../../../../src/Design/img/picsou_car.jpg";
import picsouVilla from "../../../../src/Design/img/picsou_villa.jpg";

export const Banking6Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.inflation")}
      prelude={
        fr ? (
          <>
            L'argent accumulé dans les actifs (Bourse, Immobilier) finit
            inévitablement par "fuir" vers l'économie réelle : c'est l'Effet de
            Richesse. Une masse de monnaie excessive se met alors à chasser une
            quantité limitée de biens. Résultat mathématique : les prix du
            quotidien explosent.
          </>
        ) : (
          <>
            Money accumulated in assets (Stock Market, Real Estate) inevitably
            ends up "leaking" into the real economy: this is the Wealth Effect. An
            excessive money supply then chases a limited quantity of goods.
            Mathematical result: everyday prices skyrocket.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Vous pensiez que l'argent resterait sagement enfermé dans les actifs patrimoniaux ? Raté."
          : "You thought money would stay neatly locked up in financial assets? Wrong."}
      </p>
      <p>
        {fr ? (
          <>
            Tôt ou tard, l'argent brûle les doigts. C'est ce qu'on appelle l'
            <i>Effet de Richesse.</i>
          </>
        ) : (
          <>
            Sooner or later, money burns a hole in your pocket. This is called
            the <i>Wealth Effect.</i>
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
              Reprenons notre ami <i>M. Balthazar Picsou</i>. Grâce au crédit
              facile et à la hausse des marchés, son portefeuille d'actions a
              doublé de valeur. Il se sent... très riche.
            </>
          ) : (
            <>
              Let's bring back our friend <i>Mr. Scrooge McDuck</i>. Thanks to
              easy credit and rising markets, his stock portfolio has doubled in
              value. He feels... very rich.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Il décide alors de se faire plaisir, et c'est bien normal :
              <ul>
                <li>il vend quelques actions</li>
                <li>il achète une résidence secondaire au bord de la mer</li>
                <li>et il commande une voiture de luxe.</li>
              </ul>
            </>
          ) : (
            <>
              He then decides to treat himself, and that's perfectly normal:
              <ul>
                <li>he sells some shares</li>
                <li>he buys a seaside vacation home</li>
                <li>and he orders a luxury car.</li>
              </ul>
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Disons-le clairement : Picsou a gagné pas mal d'argent et il se
              fait <Emphasis>plaisir</Emphasis>.
            </>
          ) : (
            <>
              Let's be clear: Scrooge made quite a bit of money and he's{" "}
              <Emphasis>treating himself</Emphasis>.
            </>
          )}
        </p>
        <div style={PAGE_STYLES.illustrationsWrapper}>
          <Illustration
            src={picsouVilla}
            alt={
              fr
                ? "Résidence secondaire de Picsou"
                : "Scrooge's vacation home"
            }
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
            ? "Et voilà ! L'argent vient de sortir du circuit financier pour entrer dans l'économie réelle : le vendeur de la maison et le concessionnaire auto reçoivent tous deux l'argent."
            : "And there you go! Money has just left the financial circuit to enter the real economy: the house seller and the car dealer both receive the money."}
        </p>
        <p>
          {fr ? (
            <>
              Ces gens-là vont à leur tour dépenser cet argent au restaurant, au
              supermarché, ou pour faire des travaux.
              <br />
              <Emphasis>Le "ruissellement" commence pour de vrai.</Emphasis>
            </>
          ) : (
            <>
              These people will in turn spend this money at restaurants, at the
              supermarket, or on renovations.
              <br />
              <Emphasis>The "trickle-down" begins for real.</Emphasis>
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            <Emphasis>OK. L'argent afflue dans l'économie réelle</Emphasis>. Mais
            je suis certain que vous percevez ici qu'il y a un{" "}
            <Emphasis>GROS</Emphasis> problème, n'est-ce pas ?
          </>
        ) : (
          <>
            <Emphasis>OK. Money is flooding into the real economy</Emphasis>. But
            I'm sure you sense there's a <Emphasis>BIG</Emphasis> problem here,
            right?
          </>
        )}
      </p>
      <p>
        {fr
          ? "Et oui ! Les banques ont créé de la nouvelle monnaie en abondance, augmentant massivement la quantité d'argent en circulation. Mais est-ce que le nombre de baguettes de pain, de litres d'essence ou de maisons a explosé aussi vite ? Non."
          : "Indeed! Banks have created new money in abundance, massively increasing the amount of money in circulation. But has the number of loaves of bread, liters of gas, or houses exploded just as fast? No."}
      </p>
      <p>
        {fr ? (
          <>
            Et ça, c'est la définition mécanique de l'inflation :{" "}
            <Emphasis>
              si la quantité d'argent en circulation explose, mais que la quantité
              de produits reste à peu près la même, alors les prix finissent
              eux-aussi par exploser.
            </Emphasis>
            Logique, non ?
          </>
        ) : (
          <>
            And that is the mechanical definition of inflation:{" "}
            <Emphasis>
              if the amount of money in circulation explodes, but the quantity of
              goods stays roughly the same, then prices end up exploding too.
            </Emphasis>
            Makes sense, right?
          </>
        )}
      </p>
      <p>
        {fr
          ? "Je crois qu'il est temps de faire une petite synthèse de tout ce que l'on a vu jusqu'à présent. Vous allez voir, nous avons couvert beaucoup de notions et tout va s'éclairer."
          : "I think it's time for a brief summary of everything we've seen so far. You'll see, we've covered many concepts and everything will become clear."}
      </p>
    </PageTemplate>
  );
};
