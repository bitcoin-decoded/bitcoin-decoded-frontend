import { type FC } from "react";

import { Callout, Emphasis, HighlightText } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BlockAnatomyVisual, BlockchainChainVisual, HashDemo } from "../../../Interactive";
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
            question isn't what it is - it's why it's impossible to falsify. That's where things
            get interesting.
          </>
        )
      }
    >
      <p>
        {fr ? (
          <>
            Une blockchain, c'est <Emphasis>une chaîne de blocs</Emphasis>. Voilà, le chapitre est
            terminé. <br />
            Je plaisante.
          </>
        ) : (
          <>
            A blockchain is <Emphasis>a chain of blocks</Emphasis>. There you go, the chapter is
            done. <br />
            Just kidding.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Imagines un immense livre de compte qui retrace chaque transaction depuis la création
            du réseau (le temps <i>t = 0</i>, le tout premier bloc, appelé <i>« Bloc Genesis »</i>) :
            <ul>
              <li>un bloc = une page. Chaque page est remplie de transactions.</li>
              <li>
                une chaîne de blocs = un livre dont toutes les pages sont liées entre elles, formant
                ainsi une chaîne difficile à rompre sans casser tout l'ensemble.
              </li>
            </ul>
          </>
        ) : (
          <>
            Imagine a giant ledger that records every transaction since the network was born (time{" "}
            <i>t = 0</i>, the very first block, called the <i>"Genesis Block"</i>):
            <ul>
              <li>a block = a page. Each page is filled with transactions.</li>
              <li>
                a chain of blocks = a book whose pages are all linked together, forming a chain
                that's hard to break without breaking the whole thing.
              </li>
            </ul>
          </>
        )}
      </p>
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
          {fr ? "L'en-tête contient les métadonnées du bloc :" : "The header contains the block's metadata:"}
          <ol>
            <li>
              {fr ? (
                <>
                  <HighlightText>Hash du bloc précédent</HighlightText> (l'empreinte qui crée le
                  lien avec le bloc d'avant)
                </>
              ) : (
                <>
                  <HighlightText>Previous block hash</HighlightText> (the fingerprint that creates
                  the link with the prior block)
                </>
              )}
            </li>
            <li>
              {fr ? (
                <>
                  <HighlightText>Racine de Merkle</HighlightText> (une empreinte unique qui résume
                  d'un coup toutes les transactions du bloc)
                </>
              ) : (
                <>
                  <HighlightText>Merkle root</HighlightText> (a single fingerprint that summarizes
                  every transaction in the block at once)
                </>
              )}
            </li>
            <li>
              {fr ? (
                <>
                  <HighlightText>Horodatage</HighlightText> (date de naissance du bloc)
                </>
              ) : (
                <>
                  <HighlightText>Timestamp</HighlightText> (the block's birth date)
                </>
              )}
            </li>
            <li>
              {fr ? (
                <>
                  <HighlightText>Nonce</HighlightText> (un numéro utilisé par les mineurs que nous
                  verrons au prochain chapitre)
                </>
              ) : (
                <>
                  <HighlightText>Nonce</HighlightText> (a number used by miners - we'll cover it in
                  the next chapter)
                </>
              )}
            </li>
          </ol>
        </p>
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
              <Emphasis>
                Pour lier les blocs entre eux, le protocole Bitcoin utilise un double hachage{" "}
                <i>SHA-256</i>
              </Emphasis>{" "}
              (l'en-tête du bloc est haché deux fois de suite).
            </>
          ) : (
            <>
              <Emphasis>
                To link blocks together, the Bitcoin protocol uses a double <i>SHA-256</i> hash
              </Emphasis>{" "}
              (the block header is hashed twice in a row).
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Imagines une machine à broyer : Tu y jetes n'importe quelle donnée (un mot, un livre
              entier, une image) et la machine te ressort{" "}
              <Emphasis>une empreinte numérique de taille fixe</Emphasis>.
            </>
          ) : (
            <>
              Picture a grinding machine: you toss in any data (a word, an entire book, an image)
              and the machine spits out{" "}
              <Emphasis>a digital fingerprint of fixed size</Emphasis>.
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
            Ce double hachage est appliqué à l'<Emphasis>en-tête</Emphasis> du bloc (et uniquement à
            son en-tête) produisant une empreinte appelée « hash du bloc », qui sert d'identifiant.
            Ce hash est ensuite repris dans l'en-tête du bloc suivant.
          </>
        ) : (
          <>
            This double hash is applied to the block's <Emphasis>header</Emphasis> (and only to its
            header), producing a fingerprint called the "block hash," which serves as its
            identifier. That hash is then carried into the header of the next block.
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
          <>
            On appelle ça l'<Emphasis>immutabilité de la blockchain</Emphasis>.
          </>
        ) : (
          <>
            This is what's called the <Emphasis>immutability of the blockchain</Emphasis>.
          </>
        )}
      </p>

      <BlockchainChainVisual />

      <p>
        {fr ? (
          <>
            La blockchain est donc un registre quasi impossible à falsifier en pratique, dont chaque
            page est scellée par la suivante. Mais un registre solide ne suffit pas : encore
            faut-il décider <Emphasis>qui a le droit d'y écrire</Emphasis> et à quel prix.
          </>
        ) : (
          <>
            The blockchain is therefore a ledger that's practically impossible to falsify, where
            each page is sealed by the next one. But a solid ledger isn't enough: we still have to
            decide <Emphasis>who is allowed to write in it</Emphasis>, and at what cost.
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
            Direction le prochain chapitre : <Emphasis>la preuve de travail</Emphasis>.
          </>
        ) : (
          <>
            On to the next chapter: <Emphasis>proof of work</Emphasis>.
          </>
        )}
      </p>
    </PageTemplate>
  );
};
