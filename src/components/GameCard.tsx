"use client";

import { Link } from "@/components/Link";
import { Play, Star } from "lucide-react";
import type { Game } from "@/lib/games";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-light">
        <img
          src={game.thumbnail}
          alt={`${game.title} - Free Online Game`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
        {/* Rating badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-xs text-yellow-400">
          <Star className="h-3 w-3" fill="currentColor" />
          {game.rating}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="truncate text-sm font-semibold text-white group-hover:text-primary">
          {game.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
          {game.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            {game.category}
          </span>
          <span className="text-[10px] text-gray-500">
            {(game.plays / 1000).toFixed(0)}K plays
          </span>
        </div>
      </div>
    </Link>
  );
}
