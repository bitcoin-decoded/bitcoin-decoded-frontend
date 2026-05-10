import { type FC } from "react";

import { Callout, Emphasis, HighlightText } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataUtxo,
  Quiz,
  TransactionModelComparison,
  UTXOTransactionBuilder,
} from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";

export const Bitcoin6Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";

  return (
    <PageTemplate
      title={t("nav.tree.utxoAndTransactions")}
      prelude={
        fr
          ? "Tu t'imagines probablement Bitcoin comme un compte en banque numérique. Un solde qui monte, un solde qui descend, des bitcoins qui voyagent d'un portefeuille à l'autre. Cette image est fausse. Pas approximative : fausse. Et tant que tu la gardes en tête, tu ne comprendras ni ce qu'est un bitcoin, ni comment fonctionne une transaction. On va corriger ça."
          : "You probably imagine Bitcoin as a digital bank account. A balance that goes up, a balance that goes down, bitcoins traveling from one wallet to another. That image is wrong. Not approximate: wrong. And as long as you keep it in mind, you won't understand what a bitcoin is, or how a transaction works. Let's fix that."
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
            Congratulations on making it this far!
            <br /> We've covered many concepts and had the chance to put them into practice.
            Excellent.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Néanmoins, une question reste encore entière :{" "}
            <Emphasis>
              <i>
                « qu'est-ce qu'un bitcoin, au juste ? et que se passe-t-il quand on le dépense ? »
              </i>
            </Emphasis>
          </>
        ) : (
          <>
            One question still lingers:{" "}
            <Emphasis>
              <i>"What exactly is a bitcoin? And what happens when you spend one?"</i>
            </Emphasis>
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
              Dans une banque, la réponse est évidente :{" "}
              <Emphasis>
                ton compte affiche un solde, tu envoies de l'argent, et le système met à jour les
                chiffres
              </Emphasis>
              .
            </>
          ) : (
            <>
              In a bank, the answer is straightforward:{" "}
              <Emphasis>
                your account shows a balance, you send money, and the system updates the numbers
              </Emphasis>
              .
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr
          ? "Imagines qu'Alice veuille virer 1000 € à Bob. Exécutes une transaction dans le système bancaire traditionnel :"
          : "Now imagine Alice wants to send $1000 to Bob. Execute a transaction in the traditional banking system:"}
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
            Quand tu dis « je vais envoyer 1 bitcoin à mon pote » (j'aimerais bien être ton ami),
            tu t'imagines peut-être un objet numérique qui quitte ton portefeuille pour rejoindre
            celui de quelqu'un d'autre. Eh bien, pas tout à fait.
          </>
        ) : (
          <>
            When you say "I'm going to send 1 bitcoin to a friend", you might picture a digital
            object leaving your wallet and arriving in someone else's. Not quite.
          </>
        )}
      </p>
      <p>
        {fr
          ? "C'est un changement de perspective fondamental."
          : "It's a fundamental shift in perspective."}
      </p>
      <p>
        <Emphasis>
          {fr ? (
            <>
              Une transaction Bitcoin n'est pas un virement. Elle repose sur un principe appelé{" "}
              <i>UTXO</i> (<i>Unspent Transaction Output</i>)
            </>
          ) : (
            <>
              A Bitcoin transaction is not a bank transfer. It relies on a principle called{" "}
              <i>UTXO</i> (<i>Unspent Transaction Output</i>)
            </>
          )}
        </Emphasis>
        .
      </p>

      <Callout
        title={fr ? "Le système UTXO expliqué simplement" : "The UTXO system explained simply"}
      >
        <p>{fr ? "Laisses-moi t'expliquer comment ça marche." : "Let me explain how it works."}</p>
        <p>
          <Emphasis>
            {fr ? (
              <>
                Une transaction Bitcoin prend en entrée des sorties non dépensées issues de
                transactions précédentes, puis crée de nouvelles sorties
              </>
            ) : (
              <>
                A Bitcoin transaction takes as input unspent outputs from previous transactions, and
                then creates new outputs
              </>
            )}
          </Emphasis>
          .
        </p>
        <p>
          {fr ? (
            <>
              Ces sorties non dépensées portent un nom :{" "}
              <HighlightText>UTXO (Unspent Transaction Output)</HighlightText>. Elles peuvent être
              vues comme des pièces rangées dans ton portefeuille qui sont indivisibles et qui
              sont prêtes à être dépensées.
            </>
          ) : (
            <>
              These unspent outputs have a name:{" "}
              <HighlightText>UTXOs (Unspent Transaction Outputs)</HighlightText>. Think of them as
              indivisible coins in your wallet, each one ready to be spent.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Le mieux pour comprendre, c'est de manipuler.
            <br /> T'es en possession du portefeuille d'Alice, amuses-toi à simuler une transaction
            :
          </>
        ) : (
          <>
            The best way to understand it is to get hands-on with it.
            <br /> You are in possession of Alice's wallet, have fun simulating a transaction:
          </>
        )}
      </p>
      <UTXOTransactionBuilder />
      <p>
        {fr
          ? " UTXO, c'est posé. On enchaîne sur un concept tout aussi central."
          : "UTXO is now covered. Let's move on to an equally central concept."}
      </p>
      <p>
        <Emphasis>
          {fr
            ? "Ton portefeuille ne contient pas de bitcoins au sens strict : il contient les clés privées qui permettent de les dépenser."
            : "Your wallet doesn't contain bitcoins in the strict sense: it holds the private keys that allow you to spend them"}
        </Emphasis>
        .
      </p>

      <Callout title={fr ? "Le pouvoir des clés" : "The power of keys"}>
        <p>
          {fr
            ? "Chaque UTXO est verrouillé par une condition cryptographique. Pour le dépenser, il faut prouver qu'on possède la clé privée correspondante."
            : "Each UTXO is locked by a cryptographic condition. To spend it, you must prove that you possess the corresponding private key."}
        </p>
        <p>
          {fr
            ? "Cette clé fonctionne comme un titre de propriété : qui la détient peut dépenser l'UTXO."
            : "This key works like a proof of ownership: whoever holds it can spend the UTXO."}
        </p>
        <p>
          {fr
            ? "Réaliser une transaction, c'est donc prouver que l'on a le droit de dépenser un UTXO, puis créer de nouvelles sorties."
            : "Executing a transaction means proving you have the right to spend a UTXO, then creating new outputs."}
        </p>
        <p>
          <Emphasis>
            {fr
              ? "Une transaction Bitcoin n'est pas un déplacement monétaire : c'est un transfert du droit de dépenser."
              : "A Bitcoin transaction is not a monetary movement: it's a transfer of the right to spend."}
          </Emphasis>
        </p>
      </Callout>
      <p>
        {fr
          ? "Imagines maintenant qu'Alice veuille virer 1,3 bitcoin à Bob. Exécutes une transaction dans le système Bitcoin :"
          : "Now imagine Alice wants to send 1.3 bitcoins to Bob. Execute a transaction in the Bitcoin system:"}
      </p>
      <TransactionModelComparison mode="bitcoin" />

      <p>
        {fr
          ? "Et maintenant, petite question de validation. Tentes ta chance."
          : "And now, a quick check question. Give it a try."}
      </p>

      <Quiz {...getQuizDataUtxo(language)} onCorrectAnswer={() => {}} />

      <p>
        {fr ? (
          <>
            Une transaction Bitcoin ne déplace pas un solde. Elle consomme des sorties non
            dépensées, en crée de nouvelles, et transforme la valeur en droits de dépense
            vérifiables.
          </>
        ) : (
          <>
            A Bitcoin transaction does not move a balance. It consumes unspent outputs, creates new
            ones, and transforms value into verifiable spending rights.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Il nous manque néanmoins une pièce importante au puzzle :{" "}
            <i>
              comment le réseau sait-il que tu as vraiment le droit de dépenser ces sorties ?
            </i>{" "}
            et{" "}
            <i>
              comment prouver cette propriété sans compter sur une banque, un compte, ou une
              autorité centrale ?
            </i>
          </>
        ) : (
          <>
            But one important piece of the puzzle is still missing:{" "}
            <i>how does the network know you truly have the right to spend those outputs?</i> And{" "}
            <i>
              how can you prove ownership without relying on a bank, an account, or a central
              authority?
            </i>
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            La réponse tient dans un autre mécanisme fondamental de Bitcoin :{" "}
            <Emphasis>les clés, les signatures, et la cryptographie</Emphasis>.<br /> Direction le
            prochain chapitre, tu tiens le bon bout !
          </>
        ) : (
          <>
            The answer lies in another fundamental mechanism of Bitcoin:{" "}
            <Emphasis>keys, signatures, and cryptography</Emphasis>.<br /> On to the next chapter,
            you're on the right track!
          </>
        )}
      </p>
    </PageTemplate>
  );
};
