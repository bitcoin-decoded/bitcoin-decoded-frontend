import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
import highTimePreference from "../../../Design/img/high_time_preference.jpg";
import lowTimePreference from "../../../Design/img/low_time_preference.jpg";
import { useTranslation } from "../../../I18n";
import {
  CapitalStructureChain,
  getQuizDataRobinson,
  Illustration,
  Quiz,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PAGE_STYLES, PageTemplate, useToggleSimulator } from "../../Shared/";
export const MoneyLaws2Page: FC = () => {
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.economicCycles")}
      prelude={
        fr ? (
          <>
            Pourquoi les crises économiques reviennent-elles toujours, malgré toutes les leçons du
            passé ? La réponse n'est pas dans la psychologie des marchés. Elle est dans la monnaie
            qu'on utilise.
          </>
        ) : (
          <>
            Why do economic crises keep coming back, no matter how many lessons we draw from the
            past? The answer isn't market psychology. It's the money we use.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Au chapitre précédent, on a vu que la{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_1}>dureté</Reference> de notre monnaie a été
            sacrifiée. Le problème ? Le coût caché de ce sacrifice est immense.
          </>
        ) : (
          <>
            In the previous chapter, we saw that the{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_1}>hardness</Reference> of our currency has been
            sacrificed. The problem? The hidden cost of that sacrifice is massive.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Et pour bien le comprendre, posons-nous une question fondamentale :{" "}
            <i>« Comment la richesse est-elle créée ? »</i>.
          </>
        ) : (
          <>
            To really understand it, let's ask ourselves a fundamental question:{" "}
            <i>"How is wealth actually created?"</i>.
          </>
        )}
      </p>
      <Callout
        title={fr ? "Préférence temporelle et Taux d'intérêt" : "Time Preference and Interest Rate"}
      >
        <p>
          {fr ? (
            <>
              En tant qu'humains, on préfère consommer tout de suite plutôt que plus tard. Pour
              bâtir un futur plus confortable, il faut différer une partie de notre consommation :
              cette tension entre favoriser le présent ou le futur, c'est ce qu'on appelle la{" "}
              <Reference href="https://fr.wikipedia.org/wiki/Pr%C3%A9f%C3%A9rence_temporelle">
                Préférence Temporelle
              </Reference>
              .
            </>
          ) : (
            <>
              As humans, we'd rather consume now than later. But to build a more comfortable future,
              we have to postpone part of our consumption: this tension between favoring the present
              or the future is what we call{" "}
              <Reference href="https://en.wikipedia.org/wiki/Time_preference">
                Time Preference
              </Reference>
              .
            </>
          )}
        </p>
        <div style={PAGE_STYLES.illustrationsWrapper}>
          <Illustration
            src={highTimePreference}
            alt={fr ? "Préférence temporelle élevée" : "High time preference"}
            width="35%"
            caption={
              fr
                ? "Préférence temporelle élevée : le présent est privilégié. Donald et ses neveux consomment immédiatement la totalité de leurs ressources. Ils vivent correctement, mais leur situation n'évoluera pas demain."
                : "High time preference: the present wins. Donald and his nephews consume all their resources right away. They live decently, but their situation won't improve tomorrow."
            }
          />
          <Illustration
            src={lowTimePreference}
            alt={fr ? "Préférence temporelle faible" : "Low time preference"}
            width="35%"
            caption={
              fr
                ? "Préférence temporelle faible : le futur est privilégié. Donald et ses neveux mettent des stocks en réserve. Ce surplus (l'épargne) est ce qui leur permet de se lancer dans des projets ambitieux, comme l'extension de leur maison, pour un futur plus confortable."
                : "Low time preference: the future wins. Donald and his nephews set resources aside. That surplus (savings) is what lets them take on ambitious projects, like extending their house, for a more comfortable future."
            }
          />
        </div>
        <p>
          {fr ? (
            <>
              Sacrifier le présent pour le futur n'est pas naturel. Ce sacrifice nécessite donc une
              contrepartie. Reporter sa consommation à demain ou à dans dix ans n'a pas du tout la
              même incidence en termes de risque et d'attente. En économie, cette récompense
              s'appelle le <i> taux d'intérêt</i> : il est le prix du temps.
            </>
          ) : (
            <>
              Sacrificing the present for the future isn't natural. That sacrifice needs a reward in
              return. Postponing your consumption until tomorrow or until ten years from now carries
              very different levels of risk and waiting. In economics, this reward is called the{" "}
              <i>interest rate</i>: it's the price of time.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            L'épargne n'est donc pas un stock qu'on empile juste pour le plaisir des yeux ! Elle
            sert à l'investissement, c'est-à-dire à lancer des projets, parfois un peu longs, qui
            rendent la société plus efficace et qui nous libèrent du temps.
          </>
        ) : (
          <>
            So savings aren't a pile you stack up just for the view! They fuel investment - that is,
            projects (sometimes long ones) that make society more efficient and free up our time.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Ces investissements prennent la forme de <i>détours de production</i> qui s'inscrivent
            dans une <i>structure de capital</i>. <br />
            Non non, ne fuis pas, sous ces termes un peu barbares se cachent des concepts très
            concrets !
          </>
        ) : (
          <>
            These investments take the form of <i>roundabout production</i>, fitting into a{" "}
            <i>capital structure</i>. <br />
            Hold on, don't run away - behind these intimidating words hide very concrete ideas!
          </>
        )}
      </p>
      <Callout
        title={fr ? "La structure du capital, késako ?" : "Capital structure - what's that?"}
      >
        <p>
          {fr
            ? "Le capital n'est pas une simple pile de billets de banque. "
            : "Capital isn't just a pile of banknotes. "}
        </p>
        <p>
          {fr
            ? "C'est toute une succession d'étapes intermédiaires qui servent à produire un bien final, destiné au consommateur. C'est un procédé qui prend du temps et qui mobilise beaucoup de ressources."
            : "It's a whole sequence of intermediate steps that lead to producing a final good for the consumer. It's a process that takes time and mobilizes a lot of resources."}
        </p>
        <p>
          {fr ? (
            <>
              Prenons l'exemple du sandwich (clique sur les petites boîtes afin de remonter le fil
              de la production) :
              <CapitalStructureChain />
            </>
          ) : (
            <>
              Let's take the sandwich example (click on the small boxes to trace back the production
              chain):
              <CapitalStructureChain />
            </>
          )}
        </p>
        <p>
          {fr
            ? "Comme tu peux l'observer, la production d'un simple sandwich requiert des centaines d'étapes, ça ne se fait pas en cinq minutes."
            : "As you can see, producing a simple sandwich requires hundreds of steps. It doesn't happen in five minutes."}
        </p>
        <p>
          {fr ? (
            <>
              Ces étapes sont des{" "}
              <Reference href="https://fr.wikipedia.org/wiki/D%C3%A9tour_de_production">
                détours de production
              </Reference>{" "}
              : on fabrique d'abord les outils qui nous permettront ensuite d'être bien plus
              efficaces. L'ensemble de ces outils et de ces étapes forment une structure complexe,
              le capital.
            </>
          ) : (
            <>
              These steps are{" "}
              <Reference href="https://en.wikipedia.org/wiki/Roundaboutness">
                roundabout production
              </Reference>
              : you first build the tools that will then make you far more efficient. All these
              tools and steps together form a complex structure - capital.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr
          ? "Si le Capital est une structure d'étapes qui prend du temps (comme notre sandwich), comment savoir si nous avons les moyens de lancer un nouveau chantier ? C'est là qu'intervient le taux d'intérêt."
          : "If Capital is a time-consuming structure of steps (like our sandwich), how do we know whether we can afford to launch a new project? That's where the interest rate comes in."}
      </p>
      <p>
        {fr ? (
          <>
            Dans un monde sans manipulation monétaire, ce taux agit comme une boussole naturelle.
            Voilà comment ça marche.
          </>
        ) : (
          <>
            In a world without monetary manipulation, this rate acts as a natural compass. Here's
            how it works.
          </>
        )}
      </p>
      <Callout title={fr ? "La boussole honnête" : "The honest compass"}>
        <ol>
          <li>
            {fr
              ? "Les citoyens épargnent : ils ne consomment pas tout, tout de suite (préférence temporelle faible). L'argent disponible est abondant, donc le prix pour l'emprunter (le taux d'intérêt) baisse naturellement."
              : "Citizens save: they don't spend everything right away (low time preference). Money is plentiful, so the price of borrowing it (the interest rate) drops on its own."}
          </li>
          <li style={{ marginTop: "1rem" }}>
            {fr ? (
              <span>
                Ce taux bas envoie un message à ceux qui veulent entreprendre :{" "}
                <i>
                  « La société a mis assez de ressources de côté, lancez vos projets longs et
                  complexes »
                </i>
                . Et c'est vrai : l'épargne existe pour de bon.
              </span>
            ) : (
              <span>
                That low rate sends a message to anyone looking to build:{" "}
                <i>
                  "Society has set aside enough resources - go launch your long, complex projects."
                </i>{" "}
                And it's telling the truth: the savings are really there.
              </span>
            )}
          </li>
          <li style={{ marginTop: "1rem" }}>
            {fr
              ? "Résultat : on bâtit des machines, des usines, des outils qui rendent la société plus productive. Les prix chutent parce qu'on produit plus avec moins d'effort. Le pouvoir d'achat de tout le monde grimpe. Ça, c'est la prospérité réelle."
              : "The payoff: we build machines, factories, tools that make society more productive. Prices fall because we produce more with less effort. Everyone's purchasing power climbs. That's what real prosperity looks like."}
          </li>
        </ol>
      </Callout>

      <p>{fr ? "Maintenant, le même film, mais truqué." : "Now, the same movie - rigged."}</p>
      <Callout title={fr ? "La boussole truquée" : "The rigged compass"}>
        <ol>
          <li>
            {fr ? (
              <span>
                Cette fois, personne n'a épargné. Mais les banques (commerciales via la création
                monétaire, centrales via leurs politiques) maintiennent quand même les taux au
                plancher. L'acier, les briques, le temps : rien de tout ça n'attend en réserve.
              </span>
            ) : (
              <span>
                This time, nobody saved. But the banks (commercial ones through money creation,
                central ones through their policies) pin rates to the floor anyway. Steel, bricks,
                time - none of it is sitting in reserve.
              </span>
            )}
          </li>
          <li style={{ marginTop: "1rem" }}>
            {fr ? (
              <span>
                Le taux bas envoie pourtant le même message qu'avant : <i>« Lancez vos projets »</i>
                . Sauf qu'il ment. La boussole dit « plein de ressources », la réalité dit « les
                caisses sont vides ».
              </span>
            ) : (
              <span>
                Yet the low rate sends the very same message as before:{" "}
                <i>"Go launch your projects."</i> Except it's lying. The compass says "plenty of
                resources," reality says "the vaults are empty."
              </span>
            )}
          </li>
          <li style={{ marginTop: "1rem" }}>
            {fr ? (
              <span>
                Trompés, les entrepreneurs se ruent sur des chantiers que rien ne soutient :
                aéroports déserts, tours vides, startups qui brûlent du cash sans rien produire.
                C'est le <Reference href="</Reference>">malinvestissement</Reference>. Et l'écart se
                creuse entre ce qu'on fabrique vraiment et les chiffres qui s'envolent sur les
                écrans.
              </span>
            ) : (
              <span>
                Fooled, entrepreneurs pile into projects that nothing supports: deserted airports,
                empty towers, startups burning cash without producing a thing. This is{" "}
                <Reference href="https://en.wikipedia.org/wiki/Malinvestment">
                  malinvestment
                </Reference>
                . And the gap widens between what we actually make and the numbers shooting up on
                screens.
              </span>
            )}
          </li>
        </ol>
      </Callout>
      <p>
        {fr ? (
          <>
            La réalité physique finit toujours par rattraper le mensonge monétaire. À un moment, on
            s'aperçoit que les ressources manquent pour terminer tous les chantiers. La bulle
            explose : les prix des matériaux s'envolent, les banques paniquent et arrêtent de
            prêter.{" "}
          </>
        ) : (
          <>
            Physical reality always catches up with the monetary lie. At some point, we realize that
            resources are missing to finish all the projects. The bubble bursts: material prices
            skyrocket, banks panic and stop lending.{" "}
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Et vient ensuite la purge : ce qu'on appelle « crise » est en réalité un processus de{" "}
            <i>liquidation des erreurs</i>. C'est le moment où l'économie liquide les mauvais
            projets pour essayer de sauver ce qui peut l'être. La récession est une période de «
            ceinture serrée » obligatoire pour reconstituer l'épargne qu'on a fait semblant d'avoir
            pendant le boom.
          </>
        ) : (
          <>
            Then comes the purge: what we call a "crisis" is really a process of{" "}
            <i>liquidating past errors</i>. It's the moment when the economy clears out the bad
            projects to try to salvage what can be saved. The recession is a mandatory
            belt-tightening period to rebuild the savings we pretended to have during the boom.
          </>
        )}
      </p>
      <Callout
        title={fr ? "Le test final de Robinson Crusoé 🏝️" : "Robinson Crusoe's final test 🏝️"}
      >
        <p>
          {fr
            ? "Pour vérifier si t'as bien saisi toutes les notions précédentes, qui sont un peu chargées je le reconnais volontiers, faisons un petit test avec notre ami Robinson Crusoé, seul sur son île."
            : "To check whether you've really grasped the previous concepts (which are a bit dense, I'll admit), let's run a little test with our friend Robinson Crusoe, alone on his island."}
        </p>
        <p>
          {fr ? (
            <>
              Robinson pêche à la main huit heures par jour. Cela lui permet de ramener quatre
              poissons : c'est exactement ce qu'il consomme chaque jour pour être rassasié. Sa
              situation est stable, mais sa vie est un peu limitée. Il a alors une idée brillante :
              construire un filet de pêche pour n'avoir plus qu'à travailler quatre heures par jour.
            </>
          ) : (
            <>
              Robinson fishes by hand eight hours a day. That gets him four fish - exactly what he
              eats every day to feel full. His situation is stable, but his life is a bit limited.
              Then he gets a brilliant idea: build a fishing net so he only has to work four hours a
              day.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Cependant, fabriquer ce filet prendra des jours entiers. Robinson sait que s'il arrête
              de pêcher pour tresser son filet, il n'aura rien à manger.
            </>
          ) : (
            <>
              However, making this net will take whole days. Robinson knows that if he stops fishing
              to weave his net, he'll have nothing to eat.
            </>
          )}
        </p>
        <Quiz {...getQuizDataRobinson(language)} onCorrectAnswer={onQuizSolved} />
        {isQuizSolved && (
          <>
            <p>
              {fr
                ? "Robinson nous apprend ici deux choses fondamentales."
                : "Robinson teaches us two fundamental things here."}
            </p>
            <ol>
              <li>
                {fr ? (
                  <>
                    L'épargne précède toujours l'investissement réel. On ne peut pas construire un
                    filet (le bien de capital) sans avoir mis de côté les poissons (l'épargne)
                    nécessaires pour nourrir le travailleur pendant la construction. Les keynésiens
                    contestent ce principe, mais Robinson n'a pas de banque centrale !
                  </>
                ) : (
                  <>
                    Savings always precede real investment. You can't build a net (the capital good)
                    without first setting aside the fish (the savings) needed to feed the worker
                    during construction. Keynesians dispute this principle - but Robinson doesn't
                    have a central bank!
                  </>
                )}
              </li>
              <li style={{ marginTop: "1rem" }}>
                {fr ? (
                  <>
                    La réalité est implacable. On ne peut pas créer du temps ou de la nourriture à
                    partir de rien.
                  </>
                ) : (
                  <>Reality is unforgiving. You can't create time or food out of thin air.</>
                )}
              </li>
            </ol>
          </>
        )}
      </Callout>
      <p>
        {fr ? (
          <>
            La cause des cycles économiques n'est pas extérieure. Ce ne sont pas des problèmes de «
            psychologie » des investisseurs. Au contraire, c'est un phénomène endogène, causé par la
            structure du système lui-même.{" "}
          </>
        ) : (
          <>
            The cause of economic cycles isn't external. They aren't problems of investor
            "psychology." On the contrary - they're an endogenous phenomenon, caused by the
            structure of the system itself.{" "}
          </>
        )}
      </p>
      <p>
        {fr
          ? "Parce que notre monnaie n'est pas « dure », on laisse les banques saboter notre boussole (le taux d'intérêt). On force l'économie à vivre dans un mensonge permanent qui se termine inévitablement par un krach."
          : 'Because our money isn\'t "hard," we let banks sabotage our compass (the interest rate). We force the economy to live in a permanent lie that inevitably ends in a crash.'}
      </p>
      <p>
        {fr
          ? "Mais si le problème était encore plus profond ? Si le simple fait de vouloir « piloter » l'économie depuis un bureau central se heurtait à un mur informationnel infranchissable ? Avant de découvrir notre nouvel instrument de navigation, regardons pourquoi même le plus brillant des cartographes ne pourra jamais remplacer la vérité du marché."
          : 'But what if the problem runs even deeper? What if the very act of trying to "steer" the economy from a central office hit an insurmountable wall of information? Before discovering our new navigation instrument, let\'s look at why even the most brilliant cartographer can never replace the truth of the market.'}
      </p>
      <p>
        {fr ? (
          <>
            Alors, prêt à comprendre pourquoi les{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_3}>systèmes planifiés</Reference> sont condamnés à
            l'aveuglement ?
          </>
        ) : (
          <>
            Ready to understand why{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_3}>planned systems</Reference> are doomed to
            blindness?
          </>
        )}
      </p>
    </PageTemplate>
  );
};
