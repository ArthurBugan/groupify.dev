import "./globals.css";
import { Lexend } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import Script from "next/script";

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
    <html className="dark" lang="en">
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

        <Script id="hydro_config">{`window.Hydro_tagId = "7382a7f2-3a15-417b-8a28-eb6ecc66733d"`}</Script>
        <Script id="hydro_script" src="https://track.hydro.online/"></Script>
      </head>
      <body className={lexend.className}>
        {children}
        <Toaster />
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-D7BS3V6VJF');
          `}
        </Script>
      </body>
    </html>
  );
}
