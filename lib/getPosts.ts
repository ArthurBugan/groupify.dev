
import { Metadata } from "next";

export type Article = {
  slug: string;
  metadata: Metadata & {
    slug: string;
    date?: string;
    image?: string;
    authors: string[];
  };
  component: any;
  readingTime: string;
};

const importAll = (r: any): Promise<Article[]> =>
  Promise.all(
    r.keys().map(async (fileName: string) => {
      const module = r(fileName);
      const slug = fileName.substr(2).replace(/\/page\.mdx$/, "");

      return {
        slug,
        metadata: module?.metadata,
        component: module?.default,
        readingTime: module?.metadata_readingTime,
      } satisfies Article;
    })
  );

export const getAllArticles = async (): Promise<Article[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/blog/", true, /^\.\/[^\/]+\/page\.mdx$/)
  );

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const module = require(`../app/blog/${slug}/page.mdx`);

  return {
    slug,
    component: module?.default,
    metadata: module?.metadata,
    readingTime: module?.metadata_readingTime,
  };
};