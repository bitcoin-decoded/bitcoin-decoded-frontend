export type M2DataPoint = {
  year: number;
  value: number;
};

/**
 * US M2 Money Supply (trillions USD) - simplified annual snapshots.
 * Source: Federal Reserve Economic Data (FRED), series M2SL
 * https://fred.stlouisfed.org/series/M2SL
 */
export const M2_MONEY_SUPPLY: M2DataPoint[] = [
  { year: 1960, value: 0.3 },
  { year: 1965, value: 0.43 },
  { year: 1970, value: 0.59 },
  { year: 1975, value: 0.91 },
  { year: 1980, value: 1.48 },
  { year: 1985, value: 2.33 },
  { year: 1990, value: 3.17 },
  { year: 1995, value: 3.49 },
  { year: 2000, value: 4.67 },
  { year: 2005, value: 6.43 },
  { year: 2008, value: 7.52 },
  { year: 2010, value: 8.48 },
  { year: 2015, value: 11.81 },
  { year: 2019, value: 14.46 },
  { year: 2020, value: 15.43 },
  { year: 2021, value: 19.38 },
  { year: 2022, value: 21.65 },
  { year: 2024, value: 20.84 },
];
