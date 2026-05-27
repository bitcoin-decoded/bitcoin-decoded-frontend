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
            vraie question, ce n'est pas « qu'est-ce que c'est ? » : c'est pourquoi c'est si
            difficile à falsifier que personne ne s'y frotte. Et là, ça devient intéressant.
          </>
        ) : (
          <>
            A blockchain is a chain of blocks. Literally. The word says what it does. The real
            question isn't "what is it?": it's why it's so hard to falsify that no one seriously
            tries. That's where things get interesting.
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
            A blockchain is a chain of blocks. There, chapter done. <br />
            Kidding.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Imagine un immense livre de comptes qui retrace chaque transaction depuis la création du réseau (le temps t = 0, le tout premier bloc, appelé « Bloc Genesis ») :"
          : 'Picture a giant ledger that records every transaction since the network came to life (time t = 0, the very first block, known as the "Genesis Block"):'}
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
            : "a chain of blocks = a book whose pages are all linked together, forming a chain you can't break without breaking the whole thing."}
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
            : "The header holds the block's metadata:"}
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
                <HighlightText>Previous block hash</HighlightText> (the fingerprint that links to
                the block before)
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
                <HighlightText>Merkle root</HighlightText> (a single fingerprint that sums up every
                transaction in the block at once)
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
                <HighlightText>Nonce</HighlightText> (a number used by miners, which we'll get to in
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
            <i>"And this mathematical glue, what is it, concretely?"</i> <br />
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
              - oui, deux fois de suite, tu as bien lu. Un choix historique de Satoshi pour
              renforcer la résistance à certaines attaques mathématiques. On ne s'attarde pas
              là-dessus, mais voici un lien pour les plus curieux :{" "}
              <Reference href="https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04_keys.adoc">
                Mastering Bitcoin, chapitre 4
              </Reference>
              .
            </>
          ) : (
            <>
              To link blocks together, the Bitcoin protocol uses a double{" "}
              <Reference href="https://en.wikipedia.org/wiki/SHA-2">
                <i>SHA-256</i>
              </Reference>{" "}
              hash - yes, twice in a row, you read that right. A historical design choice by Satoshi
              to strengthen resistance against certain mathematical attacks. We won't dwell on it
              here, but here's a link for the curious:{" "}
              <Reference href="https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch04_keys.adoc">
                Mastering Bitcoin, chapter 4
              </Reference>
              .
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Imagine une machine à broyer : tu y jettes n'importe quelle donnée (un mot, un livre
              entier, une image) et la machine te ressort une empreinte numérique de taille fixe.
            </>
          ) : (
            <>
              Picture a meat grinder: you toss in any data you want (a word, an entire book, an
              image) and the machine spits out a digital fingerprint of fixed size.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              A toi de jouer, expérimente ! <br />
              Tape ce que tu veux dans la machine de hachage et observe ce qu'il se passe.
            </>
          ) : (
            <>
              Your turn, give it a shot! <br />
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
            produisant une empreinte appelée « hash du bloc ». Cette empreinte sert d'identifiant -
            et tu vas voir au <Reference to={ROUTE_NAME.Bitcoin_4}>prochain chapitre</Reference>{" "}
            qu'elle sert aussi à bien autre chose. Ce hash est ensuite repris dans l'en-tête du bloc
            suivant.
          </>
        ) : (
          <>
            This double hash is applied to the block's header (and only to its header), producing a
            fingerprint called the "block hash". That fingerprint serves as an identifier - and
            you'll see in the <Reference to={ROUTE_NAME.Bitcoin_4}>next chapter</Reference> that it
            has a lot more going on than just that. This hash is then carried into the header of the
            next block.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Résultat : la moindre modification d'un bloc invalide immédiatement tous les blocs qui le suivent. Réécrire la blockchain devient extrêmement difficile en pratique."
          : "The result: the slightest change to a block immediately invalidates every block that follows. Rewriting the blockchain becomes extremely hard in practice."}
      </p>
      <p id="blockchainChainVisual-start">
        {fr ? (
          <>
            À toi de jouer : voici un bloc, tout seul. Ajoute-en un autre derrière. Tu vas voir ce
            qui les lie.
          </>
        ) : (
          <>Here's one block, on its own. Add another behind it. You'll see what links them.</>
        )}
      </p>

      <BlockchainChainVisual resetScrollTargetId="blockchainChainVisual-start" />

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
            each page is sealed by the next one. But a solid ledger isn't enough: we still need to
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
            Because that <i>nonce</i>, the one you ran into in every block, isn't there by accident.
            It's the key to a worldwide race between miners, where computing power replaces trust,
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
