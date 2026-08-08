import { notFound } from "next/navigation";
import NextLink from "next/link";
import {
  getAllGames,
  getAllSlugs,
  getGameBySlug,
  getRelatedGames,
  getGamesByCategory,
  getGamesByGameplayTopic,
  getGameSeo,
  getGameProfile,
  getLocalizedGameProfile,
  getLocalizedGameDescription,
  getGamePageSeo,
  type Game,
} from "@/lib/games";
import { getGameHook } from "@/data/category-seo";
import { getLocalizedTopicSeo, getTopicHubHref, getTopicSeoConfig } from "@/data/topic-seo";
import { toZhTwText } from "@/data/zh-tw/convert";
import { getServerTranslations } from "@/lib/server-i18n";
import { SITE_URL } from "@/lib/metadata";
import GamePlayer from "@/components/GamePlayer";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { Download, Gift, HelpCircle, Info, Lightbulb, ShieldCheck, Sparkles, Star, Tag, Zap } from "lucide-react";

interface GamePageViewProps {
  locale: string;
  slug: string;
}

function lp(locale: string, href: string) {
  return locale === "en" ? href : `/${locale}${href}`;
}

function zh(locale: string, value: string) {
  return locale === "zh-tw" ? toZhTwText(value) : value;
}

function getCrossCategoryRecommendations(game: Game, limit = 4): Game[] {
  const seed = Array.from(game.slug).reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) >>> 0, 7);
  const buckets = new Map<string, Game[]>();

  getAllGames()
    .filter((item) => item.id !== game.id && item.category !== game.category)
    .forEach((item) => {
      const bucket = buckets.get(item.category) ?? [];
      bucket.push(item);
      buckets.set(item.category, bucket);
    });

  for (const bucket of buckets.values()) {
    bucket.sort((a, b) =>
      Number(b.popular) - Number(a.popular) ||
      Number(b.featured) - Number(a.featured) ||
      b.updatedAt.localeCompare(a.updatedAt) ||
      a.slug.localeCompare(b.slug)
    );
  }

  const categories = Array.from(buckets.keys()).sort();
  if (categories.length === 0) return [];

  const offset = seed % categories.length;
  const orderedCategories = [...categories.slice(offset), ...categories.slice(0, offset)];

  return orderedCategories.slice(0, limit).map((category, index) => {
    const bucket = buckets.get(category)!;
    const topPool = bucket.slice(0, Math.min(3, bucket.length));
    return topPool[(seed + index) % topPool.length];
  });
}

export function gameStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function buildGameJsonLd(game: Game, locale: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const pageSeo = getGamePageSeo(game, locale);
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: pageSeo.metaDescription,
    url: `${SITE_URL}${prefix}/game/${game.slug}`,
    image: `${SITE_URL}${game.thumbnail}`,
    genre: game.category,
    numberOfPlayers: "1",
    gamePlatform: ["Web Browser"],
    applicationCategory: "Game",
    operatingSystem: "Any (HTML5 Browser)",
    inLanguage: locale === "zh-tw" ? "zh-TW" : locale,
    datePublished: game.publishedAt,
    dateModified: game.updatedAt,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

function getGameFaqs(game: Game, locale: string): { q: string; a: string }[] {
  const p2 = getLocalizedGameProfile(game, locale);
  if (p2?.faq?.length) return p2.faq;

  if (locale === "en") {
    return [
      { q: `How do I play ${game.title}?`, a: game.instructions },
      { q: `Is ${game.title} free to play?`, a: `Yes. ${game.title} is free to play in your browser. The site may display advertising, but no account or download is required to start.` },
      { q: `Can I play ${game.title} on mobile?`, a: `You can open ${game.title} in a mobile browser. Control support varies by game; if touch controls are not available, use a desktop browser and keyboard or mouse.` },
      { q: `Do I need to download ${game.title}?`, a: `No. ${game.title} runs as an HTML5 browser game and does not require an app installation.` },
    ];
  }

  return [
    { q: zh(locale, `${game.title}怎么玩？`), a: zh(locale, game.instructions) },
    { q: zh(locale, `${game.title}免费吗？`), a: zh(locale, `是的。${game.title}可以在浏览器中免费游玩。网站可能展示广告，但开始游戏不需要注册账号或下载安装。`) },
    { q: zh(locale, `手机上能玩${game.title}吗？`), a: zh(locale, `你可以使用手机浏览器打开${game.title}。不同游戏的触屏支持情况不同；如果无法触控操作，请使用电脑浏览器和键盘或鼠标。`) },
    { q: zh(locale, `玩${game.title}需要下载吗？`), a: zh(locale, `不需要。${game.title}是HTML5网页游戏，无需安装应用。`) },
  ];
}

export function buildFaqJsonLd(game: Game, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getGameFaqs(game, locale).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function buildBreadcrumbJsonLd(game: Game, locale: string, t: (key: string) => string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const profile = getGameProfile(game);
  const primaryTopic = profile?.mechanics.gameplayTopics[0];
  const topicConfig = primaryTopic ? getTopicSeoConfig(primaryTopic) : undefined;
  const topicContent = primaryTopic ? getLocalizedTopicSeo(primaryTopic, locale) : undefined;
  const middle = topicConfig && topicContent
    ? { name: topicContent.label, item: `${SITE_URL}${prefix}${topicConfig.path}` }
    : { name: t(`categories.${game.category}`), item: `${SITE_URL}${prefix}/${game.category}` };

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : zh(locale, "首页"), item: `${SITE_URL}${prefix}` },
      { "@type": "ListItem", position: 2, name: middle.name, item: middle.item },
      { "@type": "ListItem", position: 3, name: game.title, item: `${SITE_URL}${prefix}/game/${game.slug}` },
    ],
  };
}

export default async function GamePageView({ locale, slug }: GamePageViewProps) {
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const t = getServerTranslations(locale);
  const isEn = locale === "en";
  const profile = getGameProfile(game);
  const p2 = getLocalizedGameProfile(game, locale);
  const pageSeo = getGamePageSeo(game, locale);
  const primaryTopic = profile?.mechanics.gameplayTopics[0];
  const topicGames = primaryTopic ? getGamesByGameplayTopic(primaryTopic, game.slug, 6) : [];
  const topicHubHref = primaryTopic ? getTopicHubHref(primaryTopic, locale) : undefined;
  const topicContent = primaryTopic ? getLocalizedTopicSeo(primaryTopic, locale) : undefined;
  const relatedGames = getRelatedGames(game, 8);
  const categoryGames = getGamesByCategory(game.category).filter((item) => item.id !== game.id).slice(0, 4);
  const crossCategoryGames = getCrossCategoryRecommendations(game, 4);
  const fallbackSeo = getGameSeo(game, locale);
  const longDescription = fallbackSeo.longDescription || getLocalizedGameDescription(game, locale);
  const aboutParagraphs = p2?.about ?? longDescription.split("\n").filter(Boolean);
  const howToPlaySteps = p2?.howToPlay ?? game.instructions.split(/(?<=\.)\s+(?=[A-Z])/).map((step) => zh(locale, step));
  const tips = p2?.tips ?? fallbackSeo.tips;
  const faqs = getGameFaqs(game, locale);
  const difficulty = fallbackSeo.difficulty || (isEn ? "Easy" : zh(locale, "简单"));
  const localize = (value: { en: string; zh: string }) => isEn ? value.en : zh(locale, value.zh);
  const sameCategoryTitle = locale === "en"
    ? `More ${t(`categories.${game.category}`)} Games`
    : locale === "es"
      ? `Más juegos de ${t(`categories.${game.category}`)}`
      : locale === "zh-tw"
        ? `更多${t(`categories.${game.category}`)}遊戲`
        : `更多${t(`categories.${game.category}`)}游戏`;
  const exploreOtherTitle = locale === "en"
    ? "Explore Other Games"
    : locale === "es"
      ? "Descubre otros juegos"
      : locale === "zh-tw"
        ? "探索其他遊戲"
        : "探索其他游戏";

  const infoRows: string[][] = [
    [isEn ? "Game Name" : zh(locale, "游戏名称"), game.title],
    [isEn ? "Category" : zh(locale, "游戏分类"), t(`categories.${game.category}`)],
    [isEn ? "Difficulty" : zh(locale, "难度"), difficulty],
    [isEn ? "Platform" : zh(locale, "平台"), isEn ? "Web Browser" : zh(locale, "网页浏览器")],
    [isEn ? "Price" : zh(locale, "价格"), isEn ? "Free" : zh(locale, "免费")],
    [isEn ? "Players" : zh(locale, "玩家"), isEn ? "1 Player" : zh(locale, "单人")],
  ];

  if (profile?.mechanics.durationSeconds) {
    infoRows.push([isEn ? "Round Length" : zh(locale, "单局时长"), isEn ? `${profile.mechanics.durationSeconds} seconds` : `${profile.mechanics.durationSeconds}${zh(locale, "秒")}`]);
  }

  if (profile?.mechanics.controls.length) {
    const controlLabels: Record<string, { en: string; zh: string }> = {
      mouse: { en: "Mouse", zh: "鼠标" },
      touch: { en: "Touch", zh: "触屏" },
      keyboard: { en: "Keyboard", zh: "键盘" },
    };
    infoRows.push([
      isEn ? "Controls" : zh(locale, "操作方式"),
      profile.mechanics.controls.map((control) => {
        const label = controlLabels[control];
        return label ? (isEn ? label.en : zh(locale, label.zh)) : control;
      }).join(" / "),
    ]);
  }
  infoRows.push([isEn ? "Last Updated" : zh(locale, "最近更新"), game.updatedAt]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildGameJsonLd(game, locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(game, locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(game, locale, t)) }} />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-sm text-gray-400">
          <NextLink href={lp(locale, "/")} className="hover:text-primary">{t("nav.home")}</NextLink>
          <span>/</span>
          {topicHubHref && topicContent ? (
            <NextLink href={topicHubHref} className="hover:text-primary">{topicContent.label}</NextLink>
          ) : (
            <NextLink href={lp(locale, `/${game.category}`)} className="hover:text-primary">{t(`categories.${game.category}`)}</NextLink>
          )}
          <span>/</span>
          <span className="text-white">{game.title}</span>
        </nav>

        {p2 && (
          <header className="mb-5 max-w-4xl">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{pageSeo.h1}</h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">{pageSeo.intro}</p>
          </header>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main className="min-w-0">
            <GamePlayer gameUrl={game.gameUrl} title={game.title} slug={game.slug} />

            <div className="mt-5">
              {!p2 && <h1 className="text-2xl font-bold text-white lg:text-3xl">{pageSeo.h1}</h1>}

              <div className={`${p2 ? "" : "mt-3"} flex flex-wrap items-center gap-4 text-sm text-gray-400`}>
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <NextLink href={lp(locale, `/${game.category}`)} className="text-primary hover:underline">{t(`categories.${game.category}`)}</NextLink>
                </span>
                <span className="text-gray-500">{isEn ? "Updated" : zh(locale, "更新")}: {game.updatedAt}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {game.tags.map((tag) => <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-gray-300">#{tag}</span>)}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: Gift, label: isEn ? "Free to Play" : zh(locale, "免费游玩") },
                  { icon: Download, label: isEn ? "No Download" : zh(locale, "无需下载") },
                  { icon: ShieldCheck, label: isEn ? "No Account Required" : zh(locale, "无需注册") },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs font-medium text-green-300">
                    <Icon className="h-3.5 w-3.5" />{label}
                  </span>
                ))}
              </div>

              {!p2 && (
                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="flex items-start gap-2 text-sm leading-relaxed text-gray-200"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{locale === "zh-tw" ? toZhTwText(getGameHook(game.category, game.title, "zh")) : getGameHook(game.category, game.title, locale)}</p>
                </div>
              )}

              <section className="mt-7">
                <h2 className="text-xl font-semibold text-white">{isEn ? `About ${game.title}` : zh(locale, `关于${game.title}`)}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-300">{aboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
              </section>

              <section className="mt-7">
                <h2 className="text-xl font-semibold text-white">{isEn ? `How to Play ${game.title}` : zh(locale, `${game.title}怎么玩`)}</h2>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-gray-300">
                  {howToPlaySteps.map((step, index) => (
                    <p key={index} className="flex gap-2"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{index + 1}</span><span>{step}</span></p>
                  ))}
                </div>
              </section>

              {p2?.rules?.length ? (
                <section className="mt-7">
                  <h2 className="text-xl font-semibold text-white">{isEn ? `${game.title} Rules` : zh(locale, `${game.title}游戏规则`)}</h2>
                  <ul className="mt-3 space-y-2">
                    {p2.rules.map((rule, index) => <li key={index} className="flex gap-2 text-sm leading-relaxed text-gray-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /><span>{rule}</span></li>)}
                  </ul>
                </section>
              ) : null}

              {profile?.mechanics.scoring.length ? (
                <section className="mt-7">
                  <h2 className="text-xl font-semibold text-white">
                    {profile.mechanics.scoringTitle ? localize(profile.mechanics.scoringTitle) : isEn ? `${game.title} Scoring` : zh(locale, `${game.title}计分规则`)}
                  </h2>
                  <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-[520px] text-sm">
                      <thead className="bg-surface">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-200">{isEn ? "Action" : zh(locale, "操作")}</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-200">{profile.mechanics.scoringValueLabel ? localize(profile.mechanics.scoringValueLabel) : isEn ? "Points" : zh(locale, "分数")}</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-200">{isEn ? "How it works" : zh(locale, "说明")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile.mechanics.scoring.map((rule) => {
                          const value = rule.points !== undefined
                            ? `${rule.points > 0 ? "+" : ""}${rule.points}`
                            : rule.value
                              ? localize(rule.value)
                              : "—";
                          return (
                            <tr key={rule.id} className="border-t border-white/5">
                              <td className="px-4 py-3 text-white">{localize(rule.label)}</td>
                              <td className="px-4 py-3 font-semibold text-primary">{value}</td>
                              <td className="px-4 py-3 text-gray-400">{rule.note ? localize(rule.note) : "—"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              {profile && (
                <section className="mt-7">
                  <h2 className="text-xl font-semibold text-white">{isEn ? `${game.title} Game Mechanics` : zh(locale, `${game.title}玩法机制`)}</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-surface/50 p-4">
                      <h3 className="text-sm font-semibold text-white">{isEn ? "Objective" : zh(locale, "游戏目标")}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-300">{localize(profile.mechanics.objective)}</p>
                    </div>
                    {profile.mechanics.endCondition && (
                      <div className="rounded-xl border border-white/10 bg-surface/50 p-4">
                        <h3 className="text-sm font-semibold text-white">{isEn ? "Round End" : zh(locale, "结束条件")}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">{localize(profile.mechanics.endCondition)}</p>
                      </div>
                    )}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {profile.mechanics.specialMechanics.map((item, index) => <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300"><Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{localize(item)}</li>)}
                    {profile.mechanics.progress && <li className="flex items-start gap-2 text-sm leading-relaxed text-gray-300"><Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />{localize(profile.mechanics.progress)}</li>}
                  </ul>
                </section>
              )}

              {!p2 && fallbackSeo.features?.length ? (
                <section className="mt-7">
                  <h2 className="text-xl font-semibold text-white">{isEn ? `${game.title} Features` : zh(locale, `${game.title}游戏特色`)}</h2>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">{fallbackSeo.features.map((feature, index) => <li key={index} className="rounded-xl border border-white/10 bg-surface/50 p-4 text-sm leading-relaxed text-gray-300">{feature}</li>)}</ul>
                </section>
              ) : null}

              {tips?.length ? (
                <section className="mt-7">
                  <h2 className="text-xl font-semibold text-white">{isEn ? "Tips & Strategies" : zh(locale, "技巧与攻略")}</h2>
                  <ul className="mt-3 space-y-2">{tips.map((tip, index) => <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />{tip}</li>)}</ul>
                </section>
              ) : null}

              <section className="mt-7">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><Info className="h-5 w-5 text-primary" />{isEn ? "Game Info" : zh(locale, "游戏信息")}</h2>
                <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
                  <table className="w-full text-sm"><tbody>{infoRows.map(([label, value]) => <tr key={label} className="border-b border-white/5 last:border-0"><td className="bg-surface px-4 py-2.5 font-medium text-gray-300">{label}</td><td className="px-4 py-2.5 text-white">{value}</td></tr>)}</tbody></table>
                </div>
              </section>

              <section className="mt-7">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-white"><HelpCircle className="h-5 w-5 text-primary" />{isEn ? "Frequently Asked Questions" : zh(locale, "常见问题")}</h2>
                <div className="mt-3 space-y-3">{faqs.map((faq, index) => <details key={index} className="group rounded-lg border border-white/10 bg-surface/50"><summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white transition-colors hover:text-primary">{faq.q}</summary><p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-gray-300">{faq.a}</p></details>)}</div>
              </section>

              {primaryTopic && topicGames.length > 0 ? (
                <section className="mt-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-white">{isEn ? `More ${topicContent?.label ?? primaryTopic} Like ${game.title}` : zh(locale, `更多${topicContent?.label ?? primaryTopic}`)}</h2>
                    {topicHubHref && topicContent && <NextLink href={topicHubHref} className="text-sm font-medium text-primary hover:underline">{isEn ? `View all ${topicContent.label}` : zh(locale, `查看全部${topicContent.label}`)}</NextLink>}
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{isEn ? `Continue with games built around the same ${primaryTopic} mechanic.` : zh(locale, `继续体验围绕${topicContent?.label ?? primaryTopic}机制设计的游戏。`)}</p>
                  <div className="mt-4"><GameGrid games={topicGames} trackingSource="related" locale={locale} /></div>
                </section>
              ) : relatedGames.length > 0 ? (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold text-white">{isEn ? "Related Games" : zh(locale, "相关游戏")}</h2>
                  <div className="mt-4"><GameGrid games={relatedGames.slice(0, 6)} trackingSource="related" locale={locale} /></div>
                </section>
              ) : null}

              <AdBanner className="mt-8" />
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-white/10 bg-surface/40 p-4">
              <section>
                <h2 className="text-sm font-semibold text-white">{sameCategoryTitle}</h2>
                <div className="mt-3 space-y-3">
                  {categoryGames.map((item) => (
                    <NextLink key={item.slug} href={lp(locale, `/game/${item.slug}`)} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
                      <img src={item.thumbnail} alt="" width="48" height="48" className="h-12 w-12 rounded-lg object-cover" loading="lazy" decoding="async" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-white">{item.title}</div>
                        <div className="mt-0.5 line-clamp-1 text-xs text-gray-500">{getLocalizedGameDescription(item, locale)}</div>
                      </div>
                    </NextLink>
                  ))}
                </div>
              </section>

              {crossCategoryGames.length > 0 && (
                <section className="mt-4 border-t border-white/10 pt-4">
                  <h2 className="text-sm font-semibold text-white">{exploreOtherTitle}</h2>
                  <div className="mt-3 space-y-3">
                    {crossCategoryGames.map((item) => (
                      <NextLink key={item.slug} href={lp(locale, `/game/${item.slug}`)} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/5">
                        <img src={item.thumbnail} alt="" width="48" height="48" className="h-12 w-12 rounded-lg object-cover" loading="lazy" decoding="async" />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-white">{item.title}</div>
                          <div className="mt-0.5 truncate text-xs font-medium text-primary/80">{t(`categories.${item.category}`)}</div>
                          <div className="mt-0.5 line-clamp-1 text-xs text-gray-500">{getLocalizedGameDescription(item, locale)}</div>
                        </div>
                      </NextLink>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
