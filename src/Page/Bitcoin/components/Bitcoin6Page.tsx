import { type FC } from "react";

import { Callout, HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataUtxo,
  Quiz,
  TransactionModelComparison,
  UtxoGraph,
  UTXOTransactionBuilder,
} from "../../../Interactive";
import { ROUTE_NAME } from "../../../Routing";
import { PageTemplate } from "../../Shared/";

export const Bitcoin6Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.utxoAndTransactions")}
      prelude={
        fr
          ? "Tu imagines probablement Bitcoin comme un compte en banque numérique. Un solde qui monte, un solde qui descend, des bitcoins qui voyagent d'un portefeuille à l'autre. Cette image est fausse. Pas approximative : fausse. Et tant que tu la gardes en tête, tu ne comprendras ni ce qu'est un bitcoin, ni comment fonctionne une transaction. On va corriger ça."
          : "You probably picture Bitcoin as a digital bank account. A balance that goes up, a balance that goes down, bitcoins traveling from one wallet to another. That picture is wrong. Not approximate: wrong. And as long as you keep it in mind, you won't understand what a bitcoin is, or how a transaction works. Let's fix that."
      }
    >
      <p>
        {fr ? (
          <>
            Félicitations pour en être arrivé jusque-là !<br /> Nous avons abordé de nombreux
            concepts que nous avons pu mettre en pratique. Génial.
          </>
        ) : (
          <>
            Congrats for making it this far!
            <br /> We've covered a lot of ground and put it into practice. Nice work.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Néanmoins, une question reste encore entière :{" "}
            <i>
              « qu'est-ce qu'un bitcoin, au juste ? et que se passe-t-il quand on le dépense ? »
            </i>
          </>
        ) : (
          <>
            But one question is still open:{" "}
            <i>"What exactly is a bitcoin? And what happens when you spend one?"</i>
          </>
        )}
      </p>

      <Callout
        title={
          fr
            ? "Les transactions sur Bitcoin, un nouveau paradigme"
            : "Bitcoin transactions: a new paradigm"
        }
      >
        <p>
          {fr ? (
            <>
              Dans une banque, la réponse est évidente : ton compte affiche un solde, tu envoies de
              l'argent, et le système met à jour les chiffres.
            </>
          ) : (
            <>
              In a bank, the answer is obvious: your account shows a balance, you send money, and
              the system updates the numbers.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr
          ? "Imagine que Nicolas veuille virer 1 000 € à Mme Michu. Exécute une transaction dans le système bancaire traditionnel :"
          : "Imagine Nicolas wants to send €1,000 to Ms. Smith. Run a transaction in the traditional banking system:"}
      </p>
      <TransactionModelComparison mode="bank" />

      <p>
        {fr
          ? "Bitcoin, lui, ne fonctionne pas du tout comme ça."
          : "Bitcoin doesn't work that way at all."}
      </p>
      <p>
        {fr ? (
          <>
            Quand tu dis « je vais envoyer 1 bitcoin à mon pote » (j'aimerais bien être ton ami), tu
            imagines peut-être un objet numérique qui quitte ton portefeuille pour rejoindre celui
            de quelqu'un d'autre. Eh bien, pas tout à fait.
          </>
        ) : (
          <>
            When you say "I'm going to send 1 bitcoin to a friend" (wish I had friends like that),
            you might picture a digital object leaving your wallet and arriving in someone else's.
            Well, not quite.
          </>
        )}
      </p>
      <p>
        {fr
          ? "C'est un changement de perspective fondamental."
          : "It's a fundamental shift in perspective."}
      </p>

      <p>
        {fr ? (
          <>
            Avant de poser le moindre mot savant, manipule. Oublie le solde : imagine que le
            portefeuille de Nicolas ne contient pas un nombre, mais des <i>pièces</i> de valeurs
            fixes (0.8, 1, 0.5 et 2), chacune <HighlightText>indivisible</HighlightText>. Pour
            payer, il faut piocher dans ces pièces et les combiner.
          </>
        ) : (
          <>
            Before we drop a single piece of jargon, get hands-on. Forget the balance: imagine
            Nicolas's wallet doesn't hold a number, but <i>coins</i> of fixed values — 0.8, 1, 0.5
            and 2 — each of them <HighlightText>indivisible</HighlightText>. To pay, you have to
            pick from these coins and combine them.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Nicolas veut envoyer 1.3 BTC à Mme Michu. À toi de jouer : compose le paiement."
          : "Nicolas wants to send 1.3 BTC to Ms. Smith. Your turn: put the payment together."}
      </p>
      <UTXOTransactionBuilder lockedAmount="1.3" />
      <p>
        {fr ? (
          <>
            Tu viens de le sentir : on ne coupe pas une pièce en deux. Pour atteindre un total de
            1.3 BTC, tu assembles des pièces entières (par exemple : 0,8 BTC + 1 BTC), et quand le
            compte n'est pas juste, le surplus te revient en monnaie.
          </>
        ) : (
          <>
            You just felt it: you can't cut a coin in half. To reach a total of 1.3 BTC, you
            assemble whole coins (for example: 0.8 BTC + 1 BTC), and when the amount isn't exact,
            the surplus comes back to you as change.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Ces « pièces » ont un nom : un <i>UTXO</i> (<i>Unspent Transaction Output</i>). Une
            transaction Bitcoin n'est pas un virement : elle consomme des pièces existantes et en
            recrée de nouvelles. Tu peux voir un <HighlightText>UTXO</HighlightText> comme une pièce
            rangée dans ton portefeuille : indivisible, prête à être dépensée.
          </>
        ) : (
          <>
            These "coins" have a name: a <i>UTXO</i> (<i>Unspent Transaction Output</i>). A Bitcoin
            transaction is not a wire transfer: it consumes existing coins and creates new ones.
            Think of a <HighlightText>UTXO</HighlightText> as a coin sitting in your wallet:
            indivisible, ready to be spent.
          </>
        )}
      </p>

      <p>
        {fr
          ? "UTXO, c'est posé. On enchaîne sur un concept tout aussi central."
          : "UTXO is on the table. Let's move on to an equally central concept."}
      </p>
      <p>
        {fr ? (
          <>
            Ton portefeuille ne stocke aucun bitcoin. Étrange, hein ? Plus précisément : il ne
            stocke pas tes bitcoins comme des fichiers sont stockés sur ton ordi. Il stocke en
            réalité{" "}
            <HighlightText>les clés privées qui te permettent de dépenser tes UTXO.</HighlightText>
          </>
        ) : (
          <>
            Your wallet stores zero bitcoins. Weird, right? More precisely: it doesn't store your
            bitcoins the way files are stored on your computer. What it actually stores is{" "}
            <HighlightText>the private keys that let you spend your UTXOs.</HighlightText>
          </>
        )}
      </p>

      <Callout title={fr ? "Le pouvoir des clés" : "The power of keys"}>
        <p>
          {fr
            ? "Chaque UTXO est verrouillé par une condition cryptographique. Pour le dépenser, il faut prouver qu'on possède la clé privée correspondante."
            : "Each UTXO is locked by a cryptographic condition. To spend it, you have to prove you own the matching private key."}
        </p>
        <p>
          {fr
            ? "Cette clé fonctionne comme un titre de propriété : qui la détient peut dépenser l'UTXO."
            : "This key works like a deed of ownership: whoever holds it can spend the UTXO."}
        </p>
        <p>
          {fr
            ? "Réaliser une transaction, c'est donc prouver que l'on a le droit de dépenser un UTXO, puis créer de nouvelles sorties."
            : "Running a transaction means proving you have the right to spend a UTXO, then creating new outputs."}
        </p>
        <p>
          {fr
            ? "Une transaction Bitcoin n'est pas un déplacement monétaire : c'est un transfert du droit de dépenser."
            : "A Bitcoin transaction is not a money movement: it's a transfer of the right to spend."}
        </p>
      </Callout>
      <p>
        {fr
          ? "Reprenons la même transaction, vue cette fois côté entrées et sorties :"
          : "Let's take the same transaction again, this time from the inputs-and-outputs angle:"}
      </p>
      <TransactionModelComparison mode="bitcoin" />

      <p>
        {fr
          ? "Et maintenant, petite question de validation. Tente ta chance."
          : "And now, a quick check question. Take a shot."}
      </p>

      <Quiz {...getQuizDataUtxo(language)} onCorrectAnswer={() => {}} />

      <p>
        {fr
          ? "Le modèle à garder en tête, en une image :"
          : "The model to keep in mind, in one picture:"}
      </p>
      <UtxoGraph mode="intro" />
      <p>
        {fr ? (
          <>
            Il nous manque néanmoins une pièce importante au puzzle :{" "}
            <i>comment le réseau sait-il que tu as vraiment le droit de dépenser ces sorties ?</i>{" "}
            et{" "}
            <i>
              comment prouver cette propriété sans compter sur une banque, un compte, ou une
              autorité centrale ?
            </i>
          </>
        ) : (
          <>
            But one important piece of the puzzle is still missing:{" "}
            <i>how does the network know you actually have the right to spend those outputs?</i> And{" "}
            <i>
              how do you prove that ownership without relying on a bank, an account, or a central
              authority?
            </i>
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            La réponse tient dans un autre mécanisme fondamental de Bitcoin :{" "}
            <Reference to={ROUTE_NAME.Bitcoin_7}>
              les clés, les signatures, et la cryptographie
            </Reference>
            .<br /> Direction le prochain chapitre, tu tiens le bon bout !
          </>
        ) : (
          <>
            The answer sits in another fundamental mechanism of Bitcoin:{" "}
            <Reference to={ROUTE_NAME.Bitcoin_7}>keys, signatures, and cryptography</Reference>.
            <br /> On to the next chapter, you're nearly there!
          </>
        )}
      </p>
    </PageTemplate>
  );
};
