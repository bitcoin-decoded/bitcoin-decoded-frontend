import { type FC } from "react";

import { Callout, Emphasis, HighlightText } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { SeedGenerator, WalletDiscoveryGame } from "../../../Interactive";
import { PageTemplate } from "../../Shared";

export const Bitcoin8Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.walletsAndSeed")}
      prelude={
        fr
          ? "Un portefeuille Bitcoin ne contient pas des bitcoins. Il contient ce qu'il faut pour les dépenser. Pour comprendre comment, il faut remonter à la racine : la seed."
          : "A Bitcoin wallet doesn't contain bitcoins. It contains what's needed to spend them. To understand how, you have to go back to the root: the seed."
      }
    >
      <p>
        {fr
          ? "Quand on parle de portefeuille Bitcoin, on mélange souvent plusieurs notions."
          : "When we talk about a Bitcoin wallet, we often mix up several concepts."}
      </p>
      <p>
        {fr ? (
          <>
            <HighlightText>
              <i>Un portefeuille</i>
            </HighlightText>
            ,{" "}
            <HighlightText>
              <i>une seed</i>
            </HighlightText>
            ,{" "}
            <i>
              <HighlightText>une adresse</HighlightText>
            </i>
            ... tout semble lié, mais sans être très clair.
          </>
        ) : (
          <>
            <HighlightText>
              <i>A wallet</i>
            </HighlightText>
            ,{" "}
            <HighlightText>
              <i>a seed</i>
            </HighlightText>
            ,{" "}
            <i>
              <HighlightText>an address</HighlightText>
            </i>
            ... it all seems connected, yet not entirely clear.
          </>
        )}
      </p>
      <p>
        {fr ? "Remettons simplement les choses dans l'ordre." : "Let's simply put things in order."}
      </p>

      <Callout title={fr ? "Une seed, un point de départ" : "A seed, a starting point"}>
        <p>
          <Emphasis>
            {fr
              ? "Une seed phrase est une suite de mots que vous pouvez noter, sauvegarder et restaurer"
              : "A seed phrase is a sequence of words that you can write down, save, and restore"}
          </Emphasis>
          .
        </p>
        <p>
          {fr ? "Elle constitue la racine de tout le reste." : "It is the root of everything else."}
        </p>
        <p>
          {fr
            ? "À partir d'elle, le portefeuille peut dériver un grand nombre de clés privées. Chaque clé privée donne une clé publique, puis une adresse."
            : "From it, the wallet can derive a large number of private keys. Each private key yields a public key, then an address."}
        </p>
        <p>
          {fr
            ? "Et c'est sur ces adresses que les UTXO sont reçus."
            : "And it's on these addresses that the UTXOs are received."}
        </p>
        <p>{fr ? "On peut résumer simplement :" : "We can sum it up simply:"}</p>
        <ol>
          <li>{fr ? "La seed est la racine" : "The seed is the root"}</li>
          <li>{fr ? "Les clés en sont dérivées" : "The keys are derived from it"}</li>
          <li>{fr ? "Les adresses en découlent" : "The addresses follow from those"}</li>
          <li>
            {fr ? "Et les UTXO arrivent sur ces adresses" : "And the UTXOs land on those addresses"}
          </li>
        </ol>
      </Callout>

      <p>
        {fr
          ? "Avant d'aller plus loin, regardons à quoi ressemble concrètement une seed phrase, et comment elle représente une information binaire."
          : "Before going further, let's look at what a seed phrase actually looks like, and how it represents binary information."}
      </p>
      <SeedGenerator />

      <Callout title={fr ? "Ce que fait réellement un portefeuille" : "What a wallet actually does"}>
        <p>
          {fr
            ? "Un portefeuille n'est pas magique. Il suit une logique simple :"
            : "A wallet isn't magic. It follows a simple logic:"}
        </p>
        <ol>
          <li>{fr ? "Il dérive des clés à partir de la seed" : "It derives keys from the seed"}</li>
          <li>
            {fr ? "Il génère les adresses correspondantes" : "It generates the matching addresses"}
          </li>
          <li>
            {fr
              ? "Il repère les UTXO reçus sur ces adresses"
              : "It tracks the UTXOs received on those addresses"}
          </li>
          <li>
            <Emphasis>
              {fr
                ? "Et il affiche une vue simplifiée de ce que vous contrôlez"
                : "And it displays a simplified view of what you control"}
            </Emphasis>
          </li>
        </ol>
        <p>
          {fr
            ? "Ce qu'il appelle « solde » n'est pas un solde bancaire."
            : 'What it calls "balance" is not a bank balance.'}
        </p>
        <p>
          <Emphasis>
            {fr
              ? "C'est une agrégation des UTXO que vos clés permettent de dépenser"
              : "It's an aggregation of the UTXOs your keys can spend"}
          </Emphasis>
          .
        </p>
        <p>
          {fr
            ? "Autrement dit : un portefeuille, c'est simplement une seed qui permet de retrouver des clés, et donc de contrôler les UTXO associés aux adresses correspondantes."
            : "In other words: a wallet is simply a seed that lets you recover keys, and thus control the UTXOs associated with the matching addresses."}
        </p>
      </Callout>

      <p>
        {fr
          ? "Du point de vue de l'utilisateur, tout cela est invisible."
          : "From the user's point of view, all of this is invisible."}
      </p>
      <p>
        {fr ? (
          <>
            Vous ouvrez votre portefeuille, et vous voyez :{" "}
            <HighlightText>une adresse</HighlightText>, <HighlightText>un montant</HighlightText>,{" "}
            <HighlightText>un historique</HighlightText>,{" "}
            <HighlightText>un bouton « Recevoir »</HighlightText>,{" "}
            <HighlightText>un bouton « Envoyer »</HighlightText>.
          </>
        ) : (
          <>
            You open your wallet, and you see: <HighlightText>an address</HighlightText>,{" "}
            <HighlightText>an amount</HighlightText>, <HighlightText>a history</HighlightText>,{" "}
            <HighlightText>a "Receive" button</HighlightText>,{" "}
            <HighlightText>a "Send" button</HighlightText>.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Mais derrière cette interface sympa, le portefeuille gère toute la complexité,
            c'est-à-dire <HighlightText>la seed</HighlightText>,{" "}
            <HighlightText>la dérivation</HighlightText>, <HighlightText>les clés</HighlightText>,{" "}
            <HighlightText>les adresses</HighlightText>, <HighlightText>les UTXO</HighlightText> et
            bien entendu <HighlightText>les signatures</HighlightText>.
          </>
        ) : (
          <>
            But behind that friendly interface, the wallet handles all the complexity, that is{" "}
            <HighlightText>the seed</HighlightText>, <HighlightText>derivation</HighlightText>,{" "}
            <HighlightText>the keys</HighlightText>, <HighlightText>the addresses</HighlightText>,{" "}
            <HighlightText>the UTXOs</HighlightText> and of course{" "}
            <HighlightText>the signatures</HighlightText>.
          </>
        )}
      </p>

      <Callout
        title={
          fr
            ? "Défi : Retrouvez les fonds dans un portefeuille"
            : "Challenge: find the funds in a wallet"
        }
      >
        <p>
          {fr
            ? "À ce stade, vous avez tous les éléments en tête. Voyons maintenant si vous pouvez les reconnaître en pratique."
            : "At this point, you have all the pieces in mind. Let's see if you can recognize them in practice."}
        </p>
        <p>
          {fr
            ? "Pour ce défi, vous allez être en possession d'une seed vous permettant de générer trois clés. Une seule permet de dépenser des fonds."
            : "For this challenge, you'll be given a seed that lets you generate three keys. Only one allows you to spend funds."}
        </p>
        <p>{fr ? "Saurez-vous la retrouver ?" : "Can you find it?"}</p>
      </Callout>
      <WalletDiscoveryGame />

      <p>
        {fr
          ? "En conclusion, une seed permet de reconstruire tout un portefeuille."
          : "In conclusion, a seed lets you rebuild an entire wallet."}
      </p>
      <p>
        {fr
          ? "Un portefeuille dérive des clés, génère des adresses, repère les UTXO associés, et affiche une vue simplifiée de ce que vous contrôlez vraiment."
          : "A wallet derives keys, generates addresses, tracks the associated UTXOs, and displays a simplified view of what you actually control."}
      </p>
      <p>
        {fr
          ? "Bitcoin n'est donc pas un système de comptes, mais un ingénieux système de clés, de droits de dépense et de preuves cryptographiques."
          : "Bitcoin is therefore not an account system, but a clever system of keys, spending rights and cryptographic proofs."}
      </p>
      <p>
        {fr
          ? "Et vous savez quoi ? C'est précisément ce qui le rend à la fois exigeant, élégant et radicalement différent d'un système bancaire."
          : "And you know what? That's precisely what makes it demanding, elegant, and radically different from a banking system."}
      </p>
    </PageTemplate>
  );
};
