import NextLink from "next/link";
import { getPopularGames } from "@/lib/games";
import { Home, Gamepad2, Search } from "lucide-react";

export default function NotFoundZh() {
  const popular = getPopularGames(8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      {/* 404 Hero */}
      <div className="mb-12">
        <p className="text-8xl font-black text-primary/20">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white lg:text-3xl">
          哎呀！页面不存在
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-400">
          你访问的游戏或页面可能已被移动或从未存在。
          不过别担心，这里有100多款免费游戏等着你！
        </p>
      </div>

      {/* Action buttons */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        <NextLink
          href="/zh"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <Home className="h-4 w-4" />
          返回首页
        </NextLink>
        <NextLink
          href="/zh/search"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-6 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-primary/40 hover:text-white"
        >
          <Search className="h-4 w-4" />
          搜索游戏
        </NextLink>
      </div>

      {/* Popular games */}
      <div className="text-left">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          <Gamepad2 className="h-5 w-5 text-primary" />
          热门游戏推荐
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {popular.map((game) => (
            <NextLink
              key={game.id}
              href={`/zh/game/${game.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-light">
                <img
                  src={game.thumbnail}
                  alt={`${game.title} - 免费在线游戏`}
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
        <h2 className="mb-4 text-lg font-semibold text-white">按分类浏览</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { slug: "action", name: "动作" },
            { slug: "puzzle", name: "益智" },
            { slug: "arcade", name: "街机" },
            { slug: "racing", name: "竞速" },
            { slug: "sports", name: "体育" },
            { slug: "shooting", name: "射击" },
            { slug: "strategy", name: "策略" },
            { slug: "casual", name: "休闲" },
          ].map(({ slug, name }) => (
            <NextLink
              key={slug}
              href={`/zh/${slug}`}
              className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-gray-300 transition-colors hover:border-primary/40 hover:text-primary"
            >
              {name}游戏
            </NextLink>
          ))}
        </div>
      </div>
    </div>
  );
}
