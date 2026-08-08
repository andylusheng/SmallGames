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

function categoryHighlights(category: string, limit = 5): Game[] {
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
    highlights: categoryHighlights(category),
  }));
  const viewMoreGames = locale === "en"
    ? "View more games"
    : locale === "zh-tw"
      ? "查看更多遊戲"
      : locale === "es"
        ? "Ver más juegos"
        : "查看更多游戏";

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

      <AdBanner className="mb-8" />

      <div className="space-y-10">
        {categoryGroups.map(({ category, highlights }) => {
          const categoryName = t(`categories.${category}`);
          return (
            <section key={category} className="lazy-section">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>
                  {categoryName}
                </h2>
                <NextLink href={`${prefix}/${category}`} className="text-sm font-medium text-primary hover:underline">
                  {viewMoreGames}
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
