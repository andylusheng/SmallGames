import { notFound } from "next/navigation";
import NextLink from "next/link";
import { CheckCircle2, HelpCircle, Sparkles } from "lucide-react";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { getGamesByGameplayTopic, getGameBySlug } from "@/lib/games";
import { getLocalizedTopicSeo, getTopicSeoConfig } from "@/data/topic-seo";
import { toZhTwText } from "@/data/zh-tw/convert";
import { SITE_URL } from "@/lib/metadata";

interface TopicPageViewProps {
  locale: string;
  topic: string;
}

export function buildTopicJsonLd(topic: string, locale: string) {
  const config = getTopicSeoConfig(topic);
  const content = getLocalizedTopicSeo(topic, locale);
  if (!config || !content) return null;

  const prefix = locale === "en" ? "" : `/${locale}`;
  const games = getGamesByGameplayTopic(topic, undefined, 50);
  const homeLabel = locale === "en" ? "Home" : locale === "zh-tw" ? "首頁" : "首页";

  return {
    collection: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: content.h1,
      description: content.metaDescription,
      url: `${SITE_URL}${prefix}${config.path}`,
      inLanguage: locale === "zh-tw" ? "zh-TW" : locale,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: games.map((game, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: game.title,
          url: `${SITE_URL}${prefix}/game/${game.slug}`,
        })),
      },
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeLabel,
          item: `${SITE_URL}${prefix || ""}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: content.label,
          item: `${SITE_URL}${prefix}${config.path}`,
        },
      ],
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  };
}

export default async function TopicPageView({ locale, topic }: TopicPageViewProps) {
  const config = getTopicSeoConfig(topic);
  const content = getLocalizedTopicSeo(topic, locale);
  if (!config || !content) notFound();

  const isEn = locale === "en";
  const isZhTw = locale === "zh-tw";
  const prefix = isEn ? "" : `/${locale}`;
  const z = (value: string) => isZhTw ? toZhTwText(value) : value;
  const games = getGamesByGameplayTopic(topic, undefined, 50);
  const jsonLd = buildTopicJsonLd(topic, locale);

  return (
    <>
      {jsonLd && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.collection) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }} />
        </>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400">
          <NextLink href={`${prefix}/`} className="hover:text-primary">{isEn ? "Home" : z("首页")}</NextLink>
          <span>/</span>
          <span className="text-white">{content.label}</span>
        </nav>

        <header className="max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">{content.h1}</h1>
          <p className="mt-3 text-base leading-relaxed text-gray-300 lg:text-lg">{content.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-300">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">{games.length} {isEn ? "games" : z("款游戏")}</span>
            <span className="rounded-full border border-white/10 bg-surface px-3 py-1">{isEn ? "Browser play" : z("浏览器游玩")}</span>
            <span className="rounded-full border border-white/10 bg-surface px-3 py-1">{isEn ? "No download" : z("无需下载")}</span>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">{isEn ? `Play ${content.label}` : z(`开始玩${content.label}`)}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">
            {isEn
              ? "Choose a game by the mechanic you want rather than by a broad store category. Each title below has its own rules, scoring and long-tail search page."
              : z("按你想玩的真实机制选择游戏，而不是只看传统分类。下面每款游戏都有独立规则、计分和长尾搜索页面。")}
          </p>
          <div className="mt-4"><GameGrid games={games} trackingSource="category" locale={locale} /></div>
        </section>

        <AdBanner className="mt-8" />

        <div className="mt-10 max-w-5xl">
          <section>
            <h2 className="text-xl font-semibold text-white">{isEn ? `What Are ${content.label}?` : z(`什么是${content.label}？`)}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">
              {content.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-white">{content.playStylesTitle}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {content.playStyles.map((style) => {
                const game = getGameBySlug(style.gameSlug);
                if (!game) return null;
                return (
                  <NextLink
                    key={style.gameSlug}
                    href={`${prefix}/game/${style.gameSlug}`}
                    className="rounded-xl border border-white/10 bg-surface/50 p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-start gap-3">
                      <img src={game.thumbnail} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" />
                      <div>
                        <h3 className="text-sm font-semibold text-white">{style.title}: {game.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{style.description}</p>
                      </div>
                    </div>
                  </NextLink>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><Sparkles className="h-5 w-5 text-primary" />{content.howItWorksTitle}</h2>
            <ul className="mt-3 space-y-2">
              {content.howItWorks.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />{isEn ? `${content.label} FAQ` : z(`${content.label}常见问题`)}</h2>
            <div className="mt-3 space-y-3">
              {content.faq.map((item, index) => (
                <details key={index} className="group rounded-lg border border-white/10 bg-surface/50">
                  <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white transition-colors hover:text-primary">{item.q}</summary>
                  <p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
