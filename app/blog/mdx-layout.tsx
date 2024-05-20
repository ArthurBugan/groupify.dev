import "../globals.css";

import Link from "next/link";
import Navbar from "@/components/old/navbar";

import { getDictionary } from "@/get-dictionary";
import { getAllArticles } from "@/lib/getPosts";

export default async function MdxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary("en");
  const articles = await getAllArticles();

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />

      <main className="container p-8 mx-auto xl:px-0 flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
        <div className="grid grid-cols-[300px_1fr] w-screen gap-8">
          <div className="sticky top-8 self-start space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Blog posts</h3>
              <nav className="space-y-2 text-sm">
                {articles.map((article) => {
                  const { metadata } = article;
                  const title = String(metadata.title);

                  return (
                    <Link
                      key={article.slug}
                      href={"/blog/" + article.slug}
                      className="block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      {title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className="grid items-stretch gap-8 mb-auto">
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-1 pt-2 gap-8 p-8">
                <div className="flex flex-row space-x-3">
                  <Link
                    className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                    href="/blog"
                  >
                    Go back to all blog posts
                  </Link>
                </div>
                <article className="prose prose-gray mx-auto dark:prose-invert">
                  {children}
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
