import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n";
import { getServerMessages } from "@/lib/server-i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildLocaleMetadata, SITE_URL, SITE_NAME } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return buildLocaleMetadata("zh");
}

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const localeMessages = getServerMessages("zh");
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "免费在线HTML5小游戏 - 无需下载，点击即玩",
    inLanguage: "zh",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/zh/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="zh" className="dark">
      <head>
        {/* GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XV35XKZ474" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XV35XKZ474');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-dark text-white antialiased">
        <I18nProvider locale="zh" messages={localeMessages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
