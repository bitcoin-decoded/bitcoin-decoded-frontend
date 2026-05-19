import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataM0 = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Mais alors, comment une banque commerciale peut se retrouver à court de M0 ?"
      : "So how does a commercial bank end up short of M0?",
    answers: [
      {
        text: fr
          ? "a) La banque commerciale a commis des infractions et la banque centrale lui a ponctionné du M0 en guise de contravention."
          : "a) The commercial bank broke the rules and the central bank docked its M0 as a fine.",
        isCorrect: false,
        rationale: fr ? (
          <>Bien tenté mais non, la Banque Centrale ne peut pas 'ponctionner' le M0 comme ça.</>
        ) : (
          <>Nice try, but no. The Central Bank can't just 'dock' M0 like that.</>
        ),
      },
      {
        text: fr
          ? "b) La banque commerciale a créé trop d'argent M2 (pour Nicolas et d'autres) et n'a plus assez de M0 en proportion du M2 créé."
          : "b) The commercial bank created too much M2 money (for Nicolas and others) and no longer has enough M0 relative to the M2 it created.",
        isCorrect: false,
        rationale: fr ? (
          <>
            Presque. Le ratio M0/M2 n'est pas le déclencheur : une banque saine trouve toujours du
            M0 sur le marché interbancaire. Le vrai problème, c'est quand les autres banques
            refusent de lui en prêter.
          </>
        ) : (
          <>
            Almost. The M0/M2 ratio isn't the trigger: a healthy bank can always source M0 on the
            interbank market. The real problem starts when the other banks refuse to lend it any.
          </>
        ),
      },
      {
        text: fr
          ? "c) La banque commerciale a accordé trop de prêts M2 (dits 'prêts pourris') qui ne sont jamais remboursés."
          : "c) The commercial bank handed out too many M2 loans (so-called 'bad loans') that never get repaid.",
        isCorrect: true,
        rationale: fr ? (
          <>
            Bien vu : les prêts pourris rongent les créances de la banque, sa solidité s'effrite, et
            les autres banques cessent de lui prêter du M0. Tout est lié.
          </>
        ) : (
          <>
            Well spotted: bad loans eat away at the bank's claims, its soundness crumbles, and the
            other banks stop lending it M0. It's all connected.
          </>
        ),
      },
    ],
  };
};
