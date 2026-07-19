import { type FC } from "react";

import { SITE } from "../data";
import { usePageHead } from "../hooks";

/**
 * Per-route metadata. React 19 hoists `<title>` and `<meta>` rendered anywhere
 * in the tree into `<head>`, so no imperative DOM writing and no helmet
 * library, and it lands in the HTML as-is once the build prerenders routes.
 *
 * `canonical`, `og:url` and `og:image` are deliberately absent. The first two
 * need a real per-page URL, which hash routing cannot give, and the third needs
 * an image that does not exist yet. Emitting them now would mean pointing every
 * page at the same address, which is worse than saying nothing.
 */
export const PageHead: FC = () => {
  const { title, description, locale } = usePageHead();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
};
