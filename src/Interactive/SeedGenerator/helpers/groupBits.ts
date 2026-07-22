export const groupBits = (bits: string, groupSize = 8, separator = " ") => {
  const groups: string[] = [];
  for (let i = 0; i < bits.length; i += groupSize) {
    groups.push(bits.slice(i, i + groupSize));
  }
  return groups.join(separator);
};
