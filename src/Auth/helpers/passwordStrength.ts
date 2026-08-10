// A simple, non-blocking strength read for the password screen (CDC §7.1 écran 5):
// length plus character variety. 0 means below the 8-char minimum (the only hard
// gate); 1/2/3 are ok/good/strong and never block.
export const passwordStrength = (password: string): 0 | 1 | 2 | 3 => {
  if (password.length < 8) return 0;
  let variety = 0;
  if (/[a-z]/.test(password)) variety++;
  if (/[A-Z]/.test(password)) variety++;
  if (/[0-9]/.test(password)) variety++;
  if (/[^a-zA-Z0-9]/.test(password)) variety++;
  if (password.length >= 14 && variety >= 3) return 3;
  if (password.length >= 11 && variety >= 2) return 2;
  return 1;
};
