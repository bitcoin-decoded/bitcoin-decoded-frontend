import { type FC } from "react";

import { Callout, HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BlockAnatomyVisual, BlockchainChainVisual, HashDemo } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/";

export const Bitcoin3Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.blockchain")}
      prelude={
        fr ? (
          <>
            Une blockchain, c'est une chaîne de blocs. Littéralement. Le mot dit ce qu'il fait. La
            vraie question, ce n'est pas qu'est-ce que c'est : c'est pourquoi c'est impossible à
            falsifier. Et là, ça devient intéressant.
          </>
        ) : (
          <>
            A blockchain is a chain of blocks. Literally. The word says what it does. The real
            question isn't what it is - it's why it's impossible to falsify. That's where things get
            interesting.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Une blockchain, c'est une chaîne de blocs. Voilà, le chapitre est terminé. <br />
            Je plaisante.
          </>
        ) : (
          <>
            A blockchain is a chain of blocks. There you go, the chapter is done. <br />
            Just kidding.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Imagines un immense livre de compte qui retrace chaque transaction depuis la création du réseau (le temps t = 0, le tout premier bloc, appelé « Bloc Genesis ») :"
          : 'Imagine a giant ledger that records every transaction since the network was born (time t = 0, the very first block, called the "Genesis Block"):'}
      </p>
      <ul>
        <li>
          {fr
            ? "un bloc = une page. Chaque page est remplie de transactions."
            : "a block = a page. Each page is filled with transactions."}
        </li>

        <li>
          {fr
            ? "une chaîne de blocs = un livre dont toutes les pages sont liées entre elles, formant ainsi une chaîne difficile à rompre sans casser tout l'ensemble."
            : "a chain of blocks = a book whose pages are all linked together, forming a chain that's hard to break without breaking the whole thing."}
        </li>
      </ul>
      <Callout title={fr ? "Dissection d'un bloc" : "Dissecting a block"}>
        <p>
          {fr ? (
            <>
              Un bloc se compose de deux parties : un <HighlightText>en-tête</HighlightText> et un{" "}
              <HighlightText>corps</HighlightText>.
            </>
          ) : (
            <>
              A block has two parts: a <HighlightText>header</HighlightText> and a{" "}
              <HighlightText>body</HighlightText>.
            </>
          )}
        </p>
        <p>
          {fr
            ? "L'en-tête contient les métadonnées du bloc :"
            : "The header contains the block's metadata:"}
        </p>

        <ol>
          <li>
            {fr ? (
              <span>
                <HighlightText>Hash du bloc précédent</HighlightText> (l'empreinte qui crée le lien
                avec le bloc d'avant)
              </span>
            ) : (
              <span>
                <HighlightText>Previous block hash</HighlightText> (the fingerprint that creates the
                link with the prior block)
              </span>
            )}
          </li>

          <li>
            {fr ? (
              <span>
                <HighlightText>Racine de Merkle</HighlightText> (une empreinte unique qui résume
                d'un coup toutes les transactions du bloc)
              </span>
            ) : (
              <span>
                <HighlightText>Merkle root</HighlightText> (a single fingerprint that summarizes
                every transaction in the block at once)
              </span>
            )}
          </li>

          <li>
            {fr ? (
              <span>
                <HighlightText>Horodatage</HighlightText> (date de naissance du bloc)
              </span>
            ) : (
              <span>
                <HighlightText>Timestamp</HighlightText> (the block's birth date)
              </span>
            )}
          </li>

          <li>
            {fr ? (
              <span>
                <HighlightText>Nonce</HighlightText> (un numéro utilisé par les mineurs que nous
                verrons au prochain chapitre)
              </span>
            ) : (
              <span>
                <HighlightText>Nonce</HighlightText> (a number used by miners - we'll cover it in
                the next chapter)
              </span>
            )}
          </li>
        </ol>
        <p>
          {fr ? (
            <>
              Le corps contient la <HighlightText>liste des transactions</HighlightText>.
            </>
          ) : (
            <>
              The body contains the <HighlightText>list of transactions</HighlightText>.
            </>
          )}
        </p>
        <BlockAnatomyVisual />
      </Callout>
      <p>
        {fr ? (
          <>
            <i>« Mais comment sont liées ces pages ? »</i>,{" "}
            <i>« Et cette colle mathématique, qu'est-ce que c'est concrètement ? »</i> <br />
            Très bonnes questions. On clarifie tout de suite.
          </>
        ) : (
          <>
            <i>"But how are these pages linked?"</i>,{" "}
            <i>"And this mathematical glue - what is it, concretely?"</i> <br />
            Great questions. Let's clear that up right now.
          </>
        )}
      </p>
      <Callout title={fr ? "La colle mathématique : Le Hachage" : "The mathematical glue: hashing"}>
        <p>
          {fr ? (
            <>
              Pour lier les blocs entre eux, le protocole Bitcoin utilise un double hachage{" "}
              <Reference href="https://fr.wikipedia.org/wiki/SHA-2">
                <i>SHA-256</i>
              </Reference>{" "}
              (l'en-tête du bloc est haché deux fois de suite).
            </>
          ) : (
            <>
              To link blocks together, the Bitcoin protocol uses a double{" "}
              <Reference href="https://en.wikipedia.org/wiki/SHA-2">
                <i>SHA-256</i>
              </Reference>{" "}
              hash (the block header is hashed twice in a row).
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Imagines une machine à broyer : Tu y jetes n'importe quelle donnée (un mot, un livre
              entier, une image) et la machine te ressort une empreinte numérique de taille fixe.
            </>
          ) : (
            <>
              Picture a grinding machine: you toss in any data (a word, an entire book, an image)
              and the machine spits out a digital fingerprint of fixed size.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              A toi de jouer, expérimentes ! <br />
              Rentres ce que tu veux dans la machine de hachage et observes ce qu'il se passe.
            </>
          ) : (
            <>
              Your turn - try it out! <br />
              Type whatever you want into the hashing machine and watch what happens.
            </>
          )}
        </p>
        <HashDemo />
      </Callout>

      <p>
        {fr ? (
          <>
            Ce double hachage est appliqué à l'en-tête du bloc (et uniquement à son en-tête)
            produisant une empreinte appelée « hash du bloc », qui sert d'identifiant. Ce hash est
            ensuite repris dans l'en-tête du bloc suivant.
          </>
        ) : (
          <>
            This double hash is applied to the block's header (and only to its header), producing a
            fingerprint called the "block hash," which serves as its identifier. That hash is then
            carried into the header of the next block.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Résultat : la moindre modification d'un bloc invalide immédiatement tous les blocs qui le suivent. Réécrire la blockchain devient extrêmement difficile en pratique."
          : "The result: the slightest modification to a block immediately invalidates every block that follows. Rewriting the blockchain becomes extremely difficult in practice."}
      </p>
      <p>
        {fr ? (
          <>On appelle ça l'immutabilité de la blockchain.</>
        ) : (
          <>This is what's called the immutability of the blockchain.</>
        )}
      </p>

      <BlockchainChainVisual />

      <p>
        {fr ? (
          <>
            La blockchain est donc un registre quasi impossible à falsifier en pratique, dont chaque
            page est scellée par la suivante. Mais un registre solide ne suffit pas : encore faut-il
            décider qui a le droit d'y écrire et à quel prix.
          </>
        ) : (
          <>
            The blockchain is therefore a ledger that's practically impossible to falsify, where
            each page is sealed by the next one. But a solid ledger isn't enough: we still have to
            decide who is allowed to write in it, and at what cost.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Car ce fameux <i>nonce</i>, croisé dans chaque bloc, n'est pas là par hasard. Il est la
            clé d'une compétition mondiale entre mineurs, où la puissance de calcul remplace la
            confiance, et où le hash que tu viens de découvrir joue un rôle central.
          </>
        ) : (
          <>
            Because that <i>nonce</i> you came across in every block isn't there by accident. It's
            the key to a worldwide competition among miners, where computing power replaces trust,
            and where the hash you just discovered plays a central role.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Direction le prochain chapitre :{" "}
            <Reference to={ROUTE_NAME.Bitcoin_4}>la preuve de travail</Reference>.
          </>
        ) : (
          <>
            On to the next chapter: <Reference to={ROUTE_NAME.Bitcoin_4}>proof of work</Reference>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
