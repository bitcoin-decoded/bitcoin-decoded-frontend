import { type FC } from "react";

import { Callout, HighlightText, Quote, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  FlipCardGrid,
  getBeerProductionChain,
  getQuizDataBridgeMaterial,
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
      title={t("nav.tree.socialismProblem")}
      prelude={
        fr ? (
          <>
            Imagine qu'on te demande, là, maintenant, de décider combien d'acier la France doit
            produire l'année prochaine. Pas une fourchette. Un chiffre précis. T'as accès à toutes
            les données techniques que tu veux : les stocks, les capacités de production, les
            besoins déclarés des industries. Mais une seule information te manque, et sans elle, ton
            chiffre n'a aucun sens. Cette information, le socialisme l'a supprimée. Et c'est ce qui
            le condamne structurellement.
          </>
        ) : (
          <>
            Picture this. You've just been asked, right now, to decide how much steel France should
            produce next year. Not a range. An exact number. You have every technical figure you
            could want: stockpiles, production capacity, industry forecasts. But one piece of
            information is missing - and without it, your number means nothing. That piece of
            information is what socialism quietly removed. And that's what dooms it, not tomorrow,
            not maybe: structurally.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Au chapitre précédent, on a vu que la{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_3}>manipulation de la monnaie</Reference> fausse les
            signaux et provoque des krachs. Mais que se passe-t-il si l'état, un beau matin, décide
            de supprimer totalement ces signaux ? Eh bien, le socialisme a essayé.
          </>
        ) : (
          <>
            In the previous chapter, we saw how{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_3}>monetary manipulation</Reference> warps the
            signals and ends in crashes. But what happens if, one fine morning, the State decides to
            scrap those signals altogether? Well, socialism gave it a shot.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Dans son ouvrage de 1920 <i>« Le calcul économique en régime socialiste »</i>,{" "}
            <Reference href="https://fr.wikipedia.org/wiki/Ludwig_von_Mises">
              <i>Ludwig von Mises</i>
            </Reference>{" "}
            a démontré que ce modèle se heurte à une impossibilité logique.
          </>
        ) : (
          <>
            In his 1920 essay <i>"Economic Calculation in the Socialist Commonwealth"</i>,{" "}
            <Reference href="https://en.wikipedia.org/wiki/Ludwig_von_Mises">
              <i>Ludwig von Mises</i>
            </Reference>{" "}
            showed why this model runs into a logical wall.
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
            : "The Grand Planner's challenge: steel or concrete?"
        }
      >
        <p>
          {fr
            ? "Pour illustrer cette citation un peu savante, je te nomme à la tête du Comité Central de Planification. Toutes mes sincères félicitations pour cette promotion !"
            : "To unpack that slightly grand-sounding quote, I'm appointing you head of the Central Planning Committee. Congratulations on the promotion, sincerely!"}
        </p>
        <p>
          {fr
            ? "Ta première mission : construire un pont afin de relier deux régions. Simple, non ?"
            : "Your first mission: build a bridge to connect two regions. Simple, right?"}
        </p>
        <p>
          {fr
            ? "Tes ingénieurs te présentent deux options techniques :"
            : "Your engineers lay out two technical options:"}
        </p>
        <ul>
          <li>
            {fr
              ? "L'Acier : ultra-résistant, mais sa production demande énormément d'énergie."
              : "Steel: extremely strong, but it takes a huge amount of energy to produce."}
          </li>
          <li>
            {fr
              ? "Le Béton : plus simple à fabriquer, mais il en faut vraiment beaucoup."
              : "Concrete: simpler to make, but you need an awful lot of it."}
          </li>
        </ul>
        <p>
          {fr
            ? "Le problème ? Tu n'as pas de prix. L'État possède tout, donc rien ne s'achète ni ne se vend. Tu n'as que des rapports techniques sur les quantités de minerai ou de sable."
            : "The catch? You have no prices. The State owns everything, so nothing is bought or sold. All you've got is technical reports on tonnes of ore or sand."}
        </p>
        <Quiz {...getQuizDataBridgeMaterial(language)} onCorrectAnswer={onQuizSolved} />
        {isQuizSolved && (
          <>
            <p>
              {fr
                ? "Sans prix, l'économie devient une sorte de devinette géante. On peut techniquement construire le pont, ça OK, mais on ne peut pas savoir si les ressources mobilisées auraient mieux servi ailleurs."
                : "Without prices, the economy turns into one giant guessing game. Sure, you can technically build the bridge - but you can't know whether those resources would have done more good somewhere else."}
            </p>
            <p>
              {fr
                ? "Comme le disait Mises, le planificateur est comme un capitaine de navire qui a les cartes, les voiles et l'équipage, mais à qui on aurait retiré la boussole et les étoiles. Il peut naviguer, mais il ne sait pas s'il va vers la terre ferme ou vers un récif. Un peu comme dans le film du Titanic dont on connaît tous la fin."
                : "As Mises put it, the planner is like a ship's captain who has the maps, the sails, and the crew - but no compass and no stars. He can sail. He just can't tell if he's heading for dry land or a reef. A bit like the Titanic, and we all know how that one ended."}
            </p>
          </>
        )}
      </Callout>
      <p>
        {fr
          ? "Le capitalisme fait face au même problème mais il parvient à le résoudre. Voyons ça de plus près."
          : "Capitalism faces the exact same problem - and somehow gets through it. Let's see how."}
      </p>
      <Callout title={fr ? "Le secret du Capitalisme" : "Capitalism's little secret"}>
        <p>
          {fr
            ? "Quand t'es un entrepreneur et que tu construis un pont, tu te poses une vraie question : « Quel matériau maximise mon profit ? »"
            : 'When you\'re an entrepreneur building that bridge, you ask yourself a very real question: "Which material makes me the most profit?"'}
        </p>
        <p>
          {fr
            ? "Tu regardes le prix de l'acier. Il est élevé ? OK pas grave tu explores celui du béton. Il est moins cher ? OK, tu réfléchis à la durée de vie du pont, au coût de sa maintenance, tu prends en compte tous ces éléments dans tes calculs et tu arbitres."
            : "You check the price of steel. High? OK, no problem, you check concrete. Cheaper? OK, then you start thinking about how long the bridge needs to last, what maintenance will cost, you crunch it all together and you make the call."}
        </p>
        <p>
          {fr ? (
            <>
              L'intérêt personnel finit le plus souvent par servir l'intérêt collectif. Pas par
              bonté. Par pure mécanique.
              <br />
              Pourquoi ? Parce que le prix de l'acier reflète sa rareté du moment. Si beaucoup
              d'autres entrepreneurs ont besoin d'acier pour d'autres projets (par exemple pour des
              fusées), alors son prix va monter. Tu es donc « guidé » vers le matériau qui crée le
              moins de gaspillage pour la société.
            </>
          ) : (
            <>
              Self-interest, more often than not, ends up serving the collective interest. Not out
              of kindness. Out of pure mechanics.
              <br />
              Why? Because the price of steel reflects how scarce it is right now. If plenty of
              other entrepreneurs need steel for their own projects (for rockets, say), the price
              climbs. You're nudged toward the material that wastes the least for society.
            </>
          )}
        </p>
        <p>
          <HighlightText>
            {fr
              ? "C'est une coordination sans coordinateur. Une intelligence distribuée."
              : "It's coordination without a coordinator. Distributed intelligence."}
          </HighlightText>
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Mais voici l'astuce que les socialistes loupent : les prix ne font que transmettre une
            information, les entrepreneurs, eux, créent cette information.
          </>
        ) : (
          <>
            But here's the trick socialists miss: prices only carry the information. Entrepreneurs
            are the ones who create it.
          </>
        )}
      </p>
      <Callout
        title={
          fr
            ? "L'Entrepreneur est créateur d'information"
            : "The Entrepreneur as information creator"
        }
      >
        <p>
          {fr
            ? "Quand un entrepreneur met sa fortune en jeu et dit « je parie que cette ressource vaut plus ici que là », il crée une donnée économique nouvelle."
            : 'When an entrepreneur stakes their own fortune and says "I bet this resource is worth more here than there," they\'re creating a brand-new piece of economic data.'}
        </p>
        <ul>
          <li>{fr ? "S'il a raison, il gagne." : "If they're right, they win."}</li>

          <li>{fr ? "S'il se trompe, il fait faillite." : "If they're wrong, they go bust."}</li>
        </ul>
        <p>
          {fr ? (
            <span>
              C'est ce risque, cette peau dans le jeu (<i>« skin in the game »</i>), qui force la
              découverte des meilleures allocations possibles.
            </span>
          ) : (
            <span>
              It's that risk - that <i>skin in the game</i> - which forces the discovery of the best
              possible allocations.
            </span>
          )}
        </p>
        <p>
          {fr
            ? "Sans entrepreneurs risquant leur capital, sans possibilité de profit ou de perte, il n'y a personne pour produire cette information. Juste du gaspillage."
            : "No entrepreneurs putting their capital on the line, no possibility of profit or loss - and there's nobody producing that information. Just waste."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Pour sentir l'ampleur du problème, prends la fabrication d'une simple bière. Pour un planificateur, c'est un cauchemar logistique !"
          : "To feel the scale of the problem, take something as simple as brewing a beer. For a planner, it's a logistical nightmare!"}
      </p>
      <p>{fr ? "Clique sur chaque carte :" : "Click each card:"}</p>
      <FlipCardGrid items={getBeerProductionChain(language)} />
      <p>
        {fr ? (
          <>
            Chaque étape implique des milliers de décisions. Un entrepreneur pour le verre anticipe
            les prix. Un autre pour le houblon fait de même. C'est une intelligence distribuée
            qu'aucun cerveau central ne pourra jamais égaler.
          </>
        ) : (
          <>
            Every step involves thousands of decisions. One entrepreneur on glass reads the prices
            ahead. Another on hops does the same. It's a distributed intelligence no central brain
            will ever match.
          </>
        )}
      </p>
      <Callout title={fr ? "Le cas de la Chine et de son eau" : "The case of China and its water"}>
        <p>
          {fr ? (
            <>
              La théorie de Mises se vérifie malheureusement en Chine. Depuis des décennies,{" "}
              <Reference href="https://www.piie.com/blogs/china-economic-watch/economics-h2o-water-price-reforms-china">
                le gouvernement maintient le prix de l'eau à un niveau dérisoire pour favoriser
                l'industrie
              </Reference>
              .
            </>
          ) : (
            <>
              Mises's theory plays out, unfortunately, in China. For decades,{" "}
              <Reference href="https://www.piie.com/blogs/china-economic-watch/economics-h2o-water-price-reforms-china">
                the government has kept the price of water at a token level to favour industry
              </Reference>
              .
            </>
          )}
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
              <li>Water-hungry industries have settled in the north, in a semi-arid region.</li>
              <li>Factories waste water (why be careful when it's basically free?).</li>
              <li>Farmers stick with inefficient methods.</li>
            </>
          )}
        </ul>
        <p>
          {fr
            ? "Le résultat ? Les nappes phréatiques sont aujourd'hui à sec. Et par effet domino, l'électricité vient à manquer en période de sécheresse, ce qui provoque la fermeture d'usines et fait grimper le coût des matières premières. Le cata, en somme."
            : "The result? The groundwater is now bone dry. Domino effect: electricity runs short during droughts, factories shut down, raw material costs shoot up. A full-blown mess, basically."}
        </p>
        <p>
          {fr
            ? "Et tout cela, parce que le prix de cette ressource avait été vidé de sa substance. Il existait bien sur le papier, mais il ne disait plus rien de réel."
            : "All of this, because the price of that resource had been hollowed out. It existed on paper, sure - but it no longer said anything real."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Le même problème se joue en France, mais de manière plus soft et un peu plus subtile."
          : "The same thing plays out in France - softer, a touch more subtle."}
      </p>
      <Callout
        title={fr ? "Le cas de la France et de sa santé" : "The case of France and its healthcare"}
      >
        <p>
          {fr
            ? "L'État français fixe les tarifs des soins et encadre les revenus des médecins. Le résultat ? Une concurrence très partielle, donc des incitations à l'efficacité... mitigées !"
            : "The French State sets the rates for care and caps doctors' earnings. The result? Very partial competition - so incentives to be efficient that are... let's say lukewarm!"}
        </p>
        <p>
          {fr
            ? "La bureaucratie s'épaissit pour essayer de gérer ce que les prix ne gèrent plus. Et une part croissante du budget part en couches administratives plutôt qu'en soins."
            : "Bureaucracy keeps thickening to manage what prices no longer manage. And a growing share of the budget ends up in administrative layers rather than in actual care."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Le problème du socialisme n'est pas la méchanceté ou l'incompétence des planificateurs. Il est structurel."
          : "The problem with socialism isn't the malice or incompetence of planners. It's structural."}
      </p>
      <p>
        {fr
          ? "Sans prix, on ne peut pas calculer. Sans calcul, on ne peut pas allouer. Et sans allocation, on gaspille."
          : "Without prices, you can't calculate. Without calculation, you can't allocate. And without allocation, you waste."}
      </p>
      <ul>
        <li>
          {fr
            ? "La manipulation monétaire : la boussole ment."
            : "Monetary manipulation: the compass lies."}
        </li>
        <li>
          {fr
            ? "La doctrine du socialisme : la boussole n'existe plus."
            : "The socialist doctrine: the compass is gone."}
        </li>
      </ul>
      <p>
        {fr ? (
          <>
            Mais comment sortir de cette impasse ? C'est là qu'intervient{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_5}>la méthodologie autrichienne</Reference>. Elle ne
            se contente pas de critiquer : elle propose une compréhension du monde basée sur
            l'action humaine.
          </>
        ) : (
          <>
            So how do we get out of this dead end? That's where{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_5}>the Austrian methodology</Reference> comes in. It
            doesn't just criticise: it offers a way of understanding the world built on human
            action.
          </>
        )}
      </p>
      <p>{fr ? "Prêt à changer de lunettes ?" : "Ready to swap your glasses?"}</p>
    </PageTemplate>
  );
};
