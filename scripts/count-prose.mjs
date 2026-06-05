#!/usr/bin/env node
// One-off audit: estimate the FR-prose word count of every page so we
// can recalibrate PAGE_METADATA against reality.
//
// Strategy:
//   - Walk the file once, extracting only TOP-LEVEL `fr ? A : B`
//     ternaries (we skip past A and B once consumed, so nested
//     ternaries are not double-counted).
//   - From each captured FR branch, strip JSX tags / braces / quotes
//     and count word-like tokens.
//
// Heuristic, accurate to ±10 %.

import fs from "node:fs";
import path from "node:path";

const PAGE_DIRS = [
  "src/Page/Banking/components",
  "src/Page/MoneyLaws/components",
  "src/Page/Bitcoin/components",
];

const isPageFile = (name) => /^(Banking|MoneyLaws|Bitcoin)\d+Page\.tsx$/.test(name);

// Walk to the matching close of the current ternary branch.
// Returns the index of the `:` (else separator) or `;`/EOF (else absent).
const walkToBranchEnd = (src, from) => {
  let i = from;
  let depth = 0;
  let inStr = null;
  let escape = false;
  while (i < src.length) {
    const c = src[i];
    if (escape) {
      escape = false;
    } else if (inStr) {
      if (c === "\\") escape = true;
      else if (c === inStr) inStr = null;
    } else if (c === '"' || c === "'" || c === "`") {
      inStr = c;
    } else if (c === "(" || c === "[" || c === "{" || c === "<") {
      depth++;
    } else if (c === ")" || c === "]" || c === "}" || c === ">") {
      if (depth === 0) return i;
      depth--;
    } else if (c === ":" && depth === 0) {
      return i;
    }
    i++;
  }
  return i;
};

const COMMON_JSX_NOISE = new Set([
  "HighlightText",
  "KeywordHighlight",
  "Callout",
  "Quote",
  "br",
  "p",
  "ul",
  "ol",
  "li",
  "i",
  "b",
  "strong",
  "em",
  "div",
  "span",
  "Illustration",
  "src",
  "alt",
  "width",
  "caption",
  "fr",
  "en",
  "title",
  "true",
  "false",
  "null",
  "rowspan",
  "colspan",
]);

const wordsFromChunk = (chunk) => {
  const cleaned = chunk
    .replace(/<[^>]*>/g, " ")
    .replace(/[{}]/g, " ")
    .replace(/["'`]/g, " ")
    .replace(/,/g, " ");
  const tokens = cleaned.match(/[A-Za-zÀ-ÿ0-9]{2,}/g) ?? [];
  return tokens.filter((w) => !COMMON_JSX_NOISE.has(w));
};

const countProse = (src) => {
  const ranges = []; // [start, end) of consumed FR branches
  const pattern = /\bfr\s*\?/g;
  let total = 0;
  let m;
  while ((m = pattern.exec(src)) !== null) {
    const matchEnd = m.index + m[0].length;
    // Skip if inside an already-consumed FR branch.
    const consumed = ranges.find((r) => m.index >= r[0] && m.index < r[1]);
    if (consumed) {
      pattern.lastIndex = consumed[1];
      continue;
    }
    let i = matchEnd;
    while (i < src.length && /\s/.test(src[i])) i++;
    const start = i;
    const end = walkToBranchEnd(src, i);
    const branch = src.slice(start, end);
    ranges.push([start, end]);
    total += wordsFromChunk(branch).length;
    pattern.lastIndex = end;
  }
  return total;
};

// Every interactive that can appear in a chapter page: the public components of
// src/Interactive/index.ts plus the page-local simulators/galleries under
// src/Page/*/components. Update this set whenever one is added or removed.
const INTERACTIVE_NAMES = new Set([
  // src/Interactive
  "AccountingTerms",
  "BitcoinDonationFooter",
  "BitcoinNetworkMap",
  "BitcoinNodeDemo",
  "BlockAnatomyVisual",
  "BlockchainChainVisual",
  "CapitalStructureChain",
  "DebateArena",
  "DifficultyAdjustment",
  "DoubleSpendDemo",
  "DunbarSlider",
  "ExpandableDefinitions",
  "FlipCardGrid",
  "HalvingChart",
  "HalvingTimeMachine",
  "HashDemo",
  "Illustration",
  "KeySignatureTrio",
  "M2MoneySupplyChart",
  "MempoolVisual",
  "MiningRewardBlock",
  "MiningSimulator",
  "MonetaryAggregates",
  "MonetaryPillars",
  "MonetaryProperties",
  "NetworkFlywheel",
  "Quiz",
  "ScientificMethods",
  "SeedGenerator",
  "SignaturePlayground",
  "SignatureVerifier",
  "SynthesisQuiz",
  "TransactionModelComparison",
  "TrustComparisonDemo",
  "UTXOTransactionBuilder",
  "WalletDiscoveryGame",
  // page-local interactives (Banking simulators + MoneyLaws gallery)
  "CompensationSimulator",
  "CreditCreationSimulator",
  "DefaultSimulator",
  "MonetaryGallery",
  "QESimulator",
  "YieldCurveSimulator",
]);

const countInteractives = (src) => {
  const matches = src.match(/<([A-Z][A-Za-z0-9]+)\b/g) ?? [];
  return matches.map((m) => m.slice(1)).filter((n) => INTERACTIVE_NAMES.has(n)).length;
};

const rows = [];
for (const dir of PAGE_DIRS) {
  const abs = path.resolve(dir);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs).sort()) {
    if (!isPageFile(name)) continue;
    const src = fs.readFileSync(path.join(abs, name), "utf-8");
    rows.push({
      file: name.replace(".tsx", ""),
      wordCount: countProse(src),
      interactiveCount: countInteractives(src),
    });
  }
}

console.log("file\twords\tinteractives");
for (const r of rows) {
  console.log(`${r.file}\t${r.wordCount}\t${r.interactiveCount}`);
}
