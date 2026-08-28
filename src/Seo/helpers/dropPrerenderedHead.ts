// Must match every tag PageHead renders that React 19 hoists into <head>:
// title, and the name/property meta plus the canonical/alternate links. The
// <script type="application/ld+json"> is deliberately absent: React does not
// hoist inline scripts, so it renders inside #root and createRoot replaces it.
// dropPrerenderedHead.test.ts fails if this list drifts from PageHead's output
// (that drift is exactly how the twitter: tags escaped it and kept #173 open).
// Call before mounting, never after.
const HOISTED_BY_PAGE_HEAD = [
  "title",
  "meta[name='description']",
  "meta[name='robots']",
  "meta[name^='twitter:']",
  "meta[property^='og:']",
  "link[rel='canonical']",
  "link[rel='alternate'][hreflang]",
].join(",");

export const dropPrerenderedHead = () => {
  document.head.querySelectorAll(HOISTED_BY_PAGE_HEAD).forEach((tag) => tag.remove());
};
