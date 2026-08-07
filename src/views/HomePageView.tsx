import NextLink from "next/link";
import AdBanner from "@/components/AdBanner";
import GameGrid from "@/components/GameGrid";
import {
  getCategories,
  getFeaturedGames,
  getNewGames,
  getPopularGames,
} from "@/lib/games";
import { getServerTranslations } from "@/lib/server-i18n";
import { Clock, Flame, Sparkles } from "lucide-react";

interface HomePageViewProps {
  locale: "en" | "zh";
}

export default function HomePageView({ locale }: HomePageViewProps) {
  const t = getServerTranslations(locale);
  const prefix = locale === "en" ? "" : "/zh";
  const featured = getFeaturedGames(6);
  const popular = getPopularGames(10);
  const newGames = getNewGames(10);
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-white lg:text-3xl">{t("home.h1")}</h1>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-gray-400">
          {t("home.intro")}
        </p>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h2 className="text-xl font-bold text-white">{t("home.featured")}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((game) => (
            <NextLink
              key={game.id}
              href={`${prefix}/game/${game.slug}`}
              className="group relative flex h-48 items-end overflow-hidden rounded-xl border border-white/5 p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <img
                src={game.thumbnail}
                alt={`${game.title} - Play Free Online`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10">
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  {game.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white group-hover:text-primary">
                  {game.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-300">
                  {game.description}
                </p>
              </div>
            </NextLink>
          ))}
        </div>
      </section>

      <AdBanner className="mb-8" />

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-bold text-white">{t("home.popularGames")}</h2>
        </div>
        <GameGrid games={popular} trackingSource="home" />
      </section>

      <AdBanner className="mb-8" />

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-bold text-white">{t("home.newGames")}</h2>
        </div>
        <GameGrid games={newGames} trackingSource="home" />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-white">
          {locale === "en" ? "Browse Game Categories" : "浏览游戏分类"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <NextLink
              key={category}
              href={`${prefix}/${category}`}
              className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-gray-300 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {t(`categories.${category}`)}
            </NextLink>
          ))}
        </div>
      </section>
    </div>
  );
}
