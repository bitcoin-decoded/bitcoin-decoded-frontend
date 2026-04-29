import { type FC, type CSSProperties } from "react";
import { Callout, Emphasis, IdentityCard } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";
import { PAGE_STYLES } from "../../Shared/styles";
import gyroGearlooseImg from "../../../../src/Design/img/Gyro_Gearloose.png";
import picsouImg from "../../../../src/Design/img/picsou.webp";
import cantillonEffectImg from "../../../../src/Design/img/Cantillon_Effect.jpg";
import { Quiz, getQuizDataProfileChoice } from "../../../Interactive";
import { useToggleSimulator } from "../../Shared/hooks";
import { Illustration } from "../../../Interactive";

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
            Débordant de liquidités (M0), les banques commerciales ouvrent les
            vannes du crédit (M2). Mais pour éviter les risques, elles dirigent
            cet argent vers les actifs patrimoniaux plutôt que vers l'économie
            productive. L'argent profite donc en premier à ceux qui possèdent
            déjà du capital : c'est l'Effet Cantillon.
          </>
        ) : (
          <>
            Overflowing with liquidity (M0), commercial banks open the credit
            floodgates (M2). But to avoid risk, they direct this money toward
            asset investments rather than the productive economy. The money
            therefore benefits first those who already own capital: this is the
            Cantillon Effect.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Les marges sont écrasées, mais les coffres débordent de M0.
            L'équation de survie pour la banque commerciale est simple :{" "}
            <Emphasis>faire du volume avec zéro risque</Emphasis>.
          </>
        ) : (
          <>
            Margins are crushed, but the vaults overflow with M0. The survival
            equation for the commercial bank is simple:{" "}
            <Emphasis>do volume with zero risk</Emphasis>.
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
              Je vous présente deux nouveaux personnages :{" "}
              <i>M. Balthazar Picsou</i> et <i>M. Géo Trouve-Tout</i>.
            </>
          ) : (
            <>
              Let me introduce two new characters:{" "}
              <i>Mr. Scrooge McDuck</i> and <i>Mr. Gyro Gearloose</i>.
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
                    ? "Créer une machine révolutionnaire pour les boulangers"
                    : "Create a revolutionary machine for bakers",
                },
                {
                  label: fr
                    ? "Ses garanties auprès de la banque :"
                    : "His collateral for the bank:",
                  value: fr
                    ? "Rien d'autre que sa bonne volonté"
                    : "Nothing but his goodwill",
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

      <Quiz
        {...getQuizDataProfileChoice(language)}
        onCorrectAnswer={onQuizSolved}
      />

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
                Vous venez de comprendre la mécanique implacable de l'
                <i>Effet Cantillon</i>, théorisé par l'économiste{" "}
                <i>Richard Cantillon</i> : l'argent nouvellement créé (M2) fuit
                l'économie réelle (trop risquée) pour aller gonfler la bulle des
                actifs. Les "Picsou" s'enrichissent en dormant (car la demande
                pour les actifs monte). Les "Géo" restent sur la touche.
              </>
            ) : (
              <>
                You've just understood the relentless mechanics of the{" "}
                <i>Cantillon Effect</i>, theorized by economist{" "}
                <i>Richard Cantillon</i>: newly created money (M2) flees the
                real economy (too risky) to inflate the asset bubble. The
                "Scrooges" get richer while sleeping (because demand for assets
                rises). The "Gyros" are left on the sidelines.
              </>
            )}
          </p>
          <Illustration
            src={cantillonEffectImg}
            alt="Cantillon Effect"
            width="40%"
            caption={
              fr
                ? "Le ruissellement de l'argent : Le robinet monétaire remplit d'abord les investisseurs (les 'Picsou') avant de ruisseler... jusque dans notre caddie"
                : "The trickle-down of money: The monetary tap fills investors ('the Scrooges') first before trickling down... into our shopping cart"
            }
          />
          <p>
            {fr ? (
              <>
                Mais quand les Picsou se sentent riches, ils finissent par
                dépenser leurs gains... et c'est là que les problèmes arrivent
                pour le caddie de courses. Qui vient de prononcer le mot{" "}
                <i>inflation</i> ?
              </>
            ) : (
              <>
                But when the Scrooges feel rich, they end up spending their
                gains... and that's when problems arrive for the shopping cart.
                Who just said the word <i>inflation</i>?
              </>
            )}
          </p>
        </>
      )}
    </PageTemplate>
  );
};
