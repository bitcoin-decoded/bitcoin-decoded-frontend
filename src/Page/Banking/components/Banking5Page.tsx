import { type CSSProperties, type FC } from "react";

import cantillonEffectImg from "../../../../src/Design/img/Cantillon_Effect.jpg";
import gyroGearlooseImg from "../../../../src/Design/img/Gyro_Gearloose.png";
import picsouImg from "../../../../src/Design/img/picsou.webp";
import { Callout, IdentityCard, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataProfileChoice, Quiz } from "../../../Interactive";
import { Illustration } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PAGE_STYLES, PageTemplate } from "../../Shared/";

export const Banking5Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  const cardWrapperStyle: CSSProperties = {
    flex: "1 1 300px",
    maxWidth: "25rem",
    minWidth: "17.5rem",
  };

  return (
    <PageTemplate title={t("nav.tree.cantillon")} showChapterNav={false}>
      <BlockReader chapterId={ROUTE_NAME.Banking_5}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                T'es un banquier. Tes coffres débordent de M0, tes marges sont écrasées, et la
                direction veut du volume. Sur ton bureau, deux dossiers de prêt. L'un va te
                rapporter peu mais sans aucun risque. L'autre pourrait financer la prochaine
                révolution industrielle, mais peut-être pas. T'as 30 secondes pour choisir.
                Bienvenue dans l'Effet Cantillon.
              </>
            ) : (
              <>
                You're a banker. Your vaults are overflowing with M0, your margins are razor-thin,
                and management wants volume. On your desk: two loan applications. One earns you
                almost nothing, but carries almost no risk. The other could fund the next industrial
                revolution. Or not. You've got 30 seconds. Welcome to the Cantillon Effect.
              </>
            )}
          </ChapterPrelude>
          <p>
            {fr ? (
              <>
                Les marges sont écrasées, mais les coffres débordent de M0. L'équation de survie
                pour la banque commerciale est simple : faire du volume en prenant le moins de
                risque possible.
              </>
            ) : (
              <>
                Margins are crushed, but the vaults are overflowing with M0. The commercial bank's
                survival equation is simple: do volume while taking on as little risk as possible.
              </>
            )}
          </p>
          <p>
            {fr
              ? "C'est l'heure du tri sélectif : en tant que banquier, voici tes deux prochains rendez-vous."
              : "Time to sort the pile: as a banker, here are your next two appointments."}
          </p>
        </Block>

        <Block>
          <Callout
            title={
              fr
                ? "Les deux types de clients : l'entrepreneur et l'Investisseur"
                : "The two types of client: the entrepreneur and the investor"
            }
          >
            <p>
              {fr ? (
                <>
                  Je te présente deux nouveaux personnages : <i>M. Balthazar Picsou</i> et{" "}
                  <i>M. Géo Trouve-Tout</i>.
                </>
              ) : (
                <>
                  Let me introduce two new characters: <i>Mr. Scrooge McDuck</i> and{" "}
                  <i>Mr. Gyro Gearloose</i>.
                </>
              )}
            </p>
            <div style={PAGE_STYLES.cardsContainer}>
              <div style={cardWrapperStyle}>
                <IdentityCard
                  name={fr ? "Géo Trouve-Tout" : "Gyro Gearloose"}
                  profile={fr ? "L'Entrepreneur" : "The Entrepreneur"}
                  profilePicture={
                    <img
                      src={gyroGearlooseImg}
                      alt={fr ? "M. Géo Trouvetout" : "Mr. Gyro Gearloose"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  }
                  characteristics={[
                    {
                      label: fr ? "Son projet :" : "His project:",
                      value: fr
                        ? "Créer une machine astucieuse qui pétrit le pain deux fois plus vite que les modèles actuels"
                        : "Build a clever machine that kneads bread twice as fast as anything on the market",
                    },
                    {
                      label: fr
                        ? "Ses garanties auprès de la banque :"
                        : "His collateral for the bank:",
                      value: fr
                        ? "Sa motivation et un business plan, rien d'autre !"
                        : "His drive and a business plan, nothing else!",
                    },
                  ]}
                />
              </div>
              <div style={cardWrapperStyle}>
                <IdentityCard
                  name={fr ? "M. Balthazar Picsou" : "Mr. Scrooge McDuck"}
                  profile={fr ? "L'Investisseur" : "The Investor"}
                  profilePicture={
                    <img
                      src={picsouImg}
                      alt={fr ? "Picsou" : "Scrooge McDuck"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  }
                  characteristics={[
                    {
                      label: fr ? "Son projet :" : "His project:",
                      value: fr
                        ? "Diversifier son portefeuille d'actions (Apple, Tesla et NVidia)"
                        : "Diversify his stock portfolio (Apple, Tesla, NVidia)",
                    },
                    {
                      label: fr
                        ? "Ses garanties auprès de la banque :"
                        : "His collateral for the bank:",
                      value: fr
                        ? "Son portefeuille d'actions existant est mis en gage"
                        : "His existing stock portfolio, put up as security",
                    },
                  ]}
                />
              </div>
            </div>
          </Callout>
        </Block>

        {/* Bloc-outil : déverrouillé quand le quiz reçoit une bonne réponse. */}
        <Block kind="tool">
          {({ markComplete }) => (
            <Quiz {...getQuizDataProfileChoice(language)} onCorrectAnswer={markComplete} />
          )}
        </Block>

        <Block>
          <p>
            {fr
              ? "Le résultat des courses : L'argent va à l'argent"
              : "The bottom line: money goes to money"}
          </p>
          <p>
            {fr ? (
              <>
                Tu viens de comprendre la mécanique de l'<i>Effet Cantillon</i>, du nom de
                l'économiste irlandais du XVIIIe siècle{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Richard_Cantillon">
                  <i>Richard Cantillon</i>
                </Reference>{" "}
                : l'argent nouvellement créé (M2) se dirige en priorité vers les actifs, jugés moins
                risqués, plutôt que vers l'économie réelle. Les « Picsou » s'enrichissent en dormant
                : la demande pour les actifs monte, leurs portefeuilles aussi. Les « Géo » restent
                sur la touche.
              </>
            ) : (
              <>
                You've just understood the mechanics of the <i>Cantillon Effect</i>, named after the
                18th-century Irish economist{" "}
                <Reference href="https://en.wikipedia.org/wiki/Richard_Cantillon">
                  Richard Cantillon
                </Reference>{" "}
                : newly created money (M2) flows first toward assets, judged less risky, rather than
                into the real economy. The "Scrooges" get richer in their sleep: demand for assets
                climbs, and so do their portfolios. The "Geos" are left on the sidelines.
              </>
            )}
          </p>
          <Illustration
            src={cantillonEffectImg}
            alt="Cantillon Effect"
            width="40%"
            caption={
              fr
                ? "Le ruissellement de l'argent : le robinet monétaire remplit d'abord les portefeuilles des « Picsou » avant que ça ne finisse par ruisseler... jusque dans notre caddie"
                : "The trickle-down of money: the monetary tap fills the “Scrooges’” pockets first, before any of it ever trickles down... all the way to our shopping cart"
            }
          />
        </Block>

        <Block last>
          {fr ? (
            <>
              Mais quand les Picsou se sentent riches, ils finissent par dépenser. Cette demande en
              plus, sur la même quantité de biens, pousse les prix. Et là, ça déborde dans le caddie
              de courses. Tiens, quelqu'un n'aurait pas prononcé le mot{" "}
              <Reference to={ROUTE_NAME.Banking_6}>
                <i>inflation</i>
              </Reference>{" "}
              ?
            </>
          ) : (
            <>
              But when the Scrooges feel wealthy, they eventually start spending. More demand, same
              amount of goods, prices climb. And that's when it spills over into the shopping cart.
              Wait, did someone just say the word{" "}
              <Reference to={ROUTE_NAME.Banking_6}>
                <i>inflation</i>
              </Reference>{" "}
              ?
            </>
          )}
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
