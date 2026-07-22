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
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared/";

export const MoneyLaws4Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.socialismProblem")}>
      <BlockReader chapterId={ROUTE_NAME.MoneyLaws_4}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr ? (
              <>
                Imagine qu'on te demande, là, maintenant, de décider combien d'acier la France doit
                produire l'année prochaine. Pas une fourchette. Un chiffre précis. T'as accès à
                toutes les données techniques que tu veux : les stocks, les capacités de production,
                les besoins déclarés des industries. Mais une seule information te manque, et sans
                elle, ton chiffre n'a aucun sens. Cette information, le socialisme l'a supprimée. Et
                c'est ce qui le condamne structurellement.
              </>
            ) : (
              <>
                Picture this. You've just been asked, right now, to decide how much steel France
                should produce next year. Not a range. An exact number. You have every technical
                figure you could want: stockpiles, production capacity, industry forecasts. But one
                piece of information is missing - and without it, your number means nothing. That
                piece of information is what socialism quietly removed. And that's what dooms it,
                not tomorrow, not maybe: structurally.
              </>
            )}
          </ChapterPrelude>
          <p>
            {fr ? (
              <>
                Au chapitre précédent, on a vu que la{" "}
                <Reference to={ROUTE_NAME.MoneyLaws_3}>manipulation de la monnaie</Reference> fausse
                les signaux et provoque des krachs. Mais que se passe-t-il si l'État, un beau matin,
                décide de supprimer totalement ces signaux ? Eh bien, le socialisme a essayé.
              </>
            ) : (
              <>
                In the previous chapter, we saw how{" "}
                <Reference to={ROUTE_NAME.MoneyLaws_3}>monetary manipulation</Reference> warps the
                signals and ends in crashes. But what happens if, one fine morning, the State
                decides to scrap those signals altogether? Well, socialism gave it a shot.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                On va pousser la logique à fond, jusqu'à zéro prix. Pas parce que la France en est
                là, mais parce que{" "}
                <HighlightText>le cas extrême rend la mécanique visible</HighlightText>. Le réel, on
                le retrouvera juste après dans ce chapitre, en plus discret.
              </>
            ) : (
              <>
                We're going to push the logic all the way down, to zero prices. Not because any real
                economy is fully there, but because{" "}
                <HighlightText>the extreme case makes the mechanics visible</HighlightText>. Reality
                comes back right after in this chapter, in quieter form."
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
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
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
              <ol>
                <li>
                  {fr
                    ? "L'acier : ultra-résistant, mais sa production demande énormément d'énergie."
                    : "Steel: extremely strong, but it takes a huge amount of energy to produce."}
                </li>
                <li>
                  {fr
                    ? "Le béton : plus simple à fabriquer, mais il en faut vraiment beaucoup."
                    : "Concrete: simpler to make, but you need an awful lot of it."}
                </li>
              </ol>
              <p>
                {fr ? (
                  <>
                    Le problème ? <HighlightText>Tu n'as pas de prix</HighlightText>. L'État possède
                    tout, donc rien ne s'achète ni ne se vend. Tu n'as que des rapports techniques
                    sur les quantités de minerai ou de sable.
                  </>
                ) : (
                  <>
                    The catch? <HighlightText>You have no prices</HighlightText>. The State owns
                    everything, so nothing is bought or sold. All you've got is technical reports on
                    tonnes of ore or sand.
                  </>
                )}
              </p>
              <Quiz {...getQuizDataBridgeMaterial(language)} onCorrectAnswer={markComplete} />
            </Callout>
          )}
        </Block>
        <Block>
          <p>
            {fr
              ? "Sans prix, tu compares des choux et des carottes. Combien de tonnes d'acier « valent » combien de tonnes de béton, plus combien d'énergie, plus combien d'heures de travail ? Il te manque une unité commune pour comparer des choses qui n'ont rien à voir. Le prix, c'est cette unité. Enlève-le, et la question n'a tout simplement plus de réponse."
              : "Without prices, you're comparing apples and oranges. How many tonnes of steel 'are worth' how many tonnes of concrete, plus how much energy, plus how many work hours? You're missing a common unit to compare things that have nothing in common. The price is that unit. Take it away, and the question has no answer at all."}
          </p>
          <p>
            {fr
              ? "Comme le disait Mises, le planificateur est comme un capitaine de navire qui a les cartes, les voiles et l'équipage, mais à qui on aurait retiré la boussole et les étoiles. Il peut naviguer, mais il ne sait pas s'il va vers la terre ferme ou vers un récif. Un peu comme dans le film du Titanic dont on connaît tous la fin."
              : "As Mises put it, the planner is like a ship's captain who has the maps, the sails, and the crew - but no compass and no stars. He can sail. He just can't tell if he's heading for dry land or a reef. A bit like the Titanic, and we all know how that one ended."}
          </p>
        </Block>

        <Block>
          <p>
            {fr ? (
              <>
                Le capitalisme rencontre exactement le même problème. Sauf qu'il a trouvé un truc
                pour le résoudre. Pas un coordinateur génial.{" "}
                <HighlightText>Des gens qui parient</HighlightText>.
              </>
            ) : (
              <>
                Capitalism faces exactly the same problem. Except it figured out a way around it.
                Not a genius coordinator. <HighlightText>People placing bets</HighlightText>.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Quand un entrepreneur construit un pont, il met sa fortune en jeu. Il dit « je parie
                que l'acier vaut plus ici qu'ailleurs ». S'il a raison, il gagne. S'il se trompe, il
                fait faillite. Ce <i>skin in the game</i> (peau dans le jeu), c'est ce qui crée une
                information neuve : <HighlightText>le bon prix</HighlightText>.
              </>
            ) : (
              <>
                When an entrepreneur builds a bridge, they put their fortune on the line. They say
                \"I bet steel is worth more here than somewhere else.\" If they're right, they win.
                If they're wrong, they go bust. That skin in the game is what creates a new piece of
                information: <HighlightText>the right price</HighlightText>.
              </>
            )}
          </p>
          <p>
            {fr
              ? "Parce que le prix, ce n'est pas magique. C'est de la connaissance accumulée. Le résultat visible de milliers de paris comme le sien. Quand l'acier coûte une blinde, c'est que plein d'autres en ont besoin au même moment, pour des fusées, des rails, des immeubles. Le prix te transmet ça sans que tu aies besoin de le savoir."
              : "Because price isn't magic. It's accumulated knowledge. The visible result of thousands of bets like theirs. When steel is ridiculously expensive, it's because plenty of other people need it at the same time, for rockets, rails, buildings. The price carries that to you without you needing to know."}
          </p>
        </Block>
        <Block>
          <p>
            {fr
              ? "Attention, ça ne veut pas dire que le marché a toujours raison : un entrepreneur qui rogne sur la qualité peut empoisonner son client. L'amiante a été vendue des décennies avant d'être interdite. Le marché se trompe, et parfois salement."
              : "Careful, though: that doesn't mean the market is always right. An entrepreneur who cuts corners on quality can poison their customer. Asbestos was sold for decades before being banned. The market gets it wrong, and sometimes badly."}
          </p>
          <p>
            {fr ? (
              <>
                La différence est ailleurs. Le marché a un moyen de s'apercevoir qu'il s'est planté
                : la perte, la faillite, le procès, le client qui s'en va. L'amiante a fini
                interdite et les boîtes ruinées.{" "}
                <HighlightText>
                  Le planificateur, lui, n'a aucun de ces signaux. Il ne fait jamais faillite. Son
                  erreur ne lui revient jamais
                </HighlightText>
                . Elle s'accumule en silence, jusqu'au jour où tout casse d'un coup.
              </>
            ) : (
              <>
                The difference lies elsewhere. The market has a way of noticing it messed up: loss,
                bankruptcy, lawsuits, customers walking out. Asbestos ended up banned, and the firms
                ruined.{" "}
                <HighlightText>
                  The planner has none of these signals. He never goes bust. His mistake never comes
                  back to him
                </HighlightText>
                . It piles up in silence, until the day it all breaks at once.
              </>
            )}
          </p>
          <p>
            {fr
              ? "Voilà ce que les prix font et que le planificateur n'a pas. Pas un résultat parfait. Un moyen de corriger ses erreurs."
              : "That's what prices give you, and the planner has nothing like it. Not a perfect outcome. A way to correct mistakes."}
          </p>
        </Block>

        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr
                  ? "Et encore, là on a supposé que le planificateur pouvait au moins rassembler toute l'info. Deuxième problème, encore pire : l'info n'est nulle part en entier. Elle est éclatée dans des milliers de têtes. Prends un truc banal, une bière. Derrière, des milliers de décisions que personne n'orchestre. Clique sur chaque carte :"
                  : "And that's still assuming the planner can at least gather all the info. Second problem, even worse: the info isn't anywhere in one piece. It's scattered across thousands of heads. Take something mundane, a beer. Behind it, thousands of decisions nobody orchestrates. Click on each card:"}
              </p>
              <FlipCardGrid
                items={getBeerProductionChain(language)}
                requiredExplored={3}
                onComplete={markComplete}
              />
              <p>
                {fr ? (
                  <>
                    Chaque étape implique des milliers de décisions. Un entrepreneur pour le verre
                    anticipe les prix. Un autre pour le houblon fait de même. C'est une intelligence
                    distribuée qu'aucun cerveau central ne pourra jamais égaler.
                  </>
                ) : (
                  <>
                    Every step involves thousands of decisions. One entrepreneur on glass reads the
                    prices ahead. Another on hops does the same. It's a distributed intelligence no
                    central brain will ever match.
                  </>
                )}
              </p>
            </>
          )}
        </Block>

        <Block>
          <p>
            {fr
              ? "Tu te dis peut-être : « mais nous, en France, on a des prix ». Oui. Sauf qu'on n'abolit jamais tous les prix d'un coup. On en tue un, ici ou là. Le chiffre reste affiché, mais on l'a vidé. C'est le problème du planificateur, façon locale."
              : "You might be thinking: \"but we still have prices.\" Right. Except we never abolish all prices at once. We kill one, here or there. The number stays on the label, but it's been hollowed out. It's the planner's problem, locally."}
          </p>
          <Callout
            title={fr ? "Le cas de la Chine et de son eau" : "The case of China and its water"}
          >
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
                  <li>
                    Les usines gaspillent l'eau (pourquoi faire attention si c'est gratuit ?).
                  </li>
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
          <Callout
            title={
              fr ? "Le cas de la France et de sa santé" : "The case of France and its healthcare"
            }
          >
            <p>
              {fr
                ? "En France, c'est plus discret. L'État fixe le tarif d'une consultation et encadre les revenus des médecins. Résultat : le prix ne dit plus où le soin manque ni où il déborde. Impossible de savoir où il faudrait plus de médecins, ou quoi financer en priorité. Alors on rationne à coups de règles à la place du prix. La bureaucratie gonfle pour gérer ce que le prix ne gère plus. Et une part qui monte du budget part en paperasse plutôt qu'en soins."
                : "In France, it's quieter. The State sets the price of a consultation and caps doctors' earnings. Result: the price no longer says where care is missing or where there's too much of it. Impossible to tell where more doctors are needed, or what to fund first. So we ration with rules instead of prices. Bureaucracy grows to manage what prices no longer manage. And a rising share of the budget goes to paperwork rather than care."}
            </p>
          </Callout>
          <p>
            {fr ? (
              <>
                Le problème du socialisme n'est pas la méchanceté ou l'incompétence des
                planificateurs. <HighlightText>Il est structurel</HighlightText>.
              </>
            ) : (
              <>
                The problem with socialism isn't the malice or incompetence of planners.{" "}
                <HighlightText>It's structural</HighlightText>.
              </>
            )}
          </p>
          <p>
            {fr
              ? "Sans prix, on ne peut pas calculer. Sans calcul, on ne peut pas allouer. Et sans allocation, on gaspille."
              : "Without prices, you can't calculate. Without calculation, you can't allocate. And without allocation, you waste."}
          </p>
          <ul>
            <li>
              {fr
                ? "Fausser la monnaie : la boussole ment."
                : "Faking the money: the compass lies."}
            </li>
            <li>
              {fr
                ? "Bloquer un prix : la boussole ment à un endroit."
                : "Blocking one price: the compass lies in one place."}
            </li>
            <li>
              {fr
                ? "Abolir tous les prix : la boussole n'existe plus."
                : "Abolishing all prices: the compass is gone."}
            </li>
          </ul>
        </Block>

        <Block last>
          <p>
            {fr ? (
              <>
                Mais comment sortir de cette impasse ? C'est là qu'intervient{" "}
                <Reference to={ROUTE_NAME.MoneyLaws_5}>la méthodologie autrichienne</Reference>.
                Elle ne se contente pas de critiquer : elle propose une compréhension du monde basée
                sur l'action humaine.
              </>
            ) : (
              <>
                So how do we get out of this dead end? That's where{" "}
                <Reference to={ROUTE_NAME.MoneyLaws_5}>the Austrian methodology</Reference> comes
                in. It doesn't just criticise: it offers a way of understanding the world built on
                human action.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Et le pire, c'est que tu connais déjà un prix qu'on truque en permanence. Le plus
                important de tous.{" "}
                <HighlightText>Le prix du temps : le taux d'intérêt</HighlightText>. Celui que la
                banque centrale fixe à la main, pour toute l'économie, en même temps. La boussole de
                tous les projets longs, faussée par décret. Tu commences à voir où on va.
              </>
            ) : (
              <>
                And the worst part is, you already know a price that gets faked all the time. The
                most important one of all.{" "}
                <HighlightText>The price of time: the interest rate</HighlightText>. The one a
                central bank sets by hand, for the whole economy, all at once. The compass of every
                long-term project, faked by decree. You're starting to see where we're heading.
              </>
            )}
          </p>
          <p>{fr ? "Prêt à changer de lunettes ?" : "Ready to swap your glasses?"}</p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
