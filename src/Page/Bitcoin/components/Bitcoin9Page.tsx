import { type FC } from "react";

import { Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { SynthesisQuiz, getQuizDataModule3Synthesis } from "../../../Interactive";
import { PageTemplate } from "../../Shared/components";
import { useToggleSimulator } from "../../Shared/hooks";

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
    <PageTemplate title={t("nav.tree.greenSynthesis")}>
      <p>
        {fr
          ? "Tu viens de plonger dans les entrailles de Bitcoin : du protocole jusqu'à la seed. Avant de tourner la page, vérifie que les concepts clés sont bien arrimés."
          : "You've just dived into the guts of Bitcoin: from the protocol all the way to the seed. Before turning the page, make sure the key concepts are firmly anchored."}
      </p>
      <p>
        {fr ? (
          <>
            20 questions sur l'ensemble du module.{" "}
            <Emphasis>
              Atteins au moins {quiz.passThreshold} bonnes réponses sur {quiz.questions.length} pour
              débloquer la synthèse.
            </Emphasis>
          </>
        ) : (
          <>
            20 questions covering the whole module.{" "}
            <Emphasis>
              Score at least {quiz.passThreshold} out of {quiz.questions.length} to unlock the
              synthesis.
            </Emphasis>
          </>
        )}
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
            {fr
              ? "Bravo. Tu viens de boucler la révolution Bitcoin, et tu en maîtrises les fondations techniques."
              : "Well done. You've just wrapped up the Bitcoin revolution, and you've got its technical foundations down."}
          </p>
          <p>
            {fr ? (
              <>
                Sous le capot, Bitcoin est trois choses à la fois :{" "}
                <Emphasis>un logiciel, un réseau, et une monnaie</Emphasis>. Les nœuds simples
                vérifient sans confiance, les nœuds-mineurs proposent des blocs en pariant de
                l'énergie. Pas d'autorité centrale, pas de chef d'orchestre.
              </>
            ) : (
              <>
                Under the hood, Bitcoin is three things at once:{" "}
                <Emphasis>a software, a network, and a currency</Emphasis>. Regular nodes verify
                trustlessly; miner-nodes propose blocks by staking energy. No central authority, no
                conductor.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Le bloc Genesis, gravé d'un titre du <i>Times</i> de janvier 2009, raconte
                pourquoi : répondre simultanément au{" "}
                <Emphasis>problème de dureté</Emphasis> et au{" "}
                <Emphasis>problème de centralisation</Emphasis> diagnostiqués dans les deux modules
                précédents. La réponse, c'est un plafond mathématique de 21 millions, vérifié par
                chaque nœud.
              </>
            ) : (
              <>
                The Genesis block, etched with a <i>Times</i> headline from January 2009, tells us
                why: to address at the same time the <Emphasis>hardness problem</Emphasis> and the{" "}
                <Emphasis>centralization problem</Emphasis> diagnosed in the previous two modules.
                The answer is a mathematical cap of 21 million, verified by every node.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                La <Emphasis>blockchain</Emphasis> est le registre : chaque bloc enchaîne le
                précédent par son hash, ce qui rend toute réécriture rétroactive prohibitivement
                coûteuse. Le hachage SHA-256 est la colle mathématique de cette immuabilité.
              </>
            ) : (
              <>
                The <Emphasis>blockchain</Emphasis> is the ledger: each block chains to the previous
                one via its hash, making any retroactive rewrite prohibitively expensive. SHA-256
                hashing is the mathematical glue of this immutability.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                La <Emphasis>preuve de travail</Emphasis> résout le problème des généraux byzantins
                : se mettre d'accord sans chef, en faisant payer cher à celui qui veut écrire. La
                difficulté s'ajuste tous les 2016 blocs pour cibler 10 minutes en moyenne, et en cas
                de fork, c'est la chaîne au plus grand travail cumulé qui gagne.
              </>
            ) : (
              <>
                <Emphasis>Proof of work</Emphasis> solves the Byzantine generals problem: reaching
                agreement without a leader, by making writing expensive. Difficulty re-targets every
                2016 blocks to hit a 10-minute average, and on a fork, the chain with the most
                cumulative work wins.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Le <Emphasis>halving</Emphasis> divise par deux la subvention tous les 210 000
                blocs, jusqu'à son extinction vers 2140. À partir de là, ce sont les{" "}
                <Emphasis>frais de transaction</Emphasis> qui financent la sécurité du réseau —
                payer pour utiliser, plutôt que diluer tout le monde.
              </>
            ) : (
              <>
                The <Emphasis>halving</Emphasis> cuts the subsidy in half every 210,000 blocks,
                until it vanishes around 2140. From then on,{" "}
                <Emphasis>transaction fees</Emphasis> fund the network's security — paying for
                usage, rather than diluting everyone.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Bitcoin <Emphasis>ne déplace pas d'argent</Emphasis> : il consomme des UTXO et en
                produit de nouveaux. La différence entre entrées et sorties revient au mineur sous
                forme de frais. Pour autoriser cette consommation, le détenteur signe avec sa{" "}
                <Emphasis>clé privée</Emphasis>, et le réseau vérifie avec la clé publique — sans
                que la clé privée ne quitte jamais le portefeuille.
              </>
            ) : (
              <>
                Bitcoin <Emphasis>does not move money</Emphasis>: it consumes UTXOs and produces
                new ones. The difference between inputs and outputs goes to the miner as fees. To
                authorize the spend, the owner signs with their{" "}
                <Emphasis>private key</Emphasis>, and the network verifies with the public key —
                without the private key ever leaving the wallet.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Enfin, un portefeuille Bitcoin{" "}
                <Emphasis>ne contient pas de bitcoins</Emphasis>. Il contient une{" "}
                <Emphasis>seed</Emphasis>, à partir de laquelle sont dérivées toutes les clés
                privées capables de débloquer les UTXO associés aux adresses correspondantes. Perds
                la seed, tu perds tout. Sauve la seed, tu sauves tout.
              </>
            ) : (
              <>
                Finally, a Bitcoin wallet{" "}
                <Emphasis>does not contain bitcoins</Emphasis>. It contains a{" "}
                <Emphasis>seed</Emphasis>, from which every private key able to unlock the UTXOs at
                the matching addresses is derived. Lose the seed, you lose everything. Save the
                seed, you save everything.
              </>
            )}
          </p>
          <p>
            {fr ? (
              <>
                Le diagnostic posé dans les modules 1 et 2 avait identifié les deux pathologies :
                une monnaie facile à produire, et un pilote central qui ment.{" "}
                <Emphasis>
                  Bitcoin répond aux deux simultanément, en silicium et en mathématiques
                </Emphasis>
                . La rupture est consommée.
              </>
            ) : (
              <>
                The diagnosis laid out in modules 1 and 2 had pinpointed the two pathologies: money
                that is easy to produce, and a central pilot that lies.{" "}
                <Emphasis>
                  Bitcoin answers both at once, in silicon and in mathematics
                </Emphasis>
                . The break is complete.
              </>
            )}
          </p>
          <p>
            {fr
              ? "Reste maintenant à le mettre en pratique. Cap vers le grand final : démarrer avec Bitcoin."
              : "Now it's time to put it into practice. Onward to the grand finale: getting started with Bitcoin."}
          </p>
        </>
      )}
    </PageTemplate>
  );
};
