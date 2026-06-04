import { type FC } from "react";

import { HighlightText } from "../../../Design";
import { useTranslation } from "../../../I18n";
import {
  BitcoinDonationFooter,
  getQuizDataModule3Synthesis,
  SynthesisQuiz,
} from "../../../Interactive";
import { PageTemplate, useToggleSimulator } from "../../Shared/";

export const Bitcoin9Page: FC = () => {
  const { t, language } = useTranslation();
  const fr = language === "fr";
  const {
    isActive: isQuizPassed,
    activate: onQuizPassed,
    reset: onQuizReset,
  } = useToggleSimulator();
  const quiz = getQuizDataModule3Synthesis(language);

  return (
    <PageTemplate title={t("nav.tree.synthesis")} showReadingTime={false}>
      <p>
        {fr
          ? "Tu viens de plonger dans les entrailles de Bitcoin : du protocole jusqu'à la seed. Avant de tourner la page, vérifie que les concepts clés sont bien arrimés."
          : "You've just dived into the guts of Bitcoin, from the protocol down to the seed. Before turning the page, make sure the key concepts are locked in."}
      </p>
      <p>
        <HighlightText>
          {fr ? (
            <>
              {quiz.questions.length} questions sur l'ensemble du module. Il te faut au moins{" "}
              {quiz.passThreshold} bonnes réponses pour débloquer la synthèse.
            </>
          ) : (
            <>
              {quiz.questions.length} questions across the whole module. You need at least{" "}
              {quiz.passThreshold} right answers to unlock the wrap-up.
            </>
          )}
        </HighlightText>
      </p>

      <SynthesisQuiz
        {...quiz}
        storageKey="synthesisQuiz.module3"
        onPass={onQuizPassed}
        onReset={onQuizReset}
      />

      {isQuizPassed && (
        <>
          <p>
            {fr ? (
              <>
                Tu viens de boucler la révolution Bitcoin, les fondations techniques sont à toi.
                Sous le capot, Bitcoin est trois choses à la fois. Un logiciel. Un réseau. Une
                monnaie. Les nœuds simples vérifient sans confiance. Les nœuds-mineurs proposent des
                blocs en pariant de l'énergie.{" "}
                <HighlightText>Pas d'autorité centrale, pas de chef d'orchestre</HighlightText>.
              </>
            ) : (
              <>
                You've just wrapped up the Bitcoin revolution, and the technical foundations are now
                yours. Under the hood, Bitcoin is three things at once. A software. A network. A
                currency. Simple nodes verify, trustlessly. Mining nodes propose blocks by wagering
                energy. <HighlightText>No central authority, no conductor</HighlightText>.
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                Le bloc Genesis, gravé d'un titre du Times de janvier 2009, raconte pourquoi :
                répondre aux deux pathologies des modules précédents, la dureté zéro et la
                centralisation. La réponse se trouve au cœur du protocole :{" "}
                <HighlightText>
                  21 millions de bitcoins, une limite fixée dans le code et vérifiée par chaque nœud
                </HighlightText>
                .
              </>
            ) : (
              <>
                The Genesis block, etched with a Times headline from January 2009, tells you why:
                tackle the two diseases from the previous modules, zero hardness and centralization.
                The answer sits at the very core of the protocol:{" "}
                <HighlightText>
                  21 million bitcoins, a hard cap baked into the code and checked by every node
                </HighlightText>
                .
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                La blockchain est le registre. Chaque bloc s'accroche au précédent par son hash, ce
                qui rend toute réécriture rétroactive d'un coût juste… astronomique ! Et la preuve
                de travail tranche le problème des généraux byzantins : se mettre d'accord sans
                chef, en faisant payer cher à celui qui veut écrire dans le registre. Quand deux
                blocs concurrents apparaissent ? C'est la chaîne au plus grand travail cumulé qui
                l'emporte. <HighlightText>Systématiquement</HighlightText>.
              </>
            ) : (
              <>
                The blockchain is the ledger. Each block hooks onto the previous one through its
                hash — which makes any retroactive rewrite, well… astronomically costly. And proof
                of work cuts through the Byzantine generals problem: agreeing without a leader, by
                charging a steep price to anyone who wants to write in the ledger. When two rival
                blocks pop up at once? The chain with the most cumulative work wins out.{" "}
                <HighlightText>Every single time</HighlightText>.
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                Le halving divise par deux la subvention des mineurs tous les 210 000 blocs, jusqu'à
                son extinction vers 2140. Ensuite, ce sont les frais de transaction qui doivent
                prendre le relais pour financer la sécurité du réseau.{" "}
                <HighlightText>
                  Le pari : payer pour utiliser, plutôt que diluer tout le monde
                </HighlightText>
                .
              </>
            ) : (
              <>
                The halving slashes the miner subsidy in half every 210,000 blocks, until it fades
                out around 2140. From there, transaction fees are expected to take over and fund the
                network's security.{" "}
                <HighlightText>The bet: pay to use, rather than dilute everyone</HighlightText>.
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                <HighlightText>Bitcoin ne déplace pas d'argent</HighlightText>. Il consomme des UTXO
                et en produit de nouveaux, la différence entre entrées et sorties revient au mineur
                sous forme de frais. Pour autoriser cette consommation, le détenteur signe avec sa
                clé privée, le réseau vérifie avec la clé publique. La clé privée, elle, ne sort
                jamais : c'est la signature qui voyage.
              </>
            ) : (
              <>
                <HighlightText>Bitcoin doesn't move money</HighlightText>. It consumes UTXOs and
                produces new ones, and the gap between inputs and outputs goes to the miner as a
                fee. To authorise that consumption, the holder signs with their private key, the
                network checks with the public key. The private key itself never leaves home: it's
                the signature that travels.
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                Dernière chose : un portefeuille Bitcoin ne contient pas de bitcoins. Il contient
                une seed, dont sont dérivées toutes les clés privées qui débloquent les UTXO
                associés à tes adresses.{" "}
                <HighlightText>
                  Perds la seed, tu perds tout. Sauve la seed, tu sauves tout
                </HighlightText>
                .
              </>
            ) : (
              <>
                One last thing: a Bitcoin wallet doesn't actually hold any bitcoins. It holds a
                seed, from which all the private keys that unlock the UTXOs tied to your addresses
                are derived.{" "}
                <HighlightText>
                  Lose the seed, you lose everything. Save the seed, you save everything
                </HighlightText>
                .
              </>
            )}
          </p>

          <p>
            {fr ? (
              <>
                Les modules 1 et 2 avaient posé le diagnostic : une monnaie facile à produire, et un
                pilote central dont les incitations ne s'alignent pas avec celles des épargnants.
                Bitcoin propose une réponse aux deux pathologies simultanément. En silicium et en
                mathématiques. <HighlightText>La rupture est amorcée</HighlightText>.
              </>
            ) : (
              <>
                Modules 1 and 2 had laid out the diagnosis: a currency too easy to produce, and a
                central pilot whose incentives don't line up with those of savers. Bitcoin offers an
                answer to both diseases at once. In silicon and in mathematics.{" "}
                <HighlightText>The break is underway</HighlightText>.
              </>
            )}
          </p>

          <p>
            {fr
              ? "Reste à le mettre en pratique. Direction la dernière étape : démarrer avec Bitcoin."
              : "Now to put it into practice. On to the final step: getting started with Bitcoin."}
          </p>
        </>
      )}
      <BitcoinDonationFooter display="inline" />
    </PageTemplate>
  );
};
