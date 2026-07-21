/**
 * Writes one HTML file per route, with that route's content and metadata
 * already in it.
 *
 * The application is a single-page app: the server sends one empty shell and
 * the browser builds every page from it. Search engines were therefore offered
 * a document with no words in it. This runs the same components under Node
 * after the client build, and drops the result into the shell.
 *
 * The client still mounts with `createRoot`, not `hydrateRoot`, so it discards
 * this markup and renders fresh. That is deliberate: hydrating would require
 * the first client render to match this HTML exactly, and language, theme,
 * badges and reading progress all come from storage the build cannot see. The
 * HTML is here to be read by crawlers, not to save the browser work.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const DIST = "dist";
const SSR_ENTRY = "../dist-ssr/entry-server.js";

/**
 * Splits what `renderToString` returns into the tags that belong in `<head>`
 * and the markup that belongs in the page.
 *
 * React 19 hoists `<title>`, `<meta>` and `<link>` rendered anywhere in the
 * tree. With no document to hoist them into, it emits them first, contiguously,
 * before any application markup. So the head block is however many of those
 * tags sit at the very start, and the body is the rest.
 */
const splitHead = (html) => {
  const HEAD_TAG = /^<(?:title>[\s\S]*?<\/title|(?:meta|link)\b[^>]*\/?)>/;
  let cut = 0;
  for (;;) {
    const match = html.slice(cut).match(HEAD_TAG);
    if (!match) break;
    cut += match[0].length;
  }
  return { head: html.slice(0, cut), body: html.slice(cut) };
};

/**
 * Where a path is written.
 *
 * Flat `.html` files, not `<path>/index.html`. A static host resolves a
 * directory to its index only when the address ends in a slash, and the
 * addresses this application produces do not; without the slash the SPA
 * fallback answers instead and every page serves the home page. Flat files are
 * matched by name, with or without the slash.
 */
const fileFor = (path) => (path === "/" ? join(DIST, "index.html") : join(DIST, `${path}.html`));

/**
 * The sitemap, built from the same list the files are.
 *
 * Generated rather than written by hand so it cannot come to list a page that
 * no longer exists, or miss one that does. No `lastmod`, `changefreq` or
 * `priority`: there is no honest date to give, and search engines have long
 * ignored the other two.
 */
const sitemapFor = (pages, site) => {
  const urls = pages
    .filter((page) => page.listed)
    .map((page) => `  <url><loc>${site.url}${page.path}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const main = async () => {
  const { render, pages, site } = await import(SSR_ENTRY);
  const shell = await readFile(join(DIST, "index.html"), "utf8");

  if (!shell.includes('<div id="root"></div>')) {
    throw new Error("The built shell no longer has an empty #root to fill.");
  }

  // React warns about missing keys on a few pages. That is a known defect,
  // tracked on its own, and it would otherwise drown this script's output.
  const noisy = console.error;
  console.error = () => {};

  const written = [];
  for (const { route, path } of pages) {
    const { head, body } = splitHead(render(route));

    const html = shell
      .replace("</head>", `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    const file = fileFor(path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, "utf8");
    written.push({ path, file, bytes: html.length });
  }

  console.error = noisy;

  const sitemap = sitemapFor(pages, site);
  await writeFile(join(DIST, "sitemap.xml"), sitemap, "utf8");

  const total = written.reduce((sum, page) => sum + page.bytes, 0);
  console.log(`Prerendered ${written.length} pages, ${(total / 1024).toFixed(0)} kB of HTML`);
  console.log(`Sitemap lists ${pages.filter((page) => page.listed).length} of them`);
  for (const page of written) {
    console.log(`  ${page.path.padEnd(52)} ${String(page.bytes).padStart(7)} B`);
  }
};

await main();
