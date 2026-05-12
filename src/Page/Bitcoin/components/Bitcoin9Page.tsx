import { type FC } from "react";

import { Emphasis } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getQuizDataModule3Synthesis, SynthesisQuiz } from "../../../Interactive";
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
    <PageTemplate title={t("nav.tree.synthesis")}>
      <p>
        {fr
          ? "Tu viens de plonger dans les entrailles de Bitcoin : du protocole jusqu'à la seed. Avant de tourner la page, vérifie que les concepts clés sont bien arrimés."
          : "You've just dived into the guts of Bitcoin: from the protocol down to the seed. Before turning the page, make sure the key concepts are firmly anchored."}
      </p>
      <p>
        {fr ? (
          <>
            {quiz.questions.length} questions sur l'ensemble du module.{" "}
            <Emphasis>
              Il te faut au moins {quiz.passThreshold} bonnes réponses pour débloquer la synthèse.
            </Emphasis>
          </>
        ) : (
          <>
            {quiz.questions.length} questions covering the whole module.{" "}
            <Emphasis>You need at least {quiz.passThreshold} to unlock the wrap-up.</Emphasis>
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
              ? "Tu viens de boucler la révolution Bitcoin. Et tu en maîtrises les fondations techniques."
              : "You've just wrapped up the Bitcoin revolution. And you've got a solid grip on its technical foundations."}
          </p>

          <p>
            {fr
              ? "Sous le capot, Bitcoin est trois choses à la fois. Un logiciel. Un réseau. Une monnaie. Les nœuds simples vérifient sans confiance. Les nœuds-mineurs proposent des blocs en pariant de l'énergie. Pas d'autorité centrale, pas de chef d'orchestre."
              : "Under the hood, Bitcoin is three things at once. Software. A network. A currency. Simple nodes verify without trust. Mining nodes propose blocks by betting energy. No central authority, no conductor."}
          </p>

          <p>
            {fr
              ? "Le bloc Genesis, gravé d'un titre du Times de janvier 2009, raconte pourquoi. Il s'agit de répondre simultanément aux deux pathologies diagnostiquées dans les modules précédents : la dureté zéro et la centralisation. La réponse tient en une ligne de code : un plafond de 21 millions, vérifié par chaque nœud."
              : "The Genesis block, etched with a Times headline from January 2009, tells you why. The goal: tackle both diseases diagnosed in the previous modules at once — zero hardness and centralization. The answer fits in a single line of code: a 21 million cap, verified by every single node."}
          </p>

          <p>
            {fr
              ? "La blockchain est le registre. Chaque bloc s'accroche au précédent par son hash, ce qui rend toute réécriture rétroactive d'un coût prohibitif. Le SHA-256, c'est la colle mathématique de cette immuabilité."
              : "The blockchain is the ledger. Each block hooks onto the previous one via its hash, which makes any retroactive rewrite prohibitively expensive. SHA-256 is the mathematical glue of that immutability."}
          </p>

          <p>
            {fr
              ? "La preuve de travail résout le problème des généraux byzantins. Se mettre d'accord sans chef, en faisant payer cher à celui qui veut écrire dans le registre. La difficulté s'ajuste tous les 2016 blocs pour viser 10 minutes en moyenne. Et quand deux blocs concurrents apparaissent en même temps ? C'est la chaîne au plus grand travail cumulé qui l'emporte. Toujours."
              : "Proof of work solves the Byzantine generals problem. Reaching agreement without a leader, by charging dearly whoever wants to write in the ledger. Difficulty adjusts every 2016 blocks to target 10 minutes on average. And when two competing blocks pop up at the same time? The chain with the most cumulative work wins. Always."}
          </p>

          <p>
            {fr
              ? "Le halving divise par deux la subvention des mineurs tous les 210 000 blocs. Jusqu'à son extinction, vers 2140. À partir de là, ce sont les frais de transaction qui financent la sécurité du réseau. Payer pour utiliser, plutôt que diluer tout le monde."
              : "The halving cuts the miner subsidy in half every 210,000 blocks. Until it dies out, around 2140. From then on, transaction fees alone fund the network's security. Pay to use, rather than dilute everyone."}
          </p>

          <p>
            {fr
              ? "Bitcoin ne déplace pas d'argent. Il consomme des UTXO et en produit de nouveaux. La différence entre entrées et sorties revient au mineur, sous forme de frais. Pour autoriser cette consommation, le détenteur signe avec sa clé privée. Le réseau vérifie avec la clé publique. La clé privée, elle, ne quitte jamais le portefeuille."
              : "Bitcoin doesn't move money. It consumes UTXOs and produces new ones. The difference between inputs and outputs goes to the miner, as a fee. To authorize that consumption, the holder signs with their private key. The network verifies with the public key. The private key itself never leaves the wallet."}
          </p>

          <p>
            {fr
              ? "Enfin, un portefeuille Bitcoin ne contient pas de bitcoins. Il contient une seed, à partir de laquelle sont dérivées toutes les clés privées capables de débloquer les UTXO associés aux adresses correspondantes. Perds la seed, tu perds tout. Sauve la seed, tu sauves tout."
              : "And one last thing: a Bitcoin wallet doesn't contain any bitcoins. It contains a seed, from which all the private keys capable of unlocking the UTXOs tied to the corresponding addresses are derived. Lose the seed, you lose everything. Save the seed, you save everything."}
          </p>

          <p>
            {fr
              ? "Les modules 1 et 2 avaient posé le diagnostic. Une monnaie facile à produire, et un pilote central qui ment. Bitcoin répond aux deux pathologies simultanément. En silicium et en mathématiques. La rupture est consommée."
              : "Modules 1 and 2 laid out the diagnosis. A currency too easy to produce, and a central pilot that lies. Bitcoin responds to both diseases at once. In silicon and mathematics. The break is complete."}
          </p>

          <p>
            {fr
              ? "Reste maintenant à le mettre en pratique. Direction la dernière étape : démarrer avec Bitcoin."
              : "Now it remains to put it into practice. On to the final step: getting started with Bitcoin."}
          </p>
        </>
      )}
    </PageTemplate>
  );
};
