import { notFound } from "next/navigation";
import NextLink from "next/link";
import { getAllSlugs, getGameBySlug, getRelatedGames, getGamesByCategory, getGameSeo, type Game } from "@/lib/games";
import { getGameHook } from "@/data/category-seo";
import { getServerTranslations } from "@/lib/server-i18n";
import { SITE_URL } from "@/lib/metadata";
import GamePlayer from "@/components/GamePlayer";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { Star, Play, Tag, Calendar, Lightbulb, HelpCircle, Info, Sparkles, ShieldCheck, Download, Heart, MonitorSmartphone, BadgeCheck, Zap, Gift, Ban } from "lucide-react";

interface GamePageViewProps {
  locale: string;
  slug: string;
}

function lp(locale: string, href: string) {
  return locale === "en" ? href : `/${locale}${href}`;
}

export function gameStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function buildGameJsonLd(game: Game, locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    url: `${SITE_URL}${prefix}/game/${game.slug}`,
    image: `${SITE_URL}${game.thumbnail}`,
    genre: game.category,
    numberOfPlayers: "1",
    gamePlatform: ["Web Browser", "Desktop", "Mobile"],
    applicationCategory: "Game",
    operatingSystem: "Any (HTML5 Browser)",
    inLanguage: locale === "en" ? "en" : "zh",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: game.rating,
      bestRating: "5",
      ratingCount: Math.floor(game.plays / 100),
    },
  };
}

export function buildFaqJsonLd(game: Game, locale: string) {
  const faqs = getGameFaqs(game, locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildBreadcrumbJsonLd(game: Game, locale: string, t: (key: string) => string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "首页", item: `${SITE_URL}${prefix}` },
      { "@type": "ListItem", position: 2, name: t(`categories.${game.category}`), item: `${SITE_URL}${prefix}/${game.category}` },
      { "@type": "ListItem", position: 3, name: game.title, item: `${SITE_URL}${prefix}/game/${game.slug}` },
    ],
  };
}

function getGameFaqs(game: Game, locale: string): { q: string; a: string }[] {
  const seo = getGameSeo(game, locale);
  const custom = seo.faq;
  if (custom && custom.length >= 3) return custom;
  return [
    { q: `How to play ${game.title}?`, a: game.instructions },
    { q: `Is ${game.title} free to play?`, a: `Yes! ${game.title} is 100% free to play directly in your browser. No downloads, no sign-ups, no hidden fees. Just open the page and start playing instantly.` },
    { q: `Can I play ${game.title} on mobile?`, a: `${game.title} is fully optimized for mobile devices. It works on iPhone, iPad, and Android phones/tablets. Touch controls are supported — just open it in your mobile browser and play!` },
    { q: `What makes ${game.title} fun?`, a: `${game.title} combines simple controls with engaging gameplay that's easy to learn but hard to master. Challenge yourself to beat your high score — it's saved automatically in your browser!` },
    { q: `Do I need to download anything to play ${game.title}?`, a: `No download or installation required. ${game.title} is an HTML5 browser game that runs instantly. Your progress (high score) is saved locally in your browser using localStorage.` },
  ];
}

export default async function GamePageView({ locale, slug }: GamePageViewProps) {
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const t = getServerTranslations(locale);
  const relatedGames = getRelatedGames(game, 8);
  const categoryGames = getGamesByCategory(game.category).filter((g) => g.id !== game.id).slice(0, 4);
  const isEn = locale === "en";

  const seo = getGameSeo(game, locale);
  const longDescription = seo.longDescription || game.description;
  const features = seo.features;
  const tips = seo.tips;
  const difficulty = seo.difficulty || (isEn ? "Easy" : "简单");
  const faqs = getGameFaqs(game, locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGameJsonLd(game, locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(game, locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(game, locale, t)) }} />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400">
          <NextLink href={lp(locale, "/")} className="hover:text-primary">{t("nav.home")}</NextLink>
          <span>/</span>
          <NextLink href={lp(locale, `/${game.category}`)} className="hover:text-primary">
            {t(`categories.${game.category}`)}
          </NextLink>
          <span>/</span>
          <span className="text-white">{game.title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div>
            {/* Game Player */}
            <GamePlayer gameUrl={game.gameUrl} title={game.title} />

            {/* Game Info */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-white lg:text-3xl">
                {game.title}
                <span className="ml-3 align-middle text-sm font-normal text-gray-400">
                  {isEn ? "Free Online Game" : "免费在线游戏"}
                </span>
              </h1>

              {/* Meta */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4" fill="currentColor" />
                  {game.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  {(game.plays / 1000).toFixed(0)}K plays
                </span>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <NextLink href={lp(locale, `/${game.category}`)} className="text-primary hover:underline">
                    {t(`categories.${game.category}`)}
                  </NextLink>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {game.dateAdded}
                </span>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: BadgeCheck, label: isEn ? "100% Free" : "完全免费" },
                  { icon: Download, label: isEn ? "No Download" : "无需下载" },
                  { icon: ShieldCheck, label: isEn ? "Kid-Friendly" : "儿童友好" },
                  { icon: Ban, label: isEn ? "No Forced Ads" : "无强制广告" },
                  { icon: MonitorSmartphone, label: isEn ? "All Devices" : "全设备支持" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-medium text-green-300">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Conversational hook */}
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-gray-200">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {getGameHook(game.category, game.title, locale)}
                </p>
              </div>

              {/* About - long description */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">
                  {isEn ? `About ${game.title}` : `关于${game.title}`}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">
                  {longDescription.split("\n").map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* How to Play */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">
                  {isEn ? `How to Play ${game.title}` : `${game.title}怎么玩`}
                </h2>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-gray-300">
                  {game.instructions.split(/(?<=\.)\s+(?=[A-Z])/).map((step: string, i: number) => (
                    <p key={i} className="flex gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </p>
                  ))}
                </div>
              </section>

              {/* Features — icon cards */}
              {features && features.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-white">
                    {isEn ? `${game.title} Features` : `${game.title}游戏特色`}
                  </h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {features.map((f: string, i: number) => {
                      const FeatureIcon = [Zap, Star, ShieldCheck, Heart][i % 4];
                      return (
                        <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface/50 p-4 transition-colors hover:border-primary/30">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <FeatureIcon className="h-4.5 w-4.5 text-primary" />
                          </span>
                          <p className="pt-1.5 text-sm leading-relaxed text-gray-300">{f}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Tips & Strategies */}
              {tips && tips.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-white">
                    {isEn ? "Tips & Strategies" : "技巧与攻略"}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {tips.map((tip: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Why Play Here */}
              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">
                  {isEn ? `Why Play ${game.title} Here?` : `为什么在这里玩${game.title}？`}
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      icon: Download,
                      title: isEn ? "vs App Stores" : "对比应用商店",
                      desc: isEn
                        ? "Skip the 500MB download and endless updates. Play instantly in your browser — zero storage used."
                        : "跳过500MB下载和无尽更新，浏览器即开即玩，不占存储空间。",
                    },
                    {
                      icon: Gift,
                      title: isEn ? "vs Paid Games" : "对比付费游戏",
                      desc: isEn
                        ? `All the fun without the price tag. ${game.title} is 100% free with no hidden purchases.`
                        : `乐趣不打折，价格为零。${game.title}完全免费，无隐藏消费。`,
                    },
                    {
                      icon: ShieldCheck,
                      title: isEn ? "vs Other Sites" : "对比其他网站",
                      desc: isEn
                        ? "No forced pop-ups or ad interruptions. Just a clean, fast gaming experience."
                        : "没有强制弹窗和广告打断，只有干净流畅的游戏体验。",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-white/10 bg-surface/50 p-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4.5 w-4.5 text-primary" />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Facts */}
              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <Info className="h-5 w-5 text-primary" />
                  {isEn ? "Game Info" : "游戏信息"}
                </h2>
                <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                        [isEn ? "Game Name" : "游戏名称", game.title],
                        [isEn ? "Category" : "游戏分类", t(`categories.${game.category}`)],
                        [isEn ? "Difficulty" : "难度", difficulty],
                        [isEn ? "Platform" : "平台", isEn ? "Web Browser (Desktop & Mobile)" : "网页浏览器（桌面端和移动端）"],
                        [isEn ? "Price" : "价格", isEn ? "Free" : "免费"],
                        [isEn ? "Players" : "玩家", isEn ? "1 Player" : "单人"],
                        [isEn ? "Rating" : "评分", `⭐ ${game.rating} / 5`],
                        [isEn ? "Times Played" : "游玩次数", `${(game.plays / 1000).toFixed(0)}K+`],
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-white/5 last:border-0">
                          <td className="bg-surface px-4 py-2.5 font-medium text-gray-300">{label}</td>
                          <td className="px-4 py-2.5 text-white">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* FAQ */}
              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {isEn ? "Frequently Asked Questions" : "常见问题"}
                </h2>
                <div className="mt-3 space-y-3">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group rounded-lg border border-white/10 bg-surface/50">
                      <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white transition-colors hover:text-primary">
                        {faq.q}
                      </summary>
                      <p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* More from category */}
              {categoryGames.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-white">
                    {isEn ? `More ${t(`categories.${game.category}`)} Games` : `更多${t(`categories.${game.category}`)}游戏`}
                  </h2>
                  <div className="mt-3">
                    <GameGrid games={categoryGames} />
                  </div>
                </section>
              )}
            </div>

            {/* Ad */}
            <AdBanner className="mt-6" />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AdBanner format="rectangle" className="mb-6" />
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                {t("game.relatedGames")}
              </h3>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {relatedGames.slice(0, 6).map((rg) => (
                  <NextLink
                    key={rg.id}
                    href={lp(locale, `/game/${rg.slug}`)}
                    className="group flex items-center gap-3 rounded-lg border border-white/5 bg-surface p-3 transition-colors hover:border-primary/30"
                  >
                    <img
                      src={rg.thumbnail}
                      alt={rg.title}
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white group-hover:text-primary">
                        {rg.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(rg.plays / 1000).toFixed(0)}K plays
                      </p>
                    </div>
                  </NextLink>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Games (mobile) */}
        {relatedGames.length > 0 && (
          <section className="mt-8 lg:hidden">
            <h3 className="mb-4 text-lg font-semibold text-white">
              {t("game.relatedGames")}
            </h3>
            <GameGrid games={relatedGames} />
          </section>
        )}
      </div>
    </>
  );
}
