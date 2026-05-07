import { type FC } from "react";

import { Callout, Emphasis, Quote } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  DebateArena,
  getKeynesianVsAustrian,
  getQuizDataAustrianAxiom,
  Quiz,
} from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";
import { useToggleSimulator } from "../../Shared/hooks";

export const MoneyLaws4Page: FC = () => {
  const { t, language } = useTranslation();
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.austrianMethod")}
      prelude={
        fr ? (
          <>
            L'école de pensée économique autrichienne se distingue par son approche méthodologique
            fondée, non pas sur le positivisme, mais sur la logique pure.
          </>
        ) : (
          <>
            The Austrian school of economic thought stands out through its methodological approach,
            grounded not in positivism but in pure logic.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Au chapitre précédent, vous avez vu que la doctrine socialiste s'effondre par manque d'information. Mais alors, comment les économistes font-ils pour étudier cette information ? C'est là que les chemins se séparent."
          : "In the previous chapter, you saw that the socialist doctrine collapses due to a lack of information. But then, how do economists study this information? This is where paths diverge."}
      </p>
      <Callout title={fr ? "Le Physicien contre le Logicien" : "The Physicist versus the Logician"}>
        <p>
          {fr ? (
            <>
              Il existe deux manières radicalement opposées d'aborder l'économie :
              <ul>
                <li>
                  L'école keynésienne (<i>la méthode du physicien</i>) : on observe des chiffres (le
                  PIB, le chômage), on fait une hypothèse, et on regarde si les données du passé
                  confirment la théorie.{" "}
                  <Emphasis>
                    C'est ce qu'on appelle l'empirisme (ou positivisme dans sa version
                    méthodologique)
                  </Emphasis>
                  .
                </li>
                <li>
                  L'école autrichienne (<i>la méthode du logicien</i>) : on ne part pas de
                  l'observation, mais d'une vérité indiscutable, puis on en déduit tout le reste par
                  la logique, comme en géométrie.{" "}
                  <Emphasis>C'est la méthode axiomatique-déductive</Emphasis>.
                </li>
              </ul>
            </>
          ) : (
            <>
              There are two radically opposed ways of approaching economics:
              <ul>
                <li>
                  The Keynesian school (<i>the physicist's method</i>): you observe numbers (GDP,
                  unemployment), formulate a hypothesis, and then check whether past data confirms
                  the theory.{" "}
                  <Emphasis>
                    This is what is called empiricism (or positivism in its methodological form)
                  </Emphasis>
                  .
                </li>
                <li>
                  The Austrian school (<i>the logician's method</i>): you do not start from
                  observation, but from an indisputable truth, then deduce everything else through
                  logic, as in geometry. <Emphasis>This is the axiomatic-deductive method</Emphasis>
                  .
                </li>
              </ul>
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Friedrich Hayek, économiste de l'école de pensée autrichienne, a dénoncé ce qu'il
            appelait le <Emphasis>scientisme</Emphasis>, c'est-à-dire la volonté d'appliquer les
            méthodes des sciences dures (physique, chimie) à l'action humaine.
          </>
        ) : (
          <>
            Friedrich Hayek, economist of the Austrian school, denounced what he called{" "}
            <Emphasis>scientism</Emphasis> — the desire to apply hard science methods (physics,
            chemistry) to human action.
          </>
        )}
      </p>
      <Quote author="Friedrich Hayek">
        {fr
          ? "Le scientisme est l'imitation servile de la méthode et du langage de la Science par ceux qui étudient les problèmes de la société, alors que ces méthodes ne s'appliquent pas à leur objet."
          : "Scientism is the slavish imitation of the method and language of Science by those who study the problems of society, even though these methods do not apply to their subject."}
      </Quote>
      <p>
        {fr ? (
          <>
            Mais pourquoi une telle critique ? Tout simplement parce que ces méthodes sont
            inadaptées :
            <ul>
              <li>
                <Emphasis>La société n'est pas un laboratoire</Emphasis>. On ne peut pas isoler une
                variable. Par exemple, si les impôts baissent et que la croissance se met à monter,
                est-ce à cause des impôts ou d'une nouvelle technologie apparue au même moment ? On
                ne peut pas le savoir.
              </li>
              <li>
                <Emphasis>L'humain apprend</Emphasis>. Contrairement à une planète, l'humain change
                son comportement s'il connaît une théorie. Les données du passé ne prédisent donc
                jamais le futur.
              </li>
            </ul>
          </>
        ) : (
          <>
            But why such criticism? Simply because these methods are unsuited:
            <ul>
              <li>
                <Emphasis>Society is not a laboratory</Emphasis>. You cannot isolate a variable. For
                instance, if taxes go down and growth picks up, is it because of the tax cut or a
                new technology that appeared at the same time? There is no way to tell.
              </li>
              <li>
                <Emphasis>Humans learn</Emphasis>. Unlike a planet, humans change their behavior if
                they know about a theory. Past data therefore never predicts the future.
              </li>
            </ul>
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Toute la pensée autrichienne repose sur une seule brique, une vérité de base. C'est ce
            qu'on appelle l'<Emphasis>axiome praxéologique</Emphasis> (de la praxéologie, la science
            de l'action humaine).
          </>
        ) : (
          <>
            All Austrian thought rests on a single building block, a fundamental truth. This is what
            is called the <Emphasis>praxeological axiom</Emphasis> (from praxeology, the science of
            human action).
          </>
        )}
      </p>
      <Quote>{fr ? "L'être humain agit dans un but." : "Human beings act purposefully."}</Quote>
      <p>
        {fr
          ? "Ça a l'air bête ? C'est pourtant une arme de réflexion massive !"
          : "Sounds trivial? Yet it is a tremendously powerful thinking tool!"}
      </p>
      <Quiz {...getQuizDataAustrianAxiom(language)} onCorrectAnswer={onQuizSolved} />
      {isQuizSolved && (
        <>
          <p>
            {fr ? (
              <>
                De cet axiome découle tout le reste : puisque nous agissons pour atteindre un but,
                cela signifie que nos ressources sont rares (le temps notamment), que nous faisons
                des choix, et que nous avons une préférence temporelle (le présent vaut plus que le
                futur).
              </>
            ) : (
              <>
                Everything else follows from this axiom: since we act to achieve goals, it means our
                resources are scarce (especially time), that we make choices, and that we have a
                time preference (the present is valued more than the future).
              </>
            )}
          </p>
        </>
      )}
      <p>
        {fr
          ? "C'est ici que l'on comprend pourquoi les débats économiques sont souvent stériles : les deux camps ne parlent tout simplement pas la même langue."
          : "This is where we understand why economic debates are often fruitless: the two sides simply do not speak the same language."}
      </p>
      <p>
        {fr
          ? "Cliquez sur chaque école pour comparer leurs raisonnements face à une même question :"
          : "Click on each school to compare their reasoning on the same question:"}
      </p>
      <DebateArena items={getKeynesianVsAustrian(language)} />
      <p>
        {fr ? (
          <>
            L'école autrichienne ne cherche pas à prédire que « le PIB montera de 1.2 % ».{" "}
            <Emphasis>Elle établit des lois qualitatives et universelles</Emphasis>.<br />
            Par exemple : « la manipulation artificielle des taux d'intérêt provoque
            systématiquement une mauvaise allocation du capital » est aussi certain que « 2 + 2 font
            4 ».
          </>
        ) : (
          <>
            The Austrian school does not try to predict that "GDP will rise by 1.2%."{" "}
            <Emphasis>It establishes qualitative and universal laws</Emphasis>.<br />
            For example: “the artificial manipulation of interest rates systematically leads to a
            misallocation of capital” is considered just as certain as “2 + 2 equals 4.”"
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            On boucle la boucle ici.{" "}
            <Emphasis>
              Les conclusions des chapitres précédents ne sont pas des opinions politiques. Ce sont
              des conséquences logiques de la nature même de l'être humain.
            </Emphasis>
          </>
        ) : (
          <>
            We come full circle here.{" "}
            <Emphasis>
              The conclusions from the previous chapters are not political opinions. They are
              logical consequences of human nature itself.
            </Emphasis>
          </>
        )}
      </p>
    </PageTemplate>
  );
};
