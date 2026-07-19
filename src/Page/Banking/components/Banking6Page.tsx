import { type FC } from "react";

import picsouCar from "../../../../src/Design/img/picsou_car.jpg";
import picsouVilla from "../../../../src/Design/img/picsou_villa.jpg";
import { Quote } from "../../../Design";
import { Callout, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { Illustration } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PAGE_STYLES, PageTemplate } from "../../Shared/";

export const Banking6Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.inflation")}>
      <BlockReader chapterId={ROUTE_NAME.Banking_6}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Tes courses ont augmenté. Ton loyer aussi. Ton salaire, lui, suit mollement. Pendant
                ce temps, le CAC 40 bat des records et l'immobilier parisien tutoie l'absurde. Tu
                sens qu'il y a un lien. Tu as raison.
              </>
            ) : (
              <>
                Your grocery bill has gone up. So has your rent. Your paycheck, meanwhile, is barely
                keeping pace. At the same time, the NASDAQ is hitting record highs and real estate
                is climbing into the absurd. You sense there's a link. You're right.
              </>
            )}
          </ChapterPrelude>
          <p>
            {fr
              ? "Tu pensais que l'argent resterait sagement enfermé dans les actifs patrimoniaux ? Mauvaise nouvelle."
              : "You thought money would stay neatly locked away in financial assets? Bad news."}
          </p>
        </Block>

        <Block>
          {fr ? (
            <>
              L'argent finit presque toujours par brûler les doigts. C'est ce qu'on appelle l'
              <Reference href="https://fr.wikipedia.org/wiki/Effet_de_richesse">
                <i>Effet de Richesse.</i>
              </Reference>
            </>
          ) : (
            <>
              Money almost always ends up burning your fingers. This is called the{" "}
              <Reference href="https://en.wikipedia.org/wiki/Wealth_effect">
                <i>Wealth Effect.</i>
              </Reference>
            </>
          )}
        </Block>

        <Block>
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
                  Reprenons notre ami <i>M. Balthazar Picsou</i>. Grâce au crédit facile et à la
                  hausse des marchés, son portefeuille d'actions a doublé de valeur. Il se sent...
                  très riche.
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
                : "He decides to treat himself, and that's perfectly normal:"}
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
            <p>
              {fr
                ? "(Et s'il ne veut pas vendre, il emprunte en mettant ses actions en garantie. Même résultat : de l'argent frais dans l'économie réelle.)"
                : "(And if he'd rather not sell, he borrows against his shares instead. Same result: fresh money in the real economy.)"}
            </p>
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
                    ? "Picsou au volant de sa belle voiture de luxe"
                    : "Scrooge at the wheel of his fancy luxury car"
                }
              />
            </div>
            <p>
              {fr
                ? "Et voilà ! L'argent vient de sortir du circuit financier pour entrer dans l'économie réelle : le vendeur de la maison et le concessionnaire auto le reçoivent."
                : "And there it goes! Money has just left the financial circuit to enter the real economy: the home seller and the car dealer both receive it."}
            </p>
            <p>
              {fr ? (
                <>
                  Ces gens-là vont à leur tour dépenser cet argent au restaurant, au supermarché, ou
                  pour faire des travaux.
                  <br />
                  Le fameux « ruissellement » commence, celui dont parlent les économistes en
                  costume.
                </>
              ) : (
                <>
                  These people will in turn spend that money at restaurants, at the supermarket, or
                  on home improvements.
                  <br />
                  The famous "trickle-down" begins, the one economists in suits like to talk about.
                </>
              )}
            </p>
          </Callout>
        </Block>

        <Block>
          <p>
            {fr ? (
              <>OK. L'argent afflue dans l'économie réelle. Tu sens le problème arriver, non ?</>
            ) : (
              <>
                OK. Money is flooding into the real economy. You can feel the problem coming, right?
              </>
            )}
          </p>
          <p>
            {fr
              ? "Eh oui ! Sur la dernière décennie, crédit facile et taux planchers ont fait gonfler massivement la quantité d'argent en circulation. Mais est-ce que le nombre de baguettes de pain, de litres d'essence ou de maisons a explosé aussi vite ? Non."
              : "Indeed! Over the past decade, easy credit and rock-bottom rates have massively swollen the amount of money in circulation. But has the number of loaves of bread, liters of gas, or houses grown just as fast? No."}
          </p>
        </Block>

        <Block>
          {fr ? (
            <>
              Et ça, c'est le moteur principal de l'inflation.{" "}
              <Reference href="https://fr.wikipedia.org/wiki/Milton_Friedman">
                Milton Friedman
              </Reference>
              , prix Nobel, le résumait ainsi :
              <Quote author="Milton Friedman" source="Counter-Revolution in Monetary Theory (1970)">
                {fr
                  ? "L'inflation est toujours et partout un phénomène monétaire."
                  : "Inflation is always and everywhere a monetary phenomenon."}
              </Quote>
              Logique, non ?
            </>
          ) : (
            <>
              And that is the main engine of inflation.{" "}
              <Reference href="https://en.wikipedia.org/wiki/Milton_Friedman">
                Milton Friedman
              </Reference>
              , the Nobel laureate, put it bluntly:
              <Quote author="Milton Friedman" source="Counter-Revolution in Monetary Theory (1970)">
                {fr
                  ? "L'inflation est toujours et partout un phénomène monétaire."
                  : "Inflation is always and everywhere a monetary phenomenon."}
              </Quote>
              Makes sense, right?
            </>
          )}
        </Block>

        <Block last>
          {fr ? (
            <>
              Et voilà. Premier module bouclé. Avant de passer à la suite,{" "}
              <Reference to={ROUTE_NAME.Banking_7}>un petit quiz</Reference> pour vérifier que tout
              est solide.
            </>
          ) : (
            <>
              That's it. First module done. Before moving on,{" "}
              <Reference to={ROUTE_NAME.Banking_7}>a quick quiz</Reference> to make sure it all
              holds up.
            </>
          )}
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
