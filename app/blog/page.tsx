import React from "react";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Navbar from "@/components/old/navbar";

import { getDictionary } from "@/get-dictionary";
import { getAllArticles } from "@/lib/getPosts";

export default async function Component() {
  const dictionary = await getDictionary("en");
  const articles = await getAllArticles();

  return (
    <>
      <Navbar showLanguage={false} dictionary={dictionary} />

      <main className="container p-8 mx-auto xl:px-0 flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap">
        <div className="grid grid-cols-[300px_1fr] gap-8">
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
          <div className="grid items-stretch md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const { metadata } = article;
              const title = String(metadata.title);

              return (
                <Card>
                  <Link
                    key={article.slug}
                    href={"/blog/" + article.slug}
                    className="flex h-full flex-col overflow-hidden rounded shadow-lg transition-shadow duration-200 hover:shadow-xl"
                  >
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>
                        {metadata.date} by {metadata?.authors?.[0]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{metadata.description}</CardContent>
                    <CardFooter>
                      <span
                        key={article.slug}
                        className="text-primary hover:underline"
                      >
                        Read more
                      </span>
                    </CardFooter>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
