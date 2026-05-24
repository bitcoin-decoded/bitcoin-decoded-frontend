import { type FC } from "react";

import { Callout, HighlightText, KeywordHighlight, Reference } from "../../../Design";
import petrole from "../../../Design/img/Petroleum_sample.jpg";
import pikachuIllustratorCard from "../../../Design/img/Pikachu_Illustrator_Card.webp";
import { useTranslation } from "../../../I18n";
import { Illustration } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PAGE_STYLES, PageTemplate } from "../../Shared/";
import { displayAristoteMoneyCharacs } from "../helpers";

import { MonetaryGallery } from "./MonetaryGallery";

export const MoneyLaws1Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.whatIsMoney")}
      prelude={
        fr ? (
          <>
            Une monnaie ne sert à rien toute seule. Elle ne vaut quelque chose que parce qu'un
            réseau d'utilisateurs l'accepte. Parfois par habitude, parfois par contrainte légale,
            parfois par choix. Toute la question, depuis 5000 ans, c'est : pourquoi on adopte cette
            monnaie-ci, et qu'on abandonne celle-là ?
          </>
        ) : (
          <>
            A currency is useless on its own. It only has value because a network of users agrees to
            use it. Sometimes out of habit, sometimes by legal mandate, sometimes by choice. The
            real question, for 5,000 years now, has been: why do we adopt this particular form of
            money, and abandon that one?
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Si je te demande ce que tu as dans ton portefeuille, tu me répondras sûrement (après
            m'avoir dit que ça ne me regarde pas) : <i>« de l'argent »</i>.
          </>
        ) : (
          <>
            If I ask you what's in your wallet, you'll probably answer (after reminding me it's none
            of my business): <i>"money"</i>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Pourtant, seul sur une île déserte avec un million d'euros, tu serais pauvre. Pourquoi ?
            Parce que les billets ne se mangent pas. La monnaie ne vaut rien sans les autres : elle
            est avant tout <HighlightText>une technologie de collaboration</HighlightText>.
          </>
        ) : (
          <>
            And yet, stranded alone on a desert island with a million dollars, you'd be poor. Why?
            Because you can't eat banknotes. Money is worthless without other people: above all,
            it's <HighlightText>a collaboration technology</HighlightText>.
          </>
        )}
      </p>
      <Callout title={fr ? "Le nombre de Dunbar" : "Dunbar's number"}>
        <p>
          {fr ? (
            <>
              Pourquoi avons-nous inventé cette technologie ? <br />
              Pour dépasser nos limites biologiques.
            </>
          ) : (
            <>
              Why did we invent this technology? <br />
              To push past our biological limits.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Dans un petit groupe de moins de 150 personnes, la monnaie n'est pas indispensable. On
              se connaît, on se fait confiance, on utilise{" "}
              <HighlightText>la dette sociale</HighlightText> : « je t'aide pour ta hutte, tu
              m'aideras pour ma récolte ». Au-delà de ce seuil, notre cerveau ne suit plus : on ne
              peut plus mémoriser qui doit quoi à qui. La mémoire individuelle ne suffit plus.
            </>
          ) : (
            <>
              In a small group of fewer than 150 people, money isn't really needed. Everyone knows
              each other, trust is built in, and <HighlightText>social debt</HighlightText> does the
              job: <i>"I'll help you build your hut, you'll help me with my harvest."</i> Past that
              threshold, our brain can't keep up: we just can't remember who owes what to whom
              anymore. Individual memory isn't enough.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              La monnaie prend alors le relais : elle devient{" "}
              <HighlightText>une mémoire collective</HighlightText>. Posséder de l'argent, c'est
              détenir une reconnaissance sociale : généralement la trace d'un travail fourni,
              parfois d'un crédit accordé. Et le droit de réclamer un service équivalent en retour.
            </>
          ) : (
            <>
              Money then steps in: it becomes <HighlightText>a collective memory</HighlightText>.
              Owning money means holding a form of social recognition - usually the trace of work
              you've done, sometimes credit extended to you. And the right to claim an equivalent
              service in return.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Ce nombre n'est pas choisi au hasard : c'est le{" "}
              <Reference href="https://fr.wikipedia.org/wiki/Nombre_de_Dunbar">
                <i>nombre de Dunbar</i>
              </Reference>
              , la limite cognitive estimée de notre cerveau pour entretenir des relations stables.
              Ce n'est pas une frontière magique au-dessus de laquelle la monnaie « apparaît », mais
              plutôt un seuil où la mémoire individuelle commence à coincer.
            </>
          ) : (
            <>
              This number isn't picked at random: it's{" "}
              <Reference href="https://en.wikipedia.org/wiki/Dunbar%27s_number">
                <i>Dunbar's number</i>
              </Reference>
              , the estimated cognitive limit of our brain for keeping stable relationships going.
              It's not some magical threshold where money suddenly "appears" - more like the point
              where individual memory starts to crack.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            La monnaie a un job précis : transférer la valeur de notre travail dans l'espace, mais
            surtout dans le temps.
          </>
        ) : (
          <>
            Money has one specific job: to transfer the value of our work across space, but above
            all across time.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Comme nous ignorons de quoi demain sera fait (santé, coup dur, opportunité), nous
            stockons la valeur de notre travail aujourd'hui pour pouvoir la restituer plus tard. On
            peut imaginer la monnaie comme une batterie stockant de l'énergie. Mais attention : pour
            qu'une batterie soit utile, il ne faut pas qu'elle se vide toute seule !
          </>
        ) : (
          <>
            Since we have no idea what tomorrow holds (health issues, setbacks, opportunities), we
            store the value of our work today so we can pull it back out later. Think of money as a
            battery storing energy. But careful: for a battery to be useful, it can't drain on its
            own!
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est ici qu'interviennent deux concepts souvent confondus :{" "}
            <HighlightText>la rareté et la dureté</HighlightText>.
          </>
        ) : (
          <>
            This is where two often-confused concepts come in:{" "}
            <HighlightText>scarcity and hardness</HighlightText>.
          </>
        )}
      </p>
      <Callout title={fr ? "Rareté versus Dureté" : "Scarcity versus Hardness"}>
        <p>
          <KeywordHighlight>{fr ? "RARETÉ MONÉTAIRE" : "MONETARY SCARCITY"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est une photographie à l'instant T du stock existant."
            : "→ It's a snapshot, at a given moment, of the existing stock."}{" "}
          <br />
          <i>
            {fr ? "« Combien y en a-t-il actuellement ? »." : '"How much of it exists right now?"'}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "DURETÉ MONÉTAIRE" : "MONETARY HARDNESS"}</KeywordHighlight>{" "}
          {fr
            ? "→ C'est la résistance de la monnaie à la production de nouvelles unités."
            : "→ It's how much a currency resists the production of new units."}{" "}
          <br />
          <i>
            {fr ? (
              <>
                « Si l'on augmente la production d'une monnaie, est-ce que l'offre va suivre cette
                demande ? » Si la réponse est non, alors cette monnaie est dure.
              </>
            ) : (
              <>
                "If we crank up production of a currency, will supply actually follow demand?" If
                the answer is no, then that currency is hard.
              </>
            )}
          </i>
        </p>
        <div style={PAGE_STYLES.illustrationsWrapper}>
          <Illustration
            src={pikachuIllustratorCard}
            alt={fr ? "Carte de Pikachu Illustrator" : "Pikachu Illustrator card"}
            width="30%"
            caption={
              fr
                ? "« Pikachu Illustrator » est la carte pokémon la plus rare (39 exemplaires dans le monde). Cependant, elle n'est pas dure (Nintendo pourrait facilement imprimer des milliers de cartes « Pikachu Illustrator » identiques)."
                : '"Pikachu Illustrator" is the rarest Pokémon card (39 copies worldwide). But it isn\'t hard: Nintendo could easily print thousands of identical "Pikachu Illustrator" cards if they wanted to.'
            }
          />
          <Illustration
            src={petrole}
            alt={fr ? "Pétrole brut" : "Crude oil"}
            width="30%"
            caption={
              fr
                ? "Le pétrole n'est pas rare, les gisements abondent dans le monde. Pourtant, il est dur : même avec la meilleure volonté, doubler la production annuelle est impossible à court terme."
                : "Oil isn't rare - deposits are abundant around the world. Yet it's hard: even with the best intentions, doubling annual production in the short term is impossible."
            }
          />
        </div>
      </Callout>
      <p>
        {fr
          ? "Pour qu'une monnaie soit une « batterie » qui tient la route, on retient cinq propriétés."
          : 'For money to be a "battery" worth its name, five properties are usually retained.'}
      </p>
      <Callout title={fr ? "Les cinq piliers d'une monnaie" : "The five pillars of money"}>
        {displayAristoteMoneyCharacs(language)}
      </Callout>
      <p>
        {fr
          ? "Et comme toujours, passons à la pratique en découvrant comment l'histoire a « puni » les batteries qui fuyaient."
          : 'And as always, let\'s get practical and see how history "punished" the batteries that leaked.'}
      </p>
      <p>
        {fr
          ? "Déplies les monnaies ci-dessous afin d'en savoir plus !"
          : "Unfold the currencies below to find out more!"}
      </p>
      <MonetaryGallery />
      <p>
        {fr ? (
          <>
            Le verdict de cette galerie est sans appel : dès qu'une monnaie perd sa dureté, elle
            cesse d'être une réserve de valeur et finit inéluctablement par disparaître.
          </>
        ) : (
          <>
            The verdict from this gallery is clear-cut: the moment a currency loses its hardness, it
            stops working as a store of value and inevitably ends up vanishing.
          </>
        )}
      </p>
      <p>
        {fr
          ? "C'est une régularité historique frappante : à long terme, les utilisateurs migrent vers les technologies monétaires qui résistent le mieux à la dilution."
          : "It's a striking historical pattern: over the long run, users migrate toward the monetary technologies that best resist dilution."}
      </p>
      <ul>
        <li>
          {fr ? (
            <span>
              Une monnaie dont on peut augmenter l'offre facilement est une batterie qui fuit.
              Personne n'a envie d'y laisser ses économies.
            </span>
          ) : (
            <span>
              A currency whose supply can easily be inflated is a leaky battery. Nobody wants to
              leave their savings sitting in it.
            </span>
          )}
        </li>

        <li>
          {fr ? (
            <span>
              À l'inverse, une monnaie qui reste durablement dure devient de plus en plus désirable.
              Comme son offre ne peut pas « suivre » l'augmentation de la demande, elle devient
              mécaniquement de plus en plus rare. C'est un cercle vertueux qui protège ceux qui
              l'utilisent.
            </span>
          ) : (
            <span>
              On the flip side, a currency that stays durably hard becomes more and more desirable.
              Since its supply can't "keep up" with rising demand, it mechanically becomes scarcer
              and scarcer. A virtuous cycle that protects whoever uses it.
            </span>
          )}
        </li>
      </ul>
      <p>
        {fr ? (
          <>
            Aujourd'hui, nous vivons une situation inédite. Pour la première fois dans l'histoire,
            le monde entier utilise des monnaies dont la dureté tend vers zéro (les monnaies Fiat).
            Nous avons choisi la vitesse de transaction au détriment de la solidité de notre
            batterie.
          </>
        ) : (
          <>
            Today, we're living through something unprecedented. For the first time in history, the
            entire world uses currencies whose hardness tends toward zero (fiat currencies). We
            chose transaction speed over the solidity of our battery.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Mais attention : quand on utilise une monnaie « facile à créer », on fausse le prix du
            temps et de l'effort. On envoie de faux signaux à toute la société, ce qui crée des
            phases d'euphorie artificielle suivies de krachs violents.
          </>
        ) : (
          <>
            But careful: when we use a currency that's "easy to create," we distort the price of
            time and effort. We send false signals to the entire society, which creates phases of
            artificial euphoria followed by violent crashes.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Reste alors une question ouverte :{" "}
            <i>
              « existe-t-il une monnaie dont la dureté serait structurellement garantie, sans
              dépendre d'aucune institution ? »
            </i>{" "}
            On y reviendra.
          </>
        ) : (
          <>
            That leaves one open question:{" "}
            <i>
              "Is there a currency whose hardness would be structurally guaranteed, without
              depending on any institution?"
            </i>{" "}
            We'll come back to it.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Prêt à découvrir comment ce manque de dureté fabrique, mécaniquement, les{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_2}>cycles de Boum et Krach</Reference> que nous
            subissons ? On y va.
          </>
        ) : (
          <>
            Ready to see how this lack of hardness mechanically manufactures the{" "}
            <Reference to={ROUTE_NAME.MoneyLaws_2}>Boom-and-Bust cycles</Reference> we all endure?
            Let's go.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
