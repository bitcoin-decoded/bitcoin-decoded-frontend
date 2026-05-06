import { type CSSProperties, type FC } from "react";

import cantillonEffectImg from "../../../../src/Design/img/Cantillon_Effect.jpg";
import gyroGearlooseImg from "../../../../src/Design/img/Gyro_Gearloose.png";
import picsouImg from "../../../../src/Design/img/picsou.webp";
import { Callout, Emphasis, IdentityCard } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataProfileChoice, Quiz } from "../../../Interactive";
import { Illustration } from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";
import { useToggleSimulator } from "../../Shared/hooks";
import { PAGE_STYLES } from "../../Shared/styles";

export const Banking5Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();

  const cardWrapperStyle: CSSProperties = {
    flex: "1 1 300px",
    maxWidth: "25rem",
    minWidth: "17.5rem",
  };

  return (
    <PageTemplate
      title={t("nav.tree.cantillon")}
      prelude={
        fr ? (
          <>
            Disposant de réserves abondantes en M0, les banques commerciales ouvrent les vannes du
            crédit, créant ainsi de la M2. Mais pour éviter les risques, elles dirigent cet argent
            vers les actifs patrimoniaux plutôt que vers l'économie productive. L'argent profite
            donc en premier à ceux qui possèdent déjà du capital : c'est l'Effet Cantillon.
          </>
        ) : (
          <>
            With abundant M0 reserves, commercial banks open the floodgates of credit, thereby
            creating M2. But to avoid risk, they direct this money toward asset investments rather
            than the productive economy. The money therefore benefits first those who already own
            capital: this is the Cantillon Effect.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Les marges sont écrasées, mais les coffres débordent de M0. L'équation de survie pour la
            banque commerciale est simple : <Emphasis>faire du volume avec zéro risque</Emphasis>.
          </>
        ) : (
          <>
            Margins are crushed, but the vaults overflow with M0. The survival equation for the
            commercial bank is simple: <Emphasis>do volume with zero risk</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr
          ? "C'est l'heure du tri sélectif : en tant que banquier, voici vos deux prochains rendez-vous."
          : "It's time for selective sorting: as a banker, here are your next two appointments."}
      </p>
      <Callout
        title={
          fr
            ? "Les deux types de clients : l'entrepreneur et l'Investisseur"
            : "The two types of clients: the entrepreneur and the investor"
        }
      >
        <p>
          {fr ? (
            <>
              Je vous présente deux nouveaux personnages : <i>M. Balthazar Picsou</i> et{" "}
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
                    : "Build an ingenious machine that kneads dough twice as fast as current models",
                },
                {
                  label: fr
                    ? "Ses garanties auprès de la banque :"
                    : "His collateral for the bank:",
                  value: fr
                    ? "Sa motivation et un business plan, rien d'autre !"
                    : "His motivation and a business plan, nothing else!",
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
                    : "Diversify his stock portfolio (Apple, Tesla, and NVidia)",
                },
                {
                  label: fr
                    ? "Ses garanties auprès de la banque :"
                    : "His collateral for the bank:",
                  value: fr
                    ? "Son portefeuille d'actions existant est mis en gage"
                    : "His existing stock portfolio is pledged",
                },
              ]}
            />
          </div>
        </div>
      </Callout>

      <Quiz {...getQuizDataProfileChoice(language)} onCorrectAnswer={onQuizSolved} />

      {isQuizSolved && (
        <>
          <p>
            {fr
              ? "Le résultat des courses : L'Argent va à l'Argent 💸"
              : "The bottom line: Money goes to Money 💸"}
          </p>
          <p>
            {fr ? (
              <>
                Vous venez de comprendre la mécanique de l'<i>Effet Cantillon</i>, du nom de
                l'économiste irlandais du XVIIIe siècle <i>Richard Cantillon</i> : l'argent
                nouvellement créé (M2) fuit l'économie réelle, jugée trop risquée, pour aller
                gonfler le prix des actifs. Les « Picsou » s'enrichissent en dormant : la demande
                pour les actifs monte, leurs portefeuilles aussi. Les « Géo » restent sur la touche.
              </>
            ) : (
              <>
                You've just understood the mechanism of the <i>Cantillon Effect</i>, named after the
                18th-century Irish economist Richard Cantillon: newly created money (M2) tends to
                flow away from the real economy—considered too risky—and instead inflates asset
                prices. The "Scrooges" get richer while they sleep: demand for assets rises, and so
                do the value of their portfolios. The "Geos" are left on the sidelines.
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
                : "The trickle-down of money: the monetary tap first fills the pockets of the “Scrooges” before it eventually trickles down... all the way to our shopping carts"
            }
          />
          <p>
            {fr ? (
              <>
                Mais quand les Picsou se sentent riches, ils finissent par dépenser. Et là, ça
                déborde dans le caddie de courses. Tiens, quelqu'un n'aurait pas prononcé le mot{" "}
                <i>inflation</i> ?
              </>
            ) : (
              <>
                But when the Scrooges feel wealthy, they eventually start spending. And that's when
                it spills over into the shopping cart. Did someone just say the word{" "}
                <i>inflation</i>?
              </>
            )}
          </p>
        </>
      )}
    </PageTemplate>
  );
};
