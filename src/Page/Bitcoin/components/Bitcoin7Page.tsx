import { type FC } from "react";

import { Callout, Emphasis, HighlightText } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { SignaturePlayground } from "../../../Interactive";
import { PageTemplate } from "../../Shared";

export const Bitcoin7Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.keysAndSignatures")}
      prelude={
        fr
          ? "Une transaction Bitcoin ne demande jamais qui vous êtes. Elle demande seulement si vous pouvez prouver que vous avez le droit de dépenser une sortie. Cette preuve repose sur trois objets : une clé privée, une clé publique et une signature. C'est ici qu'entrent en jeu les clés."
          : "A Bitcoin transaction never asks who you are. It only asks whether you can prove you have the right to spend an output. This proof relies on three objects: a private key, a public key, and a signature. This is where keys come in."
      }
    >
      <Callout title={fr ? "Trois éléments, trois rôles" : "Three elements, three roles"}>
        <p>
          {fr
            ? "Une transaction Bitcoin repose sur trois objets qu'il faut bien distinguer :"
            : "A Bitcoin transaction relies on three objects you need to clearly distinguish:"}
        </p>
        <ol>
          <li>
            <Emphasis>
              <HighlightText>{fr ? "Clé privée" : "Private key"}</HighlightText>
              {fr
                ? " : ne doit jamais être divulguée, elle permet de produire une signature"
                : ": must never be shared, it lets you produce a signature"}
            </Emphasis>
            .
          </li>
          <li>
            <Emphasis>
              <HighlightText>{fr ? "Clé publique" : "Public key"}</HighlightText>
              {fr
                ? " : dérivée de la clé privée, elle permet de vérifier une signature"
                : ": derived from the private key, it lets you verify a signature"}
            </Emphasis>
            .
          </li>
          <li>
            <Emphasis>
              <HighlightText>{fr ? "Signature" : "Signature"}</HighlightText>
              {fr
                ? " : preuve produite à partir de la clé privée pour un message donné"
                : ": a proof produced from the private key for a given message"}
            </Emphasis>
            .
          </li>
        </ol>
      </Callout>

      <p>
        {fr
          ? "Ceci étant vu, passons à la pratique."
          : "With that said, let's move on to practice."}
      </p>

      <Callout
        title={
          fr
            ? "M. Nicolas QuiPaye réalise sa première transaction"
            : "Mr. Nicolas the Payer makes his first transaction"
        }
      >
        <p>
          {fr ? (
            <>
              Notre bon vieil ami <i>Nicolas</i> est de retour. Il étudie Bitcoin et décide de
              réaliser sa toute première transaction en bitcoin.
            </>
          ) : (
            <>
              Our good old friend <i>Nicolas</i> is back. He's studying Bitcoin and decides to make
              his very first bitcoin transaction.
            </>
          )}
        </p>
        <p>
          {fr ? (
            <>
              Il possède une clé privée :{" "}
              <Emphasis>
                <HighlightText>L4mX9pQ2zV7nK3rT8yH1sF6dJ5aW0cB</HighlightText>
              </Emphasis>{" "}
              et souhaite envoyer 1 bitcoin à <i>Mme Michu</i>.
            </>
          ) : (
            <>
              He owns a private key:{" "}
              <Emphasis>
                <HighlightText>L4mX9pQ2zV7nK3rT8yH1sF6dJ5aW0cB</HighlightText>
              </Emphasis>{" "}
              and wants to send 1 bitcoin to <i>Ms. Michu</i>.
            </>
          )}
        </p>
      </Callout>

      <p>
        {fr
          ? "Interagissez avec les éléments ci-dessous pour comprendre comment clés privées, clés publiques et signatures fonctionnent ensemble :"
          : "Interact with the elements below to understand how private keys, public keys and signatures work together:"}
      </p>
      <SignaturePlayground />

      <p>
        {fr
          ? "Ce mécanisme change complètement la logique de propriété."
          : "This mechanism completely changes the logic of ownership."}
      </p>
      <p>
        {fr
          ? "Dans le monde classique, vous devez prouver votre identité pour accéder à un compte. Dans Bitcoin, vous devez seulement prouver que vous contrôlez la bonne clé."
          : "In the classical world, you must prove your identity to access an account. In Bitcoin, you only need to prove you control the right key."}
      </p>
      <p>
        <Emphasis>
          {fr
            ? "La propriété devient alors une preuve cryptographique, pas une déclaration"
            : "Ownership thus becomes a cryptographic proof, not a declaration"}
        </Emphasis>
        .
      </p>

      <Callout title={fr ? "Et l'adresse dans tout ça ?" : "What about the address?"}>
        <p>
          {fr
            ? "On entend souvent parler d'adresse Bitcoin."
            : "We often hear about Bitcoin addresses."}
        </p>
        <p>
          {fr
            ? "Pour le moment, retenez seulement ceci : une adresse est une forme pratique de destination. C'est ce que l'on donne pour recevoir des fonds de manière simple."
            : "For now, just remember this: an address is a practical form of destination. It's what you share to receive funds easily."}
        </p>
        <p>
          {fr
            ? "Mais le cœur du système reste ailleurs : "
            : "But the heart of the system lies elsewhere: "}
          <Emphasis>
            {fr
              ? "la clé privée permet de signer, la clé publique permet de vérifier, et la signature prouve le droit de dépenser"
              : "the private key signs, the public key verifies, and the signature proves the right to spend"}
          </Emphasis>
          .
        </p>
      </Callout>

      <p>
        {fr
          ? "Nous savons maintenant comment Bitcoin transforme la propriété en preuve."
          : "We now know how Bitcoin turns ownership into proof."}
      </p>
      <p>
        {fr
          ? "Afin de boucler la boucle, il nous reste une dernière question en suspens : "
          : "To close the loop, one final question remains: "}
        <Emphasis>
          {fr
            ? "comment tout cela est-il présenté à l'utilisateur dans la vraie vie ?"
            : "how is all of this presented to the user in real life?"}
        </Emphasis>
      </p>
      <p>
        {fr ? "Plus concrètement, " : "More concretely, "}
        <i>{fr ? "comment stocke-t-on ces clés" : "how are these keys stored"}</i>,{" "}
        <i>{fr ? "comment génère-t-on une adresse" : "how is an address generated"}</i>
        {fr ? ", et surtout, " : ", and most importantly, "}
        <i>{fr ? "qu'est-ce qu'un portefeuille, exactement ?" : "what exactly is a wallet?"}</i>
      </p>
      <p>
        {fr
          ? "Direction le prochain chapitre : les portefeuilles et la gestion des clés."
          : "Heading to the next chapter: wallets and key management."}
      </p>
    </PageTemplate>
  );
};
