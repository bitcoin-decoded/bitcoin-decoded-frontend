const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const pickLetter = (): string => LETTERS[Math.floor(Math.random() * LETTERS.length)];

const pickAmount = (): string => {
  const whole = Math.floor(Math.random() * 10);
  const decimal = Math.floor(Math.random() * 10);
  return `${whole}.${decimal}`;
};

export const randomizeTx = (current: string): string => {
  const sender = pickLetter();
  let receiver = pickLetter();
  while (receiver === sender) receiver = pickLetter();
  const next = `${sender} envoie ${pickAmount()} BTC à ${receiver}`;
  return next === current ? randomizeTx(current) : next;
};
