import { notFound } from "next/navigation";
import NextLink from "next/link";
import { getAllSlugs, getGameBySlug, getRelatedGames, getGamesByCategory, getGameSeo, type Game } from "@/lib/games";
import { getGameHook } from "@/data/category-seo";
import { getServerTranslations } from "@/lib/server-i18n";
import { SITE_URL } from "@/lib/metadata";
import GamePlayer from "@/components/GamePlayer";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { Download, Gift, Heart, HelpCircle, Info, Lightbulb, ShieldCheck, Sparkles, Star, Tag, Zap } from "lucide-react";

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
    gamePlatform: ["Web Browser"],
    applicationCategory: "Game",
    operatingSystem: "Any (HTML5 Browser)",
    inLanguage: locale === "en" ? "en" : "zh",
    datePublished: game.publishedAt,
    dateModified: game.updatedAt,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
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
  const isEn = locale === "en";

  if (isEn) {
    return [
      { q: `How do I play ${game.title}?`, a: game.instructions },
      { q: `Is ${game.title} free to play?`, a: `Yes. ${game.title} is free to play in your browser. The site may display advertising, but no account or download is required to start.` },
      { q: `Can I play ${game.title} on mobile?`, a: `You can open ${game.title} in a mobile browser. Control support varies by game; if touch controls are not available, use a desktop browser and keyboard or mouse.` },
      { q: `Do I need to download ${game.title}?`, a: `No. ${game.title} runs as an HTML5 browser game and does not require an app installation.` },
    ];
  }

  return [
    { q: `${game.title}怎么玩？`, a: game.instructions },
    { q: `${game.title}免费吗？`, a: `是的。${game.title}可以在浏览器中免费游玩。网站可能展示广告，但开始游戏不需要注册账号或下载安装。` },
    { q: `手机上能玩${game.title}吗？`, a: `你可以使用手机浏览器打开${game.title}。不同游戏的触屏支持情况不同；如果无法触控操作，请使用电脑浏览器和键盘或鼠标。` },
    { q: `玩${game.title}需要下载吗？`, a: `不需要。${game.title}是HTML5网页游戏，无需安装应用。` },
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
          <div>
            <GamePlayer gameUrl={game.gameUrl} title={game.title} slug={game.slug} />

            <div className="mt-6">
              <h1 className="text-2xl font-bold text-white lg:text-3xl">
                {game.title}
                <span className="ml-3 align-middle text-sm font-normal text-gray-400">
                  {isEn ? "Free Online Game" : "免费在线游戏"}
                </span>
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <NextLink href={lp(locale, `/${game.category}`)} className="text-primary hover:underline">
                    {t(`categories.${game.category}`)}
                  </NextLink>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  {isEn ? "Updated" : "更新"}: {game.updatedAt}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-gray-300">#{tag}</span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Gift, label: isEn ? "Free to Play" : "免费游玩" },
                  { icon: Download, label: isEn ? "No Download" : "无需下载" },
                  { icon: ShieldCheck, label: isEn ? "No Account Required" : "无需注册" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-medium text-green-300">
                    <Icon className="h-3.5 w-3.5" />{label}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-gray-200">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {getGameHook(game.category, game.title, locale)}
                </p>
              </div>

              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">{isEn ? `About ${game.title}` : `关于${game.title}`}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">
                  {longDescription.split("\n").map((para: string, i: number) => <p key={i}>{para}</p>)}
                  <p className="rounded-lg bg-surface/50 p-3">
                    {isEn ? `If you enjoy ${game.title}, you might also like ` : `如果你喜欢${game.title}，你可能也会喜欢`}
                    {relatedGames.slice(0, 3).map((rg, i) => (
                      <span key={rg.id}>
                        <NextLink href={lp(locale, `/game/${rg.slug}`)} className="font-medium text-primary hover:underline">{rg.title}</NextLink>
                        {i < 2 ? (isEn ? ", " : "、") : ""}
                      </span>
                    ))}
                    {isEn ? " — all free to play instantly in your browser." : "——全部免费，浏览器即开即玩。"}
                  </p>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">{isEn ? `How to Play ${game.title}` : `${game.title}怎么玩`}</h2>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-gray-300">
                  {game.instructions.split(/(?<=\.)\s+(?=[A-Z])/).map((step: string, i: number) => (
                    <p key={i} className="flex gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{i + 1}</span>
                      <span>{step}</span>
                    </p>
                  ))}
                </div>
              </section>

              {features && features.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-white">{isEn ? `${game.title} Features` : `${game.title}游戏特色`}</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {features.map((f: string, i: number) => {
                      const FeatureIcon = [Zap, Star, ShieldCheck, Heart][i % 4];
                      return (
                        <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface/50 p-4 transition-colors hover:border-primary/30">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><FeatureIcon className="h-4.5 w-4.5 text-primary" /></span>
                          <p className="pt-1.5 text-sm leading-relaxed text-gray-300">{f}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {tips && tips.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-white">{isEn ? "Tips & Strategies" : "技巧与攻略"}</h2>
                  <ul className="mt-3 space-y-2">
                    {tips.map((tip: string, i: number) => <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />{tip}</li>)}
                  </ul>
                </section>
              )}

              <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">{isEn ? `Why Play ${game.title} Here?` : `为什么在这里玩${game.title}？`}</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Download, title: isEn ? "Browser Play" : "浏览器游玩", desc: isEn ? "Start in your browser without installing a separate app." : "直接在浏览器中开始，无需安装单独的应用。" },
                    { icon: Gift, title: isEn ? "Free Access" : "免费访问", desc: isEn ? `${game.title} is free to start and does not require an account.` : `${game.title}可以免费开始，无需注册账号。` },
                    { icon: ShieldCheck, title: isEn ? "Quick Restart" : "快速重开", desc: isEn ? "Restart the game from the player controls whenever you want another round." : "随时使用播放器控制栏重新开始下一局。" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-xl border border-white/10 bg-surface/50 p-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-4.5 w-4.5 text-primary" /></span>
                      <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><Info className="h-5 w-5 text-primary" />{isEn ? "Game Info" : "游戏信息"}</h2>
                <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-sm"><tbody>
                    {[
                      [isEn ? "Game Name" : "游戏名称", game.title],
                      [isEn ? "Category" : "游戏分类", t(`categories.${game.category}`)],
                      [isEn ? "Difficulty" : "难度", difficulty],
                      [isEn ? "Platform" : "平台", isEn ? "Web Browser" : "网页浏览器"],
                      [isEn ? "Price" : "价格", isEn ? "Free" : "免费"],
                      [isEn ? "Players" : "玩家", isEn ? "1 Player" : "单人"],
                      [isEn ? "Last Updated" : "最近更新", game.updatedAt],
                    ].map(([label, value]) => <tr key={label} className="border-b border-white/5 last:border-0"><td className="bg-surface px-4 py-2.5 font-medium text-gray-300">{label}</td><td className="px-4 py-2.5 text-white">{value}</td></tr>)}
                  </tbody></table>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />{isEn ? "Frequently Asked Questions" : "常见问题"}</h2>
                <div className="mt-3 space-y-3">
                  {faqs.map((faq, i) => <details key={i} className="group rounded-lg border border-white/10 bg-surface/50"><summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white transition-colors hover:text-primary">{faq.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{faq.a}</p></details>)}
                </div>
              </section>

              {categoryGames.length > 0 && (
                <section className="mt-8"><h2 className="text-xl font-semibold text-white">{isEn ? `More ${t(`categories.${game.category}`)} Games` : `更多${t(`categories.${game.category}`)}游戏`}</h2><div className="mt-3"><GameGrid games={categoryGames} trackingSource="related" /></div></section>
              )}
            </div>
            <AdBanner className="mt-6" />
          </div>

          <aside className="hidden lg:block">
            <AdBanner format="rectangle" className="mb-6" />
            <div><h3 className="mb-4 text-lg font-semibold text-white">{t("game.relatedGames")}</h3><div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {relatedGames.slice(0, 6).map((rg) => <NextLink key={rg.id} href={lp(locale, `/game/${rg.slug}`)} className="group flex items-center gap-3 rounded-lg border border-white/5 bg-surface p-3 transition-colors hover:border-primary/30"><img src={rg.thumbnail} alt={rg.title} className="h-12 w-12 shrink-0 rounded-lg object-cover" loading="lazy" /><div className="min-w-0"><p className="truncate text-sm font-medium text-white group-hover:text-primary">{rg.title}</p><p className="text-xs capitalize text-gray-500">{rg.category}</p></div></NextLink>)}
            </div></div>
          </aside>
        </div>

        {relatedGames.length > 0 && <section className="mt-8 lg:hidden"><h3 className="mb-4 text-lg font-semibold text-white">{t("game.relatedGames")}</h3><GameGrid games={relatedGames} trackingSource="related" /></section>}
      </div>
    </>
  );
}
