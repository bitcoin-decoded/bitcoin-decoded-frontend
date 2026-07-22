import { type FC } from "react";

import { Callout, Reference } from "../../../Design";
import highTimePreference from "../../../Design/img/high_time_preference.webp";
import lowTimePreference from "../../../Design/img/low_time_preference.webp";
import { useTranslation } from "../../../I18n";
import { CapitalStructureChain, Illustration } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PAGE_STYLES, PageTemplate } from "../../Shared/";

export const MoneyLaws2Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.priceOfTime")}>
      <BlockReader chapterId={ROUTE_NAME.MoneyLaws_2}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                La prospérité ne vient pas de ce qu'on dépense. Elle vient de ce qu'on choisit de ne
                pas consommer tout de suite. Tu trouves ça contre-intuitif ? C'est pourtant le
                moteur réel de l'économie ! Et il tourne sur un seul signal : le taux d'intérêt.
                Regardons comment il dit la vérité, avant d'apprendre à le faire mentir.
              </>
            ) : (
              <>
                Prosperity doesn't come from what you spend. It comes from what you choose not to
                consume right now. Sounds backwards? And yet it's the real engine of the economy! It
                runs on a single signal: the interest rate. Let's see how it tells the truth, before
                we learn to make it lie.
              </>
            )}
          </ChapterPrelude>
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
        </Block>

        <Block>
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
            title={
              fr ? "Préférence temporelle et Taux d'intérêt" : "Time Preference and Interest Rate"
            }
          >
            <p>
              {fr ? (
                <>
                  En tant qu'humains, on préfère consommer tout de suite plutôt que plus tard. Pour
                  bâtir un futur plus confortable, il faut différer une partie de notre consommation
                  : cette tension entre favoriser le présent ou le futur, c'est ce qu'on appelle la{" "}
                  <Reference href="https://fr.wikipedia.org/wiki/Pr%C3%A9f%C3%A9rence_temporelle">
                    Préférence Temporelle
                  </Reference>
                  .
                </>
              ) : (
                <>
                  As humans, we'd rather consume now than later. But to build a more comfortable
                  future, we have to postpone part of our consumption: this tension between favoring
                  the present or the future is what we call{" "}
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
                  Sacrifier le présent pour le futur n'est pas naturel. Ce sacrifice nécessite donc
                  une contrepartie. Reporter sa consommation à demain ou à dans dix ans n'a pas du
                  tout la même incidence en termes de risque et d'attente. En économie, cette
                  récompense s'appelle le <i> taux d'intérêt</i> : il est le prix du temps.
                </>
              ) : (
                <>
                  Sacrificing the present for the future isn't natural. That sacrifice needs a
                  reward in return. Postponing your consumption until tomorrow or until ten years
                  from now carries very different levels of risk and waiting. In economics, this
                  reward is called the <i>interest rate</i>: it's the price of time.
                </>
              )}
            </p>
          </Callout>
        </Block>

        <Block>
          {fr ? (
            <>
              L'épargne n'est donc pas un stock qu'on empile juste pour le plaisir des yeux ! Elle
              sert à l'investissement, c'est-à-dire à lancer des projets, parfois un peu longs, qui
              rendent la société plus efficace et qui nous libèrent du temps.
            </>
          ) : (
            <>
              So savings aren't a pile you stack up just for the view! They fuel investment - that
              is, projects (sometimes long ones) that make society more efficient and free up our
              time.
            </>
          )}
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr ? (
                  <>
                    Ces investissements prennent la forme de <i>détours de production</i> qui
                    s'inscrivent dans une <i>structure de capital</i>. <br />
                    Non non, ne fuis pas, sous ces termes un peu barbares se cachent des concepts
                    très concrets !
                  </>
                ) : (
                  <>
                    These investments take the form of <i>roundabout production</i>, fitting into a{" "}
                    <i>capital structure</i>. <br />
                    Hold on, don't run away - behind these intimidating words hide very concrete
                    ideas!
                  </>
                )}
              </p>
              <Callout
                title={
                  fr ? "La structure du capital, késako ?" : "Capital structure - what's that?"
                }
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
                  {fr
                    ? "Prenons l'exemple du sandwich (clique sur les petites boîtes afin de remonter le fil de la production) :"
                    : "Let's take the sandwich example (click on the small boxes to trace back the production chain):"}
                </p>
                <CapitalStructureChain onComplete={markComplete} />
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
                      efficaces. L'ensemble de ces outils et de ces étapes forment une structure
                      complexe, le capital.
                    </>
                  ) : (
                    <>
                      These steps are{" "}
                      <Reference href="https://en.wikipedia.org/wiki/Roundaboutness">
                        roundabout production
                      </Reference>
                      : you first build the tools that will then make you far more efficient. All
                      these tools and steps together form a complex structure - capital.
                    </>
                  )}
                </p>
              </Callout>
            </>
          )}
        </Block>

        <Block>
          <p>
            {fr
              ? "Si le Capital est une structure d'étapes qui prend du temps (comme notre sandwich), comment savoir si nous avons les moyens de lancer un nouveau chantier ? C'est là qu'intervient le taux d'intérêt."
              : "If Capital is a time-consuming structure of steps (like our sandwich), how do we know whether we can afford to launch a new project? That's where the interest rate comes in."}
          </p>
          <p>
            {fr ? (
              <>
                Dans un monde sans manipulation monétaire, ce taux agit comme une boussole
                naturelle. Voilà comment ça marche.
              </>
            ) : (
              <>
                In a world without monetary manipulation, this rate acts as a natural compass.
                Here's how it works.
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
                      "Society has set aside enough resources - go launch your long, complex
                      projects."
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
        </Block>

        <Block last>
          {fr ? (
            <>
              Dans un monde honnête, le taux dit la vérité. Il reflète l'épargne réelle disponible.
              Reste une question dérangeante : que se passe-t-il quand on truque la boussole ?{" "}
              <Reference to={ROUTE_NAME.MoneyLaws_3}>Le même film, mais truqué.</Reference>
            </>
          ) : (
            <>
              In an honest world, the rate tells the truth. It reflects the real savings available.
              One unsettling question remains: what happens when the compass is rigged?{" "}
              <Reference to={ROUTE_NAME.MoneyLaws_3}>The same movie, but rigged.</Reference>
            </>
          )}
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
