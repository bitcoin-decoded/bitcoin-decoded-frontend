// Must match what `PageHead` renders and React hoists. The JSON-LD script is
// absent because React does not hoist <script>, so createRoot already replaces
// it. Call before mounting, never after.
const HOISTED_BY_PAGE_HEAD = [
  "title",
  "meta[name='description']",
  "meta[name='robots']",
  "link[rel='canonical']",
  "link[rel='alternate'][hreflang]",
  "meta[property^='og:']",
].join(",");

export const dropPrerenderedHead = () => {
  document.head.querySelectorAll(HOISTED_BY_PAGE_HEAD).forEach((tag) => tag.remove());
};
