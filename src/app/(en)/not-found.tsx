import NextLink from "next/link";
import { getPopularGames } from "@/lib/games";
import { Home, Gamepad2, Search } from "lucide-react";

export default function NotFound() {
  const popular = getPopularGames(8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      {/* 404 Hero */}
      <div className="mb-12">
        <p className="text-8xl font-black text-primary/20">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white lg:text-3xl">
          Oops! This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400">
          The game or page you&apos;re looking for might have been moved or never existed.
          But hey, there are more than 100 free games waiting for you!
        </p>
      </div>

      {/* Action buttons */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        <NextLink
          href="/"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </NextLink>
        <NextLink
          href="/search"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-6 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-primary/40 hover:text-white"
        >
          <Search className="h-4 w-4" />
          Search Games
        </NextLink>
      </div>

      {/* Popular games */}
      <div className="text-left">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          <Gamepad2 className="h-5 w-5 text-primary" />
          Popular Games You Might Like
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {popular.map((game) => (
            <NextLink
              key={game.id}
              href={`/game/${game.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-light">
                <img
                  src={game.thumbnail}
                  alt={`${game.title} - Free Online Game`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
                    <svg className="ml-0.5 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="truncate text-sm font-semibold text-white group-hover:text-primary">
                  {game.title}
                </h3>
              </div>
            </NextLink>
          ))}
        </div>
      </div>

      {/* Category links */}
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-white">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {["action", "puzzle", "arcade", "racing", "sports", "shooting", "strategy", "casual"].map((cat) => (
            <NextLink
              key={cat}
              href={`/${cat}`}
              className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm capitalize text-gray-300 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {cat} Games
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
}
