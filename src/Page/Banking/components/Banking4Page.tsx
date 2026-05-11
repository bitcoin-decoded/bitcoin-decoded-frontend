import { type FC } from "react";

import { Callout, Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageTemplate } from "../../Shared/components";

import { QESimulator } from "./QESimulator";
import { YieldCurveSimulator } from "./YieldCurveSimulator";

export const Banking4Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.brokenEngine")}
      prelude={
        fr ? (
          <>
            T'es-tu déjà demandé pourquoi ton banquier te regarde de travers quand tu lui parles de
            financer un vrai projet, mais déroule le tapis rouge dès qu'il s'agit d'un crédit
            immobilier ou d'un placement ? Ce n'est pas ton dossier. C'est son moteur qui tourne au
            ralenti. Et c'est la Banque Centrale qui l'a enrayé.
          </>
        ) : (
          <>
            Have you ever wondered why your banker looks at you sideways when you talk about
            financing a real project, but rolls out the red carpet for a mortgage or an investment
            product? It's not your file. It's the engine running at low speed. And it's the Central
            Bank that has jammed it.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Jusqu'ici, la Banque Centrale a sauvé les banques commerciales en leur injectant de la
            M0. Le problème c'est qu'en faisant ça,
            <Emphasis> elle a enrayé le moteur.</Emphasis>
          </>
        ) : (
          <>
            So far, the Central Bank has saved commercial banks by injecting them with M0. The
            problem is that in doing so,
            <Emphasis> it broke the engine.</Emphasis>
          </>
        )}
      </p>
      <p>
        {fr
          ? "Pour comprendre pourquoi, il faut d'abord savoir comment une banque gagne de l'argent."
          : "To understand why, you first need to know how a bank makes money."}
      </p>
      <Callout
        title={fr ? "Comment une banque gagne-t-elle de l'argent ?" : "How does a bank make money?"}
      >
        <p>
          {fr ? (
            <>
              C'est très simple :
              <ol>
                <li>
                  Elle <i>emprunte</i> de l'argent à court terme, à un taux généralement très bas
                  (pratiquement à 0%)
                </li>
                <li>
                  Elle <i>prête</i> ensuite à long terme, à un taux généralement bien plus élevé.
                </li>
              </ol>
            </>
          ) : (
            <>
              It's very simple:
              <ol>
                <li>
                  It <i>borrows</i> money short-term, at a generally very low rate (practically 0%)
                </li>
                <li>
                  It then <i>lends</i> long-term, at a generally much higher rate.
                </li>
              </ol>
            </>
          )}
        </p>
        <p>
          <Emphasis>
            {fr
              ? "Son profit, c'est l'écart entre le taux long et le taux court"
              : "Its profit is the spread between the long-term rate and the short-term rate"}
          </Emphasis>
          .
        </p>
        <p>
          {fr ? (
            <>
              <u>Exemple</u> : La banque de <i>Nicolas</i> lui a accordé un prêt de 200 000 € avec
              un taux d'intérêt de 3% sur 20 ans, une somme que cette même banque a obtenue à un
              taux extrêmement bas voire quasi-nul ! <br /> → C'est cette marge qui la rémunère pour
              prendre des risques et ainsi financer l'économie.
            </>
          ) : (
            <>
              <u>Example</u>: <i>Nicolas</i>'s bank granted him a loan of $200,000 at an interest
              rate of 3% over 20 years, an amount the same bank obtained at an extremely low, almost
              zero, rate! <br /> → This margin is what pays the bank for taking risks and thus
              financing the economy.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            En achetant massivement des obligations, la Banque Centrale fait mécaniquement monter
            leur prix (la loi de <i>l'offre et de la demande</i>). Et cette montée du prix des
            obligations fait simultanément baisser leur taux d'intérêt.
          </>
        ) : (
          <>
            By massively buying bonds, the Central Bank mechanically drives their price up (the law
            of <i>supply and demand</i>). And this rise in bond prices simultaneously lowers their
            interest rate.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Tu veux une illustration pour mieux comprendre ? OK c'est parti !"
          : "Want an illustration to better understand? OK let's go!"}
      </p>
      <p>
        {fr ? (
          <>
            T'es maintenant une banque centrale et tu vas réaliser une opération de QE. Observes les
            effets que cela provoque sur les obligations.
          </>
        ) : (
          <>
            You are now a central bank and you will carry out a QE operation. Observe the effects
            this has on bonds.
          </>
        )}
        <QESimulator />
      </p>
      <p>
        {fr
          ? "Le QE fait donc s'effondrer les taux d'intérêt à long terme. Et comme ce taux d'État (le prêt jugé le plus sûr) sert de référence, il met une pression à la baisse sur tous les autres types de prêts (immobiliers, entreprises, etc.)."
          : "QE thus causes long-term interest rates to collapse. And since this government rate (considered the safest loan) serves as a benchmark, it puts downward pressure on all other types of loans (real estate, business, etc.)."}
      </p>
      <p>
        {fr ? (
          <>
            Alors tu me répondras sans doute :{" "}
            <i>« OK, super... et alors ? C'est grave, Docteur ? »</i>, je te réponds tout de suite :
            « Oui, car ça casse le modèle de rémunération des banques commerciales ».
          </>
        ) : (
          <>
            You'll probably say: <i>"OK, great... so what? Is it serious, Doctor?"</i> - I'll answer
            right away: "Yes, because it breaks the compensation model of commercial banks."
          </>
        )}
      </p>
      <p>
        {fr
          ? "Souviens-toi, une banque commerciale se rémunère sur l'écart entre les taux à long terme (ce qu'elle prête) et les taux à court terme (ce qu'elle emprunte)."
          : "Remember, a commercial bank earns from the spread between long-term rates (what it lends) and short-term rates (what it borrows)."}
      </p>
      <p style={{ textAlign: "center" }}>
        {fr
          ? "Expérimentes ! Fais varier les taux à long terme sur le graphique ci-dessous afin de mieux saisir les conséquences de taux trop bas."
          : "Experiment! Adjust the long-term rates on the chart below to better grasp the consequences of rates that are too low."}
        <YieldCurveSimulator />
      </p>
      <p>
        {fr ? (
          <>
            Voilà ce qui se passe : avec des taux si bas, le financement de l'
            <i>Économie Productive</i> (créer de la valeur, lancer des projets en finançant les
            entrepreneurs, embaucher) n'est plus rentable pour les banques. Le risque est bien trop
            grand pour une marge si maigre.
          </>
        ) : (
          <>
            Here's what happens: with rates so low, financing the <i>Productive Economy</i>{" "}
            (creating value, launching projects by funding entrepreneurs, hiring) is no longer
            profitable for banks. The risk is far too great for such a poor margin.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Mais les banques doivent survivre ! Elles vont donc opérer un virage stratégique majeur.
            Elles vont délaisser la production pour se concentrer massivement sur le financement de
            l'<i>Économie Patrimoniale</i>.
          </>
        ) : (
          <>
            But banks must survive! They will therefore make a major strategic shift. They will
            abandon production to focus massively on financing the <i>Asset Economy</i>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Au lieu de prêter à ceux qui <i>font</i>, elles vont prêter à ceux qui <i>ont</i>. La
            suite, juste après !
          </>
        ) : (
          <>
            Instead of lending to those who <i>make</i>, they will lend to those who <i>have</i>.
            More on that right after!
          </>
        )}
      </p>
    </PageTemplate>
  );
};
