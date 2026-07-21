/**
 * Everything about *where* the site lives, in one place.
 *
 * `canonical`, `og:url` and the sitemap all need an absolute address, and all
 * three must agree: two spellings of the same page are two pages to a search
 * engine. They read it from here so they cannot disagree.
 *
 * No trailing slash: every path already starts with one.
 */
export const SITE = {
  url: "https://bitcoindecoded.fr",
  name: "Bitcoin.Decoded",
} as const;
