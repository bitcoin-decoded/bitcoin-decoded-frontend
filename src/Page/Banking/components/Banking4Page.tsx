import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/";

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
            immobilier ou d'un placement ? Ce n'est pas (forcément) ton dossier. C'est son moteur
            qui tourne au ralenti. Et la Banque Centrale y est pour beaucoup.
          </>
        ) : (
          <>
            Ever wondered why your banker gives you a funny look when you mention financing a real
            project, but rolls out the red carpet the moment it's a mortgage or an investment
            product? It's not (necessarily) you. It's their engine running on fumes. And the Central
            Bank has a lot to do with it.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Jusqu'ici, la Banque Centrale a volé au secours des banques commerciales en inondant le
            système de liquidités. Le problème c'est qu'en faisant ça, elle a enrayé le moteur.
          </>
        ) : (
          <>
            Up to now, the Central Bank has come to the rescue of commercial banks by flooding the
            system with liquidity. The problem is that, in doing so, it jammed the engine.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Pour comprendre pourquoi, il faut d'abord savoir comment une banque gagne de l'argent."
          : "To understand why, you first need to know how a bank actually makes money."}
      </p>
      <Callout
        title={fr ? "Comment une banque gagne-t-elle de l'argent ?" : "How does a bank make money?"}
      >
        <p>{fr ? "C'est très simple :" : "It's quite simple:"}</p>
        <ol>
          <li>
            {fr ? (
              <>
                Elle <i>emprunte</i> de l'argent à court terme, à un taux généralement très bas
                (pratiquement à 0%)
              </>
            ) : (
              <>
                It <i>borrows</i> money short-term, at a rate that's usually very low (close to 0%)
              </>
            )}
          </li>

          <li>
            {fr ? (
              <>
                Elle <i>prête</i> ensuite à long terme, à un taux généralement bien plus élevé.
              </>
            ) : (
              <>
                It then <i>lends</i> long-term, at a rate that's usually much higher.
              </>
            )}
          </li>
        </ol>
        <p>
          {fr ? (
            <>
              Son profit principal, c'est l'
              <Reference href="https://nerd.wwnorton.com/ebooks/epub/prineco4/EPUB/content/30.2.0-chapter30.xhtml#:~:text=Banks%20charge%20more%20interest%20for,Louis.">
                écart entre le taux long et le taux court
              </Reference>
            </>
          ) : (
            <>
              Its main profit is the{" "}
              <Reference href="https://nerd.wwnorton.com/ebooks/epub/prineco4/EPUB/content/30.2.0-chapter30.xhtml#:~:text=Banks%20charge%20more%20interest%20for,Louis.">
                gap between the long rate and the short rate
              </Reference>
            </>
          )}
          .
        </p>
        <p>
          {fr ? (
            <>
              Souviens-toi de <i>Nicolas</i> : sa banque a créé les 200 000 € en un clic. Mais
              prêter n'est jamais gratuit - il faut que Nicolas soit solvable, et la banque doit
              elle-même emprunter à court terme pour tourner, à un taux très bas voire quasi nul.
              Son profit, c'est l'écart entre les 3% que paie Nicolas et ce taux-là.
            </>
          ) : (
            <>
              Remember <i>Nicolas</i>: his bank created the €200,000 in a single click. But lending
              is never free - Nicolas has to be creditworthy, and the bank itself has to borrow
              short-term to keep running, at a very low, near-zero rate. Its profit is the gap
              between the 3% Nicolas pays and that rate.
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
            By buying bonds on a massive scale, the Central Bank mechanically pushes their price up
            (the law of <i>supply and demand</i>). And as bond prices rise, their interest rate
            falls at the same time.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Tu veux une illustration pour mieux comprendre ? OK c'est parti !"
          : "Want a hands-on example to make this click? OK, let's go!"}
      </p>
      <p>
        {fr ? (
          <>
            T'es maintenant une banque centrale et tu vas réaliser une opération d'assouplissement
            quantitatif. Observe les effets que cela provoque sur les obligations.
          </>
        ) : (
          <>
            You're now a central bank, and you're about to run a quantitative easing operation.
            Watch what it does to bonds.
          </>
        )}
        <QESimulator />
      </p>
      <p>
        {fr
          ? "Et comme ce taux d'État (le prêt jugé le plus sûr) sert de référence, il met une pression à la baisse sur tous les autres types de prêts (immobiliers, entreprises, etc.)."
          : "And since the government rate (the loan considered the safest) serves as the benchmark, it drags down pretty much every other type of loan with it (mortgages, business loans, and so on)."}
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
            At which point you'll probably go: <i>"OK, great... so what? Is it serious, Doctor?"</i>{" "}
            and I'll tell you straight away: "Yes, because it breaks how commercial banks make their
            money."
          </>
        )}
      </p>
      <p>
        {fr
          ? "Souviens-toi, une banque commerciale se rémunère sur l'écart entre les taux à long terme (ce qu'elle prête) et les taux à court terme (ce qu'elle emprunte)."
          : "Remember: a commercial bank earns its keep on the gap between long-term rates (what it lends at) and short-term rates (what it borrows at)."}
      </p>
      <p style={{ textAlign: "center" }}>
        {fr
          ? "Expérimente ! Fais varier les taux à long terme sur le graphique ci-dessous afin de mieux saisir les conséquences de taux trop bas."
          : "Try it yourself! Move the long-term rate on the chart below to feel just how much damage rates that are too low can do."}
        <YieldCurveSimulator />
      </p>
      <p>
        {fr ? (
          <>
            Voilà ce qui se passe : avec des taux si bas, le financement de l'
            <i>Économie Productive</i> (créer de la valeur, lancer des projets en finançant les
            entrepreneurs, embaucher) devient nettement moins rentable pour les banques. Trop de
            risque pour une marge ridicule.
          </>
        ) : (
          <>
            Here's what happens: with rates this low, financing the <i>Productive Economy</i>{" "}
            (creating value, launching projects by funding entrepreneurs, hiring) becomes far less
            profitable for banks. Too much risk for such a thin margin.
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
            But banks have to survive! So they pull off a major strategic turn. They walk away from
            production and pour their efforts into financing the <i>Asset Economy</i> instead.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Au lieu de prêter à ceux qui <i>font</i>, elles vont prêter{" "}
            <Reference to={ROUTE_NAME.Banking_5}>
              à ceux qui <i>ont</i>
            </Reference>
            . La suite, c'est maintenant !
          </>
        ) : (
          <>
            Instead of lending to those who <i>build</i>, they'll lend{" "}
            <Reference to={ROUTE_NAME.Banking_5}>
              to those who <i>already own</i>
            </Reference>
            . And that's exactly what's coming up next!
          </>
        )}
      </p>
    </PageTemplate>
  );
};
