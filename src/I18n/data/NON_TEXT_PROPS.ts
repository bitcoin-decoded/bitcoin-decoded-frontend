/**
 * Props and record fields that are machinery, never prose.
 *
 * `transformFrText` walks children, so text written between tags is fixed.
 * Text handed over as a *prop* had no such path: it bypassed both `FrText` and
 * `t()`, which is why "?" and ":" kept stranding themselves on their own line —
 * in Callout titles, Illustration captions, and every string a language-aware
 * `data/` getter feeds into a component (quiz questions, tier phrases, the
 * beer-chain prompts…).
 *
 * This is a blocklist rather than a list of known copy fields on purpose. A
 * whitelist has to be extended every time content introduces a field name
 * (`verdict`, `why`, `questions`, `sides`…), so it silently falls behind and
 * the bug comes back one chapter at a time. Everything is treated as copy
 * unless it is named here.
 *
 * That inversion is only safe because `fixFrenchPunctuation` is conservative:
 * it inserts a narrow no-break space *before* `! ? ; :` and `»` and after `«`,
 * and only when the punctuation is followed by whitespace or end-of-string. So
 * `bd:reading:banking-5`, `12:30` and `rgba(0, 0, 0, 0.6)` are left alone, and
 * URLs are placeholdered out before any rewriting.
 */
export const NON_TEXT_PROPS: ReadonlySet<string> = new Set([
  "chapterId",
  "className",
  "href",
  "id",
  "key",
  "name",
  "rel",
  "role",
  "route",
  "src",
  "srcSet",
  "storageKey",
  "style",
  "target",
  "to",
  "type",
  "value",
]);
