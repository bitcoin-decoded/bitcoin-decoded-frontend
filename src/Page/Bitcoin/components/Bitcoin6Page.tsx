import { type FC } from "react";

import { ChevronDown } from "lucide-react";

import { Callout, Disclosure, HighlightText, Reference } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  getQuizDataUtxo,
  Quiz,
  TransactionModelComparison,
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
            Une transaction Bitcoin n'est pas un virement. Elle repose sur un principe appelé{" "}
            <i>UTXO</i> (<i>Unspent Transaction Output</i>)
          </>
        ) : (
          <>
            A Bitcoin transaction is not a wire transfer. It relies on a principle called{" "}
            <i>UTXO</i> (<i>Unspent Transaction Output</i>)
          </>
        )}
        .
      </p>

      <Disclosure
        title={
          fr
            ? "Attends tu racontes quoi, Bitcoin ne déplace pas d'argent. Mon pote il reçoit quoi alors, des fleurs ?!"
            : "Hold on, Bitcoin doesn't move money? So what does my friend get, flowers?!"
        }
        icon={<ChevronDown size={13} strokeWidth={2} />}
      >
        <p>
          {fr
            ? "Alors oui, ton ami reçoit bien quelque chose qui a de la valeur, et ce ne sont pas des fleurs non plus je te rassure !"
            : "Yes, your friend does get something with real value, and no, it's not flowers either, don't worry."}
        </p>
        <p>
          {fr
            ? "Ce qui n'existe pas dans Bitcoin, c'est un solde central qu'on incrémente d'un côté et décrémente de l'autre. Il n'y a pas de registre de comptes comme dans une banque."
            : "What doesn't exist in Bitcoin is a central balance you increment on one side and decrement on the other. There's no account ledger like in a bank."}
        </p>
        <p>
          {fr
            ? "La valeur change bien de mains, mais le mécanisme est très différent. Tu vas voir comment juste après."
            : "Value does change hands, but the mechanism is very different. You'll see how just below."}
        </p>
      </Disclosure>

      <p>
        {fr ? (
          <>
            Pour comprendre, le mieux c'est de le voir en pratique. Tu peux voir un{" "}
            <HighlightText>UTXO</HighlightText> comme une pièce rangée dans ton portefeuille :
            indivisible, prête à être dépensée.
          </>
        ) : (
          <>
            Best way to understand it: in practice. Think of a <HighlightText>UTXO</HighlightText>{" "}
            as a coin sitting in your wallet: indivisible, ready to be spent.
          </>
        )}
      </p>
      <p>
        {fr
          ? "Tu es en possession du portefeuille de Nicolas, amuse-toi à simuler une transaction :"
          : "You're holding Nicolas's wallet. Have a go at simulating a transaction:"}
      </p>
      <UTXOTransactionBuilder />
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
          ? "Imagine maintenant que Nicolas veuille virer 1,3 bitcoin à Mme Michu. Exécute une transaction dans le système Bitcoin :"
          : "Now imagine Nicolas wants to send 1.3 bitcoins to Ms. Smith. Run a transaction in the Bitcoin system:"}
      </p>
      <TransactionModelComparison mode="bitcoin" />

      <p>
        {fr
          ? "Et maintenant, petite question de validation. Tente ta chance."
          : "And now, a quick check question. Take a shot."}
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
            ones, and turns value into verifiable spending rights.
          </>
        )}
      </p>
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
            <Reference to={ROUTE_NAME.Bitcoin_7}>keys, signatures, and cryptography</Reference>
            .<br /> On to the next chapter, you're nearly there!
          </>
        )}
      </p>
    </PageTemplate>
  );
};
