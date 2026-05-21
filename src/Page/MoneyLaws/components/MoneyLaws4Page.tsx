import { type FC } from "react";

import { Callout, Quote, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  DebateArena,
  getKeynesianVsAustrian,
  getQuizDataAustrianAxiom,
  Quiz,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

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
            En 2008, les banques centrales ont injecté des milliers de milliards. Beaucoup
            craignaient une explosion des prix à la consommation. Elle n'a pas eu lieu. Donc
            imprimer de la monnaie ne crée pas d'inflation ? Mauvaise réponse. Mauvaise méthode,
            surtout.
          </>
        ) : (
          <>
            In 2008, central banks injected trillions. Many feared consumer prices would explode.
            They didn't. So printing money doesn't cause inflation? Wrong answer. Wrong method,
            mostly.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Au chapitre précédent, t'as vu que la{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_3}>doctrine socialiste</Reference> s'effondre par
            manque d'information. Mais alors, comment les économistes font-ils pour traiter cette
            information ? C'est là que les chemins se séparent.
          </>
        ) : (
          <>
            In the previous chapter, you saw how the{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_3}>socialist doctrine</Reference> collapses from a
            lack of information. But then, how do economists actually process that information? This
            is where the paths split.
          </>
        )}
      </p>
      <Callout title={fr ? "Le Physicien contre le Logicien" : "The Physicist versus the Logician"}>
        <p>
          {fr
            ? "Il existe deux manières radicalement opposées d'aborder l'économie :"
            : "There are two radically opposed ways to approach economics:"}
        </p>
        <ul>
          <li>
            {fr ? (
              <span>
                L'école keynésienne (<i>la méthode du physicien</i>) : on observe des chiffres
                (genre le PIB, le chômage, ...), on fait une hypothèse et on regarde si les données
                du passé confirment la théorie. C'est ce qu'on appelle l'empirisme (ou le
                positivisme dans sa version méthodologique) .
              </span>
            ) : (
              <span>
                The Keynesian school (<i>the physicist's method</i>): you watch the numbers (GDP,
                unemployment, that kind of thing), you form a hypothesis, and you check whether past
                data backs it up. This is called empiricism (or positivism, in its methodological
                flavor).
              </span>
            )}
          </li>
          <li>
            {fr ? (
              <span>
                L'école autrichienne (<i>la méthode du logicien</i>) : là, on ne part pas de
                l'observation, mais d'un point de départ qu'on tient pour indiscutable, puis on en
                déduit tout le reste par la logique, exactement comme en géométrie. C'est la méthode
                axiomatique-déductive.
              </span>
            ) : (
              <span>
                The Austrian school (<i>the logician's method</i>): here, you don't start from
                observation but from a premise you treat as indisputable, and you deduce everything
                else through logic, exactly like in geometry. This is the axiomatic-deductive
                method.
              </span>
            )}
          </li>
        </ul>
      </Callout>
      <p>
        {fr ? (
          <>
            <Reference href="https://fr.wikipedia.org/wiki/Friedrich_Hayek">
              Friedrich Hayek
            </Reference>
            , économiste de l'école de pensée autrichienne, a dénoncé ce qu'il nommait le{" "}
            scientisme, c'est-à-dire la volonté d'appliquer les méthodes des sciences dures (par
            exemple, physique ou chimie) à l'action humaine.
          </>
        ) : (
          <>
            <Reference href="https://en.wikipedia.org/wiki/Friedrich_Hayek">
              Friedrich Hayek
            </Reference>
            , an economist of the Austrian school, called out what he named scientism: the urge to
            apply hard-science methods (physics, chemistry, that sort of thing) to human action.
          </>
        )}
      </p>
      <Quote author="Friedrich Hayek">
        {fr
          ? "Le scientisme est l'imitation servile de la méthode et du langage de la Science par ceux qui étudient les problèmes de la société, alors que ces méthodes ne s'appliquent pas à leur objet."
          : "Scientism is the slavish imitation of the method and language of Science by those who study the problems of society, even though these methods do not apply to their subject."}
      </Quote>
      <p>
        {fr
          ? "Mais pourquoi un tel rejet ? Pour les autrichiens, ces méthodes sont mal adaptées à ce qu'elles étudient :"
          : "But why such a pushback? For Austrians, these methods are poorly suited to what they're meant to study:"}
      </p>
      <ul>
        <li>
          {fr ? (
            <span>
              La société n'est pas un laboratoire. On ne peut pas isoler une variable. Par exemple,
              si les impôts baissent et que la croissance se met à monter, est-ce à cause des impôts
              ou d'une nouvelle technologie apparue au même moment ? Impossible de trancher
              clairement.
            </span>
          ) : (
            <span>
              Society isn't a lab. You can't isolate a single variable. For example, if taxes drop
              and growth picks up, is it because of the tax cut, or because of some new technology
              that showed up at the same time? Impossible to settle cleanly.
            </span>
          )}
        </li>
        <li>
          {fr ? (
            <span>
              L'humain apprend. Contrairement à une planète, l'humain change son comportement s'il
              connaît une théorie. Les données du passé n'enferment pas le futur dans un modèle
              stable et immuable.
            </span>
          ) : (
            <span>
              Humans learn. Unlike a planet, a human changes their behavior the moment they know
              about a theory. Past data doesn't lock the future into a stable, unchanging model.
            </span>
          )}
        </li>
      </ul>
      <p>
        {fr ? (
          <>
            Toute la pensée autrichienne repose sur une seule brique, une vérité de base. C'est ce
            qu'on appelle l'axiome praxéologique (de la{" "}
            <Reference href="https://fr.wikipedia.org/wiki/Prax%C3%A9ologie">praxéologie</Reference>
            , la science de l'action humaine).
          </>
        ) : (
          <>
            All of Austrian thought rests on a single building block, a foundational truth. It's
            called the praxeological axiom (from{" "}
            <Reference href="https://en.wikipedia.org/wiki/Praxeology">praxeology</Reference>, the
            science of human action).
          </>
        )}
      </p>
      <Quote>{fr ? "L'être humain agit dans un but." : "Human beings act with a purpose."}</Quote>
      <p>
        {fr
          ? "Vous pensez que ça a l'air bête ? C'est pourtant une arme de réflexion massive, croyez-moi !"
          : "Sounds dumb? Trust me, it's a massive thinking weapon."}
      </p>
      <Quiz {...getQuizDataAustrianAxiom(language)} onCorrectAnswer={onQuizSolved} />
      {isQuizSolved && (
        <>
          <p>
            {fr ? (
              <>
                De cet axiome découle tout le reste : puisque nous agissons pour atteindre un but,
                cela signifie que nos ressources sont rares (le temps notamment), que nous faisons
                des choix, et que nous avons une préférence temporelle (à valeur égale, on préfère
                tout de suite plutôt que plus tard).
              </>
            ) : (
              <>
                Everything else follows from this axiom: since we act to reach a goal, it means our
                resources are scarce (time, above all), that we make choices, and that we have a
                time preference (all else equal, we'd rather have it now than later).
              </>
            )}
          </p>
        </>
      )}
      <p>
        {fr
          ? "C'est ici que l'on comprend pourquoi les débats économiques sont souvent stériles : les deux camps ne parlent tout simplement pas la même langue. Ils n'utilisent pas les mêmes jumelles."
          : "This is where you start to see why economic debates are so often pointless: the two sides simply don't speak the same language. They're not even looking through the same binoculars."}
      </p>
      <p>
        {fr
          ? "Clique sur chaque école pour comparer leurs raisonnements face à une même question :"
          : "Click on each school to compare how they reason on the same question:"}
      </p>
      <DebateArena items={getKeynesianVsAustrian(language)} />
      <p>
        {fr ? (
          <>
            L'école autrichienne ne cherche pas à prédire des choses du style « le PIB montera de
            1.2 % ». Elle établit des lois qualitatives et universelles.
            <br />
            Par exemple : « la manipulation artificielle des taux d'intérêt provoque
            systématiquement une mauvaise allocation du capital ». Pour un autrichien, ce n'est pas
            une opinion à débattre : c'est une conséquence logique du raisonnement. On ne le prouve
            pas avec des données, on le déduit.
          </>
        ) : (
          <>
            The Austrian school isn't trying to predict things like "GDP will rise by 1.2%". It lays
            out qualitative, universal laws.
            <br />
            For instance: "the artificial manipulation of interest rates systematically leads to a
            misallocation of capital". For an Austrian, this isn't an opinion up for debate, it's a
            logical consequence of the reasoning. You don't prove it with data, you deduce it.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            On boucle la boucle ici. Les conclusions des chapitres précédents ne sortent pas d'une
            préférence politique. Ce sont des conséquences logiques tirées de la nature même de
            l'être humain. Libre à toi d'en tirer, ensuite, les conclusions politiques que tu veux.
          </>
        ) : (
          <>
            Full circle here. The conclusions from the previous chapters don't spring from some
            political preference. They're logical consequences drawn from the very nature of the
            human being. What political conclusions you then draw from them, that's entirely up to
            you.
          </>
        )}
      </p>
      <p>
        {" "}
        {fr
          ? "On se fait un quiz pour tester les acquis du module ?"
          : "How about a quiz to test what stuck from this module?"}{" "}
        <Reference to={ROUTE_NAME.MoneyLaws_5}>
          {fr ? "C'est par ici." : "Right this way."}
        </Reference>
        .
      </p>
    </PageTemplate>
  );
};
