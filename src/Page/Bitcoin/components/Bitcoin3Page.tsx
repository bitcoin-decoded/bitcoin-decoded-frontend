import { type FC } from "react";

import { Callout, Emphasis, HighlightText } from "../../../Design";
import { BlockAnatomyVisual, BlockchainChainVisual, HashDemo } from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";

export const Bitcoin3Page: FC = () => {
  return (
    <PageTemplate
      title="Anatomie de la Blockchain"
      prelude={
        <>
          La blockchain est un grand livre de compte de toutes les transactions du réseau. Partagé
          entre tous, ce registre est composé de « pages » liées entre elles par une colle
          mathématique si puissante que modifier le passé devient impossible.
        </>
      }
    >
      <p>
        Oubliez les termes complexes. Une blockchain, c'est simplement{" "}
        <Emphasis>une chaîne de blocs</Emphasis>. Voilà, le chapitre est terminé. <br />
        Je plaisante !
      </p>
      <p>
        Imaginez un immense livre de compte qui retrace chaque transaction depuis la création du
        réseau (le temps <i>t = 0</i>, également appelé le <i>« Bloc Genesis »</i>) :
        <ul>
          <li>un bloc = une page. Chaque page est remplie de transactions.</li>
          <li>
            une chaîne de blocs = un livre dont toutes les pages sont liées entre elles, formant
            ainsi une chaîne difficile à rompre sans casser tout l'ensemble.
          </li>
        </ul>
      </p>
      <Callout title="Dissection d'un bloc">
        <p>
          Un bloc se compose de deux parties : un <HighlightText>en-tête</HighlightText> et un{" "}
          <HighlightText>corps</HighlightText>.
        </p>
        <p>
          L'en-tête contient les métadonnées du bloc :
          <ol>
            <li>
              <HighlightText>Hash du bloc précédent</HighlightText> (l'empreinte qui crée le lien
              avec le bloc d'avant)
            </li>
            <li>
              <HighlightText>Racine de Merkle</HighlightText> (une empreinte qui résume toutes les
              transactions du bloc et les relie à l'en-tête)
            </li>
            <li>
              <HighlightText>Horodatage</HighlightText> (date de naissance du bloc)
            </li>
            <li>
              <HighlightText>Nonce</HighlightText> (un numéro utilisé par les mineurs que nous
              verrons au prochain chapitre)
            </li>
          </ol>
        </p>
        <p>
          Le corps contient la <HighlightText>liste des transactions</HighlightText>.
        </p>
        <BlockAnatomyVisual />
      </Callout>
      <p>
        <i>« Mais comment sont liées ces pages ? »</i>,{" "}
        <i>« Et cette colle mathématique, qu'est-ce que c'est concrètement ? »</i> <br />
        Très bonnes questions. Nous allons tout de suite clarifier.
      </p>
      <Callout title="La colle mathématique : Le Hachage">
        <p>
          <Emphasis>
            Pour lier les blocs entre eux, le logiciel Bitcoin utilise un double hachage{" "}
            <i>SHA-256</i>
          </Emphasis>{" "}
          (l'en-tête du bloc est haché deux fois de suite).
        </p>
        <p>
          Imaginez une machine à broyer : vous y jetez tout le contenu d'une page (le texte, les
          chiffres, l'heure) et la machine vous ressort{" "}
          <Emphasis>une empreinte numérique unique et standardisée</Emphasis>.
        </p>
        <p>
          A vous de jouer, expérimentez ! <br />
          Rentrez ce que vous voulez dans la machine de hachage et observons ce qu'il se passe.
        </p>
        <HashDemo />
      </Callout>

      <p>
        Ce double hachage est appliqué à l'<Emphasis>en-tête</Emphasis> du bloc (et uniquement à son
        en-tête) produisant une empreinte appelée « hash du bloc », qui sert d’identifiant. Ce hash
        est ensuite repris dans l’en-tête du bloc suivant.
      </p>
      <p>
        Ainsi, la moindre modification d'un bloc invalide immédiatement tous les blocs qui le
        suivent. Cette propriété rend la réécriture de la blockchain extrêmement difficile en
        pratique.
      </p>
      <p>
        C'est ce que l'on appelle l'<Emphasis>immutabilité de la blockchain</Emphasis>.
      </p>

      <BlockchainChainVisual />

      <p>
        La blockchain est donc un registre quasi impossible à falsifier en pratique, dont chaque
        page scelle la précédente. Mais un registre solide ne suffit pas : encore faut-il décider{" "}
        <Emphasis>qui a le droit d'y écrire</Emphasis> et à quel prix.
      </p>
      <p>
        Car ce fameux <i>nonce</i> que nous avons croisé dans chaque bloc n'est pas là par hasard.
        Il est la clé d'une compétition mondiale entre mineurs, où la puissance de calcul remplace
        la confiance, et où le hash que vous venez de découvrir joue un rôle central.
      </p>
      <p>
        Direction le prochain chapitre : <Emphasis>la preuve de travail</Emphasis>.
      </p>
    </PageTemplate>
  );
};
