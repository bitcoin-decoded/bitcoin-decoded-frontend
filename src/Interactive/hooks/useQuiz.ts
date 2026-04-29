import { useState } from "react";
import type { QuizAnswer } from "../types";

export const useQuiz = (answers: QuizAnswer[], onCorrect: () => void) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrectlySolved, setIsCorrectlySolved] = useState(false);

  const handleSelect = (index: number) => {
    if (isCorrectlySolved) return;
    setSelectedIndex(index);

    if (answers[index].isCorrect) {
      setIsCorrectlySolved(true);
      onCorrect();
    }
  };

  return {
    selectedIndex,
    isCorrectlySolved,
    handleSelect,
  };
};
