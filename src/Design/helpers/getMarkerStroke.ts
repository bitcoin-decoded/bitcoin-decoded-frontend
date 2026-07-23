const VIEW_W = 200;
const VIEW_H = 24;
const MID = VIEW_H / 2;
const HALF = 9;
const TAU = Math.PI * 2;
// The centre line and both edges are smooth sine curves, never per-point noise:
// a hand draws a continuous gesture, so every variation here is a low-frequency
// wave, not jitter. Sampled finely, then joined into one smooth path.
const SAMPLES = 14;
// Amplitudes (viewBox units). BOW is the signature of each stroke: a single
// shallow arch, up or down, that gives the whole trajectory its gesture so two
// highlights never trace the same line. The rest are subtler still.
const TILT = 0.8;
const BOW = 1.3;
const DRIFT = 0.4;
const SWELL = 0.75;
// Full-weight body between the caps; the caps are near-half-circles centred on
// X0 / X1 so their tips reach the viewBox edges. They stay INSIDE the box:
// preserveAspectRatio='none' clips anything past 0 / VIEW_W flat, re-creating
// the straight edge we are avoiding.
const X0 = HALF;
const X1 = VIEW_W - HALF;
// Cubic handle that draws a half-circle end; letting each of the two handles
// fall a little short of it makes every cap a slightly lopsided round, as if
// the marker slowed and lifted, rather than a machined border-radius.
const CAP_FULL = (HALF * 4) / 3;
const CAP_MIN = HALF * 1.15;

type Point = [number, number];

// Deterministic, so a given phrase keeps the same stroke across renders.
const makeRandom = (seed: number) => {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const round = (n: number): number => Math.round(n * 10) / 10;
const signed = (random: () => number, amp: number): number => (random() * 2 - 1) * amp;

// Quadratic through the midpoints: the sampled points become control points, so
// the path is one continuous smooth curve rather than a chain of segments.
const smooth = (points: Point[]): string => {
  let d = "";
  for (let i = 1; i < points.length - 1; i++) {
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    d += `Q${cx},${cy} ${round((cx + nx) / 2)},${round((cy + ny) / 2)}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d}L${lx},${ly}`;
};

export const getMarkerStroke = (color: string, seed: number, opacity: number): string => {
  const random = makeRandom(seed);
  // The gesture of this particular stroke, drawn once from the seed.
  const tilt = signed(random, TILT);
  const bow = signed(random, BOW);
  const drift = signed(random, DRIFT);
  const driftPhase = random() * TAU;
  const swellTop = 0.35 + random() * SWELL;
  const swellBot = 0.35 + random() * SWELL;
  const phaseTop = random() * TAU;
  const phaseBot = random() * TAU;

  const top: Point[] = [];
  const bottom: Point[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const x = round(X0 + t * (X1 - X0));
    // Arch (zero at the ends, so the caps still meet cleanly) + a slow full-wave
    // drift + linear tilt.
    const centre =
      MID + tilt * (t - 0.5) * 2 + bow * Math.sin(Math.PI * t) + drift * Math.sin(TAU * t + driftPhase);
    const topOffset = HALF + swellTop * Math.sin(Math.PI * t + phaseTop);
    const botOffset = HALF + swellBot * Math.sin(Math.PI * t + phaseBot);
    top.push([x, round(centre - topOffset)]);
    bottom.push([x, round(centre + botOffset)]);
  }
  bottom.reverse();

  const [sx, sy] = top[0];
  const [tex, tey] = top[top.length - 1];
  const [bsx, bsy] = bottom[0];
  const [bex, bey] = bottom[bottom.length - 1];

  const cap = () => CAP_MIN + random() * (CAP_FULL - CAP_MIN);

  const d =
    `M${sx},${sy}` +
    smooth(top) +
    `C${round(tex + cap())},${tey} ${round(bsx + cap())},${bsy} ${bsx},${bsy}` +
    smooth(bottom) +
    `C${round(bex - cap())},${bey} ${round(sx - cap())},${sy} ${sx},${sy}Z`;

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${VIEW_W} ${VIEW_H}' preserveAspectRatio='none'>` +
    `<path d='${d}' fill='${color}' fill-opacity='${opacity}'/></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};
