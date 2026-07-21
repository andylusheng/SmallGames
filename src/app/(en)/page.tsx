"use client";

import { useTranslations } from "@/lib/i18n";
import { getFeaturedGames, getPopularGames, getNewGames, getAllGames } from "@/lib/games";
import GameGrid from "@/components/GameGrid";
import AdBanner from "@/components/AdBanner";
import { Link } from "@/components/Link";
import { Flame, Sparkles, Clock } from "lucide-react";

export default function HomePage() {
  const t = useTranslations();
  const featured = getFeaturedGames();
  const popular = getPopularGames(10);
  const newGames = getNewGames(10);
  const allGames = getAllGames();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero / Featured Section */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h2 className="text-xl font-bold text-white">{t("home.featured")}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((game) => (
            <Link
              key={game.id}
              href={`/game/${game.slug}`}
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
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-8" />

      {/* Popular Games */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-bold text-white">
            {t("home.popularGames")}
          </h2>
        </div>
        <GameGrid games={popular} />
      </section>

      {/* Ad Banner */}
      <AdBanner className="mb-8" />

      {/* New Games */}
      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-bold text-white">{t("home.newGames")}</h2>
        </div>
        <GameGrid games={newGames} />
      </section>

      {/* All Games */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-xl font-bold text-white">{t("home.allGames")}</h2>
        </div>
        <GameGrid games={allGames} />
      </section>
    </div>
  );
}
