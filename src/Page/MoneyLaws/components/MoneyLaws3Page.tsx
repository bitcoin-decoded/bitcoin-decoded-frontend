import { type FC } from "react";

import { Callout, Emphasis, Quote } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  FlipCardGrid,
  getBeerProductionChain,
  getQuizDataBridgeMaterial,
  Quiz,
} from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";
import { useToggleSimulator } from "../../Shared/hooks";

export const MoneyLaws3Page: FC = () => {
  const { t, language } = useTranslation();
  const { isActive: isQuizSolved, activate: onQuizSolved } = useToggleSimulator();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.socialismProblem")}
      prelude={
        fr ? (
          <>
            Imagines qu'on te demande, là, maintenant, de décider combien d'acier la France doit
            produire l'année prochaine. Pas une fourchette. Un chiffre précis. En tonnes. T'as accès
            à toutes les données techniques que tu veux : les stocks, les capacités de production,
            les besoins déclarés des industries. Mais une seule information te manque, et sans elle,
            ton chiffre n'a aucun sens. Cette information, le socialisme l'a supprimée. Et c'est ce
            qui le rend mathématiquement impossible.
          </>
        ) : (
          <>
            Imagine you are asked, right now, to decide how much steel France should produce next
            year. Not a range. A precise number. In tons. You have access to all the technical data
            you want: inventories, production capacity, declared industrial needs. But there is one
            missing piece of information-and without it, your number makes no sense. That piece of
            information is prices. Socialism removes that information. And that is what makes it
            mathematically impossible.
          </>
        )
      }
    >
      <p>
        {fr
          ? "Au chapitre précédent, on a vu que la manipulation de la monnaie fausse les signaux et provoque des krachs. Mais que se passerait-il si, pour éviter ces déséquilibres, les autorités décidaient de supprimer totalement ces signaux ?"
          : "In the previous chapter, we saw that monetary manipulation distorts signals and causes crashes. But what would happen if, to avoid these imbalances, the authorities decided to eliminate these signals entirely?"}
      </p>
      <p>
        {fr ? (
          <>
            Dans son ouvrage de 1920 <i>« Le calcul économique en régime socialiste »</i>,{" "}
            <i>Ludwig von Mises</i> a démontré que ce modèle se heurte à une{" "}
            <Emphasis>impossibilité logique</Emphasis>.
          </>
        ) : (
          <>
            In his 1920 work titled <i> "Economic Calculation in the Socialist Commonwealth"</i>,{" "}
            <i>Ludwig von Mises</i> demonstrated that this model faces a{" "}
            <Emphasis>logical impossibility</Emphasis>.
          </>
        )}
      </p>
      <Quote author="Ludwig Von Mises">
        {fr
          ? "Là où il n'y a pas de marché libre, il n'y a pas de mécanisme de prix ; sans mécanisme de prix, il n'y a pas de calcul économique."
          : "Where there is no free market, there is no pricing mechanism; without a pricing mechanism, there is no economic calculation."}
      </Quote>
      <Callout
        title={
          fr
            ? "Le défi du Grand Planificateur : acier ou béton ?"
            : "The Great Planner's challenge: steel or concrete?"
        }
      >
        <p>
          {fr
            ? "Pour illustrer, je te nomme à la tête du Comité Central de Planification. Toutes mes sincères félicitations pour cette promotion !"
            : "To illustrate, I am appointing you as head of the Central Planning Committee. Sincere congratulations on this promotion!"}
        </p>
        <p>
          {fr
            ? "Ta première mission : construire un pont afin de relier deux régions. "
            : "Your first mission: build a bridge to connect two regions. "}
        </p>
        <p>
          {fr ? (
            <>
              Tes ingénieurs te présentent deux options techniques :
              <ul>
                <li>L'Acier : Ultra-résistant, mais sa production demande énormément d'énergie.</li>
                <li>
                  Le Béton : Moins complexe à fabriquer, mais il en faut des volumes colossaux.
                </li>
              </ul>
            </>
          ) : (
            <>
              Your engineers present two technical options:
              <ul>
                <li>
                  Steel: Ultra-resistant, but its production requires enormous amounts of energy.
                </li>
                <li>Concrete: Less complex to manufacture, but colossal volumes are needed.</li>
              </ul>
            </>
          )}
        </p>
        <p>
          {fr
            ? "Le problème ? Tu n'as pas de prix. L'État possède tout, donc rien ne s'achète ni ne se vend. Tu n'as que des rapports techniques sur les quantités de minerai ou de sable."
            : "The problem? You have no prices. The State owns everything, so nothing is bought or sold. All you have are technical reports on quantities of ore or sand."}
        </p>
        <Quiz {...getQuizDataBridgeMaterial(language)} onCorrectAnswer={onQuizSolved} />
        {isQuizSolved && (
          <>
            <p>
              {fr
                ? "Sans prix, l'économie devient une devinette géante. On peut techniquement construire le pont, mais on ne peut pas savoir si c'est une création ou une destruction de richesse pour la communauté."
                : "Without prices, the economy becomes a giant guessing game. You can technically build the bridge, but you cannot know whether it creates or destroys wealth for the community."}
            </p>
            <p>
              {fr
                ? "Comme le disait Mises, le planificateur est comme un capitaine de navire qui a les cartes, les voiles et l'équipage, mais à qui on aurait retiré la boussole et les étoiles. Il peut naviguer, mais il ne sait pas s'il va vers la terre ferme ou vers un récif."
                : "As Mises put it, the planner is like a ship captain who has the maps, the sails, and the crew, but has been stripped of the compass and the stars. He can sail, but he does not know whether he is heading for land or a reef."}
            </p>
          </>
        )}
      </Callout>
      <p>
        {fr
          ? "Le capitalisme fait face au même problème et parvient à le résoudre. Voyons ça de plus près."
          : "Capitalism faces the same problem and manages to solve it. Let's take a closer look."}
      </p>
      <Callout title={fr ? "Le secret du Capitalisme" : "The secret of Capitalism"}>
        <p>
          {fr
            ? "Quand t'es un entrepreneur libre et que tu construis un pont, tu te poses une vraie question : « Quel matériau maximise mon profit ? »"
            : 'When you are a free entrepreneur building a bridge, you ask yourself a real question: "Which material maximizes my profit?"'}
        </p>
        <p>
          {fr
            ? "Tu regardes le prix de l'acier. Il est élevé ? Tu explores celui du béton. Il est moins cher ? Tu réfléchis à la durée de vie du pont, au coût de sa maintenance, tu prends en compte tous ces éléments dans tes calculs et tu arbitres."
            : "You look at the price of steel. Too high? You explore the price of concrete. Cheaper? You consider the bridge's lifespan, maintenance costs, weigh all these factors in your calculations, and make a decision."}
        </p>
        <p>
          {fr ? (
            <>
              <Emphasis>L'intérêt personnel crée automatiquement l'intérêt collectif.</Emphasis>
              <br />
              Pourquoi ? Parce que le prix de l'acier reflète sa rareté réelle. Si beaucoup d'autres
              entrepreneurs ont besoin d'acier pour d'autres projets (par exemple des fusées), alors
              son prix monte. Tu es donc « guidé » vers le matériau qui crée le moins de gaspillage
              pour la société.
            </>
          ) : (
            <>
              <Emphasis>Self-interest automatically creates collective interest.</Emphasis>
              <br />
              Why? Because the price of steel reflects its real scarcity. If many other
              entrepreneurs need steel for other projects (rockets, for instance), its price rises.
              You are therefore "guided" toward the material that creates the least waste for
              society.
            </>
          )}
        </p>
        <p>
          <Emphasis>
            {fr
              ? "C'est une coordination sans coordinateur. Une intelligence distribuée."
              : "It is coordination without a coordinator. Distributed intelligence."}
          </Emphasis>
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Mais voici l'astuce que les socialistes manquent :{" "}
            <Emphasis>
              les prix ne transmettent que l'information, les entrepreneurs créent cette
              information.
            </Emphasis>
          </>
        ) : (
          <>
            But here is the trick that socialists miss:{" "}
            <Emphasis>prices only transmit information, entrepreneurs create it.</Emphasis>
          </>
        )}
      </p>
      <Callout
        title={
          fr ? "L'Entrepreneur est créateur d'information" : "The Entrepreneur creates information"
        }
      >
        <p>
          {fr ? (
            <>
              Quand un entrepreneur met sa fortune en jeu et dit « je parie que cette ressource vaut
              plus ici que là », il crée une donnée économique nouvelle.
              <ul>
                <li>S'il a raison, il gagne.</li>
                <li>S'il se trompe, il fait faillite.</li>
              </ul>
              C'est ce risque, cette peau dans le jeu (<i>« skin in the game »</i>), qui force la
              découverte de l'allocation optimale.
            </>
          ) : (
            <>
              When an entrepreneur puts their fortune on the line and says "I bet this resource is
              worth more here than there," they create a new piece of economic data.
              <ul>
                <li>If they are right, they profit.</li>
                <li>If they are wrong, they go bankrupt.</li>
              </ul>
              It is this risk, this <i>"skin in the game"</i>, that drives the discovery of optimal
              allocation.
            </>
          )}
        </p>
        <p>
          {fr
            ? "Sans entrepreneurs risquant leur capital, sans possibilité de profit ou de perte, il n'y a personne pour produire cette information. Juste du gaspillage."
            : "Without entrepreneurs risking their capital, without the possibility of profit or loss, there is no one to produce this information. Just waste."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Pour sentir l'ampleur du problème, prends la fabrication d'une simple bière. Pour un planificateur, c'est un cauchemar logistique !"
          : "To grasp the scale of the problem, take the production of a simple beer. For a planner, it is a logistical nightmare!"}
      </p>
      <p>{fr ? "Cliques sur chaque carte :" : "Click on each card:"}</p>
      <FlipCardGrid items={getBeerProductionChain(language)} />
      <p>
        {fr ? (
          <>
            Chaque étape implique des milliers de décisions. Un entrepreneur pour le verre anticipe
            les prix. Un autre pour le houblon fait de même.{" "}
            <Emphasis>
              C'est une intelligence distribuée qu'aucun cerveau central ne pourra jamais égaler.
            </Emphasis>
          </>
        ) : (
          <>
            Each step involves thousands of decisions. An entrepreneur for glass anticipates prices.
            Another for hops does the same.{" "}
            <Emphasis>
              It is a distributed intelligence that no central brain could ever match.
            </Emphasis>
          </>
        )}
      </p>
      <Callout title={fr ? "Le cas de la Chine et de son eau" : "The case of China and its water"}>
        <p>
          {fr
            ? "La théorie de Mises se vérifie malheureusement en Chine. Depuis 40 ans, le gouvernement bloque le prix de l'eau à un niveau dérisoire pour favoriser l'industrie."
            : "Mises' theory is unfortunately confirmed in China. For 40 years, the government has kept the price of water at a negligible level to favor industry."}
        </p>
        <ul>
          {fr ? (
            <>
              <li>
                Des industries gourmandes en eau se sont installées au nord, dans une zone
                semi-aride.
              </li>
              <li>Les usines gaspillent l'eau (pourquoi faire attention si c'est gratuit ?).</li>
              <li>Les agriculteurs utilisent des méthodes inefficaces.</li>
            </>
          ) : (
            <>
              <li>Water-intensive industries have set up in the north, in a semi-arid region.</li>
              <li>Factories waste water (why be careful if it is free?).</li>
              <li>Farmers use inefficient methods.</li>
            </>
          )}
        </ul>
        <p>
          {fr
            ? "Le résultat ? Les nappes phréatiques sont aujourd'hui à sec. Et par effet domino, l'électricité vient à manquer en période de sécheresse, ce qui provoque la fermeture d'usines, et fait grimper le coût des matières premières."
            : "The result? Groundwater reserves are now depleted. And in a domino effect, electricity becomes scarce during drought periods, leading to factory shutdowns and driving up the cost of raw materials."}
        </p>
        <p>
          <Emphasis>
            {fr
              ? "Tout cela, parce qu'une ressource n'avait pas de prix pour signaler sa rareté"
              : "All of this, because a resource had no price to signal its scarcity"}
          </Emphasis>
          .
        </p>
      </Callout>
      <p>
        {fr
          ? "Le même problème se joue en France, mais de manière plus soft et plus subtile."
          : "The same problem plays out in France, but in a softer and more subtle way."}
      </p>
      <Callout
        title={fr ? "Le cas de la France et de sa santé" : "The case of France and its healthcare"}
      >
        <p>
          {fr
            ? "L'État français fixe les tarifs des soins et les salaires des médecins. Le résultat ? Pas de concurrence, donc pas d'incitation à l'efficacité."
            : "The French State sets healthcare fees and doctors' salaries. The result? No competition, therefore no incentive for efficiency."}
        </p>
        <p>
          {fr
            ? "La bureaucratie s'épaissit pour essayer de gérer ce que les prix ne gèrent plus. On finit par payer plus pour les « inspecteurs » que pour les médecins de terrain."
            : 'Bureaucracy thickens to try to manage what prices no longer manage. We end up paying more for "inspectors" than for frontline doctors.'}
        </p>
      </Callout>
      <p>
        <Emphasis>
          {fr
            ? "Le problème du socialisme n'est pas la méchanceté ou l'incompétence des planificateurs. Il est structurel."
            : "The problem with socialism is not the malice or incompetence of planners. It is structural."}
        </Emphasis>
      </p>

      <p>
        {fr ? (
          <>
            Sans prix, on ne peut pas calculer. Sans calcul, on ne peut pas allouer. Et sans
            allocation, on gaspille.
            <ul>
              <li>La manipulation monétaire : la boussole ment.</li>
              <li>La doctrine du socialisme : la boussole n'existe plus.</li>
            </ul>
          </>
        ) : (
          <>
            Without prices, we cannot calculate. Without calculation, we cannot allocate. And
            without allocation, we waste.
            <ul>
              <li>Monetary manipulation: the compass lies.</li>
              <li>The socialist doctrine: the compass no longer exists.</li>
            </ul>
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Mais comment sortir de cette impasse ? C'est là qu'intervient{" "}
            <Emphasis>la méthodologie autrichienne</Emphasis>. Elle ne se contente pas de critiquer
            : elle propose une compréhension du monde basée sur l'action humaine.
          </>
        ) : (
          <>
            But how do we break out of this deadlock? This is where{" "}
            <Emphasis>the Austrian methodology</Emphasis> comes in. It doesn't just criticize: it
            offers a way of understanding the world based on human action.
          </>
        )}
      </p>
      <p>{fr ? "Prêt à changer de lunettes ?" : "Ready to put on new glasses?"}</p>
    </PageTemplate>
  );
};
