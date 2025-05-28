import "server-only";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { getAllArticles } from "@/lib/getPosts";

export default async function BlogPage() {
  const dictionary = await getDictionary("en");
  const articles = await getAllArticles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and updates from the Groupify team
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Posts
              </h3>
              <nav className="space-y-3">
                {articles.slice(0, 8).map((article) => {
                  const { metadata } = article;
                  const title = String(metadata.title);
                  return (
                    <Link
                      key={article.slug}
                      href={"/blog/" + article.slug}
                      className="block text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
                    >
                      {title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((article) => {
              const { metadata } = article;
              const title = String(metadata.title);
              const description = String(metadata.description || "");
              const publishedAt = String(metadata.publishedAt || "");
              const image = String(metadata.image || "/placeholder.svg");

              return (
                <Link key={article.slug} href={"/blog/" + article.slug}>
                  <Card className="group h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02]">
                    <div className="aspect-video overflow-hidden rounded-t-xl">
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                        {title}
                      </CardTitle>
                      {publishedAt && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(publishedAt).toLocaleDateString()}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        Read more
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
