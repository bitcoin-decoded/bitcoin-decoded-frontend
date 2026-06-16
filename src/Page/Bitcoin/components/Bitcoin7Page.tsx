import { type FC } from "react";

import { Callout, HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { KeySignatureTrio, SignaturePlayground, UtxoGraph } from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { Block, BlockReader } from "../../Reading";
import { ChapterPrelude, PageTemplate } from "../../Shared";

export const Bitcoin7Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate title={t("nav.tree.keysAndSignatures")} showChapterNav={false}>
      <BlockReader chapterId={ROUTE_NAME.Bitcoin_7}>
        <Block>
          <ChapterPrelude marginBottom="1.5rem">
            {fr
              ? "Ta banque a besoin de savoir qui tu es. Bitcoin, non. Aucun papier d'identité, aucun nom, aucun compte. Et pourtant, personne ne peut dépenser tes bitcoins à ta place. Comment ?"
              : "Your bank needs to know who you are. Bitcoin doesn't. No ID, no name, no account. And yet, no one can spend your bitcoins for you. How?"}
          </ChapterPrelude>
        </Block>
        <Block>
          <Callout
            title={
              fr
                ? "L'image à garder : une serrure, une clé"
                : "The picture to keep: a lock and a key"
            }
          >
            <p>
              {fr
                ? "Avant le moindre terme technique, une image. Tes bitcoins sont posés derrière une serrure, et une seule clé l'ouvre : la tienne."
                : "Before a single technical term, a picture. Your bitcoins sit behind a lock, and a single key opens it: yours."}
            </p>
            <p>
              {fr
                ? "Tout le génie de Bitcoin tient là : tu peux prouver que tu détiens cette clé (donc le droit de dépenser) sans jamais la montrer à personne. Garde cette serrure en tête : les trois objets qui suivent ne font que la rendre concrète."
                : "Bitcoin's whole trick is right there: you can prove you hold that key - and therefore the right to spend - without ever showing it to anyone. Keep that lock in mind: the three objects that follow just make it concrete."}
            </p>
          </Callout>
        </Block>
        {/* Bloc-outil : déverrouillé quand les trois objets ont été explorés (compteur 3/3). */}
        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>
                {fr
                  ? "Une transaction Bitcoin repose sur trois objets qu'il faut bien distinguer. Ils ne valent rien seuls : c'est ensemble qu'ils prouvent la propriété."
                  : "A Bitcoin transaction relies on three objects you need to clearly distinguish. None is worth much alone: it's together that they prove ownership."}
              </p>
              <KeySignatureTrio onComplete={markComplete} />
            </>
          )}
        </Block>
        {/* Bloc-outil : déverrouillé quand le lecteur a parcouru les trois étapes (calculer, signer, vérifier). */}
        <Block kind="tool">
          {({ markComplete }) => (
            <>
              <p>{fr ? "Passons à la pratique." : "Let's get practical."}</p>
              <Callout
                title={
                  fr
                    ? "Nicolas réalise sa première transaction"
                    : "Nicolas makes his first transaction"
                }
              >
                <p>
                  {fr ? (
                    <>
                      Notre bon vieil ami <i>Nicolas</i> est de retour. Il étudie Bitcoin et décide
                      de réaliser sa toute première transaction en bitcoin.
                    </>
                  ) : (
                    <>
                      Our good old friend <i>Nicolas</i> is back. He's studying Bitcoin and decides
                      to make his very first bitcoin transaction.
                    </>
                  )}
                </p>
                <p>
                  {fr ? (
                    <>
                      Il possède une clé privée (<HighlightText>L4mX9pQ2…5aW0cB</HighlightText>) et
                      souhaite envoyer 1 bitcoin à <i>Mme Michu</i>.
                    </>
                  ) : (
                    <>
                      He owns a private key (<HighlightText>L4mX9pQ2…5aW0cB</HighlightText>) and
                      wants to send 1 bitcoin to <i>Ms. Smith</i>.
                    </>
                  )}
                </p>
              </Callout>
              <p>
                {fr
                  ? "Interagis avec les éléments ci-dessous pour comprendre comment clés privées, clés publiques et signatures fonctionnent ensemble :"
                  : "Interact with the elements below to see how private keys, public keys and signatures work together:"}
              </p>
              <SignaturePlayground onComplete={markComplete} />
            </>
          )}
        </Block>
        <Block>
          <p>
            {fr
              ? "Ce mécanisme change complètement la logique de propriété."
              : "This mechanism completely changes the logic of ownership."}
          </p>
          <p>
            {fr
              ? "Dans le monde classique, tu dois prouver ton identité pour accéder à un compte. Dans Bitcoin, tu dois seulement prouver que tu contrôles la bonne clé."
              : "In the classical world, you must prove your identity to access an account. In Bitcoin, you only need to prove you control the right key."}
          </p>
          <p>
            {fr
              ? "La propriété devient alors une preuve cryptographique, pas une déclaration"
              : "Ownership then becomes a cryptographic proof, not a declaration"}
            .
          </p>
          <p>
            {fr
              ? "Reviens au graphe des pièces : chacune est verrouillée par une clé, et la dépenser, c'est prouver qu'on la possède."
              : "Back to the coin graph: each one is locked by a key, and spending it means proving you own it."}
          </p>
          <UtxoGraph mode="keys" />
        </Block>
        <Block last>
          <Callout title={fr ? "Et l'adresse dans tout ça ?" : "And what about the address?"}>
            <p>
              {fr
                ? "On entend souvent parler d'adresse Bitcoin."
                : "You'll often hear about Bitcoin addresses."}
            </p>
            <p>
              {fr
                ? "Pour le moment, retiens seulement ceci : une adresse est une forme pratique de destination, généralement dérivée de la clé publique. C'est ce que l'on donne pour recevoir des fonds de manière simple. On creusera tout ça au prochain chapitre."
                : "For now, just remember this: an address is a practical form of destination, usually derived from the public key. It's what you share to receive funds easily. We'll dig into all that in the next chapter."}
            </p>
            <p>
              {fr
                ? "Mais le cœur du système reste ailleurs : "
                : "But the heart of the system lies elsewhere: "}
              {fr
                ? "la clé privée permet de signer, la clé publique permet de vérifier, et la signature prouve le droit de dépenser"
                : "the private key signs, the public key verifies, and the signature proves the right to spend"}
              .
            </p>
          </Callout>
          <p>
            {fr
              ? "Tu sais maintenant comment Bitcoin transforme la propriété en preuve."
              : "You now know how Bitcoin turns ownership into proof."}
          </p>
          <p>
            {fr ? "Reste une dernière question : " : "One last question remains: "}

            {fr
              ? "comment tout cela est-il présenté à l'utilisateur dans la vraie vie ?"
              : "how is all this actually presented to the user in real life?"}
          </p>
          <p>
            {fr ? "Plus concrètement, " : "More concretely, "}
            <i>{fr ? "comment stocke-t-on ces clés" : "how are these keys stored"}</i>,{" "}
            <i>{fr ? "comment génère-t-on une adresse" : "how is an address generated"}</i>
            {fr ? ", et surtout, " : ", and most importantly, "}
            <i>{fr ? "qu'est-ce qu'un portefeuille, exactement ?" : "what exactly is a wallet?"}</i>
          </p>
          <p>
            {fr ? (
              <>
                Direction le prochain chapitre :{" "}
                <Reference to={ROUTE_NAME.Bitcoin_8}>
                  les portefeuilles et la gestion des clés
                </Reference>
                .
              </>
            ) : (
              <>
                Next chapter:{" "}
                <Reference to={ROUTE_NAME.Bitcoin_8}>wallets and key management</Reference>.
              </>
            )}
          </p>
        </Block>
      </BlockReader>
    </PageTemplate>
  );
};
