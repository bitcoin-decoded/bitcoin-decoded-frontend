/** What a single page tells search engines and social cards about itself. */
export type PageSeo = {
  /**
   * The editorial chapter title, extended with the term the page should rank
   * on. The brand is appended separately by `buildPageTitle`.
   */
  title: string;
  /** 150 to 160 characters. Written for a human reading a result page. */
  description: string;
};
