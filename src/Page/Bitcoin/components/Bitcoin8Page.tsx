import { type FC } from "react";

import { Callout, Disclosure, HighlightText } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { SeedGenerator, UtxoGraph, WalletDiscoveryGame } from "../../../Interactive";
import { PageTemplate } from "../../Shared";

export const Bitcoin8Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.walletsAndSeed")}
      prelude={
        fr
          ? "Si tu perds ta seed sans sauvegarde, tu perds tes bitcoins. Pas une partie. Tout. Ça paraît absurde : pourquoi 12 mots décident-ils de qui possède quoi ? Parce qu'un portefeuille Bitcoin ne contient pas des bitcoins. Il contient ce qu'il faut pour les dépenser."
          : "Lose your seed without a backup, and your bitcoins are gone. Not part of them. All of them. Sounds absurd: why should 12 words decide who owns what? Because a Bitcoin wallet does not hold bitcoins. It holds what is needed to spend them."
      }
    >
      <p>
        {fr
          ? "Quand on parle de portefeuille Bitcoin, on mélange souvent plusieurs notions."
          : "When people talk about a Bitcoin wallet, several ideas usually get tangled together."}
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
            ... it all sounds connected, but the picture stays blurry.
          </>
        )}
      </p>
      <p>{fr ? "Remettons les choses dans l'ordre." : "Let's put things back in order."}</p>

      <Callout title={fr ? "Une seed, un point de départ" : "A seed, a starting point"}>
        <p>
          {fr
            ? "Une seed phrase est une suite de mots que tu peux noter, sauvegarder et restaurer"
            : "A seed phrase is a sequence of words you can write down, back up, and restore"}
          .
        </p>
        <p>
          {fr ? "Elle constitue la racine de tout le reste." : "It's the root of everything else."}
        </p>
        <p>
          {fr
            ? "À partir d'elle, le portefeuille dérive un grand nombre de clés privées. Chaque clé privée donne une clé publique, puis une adresse."
            : "From it, the wallet derives a large number of private keys. Each private key yields a public key, and from that, an address."}
        </p>
        <p>
          {fr
            ? "Et c'est à ces adresses que les UTXO sont rattachés."
            : "And it's to these addresses that UTXOs are attached."}
        </p>
        <p>{fr ? "On peut résumer ainsi :" : "Here's the chain, in short:"}</p>
        <ol>
          <li>{fr ? "La seed est la racine" : "The seed is the root"}</li>
          <li>{fr ? "Les clés en sont dérivées" : "The keys are derived from it"}</li>
          <li>{fr ? "Les adresses en découlent" : "The addresses follow"}</li>
          <li>
            {fr ? "Et les UTXO arrivent sur ces adresses" : "And the UTXOs land on those addresses"}
          </li>
        </ol>
      </Callout>

      <p>
        {fr
          ? "Avant d'aller plus loin, regardons à quoi ressemble concrètement une seed phrase, et comment elle représente une information binaire."
          : "Before going further, let's look at what a seed phrase actually looks like, and how it encodes binary information."}
      </p>
      <SeedGenerator />

      <Callout
        title={fr ? "Ce que fait réellement un portefeuille" : "What a wallet actually does"}
      >
        <p>
          {fr
            ? "Un portefeuille n'est pas magique. Il suit une logique claire :"
            : "A wallet isn't magic. It follows a clear logic:"}
        </p>
        <ol>
          <li>{fr ? "Il dérive des clés à partir de la seed" : "It derives keys from the seed"}</li>
          <li>
            {fr ? "Il génère les adresses correspondantes" : "It generates the matching addresses"}
          </li>
          <li>
            {fr
              ? "Il repère les UTXO reçus sur ces adresses"
              : "It tracks the UTXOs received at those addresses"}
          </li>
          <li>
            {fr
              ? "Et il affiche une vue simplifiée de ce que tu contrôles"
              : "And it displays a simplified view of what you control"}
          </li>
        </ol>
        <p>
          {fr
            ? "Ce qu'il appelle « solde » n'est pas un solde bancaire."
            : 'What it calls a "balance" is not a bank balance.'}
        </p>
        <p>
          {fr
            ? "C'est une agrégation des UTXO que tes clés permettent de dépenser"
            : "It's an aggregation of the UTXOs your keys can spend"}
          .
        </p>
        <p>
          {fr
            ? "Autrement dit : dans un portefeuille classique, tout part de la seed. Elle permet de retrouver les clés, et donc de contrôler les UTXO associés aux adresses correspondantes."
            : "In other words: in a classic wallet, everything starts with the seed. It rebuilds the keys, and through them, you control the UTXOs tied to the matching addresses."}
        </p>
      </Callout>

      <p>
        {fr
          ? "Regarde ce que ton portefeuille appelle « solde » :"
          : 'Here\'s what your wallet calls a "balance":'}
      </p>
      <UtxoGraph mode="wallet" />

      <p>
        {fr
          ? "Du point de vue de l'utilisateur, tout cela est invisible."
          : "From the user's point of view, none of this is visible."}
      </p>
      <p>
        {fr ? (
          <>
            Tu ouvres ton portefeuille, et tu vois : <HighlightText>une adresse</HighlightText>,{" "}
            <HighlightText>un montant</HighlightText>, <HighlightText>un historique</HighlightText>,{" "}
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
            Mais derrière l'interface, le portefeuille gère toute la complexité, c'est-à-dire{" "}
            <HighlightText>la seed</HighlightText>, <HighlightText>la dérivation</HighlightText>,{" "}
            <HighlightText>les clés</HighlightText>, <HighlightText>les adresses</HighlightText>,{" "}
            <HighlightText>les UTXO</HighlightText> et bien entendu{" "}
            <HighlightText>les signatures</HighlightText>.
          </>
        ) : (
          <>
            But behind the interface, the wallet handles the whole machinery, namely{" "}
            <HighlightText>the seed</HighlightText>, <HighlightText>derivation</HighlightText>,{" "}
            <HighlightText>the keys</HighlightText>, <HighlightText>the addresses</HighlightText>,{" "}
            <HighlightText>the UTXOs</HighlightText> and, of course,{" "}
            <HighlightText>the signatures</HighlightText>.
          </>
        )}
      </p>

      <Callout
        title={
          fr
            ? "Défi : Retrouves les fonds dans un portefeuille"
            : "Challenge: find the funds in a wallet"
        }
      >
        <p>
          {fr
            ? "À ce stade, tu as tous les éléments en tête. Voyons maintenant si tu peux les reconnaître en pratique."
            : "At this point, you have all the pieces in mind. Time to see if you can spot them in practice."}
        </p>
        <p>
          {fr
            ? "Pour ce défi, tu vas être en possession d'une seed te permettant de générer trois clés. Une seule contrôle des fonds dépensables."
            : "For this challenge, you're given a seed that lets you generate three keys. Only one controls spendable funds."}
        </p>
        <p>{fr ? "Sauras-tu la retrouver ?" : "Can you find which one?"}</p>
        <Disclosure
          title={
            fr
              ? "Avant de jouer : un mot sur la sécurité"
              : "Before you play: a quick wword on security"
          }
        >
          <p>
            {fr
              ? "Dans un vrai portefeuille, tu ne vois jamais tes clés privées comme ici. Elles restent cachées. Si une application te les affiche en clair, fuis. Et ne les communique à personne, jamais."
              : "In a real wallet, you never see your private keys like this. They stay hidden. If an app ever shows them to you in plain sight, walk away. And never share them with anyone, ever."}
          </p>
        </Disclosure>
      </Callout>
      <WalletDiscoveryGame />

      <p>
        {fr
          ? "En conclusion, une seed permet de reconstruire tout un portefeuille."
          : "To wrap up: a seed lets you rebuild an entire wallet."}
      </p>
      <p>
        {fr
          ? "Un portefeuille dérive des clés, génère des adresses, repère les UTXO associés, et affiche une vue simplifiée de ce que tu contrôles vraiment."
          : "A wallet derives keys, generates addresses, tracks the matching UTXOs, and shows a simplified view of what you really control."}
      </p>
      <p>
        {fr
          ? "Au niveau du protocole, Bitcoin ne fonctionne pas comme un système de comptes. C'est un système de clés, de droits de dépense et de preuves cryptographiques."
          : "At the protocol level, Bitcoin doesn't run on accounts. It runs on keys, spending rights, and cryptographic proofs."}
      </p>
      <p>
        {fr
          ? "Et c'est précisément ce qui le rend exigeant, élégant, radicalement différent d'un système bancaire."
          : "And that's exactly what makes it demanding, elegant, and radically different from a banking system."}
      </p>
    </PageTemplate>
  );
};
