import { type FC } from "react";

import { Callout, Emphasis, KeywordHighlight, Reference } from "../../../Design";
import petrole from "../../../Design/img/Petroleum_sample.jpg";
import pikachuIllustratorCard from "../../../Design/img/Pikachu_Illustrator_Card.webp";
import { useTranslation } from "../../../I18n";
import { Illustration } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/components";
import { PAGE_STYLES } from "../../Shared/styles";
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
            Une monnaie ne sert à rien tout seul. Elle ne vaut quelque chose que parce que les
            autres l'acceptent. Toute la question, depuis 5000 ans, c'est : pourquoi acceptent-ils
            celle-ci, et plus celle-là ?
          </>
        ) : (
          <>
            Money is useless on its own. It only has value because others accept it. For the past
            5,000 years, the real question has been: why do people accept this one, and not another?
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Si je te demande : <i>« Qu'as-tu dans ton portefeuille ? »</i>, tu me répondras sûrement{" "}
            <i>« de l'argent »</i>.
          </>
        ) : (
          <>
            If I ask you: <i>"What do you have in your wallet?"</i>, you would probably answer{" "}
            <i>"money"</i>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Pourtant, seul sur une île déserte avec un million d'euros, tu serais pauvre. Pourquoi ?
            Parce que les billets ne se mangent pas. La monnaie ne vaut rien sans les autres : elle
            est avant tout une <Emphasis> technologie de collaboration</Emphasis>.
          </>
        ) : (
          <>
            Yet, stranded on a desert island with a million euros, you would be poor. Why? Because
            you cannot eat banknotes. Money is worthless without other people: above all, it is a{" "}
            <Emphasis> collaboration technology</Emphasis>.
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
              To overcome our biological limits.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Dans un petit groupe de moins de 150 personnes, la monnaie n'est pas indispensable. On
              se connaît, on se fait confiance, on utilise la dette sociale : « je t'aide pour ta
              hutte, tu m'aideras pour ma récolte ». Au-delà de ce seuil, notre cerveau ne suit plus
              : on ne peut plus mémoriser qui doit quoi à qui. La mémoire individuelle ne suffit
              plus.
            </>
          ) : (
            <>
              In a small group of fewer than 150 people, money is not essential. Everyone knows each
              other, trust is implicit, and social debt does the job: "I help you build your hut,
              you help me with my harvest." Beyond that threshold, our brains can no longer keep up:
              we can't remember who owes what to whom anymore. Individual memory is no longer
              enough.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              La monnaie prend alors le relais : elle devient une mémoire collective. Posséder de
              l'argent, c'est détenir la preuve matérielle que tu as contribué à la société par ton
              travail, et que t'as le droit de réclamer un service équivalent en retour.
            </>
          ) : (
            <>
              Money then takes over: it becomes a collective memory. Owning money is holding
              tangible proof that you contributed to society through your work, and that you have
              the right to claim an equivalent service in return.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Ce nombre n'est pas choisi par pur hasard : il s'agit du{" "}
              <Reference href="https://fr.wikipedia.org/wiki/Nombre_de_Dunbar">
                <i>nombre de Dunbar</i>
              </Reference>
              .
            </>
          ) : (
            <>
              This number is not arbitrary: it is known as{" "}
              <Reference href="https://en.wikipedia.org/wiki/Dunbar%27s_number">
                <i>Dunbar's number</i>
              </Reference>
              .
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            La monnaie a un job précis : transférer la valeur de notre travail dans l'espace, mais
            surtout <Emphasis> dans le temps</Emphasis>.
          </>
        ) : (
          <>
            Money has a specific job: to transfer the value of our work across space, but above all{" "}
            <Emphasis> across time</Emphasis>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Comme nous ignorons de quoi demain sera fait (santé, coup dur, opportunité), nous
            stockons la valeur de notre travail aujourd'hui pour pouvoir la restituer plus tard. On
            peut imaginer la monnaie comme une <Emphasis>batterie</Emphasis> stockant de l'énergie.
            Mais attention : pour qu'une batterie soit utile, il ne faut pas qu'elle se vide toute
            seule !
          </>
        ) : (
          <>
            Since we never know what tomorrow holds (health issues, setbacks, opportunities), we
            store the value of our work today so we can retrieve it later. Think of money as a{" "}
            <Emphasis>battery</Emphasis> storing energy. But beware: for a battery to be useful, it
            must not drain on its own!
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est ici qu'interviennent deux concepts souvent confondus : la <i>Rareté</i> et la{" "}
            <i>Dureté</i>.
          </>
        ) : (
          <>
            This is where two often-confused concepts come in: <i>Scarcity</i> and <i>Hardness</i>.
          </>
        )}
      </p>
      <Callout title={fr ? "Rareté versus Dureté" : "Scarcity versus Hardness"}>
        <p>
          <KeywordHighlight>{fr ? "RARETÉ MONÉTAIRE" : "MONETARY SCARCITY"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est une photographie à l'instant T du stock existant."
              : "→ It's a snapshot, at a given moment, of the existing stock."}
          </Emphasis>{" "}
          <br />
          <i>
            {fr ? "« Combien y en a-t-il actuellement ? »." : '"How much of it currently exists?"'}
          </i>
        </p>
        <p>
          <KeywordHighlight>{fr ? "DURETÉ MONÉTAIRE" : "MONETARY HARDNESS"}</KeywordHighlight>{" "}
          <Emphasis>
            {fr
              ? "→ C'est la résistance de la monnaie à la production de nouvelles unités."
              : "→ It's a currency's resistance to the creation of new units."}
          </Emphasis>{" "}
          <br />
          <i>
            {fr ? (
              <>
                « Si l'on augmente la production d'une monnaie, est-ce que l'offre va suivre cette
                demande ? » Si la réponse est non, alors cette monnaie est dure.
              </>
            ) : (
              <>
                "If we ramp up production of a currency, will supply keep up with demand?" If the
                answer is no, then that currency is hard.
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
                : '"Pikachu Illustrator" is the rarest Pokémon card (39 copies worldwide). However, it is not hard (Nintendo could easily print thousands of identical "Pikachu Illustrator" cards).'
            }
          />
          <Illustration
            src={petrole}
            alt={fr ? "Pétrole brut" : "Crude oil"}
            width="30%"
            caption={
              fr
                ? "Le pétrole n'est pas rare, les gisements abondent dans le monde. Pourtant, il est dur : même avec la meilleure volonté, doubler la production annuelle est impossible à court terme."
                : "Oil is not rare, deposits are abundant around the world. Yet it is hard money: even with the best intentions, doubling annual production in the short term is impossible."
            }
          />
        </div>
      </Callout>
      <p>
        {fr
          ? "Pour qu'une monnaie soit une « batterie » digne de ce nom, les penseurs de l'économie se sont accordés sur cinq propriétés essentielles."
          : 'For money to be a worthy "battery," economic thinkers have agreed on five essential properties.'}
      </p>
      <Callout title={fr ? "Les cinq piliers d'une monnaie" : "The five pillars of money"}>
        {displayAristoteMoneyCharacs(language)}
      </Callout>
      <p>
        {fr
          ? "Et comme toujours, passons à la pratique en découvrant comment l'histoire a « puni » les batteries qui fuyaient."
          : 'And as always, let\'s move to practice by discovering how history "punished" leaky batteries.'}
      </p>
      <p>
        {fr
          ? "Déplies les monnaies ci-dessous afin d'en savoir plus !"
          : "Unfold the currencies below to learn more!"}
      </p>
      <MonetaryGallery />
      <p>
        {fr ? (
          <>
            Le verdict de cette galerie est sans appel :{" "}
            <Emphasis>
              dès qu'une monnaie perd sa dureté, elle cesse d'être une réserve de valeur et finit
              inéluctablement par disparaitre
            </Emphasis>
            .
          </>
        ) : (
          <>
            The verdict from this gallery is crystal clear:{" "}
            <Emphasis>
              as soon as a currency loses its hardness, it stops being a store of value and
              inevitably disappears
            </Emphasis>
            .
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            C'est une loi de la nature économique : l'être humain cherche toujours à stocker son
            travail dans la technologie la plus résistante possible :
            <ul>
              <li>
                Une monnaie dont on peut augmenter l'offre facilement est une batterie qui fuit.
                Personne n'a envie d'y laisser ses économies.
              </li>
              <li>
                À l'inverse, une monnaie qui reste durablement dure devient de plus en plus
                désirable. Comme son offre ne peut pas « suivre » l'augmentation de la demande, elle
                devient mécaniquement de plus en plus rare. C'est un cercle vertueux qui protège
                ceux qui l'utilisent.
              </li>
            </ul>
          </>
        ) : (
          <>
            This is a law of economic nature: humans always seek to store their work in the most
            resilient technology available:
            <ul>
              <li>
                A currency whose supply can be easily increased is a leaky battery. Nobody wants to
                leave their savings in it.
              </li>
              <li>
                Conversely, a currency that remains durably hard becomes increasingly desirable.
                Since its supply cannot "keep up" with rising demand, it mechanically becomes rarer
                and rarer. It is a virtuous cycle that protects its users.
              </li>
            </ul>
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Aujourd'hui, nous vivons une situation inédite. Pour la première fois dans l'histoire,
            le monde entier utilise des monnaies dont la <Emphasis>dureté tend vers zéro</Emphasis>{" "}
            (les monnaies Fiat). Nous avons choisi la vitesse de transaction au détriment de la
            solidité de notre batterie.
          </>
        ) : (
          <>
            Today, we are living through an unprecedented situation. For the first time in history,
            the entire world uses currencies whose <Emphasis>hardness tends toward zero</Emphasis>{" "}
            (fiat currencies). We chose transaction speed at the expense of our battery's solidity.
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
            But beware: when we use money that is "easy to create," we distort the price of time and
            effort. We send false signals to the entire society, which creates phases of artificial
            euphoria followed by violent crashes.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            <Emphasis>
              Prêt à découvrir comment ce manque de dureté engendre, mécaniquement, les{" "}
              <Reference to={ROUTE_NAME.MoneyLaws_2}>
                cycles de crises (Boum et Krach)
              </Reference>{" "}
              que nous subissons ?
            </Emphasis>{" "}
            On y va.
          </>
        ) : (
          <>
            <Emphasis>
              Ready to discover how this lack of hardness mechanically generates the{" "}
              <Reference to={ROUTE_NAME.MoneyLaws_2}>boom-and-bust cycles</Reference> we endure?
            </Emphasis>{" "}
            Let's go.
          </>
        )}{" "}
      </p>
    </PageTemplate>
  );
};
