export type ReadingTimeFlavorBucket = 1 | 2 | 3 | 5 | 9 | 10;

export type ReadingTimeFlavorMap = {
  readonly [K in ReadingTimeFlavorBucket]: readonly string[];
};
