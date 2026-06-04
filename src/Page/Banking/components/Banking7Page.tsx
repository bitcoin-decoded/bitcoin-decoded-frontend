import { type FC } from "react";

import moneyConsuming from "../../../../src/Design/img/money_consuming.jpg";
import moneyCreationCodeline from "../../../../src/Design/img/money_creation_codeline.jpg";
import moneyPrinting from "../../../../src/Design/img/money_printing.webp";
import { HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  BitcoinDonationFooter,
  getQuizDataModule1Synthesis,
  Illustration,
  SynthesisQuiz,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const Banking7Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const {
    isActive: isQuizPassed,
    activate: onQuizPassed,
    reset: onQuizReset,
  } = useToggleSimulator();
  const quiz = getQuizDataModule1Synthesis(language);

  return (
    <PageTemplate title={t("nav.tree.synthesis")} showReadingTime={false}>
      <p>
        {fr
          ? "Tu viens de traverser la partie la plus dense. Avant de prendre du recul, mets tes acquis à l'épreuve."
          : "You've just made it through the densest part. Before stepping back, put what you've learned to the test."}
      </p>
      <p>
        <HighlightText>
          {fr ? (
            <>
              {quiz.questions.length} questions sur l'ensemble du module. Il te faut au moins{" "}
              {quiz.passThreshold} bonnes réponses pour débloquer la synthèse.
            </>
          ) : (
            <>
              {quiz.questions.length} questions across the whole module. You need at least{" "}
              {quiz.passThreshold} right answers to unlock the wrap-up.
            </>
          )}
        </HighlightText>
      </p>

      <SynthesisQuiz
        {...quiz}
        storageKey="synthesisQuiz.module1"
        onPass={onQuizPassed}
        onReset={onQuizReset}
      />

      {isQuizPassed && (
        <>
          <p>{fr ? "Bravo à toi !" : "Well done."}</p>
          <p>
            {fr ? (
              <>
                Pose-toi 2 minutes. Tu vois maintenant l'image d'ensemble. Et c'est pas joli.
                L'argent que tu utilises au quotidien n'est plus convertible en un actif physique{" "}
                <Reference href="https://fr.wikipedia.org/wiki/Accords_de_Bretton_Woods">
                  tel que l'or
                </Reference>
                . C'est une monnaie scripturale, créée par les banques commerciales (en majeure
                partie) à chaque crédit accordé. Encadrée, OK. Mais{" "}
                <HighlightText>extensible par nature</HighlightText>.
              </>
            ) : (
              <>
                Take two minutes. Now you see the whole picture. And it's not pretty. The money you
                use every day is no longer convertible into a physical asset{" "}
                <Reference href="https://en.wikipedia.org/wiki/Bretton_Woods_system">
                  like gold
                </Reference>
                . It's book-entry money, created (for the most part) by commercial banks every time
                a loan is granted. Regulated, OK. But{" "}
                <HighlightText>expandable by design</HighlightText>.
              </>
            )}
            <Illustration
              src={moneyCreationCodeline}
              alt={
                fr
                  ? "Création monétaire via une ligne de code"
                  : "Money creation via a line of code"
              }
              width="30%"
              caption={fr ? "Une simple ligne de code" : "Just a single line of code"}
            />
          </p>
          <p>
            {fr ? (
              <>
                Et quand ça vacille ? La Banque Centrale dégaine sa M0 par milliards. Pas un
                virement sur ton compte, que nenni : l'argent atterrit d'abord dans la sphère
                financière. Le système est sauvé à court terme, au prix d'une{" "}
                <HighlightText>dilution progressive de la monnaie existante</HighlightText>, surtout
                quand cette expansion dépasse durablement la création de richesse réelle.
              </>
            ) : (
              <>
                And when it wobbles? The Central Bank fires up M0 by the billions. Not a wire
                transfer to your account — far from it: the money lands first in the financial
                sphere. The system is saved in the short term, at the cost of{" "}
                <HighlightText>a gradual dilution of the existing currency</HighlightText>,
                especially when that expansion persistently outpaces the creation of real wealth.
              </>
            )}
            <Illustration
              src={moneyPrinting}
              alt="Brr printing meme"
              width="40%"
              caption="brrr printing machine!"
            />
          </p>
          <p>
            {fr ? (
              <>
                Et cet argent frais ne ruisselle pas pour tout le monde. L'Effet Cantillon, tu te
                rappelles ? Les prix des actifs s'envolent, bourse, immobilier, NFT à tête de chien.
                Pendant que toi tu cravaches au travail et que ton revenu progresse à peine.{" "}
                <HighlightText>
                  Ça finit par sortir sur ton caddie, ton loyer, ta qualité de vie
                </HighlightText>
                .
              </>
            ) : (
              <>
                And this fresh money doesn't trickle down for everyone. The Cantillon Effect,
                remember? Asset prices take off — stocks, real estate, dog-faced NFTs. Meanwhile,
                you're grinding at work and your income barely climbs.{" "}
                <HighlightText>
                  It ends up showing on your shopping cart, your rent, your quality of life
                </HighlightText>
                .
              </>
            )}
            <Illustration
              src={moneyConsuming}
              alt={fr ? "Consumation des monnaies fiduciaires" : "Fiat currencies burning away"}
              width="30%"
              caption={
                fr
                  ? "Lentement mais sûrement ton pouvoir d'achat se consume"
                  : "Slowly but surely, your purchasing power burns away"
              }
            />
          </p>
          <p>
            {fr ? (
              <>
                <HighlightText>Le constat est structurel</HighlightText>. Pas un accident, pas juste
                une suite de mauvaises décisions prises par des clowns au gouvernement. Ça découle
                du fonctionnement même d'un système{" "}
                <HighlightText>bâti sur l'expansion du crédit et de la dette</HighlightText>. Une
                grosse crise ? Le réflexe politique depuis des décennies : faire peur, imprimer
                plus, soutenir le crédit. Et l'addition ? On la fait porter aux Nicolas.
              </>
            ) : (
              <>
                <HighlightText>The diagnosis is structural</HighlightText>. Not an accident, not
                just a string of bad calls by clowns in office. It flows from the very wiring of a
                system <HighlightText>built on credit and debt expansion</HighlightText>. Big
                crisis? The political reflex for decades has been the same: stoke fear, print more,
                prop up credit. And the bill? Loaded onto the Nicolases.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                <HighlightText>Et si on avait un autre outil ?</HighlightText> Une monnaie que
                personne ne pourrait imprimer à volonté, qui ne dépendrait d'aucun émetteur central,
                et qui préserverait la rareté dans le temps. Une sorte de Saint-Graal monétaire.
                Mais avant de savoir si cet outil existe, il faut qu'on parle d'une chose qu'on
                oublie trop souvent.
              </>
            ) : (
              <>
                <HighlightText>What if there were another tool?</HighlightText> A currency no one
                could print at will, that depends on no central issuer, and that preserves scarcity
                over time. A kind of monetary Holy Grail. But before we find out whether that tool
                exists, we need to talk about something we forget too often.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Au fond, c'est quoi l'argent ? Pourquoi un billet a de la valeur et une feuille
                d'arbre non ? Pourquoi on a utilisé l'or pendant des millénaires avant de s'en
                détourner ?
              </>
            ) : (
              <>
                Deep down, what is money? Why does a banknote hold value while a tree leaf doesn't?
                Why did humans use gold for thousands of years before turning away from it?{" "}
              </>
            )}
          </p>
          <HighlightText>
            <p>
              {fr
                ? "Pour comprendre la solution, il faut d'abord poser les bases."
                : "To grasp the solution, you have to lay the groundwork first."}
            </p>
          </HighlightText>
          <p>
            {fr ? "Direction la prochaine étape :" : "Onward to the next step:"}{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_1}>{t("nav.tree.moneyOrigin")}</Reference>.
          </p>
        </>
      )}
      <BitcoinDonationFooter display="inline" />
    </PageTemplate>
  );
};
