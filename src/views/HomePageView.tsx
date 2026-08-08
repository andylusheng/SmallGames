import NextLink from "next/link";
import AdBanner from "@/components/AdBanner";
import GameGrid from "@/components/GameGrid";
import {
  getGamesByCategory,
  getPopularGames,
  type Game,
} from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { Flame } from "lucide-react";

interface HomePageViewProps { locale: string; }

const CATEGORY_ORDER = ["action", "puzzle", "arcade", "racing", "sports", "shooting", "strategy", "casual", "idle"];
const CATEGORY_ICONS: Record<string, string> = {
  action: "⚔️",
  puzzle: "🧩",
  arcade: "🕹️",
  racing: "🏎️",
  sports: "⚽",
  shooting: "🔫",
  strategy: "♟️",
  casual: "🎯",
  idle: "💤",
};

function categoryHighlights(category: string, limit = 4): Game[] {
  return [...getGamesByCategory(category)]
    .sort((a, b) =>
      Number(b.popular) - Number(a.popular) ||
      Number(b.featured) - Number(a.featured) ||
      b.updatedAt.localeCompare(a.updatedAt) ||
      a.slug.localeCompare(b.slug)
    )
    .slice(0, limit);
}

export default function HomePageView({ locale }: HomePageViewProps) {
  const t = getServerTranslations(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const popular = getPopularGames(10);
  const categoryGroups = CATEGORY_ORDER.map((category) => ({
    category,
    games: getGamesByCategory(category),
    highlights: categoryHighlights(category),
  }));

  const browseCategories = locale === "en"
    ? "Browse Game Categories"
    : locale === "zh-tw"
      ? "瀏覽遊戲分類"
      : locale === "es"
        ? "Explorar categorías de juegos"
        : "浏览游戏分类";
  const allGamesLabel = locale === "en"
    ? "View all 100 games"
    : locale === "zh-tw"
      ? "查看全部 100 款遊戲"
      : locale === "es"
        ? "Ver los 100 juegos"
        : "查看全部100款游戏";
  const viewAllCategory = (categoryName: string, count: number) => locale === "en"
    ? `View all ${count} ${categoryName} games`
    : locale === "zh-tw"
      ? `查看全部 ${count} 款${categoryName}遊戲`
      : locale === "es"
        ? `Ver los ${count} juegos de ${categoryName}`
        : `查看全部${count}款${categoryName}游戏`;
  const gameCountLabel = (count: number) => locale === "en"
    ? `${count} games`
    : locale === "zh-tw"
      ? `${count} 款遊戲`
      : locale === "es"
        ? `${count} juegos`
        : `${count}款游戏`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 md:py-6">
      <section className="mb-4 md:mb-8">
        <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">{t("home.h1")}</h1>
        <p className="mt-2 max-w-4xl line-clamp-2 text-sm leading-relaxed text-gray-400 md:mt-3 md:line-clamp-none">{t("home.intro")}</p>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-bold text-white">{t("home.popularGames")}</h2>
        </div>
        <GameGrid games={popular} trackingSource="home" locale={locale} priorityCount={2} />
      </section>

      <section className="mb-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-white">{browseCategories}</h2>
          <NextLink href={`${prefix}/all-games`} className="text-sm font-medium text-primary hover:underline">{allGamesLabel}</NextLink>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categoryGroups.map(({ category, games }) => (
            <NextLink
              key={category}
              href={`${prefix}/${category}`}
              className="group rounded-xl border border-white/10 bg-surface/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface"
            >
              <div className="text-2xl" aria-hidden="true">{CATEGORY_ICONS[category]}</div>
              <div className="mt-3 text-sm font-semibold text-white group-hover:text-primary">{t(`categories.${category}`)}</div>
              <div className="mt-1 text-xs text-gray-500">{gameCountLabel(games.length)}</div>
            </NextLink>
          ))}
        </div>
      </section>

      <AdBanner className="mb-8" />

      <div className="space-y-10">
        {categoryGroups.map(({ category, games, highlights }) => {
          const categoryName = t(`categories.${category}`);
          return (
            <section key={category} className="lazy-section">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>
                  {categoryName}
                </h2>
                <NextLink href={`${prefix}/${category}`} className="text-sm font-medium text-primary hover:underline">
                  {viewAllCategory(categoryName, games.length)}
                </NextLink>
              </div>
              <GameGrid games={highlights} trackingSource="home" locale={locale} />
            </section>
          );
        })}
      </div>

      <AdBanner className="mt-10" />
    </div>
  );
}
