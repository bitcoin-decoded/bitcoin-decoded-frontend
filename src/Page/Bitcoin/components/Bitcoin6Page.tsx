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
          ? "Dans le système bancaire, une transaction déplace un solde d'un compte à un autre. Sur Bitcoin, le paradigme est différent : on ne déplace pas de l'argent, on transfère un droit de dépense. Ces droits sont contrôlés par des clés, que votre portefeuille conserve. Ce mécanisme porte un nom : le modèle UTXO."
          : "In the banking system, a transaction moves a balance from one account to another. In Bitcoin, the paradigm is different: money is not moved, but a right to spend is transferred. These rights are controlled by keys stored in your wallet. This mechanism has a name: the UTXO model."
      }
    >
      <p>
        {fr ? (
          <>
            Félicitations pour en être arrivé jusque là !<br /> Nous avons abordé de nombreux
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
                « qu'est-ce qu'un bitcoin, au juste ? et que se passe t-il quand on le dépense ? »
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
                votre compte affiche un solde, vous envoyez de l'argent, et le système met à jour
                les chiffres
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
          ? "Imaginez qu'Alice veuille virer 1500 € à Bob. Exécutez une transaction dans le système bancaire traditionnel :"
          : "Now imagine Alice wants to send 1.3 bitcoins to Bob. Execute a transaction in the traditional banking system:"}
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
            Quand vous dites « je vais envoyer 1 bitcoin à mon pote » (j'aimerais bien être votre
            ami), vous imaginez peut-être un objet numérique qui quitte votre portefeuille pour
            rejoindre celui de quelqu'un d'autre. Et bien pas tout à fait.
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
        <p>
          {fr ? "Laissez-moi vous expliquer comment ça marche." : "Let me explain how it works."}
        </p>
        <p>
          <Emphasis>
            {fr ? (
              <>
                Une transaction Bitcoin prend en entrée des sorties non dépensées issues de
                transactions précédentes, puis crée de nouvelles sorties
              </>
            ) : (
              <>
                A Bitcoin transaction takes as inputs unspent outputs from previous transactions,
                then creates new outputs
              </>
            )}
          </Emphasis>
          .
        </p>
        <p>
          {fr ? (
            <>
              Et toutes ces sorties, ce sont des <HighlightText>UTXO</HighlightText>. Elles peuvent
              être vues comme des pièces rangées dans votre portefeuille qui sont indivisibles et
              qui sont prêtes à être dépensées.
            </>
          ) : (
            <>
              All these outputs are <HighlightText>UTXOs</HighlightText>. Think of them as
              indivisible coins in your wallet — each one ready to be spent.
            </>
          )}
        </p>
      </Callout>
      <p>
        {fr ? (
          <>
            Pour bien saisir ce concept, rien de mieux que la pratique.
            <br /> Vous êtes en possession du portefeuille d'Alice, amusez-vous à simuler une
            transaction :
          </>
        ) : (
          <>
            The best way to grasp this concept is hands-on.
            <br /> You are in possession of Alice's wallet, have fun simulating a transaction:
          </>
        )}
      </p>
      <UTXOTransactionBuilder />
      <p>
        {fr
          ? "Le principe d'UTXO étant clarifié, passons à l'un des concepts les plus importants du système."
          : "With the UTXO principle clear, let's move on to one of the most important concepts in the system."}
      </p>
      <p>
        <Emphasis>
          {fr
            ? "Votre portefeuille ne contient pas de bitcoins au sens strict : il contient les clés qui permettent de les dépenser"
            : "Your wallet doesn't contain bitcoins in the strict sense: it holds the keys that allow you to spend them"}
        </Emphasis>
        .
      </p>

      <Callout title={fr ? "Le pouvoir des clés" : "The power of keys"}>
        <p>
          {fr
            ? "Chaque UTXO ne peut « libérer » ses bitcoins qu'à l'aide de la clé qui lui est associée."
            : 'Each UTXO can only "unlock" its bitcoins using the key associated with it.'}
        </p>
        <p>
          {fr
            ? "La clé peut donc être vue comme un titre de propriété, permettant à son détenteur de dépenser le contenu de l'UTXO."
            : "The key acts as a title of ownership, allowing its holder to spend the UTXO's contents."}
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
          ? "Imaginez maintenant qu'Alice veuille virer 1,3 bitcoin à Bob. Exécutez une transaction dans le système Bitcoin :"
          : "Now imagine Alice wants to send 1.3 bitcoins to Bob. Execute a transaction in the Bitcoin system:"}
      </p>
      <TransactionModelComparison mode="bitcoin" />

      <p>
        {fr
          ? "Et maintenant, une petite question de validation de parcours comme nous en avons l'habitude ! Essayez de répondre correctement."
          : "Now, a quick comprehension check as usual! Try to answer correctly."}
      </p>

      <Quiz {...getQuizDataUtxo(language)} onCorrectAnswer={() => {}} />

      <p>
        {fr ? (
          <>
            Nous savons maintenant comment Bitcoin représente la valeur de manière concrète. Une
            transaction ne déplace pas un solde : elle consomme des sorties non dépensées, en crée
            de nouvelles, et transforme la valeur en un ensemble de droits de dépense vérifiables.
          </>
        ) : (
          <>
            We now know how Bitcoin represents value concretely. A transaction doesn't move a
            balance: it consumes unspent outputs, creates new ones, and transforms value into a set
            of verifiable spending rights.
          </>
        )}
      </p>
      <p>
        {fr ? (
          <>
            Il nous manque néanmoins une pièce importante au puzzle :{" "}
            <i>
              comment le réseau sait-il que vous avez vraiment le droit de dépenser ces sorties ?
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
            prochain chapitre, vous tenez le bon bout !
          </>
        ) : (
          <>
            The answer lies in another fundamental mechanism of Bitcoin:{" "}
            <Emphasis>keys, signatures, and cryptography</Emphasis>.<br /> On to the next chapter —
            you're on the right track!
          </>
        )}
      </p>
    </PageTemplate>
  );
};
