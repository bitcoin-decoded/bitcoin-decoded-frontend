/** Number of unique pairwise relationships in a group of n people: n(n-1)/2. */
export const countRelations = (n: number): number => (n * (n - 1)) / 2;
