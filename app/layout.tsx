import "./globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Groupify",
  description: "Group and manage your subscriptions on Youtube",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <link rel="mstile" href="/mstile.png" type="image/png" sizes="any" />

        <link
          rel="apple-touch-icon"
          href="/apple-icon.ong"
          type="image/png"
          sizes="any"
        />

        <link
          rel="android-chrome"
          href="/android-chrome.ong"
          type="image/png"
          sizes="any"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4077364511521347"
          crossOrigin="anonymous"
        ></script>

        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="mstile.png" />
      </head>
      <body className={lexend.className}>{children}</body>
    </html>
  );
}
